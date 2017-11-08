var tel = "17095234604"
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
});

casper.then(function () {
    result = this.evaluate(function(hurl) {
        return JSON.parse(__utils__.sendAJAX(hurl, 'GET', null, false));
    }, {hurl: hurl});
    this.echo(result.r)
    var code
    for(var i = 0; i < result.data.length; i ++) {
        var  item = result.data[i]
        var  message = item.message;
        if(message.indexOf("百度")>=0){
            code = message.slice(4,11)
        }
    }
})
//打开登录窗口
casper.then(function() {
    this.click("#u1 a.lb");
    this.wait(1000);
    // TANGRAM__PSP_3__smsPhone
    // TANGRAM__PSP_3__smsTimer
});
//切换短信登录
casper.then(function () {
    this.click("#TANGRAM__PSP_10__smsSwitch")
    this.wait(1000);
})

// casper.then(function () {
//     this.fill('form[id="TANGRAM__PSP_10__smsForm"]',{
//         username:'17095234740'
//     },false)
//     this.click('#TANGRAM__PSP_10__smsTimer');
//
//     this.wait(2000);
//
// })



// casper.then(function () {
//     this.capture('baidu2.png');
// })



// casper.then(function () {
//     this.fill('form[id="TANGRAM__PSP_10__form"]', {
//         userName: '15901237309',
//         password: '717615657',
//         verifyCode: '你好'
//     }, false);
//
//     this.click('#TANGRAM__PSP_10__submit');
//
//     this.wait(2000);
// })



casper.run();
// casper.then(function() {
//     //this.click("a[href^='https://passport.baidu.com/v2/?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2F']");
//     this.mosue.capture('1.png');
//     //this.click('div[class="u_menu_item312321"]')
//     this.mouse.click("a[name='tj_login']");
//     //
//     // debugHTML()
//     // this.waitForPopup('*.gif',function () {
//     // })
//     this.capture('123.png');
//     //this.click("a[name='tj_login']");
//     //this.mouse.click()("a[class='lb']")
//     //this.click("a#tj_login");
// });

// this.wait(200,function () {
//
//     //this.clickLabel('登录', 'a');
//     this.waitForUrl("/v.git$/",function () {
//         this.capture('123.png');
//
//     })
// })

// casper.then(function () {
//     this.wait(200,function () {
//         this.capture('123.png');
//         this.fill('form[id="TANGRAM__PSP_10__form"]', {
//             TANGRAM__PSP_10__userName: '15710376688',
//             TANGRAM__PSP_10__password: '12345678'
//         }, true);
//     })
// })

// casper.then(function() {
//     this.fill('form[action="/s"]', { wd: 'thoughtworks' }, true);//填入form，进行搜索
//     this.click("input[id='su']")
//     this.echo("已经点击查询按钮, 跳转等待.....");
//     this.wait(3000, function () {
//         this.echo(this.getTitle());
//         this.capture("3.png");
//         this.echo("查询成功");
//     });
// });

// casper.then(function() {
// });


