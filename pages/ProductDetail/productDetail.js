// pages/ProductDetail/productDetail.js

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    minPointSku: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var itemId = options.itemId;
    that.setData({
      itemId: itemId
    })

    that.getProductData(itemId);
  },

  getProductData:function(itemId){
    var self = this;

    netManager.getProductDetail({
      itemId: itemId,
      success: e => {
        console.log(e);
        self.setData({
          new_list_images: e.data.itemInfo.new_list_images,
          itemInfo: e.data.itemInfo,
          itemDesc: e.data.itemDesc,
          itemStatus: e.data.itemStatus,
          newUserAddressList: e.data.newUserAddressList,
          sKuList: e.data.sKuList,
          shopName: e.data.shopName,
          freepostageLimitMoney: e.data.freepostageLimitMoney,
          coupons_count: e.data.coupons_count,
          coupons: e.data.coupons,
          couponRules: e.data.couponRules
        })

        // 数据处理
        self.formatterData();
      }
    })
  },

  formatterData: function(){
    var that = this;

    /// 默认选择最小价格的sku
    var minPointSku = that.data.sKuList[0];
    for (var i = 1; i < that.data.sKuList.length - 1; i++){
      var temp = that.data.sKuList[i];
      if (temp.point < minPointSku.point){
        minPointSku = temp;
      }
    }
    that.setData({
      minPointSku: minPointSku
    });

    /// 获取默认地址
    var defaultAddress = {};
    for (var i = 0; i < that.data.newUserAddressList.length; i++) {
      var temp = that.data.newUserAddressList[i];
      if (temp.def_addr == 1) {
        defaultAddress = temp;
        that.setData({
          defaultAddress: defaultAddress
        })
        break;
      }
    }

    /// 商品详情 富文本中的图片处理(正则替换 加一个class)
    var productDetailRichText = that.data.itemDesc.pc_desc;
    productDetailRichText = productDetailRichText.replace(/\<img/gi, '<img class="rich-img" ');
    that.setData({
      productDetailRichText: productDetailRichText
    });
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
    console.log("点击了商品详情轮播图" + index);
  },


})