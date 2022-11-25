
// 弹出的权限可以自己点
threads.start(function (){
    var beginBtn;
    if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
    beginBtn.click();
    }
});
// 此处findOne(2000)是为了限制查找时间，如果留空，找不到就会一直找。
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
sleep(2000);
// 此处与前面的findOne(2000)相对应，不然还没点"立即开始"，就截屏了
// 下面开始截屏
captureScreen("/storage/emulated/0/1/06.jpg");
toast ("截屏已完成")
var src=images.read("/storage/emulated/0/1/06.jpg");
var clip=images.clip(src,443,985,500,1150);
images.save(clip,"/storage/emulated/0/1/6.jpg");
toast ("截取片段完成");

// 发送图片 ocr 识别
var url = "https://api-cn.faceplusplus.com/imagepp/v2/generalocr";
var res = http.postMultipart(url, {api_key: "ogFOdwr6PXS4EAZKGm5qe6Ar9bZf3y7c",api_secret: "DyB9-hw2TBYfU8XLtu1vCxPjTnOemV4Y",
    image_file: open("/storage/emulated/0/1/6.jpg")
});
toast(res.body.string());