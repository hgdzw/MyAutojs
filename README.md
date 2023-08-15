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
   * findOne()  ： 找不到就阻塞  参数可以传等待时间 
   * findOnce() ： 找不到返回空
   * findOnce(i) ： 对屏幕上的控件进行搜索，并返回第 i + 1 个符合条件的控件；如果没有找到符合条件的控件，或者符合条件的控件个数 < i, 则返回null。

   #### 判断控件是否存在
   desc("我的").exists()

### 二、语法
   首先在vscode 中新建一个 js文件 在里面写代码 然后运行就行

   #### 2.1 应用类
   ```text
   //启动app
   app.launchPackage("com.eg.android.AlipayGphone");
   app.launchApp(appName);
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

   #### 获取控件文本
   ```
   var res = id("chatting_time_tv").findOne();
   toast(res.text());
   ```


### 时间
  ```text
   var date = new Date();
   function getNowTime(){
      var yy=date.getFullYear(); 
      var MM=date.getMonth()+1;
      //使用三目运算符，判断是一位还是两位，不足补0，最后返回拼接字符串日期时间用-分割，毫秒使用.分割
      MM= MM <10 ? "0" + MM:MM;
      var dd=date.getDate();
      dd= dd<10? "0" + dd:dd;
      var HH=date.getHours();
      HH=HH <10? "0" + HH:HH;
      var mm=date.getMinutes(); 
      mm = mm< 10?  "0"+ mm:mm;  
      var ss=date.getSeconds(); 
      ss=ss<10 ? "0"+ss:ss;
      var ms= date.getMilliseconds();
      ms= ms< 100? "0"+ ms: ms;
      ms = ms< 10? "0"+ ms: ms;
      return yy + "" + MM + "" + dd + "-" + HH  + "" + mm + "" + ss + "." + ms;
   }
  ```
### 输入文本
   配合剪切板实现输入：

   * setClip(text);
   * getClip()返回系统剪贴板内容
   * UiObject.paste()对输入框控件进行粘贴操作

   根据传入的参数来输入文本：

   * setText([i, ]text)将第i 个输入框的文本设置为text；不加参数i，则把所有输入框的文本都置为text
   * input([i, ]text)在将第i 个输入框原来的文本上追加文本text，不加参数i则会把所有输入框的文本追加内容text

   上面介绍的是全局函数，下面是一些基于控件的操作：

   * UiObject.setText(text)设置输入框控件的文本内容，只对可编辑的输入框(editable为true)有效
   * UiObject.setSelection(start, end)对输入框控件设置选中的文字内容
   * UiObject.copy()对输入框文本的选中内容进行复制，只能用于输入框控件，并且当前输入框控件有选中的文本（可以通过setSelection()函数来设置输入框选中的内容）
   * UiObject.cut()对输入框文本的选中内容进行剪切，后面同上
   * UiObject.paste()对输入框控件进行粘贴，粘贴剪贴板的内容

   可以先写到粘贴板，长按 longClick 粘贴

### 模块化
   分为自己写的js 和 安卓自带的
   自己写的
   ```js
   var circle = require('circle.js');
   console.log("半径为 4 的圆的面积是 %d", circle.area(4));
   ```

   安卓自带
   ```js
   importClass(android.view.animation.AnticipateInterpolator)

   ```

### 悬浮窗
   创建一个悬浮窗，基本上都是创建一个原始的悬浮窗，然后在上面加东西,里面传递的是一个 layout
   ```text
   var w = floaty.rawWindow(
      <frame gravity="center">
         <text id="text">悬浮文字</text>
      </frame>
   );
   //悬浮窗在脚本关闭时会自动关闭 所以设置一个空的setInterval 让一直显示
   setInterval(()=>{}, 1000);
   ```
   #### layout 布局 详解  是ui 的一个
   * frame:    alpha 这个是透明度  0 代表透明 1 全黑
   ```text
   
   ```

   #### 1.1 设置可触摸移动
   ```text
   //设置悬浮窗位置
   w.setPosition(x, y)
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
               } else {//移动手指时调整两个悬浮窗位置
                  win_1.setPosition(windowX + (event.getRawX() - x),//悬浮按钮定位
                     windowY + (event.getRawY() - y));
               }
               return true;
         case event.ACTION_UP:                //手指弹起
               //触摸时间小于 200毫秒 并且移动距离小于30 则判断为 点击
               if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
                  toastLog("点击弹起")
               }
      }
      return true;
   });
   ```

   #### 1.2 点击图标功能页面
   如果没有给绑定 setOnTouchListener 事件的话，那么想要点击出功能的话 基本上都是绑定
   ```text
   win_1.logo.on("click", () => {
      toast("点击了");
   })
   ```

### 存储
   #### Storages - 本地存储
   let stro = storages.create(name)
   stro.get(key);
   stro.put(key, value);
   stro.remove(key);

   #### files 文件
   //覆盖写
   files.write("文件路径","内容");   
   //追加写
   files.append("文件路径",内容)


### ui
   ```text
   "ui";
   <text textSize="16sp" textColor="red" text="请输入您创建的文件名" />
   <input id="pathName" hint="请输入您创建的文件名" />
   
   ```

### 打包软件
   打包软件出去报毒，网上搜 说用mt改 autojs 关键字就行 但是也不大行，用 autox.js 也是不行 后面再找方法吧 
   用autopro

### 