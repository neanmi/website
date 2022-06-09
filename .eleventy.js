const { passthrough } = require("./eleventy/passthrough");
const dateFilters = require("./eleventy/filter/date");
const nodeEnv = require("./eleventy/shortcode/nodeEnv");
const markdownPaired = require("./eleventy/shortcode/paired/markdown");

module.exports = (config) => {
  passthrough.forEach((pt) => config.addPassthroughCopy(pt));
  [...dateFilters].forEach(([name, fn]) => config.addFilter(name, fn));
  [...nodeEnv].forEach(([name, fn]) =>
    config.addShortcode(name, fn)
  );
  [...markdownPaired].forEach(([name, fn]) =>
    config.addPairedShortcode(name, fn)
  );
  config.setBrowserSyncConfig({
    snippetOptions: {
      ignorePaths: "/admin/**"
    }
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};