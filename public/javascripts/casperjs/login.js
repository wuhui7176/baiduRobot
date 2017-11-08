var casper = require('casper').create({
    logLevel: "debug"
});
casper.start('https://passport.baidu.com/v2/?login', function() {
    this.fill('div[class="login-form"]', {
        'userName': '15901237309',
        'password': '717615657'
    }, false);
});

casper.then(function() {
    this.click("#TANGRAM__PSP_3__submit")
    //this.click('input[class="pass-button pass-button-submit"]');
    this.echo('login...');
    this.wait(3000,function() {
        this.echo('Login Successfully.');
        this.capture('123.png');
        this.click("#TANGRAM__3__button_send_mobile")
    });
});
casper.run()