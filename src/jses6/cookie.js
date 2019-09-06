'use strict';

(function () {
    // $(window).unload(function() {
    //     let flag = confirm('确定要退出当前页面么？');
    //     if (flag) {
    //         close();
    //     } else {
    //         location.reload();
    //     }
    // })
    // $(window).blur(function() {
    //     var blurTime = Date.now();
    // });
    // $(window).focus(function() {
    //     var focusTime = Date.now();
    //     if (focusTime - blurTime > 100 * 60 * 10) {
    //         alert(`欢迎回来，${cookie.get('username')}`)
    //     }
    // });
    var cookie = {
        get: function get(key) {
            if (document.cookie) {
                //判断是否有cookie数据
                var str = document.cookie;
                var arr = str.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i].split('=');
                    if (item[0] === key) {
                        return item[1];
                    }
                }
                return '';
            }
        },
        set: function set(key, val, day) {
            if (day) {
                var d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = key + '=' + val + ';expires=' + d + ';path=/';
            } else {
                document.cookie = key + '=' + val + ';path=/';
            }
        },
        remove: function remove(key) {
            this.set(key, "", -1);
        }
    };

    window.cookie = cookie;
})();

(function ($) {
    $(function () {
        //处理fixed top 的用户头像问题
        if (cookie.get('username')) {
            //有username cookie 则欢迎您
            $('.unloginNav').html('\n                <a href="//www.nubia.com/order/member">\u6B22\u8FCE\u60A8\uFF0C\n                    <span class="userName" style="font-weight: bold;">' + cookie.get('username') + '\n                    </span>\n                </a>\n            ');
            // append 推出li行
            $('#memberLoginTitle').find('.icon-rentou').removeClass("icon-rentou").addClass("icon-rentou1").css({
                color: 'red'
            });
            $('#memberLoginTitle').hover(function () {
                // over
                $(this).css({
                    backgroundColor: '#282828'
                });
            }, function () {
                // out
                $(this).css({
                    backgroundColor: '#282828'
                });
            });
            $('#memberUnLogin .c-holder .nav').append('\n            <li role="presentation" class="exit">\n                <a>\n                    <i class="glyphicon iconfont icon-rentou" style="font-size:15px;color:#888;">\n                    </i>\n                    \u9000\u51FA \n                </a>\n            </li>\n            ');
            // nav 人头变红
        } else {
            //用户没有登录，则删除退出li 并换成登录按钮
            // onclick="location.href = '../html/regest-login.html';"
            $('.unloginNav').html('\n            <button type="button"  class="button"   style="font-size: 14 px; color: rgb(255, 255, 255);">\u7ACB\u5373\u767B\u5F55</button> \n            <p > \u6CA1\u6709\u8D26\u53F7\uFF1F \n                <a href = "../html/regest-login.html" > \u7ACB\u5373\u6CE8\u518C </a>\n            </p >');
            $('.exit').remove();
            $('#memberLoginTitle').find('.icon-rentou1').removeClass("icon-rentou1").addClass("icon-rentou").css({
                color: '#fff'
            });
            $('#memberLoginTitle').hover(function () {
                // over
                $(this).css({
                    backgroundColor: 'rgb(243, 93, 73)'
                });
            }, function () {
                // out
                $(this).css({
                    backgroundColor: '#282828'
                });
            });
            //立即登录的跳转
            // way 1
            $('.button').click(function (e) {
                e.stopPropagation();
                location.href = '../html/regest-login.html';
            });
            // way 2
            // $('.unloginNav').on('click', '.button', function(e) {
            //     alert(1);
            //     e.stopPropagation();
            //     location.href = '../html/regest-login.html'
            // })
            // way 3
            // setTimeout(() => {
            //     alert(0)
            //     $('.unloginNav .button').click(function(e) {
            //         alert(1)
            //         e.stopPropagation();
            //         Location.href = '../html/regest-login.html'
            //     });
            // }, 1000);
        }

        // nav top .exit 的跳转
        $('.exit').click(function () {
            cookie.remove('username');
            location.reload();
        });
        // nav top 立即注册的跳转  .unloginNav
        // $('.unloginNav').click(function() {
        //     location.href = '../html/regest-login.html';

        // });


        // ajax获取数据
        var shop = cookie.get('shop');
        if (shop) {
            shop = JSON.parse(shop);
            var idList = shop.map(function (elm) {
                return elm.id;
            }).join();
            $.ajax({
                type: "get",
                url: "../lib/shop.php",
                data: {
                    "idList": idList
                },
                dataType: "json",
                success: function success(res) {
                    var navcart = '';
                    var allprice = 0;
                    var allnum = 0;
                    res.forEach(function (elm, i) {
                        var arr = shop.filter(function (val, i) {
                            //筛选cookie 中相匹配的数据对象
                            return val.id === elm.id;
                        });
                        var imgurl = elm.imgurl.slice(1, -1);
                        //nav fixtop cart
                        navcart += '\n                            <li role="presentation" class="shop-card">\n                                <div class="shop-img">\n                                    <img src="' + JSON.parse(imgurl)[0] + '" alt="" class="shop-img"></div>\n                                <div class="shop-detail">\n                                    <p class="shop-name">\n                                        <span>' + elm.title + '</span></p>\n                                    <p class="shop-price shop-newPrice">\xA5' + elm.price + '<span class="shop-oldPrice">\xA52699</span><i class="shop-count">\xD7' + arr[0].num + '</i></p>\n                                </div>\n                            </li>\n                            ';
                        allprice += arr[0].num * elm.price;
                        allnum += Number(arr[0].num);
                    });
                    $('.nav.shopCarMenu').append(navcart);
                    $('.shop-totle-num').html('￥' + allprice.toFixed(2));
                    $('.shopCarTipNav').html(allnum);
                }
            });
        }
    });
})(jQuery);