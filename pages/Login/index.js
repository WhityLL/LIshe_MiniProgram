// pages/Login/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    pw: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onUserNameChange: function(e) {
    var username = e.detail;
    this.setData({
      username: username
    });
  },

  onPwChange: function(e) {
    var pw = e.detail;
    this.setData({
      pw: pw
    });
  },

  onBtnLoginEvent: function(e) {
    var userName = this.data.username;
    var password = this.data.pw;
    app.netManager.login({
      userName: userName,
      password: password,
      success: jsonData => {
        // console.log(jsonData);
        if (jsonData.errcode == 0 && jsonData.result == 100){
          var token = jsonData.data.info.token;
          app.globalData.token = token;
          console.log(token);
          if (token) {
            wx.switchTab({
              url: '/pages/Home/home'
            })
          }  
        }
      }
    });
  }

})