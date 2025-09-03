import inquirer from "inquirer";
import sdk from "../../dist/index.js";
export async function setupInquirer() {
  const answers = await inquirer.prompt([
    { type: "input", name: "appId", message: "请输入应用ID（appId）:" },
    {
      type: "input",
      name: "appSecret",
      message: "请输入应用密钥（appSecret）:",
    },
  ]);
  try {
    await sdk.updateApplicationConfig(answers.appId, answers.appSecret);
    console.log("配置更新完成，可以开始使用翻译功能");
  } catch (e) {
    console.error("配置更新失败:", e.message);
  }
}
