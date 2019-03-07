
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
    var catId = params.catId;
    if (catId) {
      url = url + "?catId=" + catId;
    }
    params.url = url;

    this.requestJsonData(params);
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
        client: 3
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
          //console.log(jsonData);
        }

        if (params && params.success) {
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