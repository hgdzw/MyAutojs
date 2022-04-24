
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
win_sj = floaty.rawWindow(
    <frame w="{{device.width}}px" h="{{device.height}}px" >//模拟对话框_设置
        <frame id="off" bg="#000000" alpha="0" /> // 这个是用来点击关闭的透明背景
        <card margin="20 20 20 0" w="{{device.width-700}}px" h="*" cardCornerRadius="15dp" cardBackgroundColor="#ffffff"
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
                    </vertical>
                </scroll>
            </vertical>
        </card>
    </frame>
)
time_3 = setInterval(() => {
    // if (logo_switch_1 && win_sj.主控件.getY() > 0) {
    //     logo_switch_1 = false
    //     events.broadcast.emit("定时器关闭", time_3)
    // }
    // log("设置0")
}, 100)
win_sj.off.on("click", () => {
    win_sj.close()
})
win_sj.打开无障碍.on("click", () => {
    win_sj.close()
})
// time_1 = setInterval(() => {
//     // log("设置")
// }, 1000)