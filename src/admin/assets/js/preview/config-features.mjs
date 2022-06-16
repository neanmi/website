import { el, elc } from "./element-builder.mjs";
import { feature } from "./feature.mjs";

export const ConfigFeaturesPreview = createClass({
  render: function () {
    const props = this.props;
    const entry = props.entry;
    return featuresWrap(
      entry.getIn(["data", "header"]),
      entry.getIn(["data", "subheader"]),
      feature(
        "https://picsum.photos/seed/feature/300/150",
        "Lorem ipsum",
        "Tempor cillum velit et amet quis deserunt cupidatat reprehenderit velit incididunt est laboris."
      )
    );
  },
});

export const featuresWrap = (header, subheader, feature) => {
  return elc(
    "section",
    "wrapper alt",
    elc(
      "div",
      "inner",
      elc("h2", "major", header),
      el("p", subheader),
      elc("section", "features", feature)
    )
  );
};
