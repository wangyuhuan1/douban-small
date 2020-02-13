Page({
    data:{

    },
    handleToggle(){
        console.log(1)
        wx.switchTab({
            url: '/pages/read/read',
        })
    }
})