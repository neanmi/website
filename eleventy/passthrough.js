module.exports.passthrough = [
  "src/admin",
  "uploads",

  ...(process.env.NODE_ENV === "development"
    ? ["src/assets/js/", "src/assets/css/"]
    : ["src/assets/js/*min.js", "src/assets/css/*.min.css"]),
];
