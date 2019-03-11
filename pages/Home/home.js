// pages/Home/home.js

const app = getApp()

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播页当前index
    swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth : app.globalData.systemInfo.windowWidth,
      windowHeight: app.globalData.systemInfo.windowHeight
    });

    this.getHomeData();

    // 获取热搜词汇
    netManager.gethotSearchWords();

    // 获取购物车数量
    netManager.getCartNum({
      success: e =>{
        console.log(e);

        wx.setTabBarBadge({
          index: 2,
          text: String(e), 
        });

      }
    });

  },

  // 网络请求首页数据
  getHomeData: function(){
    var that = this;
    netManager.getHomeList({
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          // console.log(jsonData);
          var bannerData = jsonData.data.shuDetailList;
          // menu
          var menuItems = jsonData.data.hotType;
          // 专区
          var adlist = jsonData.data.adlist;
          // 置顶数据
          var top4 = jsonData.data.dataList;
          // list数据
          var arr = jsonData.data.arr;
          // 公司信息
          var company = jsonData.data.company;

          that.setData({
            bannerDataArr: bannerData,
            menuItems: menuItems,
            adlist: adlist,
            top4: top4,
            arr: arr,
            company: company
          });
        }
      }
    })
  },

  //轮播图的切换事件
  swiperChange: function (e) {
    var that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    var that = this;
    var index = that.data.swiperCurrent;
    var bannerModel = that.data.bannerDataArr[index];
    var refer = bannerModel.wrefer
    wx.navigateTo({
      url: '/pages/WebView/webView?url=' + refer,
    })
  },

  /**
   * menuItem点击事件
   */
  onclickCateItemAction: e => {
    var cfgId = e.currentTarget.dataset.configid;

    wx.navigateTo({
      url: '/pages/SubCate/subCate?cfgId=' + cfgId,
    })
  },

  /**
   * 热销点击事件
   */
  onTapAdlistClickEvent: function (e){
    var itemId = e.target.dataset.id;
    console.log(itemId);
  },

  /**
   * 点击跳转商品详情
   */
  onProductItemClickAction: e => {
    // console.log(e);
    var itemId = e.detail.itemId;
    wx.navigateTo({
      url: '/pages/ProductDetail/productDetail?itemId=' + itemId,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})