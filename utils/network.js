
import { urlManager } from "urls.js"

const netManager = {
  
  /**
   * 获取商城首页数据
   */
  getHomeList: function(params){
    // url
    params.url = urlManager.homeIndexUrl;

    this.requestJsonData(params);
  },

  /**
   * 获取分类页面数据
   */
  getCategaryList: function(params){
    var url = urlManager.categaryListUrl;
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
    // var token = "b50a67d7db4487f702f6152c3db62aa4";
    var token = "944a5fb41951cedcb7412ccdb45149c7";
    var url = params.url;
  
    wx.request({
      url: url,
      data: {
        token: token,
        client: 5
      },
      success: function (res) {
        var jsonData = res.data;
        //console.log(jsonData);
        
        //这里需要判断是不是json对象
        //如果是jsonP格式的数据 需要正则后转化为json

        if (params && params.success) {
          params.success(jsonData);
        }
      },
      fail: err => {
        if (params && params.fail) {
          params.fail(err);
        }
      }
    })
  }

}

// 导出方法 提供给外界使用
export { netManager }