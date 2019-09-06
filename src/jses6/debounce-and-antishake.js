"use strict";

function save(callback, wait) {
    var previous = 0; //纪录上次执行的时间
    return function () {
        var now = Date.now(); //获得当前时间
        if (now - previous > wait) {
            //如果 当前的执行时间-上次执行时间>等待时间
            callback.apply(this, arguments); //执行回调函数的核心代码
            previous = now; // 为下一次的执行更新保存上一次的执行时间
        }
    };
}

function debounce(callback, wait) {
    var timer = void 0; //计时器

    return function () {
        var args = arguments;
        var _this = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(_this, args);
        }, wait);
    };
}