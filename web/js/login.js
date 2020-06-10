if (localStorage.userinfo === undefined) {
    $(".err").click(function () {})
    $(".popup").css('display', 'block')
    $(".zheceng").css('display', 'block')
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
                localStorage.userinfo = JSON.stringify(data.rows);
                var headimgurl = data.rows.headimgurl;
                var username = data.rows.username;
                $("#headerImg").attr('src', headimgurl);
                $(".right-text .username ul li").html(username)
                $('.dengluImg').css('display', 'block')
            }
            $('.right-text').mouseenter(function () { 
                $('.personage').css('display', 'block')
            })
            $('.right-text').mouseleave(function () {
                $('.personage').css('display', 'none')
            })
            $(".popup").css('display', 'none')
            $(".zheceng").css('display', 'none')
        }
    })
}
$('.quitCode').click(function () {
    window.localStorage.removeItem('userinfo')
})