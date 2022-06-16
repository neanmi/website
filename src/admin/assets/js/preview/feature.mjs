import { featuresWrap } from "./config-features.mjs";
import { asset, el, elc } from "./element-builder.mjs";

export const FeaturePreview = createClass({
  render: function () {
    const props = this.props;
    const entry = props.entry;
    return featuresWrap(
      "Lorem ipsum",
      "Do Lorem quis qui consequat do nulla officia anim irure officia.",
      feature(
        asset(props, entry.getIn(["data", "image"])),
        entry.getIn(["data", "title"]),
        props.widgetFor("description")
      )
    );
  },
});

export const feature = (image, title, description) => {
  return el(
    "article",
    elc("div", "image", h("img", { src: image })),
    elc("h3", "major", title),
    el("p", description)
  );
};
