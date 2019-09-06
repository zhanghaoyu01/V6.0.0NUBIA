'use strict';

$(function () {

    // 离开页面时，重新存储cookie的num值
    $(window).unload(function () {
        var shoplist = cookie.get('shop');
        shoplist = JSON.parse(shoplist);

        $('tbody tr').each(function (index, elm) {
            var id = $(elm).attr('class').split('-')[1].toString();

            var num = $(elm).find('.num.cart-cnt').val();
            shoplist.forEach(function (elm, i) {
                elm.id == id ? elm.num = num : null;
            });
        });
        alert('确定要离开么？');
    });

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
                console.log(res);
                var template = '';
                // var navcart = '';
                res.forEach(function (elm, i) {
                    var arr = shop.filter(function (val, i) {
                        //筛选cookie 中相匹配的数据对象
                        return val.id === elm.id;
                    });
                    var imgurl = elm.imgurl.slice(1, -1);
                    imgurl = JSON.parse(imgurl);

                    //main carrt.html cart
                    template = '\n                            <tr class="p-' + elm.id + '">\n                                <td><img src="' + imgurl[0] + '" style="width:100px;"></td>\n                                <td class="productname">\n                                    <a target="_blank" productid="1104" href="/product/s/1104" class="pdt-title">' + elm.title + '</a>\n                                </td>\n                                <td>\xA5' + elm.price + '</td>\n                                <td>\n                                    <div class="btn-cnts"><span class="table-cut">-</span> <input type="text" maxlength="2" readonly="readonly" class="num cart-cnt" value="' + arr[0].num + '"> <span class="table-add">+</span></div>\n                                </td>\n                                <td class="sum" style="line-height: 1.8;">\uFFE5' + (arr[0].num * elm.price).toFixed(2) + '</td>\n                                <td><a title="\u5220\u9664" class="cart-close close">\xD7</a></td>\n                            </tr>\n                            ';
                    $('.cart-con tbody').append(template);
                    calc();
                });
                // 加减数量的委托
                $('.btn-cnts').on('click', '.table-cut', function () {
                    var num = $(this).siblings('.num').val() || 1;
                    if (num == 1) {
                        num = 1;
                    } else {
                        num--;
                    }
                    $(this).siblings('.num').val(num);
                    calc();
                    $('tbody .sum').html();

                    var paren = $(this).parent().parent().parent();
                    var tips = paren.find('.num.cart-cnt').val() * paren.find('td').eq(2).text().slice(1);
                    paren.find('.sum').html('\xA5' + tips);
                });
                $('.btn-cnts').on('click', '.table-add', function () {
                    var num = $(this).siblings('.num').val() || 1;
                    num++;
                    $(this).siblings('.num').val(num);
                    calc();

                    var paren = $(this).parent().parent().parent();

                    var tips = paren.find('.num.cart-cnt').val() * paren.find('td').eq(2).text().slice(1);
                    console.log("'么么哒 ': paren.find('td').eq(3).text()", paren.find('td').eq(2).text());
                    console.log("'么么哒 ': paren.find('td').eq(3).text().slice(1)", paren.find('td').eq(2).text().slice(1));
                    paren.find('.sum').html('\xA5' + tips);
                });

                // 选中的委托
                $('tbody').on('dblclick', 'tr', function () {
                    if ($(this).data('flag')) {
                        $(this).css({
                            backgroundColor: '#fff'
                        }).data('flag', false);
                    } else {
                        $(this).css({
                            backgroundColor: '#EBF3E6'
                        }).data('flag', true);
                    }
                });

                var flagnum = 0;
                // 全选按钮
                $('#selectall').on('click', function () {
                    if ($(this).prop('checked')) {
                        flagnum = $('tbody tr').length;
                        $('tbody tr').css({
                            backgroundColor: '#EBF3E6'
                        }).data('flag', true);
                    } else {
                        flagnum = 0;
                        $('tbody tr').css({
                            backgroundColor: '#fff'
                        }).data('flag', false);
                    }
                    calc();
                });
                $('tbody').on('dblclick', 'tr', function () {
                    if ($(this).data('flag')) {
                        flagnum++;
                    } else {
                        flagnum--;
                    }
                    if ($('tbody tr').length == flagnum) {
                        $('#selectall').prop('checked', true);
                    } else {
                        $('#selectall').prop('checked', false);
                    }
                    calc();
                });

                // 删除操作
                $('tbody').on('click', '.cart-close.close', function () {
                    //清除cookie
                    alert('是否要删除该商品？');
                    var id = $(this).parent().parent().attr('class').split('-')[1].toString();
                    id = Number(id);
                    var shoplist = JSON.parse(cookie.get('shop'));
                    // shoplist.forEach(function(elm, i) {
                    //     if (elm.id == id) {
                    //         shoplist.splice(i, 1);
                    //         alert(1)
                    //     } else {
                    //         alert(0000)
                    //     }
                    // });
                    shoplist = shoplist.filter(function (elm) {
                        return elm.id != id;
                    });

                    cookie.set('shop', JSON.stringify(shoplist));

                    //删除li标签
                    $(this).parent().parent().remove();
                    location.reload();
                });

                //总价和总的数量
                function calc() {
                    var allprice = 0; //总价
                    var allnum = 0; //总的数量。
                    $('tbody tr').each(function (index, element) {
                        //遍历复选框是否选中
                        if ($(element).data('flag')) {
                            allprice += parseInt($(element).find('td').eq(4).html().slice(1));
                            allnum += parseInt($(element).find('.btn-cnts .num').val());
                        }
                    });
                    $('.sum p').html('￥' + allprice.toFixed(2));
                    $('.cart-h1 span').html(allnum);
                }
                calc();

                // $('.btn-cnts').click(function() {

                // })

            }
        });
    }
});