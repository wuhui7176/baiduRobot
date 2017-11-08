// 百度 登录 - >>> 跳转到贴吧

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
        width: 1200,
        height: 900
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
    }
});
casper.start();
var fs = require('fs')
var data = fs.read("17080310848.txt");
var cookieJson = JSON.parse(data)
var cookie ="" ;
for (var i in cookieJson) {
    cookie  = cookie + cookieJson[i].name +"="+ cookieJson[i].value+";"
}

var url = 'https://www.baidu.com/';
//var url = 'https://tieba.baidu.com/index.html';
//登录百度
casper.thenOpen(url,{
    method: 'get',
    headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Cookie': cookie,
    }
})

// casper.then(function() {
//     this.fill('form[action="/s"]', { wd: 'thoughtworks' }, true);//填入form，进行搜索
// });

casper.then(function(){
    // this.click(".s-isindex-wrap.s-sp-menu a[href='http://news.baidu.com']")
    // this.click("#s_menu_mine .mine-text")
    this.click("#u1 a[href='http://tieba.baidu.com']");
    this.wait(1000);
});

casper.then(function(){
    this.echo('cookie::::::::::' + cookie);
});

casper.then(function(){
    var cookies = this.page.cookies;
    for (var i in cookies) {
        this.echo(cookies[i].name + "=" +  cookies[i].value);
    }
    this.wait(1000)
    this.capture('check.png');
});

casper.run()