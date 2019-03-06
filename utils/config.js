var configApiDomain = {

  test: "https://test.shopapi.lishe.cn",

  uat: "https://uat.shopapi.lishe.cn",

  pro: "https://shopapi.lishe.cn"
}

var getDomain = function (n) {
  if (n == "test") {
    return this.configApiDomain.test;
  } else if (n == "uat") {
    return this.configApiDomain.uat;
  } else {
    return this.configApiDomain.pro;
  }
}

// 导出方法 提供给外界使用
module.exports = {
  configApiDomain: configApiDomain,
  getDomain: getDomain
}