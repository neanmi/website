const siteUrl = process.env.URL || "http://localhost:8080";

module.exports = {
  siteUrl,
  siteDescription: "Eleventy Website",
  siteImage: siteUrl + "/uploads/eleventy.jpg",
};
