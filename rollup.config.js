import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "esm",
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    clear({ targets: ["dist"] }),
    copy({
      targets: [{ src: "src/config/*.json", dest: "dist/config" }],
    }),
  ],
});
