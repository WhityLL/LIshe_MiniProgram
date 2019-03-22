// pages/EditAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "add"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var type = options.type;
    this.setData({
      type: type
    });
    if (type == "add") {
      wx.setNavigationBarTitle({
        title: '新增收货地址',
      });
    } else {
      wx.setNavigationBarTitle({
        title: '编辑收货地址',
      });
    }

  },

})