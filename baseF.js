// 这是一些基础的共用的函数  抽取出来
var dzw = {};

//文本点击
dzw.textClick = function(text_i){
    for(var i = 0 ;i < 30; i ++ ){
        if(textContains(text_i).exists()){
            console.log("找到文本"+text_i+"并点击!")
            var dian = textContains(text_i).findOne(2000)
            if(null != dian){
                // click(dian.bounds().centerX(), dian.bounds().centerY())
                press(dian.bounds().centerX(), dian.bounds().centerY(),200)
            }
            return
        }
        sleep(100)
    }
    console.log("点击文本"+text_i+"结束!")
}




module.exports = dzw;
