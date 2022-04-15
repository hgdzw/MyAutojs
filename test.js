
auto()
var str = "";
str += "屏幕宽度:" + device.width
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为"+device.width+"   "+"屏幕高度为"+device.height);
//获取设备信息
toast("即将点击活动");
// bounds(851,1693,1080,1866).findOne().click();


// var res = textContains("浏览15s立得");

// sleep(2000);

// if(!res.empty()){                 
//     res.forEach(function(item){   // 依次点击
//         toast(item.bounds().centerX()+":"+item.bounds().centerY());
// //         click(item.bounds().centerX(), item.bounds().centerY());
// //         sleep(1000);
// //         back();
//     });
// }

sleep(2000);
var res = className("android.view.View").text("浏览15s立得").find();
var i = 1;
if(!res.empty()){                
    res.forEach(function(item){   // 依次点击
        toast(i);
        sleep(2000);
        i++;

        // click(item.bounds().centerX(), item.bounds().centerY());
        // sleep(2000);
        // toast(item.bounds().centerX()+":"+item.bounds().centerY());
        // back();
    });
}
