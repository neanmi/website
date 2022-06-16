import { asset, el, elc, wrap } from "./element-builder.mjs";

export const ServicePreview = createClass({
  render: function () {
    const props = this.props;
    const entry = props.entry;
    return elc(
      "section",
      "wrapper spotlight style1",
      elc(
        "div",
        "inner",
        elc(
          "div",
          "image",
          h("img", { src: asset(props, entry.getIn(["data", "image"])) })
        ),
        elc(
          "div",
          "content",
          elc(
            "h2",
            "major",
            entry.getIn(["data", "title"]),
            " ",
            elc("span", `icon ${entry.getIn(["data", "icon"])}`)
          ),
          el("p", props.widgetFor("description"))
        )
      )
    );
  },
});
