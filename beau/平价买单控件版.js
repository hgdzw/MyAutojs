
"ui";

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


var appName = "平价买单";
let workThread=null; 

ui.statusBarColor("#FF4FB3FF")
ui.layout(
    <drawer id="drawer">
        <vertical>
        <appbar>
                <toolbar id="toolbar" bg="#ff4fb3ff" title="{{appName}}"/>
            </appbar>
            <vertical gravity="center" layout_weight="1">
                <frame>
                {/* <View bg="#ff4fb3ff" h="54"/> */}
                <viewpager h="84" id="pager">
                <vertical>
                <card w="*" h="68" margin="10 8" cardCornerRadius="6dp"
                        cardElevation="2dp" gravity="center">  
                    <linear>
                        <vertical margin="10" layout_gravity="center_vertical" layout_weight="1"> 
                            <text id="name" size="18" color="#444444" text="无帐号"/>
                            <text id="integral"  padding="1" size="16" text="..." foreground="?selectableItemBackground"/>
                        </vertical>
                    </linear>                        
                </card>
                </vertical>
                </viewpager>
                </frame>
                <tabs w="40" id="tabs" tabIndicatorColor="#777777" bg="#cfcfcf"  h="2"/>         
                                    
                <vertical padding="10 6 0 6" bg="#ffffff" w="*" h="auto" margin="0 5" elevation="1dp">
                    <Switch id="autoService" w="*" checked="{{auto.service != null}}" textColor="#666666" text="无障碍服务"/>           
                    <View h="5"/>
                </vertical> 
                        
                <vertical margin="0 10" bg="#ffffff" elevation="1dp" padding="5 5 10 5" w="*" h="auto">          
                    <linear>
                        <text text="切换点击时间(越大越慢，看你自己网速)"/>           
                    </linear>
                    <linear>
                        <seekbar id="DYseekbar" max="5000" layout_weight="1"/>
                        <text gravity="center" id="swapTime"/>
                    </linear>
                    <View h="5"/>

                    <linear>
                        <checkbox id="fiveQu" text="5000区" layout_weight="1"/>  
                        <text text="是否抢五千"/>           
                    </linear>
                    <linear>
                        <checkbox id="twoWan" text="20000区" layout_weight="1"/>  
                        <text text="是否抢两万"/>           
                    </linear>
                    <linear>
                        <checkbox id="fiveWan" text="50000区" layout_weight="1"/>  
                        <text text="是否抢五万"/>           
                    </linear>
                </vertical>     
                <linear>
                    <text layout_weight="1" size="19" color="#222222" text="日志"/>
                    <button id="tolog" h="40" text="全部日志" style="Widget.AppCompat.Button.Borderless.Colored"/> 
                </linear>
                <text paddingLeft="5" size="16" id="oneLog"/>                 
                
                <vertical margin="0 10" bg="#ffffff"  elevation="1dp" h="*" id="tips">
                    <text gravity="center" text="1.一定要打开无障碍，并把应用放进电池不优化里面！！！" line="3"/>           
                    <text gravity="center" text="2.建议切换时间设置700(也就是0.7秒)" line="3"/>           
                    <text gravity="center" text="3.程序不算完整，遇到问题，停止重新启动！！" line="3"/>           
                    <text gravity="center" text="4.一般来说，买的时候没抢过人出现错误，再买也买不了，需要退出beau重新再来！" line="3"/>           
                </vertical> 

            </vertical>
            <button id="start" text="开始运行" tag="ScriptTag" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground"/>
        </vertical>
   </drawer>
);

//设置滑动模式

//设置滑动页面的标题
ui.pager.setTitles(["",""]); 
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.pager);

//无障碍开关监控
ui.autoService.setOnCheckedChangeListener(function(widget,checked) {
    if(checked&&!auto.service) {     
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked&&auto.service)auto.service.disableSelf()
    ui.autoService.setChecked(auto.service!=null) 
});


//存储
ui.DYseekbar.setOnSeekBarChangeListener({
    onProgressChanged:function(v,i,fromUser){
        ui.run(()=>{ui.swapTime.setText(""+i)})
        storages.create(appName).put("swapTime",i)
    }
})
ui.tolog.click(()=>{
    app.startActivity("console") 
 })
//存储器
ui.DYseekbar.setProgress(storages.create(appName).get("swapTime",200))
//回到本界面时，resume事件会被触发
ui.emitter.on("resume",()=>{
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

//禁止返回退出脚本
ui.emitter.on("back_pressed",function(event){
    if(workThread&&workThread.isAlive()){
        backTag=true;
        toast("为防止脚本自动退出，脚本运行时不可返回退出软件");
        event.consumed=true;
    }
})

let five_q = {area_name:"5000区",fen:"5000积分",low_money: 50}
let two_w = {area_name:"20000区",fen:"20000积分",low_money: 200}
let five_w = {area_name:"50000区",fen:"50000积分",low_money: 500}

function area(ar_dict){
    //点击区域
    dzw.textClick(ar_dict.area_name)
    // textContains(ar_dict.area_name).findOne(2000).click()
    let time = storages.create(appName).get("swapTime",200)
    if(time < 500)time=500
    sleep(time)
    console.log("点击时间"+time)
    //bounds 不兼容 换一种写法
    // let first_m = bounds(348, 403, 588, 468).findOne(2000).getText()
    // let first_fen = bounds(42, 403, 342, 468).findOne(2000).getText()
    var res = className("android.widget.TextView").find();
    if(!res.empty()){     
        //第几个 可以打印出来自己找
        let first_m = res.get(7).text()
        let first_fen = res.get(6).text()
        console.log("第一个金额"+first_m)
        console.log("第二个金额"+first_fen)
        if(first_fen == ar_dict.fen){
            //是当前的
            if(first_m.split(".")[0] <= ar_dict.low_money){
                // toast("找到最低金额"+first_m)
                console.log("找到最低金额"+first_m)
                // 这种点击只能找百分比  不然长宽不一样
                // 0.8777  0.20166
                press(device.width * 0.8777, device.height * 0.20166,200)
                sleep(500)
                // bounds(75, 1527, 539, 1665).findOne(2000).click()
                dzw.textClick("确认买入")
                return true
            }
        }
    }
    return false
}

//点击启动后走的逻辑
function Main_f(){
    console.log("屏幕宽度:" + device.width+"   "+"屏幕高度为"+device.height);
    let res = http.get("http://114.115.134.72:8081/beau/test?deviceId="+device.getAndroidId())
    if(res.body.string() != "ok"){
        return
    }
    console.log("开始监测切换..")
    while(true){
        console.log("打印......")
        let che = 0;
        //如果只选了一个 那还要点我的
        if(ui.fiveQu.checked){
            che = che + 1;
            if(area(five_q)){
                console.log("五千......")
                toast("扫到五千平价单.请支付！")
                break
            }
        }
        if(ui.twoWan.checked){
            che = che + 1;
            if(area(two_w)){
                console.log("两万......")
                toast("扫到两万平价单.请支付！")
                break
            }
        }
        if(ui.fiveWan.checked){
            che = che + 1;
            if(area(five_w)){
                console.log("五万......")
                toast("扫到五万平价单.请支付！")
                break
            }
        }
        if(che<=1){
            //说明只选了一个 那还要切我的
            dzw.textClick("我的")
        }
    }
}


ui.start.click(()=>{

    if(ui.start.text() == "开始运行"){
        toast('请在10s之内打开beaubox并在买积分页面')
        ui.start.setText("停止运行");
        storages.create(appName).put("runState","停止运行")
        ui.start.attr("bg","#ff0000")
        setTimeout(function () {
            workThread=threads.start(function(){
                try{
                   if(!auto.service)toast("请先打开无障碍服务");         
                   else Main_f()
                }catch(e){
                   if(!e.javaException instanceof java.lang.InterruptedException)  
                      console.error("运行出错:"+e.toString())
                }finally{
                   ui.run(function(){
                      ui.start.setText("开始运行")
                      toast("平价单程序终止!")
                      ui.start.attr("bg","#FF4FB3FF")
                   });
                }
             });
        }, 6000)
    }else if(ui.start.text() == "停止运行"){
        ui.start.setText("开始运行");
        storages.create(appName).put("runState","开始运行")
        ui.start.attr("bg","#FF4FB3FF")
        threads.shutDownAll()
    }
});

