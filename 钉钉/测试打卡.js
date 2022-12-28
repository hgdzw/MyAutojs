

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
var res = id("chatting_time_tv").findOnce(1);
var upTime = res.text()

// if (text("08:34").findOnce()) {
//     toastLog("找到了")

// }
toast("上次打卡时间"+upTime);

