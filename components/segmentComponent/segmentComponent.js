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

    defaultIndex:{
      type: Number,
      vlue: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  lifetimes:{
    attached: function () {
      var that = this;
      console.log(that.properties.defaultIndex);
      console.log("-=-=-=-=");
      that.setData({
        currentIndex: that.properties.defaultIndex
      })
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
