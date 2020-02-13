// pages/read/read.js
var data=require('../../data/local')
var http=require('../../models/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    postList:[],
    indicatorDots: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var {bannerUrl,postList}=data;
    var res=await http(bannerUrl)
    var banners=res.data.banners.slice(0,3)
    this.setData({
      banners,
      postList
    })
  },
  // handleClick(event){
  //   var id=this.data.postList
  //   console.log(index)
  //   var postList=JSON.stringify(this.data.postList[index])
  //   console.log(postList)
  //   wx.navigateTo({
  //     url: '/pages/readDetail/readDetail?postList='+postList,
  //   });
  // }
})