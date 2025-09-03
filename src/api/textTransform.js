import request from "../utils/request.js";
import sha256 from "crypto-js/sha256.js";
import { loadConfig } from "../utils/loadConfig.js";
const config = loadConfig("./config/textTransform.config.json").config;
const appConfig = loadConfig("./config/application.config.json").config;
// 文本翻译
function generateSign(query, from, to, curtime) {
  const { appId, appSecret } = appConfig;
  const { salt, signType, from: _from, to: _to } = config;
  if (!from) from = _from;
  if (!to) to = _to;
  let input = "";
  if (query.length <= 20) {
    input = query;
  } else {
    input =
      query.substring(0, 10) +
      query.length +
      query.substring(query.length - 10, query.length);
  }
  const str = appId + input + salt + curtime + appSecret;
  return sha256(str).toString();
}

export default {
  transform(query, from, to) {
    const curtime = Math.round(new Date().getTime() / 1000);
    const sign = generateSign(query, from, to, curtime);
    return request({
      method: "post",
      data: {
        q: query,
        from: from || config.from,
        to: to || config.to,
        appKey: appConfig.appId,
        salt: config.salt,
        sign: sign,
        signType: config.signType,
        curtime,
      },
    });
  },
};
