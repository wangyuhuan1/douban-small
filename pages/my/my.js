// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"/images/avatar/4.png",
    longitude:114.504760,
    latitude:30.552550,
    scale:18,
    showCompass:true,
    markers: [{
      iconPath: "/images/avatar/location.png",
      id: 0,
      latitude: 30.552550,
      longitude: 114.504760,
      width: 30,
      height: 30
    }],
    polyline: [{
      points: [{
        longitude: 114.504760,
        latitude: 30.552550
      }, {
        longitude: 114.372640,
        latitude: 30.689160
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    circles:[{
        latitude: 30.552550,
        longitude: 114.504760,
        radius:50,
        fillColor:"#c20c0c66"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleImage(){
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res)=>{
        const src=res.tempFilePaths[0]
        wx.setStorageSync('String', Object/String)
        this.setData({
          imageUrl:src
        })
      }
    })
  }
})