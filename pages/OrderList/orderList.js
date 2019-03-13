// pages/OrderList/orderList.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    segmentItems: ["全部订单","待付款","待发货","待收获","已完成"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status = options.status;
    this.setData({
      status: status
    });

    this.getOrderList()
  },

  getOrderList: function(params) {
    var that = this;
    app.netManager.getOrderList({
      status: that.data.status,
      success: jsonResp => {
        if(jsonResp.result == 100 && jsonResp.errcode == 0){
          var mcuid = jsonResp.data.mcuid;
          var orderNumber = jsonResp.data.orderNumber;
          var paymentTrade = jsonResp.data.paymentTrade;
          var status = jsonResp.data.status;
          var total = jsonResp.data.total;

          for (var i = 0; i < paymentTrade.length; i++){
            var paymentTradeObj = paymentTrade[i];
            var tradeInfo = paymentTradeObj.tradeInfo;
            var paymentId = paymentTradeObj.paymentId;
            paymentId = (paymentId.substring(0, paymentId.length-1));

            console.log(paymentTradeObj);
            console.log(tradeInfo);
            console.log(tradeInfo[paymentId]);
            console.log("================" + paymentId);
          }

          that.setData({
            mcuid: mcuid,
            orderNumber: orderNumber,
            paymentTrade: paymentTrade,
            status: status,
            total: total
          })
        }
      }
    })
  },


  onSegmentItemClick: function(e){
    var index = e.detail.index;
    var status;
    if(index == 0){
      status = "";
    }else if(index == 1){
      status = "WAIT_BUYER_PAY";
    } else if (index == 2) {
      status = "WAIT_SELLER_SEND_GOODS";
    } else if (index == 3) {
      status = "WAIT_BUYER_CONFIRM_GOODS";
    } else if (index == 4) {
      status = "TRADE_FINISHED";
    }else{
      status = "";
    }
    this.setData({
      status: status,
      mcuid: 0,
      orderNumber: 0,
      paymentTrade: [],
      total: 0
    });

    this.getOrderList()
  }
})