// pages/wxpay/wxpay.js
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
    //页面加载调取微信支付（原则上应该对options的携带的参数进行校验）
    that.requestPayment(options);
  },

  //根据 obj 的参数请求wx 支付
  requestPayment: function (obj) {
    //获取options的订单Id
    var orderId = obj.orderId;
    //调起微信支付
    wx.requestPayment({
      //相关支付参数
      'timeStamp': obj.timestamp,
      'nonceStr': obj.nonceStr,
      'package': 'prepay_id=' + obj.prepay_id,
      'signType': obj.signType,
      'paySign': obj.paySign,
      //小程序微信支付成功的回调通知
      'success': function (res) {
        //定义小程序页面集合
        var pages = getCurrentPages();
        //当前页面 (wxpay page)
        var currPage = pages[pages.length - 1];
        //上一个页面 （index page） 
        var prevPage = pages[pages.length - 2];
        //通过page.setData方法使index的webview 重新加载url  有点类似于后台刷新页面
        //此处有点类似小程序通过加载URL的方式回调通知后端 该订单支付成功。后端逻辑不做赘述。
        prevPage.setData({
          url: "https://xxxxxxxxxx.com/wx_isPayment.jhtml?orderId=" + orderId + '&ispay=0',

        }),
          //小程序主动返回到上一个页面。即从wxpay page到index page。此时index page的webview已经重新加载了url 了
          //微信小程序的page 也有栈的概念navigateBack 相当于页面出栈的操作
          wx.navigateBack();
      },
      //小程序支付失败的回调通知
      'fail': function (res) {
        console.log("支付失败"),
          console.log(res)
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2];
        console.log("准备修改数据")
        prevPage.setData({
          url: "https://xxxxxxxxxx/wx_isPayment.jhtml?orderId=" + orderId + '&ispay=0',
        }),
          console.log("准备结束页面")
        wx.navigateBack();
      }
    })
  }
})

// https://blog.csdn.net/u013401630/article/details/78989581

//  webView 端代码
//判断是否是在wx小程序环境
// if (small_wx && data.resultCode == 'success') {
//   //点击微信支付后，调取统一下单接口生成微信小程序支付需要的支付参数
//   var params = '?timestamp=' + data.jsparams.timeStamp + '&nonceStr=' + data.jsparams.nonceStr
//     + '&' + data.jsparams.pkg + '&signType=' + data.jsparams.signType
//     + '&paySign=' + data.jsparams.paySign + '&orderId=' + data.orderid + '&pType=0';
//   //定义path 与小程序的支付页面的路径相对应
//   var path = '/pages/wxpay/wxpay' + params;
//   //通过JSSDK的api使小程序跳转到指定的小程序页面
//   wx.miniProgram.navigateTo({ url: path });
// }