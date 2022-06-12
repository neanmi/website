import { el, elc, eli } from "./element-builder.mjs";

export const ConfigErrorsPreview = createClass({
  render: function () {
    const props = this.props;
    return eli("div", "page-wrapper", message404(props));
  },
});

const message404 = (props) => {
  const entry = props.widgetsFor("http_404");
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
          el("p", entry.getIn(["data", "description"])),
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
