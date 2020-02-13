// pages/musicMore/musicMore.js
const Http = require('../../utils/music')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var url=decodeURIComponent(options.url)
    var {title}=options
    console.log(url)
    wx.setNavigationBarTitle({
      title:title,
    })
    var res=await Http.getMore(url)
    if(url=='/personalized/djprogram'){
      var playlists=[]
      res.data.result.forEach(item => {
        var obj={}
        obj.name=item.name
        obj.id=item.id
        obj.coverImgUrl=item.picUrl
        obj.program=item.program
        playlists.push(obj)
      });
    }else{
      var playlists=res.data.playlists
    }
    this.setData({
      playlists
    })
  }
})