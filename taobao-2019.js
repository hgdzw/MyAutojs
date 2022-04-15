auto()
var str = "";
str += "屏幕宽度:" + device.width
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为"+device.width+"   "+"屏幕高度为"+device.height);
//获取设备信息
launchApp("手机淘宝");
toast("打开手机淘宝中");
sleep(8000)
waitForActivity("com.taobao.tao.TBMainActivity")
     
      
 //等待主页完全打开
 //className("android.widget.LinearLayout").desc("捉猫猫").findOne().click()
//上面这句只适用于淘宝界面上面有“20亿”字样，不适用于所有人（可能以后会全部变成20亿，暂且保留）
//className("android.widget.FrameLayout").depth(3).drawingOrder(3).indexInParent(2).findOne().click()
className("android.view.View").desc("搜索").clickable(true).findOne().click()
sleep(2000)
id("searchEdit").waitFor()
id("searchEdit").findOne().setText("双十一合伙人")
id("searchbtn").waitFor()
id("searchbtn").findOne().click()
    
     
     
      
      
waitForActivity("com.taobao.browser.BrowserActivity")
//判断当前界面是否为目标界面
toast("这个地方等待时间大概是8S，不要以为脚本停了")
sleep(8000)
      
      
      
//className("android.view.View").depth(14).indexInParent(5).boundsInside(0, device.height / 2, device.width, device.height).findOne().click()
 //点击“领喵币”挂件
//貌似这个地方不是所有人都可以找到
//下面是新的测试
className("android.widget.Button").text("升级领红包").waitFor()
var DMB=className("android.widget.Button").text("升级领红包").findOne().bounds()
click(device.width-150,DMB.centerY())
 
 
 
  sleep(2000)
 
swipe(device.width / 2, 4*device.height/5, device.width / 2,3* device.height/5,1000);
 
  sleep(2000)
  if(text("签到").exists()){
    text("签到").findOne().click();
    sleep(1600);
    toast("签到成功")
}
sleep(1000)
 
      if(text("去浏览").exists()){
      while(text("去浏览").exists()){
   //判断是否有去浏览
    text("去浏览").findOne().click();
    sleep(2000)
    toast("存在并点击");
    sleep(5000)
    
    swipe(device.width / 2, 4*device.height/5, device.width / 2, device.height/5,1000);
    sleep(2000)
swipe(device.width / 2, 4*device.height/5, device.width / 2, device.height/5,1000);
    sleep(18000)
    
//这个地方如果网络不好，自己加时间(单位是毫秒)，1000毫秒为1秒
    //判断是否在主页
    if(className("android.widget.LinearLayout").desc("会员码").exists()){
        toast("现在在主页")
        sleep(1000)
     /*
      var Bad= className("android.view.View").textContains("返回双11合伙人").bounds()
     //click(Bad.centerX(),Bad.centerY())
    这个地方总是一不留神就没了，只能用笨方法
    */
     //这里开始替换
     className("android.view.View").desc("搜索").clickable(true).findOne().click()
     sleep(2000)
     id("searchEdit").waitFor()
     id("searchEdit").findOne().setText("双十一合伙人")
     id("searchbtn").waitFor()
     id("searchbtn").findOne().click()
     waitForActivity("com.taobao.browser.BrowserActivity")
toast("这个地方等待时间大概是8S，不要以为脚本停了")
sleep(8000)
className("android.widget.Button").text("升级领红包").waitFor()    
click(device.width-150,DMB.centerY())
//这里替换结束
sleep(3000)
        swipe(device.width / 2, 4*device.height/5, device.width / 2,3* device.height/5,1000);
        }
        else
        {
          back()
        }
    
     
    sleep(2000)
      }
      }
          
   
        
     
     
     
while(text("去签到").exists()){
   //判断是否有去签到
    text("去签到").findOne().click();
     
 toast("这里要等久一点，10秒后才继续")
 sleep(10000)
if(textContains("的农场" ).exists() ){
    //判断当前界面
sleep(1000)
    textContains("去签到").waitFor()
    textContains("去签到").findOne().click()
  
    
    text("签到").waitFor()
    var i =text("签到").findOne().bounds()
    click(i.centerX(),i.centerY())
  
sleep(2000)
    back()
     
     
     
     
    
//天猫农场
 }
 else
 {
    // toast("我卡在错误的地方了")调试用的
     sleep(1000)
     var day= className("android.view.View").desc("今日签到").bounds()
     click(day.centerX(),day.centerY())
    // className("android.view.View").desc("今日签到").findOne().parent().click()
 back()
//这个地方10/28日我发现有又改动，我改过来了
//另外一个签到
     }
   sleep(3000)
 }
     
          toast("脚本结束")    //by 暗夜协奏者，转载不要删这句