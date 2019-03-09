// components/productDetailCellComponent/productDetailCellComponent.js
Component({

  options:{
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: ""
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
    onCellClickEvent: function(e){
      var title = this.data.title;
      var detail = {"title": title};
      var options = {};
      this.triggerEvent("cellTap",detail,options);
    }
  }
})
