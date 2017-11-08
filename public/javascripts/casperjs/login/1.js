//百度登录   = 》》》 跳转到百度贴吧
//
var tel = "17085100977"
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
    this.wait(3000);
    var fs = require('fs')
    var data = fs.read("17080310848.txt")
    this.echo(data)
    this.page.cookies=JSON.parse(data)
    fs.close()
});


casper.then(function(){
     this.click("#u1 a[name='tj_trtieba']");
     //this.click("#u1 a.mnav");
});

casper.then(function(){
    var cookies = this.page.cookies;
    this.echo("cookie.length = " + cookies.length);
    for (var i in cookies) {
        this.echo(cookies[i].name + "=" +  cookies[i].value);
    }
    this.wait(5000)

});

casper.then(function(){
    this.capture('b.png');
    // this.click("#u1 a.mnav");
});

casper.run()