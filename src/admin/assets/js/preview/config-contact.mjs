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
    elc("li", "icon solid fa-home", props.widgetFor("address")),
    elc("li", "icon solid fa-phone", el("a", entry.getIn(["data", "telephone"]))),
    elc("li", "icon solid fa-envelope", el("a", entry.getIn(["data", "email"]))),
    elc("li", "icon brands fa-twitter", el("a", entry.getIn(["data", "twitter"])))
  );
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
