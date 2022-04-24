// 这是一个悬浮窗示例
var storage = storages.create("日赚3万_短视频合集"); //创建本地储存
var douyinTask = require("AirMirrorAuto.js");
var img_url = "file://../screen.png"

悬浮窗();

function 悬浮窗() {
    window = floaty.rawWindow(
        <horizontal gravity="center_vertical">
            <img id="图标" src="{{img_url}}" w="60" h="60" alpha="0.8" circle="true" borderWidth="1dp" borderColor="black" />
            <horizontal id="抽屉">
                <vertical>
                    <button id="ui_运行" textColor="#FFFFFF" text="开始" bg="#4F4F4F" padding="0" h="40" w="60" />
                    <text text="" h="1" />
                    <button id="ui_关闭" textColor="#FFFFFF" text="结束" bg="#4F4F4F" padding="0" h="40" w="60" />
                </vertical>
            </horizontal>
        </horizontal>
    );
    window.setPosition(50, device.height / 3);
    window.exitOnClose();
    setInterval(() => { }, 1000);
    window.抽屉.visibility = 8;
    状态 = false;
    var execution = null;
    var x = 0,
        y = 0;
    var windowX, windowY;
    var downTime;

    window.图标.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                window.setPosition(50, device.height / 3);
                return true;
            case event.ACTION_UP:
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    抽屉状态();
                }
                return true;
        }
        return true;
    });

    function 抽屉状态() {
        if (window.抽屉.visibility == 8) {
            window.抽屉.visibility = 0;
        } else {
            window.抽屉.visibility = 8;
        }
    }

    window.ui_关闭.setOnTouchListener(function (view, event) {
        if (event.getAction() == event.ACTION_UP) {
            toastLog("关闭脚本...");
            window.close();
            exit();
        }
        return true;
    });

    //运行按钮事件
    window.ui_运行.setOnTouchListener(function (view, event) {
        if (event.getAction() == event.ACTION_UP) {
            window.setPosition(50, device.height / 3);
            window.disableFocus();
            if (window.ui_运行.text() == "开始") {
                window.ui_运行.text("暂停");
                console.log("开始运行悬浮窗");

                var main = threads.start(function () {
                    device.keepScreenOn()
                    //运行脚本
                    douyinTask.runDouYinTask();
                })

                //两秒不点击暂停，则隐藏抽屉
                setTimeout(function () {
                    if (window.ui_运行.text() == "暂停") {
                        抽屉状态()
                    }
                }, 3000)

                //监控运行还是暂停
                var 监控状态 = setInterval(function () {
                    if (window.ui_运行.text() == "开始") { //是运行说明暂停了
                        main.interrupt()
                        toastLog("暂停了")
                        clearInterval(监控状态)
                    }
                }, 100)

            } else {
                状态 = false;
                window.ui_运行.text("开始");
                toastLog("开始暂停...");
            }
        }
        return true;
    });
}
