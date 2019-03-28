// pages/ConfirmOrder/index.js

const app = getApp()

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
    var itemList = options.itemList;
    this.setData({
      itemList: itemList
    });
    this.orderOrder();
  },

  orderOrder: function(e){
    var that = this;
    var itemList = that.data.itemList;
    app.netManager.orderOrder({
      itemList: itemList,
      success: jsonData => {
        if (jsonData.errcode == 0 && jsonData.result == 100) {
          console.log(jsonData);
          that.setData({
            address: jsonData.data.address,
            allTotalCash: jsonData.data.allTotalCash,
            allTotalPoint: jsonData.data.allTotalPoint,
            allTotalPointPostfree: jsonData.data.allTotalPointPostfree,
            allTotalPrice: jsonData.data.allTotalPrice,
            allTotalPricePostfree: jsonData.data.allTotalPricePostfree,
            allTotalTaxationPoint: jsonData.data.allTotalTaxationPoint,
            allTotalTaxationPrice: jsonData.data.allTotalTaxationPrice,
            cartIds: jsonData.data.cartIds,
            isRealIdNum: jsonData.data.isRealIdNum,
            isCrossBorder: jsonData.data.isCrossBorder,
            pointPayType: jsonData.data.pointPayType,
            shopList: jsonData.data.shopList,
            shopPostfeeInfo: jsonData.data.shopPostfeeInfo,
            totalCartDeliveryPoint: jsonData.data.totalCartDeliveryPoint,
            totalCartDeliveryPrice: jsonData.data.totalCartDeliveryPrice,
            totalQuantity: jsonData.data.totalQuantity,
            unUsedCouponList: jsonData.data.unUsedCouponList,
            useCouponList: jsonData.data.useCouponList,
          });
        }
      }
    });
  },

  onClickSubmitOrderAction: function(e){
    

  }

})