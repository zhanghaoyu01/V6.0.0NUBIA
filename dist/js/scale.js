"use strict";
var _createClass = function() {
    function h(i, t) {
        for (var s = 0; s < t.length; s++) {
            var h = t[s];
            h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(i, h.key, h)
        }
    }
    return function(i, t, s) { return t && h(i.prototype, t), s && h(i, s), i }
}();

function _classCallCheck(i, t) { if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function") }! function() {
    function i() { _classCallCheck(this, i), this.wrap = $(".wrap"), this.spic = $("#spic"), this.sf = $("#sf"), this.bf = $("#bf"), this.bpic = $("#bpic"), this.ullist = $("#list ul"), this.list = $("#list li"), this.left = $("#left"), this.right = $("#right"), this.defaults = { lievent: "mousemove", visiblelinum: 4, uselessColor: "#ccc", useColor: "#333" }, this.init() }
    new(_createClass(i, [{
        key: "init",
        value: function() {
            var t = this;
            this.spic.hover(function() { $("#sf,#bf").css("visibility", "visible"), t.spic.on("mousemove", function(i) { t.spicmove(i) }) }, function() { $("#sf,#bf").css("visibility", "hidden") }), this.sf.css({ width: this.spic.width() * this.bf.width() / this.bpic.width(), height: this.spic.height() * this.bf.height() / this.bpic.height() }), this.bili = this.bpic.width() / this.spic.width(), this.list.on(this.defaults.lievent, function() { t.changepicurl($(this)) }), this.num = this.defaults.visiblelinum, this.liwidth = this.list.eq(0).outerWidth(!0), this.list.length <= this.defaults.visiblelinum && this.right.css("color", this.defaults.uselessColor), this.right.on("click", function() { t.rightclick() }), this.left.on("click", function() { t.leftclick() }).attr("data-flag", !1)
        }
    }, {
        key: "spicmove",
        value: function(i) {
            var t = i.pageX - this.wrap.offset().left - this.sf.width() / 2,
                s = i.pageY - this.wrap.offset().top - this.sf.height() / 2;
            t < 0 ? t = 0 : t >= this.spic.width() - this.sf.width() && (t = this.spic.width() - this.sf.width()), s < 0 ? s = 0 : s >= this.spic.height() - this.sf.height() && (s = this.spic.height() - this.sf.height()), this.sf.css({ left: t, top: s }), this.bpic.css({ left: -t * this.bili, top: -s * this.bili })
        }
    }, {
        key: "changepicurl",
        value: function(i) {
            var t = i.find("img").attr("src");
            this.spic.find("img").attr("src", t), this.bpic.attr("src", t), this.sf.css({ width: this.spic.width() * this.bf.width() / this.bpic.width(), height: this.spic.height() * this.bf.height() / this.bpic.height() }), this.bili = this.bpic.width() / this.spic.width()
        }
    }, { key: "rightclick", value: function() { this.ullist.stop(!0, !0), this.list.length > this.num && (this.num++, this.left.css({ color: this.defaults.useColor, borderColor: this.defaults.useColor, cursor: "pointer" }).attr("data-flag", !0), this.num === this.list.length && this.right.css({ color: this.defaults.uselessColor, borderColor: this.defaults.uselessColor, cursor: "not-allowed" }).attr("data-flag", !1), this.ullist.animate({ left: -this.liwidth * (this.num - this.defaults.visiblelinum) })) } }, { key: "leftclick", value: function() { this.ullist.stop(!0, !0), this.num > this.defaults.visiblelinum && (this.num--, this.right.css({ color: this.defaults.useColor, borderColor: this.defaults.useColor, cursor: "pointer" }).attr("data-flag", !0), this.num === this.defaults.visiblelinum && this.left.css({ color: this.defaults.uselessColor, borderColor: this.defaults.uselessColor, cursor: "not-allowed" }).attr("data-flag", !1), this.ullist.animate({ left: -this.liwidth * (this.num - this.defaults.visiblelinum) })) } }]), i)
}();