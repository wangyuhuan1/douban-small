// pages/musicDetail/musicDetail.js
const Http=require('../../utils/music')
var audio = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist:[],
    isPlay:false,
    playId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    var playState=wx.getStorageSync('playState')
    var playId=wx.getStorageSync('playId')
    console.log(playId)
    this.setData({
      playId
    })
    console.log(playState)
    if(playState!=null){
      this.setData({
        isPlay:playState
      })
    }
    audio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
    })
    audio.onPause(()=>{
      this.setData({
        isPlay:false
      })
    })
  },
  onLoad:async function (options) {
    var {id}=options
    console.log(id)
    var res=await Http.getDetail(id)
    var playlist=res.data.playlist 
    this.setData({
      playlist
    })
    wx.setNavigationBarTitle({
      title:'音乐详情',
    })
  },
  handleUrl(e){
    var {img,name,id}=e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/musicPlay/musicPlay?id='+id+'&img='+encodeURIComponent(img)+'&name='+name
    })
  }
})