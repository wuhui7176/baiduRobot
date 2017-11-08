var tel = "17080310884"
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

var code;
//获取验证码
casper.then(function () {
    var task =0;
    while (code == undefined &&task <100 ){
        this.echo(hurl)
        result = this.evaluate(function(hurl) {
            return JSON.parse(__utils__.sendAJAX(hurl, 'GET', null, false));
        }, {hurl: hurl});
        this.echo(result.r)
        if(result.r ==200){
            for(var i = 0; i < result.data.length; i ++) {
                var  item = result.data[i]
                var  message = item.message;
                if(message.indexOf("欢迎注册百度帐号")>=0){
                    code = message.slice(19,25)
                    break
                }
            }
        }
        task++;
    }
    this.echo("手机号 -> "+tel+" 验证码 -> "+code)
})


casper.run();



