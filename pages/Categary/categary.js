// pages/Categary/categary.js

const app = getApp()

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCatId: "",
    searchContent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.getCateListData();
  },

  /**
   * 点击了主分类
   */
  onClickMainCategary: function(event){
    var that = this;
    var catId = event.currentTarget.dataset.catid;
    that.setData({
      currentCatId: catId
    });
    that.getCateListData();
  },

  /**
   * 点击了搜索框
   */
  onSearchClick: function (event){
    let that = this;
    let value = event.detail.value;

    wx.navigateTo({
      url: '/pages/search/search?keyword=' + value + "&cateid=" + that.data.currentNav,
    })

  },

  onCateItemAction: e => {
    // console.log(e);
    var cfgId = e.detail.cfgId;
    var catId = e.detail.catId;
    wx.navigateTo({
      url: '/pages/SubCate/subCate?cfgId=' + cfgId + "&catId=" + catId,
    })
  },

  // 网络请求
  getCateListData: function () {
    var that = this;
    var catId = that.data.currentCatId;
    netManager.getCategaryList({
      catId: catId,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          console.log(jsonData);

          that.setData({
            catId: jsonData.data.cfgid,
            domainCom: jsonData.data.domainCom,
            list: jsonData.data.list,
            subCat: jsonData.data.subCat,
            subCatHot: jsonData.data.subCatHot
          });

          that.setData({
            currentCatId: jsonData.data.cfgid,
          })
        }
      },
      fail: err => {

      }
    })
  },

})