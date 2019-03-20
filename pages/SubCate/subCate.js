// pages/SubCate/subCate.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    severlistArr: ["京东优选", "网易严选", "顺丰优选","自营"],
    showGoTop: false,
    showSortPopView: false,
    currentServerIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this;
    var keywords = options.keywords ? options.keywords : "";
    var cfgId = options.cfgId ? options.cfgId : "";
    var catId = options.catId ? options.catId : "";
    
    that.setData({
      cfgId: cfgId,
      catId: catId,
      keywords: keywords
    });
    
    // 获取搜索结果数据
    that.getSearchListData();

    // 获取购物车数量
    app.netManager.getCartNum({
      success: e => {
        that.setData({
          cartNum: e
        })
      }
    });

  },

  getSearchListData: function(e){
    var that = this;
    var cfgId = that.data.cfgId;
    var catId = that.data.catId;
    var keywords = that.data.keywords;

    app.netManager.getSearchList({
      cfgId: cfgId,
      catId: catId,
      keywords: keywords,
      success: jsonData => {
        if (jsonData.result == 100 & jsonData.errcode == 0) {
          console.log(jsonData);
          that.setData({
            cartCount: jsonData.data.cartCount,
            catId: jsonData.data.catId,
            cfgId: jsonData.data.cfgId,
            catNameArr: jsonData.data.catNameArr,
            catNameArrInfo: jsonData.data.catNameArrInfo,
            
            companyConfigInfo: jsonData.data.companyConfigInfo,
            jCatIdTwo: jsonData.data.jCatIdTwo,
            
            list: jsonData.data.list,
            listCount: jsonData.data.listCount,
            
            keywords: jsonData.data.keywords,
            shopId: jsonData.data.shopId,
            sort: jsonData.data.sort,
            totalPage: jsonData.data.totalPage,

            newUserAddressList: jsonData.data.newUserAddressList,
          });
          
          that.formatData();
        }
      },
      fail: err => {

      }
    });
  },

  formatData: function(){
    var cateList = this.data.companyConfigInfo;
    var catelistInfo = this.data.catNameArrInfo;

    for (var i = 0; i < cateList.length; i++){
      var cateItem = cateList[i];
      var subCateArr = [];
      for (var index = 0; index < catelistInfo.length; index++) {
        if (cateItem.item_config_id == catelistInfo[index].item_config_id)
        subCateArr.push(catelistInfo[index]);
      }; 
      cateItem.subCateArr = subCateArr;
    }

    this.setData({
      companyConfigInfo: cateList
    })
  },

  /**
   * 点击商品
   */
  onProductClickAction: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var productModel = that.data.list[index];
    
    var itemId = productModel.item_id;
    wx.navigateTo({
      url: '/pages/ProductDetail/productDetail?itemId=' + itemId,
    })

  },

  /**
   * 点击了搜索
   */
  onSearchViewClickAction: function(e){
    var keywords = this.data.keywords;
    // redirectTo
    // navigateTo
    wx.navigateTo({
      url: '/pages/search/search?keywords=' + keywords,
    })
  },

  /**
   * 监听滚动
   */
  onPageScroll: function(e){
    var that = this;
    // 是否显示回到顶部
    if (e.scrollTop > 500) {
      that.setData({
        showGoTop: true
      });
    } else {
      that.setData({
        showGoTop: false
      });
    }
  },

  onBackToTopAction: function(e){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 400
    });
    this.setData({
      showGoTop: false
    })
  },

  /**
   * 跳转到购物车
   */
  onGotoCartAction: function (e) {
    wx.switchTab({
      url: '/pages/Cart/cart'
    });
  },

  onSortClickEvent: function (e) {
    var that = this;
    var showSortPopView = this.data.showSortPopView;
    that.setData({
      showSortPopView: !showSortPopView
    });
  },

  onServerItemAction: function(e) {
    var that = this;
    var currentIndex = e.currentTarget.dataset.index;
    console.log(currentIndex);
    that.setData({
      currentServerIndex: currentIndex
    })
  },

  onClose: function (){
    var that = this;
    var showSortPopView = this.data.showSortPopView
    that.setData({
      showSortPopView: !showSortPopView
    })

  }

})

