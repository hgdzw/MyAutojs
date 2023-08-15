// 思路： 在消息界面，如果有 +1 点进去 然后判断上一个买家发的消息，用自己的关键词库 去匹配，如果匹配上就发送回去
console.log("打开屏幕常亮");
device.keepScreenOn(5 * 60 * 1000);
// main();
var ss = "123123";
// log(ss.indexOf("23"))

var res = desc("想跟TA说点什么...").findOne();
press(324,1135,400)
sleep(50);
press(314,1135,300)
sleep(50);
press(324,1125,400)
// press(res.bounds().centerX() + 10, res.bounds().centerY(),2000)

// setText ("String");
// input("ss")
// console.log("关闭屏幕常亮");
device.cancelKeepingAwake();

function main(){
    var readTxt = "未读数1";
    console.log(desc(readTxt).exists());
    toast(desc(readTxt).exists());
    // if(desc(readTxt).exists()){
    //     toast("if发现有消息");
    // }
    while(desc(readTxt).exists()){
        toast("发现有消息");
        //查看 发送的东西 回复 然后返回
        var message_txt = endTxt();
        // 模板库
        
    }
    // sleep(1000)
    // // 发货()
    // sleep(1000)
    // main()
}

// 模板库 通过 最后的文本来 来决定发送什么信息
function template_txt(message_txt){
    if(message_txt.indexOf("卡")){
        return '兄弟，里面有两站一日卡';
    }
    if(message_txt.indexOf("积分")){
        return '里面是没有积分的，全新的账号。';
    }
    if(message_txt.indexOf("绑定")){
        return '没有绑定设备，没有设置超级密码。';
    }
    return "账号大大的有，全自动发货，里面两张一日卡。";
}

function endTxt(){
    // 进入
    bounds(0, 788, 1080, 1019).click();
    var res = className("android.view.View").find();
    var message_txt = '';                
    if(!res.empty()){
        res.forEach(function(item){   // 依次点击
            // toast("传入的值"+item.desc());
            var response = is_array(item.desc())
            // toast("返回的值："+response);
            if(!response) {
                // toast("不在数组里面"+item.desc());
                // console.log(item.desc());
                message_txt = item.desc();
            }
            // click(item.bounds().centerX(), item.bounds().centerY());
        });
        log("最后的结果："+message_txt)
    }
    // 回复消息
    var return_msg = template_txt(message_txt);
    log("回复的消息"+return_msg);
    


}

function is_array(x){
    var dict_x = [null,'null','注意：说无法下单要你缴费的是骗子！说加qq刷单涨粉的是骗子！','聊天小助手\n友好的对话，是一场缘分的开始','想跟TA说点什么...','已读','更多'];
    for (i = 0; i < dict_x.length; i++) {
        if(x == dict_x[i]){
            // toast("相等");
            return true;
        }
    }
    return false;
}

// 一下打印两个日志
function log(msg){
    toast(msg);
    console.log(msg);
}