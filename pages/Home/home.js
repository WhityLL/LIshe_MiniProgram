// pages/Home/home.js

const app = getApp()

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth : app.globalData.systemInfo.windowWidth,
      windowHeight: app.globalData.systemInfo.windowHeight
    })

    this.getHomeData();
  },


  getHomeData: function(){
    var that = this;
    netManager.getHomeList({
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2NTciLCJjb21JZCI6IjE0NjQzMTc0NjAwMzciLCJhY2NvdW50IjoiMTg2NjQzNzc4NTEiLCJ1c2VyTmFtZSI6Ilx1OTQ5Zlx1NTE0Nlx1NjU4NyJ9.a6RdutnQwDKAciEf57R08CC9GIQJaPz2wlaMpUuy30o",
      success: jsonData => {

        if (jsonData.result == 100 & jsonData.errcode == 0) {
          var bannerData = jsonData.data.shuDetailList;
          // menu
          var menuItems = jsonData.data.hotType;
          // 专区
          var adlist = jsonData.data.adlist;

          // 置顶数据
          var top4 = jsonData.data.dataList;
          // list数据
          var arr = jsonData.data.arr;

          var company = jsonData.data.company;
          that.setData({
            bannerData: bannerData,
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

  onTapAdlistClickEvent: function (e){
    var itemId = e.target.dataset.id;
    console.log(itemId);
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