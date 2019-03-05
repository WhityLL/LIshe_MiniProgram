// components/homePageComponents/homePageListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item_title:{
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
    onItemClickEvent:function(e){
      // console.log(e);
      var itemid = e.currentTarget.dataset.itemid;
      var detail = { "itemId": itemid };
      var options = {};
      // 发送事件名 ,并传递两个参数
      this.triggerEvent("productItemClick", detail, options);
    }
  }
})
