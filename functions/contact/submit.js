//noinspection JSUnusedGlobalSymbols
/**
 * POST /contact/success
 */
export async function onRequestPost(context) {
  /** @type {Request} */
  const request = context.request;
  /** @type {Record<string, string>} */
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

    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST", headers: {
        "content-type": "application/json", "authorization": `Bearer ${env.SENDGRID_API_KEY}`
      }, body: JSON.stringify({
        "personalizations": [{
          "to": [{
            "email": env.CONTACT_FORM_EMAIL_TO
          }]
        }], "from": {
          "email": env.CONTACT_FORM_EMAIL_FROM
        }, "subject": "New contact form submission", "content": [{
          "type": "text/html", "value": `
        <strong>Name:</strong> ${escapeHtml(body.get("name"))}<br/>
        <strong>Email:</strong> ${escapeHtml(body.get("email"))}<br/>
        <strong>Message:</strong> ${escapeHtml(body.get("message"))}<br/>
      `
        }]
      })
    });

    if (!res.ok) {
      console.log("Sendgrid email not sent: ", res.status, await res.json());
      throw new Error("Failed to send email.");
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
