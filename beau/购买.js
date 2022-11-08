

//第一次买入

function oneBuy(){
    textContains("购买").findOne().click();
    sleep(1000);
    textContains("买入").findOne().click();
    sleep(2000);
    textContains("确定").findOne().click();
    sleep(2000);
    textContains("我已阅读").findOne().click();
    sleep(1000);
    textContains("买入").findOne().click();
    sleep(6000);
    textContains("确认买入").findOne().click();
    sleep(2000);
    textContains("我知道了").findOne().click();
    sleep(1000);
}


function twoBuy(){
    // 第二次买入
    textContains("购买").findOne().click();
    sleep(1000);
    textContains("买入").findOne().click();
    sleep(6000);
    textContains("确认买入").findOne().click();
    sleep(2000);
    textContains("我知道了").findOne().click();
    sleep(1000);
}

function upload(){
    textContains("上传支付凭证").findOne().click();
    sleep(2000);
    var 确定 = textContains("确定").find();
    if(!确定.empty()){
        textContains("确定").findOne().click();
        toast("存在确定");
    }else {
        toast("不存在再点一次");
        textContains("上传支付凭证").findOne().click();
        sleep(2000);
        textContains("确定").findOne().click();
    }
    sleep(1000);
    click(450, 800);
    sleep(2000);
    click(450, 800);
    sleep(2000);
    var 上传 = textContains("上传").find();
    if(!上传.empty()){
        textContains("上传").findOne().click();
        toast("存在上传");
    }else {
        toast("不存在再点一次 多点两次这个点没关系");
        click(450, 800);
        sleep(2000);
        click(450, 800);
        sleep(2000);
        textContains("上传").findOne().click();
    }
    textContains("上传").findOne().click();
    sleep(1000);
    textContains("我知道了").findOne().click();
}
// twoBuy()
upload()

