// pages/OrderList/orderList.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSegmentIndex: 0,
    showNoMoreData: false,
    page: 1,
    segmentItems: ["全部订单","待付款","待发货","待收货","已完成"],
    orderNumber: 0,
    paymentTrade: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status = options.status;
    var segmentIndex = options.segmentIndex;

    console.log(segmentIndex);

    this.setData({
      status: status,
      currentSegmentIndex: segmentIndex
    });

    this.getOrderList()
  },

  getOrderList: function(params) {
    var that = this;
    wx.showLoading({
      title: "正在加载中..."
    })
    app.netManager.getOrderList({
      page: that.data.page,
      status: that.data.status,
      success: jsonResp => {
        if(jsonResp.result == 100 && jsonResp.errcode == 0){
          var mcuid = jsonResp.data.mcuid;
          var orderNumber = jsonResp.data.orderNumber;
          var paymentTrade = jsonResp.data.paymentTrade;
          var status = jsonResp.data.status;
          var total = jsonResp.data.total;

          console.log(paymentTrade);
          // 数据处理
          for (var i = 0; i < paymentTrade.length; i++){
            var paymentTradeObj = paymentTrade[i];
            var tradeInfo = paymentTradeObj.tradeInfo;
            var paymentId = paymentTradeObj.paymentId;
            paymentId = (paymentId.substring(0, paymentId.length-1));
            var tradeInfoList = Object.values(tradeInfo);
            for (var j = 0; j < tradeInfoList.length; j++){
              var obj = tradeInfoList[j];
              var orderArr = Object.values(obj.order);
              // 处理商品数据
              obj.orderArr = orderArr;
            }
            // 不同商家的商品
            paymentTradeObj.tradeInfoList = tradeInfoList
          }

          var originpaymentTradeArr = that.data.paymentTrade;
          originpaymentTradeArr = originpaymentTradeArr.concat(paymentTrade);

          var showNoMoreData = orderNumber < 10 ? true : false;

          // 初始化数据
          that.setData({
            mcuid: mcuid,
            orderNumber: orderNumber,
            paymentTrade: originpaymentTradeArr,
            status: status,
            total: total,
            showNoMoreData: showNoMoreData
          });
  
          // console.log(originpaymentTradeArr);
          // console.log("===========");

        }
        wx.hideLoading();
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
      total: 0,
      page: 1,
      showNoMoreData: false
    });

    this.getOrderList()
  },

  onReachBottom: function(e){
    var that = this;
    if (!that.data.showNoMoreData){
      console.log("加载更多");

      var page = that.data.page + 1;
      that.setData({ page: page });
      that.getOrderList();
    }
  }

})