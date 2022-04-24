// 监听artpro 这个软件的 实时刷新最新价格   其实这个抓包请求接口最好  但是接口拿不到数据 只能通过这种笨方法了
var price = rawInput("请输入您抢购的最低价!");
function selectArt() {
    while (true) {
        swipe(534, 977, 559, 1500, 500);
        sleep(500);
        var frist = id("tv_price_value").findOne();
        if (frist.text() <= price) {
            toast(frist.text());
            click(frist.bounds().centerX(), frist.bounds().centerY());
            break;
        }
    }
    buyArt();
}
function buyArt() {
    var buy = id("button").findOne();
    click(buy.bounds().centerX(), buy.bounds().centerY());
    //如果点了之后还有立刻购买说明被买掉了 返回之后继续
    sleep(2000);
    if (text("立即购买").exists()) {
        back();
        selectArt();
    } else {
        http.post("https://sctapi.ftqq.com/SCT139714TAygkEw3ITsJ0mLxEWVQvqTmh.send", {
            title: "已经购买",
            desp: "请快去支付!"
        });
    }
}
selectArt();