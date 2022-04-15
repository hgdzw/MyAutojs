# 一个手机上面的键盘精灵  通过auto js这个软件可以在手机上面操作

### 一、编写代码环境
   1. 首先手机上面需要安装 auto js
   2. 在电脑上面安装vscode 插件 Auto.js-VSCodeExt
   3. 启动插件服务： ctrl + shift + p  选择 输入 auto.js:start server
   4. 手机电脑处于同一局域网 手机连接电脑
   5. 执行代码 ctrl + shift + p 选择  auto.js:run on dervice
   
   参考:https://www.cnblogs.com/sweetC/p/11807280.html

### 控件
   [参考](https://blog.csdn.net/m0_54850952/article/details/123120543)
   
   #### 控件类型
   首先明白什么是控件,有几种类型
   * TextView 显示文字(“android.widget.TextView”)
   * ImageView 显示图片(“android.widget.ImageView”)
   * EditText 输入框
   * Button 按钮，可附带图片
   * CheckBox 复选框

   #### 控件属性
   如果获取到控件  我们可以查看下面的属性(常用)
   * className 类名,表示控件类型(“android.widget.TextView”等)
   * packageName 包名,表示控件所在的应用包(“com.tencent.mobileqq”)
   * editable 控件是否可编辑
   * longClickable 控件是否可长按
   * bounds 控件在屏幕上的范围，当控件无法点击，用这个属性获取坐标
   * checkable 控件是否可勾选
   * checked 控件是否可已勾选
   * scrollable 控件是否可滑动
   * selected 控件是否已选择
   * visibleToUser 控件是否可见
   * enabled 控件是否已启用
   * depth 控件的布局深度
   * drawingOrder 控件在父控件的绘制顺序。
   * indexInParent 控件在父控件的位置

   #### 获取控件
   我们可以通过上面的属性 再加上一个 findOne()  就可以获取一个控件

   #### 判断控件是否存在
   desc("我的").exists()

### 二、语法
   首先在vscode 中新建一个 js文件 在里面写代码 然后运行就行




   #### 2.1 应用类
   ```text
   //启动app
   app.launchPackage("com.eg.android.AlipayGphone");

```
   

   #### 2.1 弹出消息类
   ```text
   toast("s之后跳到下个视频！已经执行 ");

```

   #### 2.1 寻找坐标
   手机可以在  开发者选项-> 开启"指针位置" 可以直接获取指针位置了
   
   ```text
   //根据文字找第一个坐标
   var res = className("android.widget.TextView").text("京东活动").findOne();
   click(res.bounds().centerX(), res.bounds().centerY())
   
   //根据文字找第一个坐标很多个的坐标
   var res = className("android.widget.TextView").text("京东活动").find();
   if(!res.empty()){                
       res.forEach(function(item){   // 依次点击
           click(item.bounds().centerX(), item.bounds().centerY());
       });
       return MP_valid;
   }

    //根据文本找
    textContains("文本")

   //根据某个图标来找坐标
   
   // 根据bounds 点击
   bounds(48, 684, 1032, 872).click()
```

   #### 发起请求
   ```test
   #get
   http.get("url")
   # post
   var token_Res = http.post("http://123.com", {
        grant_type: "client_credentials",
        client_id: API_Key,
        client_secret: Secret_Key,
    });
    var access_token=token_Res.body.json().access_token;

   ```

   #### 2.1 点击滑动操作
   ```test
   //根据坐标点点击
   click(x,y)
   
   //长按
   press(x, y, 毫秒值)

   //滑动
   swipe(x1, y1, x2, y2, 毫秒值)
   
   //模拟手势操作
   gesture(毫秒值, [x1, y1], [x2, y2], …)

   //查看屏幕有这个文本吗
   textContains("文本").exists()
   //点击这个文本
   textContains(value).findOne().click()
   
```
   
   #### 2.1 文件操作 files
   ```text
   

```

