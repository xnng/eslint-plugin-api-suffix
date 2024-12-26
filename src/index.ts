import requireApiSuffix from "./rules/require-api-suffix";

export = {
  rules: {
    "require-api-suffix": requireApiSuffix,
  },
  configs: {
    recommended: {
      plugins: ["@xnng/api-suffix"],
      rules: {
        "@xnng/api-suffix/require-api-suffix": "warn",
      },
    },
  },
};
