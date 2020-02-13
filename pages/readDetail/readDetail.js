// pages/readDetail/readDetail.js
const data=require('../../data/local')
const app=getApp()
var audio=wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false,
    id:"",
    item:"",
    isPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {id}=options
    var {postList}=data
    console.log(postList[id])
    this.setData({
      item:postList[id],
      id,
    })

    var collection=wx.getStorageSync('collection')
    /* 有缓存，获取缓存 */
    if(collection){
      var collected=collection[id]
      this.setData({
        isCollected:collected
      })
    }else{
      /* 没有缓存，就设置缓存 */
      var collection={}
      collection[id]=false
      wx.setStorageSync('collection', collection)
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

    /* 让退出和进入音乐播放按钮一直 */
    if(app.globalData.g_isPlay && 
      app.globalData.g_playId==id){
      this.setData({
        isPlay:true
      })
    }else{
      this.setData({
        isPlay:false
      })
    }

  },
  handleCollect(){
    /* 获取缓存 */
    var collection=wx.getStorageSync('collection')
    var collected=!collection[this.data.id];
    collection[this.data.id]=collected;
    /* 更新缓存 */
    this.showModal(collected,collection)
  },
  share() {
    wx.showActionSheet({
      itemList: [
        '分享到微信',
        '分享到朋友圈'
      ],
      itemColor: '#000000',
      success: (res) => {
        console.log(res.tapIndex)
      }
    });
  },
  showModal(collected,collection) {
    wx.showModal({
      title: '收藏',
      content: '收藏文章',
      success: (res) => {
        if (res.confirm) {
          if (collected) {
            wx.setStorageSync('collection', collection)
            this.setData({
              isCollected: collected
            })
          }
        } else if (res.cancel) {
          if (collected == false) {
            wx.setStorageSync('collection', collection)
            this.setData({
              isCollected: collected
            })
          }
        }
      }
    })
  },
  handleMusic(){
    if(this.data.isPlay){
      audio.pause();
      this.setData({
        isPlay:false
      })
      app.globalData.g_isPlay=false
    }else{
      audio.title = this.data.item.music.title
      audio.src = this.data.item.music.url
      this.setData({
        isPlay:true
      })
      app.globalData.g_playId=this.data.id
      app.globalData.g_isPlay = true;
    }
  }
})