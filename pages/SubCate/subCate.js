// pages/SubCate/subCate.js

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGoTop: false,
    menuFixed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this;
    var keywords = options.keywords ? options.keywords : "";
    var cfgId = options.cfgId ? options.cfgId : "";
    var catId = options.catId ? options.catId : "";
    
    that.setData({
      cfgId: cfgId,
      catId: catId,
      keywords: keywords
    });
    
    // 获取搜索结果数据
    that.getSearchListData();

    // 获取购物车数量
    netManager.getCartNum({
      success: e => {
        that.setData({
          cartNum: e
        })
      }
    });

    // 查询id为affix的元素 离顶部的距离
    var query = wx.createSelectorQuery();
    query.select('#affix').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        menuTop: res[0].top
      })
    });
    
  },

  getSearchListData: function(e){
    var that = this;
    var cfgId = that.data.cfgId;
    var catId = that.data.catId;
    var keywords = that.data.keywords;

    netManager.getSearchList({
      cfgId: cfgId,
      catId: catId,
      keywords: keywords,
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
  },

  /**
   * 监听滚动
   */
  onPageScroll: function(e){
    var that = this;
    // 是否显示回到顶部
    if (e.scrollTop > 500) {
      that.setData({
        showGoTop: true
      });
    } else {
      that.setData({
        showGoTop: false
      });
    }
    // 吸顶效果 【使用了position: sticky;这里的判断和上面的查询（createSelectorQuery）可以省略】
    // if (e.scrollTop > that.data.menuTop) {
    //   that.setData({
    //     menuFixed: true
    //   })
    // } else {
    //   that.setData({
    //     menuFixed: false
    //   })
    // }

  },

  onBackToTopAction: function(e){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 400
    });
    this.setData({
      showGoTop: false
    })
  },

  onGotoCartAction: function (e) {
    wx.switchTab({
      url: '/pages/Cart/cart'
    });
  },

})

