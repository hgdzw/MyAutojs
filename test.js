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
// let img = captureScreen()


// bounds(858,420,1038,528).findOne(2000).click()

// textContains("暂不买入").findOne(2000).click()

// bounds(75, 1527, 539, 1665).findOne(2000).click()
// if(textContains("暂不买入").exists()){
//     toast("进入app界面了")
//     // sleep(500)
//     // area(two_w)
// }else{
//     toast("没进入app界面")
// }

// var dzw = require('baseF.js');
// dzw.textClick("暂不买入")

// 获取 金额

// press(948,484,200)
press(device.width * 0.8777, device.height * 0.20166,200)


// let img = images.read("/storage/emulated/0/Pictures/Screenshots/beau.jpg");
// // let se = images.pixel(img, 393, 436)
// let se = images.pixel(img, 393, 433)

// toast(colors.toString(se))
// console.log(colors.toString(se))

// // 红色 FF0000  白色 FFFFFF  选中灰色 C0C0C0   未选择 E0E0E0   买入黑色333333
// if(images.detectsColor(img, "#FFFFFF", 700, 488)){
//     toast("是");
// }else{
//     toast("不是");
// }