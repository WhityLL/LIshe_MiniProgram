// components/segmentComponent/segmentComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    segmentItems:{
      type: Array,
      value:[]
    },

    currentIndex:{
      type: Number,
      vlue: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     // 这里是一些组件内部数据
  },

  /**
   * 组件生命周期
   */
  lifetimes:{
    attached: function () {
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    onSegmentItemClick: function(e){
      // console.log(e);
      var that = this;
      var index = e.currentTarget.dataset.index;
      that.setData({
        currentIndex: index
      });

      var detail = {"index": index};
      var options = {};
      this.triggerEvent("segmentItemTap", detail, options);
    }
  }
})
