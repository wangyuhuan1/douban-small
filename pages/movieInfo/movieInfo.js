// pages/movieInfo/movieInfo.js
const Http=require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:true,
    subject:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var {id}=options
    var res=await Http.getDetail(id)
    var subject=res.data
    // console.log(subject)
    this.setData({
      subject
    })
  },
  handleImage(e){
    var url=e.currentTarget.dataset.url
    var casts=this.data.subject.casts
    var urls=casts.map(item=>{
      return item.avatars.small
    })
    console.log(casts)
    // wx.previewImage({
    //   current: url, // 当前显示图片的链接，不填则默认为 urls 的第一张
    //   urls
    // })
    if (!urls.includes(url)){
      urls.unshift(url)
    }
    wx.previewImage({
      current: url, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls,
    })
  }
})