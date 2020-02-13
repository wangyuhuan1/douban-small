### 一、01init

#### 1-1 view设height100%没用，必须给page先设置height100%

#### 1-2 wx.switchTab跳转到tabbar页面

## 二、02swiper

[swiper属性](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)

```<swiper>
<swiper>
    <swiper-item>
    ...
    </swiper-item>
</swiper>
```

## 三、03collect-storage

```js
//3-1 设一个对象装载缓存
{
    "0":"false",
    "1":"true",
    "2":"false",
    "3":"true"
}
//3-2 有缓存设获取缓存，没有缓存则设置缓存
   var collection =wx.getStorageSync('collection');
   /* 有缓存，获取缓存 */
   if(collection){
       collected=collection[id];
       this.setData({
           isCollected:collected
       })
   }else{
      /* 没有缓存，就设置缓存 */
      var collection={};
      collection[id]=false;
      wx.setStorageSync('collection',collection)
      /* {"0":"false","1":"false"} */
   }
```

```
//3-3  设计点击事件
<image bind:tap="handleCollect" ...></image>
```

```js
handleCollect(){
    /* 获取缓存 */
    var collection= wx.getStorageSync('collection')
    var collected = !collection[this.data.id];
    collection[this.data.id] = collected;
    /* 更新缓存 */
    wx.setStorageSync('collection', collection)
    this.setData({
      isCollected:collected
    })
  }
```

#### 4-1分享

```js
wx.showActionSheet({
      itemList: [
        '分享到微信',
        '分享到朋友圈'
      ],
      itemColor: '#000000',
      success: (res) => {
        console.log(res.tapIndex)
      },
      fail: () => { },
      complete: () => { }
});
```



## 四、showModal实现收藏

```js
handleCollect(){
    /* 获取缓存 */
    var collection= wx.getStorageSync('collection')
    var collected = !collection[this.data.id];
    collection[this.data.id] = collected;
    /* 更新缓存 */
    this.showModal(collected,collection)
 },
 showMoal(collected,collection){
     wx.showModal({
      title: '收藏',
      content: '收藏文章',
      success: (res) => {
        if (res.confirm) {
            //点击确定触发
          if (collected) {
            wx.setStorageSync('collection', collection)
            this.setData({
              isCollected: collected
            })
          }
        } else if (res.cancel) {
            //点击取消触发
          if (collected == false) {
            wx.setStorageSync('collection', collection)
            this.setData({
              isCollected: collected
            })
          }
        }
      }
    })
}
```

## 五、音乐播放

#### 5-1点击事件 图片变

```js
<image class="music" bind:tap="handleMusic"
src=" {{isPlay?'/images/music/music-stop.png':'/images/music/music-start.png'}}"></image>
```

#### 5-2 实现音乐播放，暂停

```js
var audio = wx.getBackgroundAudioManager()
handleMusic(){
    if(this.data.isPlay){
      audio.pause();
      this.setData({
        isPlay:false
      })
    }else{
      audio.title = this.data.item.music.title
      audio.src = this.data.item.music.url
      this.setData({
        isPlay:true
      })
    }
  }
```

#### 5-3 监听音乐播放  bottom-icon

```js
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
```

#### 5-4 进入和退出一致

```js
//app.js
//5-4-1 app.js  定义g_isPlay记录音乐播放的状态
App({
    globalData: {
        g_isPlay:false
    }
});
//5-4-2  在handleMusic事件中设置g_isPlay
handleMusic(){
    if(this.data.isPlay){
      ....
      app.globalData. g_isPlay = false
      console.log(app.globalData.g_isPlay)
    }else{
      ...
      app.globalData. g_isPlay = true;
      console.log(app.globalData.g_isPlay)
      
    }
  }
//5-4-3 在onLoad生命周期中监听
/* 让退入和进入音乐播放按钮一致 */
    if(app.globalData.g_isPlay){
      this.setData({
        isPlay:true
      })
    }else{
      this.setData({
        isPlay:false
      })
    }
```

```js
//5-4-5
1.在app.json  定义g_playId记录正在播放音乐的id
App({
    globalData: {
        g_isPlay:false,
        g_playId:""
    }
});
//2.设置g_playId
handleMusic(){
      ....
      app.globalData.g_playId = this.data.id;
      app.globalData. g_isPlay = true; 
    }
  }
  
//3.onLoad()函数中判断
  /* 让退入和进入音乐播放按钮一致 */
    if(app.globalData.g_isPlay && app.globalData.g_playId == id){
      this.setData({
        isPlay:true
      })
    }else{
      this.setData({
        isPlay:false
      })
    }
```

## 六、处理movie

#### 6-1 处理循环的数据结构

```js
// pages/movie/movie.js
const Http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {
        
    }
  },
  async onLoad() {
    /* 有缓存则获取缓存中的数据,没有缓存,则发送http */
    var storageData = wx.getStorageSync("movies");
    if (storageData) {
      this.setData({
        movies: storageData
      })
    } else {
      var movies = {}
      var top250 = await Http.getTop250();
      var inTheaters = await Http.getInTheaters();
      var comingSoon = await Http.getComingSoon();
      movies.inTheaters = {};
      movies.inTheaters.title = "正在热映"
      movies.inTheaters.data = inTheaters.data.subjects.slice(0, 3);
      movies.inTheaters.subTitle = "in_theaters";

      movies.comingSoon = {};
      movies.comingSoon.title = "即将上映"
      movies.comingSoon.data = comingSoon.data.subjects.slice(0, 3);
      movies.comingSoon.subTitle = "coming_soon";

      movies.top250 = {};
      movies.top250.title = "豆瓣top250";
      movies.top250.data = top250.data.subjects.slice(0, 3);
      movies.top250.subTitle = "top250";

      wx.setStorageSync("movies", movies);
      this.setData({
        movies
      })
    }

  }
})

//wxml
<view class="item" wx:for="{{movies}}" wx:for-item="list" wx:key="{{index}}">
    <view class="title"><text>{{list.title}}</text> <text class="more">更多></text></view>
    <view class="flex">
        <v-movie wx:for="{{list.data}}" wx:key="{{index}}" data="{{item}}"></v-movie>
    </view>
</view>
```



#### 6-2 处理评分组件

```js
//wxs
function formatStar(value) {
    if (value) {
        var value = value.substring(0, 1);
        var arr = []
        for (var i = 1; i <= 5; i++) {
            if (i <= value) {
                arr.push(1)
            } else {
                arr.push(0)
            }
        }
        return arr;
    }

}
module.exports = {
    formatStar: formatStar
}
```

## 七、scroll-view x

```js
<scroll-view scroll-x="true"></scroll-view>
```

## 八、previewImage

```js
//大图
handleImage(e){
    if (!urls.includes(url)){
      urls.unshift(url)
    }
    wx.previewImage({
      current: url, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls,
    })
}
```

## 九、网易云音乐播放

语雀：<https://www.yuque.com/wangyuhuan/kowy5b/hrwxgz> 





