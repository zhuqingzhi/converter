// 更新配置
import { updateConfig } from "../utils/loadConfig.js";
// 更新应用配置信息
export async function updateApplicationConfig(appId, appSecret) {
  updateConfig("./config/application.config.json", { appId, appSecret });
}
