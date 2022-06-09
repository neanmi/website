module.exports = [
  [
    "devEnv",
    (trueValue, falseValue) => {
      return process.env.NODE_ENV === "development" ? trueValue : falseValue;
    },
  ],
];
