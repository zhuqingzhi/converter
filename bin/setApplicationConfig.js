import { program } from "commander";
import { setupInquirer } from "./inquirers/setup.js";
program
  .command("setup")
  .description("设置应用配置")
  .action(async () => {
    await setupInquirer();
  });
