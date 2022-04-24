// 开头必须要加，否则脚本不会以ui模式运行

"ui";

ui.layout(

    <vertical padding="16">

        <text textSize="16sp" textColor="red" text="请输入使用者姓名" />

        <input id="name" />

        <button id="ok" text="确定" />

    </vertical>

);


// 点击确定按钮以后要执行的动作

ui.ok.click(function () {

    // 通过getText()获取输入的内容

    var name = ui.name.getText();

    toast(name + "您好，欢迎使用本软件");

})