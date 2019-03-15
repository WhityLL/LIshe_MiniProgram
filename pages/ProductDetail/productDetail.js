// pages/ProductDetail/productDetail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    minPointSku: {},
    isFavorite: 1,
    showPopView: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this;
    var itemId = options.itemId;
    that.setData({
      itemId: itemId
    })

    that.getProductData(itemId);

    // 获取购物车数量
    app.netManager.getCartNum({
      success: e => {
        that.setData({
          cartNum: e
        })
      }
    });
  },

  getProductData:function(itemId){
    var self = this;

    app.netManager.getProductDetail({
      itemId: itemId,
      success: e => {
        console.log(e);
        self.setData({
          new_list_images: e.data.itemInfo.new_list_images,
          itemInfo: e.data.itemInfo,
          itemDesc: e.data.itemDesc,
          itemStatus: e.data.itemStatus,
          newUserAddressList: e.data.newUserAddressList,
          sKuList: e.data.sKuList,
          shopName: e.data.shopName,
          freepostageLimitMoney: e.data.freepostageLimitMoney,
          coupons_count: e.data.coupons_count,
          coupons: e.data.coupons,
          couponRules: e.data.couponRules
        })

        // 数据处理
        self.formatterData();
      }
    })
  },

  formatterData: function(){
    var that = this;

    /// 默认选择最小价格的sku
    var minPointSku = that.data.sKuList[0];
    var currentSku = that.data.sKuList[0];
    for (var i = 1; i < that.data.sKuList.length - 1; i++){
      var temp = that.data.sKuList[i];
      if (temp.point < minPointSku.point){
        minPointSku = temp;
      }
    }
    that.setData({
      minPointSku: minPointSku,
      currentSku: currentSku
    });

    /// 获取默认地址
    var defaultAddress = {};
    for (var i = 0; i < that.data.newUserAddressList.length; i++) {
      var temp = that.data.newUserAddressList[i];
      if (temp.def_addr == 1) {
        defaultAddress = temp;
        that.setData({
          defaultAddress: defaultAddress
        })
        break;
      }
    }

    /// 商品详情 富文本中的图片处理(正则替换 加一个class)
    var productDetailRichText = that.data.itemDesc.pc_desc;
    productDetailRichText = productDetailRichText.replace(/\<img/gi, '<img class="rich-img" ');
    that.setData({
      productDetailRichText: productDetailRichText
    });
  },

//轮播图的切换事件
  swiperChange: function (e) {
    var that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    var that = this;
    var index = that.data.swiperCurrent;
    console.log("点击了商品详情轮播图" + index);
  },

  // cell点击事件
  onCellClickAction: function (e){
    var title = e.detail.title;
    console.log(title);
    if(title == "促销"){

      return;
    }
    if (title == "配送"){

      return;
    }
    if (title == "配送"){
      
      return;
    }
  },

  /**
   * 跳转到购物车
   */
  ontogoCartAction: function(e){
    wx.switchTab({
      url: '/pages/Cart/cart'
    });
  },

  /**
   * 在线客服
   */
  ontogoOnlineServerAction: function (e) {
    console.log("在线客服");
  },

  /**
   * 收藏 取消收藏
   */
  onFavoriteAction: function (e) {
    console.log("收藏 取消收藏");
  },

  /**
   * 加入购物车
   */
  onAddtoCartAction: function (e) {
    console.log("加入购物车");

    this.setData({ showPopView: true });
  },

  /**
   * 立即 购买
   */            
  onBuyAction: function (e) {
    console.log("立即 购买");
  },

  onClosePopView() {
    this.setData({ showPopView: false });
  },

  onSkuItemClick:function(e){
    var that = this;
    var skuId = e.currentTarget.dataset.skuid;
    for (var i = 0; i < that.data.sKuList.length; i++) {
      var temp = that.data.sKuList[i];
      if (temp.sku_id == skuId) {
        that.setData({
          currentSku: temp
        });
        break;
      }
    }

  }

})