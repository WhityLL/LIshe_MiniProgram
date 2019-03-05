//app.js
App({
  onLaunch: function () {
    var systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo);
    this.globalData.systemInfo = systemInfo;

  },

  globalData: {
    systemInfo: null,
    userInfo: null
  }

})