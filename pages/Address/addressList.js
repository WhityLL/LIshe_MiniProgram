// pages/Address/addressList.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultIcon: {
      normal: '/images/Addres/add_ic_unselet.png',
      active: '/images/Addres/add_ic_selet.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    app.netManager.getAddressList({
      success: jsonData => {
        console.log(jsonData);
        if (jsonData.errcode == 0 && jsonData.result == 100) {
          that.setData({
            addressList: jsonData.data
          })
        }
      }
    })

  },
  
  onSetDefaultAddressAction: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
  },

  onDeleteAddressAction: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
  },

  onEditAddressAction: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var addressModel = that.data.addressList[index];
    wx.navigateTo({
      url: '/pages/EditAddress/index?type=edit' + "&address=" + addressModel,
    })
  },

  onAddAddressAction: function(){
    wx.navigateTo({
      url: '/pages/EditAddress/index?type=add',
    })
  }

})