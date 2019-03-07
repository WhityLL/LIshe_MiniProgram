
import { urlManager } from "urls.js"

const netManager = {
  /**
   * 获取商城首页数据
   */
  getHomeList: function(params){
    // url
    params.url = urlManager.homeIndexUrl();

    this.requestJsonData(params);
  },

  /**
   * 获取分类页面数据
   */
  getCategaryList: function(params){
    var url = urlManager.categaryListUrl();

    var cfgId = params.cfgId;
    if (cfgId) {
      url = url + "?catId=" + cfgId;
    }
    params.url = url;
    this.requestJsonData(params);
  },

  /**
   * 搜索结果、三级分类页面
   */
  getSearchList: function(params){
    var url = urlManager.searchListUrl();

    var keywords = params.keywords ? params.keywords : "";
    var shopId = params.shopId ? params.shopId : -1;
    var cfgId = params.cfgId ? params.cfgId : "";
    var catId = params.catId ? params.catId : "";
    var jCatIdTwo = params.jCatIdTwo ? params.jCatIdTwo : "";

    var minPrice = params.minPrice ? params.minPrice : "";
    var maxPrice = params.maxPrice ? params.maxPrice : "";

    var sort = params.sort ? params.sort : 1;
    var p = params.p ? params.p : 1;

    url = url + "?keywords=" + keywords + "&shopId=" + shopId + "&cfgId=" + cfgId + "&catId=" + catId + "&jCatIdTwo=" + jCatIdTwo + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&sort=" + sort + "&p=" + p;

    params.url = url;
    this.requestJsonData(params);
  },


  /**
   * 热搜词汇
   * 是否在这里存储？？？？
   */
  gethotSearchWords: function(){
    var url = urlManager.getHotSearchWordsUrl();
    this.requestJsonData({
      url: url,
      success: e => {
        var hotSearchs = e.data.hotSearch;
        var hotSearchWords = [];
        for (var i = 0; i < hotSearchs.length; i++){
          var hotSearch = hotSearchs[i];
          hotSearchWords.push(hotSearch.key_word);
        }
        console.log(hotSearchWords);
      }
    });
  },

  /**
   * 网络请求（统一返回）
   */
  requestJsonData: params => {
    var token = "b50a67d7db4487f702f6152c3db62aa4"; //正式
    // var token = "944a5fb41951cedcb7412ccdb45149c7"; //测试
    var url = params.url;
  
    wx.request({
      url: url,
      data: {
        token: token,
        client: 5
      },
      success: function (e) {
        var jsonData = e.data;
        if (typeof jsonData === "string") {
          // 返回的是jsonp类型的数据，所以要用正则表达式来匹配截取json数据

          //let reg = /^\w+\((\{[^()]+\})\)$/;
          //let matches = datas.match(reg);
          // matches匹配到的是数组，数组第一个是所有正则表达式匹配的字符串，第二个是第一个小括号匹配到的字符串
          //if (matches) {
          //  let jsonData = JSON.parse(matches[1]);
          //}

          jsonData = jsonData.trim(jsonData);
          jsonData = jsonData.replace("jsonpReturn(","");
          jsonData = jsonData.substr(0, jsonData.length - 2);
          jsonData = JSON.parse(jsonData);
        }

        //console.log(jsonData);

        if (params && params.success && jsonData) {
          params.success(jsonData);
        }
      },
      fail: err => {
        if (params && params.fail) {
          console.log(err);
          params.fail(err);
        }
      }
    })
  }

}

// 导出方法 提供给外界使用
export { netManager }