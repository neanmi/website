import { createHash, createHmac } from "node:crypto";
import { Buffer } from "node:buffer";

//noinspection JSUnusedGlobalSymbols
/**
 * POST /contact/success
 */
export async function onRequestPost(context) {
  /** @type {Request} */
  const request = context.request;
  /** @type {{ CONTACT_FORM_EMAIL_TO: string, CONTACT_FORM_EMAIL_FROM: string, AZ_ECS_HOST: string, AZ_ECS_KEY: string, TURNSTILE_SECRET_KEY: string }} */
  const env = context.env;


  /**
   * @param {FormData} body
   */
  const verifyTurnstileAndProcess = async (body) => {
    const token = body.get("cf-turnstile-response");
    const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";

    const validation = await validateTurnstile(token, ip);

    if (validation.success) {
      // Token is valid - process the form
      console.log("Valid submission from:", validation.hostname);
      return processForm(body);
    } else {
      // Token is invalid - reject the submission
      console.log("Invalid token:", validation["error-codes"]);
      return new Response("Invalid verification", { status: 400 });
    }
  };

  /** @type {(FormData) => Promise<any>} */
  const processForm = async (body) => {
    const escapeHtml = (raw) => raw.replace(/[\u00A0-\u9999<>&]/g, i => "&#" + i.charCodeAt(0) + ";");

    const azEcsHost = env.AZ_ECS_HOST;
    const azEcsSendMailPath = "/emails:send?api-version=2025-09-01";
    const timestamp = new Date().toUTCString();
    const content = JSON.stringify({
      "senderAddress": env.CONTACT_FORM_EMAIL_FROM,
      "content": {
        "subject": "New contact form submission from neanmi.com",
        "html": `
        <strong>Name:</strong> ${escapeHtml(body.get("name"))}<br/>
        <strong>Email:</strong> ${escapeHtml(body.get("email"))}<br/>
        <strong>Message:</strong> ${escapeHtml(body.get("message"))}<br/>
      `
      },
      "recipients": {
        "to": [
          {
            "address": env.CONTACT_FORM_EMAIL_TO
          }
        ]
      }
    });
    const contentHash = createHash("sha256").update(content, "utf8").digest("base64");
    const stringToSign = `POST\n${azEcsSendMailPath}\n${timestamp};${azEcsHost};${contentHash}`;
    const secret = Buffer.from(env.AZ_ECS_KEY, "base64");
    const signature = createHmac("sha256", secret).update(stringToSign).digest("base64");

    const res = await fetch(`https://${azEcsHost}${azEcsSendMailPath}`, {
      method: "POST", headers: {
        "content-type": "application/json",
        "authorization": `HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=${signature}`,
        "x-ms-date": timestamp,
        "x-ms-content-sha256": contentHash
      }, body: content
    });

    if (!res.ok) {
      console.log("Email not sent: ", res.status, await res.json());
      throw new Error("Failed to submit contact form.");
    }

    return new Response("Success", {
      status: 303, headers: {
        "Location": "/contact/success"
      }
    });
  };

  /**
   * @param {FormDataEntryValue} token
   * @param {string} remoteIp
   */
  async function validateTurnstile(token, remoteIp) {
    const formData = new FormData();
    formData.append("secret", env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteIp", remoteIp);

    try {
      const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", body: formData
      });

      return await response.json();
    } catch (error) {
      console.error("Turnstile validation error:", error);
      return { success: false, "error-codes": ["internal-error"] };
    }
  }

  try {
    /** @type {FormData} */
    const body = await context.request.formData();
    return await verifyTurnstileAndProcess(body);
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong. Please try again later.", { status: 500 });
  }
}
