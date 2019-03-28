// pages/Cart/cart.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked: "0",
    isEdit: 0,
    cartNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    // 获取购物车数量
    app.netManager.getCartNum({
      success: e => {
        that.setData({
          cartNum: e
        });
      }
    });

    // 购物车列表
    that.getCartData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  getCartData: function(e) {
    var that = this;
    app.netManager.getCartList({
      success: jsonData => {
        console.log(jsonData);
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          var addressData = jsonData.data.address;
          var normalData = jsonData.data.normal;
          var expireData = jsonData.data.expire;
          var allChecked = jsonData.data.allChecked;
          var allCheckedNum = jsonData.data.allCheckedNum;
          var checkedTotalPoint = jsonData.data.checkedTotalPoint;
          that.setData({
            addressData: addressData,
            normalData: normalData,
            expireData: expireData,
            allChecked: allChecked,
            allCheckedNum: allCheckedNum,
            checkedTotalPoint: checkedTotalPoint
          });
        }
      }
    });

  },

  /**
   * 商家 选中 取消
   */
  onShopCheckBoxAction: function(e) {
    var that = this;
    var isCheck = e.detail.isCheck ? "1" : "0";
    var shopId = e.currentTarget.dataset.shopid;
    app.netManager.getCheckedCartItem({
      isCheck: isCheck,
      shopId: shopId,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.getCartData();
        }
      }
    })
  },

  /**
   * sku 选中 取消
   */
  onProductCheckBoxAction: function(e) {
    var that = this;
    var isCheck = e.detail.isCheck ? "1" : "0";
    var skuId = e.detail.skuid;
    app.netManager.getCheckedCartItem({
      isCheck: isCheck,
      skuId: skuId,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.getCartData();
        }
      }
    })
  },

  /**
   * 全选 取消
   */
  onAllCheckBoxAction: function(e) {
    var that = this;
    var isCheck = e.detail.isCheck ? "1" : "0";
    app.netManager.getCheckedCartItem({
      isCheck: isCheck,
      all: "1",
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          that.getCartData();
        }
      }
    })

  },

  /**
   * 点击了商品 跳转到商品详情
   */
  onProductAction: function(e) {
    console.log(e);
    var that = this;
    var itemId = e.detail.itemid;

    wx.navigateTo({
      url: '/pages/ProductDetail/productDetail?itemId=' + itemId,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 手指触摸动作开始 记录起点X坐标
   */
  touchstart: function(e) {
    var that = this;
    //开始触摸时 重置所有删除
    that.data.normalData.forEach(function(v, i) {
      v.itemList.forEach(function(obj, j) {
        if (obj.isTouchMove) //只操作为true的
          obj.isTouchMove = false;
      })
    })

    that.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      normalData: that.data.normalData
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    var that = this,
    sectionindex = e.currentTarget.dataset.sectionindex,//组索引
    rowIndex     = e.currentTarget.dataset.index,  //行索引

    startX = that.data.startX, //开始X坐标
    startY = that.data.startY, //开始Y坐标
    touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标

    //获取滑动角度
    angle = that.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });

    that.data.normalData[sectionindex].itemList.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i === rowIndex) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    });

    //更新数据
    that.setData({
      normalData: that.data.normalData
    })

  },

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  /**
   * 删除某一个商品
   */
  deleteProduct: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function (res) {
        if (res.confirm) {
          var sectionindex = e.currentTarget.dataset.section;//组索引
          var rowIndex = e.currentTarget.dataset.index;  //行索引
          var shop = that.data.normalData[sectionindex];
          var product = shop.itemList[rowIndex];
          var cartId = product.cart_id
         
          app.netManager.deleteCartItem({
            cartId: cartId,
            success: jsonData => {
              if (jsonData.result == 100 & jsonData.errcode == 0) {
                that.getCartData();
              } 
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onCOnfirmOrderAction: function(e){
    var that = this;
    var itemListArr = [];
    that.data.normalData.forEach( shop => {
      shop.itemList.forEach( product => {
        if (product.is_checked == 1){
          itemListArr.push(product.cart_id);
        }
      })
    })
    var itemList = itemListArr.join(',');
    wx.navigateTo({
      url: '/pages/ConfirmOrder/index?itemList=' + itemList,
    });
  }
})