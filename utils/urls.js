import {
  configManager
} from "config.js"

const urlManager = {
  // 首页
  homeIndexUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Index/wshopIndex";
  },

  //分类
  categaryListUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Items/classifyList";
  },

  //搜索结果
  searchListUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Items/searchList";
  },

  //热搜词汇
  getHotSearchWordsUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Items/hotSearch";
  },

  //商品详情
  getProductDetailUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Info/wshopIndex";
  },
  
  /**  购物车 */

  //购物车数量
  getCartNumUrl: function () {
    return configManager.getApiDomain() + "/shopAPI.php/Order/getCartNum";
  },

  //加入购物车
  getAddToCartUrl: function () {
    return configManager.getApiDomain() + "/lsheApi.php/Cart/addItemCart"
  },

  //购物车列表
  getCartUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Order/cart"
  },

  //勾选 取消勾选购物车商品
  getCheckedCartItemUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Order/checkedCartItem"
  },

  //删除购物车商品
  getDeleteCartIdsUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Order/deleteCartId"
  },

  /** 个人中心 */
  
  //个人中心 用户信息
  getUserCenterUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/User/userCenter"
  },

  //获取未读消息数
  getUnReadMsgNumUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Message/messageList"
  },

  //获取收藏列表
  getFavListUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/Info/favList"
  },

  //用户积分列表
  getUserJifenUrl: function() {
    return configManager.getApiDomain() + "/shopAPI.php/User/jifen"
  },

  /**  Order */
  //获取订单列表数据
  getOrderListUrl: function () {
    return configManager.getApiDomain() + "/shopAPI.php/User/orderList"
  }

}

// 导出方法
export {
  urlManager
}