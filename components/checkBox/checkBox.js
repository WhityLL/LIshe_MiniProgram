// components/checkBox/checkBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCheck: {
      type: Number,
      value: 0
    },
    with:{
      type: Number,
      value: 30  
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      
  },

  lifetimes:{
    attached: function(){
      this.setData({
        
      })
    }  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckBoxClick: function(e){
      var originIsChecked = this.properties.isCheck;
      var detail = { "isCheck": !originIsChecked };
      var options = {};
      // 发送事件名 ,并传递两个参数
      this.triggerEvent("checkBoxAClick", detail, options);
    }
  }
})
