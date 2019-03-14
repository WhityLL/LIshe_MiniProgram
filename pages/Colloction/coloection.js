// pages/Colloction/coloection.js

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
    var that = this;
    app.netManager.getFavList({
      success: jsonData => {
        // console.log(jsonData);
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.setData({
            productList: jsonData.data
          });
        }
      }
    });

  },

  
})