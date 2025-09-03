#! /usr/bin/env node
import { program } from "commander";
import sdk from "../dist/index.js";
import "./setApplicationConfig.js";
program.version("0.1.0");

program
  .name("converter")
  .description("一个简单的翻译工具")
  .usage("converter sourceWord");

program
  .argument("<sourceWord>", "需要翻译的文本")
  .argument("[from]", "源语言，默认中文zh-CHS")
  .argument("[to]", "目标语言，默认英文en")
  .action(async (sourceWord, from, to) => {
    try {
      const res = await sdk.api.textTransform.transform(sourceWord, from, to);
      if (res.query && res.translation) {
        console.log("查询成功:", res.translation.join(" "));
      } else {
        console.error("翻译失败：错误码ID-", res.errorCode);
      }
    } catch (e) {
      console.error("翻译失败:", e.message);
    }
  });

program.parse(process.argv);
