import { el, elc, eli } from "./element-builder.mjs";

export const ConfigContactPreview = createClass({
  render: function () {
    const props = this.props;
    const entry = props.entry;
    return wrap(success(props), footer(entry, form(entry), contacts(props, entry)));
  },
});

const wrap = (success, footer) => {
  return eli("div", "page-wrapper", success, footer);
};

const success = (props) => {
  const entry = props.widgetsFor("success");
  return eli(
    "section",
    "wrapper",
    elc(
      "div",
      "wrapper alt style1",
      elc(
        "div",
        "inner",
        elc(
          "div",
          "content",
          elc("h2", "major", entry.getIn(["data", "header"])),
          el("p", entry.getIn(["data", "message"])),
          elc(
            "ul",
            "actions",
            el("li", elc("a", "button", entry.getIn(["data", "button"])))
          )
        )
      )
    )
  );
};

const footer = (entry, ...elements) => {
  return eli(
    "section",
    "footer",
    elc(
      "div",
      "inner",
      elc("h2", "major", entry.getIn(["data", "header"])),
      el("p", entry.getIn(["data", "subheader"])),
      ...elements
    )
  );
};

const form = (entry) => {
  return el(
    "form",
    elc(
      "div",
      "fields",
      elc("div", "field", el("label", "Name"), h("input", { type: "text" })),
      elc("div", "field", el("label", "Email"), h("input", { type: "email" })),
      elc("div", "field", el("label", "Message"), h("textarea", { rows: "4" })),
      elc("div", "field", el("label", "Verification"), captcha())
    ),
    elc("ul", "actions", el("li", h("input", { type: "submit", value: "Send Message" })))
  );
};

const contacts = (props, entry) => {
  return elc(
    "ul",
    "contact",
    ifExists(props.widgetFor("address"), (address) =>
      elc("li", "icon solid fa-home", address)
    ),
    ifExists(entry.getIn(["data", "telephone"]), (phone) =>
      elc("li", "icon solid fa-phone", el("a", phone))
    ),
    elc("li", "icon solid fa-envelope", el("a", entry.getIn(["data", "email"]))),
    ifExists(entry.getIn(["data", "twitter"]), (twitter) =>
      elc("li", "icon brands fa-twitter", el("a", twitter))
    ),
    ifExists(entry.getIn(["data", "linkedin"]), (linkedin) =>
      elc("li", "icon brands fa-linkedin", el("a", linkedin))
    ),
    ifExists(entry.getIn(["data", "instagram"]), (instagram) =>
      elc("li", "icon brands fa-instagram", el("a", instagram))
    )
  );
};

const ifExists = (data, fn) => {
  return data ? fn(data) : null;
};

const captcha = () => {
  return h(
    "div",
    {
      style: {
        backgroundColor: "#f9f9f9",
        color: "black",
        width: "304px",
        height: "78px",
        display: "grid",
        placeItems: "center",
      },
    },
    "Captcha placeholder"
  );
};
