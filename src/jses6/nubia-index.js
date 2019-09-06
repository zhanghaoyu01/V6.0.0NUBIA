"use strict";

//get all product data
$(function () {
    $.ajax({
        type: "post",
        url: "../lib/getall.php",
        dataType: "json",
        success: function success(response) {
            var template = '';
            response.forEach(function (elm, i) {
                var imgurl = elm.imgurl.slice(1, -1);
                imgurl = JSON.parse(imgurl);
                template += "\n                        <li style=\"margin-bottom:13px\" class=\"goods-hover-shows col-lg-3\">\n                            <a href=\"descript.html?id=" + elm.id + "\" onclick=\"nubiabee('trackStructEvent','shop_index_hot','count',1,{})\">\n                                <div class=\"nbc-pro-cont\">\n                                    <div class=\"figure\"><img src=\"" + imgurl[0] + "\" data-x2=\"//oss.static.nubia.cn/blockimage/156194721773.png\" width=\"290\" height=\"248\">\n                                        <div class=\"figure-info\">\n                                            <h2>" + elm.title.split(' ')[0] + "</h2><span><span style=\"color:#FF4D4D\">\u9A81\u9F99855</span></span>\n                                        </div>\n                                    </div>\n                                    <div class=\"price\"><span> <sup>\uFFE5</sup> <label>" + elm.price + "</label> </span><span class=\"price_old\">3499</span></div>\n                                </div>\n                            </a>\n                            <div class=\"nbc-pro-btn\"><a class=\"btn-info\" href=\"descript.html?id=" + elm.id + "\">\u67E5\u770B\u8BE6\u60C5</a><a class=\"btn-sell\" href=\"descript.html?id=" + elm.id + "\">\u7ACB\u5373\u8D2D\u4E70</a></div>\n                        </li>\n                        ";
            });
            $('#hotBlock').append(template);
        }
    });
});