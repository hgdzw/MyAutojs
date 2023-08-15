

//    var res = className("android.view.ViewGroup").findOne();
//    click(res.bounds().centerX(), res.bounds().centerY())

//    var res = className("android.widget.TextView").text();
// var res = id("chatting_time_tv").findOnce(1);
// toast(res.text());


// var date = new Date();
// var HH=date.getHours();
//  HH=HH <10? "0" + HH:HH;
//  var mm=date.getMinutes(); 
//  mm = mm< 10?  "0"+ mm:mm; 
// var timeStr = HH  + "" + mm;
// var timeStr = "08:59";
// if(res.text() == timeStr){
//     toast("相等")
// }else{
//     toast("不相等")
// }
// var res = id("session_item").findOne();
// toast("上次打卡时间"+res.bounds().centerX());
// click(res.bounds().centerX(), res.bounds().centerY())
// if (text("08:34").findOnce()) {
//     toastLog("找到了")

// }
// toast("上次打卡时间"+upTime);
// swipe(400, 1800, 400, 300, 500); //上滑轨迹 自己调整

click(400, 1800,500)
// device.wakeUp();
// sleep(15 * 1000);
// device.wakeUp();
// if(isDeviceLocked()){
//     sleep(500);
//     swipe(400, 1800, 400, 700, 200); //上滑轨迹 自己调整
//     gesture(1000, [400, 1800], [400, 700])
//     sleep(500);
//         // 手机设置没密码吧
// //   var password = "1234"; //这里输入你手机的密码
// //   for (var i = 0; i < password.length; i++) {
// //       var p = text(password[i].toString()).findOne().bounds();
// //       click(p.centerX(), p.centerY());
// //       sleep(100);
// //   }
// }