import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export function loadConfig(urlPath) {
  const configPath = path.resolve(__dirname, urlPath);
  if (!fs.existsSync(configPath)) {
    throw new Error(`配置文件不存在: ${configPath}`);
  }
  const configStr = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(configStr);
  return {
    config,
    path: configPath,
  };
}
export function updateConfig(urlPath, newConfig) {
  const { config, path: configPath } = loadConfig(urlPath);
  const updatedConfig = { ...config, ...newConfig };
  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), "utf-8");
  console.log("配置更新成功:", updatedConfig);
  return updatedConfig;
}
