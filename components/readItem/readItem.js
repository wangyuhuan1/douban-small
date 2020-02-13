// components/readItem/readItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object
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
    handleToggle(){
      wx.navigateTo({
        url: '/pages/readDetail/readDetail?id='+this.properties.data.postId,
      });
    }
  }
})
