// pages/search/search.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    hotSearchArr:[],
    historySearchArr: [],
    showSearchGroup: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
    var hotSearchArr = wx.getStorageSync('hotSearchWords') || [];

    var historySearchArr = wx.getStorageSync('searchHis') || [];

    that.setData({
      hotSearchArr: hotSearchArr,
      historySearchArr: historySearchArr,
      clearBtnShow: false
    });
  },

  // 监听输入框文字
  onBeginInput: function (event) {
    let that = this;
    let keyword = event.detail.value;
    if (keyword.length > 0 && !that.data.clearShow) {
      that.setData({
        keyword: keyword,
        clearBtnShow: true
      })
    } else if (keyword.length == 0) {
      that.setData({
        keyword: keyword,
        clearBtnShow: false
      })
    }
  },

  // 点击搜索按钮 或键盘确认按钮
  onClearSearch: function (event) {
    let that = this;
    that.setData({
      clearBtnShow: false,
      keyword: ''
    })
  },

  /**
   * 点击了搜索按钮
   */
  onClickSearch: function (event) {
    let that = this;
    if (that.data.keyword.length == 0){
      wx.showToast({
        title: '没有关键字',
        icon: 'none'
      })
    }else{
      that.storageKeyword(that.data.keyword);
    }
  },

  // 点击tags搜索
  onSearchItemClick: function (event){
    let that = this;
    // console.log(event);
    var searchType = event.currentTarget.dataset.type;
    var clickIndex = event.currentTarget.dataset.clickindex;
    var searchWord = '';

    if (searchType == "hotsearch"){//热门搜索
      searchWord = that.data.hotSearchArr[clickIndex];
    }else{//历史记录拿出来的
      searchWord = that.data.historySearchArr[clickIndex];
    }
    // 存储索索过的词
    that.storageKeyword(searchWord);
  },
    
  /**
   * 存储搜索历史记录
   */
  storageKeyword: function (searchKeyWord){
    let that = this;

    //获取搜索记录数组
    var searhRecordArr = wx.getStorageSync('searchHis') || [];

    //删除重复元素
    for (var i = 0; i < searhRecordArr.length; i++) {
      var temp = searhRecordArr[i];
      if (temp == searchKeyWord) {
        searhRecordArr.splice(i, 1);
      }
    };

    //添加元素
    searhRecordArr.splice(0, 0, searchKeyWord);

    //大于10个就删除最后一个
    if (searhRecordArr.length >= 10){
      searhRecordArr.splice(10,1);
    }
    // 本地化存储
    wx.setStorageSync('searchHis', searhRecordArr);
    // 赋值 、刷新页面
    that.setData({
      historySearchArr: searhRecordArr
    });

    that.togoSearchWithKeyWord(searchKeyWord);
  },

  /**
   * 清空搜索记录
   */
  onClickClearHis: function(event){
    let that = this;
    wx.clearStorageSync('searhRecord')
    that.setData({
      historySearchArr: []
    })
  },

  /**
   * 去搜索结果页面
   */
  togoSearchWithKeyWord: function (searchKeyWord){
    console.log('跳转商品搜索结果页面=' + searchKeyWord);
    wx.navigateTo({
      url: '/pages/SubCate/subCate?keywords=' + searchKeyWord,
    })
  }
})