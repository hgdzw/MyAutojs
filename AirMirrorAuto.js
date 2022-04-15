
auto()
var str = "";
str += "屏幕宽度:" + device.width
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为"+device.width+"   "+"屏幕高度为"+device.height);
//获取设备信息
toast("自动观看视频！");
// bounds(851,1693,1080,1866).findOne().click();

for(var i = 0 ;i < 5; i ++ ){
    sleep(2000);
    var res = className("android.widget.Button").text("看视频").find();
    var i = 1;
    if(!res.empty()){                
        res.forEach(function(item){   // 依次点击
            toast("找到了，开始点击!");
            click(item.bounds().centerX(), item.bounds().centerY());
        });
    }else{
        break;
    }
    // 这个时候已经进视频了
    sleep(10000);
    // 防止黑屏
    swipe(100, 100, 200, 200, 500);
    sleep(8000);
    back();
    sleep(1000);
    bounds(861,810,915,864).findOne().click();
    sleep(1000);
}
