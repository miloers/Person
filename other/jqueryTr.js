(function (window,document) {
    var w = window,
        doc= document;
    var Mou = function (selector) {
        return Mou.prototype.init(selector);
    }
    
    Mou.prototype ={
        constructor : Mou,
        length:0,
        splice:[].splice,
        selector:'',
        init:function (selector) {
            
        }
    }
    Mou.prototype.init.prototype = Mou.prototype;
    
    Mou.ajax = function () {
        console.log(this);
    }
    window.f = Mou;
})(window,document);
;