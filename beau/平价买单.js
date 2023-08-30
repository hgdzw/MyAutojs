

// 判断当前页面是哪个区域  用找色 哪个区域选中了  会更暗

//请求截图，用找图方法，第一个就要先写的请求截图代码，不然找图没法用
// threads.start(function (){
//     var beginBtn;
//     if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
//     beginBtn.click();
//     }
// });

// if (!requestScreenCapture()) {
//     toast("请求截图失败");
//     exit();
// }
// sleep(2000)

var height = device.height;
var width = device.width;
console.log("分辨率宽" + width + "\n" + "分辨率高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)


// 点击对应区域  
let five_q = {x: 421,y: 302}
let two_w = {x: 678,y: 302}
let five_w = {x: 933,y: 302}

//区域操作  
function area_op(dict_o){
    press(dict_o.x,dict_o.y,500)
    sleep(500)
    // 截图 
    //区域 判断是否点击了这个区域
    // 判断是否可以购买
    // 开始购买
}

press(five_q.x,five_q.y,500)
sleep(500)
press(two_w.x,two_w.y,500)
sleep(500)
press(five_w.x,five_w.y,500)




