//index.js
//获取应用实例
const Http = require('../../utils/music')
Page({
    data: {
        musics: {

        }
    },
    async onLoad() {
        // var storageData = wx.getStorageSync('musics')
        // if (storageData) {
        //     this.setData({
        //         musics: storageData
        //     })
        // } else {
            var musics = {}
            var hot = await Http.getHot()
            var cat = await Http.getCat()
            var radio = await Http.getRadio()
            musics.hot = {}
            musics.hot.title = "热门歌曲"
            musics.hot.data = hot.data.playlists.slice(0, 3)
            musics.hot.url = "/top/playlist?order=hot"

            musics.cat = {}
            musics.cat.title = "最新音乐"
            musics.cat.data = cat.data.playlists.slice(0, 3)
            musics.cat.url = "/top/playlist?cat=日语"

            var arr=[]
            radio.data.result.forEach(item => {
                var obj={}
                obj.id=item.id
                obj.name=item.name
                obj.coverImgUrl=item.picUrl
                obj.program=item.program
                arr.push(obj)
            });
            console.log(arr)
            musics.radio = {}
            musics.radio.title = "主播电台"
            musics.radio.data = arr.slice(0, 3)
            musics.radio.url = "/personalized/djprogram"
            wx.setStorageSync('musics', musics)
            this.setData({
                musics
            })
        // }
    },
    handleMore(e){
        var {url,title}=e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/musicMore/musicMore?url='+encodeURIComponent(url)+'&title='+title,
        });
    }
})
