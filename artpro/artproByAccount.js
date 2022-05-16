// 监听artpro 这个软件的 每个用户占比   其实这个抓包请求接口最好  但是接口拿不到数据 只能通过这种笨方法了

"ui";
ui.layout(
    <vertical padding="16">
        {/* <img w="250" h="500" src="http://106.14.28.60:9000/test/artpro.jpg" /> */}
        <input id="pathName" hint="请输入您创建的文件名" />
        <input id="total" inputType="number" hint="请输入爬取到第多少个!（请输入数字）" />
        <button w="auto" id="ok" text="确定" />

        <text text="温馨提示：" textColor="red" />
        <text text="请先打开ArtPro软件，并将界面选择到类似以下列表!" />
        <img w="250" h="500" src="http://106.14.28.60:9000/test/artpro.jpg" />
    </vertical>
);

// 点击确定按钮以后要执行的动作
ui.ok.click(function () {
    threads.start(function () {
        // 通过getText()获取输入的内容
        app.launchApp("ArtPro");
        sleep(1000);
        // var pathName = rawInput("请输入您创建的文件名!");
        // var total = rawInput("请输入爬取到第多少个!（请输入数字）");
        var pathName = ui.pathName.getText();
        var total = ui.total.getText();
        let pathNameStr = "/sdcard/ArtPro脚本/" + pathName + ".txt";

        //把文件初始化了先
        files.createWithDirs(pathNameStr);
        files.write(pathNameStr, "");
        for (let i = 1; i <= total; i++) {
            //列表进去
            id("et_search").findOne().click();
            setText(i);
            sleep(500);
            click(983, 2267);
            sleep(500);
            click(311, 432);
            sleep(500);

            //查找记录
            let res = id("name").findOne();
            let tv_price = id("tv_price").findOne();
            let tv_status = id("tv_status").findOne();
            toast(res.text() + ":" + tv_status.text() + ":" + tv_price.text());
            files.append(pathNameStr, i + ":" + res.text() + ":" + tv_status.text() + ":" + tv_price.text() + "\n")
            sleep(500);
            id("tv_nft_other").findOne().click();
            sleep(500);
        }
    })
})
