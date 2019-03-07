// pages/Categary/categary.js

const app = getApp()

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItemCfgd: "",
    searchContent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取分类数据
    that.getCateListData();

    // 获取热搜词汇
    netManager.gethotSearchWords()
  },

  /**
   * 点击了主分类
   */
  onClickMainCategary: function(event){
    var that = this;
    var item_config_id = event.currentTarget.dataset.itemcfgid;
    that.setData({
      currentItemCfgd: item_config_id
    });
    that.getCateListData();
  },

  /**
   * 
   */
  onCateItemAction: function(e) {
    var that = this;
    var catId = e.detail.catId;
    var item_config_id = that.data.currentItemCfgd;
    
    // console.log("cfgId=" + item_config_id);

    wx.navigateTo({
      url: '/pages/SubCate/subCate?cfgId=' + item_config_id + "&catId=" + catId,
    })
  },

  /**
   * 点击了搜索框
   */
  onSearchClick: function (event) {
    let that = this;
    let value = event.detail.value;

    wx.navigateTo({
      url: '/pages/search/search?keyword=' + value + "&cateid=" + that.data.currentNav,
    })

  },

  // 网络请求
  getCateListData: function () {
    var that = this;
    var itemCfgd = that.data.currentItemCfgd;
    netManager.getCategaryList({
      cfgId: itemCfgd,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          console.log(jsonData);

          that.setData({
            cfgId: jsonData.data.cfgid,
            domainCom: jsonData.data.domainCom,
            list: jsonData.data.list,
            subCat: jsonData.data.subCat,
            subCatHot: jsonData.data.subCatHot
          });

          that.setData({
            currentItemCfgd: jsonData.data.cfgid, 
          })
        }
      },
      fail: err => {

      }
    })
  },

})