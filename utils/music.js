var baseUrl="https://music.aityp.com"
function http({url,data}){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseUrl+url,
            data,
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}
module.exports={
    getHot(){
        return http({
            url:"/top/playlist?order=hot"
        })
    },
    getCat(){
        return http({
            url:"/top/playlist?cat=日语"
        })
    },
    getRadio(){
        return http({
            url:"/personalized/djprogram",
        })
    },
    getDetail(id){
        return http({
            url:"/playlist/detail",
            data:{
                id
            }
        })
    },
    getUrl(id){
        return http({
            url:"/song/url",
            data:{
                id
            }
        })
    },
    getMore(url){
        return http({
            url
        })
    },
}