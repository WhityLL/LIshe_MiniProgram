// components/cartProductCellComponent/cartProductCellComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product:{
      type: Object,
      value:{}
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
    onProductCheckBoxAction: function(e){
      var that = this;
      var isChecked = e.detail.isCheck;
      var detail = { 
        "isCheck": isChecked,
        "skuid": that.properties.product.sku_id
       };
      var options = {};
      // 发送事件名 ,并传递两个参数
      // console.log(detail);
      this.triggerEvent("checkProductClick", detail, options);
    }
  }
})
