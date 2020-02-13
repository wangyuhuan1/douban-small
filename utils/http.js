var baseUrl="https://douban.uieee.com/v2/movie/"
function http({url,data}){
    return new Promise((resolve,reject)=>{
        wx.request({
            url:baseUrl+url,
            data,
            header: {'content-type':'json'},
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
    getTop250(){
        return http({
            url:"top250"
        })
    },
    getIntheaters(){
        return http({
            url:"in_theaters"
        })
    },
    getComingsoon(){
        return http({
            url:"coming_soon"
        })
    },
    getMore:(title)=>{
        return http({
            url:title
        })
    },
    getDetail(id){
        return http({
            url:"subject/"+id
        })
    }
}