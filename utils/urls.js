
import { configManager } from "config.js"

const urlManager = {
  // 首页
  homeIndexUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Index/wshopIndex";
  },

  //分类
  categaryListUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Items/classifyList";
  },

  searchListUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Items/searchList";
  },

  getHotSearchWordsUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Items/hotSearch";
  },

  getCartNumUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Order/getCartNum";
  },

  getProductDetailUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Info/wshopIndex";
  },

  getCartUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Order/cart"
  },

  getCheckedCartItemUrl: function(){
    return configManager.getApiDomain() + "/shopAPI.php/Order/checkedCartItem"
  }

}

// 导出方法
export { urlManager }