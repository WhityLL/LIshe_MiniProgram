// pages/SubCate/subCate.js

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
    // console.log(options);
    var that = this;
    var cfgId = options.cfgId ? options.cfgId : "";
    var catId = options.catId ? options.catId : "";
    
    that.setData({
      cfgId: cfgId,
      catId: catId
    });

    that.getSearchListData();
  },

  getSearchListData: function(e){
    var that = this;
    var cfgId = that.data.cfgId;
    var catId = that.data.catId;

    netManager.getSearchList({
      cfgId: cfgId,
      catId: catId,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          //console.log(jsonData);

          that.setData({
            cartCount: jsonData.data.cartCount,
            catId: jsonData.data.catId,
            cfgId: jsonData.data.cfgId,
            catNameArr: jsonData.data.catNameArr,
            catNameArrInfo: jsonData.data.catNameArrInfo,
            
            companyConfigInfo: jsonData.data.companyConfigInfo,
            jCatIdTwo: jsonData.data.jCatIdTwo,
            
            list: jsonData.data.list,
            listCount: jsonData.data.listCount,
            
            keywords: jsonData.data.keywords,
            shopId: jsonData.data.shopId,
            sort: jsonData.data.sort,
            totalPage: jsonData.data.totalPage,

            newUserAddressList: jsonData.data.newUserAddressList,
          });
        }
      },
      fail: err => {

      }
    });

  },



  /**
   * 点击商品
   */
  onProductClickAction: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var productModel = that.data.list[index];
    
    var itemId = productModel.item_id;
    wx.navigateTo({
      url: '/pages/ProductDetail/productDetail?itemId=' + itemId,
    })

  },

  /**
   * 点击了搜索
   */
  onSearchViewClickAction: function(e){
    var keywords = this.data.keywords;
    wx.navigateTo({
      url: '/pages/search/search?keywords=' + keywords,
    })
  }

})

