import reactConfig from "@watcha/eslint-config/react";

export default [
  ...reactConfig,
  {
    files: ["webpack*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "writable",
        exports: "writable",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
  },
];
