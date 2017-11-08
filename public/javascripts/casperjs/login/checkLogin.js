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
        // console.log("onAlert===========================msg:" + msg);
    }
});

casper.start();

var fs = require('fs')
var cookie = fs.read("17080310848.txt");




// var cookie = 'BAIDUID=D4C55B62B0AB01B56AE3CDE01263A7BF:FG=1; BIDUPSID=D4C55B62B0AB01B56AE3CDE01263A7BF; PSTM=1509505205; __cfduid=d8ca1a95c914e97ec780be439e8c150d71510059695; BDUSS=i1tLTQ2ZC1FSVVVYTBHVjhDWGtuVkhQdHhFaFl1SlRiVGQ3S2dQRmw0TW1laXBhSVFBQUFBJCQAAAAAAAAAAAEAAABlm1Vt4LhMQ0TIuraqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACbtAlom7QJaZ; H_PS_645EC=3f544sy8jb1RqU7b7hW5P09LbGWBUYONhXdnUTL3CSRSOJGetD56XDJxIrjnxZKxhTbj; BD_CK_SAM=1; PSINO=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BD_HOME=1; H_PS_PSSID=1448_24868_21125_20882_24879_20927; BD_UPN=12314353';
//
// cookie = 'BAIDUID=D4C55B62B0AB01B56AE3CDE01263A7BF:FG=1; BIDUPSID=D4C55B62B0AB01B56AE3CDE01263A7BF; PSTM=1509505205; TIEBA_USERTYPE=97d01c15082f78b67439ec97; bdshare_firstime=1509951322128; __cfduid=d8ca1a95c914e97ec780be439e8c150d71510059695; fixed_bar=1; TIEBAUID=7d174575f38f55ddae100dfe; BDUSS=i1tLTQ2ZC1FSVVVYTBHVjhDWGtuVkhQdHhFaFl1SlRiVGQ3S2dQRmw0TW1laXBhSVFBQUFBJCQAAAAAAAAAAAEAAABlm1Vt4LhMQ0TIuraqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACbtAlom7QJaZ; STOKEN=cabe1fe59e562bc084374dd09e7bcb36e85a0f77445892adff0e80008bc5df4f; FP_LASTTIME=1510141235816; PSINO=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=1448_24868_21125_20882_24879_20927';



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
//     function() {
//     this.wait(3000);
//     var fs = require('fs')
//     var data = fs.read("17080310848.txt")
//     this.echo(data)
//     this.page.cookies=JSON.parse(data)
// });


casper.then(function(){
    this.click("#u1 a[href='http://tieba.baidu.com']");
    // this.click("#u1 a.mnav[]");
    this.wait(300);
});

casper.then(function(){
    this.echo('cookie::::::::::' + cookie);
});

casper.then(function(){
    var cookies = this.page.cookies;
    // this.echo("cookie.length = " + cookies.length);
    for (var i in cookies) {
        this.echo(cookies[i].name + "=" +  cookies[i].value);
    }
    this.wait(1000)
    this.capture('check.png');
});

casper.run()