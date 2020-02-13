// pages/movieDetail/movieDetail.js
// const http=require('../../utils/http1')
const Http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:[],
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title:"数据加载"
    })
    var { url,title } = options
    var res=await Http.getMore(url)
    wx.hideLoading()
    var subjects=res.data.subjects
    this.setData({
      subjects,
      title
    })
    wx.setNavigationBarTitle({
      title:title,
    })
    // switch (title) {
    //   case "in_theaters":
    //     var res = await Http.getIntheaters()
    //     console.log(res)
    //     break;
    //   case "coming_soon":
    //     var res = await Http.getComingsoon()
    //     console.log(res)
    //     break;
    //   case "top250":
    //     var res = await Http.getTop250()
    //     console.log(res)
    //     break;
    // }
  },
  handleDetail(e){
    var {id}=e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/movieInfo/movieInfo?id='+id,
    });
  }
})