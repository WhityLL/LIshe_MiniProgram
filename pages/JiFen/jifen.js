// pages/JiFen/jifen.js

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
    app.netManager.getUserJifen({
      success: jsonData => {
        console.log(jsonData);
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.setData({
            depositLogList: jsonData.data.depositLogList,
            jf: jsonData.data.jf,
            pointType: jsonData.data.pointType,
            tyjf: jsonData.data.tyjf,
            zzjf: jsonData.data.zzjf,
            type: jsonData.data.type

          });
        }
      }
    });
  }

  
})