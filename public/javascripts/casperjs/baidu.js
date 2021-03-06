var tel = "17080310848"
var hurl = 'http://xlyqq.xilexuan.com/scriptmanager/cardPoolAction.do?method=getSms&phone=' + tel;
var casper = require('casper').create({
    verbose: true,
    logLevel: 'error',
    waitTimeout: 3000,
    pageSettings: {
        // 'loadImages':  false,
        'userAgent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
    },
    // 浏览器窗口大小
    viewportSize: {
        width: 1024,
        height: 568
    },
    exitOnError: false,
    silentErrors: true,
    onError: function (cas, msg) {
        console.log('onError: ' + msg);
    },
    onDie: function (cas, msg) {
        console.log('onDie: ' + msg);
    },
    onAlert: function (msg) {//alert的回调函数
        // console.log("onAlert===========================msg:" + msg);
    }
});
//登录百度
casper.start('https://www.baidu.com/', function() {
    this.echo(this.getTitle());
    this.wait(1000);
});

//打开登录窗口
casper.then(function() {
    this.click("#u1 a.lb");
    this.wait(1000);
    this.echo("1->打开登录窗口成功");
});

//切换短信登录
casper.then(function () {
    this.click("#TANGRAM__PSP_10__smsSwitch")
    this.wait(1000);
    this.echo("2->切换短信登录");
})
//填充登录用户
casper.then(function () {
    this.fill('form[id="TANGRAM__PSP_10__smsForm"]',{
        username:tel
    },false)
    //发送验证码
    //this.click('#TANGRAM__PSP_10__smsTimer');
    this.wait(2000);
    this.echo("填入手机号成功,验证码发送成功");
    this.capture('code.png');

})
var code;
//获取验证码
casper.then(function () {
    var task =0;
    while (code == undefined ){
        result = this.evaluate(function(hurl) {
            return JSON.parse(__utils__.sendAJAX(hurl, 'GET', null, false));
        }, {hurl: hurl});
        this.echo(result.r)
        if(result.r ==200){
            for(var i = 0; i < result.data.length; i ++) {
                var  item = result.data[i]
                var  message = item.message;
                if(message.indexOf("(动态验证码)")>=0){
                    code = message.slice(4,10)
                    break
                }
                // if(message.indexOf("欢迎注册百度帐号")>=0){
                //     code = message.slice(19,25)
                //     break
                // }
            }
        }
        task++;
    }
    this.echo("手机号 -> "+tel+" 验证码 -> "+code)
})
//填充验证码
casper.then(function () {
    this.fill('form[id="TANGRAM__PSP_10__smsForm"]',{
        password:code
    },false)
    // //登录
    this.wait(2000);
    this.capture('login.png');
    this.click('#TANGRAM__PSP_10__smsSubmit');
    this.wait(2000);
    this.echo("登录成功 -> 截图中")
})

casper.then(function () {
    var fs = require('fs')
    var cookies = JSON.stringify(phantom.cookies)
    fs.write(tel+".txt", cookies, 644)
    this.echo("保存cookie中")
})

casper.then(function () {
    this.capture('baidu.png');
})

casper.run();



