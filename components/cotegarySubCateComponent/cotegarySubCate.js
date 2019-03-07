// components/cotegarySubCateComponent/cotegarySubCate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item_title: {
      type: String,
      value: "新品上架"
    },
    items: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击了商品 注册事件
    onItemClickEvent: function (e) {
      var catId = e.currentTarget.dataset.catid;
      var detail = {"catId": catId};
      var options = {};

      // 发送事件名 ,并传递两个参数
      this.triggerEvent("cateItemClick", detail, options);
    }
  }
})

