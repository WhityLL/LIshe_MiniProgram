
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
  }
}

// 导出方法
export { urlManager }