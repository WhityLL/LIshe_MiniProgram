
const configManager = {

  getEnvirenment: function() {
    // return "test";
    // return "uat";
    return "pro";
  },

  /**
   * APIDomin
   */
  getApiDomain : function() {
    var envirenment = this.getEnvirenment();
    if (envirenment == "test") {
      return "https://test.shopapi.lishe.cn";
    } else if (envirenment == "uat") {
      return "https://uat.shopapi.lishe.cn";
    } else {
      return "https://shopapi.lishe.cn";
    }
  },

  /**
   * web页面
   */
  getWebDomain : function() {
    var envirenment = this.getEnvirenment();
    if (envirenment == "test") {
      return "https://www.lishe.cn:8080";
    } else if (envirenment == "uat") {
      return "https://www.lishe.cn:8090";
    } else {
      return "https://www.lishe.cn";
    }
  }

}

// 导出方法
export { configManager }

