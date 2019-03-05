
import { urlManager } from "urls.js"

const netManager = {

  getHomeList: function(params){
    // url
    var url = urlManager.homeIndexUrl;
    // 参数
    var token = params.token;
  
    wx.request({
      url: url,
      data: {
        token: token,
        client: 5
      },
      success: function (res) {
        var jsonData = res.data;
        console.log(jsonData);

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