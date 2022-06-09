const { DateTime } = require("luxon");

module.exports = [
  [
    "formatDate",
    (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString({ locale: process.env.LOCALE });
    },
  ],
  [
    "formatDateTime",
    (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATETIME_SHORT, {
        locale: process.env.LOCALE,
      });
    },
  ],
];
