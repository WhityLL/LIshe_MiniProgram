
const config = require("config.js")

const urlManager = {

  // 首页
  homeIndexUrl: config.configApiDomain.test + "/shopAPI.php/Index/wshopIndex",
  //分类
  categaryListUrl: config.configApiDomain.test + "/shopAPI.php/Items/classifyList"

}

// 导出方法
export { urlManager }