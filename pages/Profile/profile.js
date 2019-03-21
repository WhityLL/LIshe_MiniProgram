// pages/Profile/profile.js

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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getUsrCenterData();

    // 获取未读消息数量
    app.netManager.getUnReadMsgNum({
      success: e => {
        console.log("未读消息数量=" + e);
        that.setData({
          unReadMsgNum: e
        })
      }
      
    });
  },

  /**
   * 获取用户信息
   */
  getUsrCenterData: function(e){
    var that = this;
    app.netManager.getUserCenterInfo({
      success: jsonResp => {
        console.log(jsonResp);
        if (jsonResp.errcode == 0 && jsonResp.result == 100){
          var collectCount = jsonResp.data.collectCount;
          var comId = jsonResp.data.comId;
          var count = jsonResp.data.count;
          var depositInfo = jsonResp.data.depositInfo;
          var domainCom = jsonResp.data.domainCom;
          var namesMResult = jsonResp.data.namesMResult;
          var userInfo = namesMResult[0];
          var newDepositDetailList = jsonResp.data.newDepositDetailList;
          var points = jsonResp.data.points;

          that.setData({
            collectCount: collectCount,
            comId: comId,
            count: count,
            depositInfo: depositInfo,
            domainCom: domainCom,
            namesMResult: namesMResult,
            userInfo: userInfo,
            newDepositDetailList: newDepositDetailList,
            points: points
          })
        }
      }
    })
  }

})