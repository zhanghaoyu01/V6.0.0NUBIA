'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function () {
    var magnifying = function () {
        function magnifying() {
            _classCallCheck(this, magnifying);

            this.wrap = $('.wrap');
            this.spic = $('#spic'); //小图
            this.sf = $('#sf'); //小放
            this.bf = $('#bf'); //大放
            this.bpic = $('#bpic'); //大图
            this.ullist = $('#list ul');
            this.list = $('#list li'); //10个li
            this.left = $('#left');
            this.right = $('#right');
            this.defaults = {
                lievent: 'mousemove', // 给下面的列表li添加点击事件
                visiblelinum: 4, //可视的图片长度
                uselessColor: '#ccc', // 无需显示左右按钮
                useColor: '#333' //显示按钮的颜色
            };
            this.init();
        }

        _createClass(magnifying, [{
            key: 'init',
            value: function init() {
                var _this = this;
                //1.鼠标移入小图，显示小放和大放。移出同理
                this.spic.hover(function () {
                    $('#sf,#bf').css('visibility', 'visible');

                    //3.鼠标移动，小放跟随
                    _this.spic.on('mousemove', function (ev) {
                        _this.spicmove(ev);
                    });
                }, function () {
                    $('#sf,#bf').css('visibility', 'hidden');
                });

                //2.求小放的尺寸。
                this.sf.css({
                    width: this.spic.width() * this.bf.width() / this.bpic.width(),
                    height: this.spic.height() * this.bf.height() / this.bpic.height()
                });
                //4.求比例
                this.bili = this.bpic.width() / this.spic.width();

                //5.给下面的列表li添加点击事件
                this.list.on(this.defaults.lievent, function () {
                    _this.changepicurl($(this));
                });

                //6.给right按钮添加事件
                this.num = this.defaults.visiblelinum; //可视的图片长度
                //返回值:eq(index|-index)获取第N个元素
                this.liwidth = this.list.eq(0).outerWidth(true); //1个li的宽度

                //长度小于6，无需显示左右按钮
                if (this.list.length <= this.defaults.visiblelinum) {
                    this.right.css('color', this.defaults.uselessColor);
                }

                this.right.on('click', function () {
                    _this.rightclick();
                });

                //7.给left按钮添加事件
                this.left.on('click', function () {
                    _this.leftclick();
                }).attr('data-flag', false);
            }

            // 两个图片的移动

        }, {
            key: 'spicmove',
            value: function spicmove(ev) {
                var l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
                var t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
                if (l < 0) {
                    l = 0;
                } else if (l >= this.spic.width() - this.sf.width()) {
                    l = this.spic.width() - this.sf.width();
                }
                if (t < 0) {
                    t = 0;
                } else if (t >= this.spic.height() - this.sf.height()) {
                    t = this.spic.height() - this.sf.height();
                }

                this.sf.css({
                    left: l,
                    top: t
                });

                this.bpic.css({
                    left: -l * this.bili,
                    top: -t * this.bili
                });
            }
        }, {
            key: 'changepicurl',
            value: function changepicurl(obj) {
                var $imgurl = obj.find('img').attr('src');
                this.spic.find('img').attr('src', $imgurl);
                this.bpic.attr('src', $imgurl);
                //切换后重新设置小放的尺寸和比例
                this.sf.css({
                    width: this.spic.width() * this.bf.width() / this.bpic.width(),
                    height: this.spic.height() * this.bf.height() / this.bpic.height()
                });
                this.bili = this.bpic.width() / this.spic.width();
            }
        }, {
            key: 'rightclick',
            value: function rightclick() {
                this.ullist.stop(true, true);
                if (this.list.length > this.num) {
                    this.num++;
                    this.left.css({
                        color: this.defaults.useColor,
                        borderColor: this.defaults.useColor,
                        cursor: 'pointer'
                    }).attr('data-flag', true);
                    if (this.num === this.list.length) {
                        this.right.css({
                            color: this.defaults.uselessColor,
                            borderColor: this.defaults.uselessColor,
                            cursor: 'not-allowed'
                        }).attr('data-flag', false);
                    }
                    this.ullist.animate({
                        left: -this.liwidth * (this.num - this.defaults.visiblelinum)
                    });
                }
            }
        }, {
            key: 'leftclick',
            value: function leftclick() {
                this.ullist.stop(true, true);
                if (this.num > this.defaults.visiblelinum) {
                    this.num--;
                    this.right.css({
                        color: this.defaults.useColor,
                        borderColor: this.defaults.useColor,
                        cursor: 'pointer'
                    }).attr('data-flag', true);
                    if (this.num === this.defaults.visiblelinum) {
                        this.left.css({
                            color: this.defaults.uselessColor,
                            borderColor: this.defaults.uselessColor,
                            cursor: 'not-allowed'
                        }).attr('data-flag', false);
                    }
                    this.ullist.animate({
                        left: -this.liwidth * (this.num - this.defaults.visiblelinum)
                    });
                }
            }
        }]);

        return magnifying;
    }();

    new magnifying();
}();