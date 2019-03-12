//app.js

import touch      from 'utils/touch.js'
import netManager from 'utils/network.js'

App({
  onLaunch: function () {
    var systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo);
    this.globalData.systemInfo = systemInfo;

  },

  globalData: {
    systemInfo: null,
    userInfo: null
  },

  touch: new touch(),

  netManager: new netManager()

})