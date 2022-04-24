importClass(java.lang.Runnable);
importClass(android.animation.ObjectAnimator)
importClass(android.animation.PropertyValuesHolder)
importClass(android.animation.ValueAnimator)
importClass(android.animation.AnimatorSet)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.TranslateAnimation)
importClass(android.animation.ObjectAnimator)
importClass(android.animation.TimeInterpolator)
importClass(android.os.Bundle)
importClass(android.view.View)
importClass(android.view.Window)
importClass(android.view.animation.AccelerateDecelerateInterpolator)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.AnticipateInterpolator)
importClass(android.view.animation.AnticipateOvershootInterpolator)
importClass(android.view.animation.BounceInterpolator)
importClass(android.view.animation.CycleInterpolator)
importClass(android.view.animation.DecelerateInterpolator)
importClass(android.view.animation.LinearInterpolator)
importClass(android.view.animation.OvershootInterpolator)
importClass(android.view.animation.PathInterpolator)
importClass(android.widget.Button)
importClass(android.widget.ImageView)
importClass(android.widget.TextView)
var logo_switch = false;//全局: 悬浮窗的开启关闭检测
var logo_buys = false;//全局: 开启和关闭时占用状态 防止多次点击触发
var logo_fx = true//全局: 悬浮按钮所在的方向 真左 假右
var time_0, time_1, time_3//全局: 定时器 点击退出悬浮窗时定时器关闭
//可修改参数
var logo_ms = 200//全局:  动画播放时间
var DHK_ms = 200//全局:  对话框动画播放时间
var tint_color = "#00000"//全局:  对话框图片颜色


/**
 * 需要三个悬浮窗一起协作达到Auto.js悬浮窗效果
 * win  子菜单悬浮窗 处理子菜单选项点击事件
 * win_1  主悬浮按钮 
 * win_2  悬浮按钮动画替身,只有在手指移动主按钮的时候才会被触发 
 * 触发时,替身Y值会跟主按钮Y值绑定一起,手指弹起时代替主按钮显示跳动的小球动画
 */
var win_1 = floaty.rawWindow(
    <frame id="logo" w="44" h="44" alpha="0.4" >//悬浮按钮
        <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
        <img id="img_logo" w="32" h="32" src="https://pro.autojs.org/images/logo.png" gravity="center" layout_gravity="center" />
        <img id="logo_click" w="*" h="*" src="#ffffff" alpha="0" />
    </frame>
)
win_1.setPosition(-30, device.height / 2)//悬浮按钮定位

var terid = setInterval(() => {
    log("13")
}, 1000)

/**
 * 等待悬浮窗初始化
 */
time_0 = setInterval(() => {
    //log("11")
}, 1000)

var win_sj, Pack = "", Acti = "", XC_SJ, logo_switch_1 = true
function 设置() {
    XC_SJ = threads.start(function () {
        logo_switch_1 = true
        win_sj = floaty.rawWindow(
            <frame w="{{device.width}}px" h="{{device.height}}px" >//模拟对话框_设置
                <frame id="off" bg="#000000" alpha="0" /> // 这个是用来点击关闭的透明背景
                <card margin="60 100 60 0" w="{{device.width-400}}px" h="{{device.height-1000}}px" cardCornerRadius="15dp" cardBackgroundColor="#ffffff"
                    cardElevation="30dp" foreground="?selectableItemBackground">
                    <vertical w="*" h="auto">
                        <text margin="20 20 20 0" text="设置" textSize="24sp" textStyle="bold" textColor="#000000" />
                        <scroll w="*" h="auto" marginBottom="10">
                            <vertical w="*" h="auto">
                                <frame w="*" >
                                    <frame marginLeft="20" w="auto">
                                        <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_accessible_black_48dp" />
                                    </frame>
                                    <button id="打开无障碍" text="打开无障碍服务" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="60" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="16sp" typeface="normal" />
                                </frame>

                                <frame w="*">
                                    <frame marginLeft="20" w="auto">
                                        <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_adb_black_48dp" tint="#000000" />
                                    </frame>
                                    <button id="当前包名" text="当前应用包名:{{Pack}}" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="auto" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="15sp" typeface="normal" ellipsize="marquee" />
                                </frame>
                            </vertical>
                        </scroll>
                    </vertical>
                </card>
            </frame>
        )
        time_3 = setInterval(() => {
            // log("设置0")
        }, 100)
        win_sj.打开无障碍.on("click", () => {
            win_sj_off(false)
            app.startActivity({
                action: "android.settings.ACCESSIBILITY_SETTINGS"
            });
            win_sj.close()
        })
        win_sj.off.on("click", () => {
            win_sj.close()
        })

        function win_sj_off(E) {
            // threads.start(function () {
            //     sleep(DHK_ms)
            //     win_sj.close()
            //     clearInterval(time_1)
            //     XC_SJ.interrupt()
            //     if (E) {
            //         win_1.close()
            //         events.broadcast.emit("定时器关闭", time_0)
            //         exit()
            //     }
            //     return
            // })
        }
        time_1 = setInterval(() => {
            // log("设置")
        }, 1000)
    })
}



//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY; G_Y = 0
//记录按键被按下的时间以便判断长按等动作
var downTime; yd = false;
win_1.logo.setOnTouchListener(function (view, event) {
    if (logo_buys) { return }
    log(event.getAction())
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = win_1.getX();
            windowY = win_1.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            if (logo_switch) { return true; }
            if (!yd) {//如果移动的距离大于h值 则判断为移动 yd为真
                if (Math.abs(event.getRawY() - y) > 30 || Math.abs(event.getRawX() - x) > 30) { win_1.logo.attr("alpha", "1"); yd = true }
            } else {//移动手指时调整悬浮窗位置
                win_1.setPosition(windowX + (event.getRawX() - x),//悬浮按钮定位
                    windowY + (event.getRawY() - y));
            }
            return true;
        case event.ACTION_UP:                //手指弹起
            //触摸时间小于 200毫秒 并且移动距离小于30 则判断为 点击
            if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
                设置();
                toastLog("点击弹起")
            }
    }
    return true;
});


