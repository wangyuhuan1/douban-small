// pages/play/play.js
const Http=require('../../utils/music')
var audio = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    name:'',
    url:'',
    isPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var {id,name}=options
    var img=decodeURIComponent(options.img)
    var res=await Http.getUrl(id)
    var url=res.data.data[0].url
    this.setData({
      img,
      name,
      url
    })
    wx.setNavigationBarTitle({
      title:name,
    })
    audio.title=name
    audio.src=url
    wx.setStorageSync('playState', true)
    wx.setStorageSync('playId', id)
    
    audio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
      wx.setStorageSync('playState', true)
    })
    audio.onPause(()=>{
      this.setData({
        isPlay:false
      })
      wx.setStorageSync('playState', false)
    })
  },
  handleClick(){
    if(this.data.isPlay){
      this.setData({
        isPlay:false
      })
      audio.pause()
      wx.setStorageSync('playState', false)
    }else{
      this.setData({
        isPlay:true
      })
      audio.play()
      wx.setStorageSync('playState', true)
    }
  }
})