
   var powerList = className("android.widget.TextView").text("找能量").find();
   if(!powerList.empty()){                 // 有能量球
      powerList.forEach(function(item){   // 依次点击
         toast(item.bounds().centerX());
         toast(item.bounds().centerY());
          press(item.bounds().centerX(), item.bounds().centerY()-10, 80);
          toast("收取一次");
          sleep(200);
      });
  }


  launchApp("淘宝");//打开的程序


   //获取坐标
   
   //点击
   //click(res.bounds().centerX(), res.bounds().centerY())
   //长按
   //press(res.bounds().centerX(), res.bounds().centerY(), 100)
   app.launchPackage("com.eg.android.AlipayGphone");

   // 直接点击bounds
   bounds(813,883,1039,993).findOne().click();

   // 点击文字的
   textContains("去浏览").exists()
   textContains("去浏览").findOne().click();



// 在auto 布局中可以查看 具体的数据 这个就是 classname 的
// className("android.view.View").desc("搜索").clickable(true).findOne().click()

   //截屏
   // var img = captureScreen();
   // files.writeBytes("icon.jpg", img.body.bytes());

// 拾取坐标  截图 然后乘以 1.115
// 312  606   3.115
// 971  1887.69
// 控制台

// 随机数 Math.floor(Math.random()*50)


// 触摸监听

// 分辨率兼容
if (height == 2280) {
    setScreenMetrics(1080, 2280);
    purchase()
} else if (height == 1920) {
    setScreenMetrics(1080, 1920);
    purchase()
} else {
    console.log("未适配的分辨率尺寸");
        toast("\n错误！请检查控制台输出。");
}




