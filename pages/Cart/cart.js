// pages/Cart/cart.js

import { netManager } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked: "0",
    isEdit: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.getCartData();
  },

  getCartData: function(e){
    var that = this;
    netManager.getCartList({
      success: jsonData => {
        console.log(jsonData);
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          var addressData = jsonData.data.address;
          var normalData = jsonData.data.normal;
          var expireData = jsonData.data.expire;
          var allChecked = jsonData.data.allChecked;
          var allCheckedNum = jsonData.data.allCheckedNum;
          var checkedTotalPoint = jsonData.data.checkedTotalPoint;
          that.setData({
            addressData: addressData,
            normalData: normalData,
            expireData: expireData,
            allChecked: allChecked,
            allCheckedNum: allCheckedNum,
            checkedTotalPoint: checkedTotalPoint
          });
        }
      }
    });
    
  },

  /**
   * 商家 选中 取消
   */
  onShopCheckBoxAction: function(e){ 
    var that = this;
    var isCheck = e.detail.isCheck ? "1" : "0";
    var shopId = e.currentTarget.dataset.shopid;
    netManager.getCheckedCartItem({
      isCheck: isCheck,
      shopId : shopId,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.getCartData();
        }
      }
    })
  },

  /**
   * sku 选中 取消
   */
  onProductCheckBoxAction: function (e) {
    var that = this;
    var isCheck = e.detail.isCheck ? "1" : "0";
    var skuId = e.detail.skuid;
    netManager.getCheckedCartItem({
      isCheck: isCheck,
      skuId: skuId,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.getCartData();
        }
      }
    })
  },

  /**
   * 全选 取消
   */
  onAllCheckBoxAction: function (e) {
    var that = this;
    var isCheck = e.detail.isCheck ? "1" : "0";
    netManager.getCheckedCartItem({
      isCheck: isCheck,
      all: "1",
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.getCartData();
        }
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})