var local = window.location.href;
// getUrlCode().code
function getUrlCode() {
    var url = location.search;
    this.winUrl = url;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
    }
    return theRequest;
}
getUrlCode(local)
var code = getUrlCode(local).code;
var state = getUrlCode(local).state;
$.ajax({
    type: 'get',
    url: 'http://114.115.216.211/scan/scanBack',
    data: {
        code: code,
        state: state
    },
    success: function (data) {
        if (data.rows.headimgurl != null) {
            localStorage.setItem('userinfo', JSON.stringify(data.rows));
            var userinfo = JSON.parse(localStorage.getItem('userinfo'));
            var headimgurl = data.rows.headimgurl;
            var username = data.rows.username;
            $("#headerImg").attr('src', headimgurl);
            $(".right-text .username ul li").html(username)
            $('.dengluImg').css('display', 'block')
            window.location.href = window.location.href;
            $('.right-text').mouseenter(function () {
                $('.personage').css('display', 'none')
            })
            $('.right-text').mouseleave(function () {
                $('.personage').css('display', 'none')
            })
            $(".popup").css('display', 'none')
            $(".zheceng").css('display', 'none')
        }
    }
})
if (localStorage.userinfo != undefined) {
    let userinfo = JSON.parse(localStorage.userinfo);
    let headimgurl = userinfo.headimgurl;
    let username = userinfo.username
    $("#headerImg").attr('src', headimgurl);
    $(".right-text .username ul li").html(username)
    $('.dengluImg').css('display', 'block')

    // $('.personage').css('display', 'block')
    $('.right-text').mouseenter(function () {
        $('.personage').css('display', 'block')
    })
    $('.right-text').mouseleave(function () {
        $('.personage').css('display', 'none')
    })
    $(".popup").css('display', 'none')
    $(".zheceng").css('display', 'none')
}
if (localStorage.userinfo === undefined) {
    $('.right-text').mouseenter(function () {
        $('.personage').css('display', 'none')
    })
    $(".err").click(function () {
        $('.popup').show().delay(3).fadeOut()
        $(".zheceng").css('display', 'none')
    })
    $(".username").click(function () {
        $(".popup").css('display', 'block')
        $(".zheceng").css('display', 'block')
    })
    $('.dengluImg').css('display', 'none')
    $('.right-text').mouseenter(function () {
        $('.personage').css('display', 'none')
    })

}

$('.quitCode').click(function () {
    window.localStorage.removeItem('userinfo')
})

var id = function (o) {
    return document.getElementById(o)
}
//二维码
var scroll = function (o) {
    var space = id(o).offsetTop;
    id(o).style.top = space + 'px';
    void

    function () {
        var goTo = 0;
        var roll = setInterval(function () {
                var height = document.documentElement.scrollTop + document.body.scrollTop + space;
                var top = parseInt(id(o).style.top);
                if (height != top) {
                    goTo = height - parseInt((height - top) * 0.02);
                    id(o).style.top = goTo + 'px';
                }
            },
            10);
    }()
}
scroll('box1');

//扫码登录代码
$(document).ready(function () {
    var obj = new WxLogin({
        id: "login_container", //div的id
        appid: "wxab72ceaf1de3a381",
        scope: "snsapi_login", //写死
        redirect_uri: "http%3A%2F%2Fwww.crahim.cn%3A8080%2F",
        state: "",
        style: "black", //二维码黑白风格        
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7CiAgICB3aWR0aDogMjgwcHg7CiAgICBtYXJnaW4tdG9wOiAxNXB4OwogICAgYm9yZGVyOiAxcHggc29saWQgI0UyRTJFMjsKfQoKLmltcG93ZXJCb3ggLnRpdGxlIHsKICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIGZvbnQtc2l6ZTogMjBweDsKICAgIGNvbG9yOiAjZmZmOwp9CgouaW1wb3dlckJveCAuaW5mbyB7CiAgICB3aWR0aDogMjE5cHg7Cn0KCi5zdGF0dXNfaWNvbiB7CiAgICBkaXNwbGF5OiBub25lCn0KCi5pbXBvd2VyQm94IC5zdGF0dXMgewogICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgbWFyZ2luLXRvcDogMTFweDsKICAgIGJhY2tncm91bmQtY29sb3I6ICMyMzIzMjM7CiAgICBib3JkZXItcmFkaXVzOiAxMDBweDsKICAgIC1tb3otYm9yZGVyLXJhZGl1czogMTAwcHg7CiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDEwMHB4OwogICAgYm94LXNoYWRvdzogaW5zZXQgMCA1cHggMTBweCAtNXB4ICMxOTE5MTksIDAgMXB4IDAgMCAjNDQ0OwogICAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDVweCAxMHB4IC01cHggIzE5MTkxOSwgMCAxcHggMCAwICM0NDQ7CiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgNXB4IDEwcHggLTVweCAjMTkxOTE5LCAwIDFweCAwIDAgIzQ0NDsKICAgIHdpZHRoOiAxOTZweDsKICAgIGhlaWdodDogMzZweDsKICAgIGNvbG9yOiAjZmZmOwp9Cgpib2R5IHsKICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYig1MSwgNTEsIDUxKTsKICAgIHBhZGRpbmc6IDUwcHg7CiAgICBmb250LWZhbWlseTogIk1pY3Jvc29mdCBZYWhlaSI7CiAgICBjb2xvcjogI2ZmZjsgKi8KfQoKLm9sZC10ZW1wbGF0ZSB7CiAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50Owp9"
    });
});