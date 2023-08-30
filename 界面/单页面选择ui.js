"ui";
var appName = "阿伟爱分享";
const appId="01"
var isInTime=false;

const ZZ_version="1.0.82"
const TYPE={KS:"kshou",DY:"douyin"}

let isLogin=false;
let OutTimeTip="攒攒登录失效(点击更新)"
let workThread=null; 
let STORAGE=storages.create("攒攒自赚")
let backTag=false;

let 快手关注上限=false

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
                        <button id="login" w="90" text="登录账号" color="#ff5d85ff" style="Widget.AppCompat.Button.Borderless.Colored"/>
                    </linear>                        
                </card>
                </vertical>
                <vertical>
                <card w="*" h="68" margin="10 8" cardCornerRadius="6dp"
                        cardElevation="2dp" gravity="center">  
                    <linear>
                        <vertical margin="10" layout_gravity="center_vertical" layout_weight="1"> 
                        <text id="imei" textIsSelectable="true" size="18" color="#444444" text="{}"/>
                        <text id="Etime" size="16" text="..."/>
                        </vertical>
                        <button id="recharge" w="70" text="绑卡" color="#ff5d85ff" style="Widget.AppCompat.Button.Borderless.Colored"/>
                    </linear>                        
                </card>
                </vertical>
                </viewpager>
                </frame>
                <tabs w="40" id="tabs" tabIndicatorColor="#777777" bg="#cfcfcf"  h="2"/>         
                                    
                <vertical padding="10 6 0 6" bg="#ffffff" w="*" h="auto" margin="0 5" elevation="1dp">
                    <Switch id="autoService" w="*" checked="{{auto.service != null}}" textColor="#666666" text="无障碍服务"/>           
                    <View h="5"/>
                    <Switch w="*" textColor="#666666" text="不做评论任务" id="noComment"/>
                </vertical> 
                        
                <vertical margin="0 5" bg="#ffffff" elevation="1dp" padding="5 5 10 5" w="*" h="auto">          
                    <linear>
                        <checkbox id="DYcheck" text="抖音" layout_weight="1"/>  
                        <text text="单次运行任务上限↓"/>           
                    </linear>
                    <linear>
                        <seekbar id="DYseekbar" max="50" layout_weight="1"/>
                        <text gravity="center" id="DYlimit"/>
                    </linear>
                    <View h="5"/>
                    <linear gravity="center">
                        <checkbox id="KScheck" text="快手" layout_weight="1"/>     
                        <text text="单次运行任务上限↓"/>               
                    </linear>
                    <linear>
                        <seekbar id="KSseekbar" max="50" layout_weight="1"/> 
                        <text gravity="center" id="KSlimit"/>
                    </linear>                                  
                </vertical>                      
                
                <linear>
                    <text layout_weight="1" size="19" color="#222222" text="日志"/>
                    <button id="tolog" h="40" text="全部日志" style="Widget.AppCompat.Button.Borderless.Colored"/> 
                </linear>
                <text paddingLeft="5" size="16" id="oneLog"/>
                
                <list bg="#ffffff" elevation="1dp" h="*" id="logList">
                    <linear>
                    <text size="13" textColor="#555555" text="{{time}} "/>
                    <text size="13" text="{{message}}"/>
                    </linear>
                </list>       
            </vertical>
            <button id="start" text="开始运行" tag="ScriptTag" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground"/>
        </vertical>
   </drawer>
);

//设置滑动模式
ui.logList.setOverScrollMode(2);
//设置滑动页面的标题
ui.pager.setTitles(["",""]); 
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.pager);

ui.login.click((view)=>{ 
    var dialog = new android.app.AlertDialog.Builder(activity).create()
    dialog.setView(new android.widget.EditText(context))
    dialog.show();
    dialog.setCancelable(false)
    var window = dialog.getWindow(); 
    window.setDimAmount(0.6);
    var vv=ui.inflate( 
             <vertical>
               <text text="攒攒登录" size="19" color="#000000" padding="12 12"/> 
               <vertical margin="25 0 25 10">      
                  <linear>
                    <text gravity="center" color="#555555" size="17" text="账号 "/>
                    <input textColor="#000000" inputType="number" id="username" w="*"/>
                  </linear>
                  <linear>
                    <text gravity="center" color="#555555" size="17" text="密码 "/>
                    <input textColor="#000000" id="password" w="*"/>
                  </linear>   
                                
               </vertical>
                 <relative>
                   <button id="cancle" layout_alignParentLeft="true" text="取消" style="Widget.AppCompat.Button.Borderless.Colored" w="auto"/>
                   <button id="login" layout_alignParentRight="true" text="登录" style="Widget.AppCompat.Button.Borderless.Colored" w="auto"/>
                 </relative>                       
             </vertical>)
   window.setContentView(vv);  
   vv.cancle.click(()=>{dialog.dismiss();});
   
   vv.login.click(() =>{
        if (!vv.username.text()){toast("账号不能为空!");return;}
        if (!vv.password.text()){toast("密码不能为空");return;}
        threads.start(function() {     
            var pL= login(vv.username.text(),vv.password.text());
            
            if(!pL.data||!pL.data.token){toast("登录失败!");return;}
            
            toast("登陆成功!");
         
            STORAGE.put("username",vv.username.text())
            STORAGE.put("password",vv.password.text())
            STORAGE.put("token",pL.data.token);
            ui.run(function(){
                // refreshZZ();
            });
            dialog.dismiss();           
        });          
    });
   
});
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
        ui.run(()=>{ui.DYlimit.setText(""+i*10)})
        storages.create(appName).put("DYlimit",i*10)
    }
})

//存储器
ui.DYseekbar.setProgress(storages.create(appName).get("DYlimit",200)/10)
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
ui.tolog.click(()=>{
   app.startActivity("console") 
})
ui.integral.click((v)=>{
    if(v.text()==OutTimeTip){
        if (!STORAGE.get("username", null)){toast("未保存账号");return;}
        if (!STORAGE.get("password", null)){toast("未保存密码");return;}
        threads.start(function() {     
            var pL= login(STORAGE.get("username", null),STORAGE.get("password", null));
            
            if(!pL.data||!pL.data.token){toastLog("自动登录失败!"+pL.msg);return;}
            
            toast("自动登陆成功!");
            
            STORAGE.put("token",pL.data.token);
            ui.run(function(){
                // refreshZZ();
            });           
        });         
    }
})


//点击启动后走的逻辑
function Main_f(){
    while(true){
        console.log("打印......")
        toast("xxxx....")
        sleep(200)
    }
}

ui.start.click(()=>{
    if(ui.start.text() == "开始运行"){
        toast('请在10s之内打开对应的软件')
        ui.start.setText("停止运行");
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
                   });
                }
             });
        }, 3000)
    }else if(ui.start.text() == "停止运行"){
        ui.start.setText("开始运行");
        ui.start.attr("bg","#FF4FB3FF")
        threads.shutDownAll()
    }
});