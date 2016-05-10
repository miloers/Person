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
            if(!selector){
                return this;
            }  
            var selector = selector.trim(),
                elm;
            if(selector.charAt(0)=='#'&& !selector.match('\\s')){
                selector = selector.substring(1);
                this.selector = selector;
                elm = document.getElementById(selector);
                this[0]=el;
                this.length = 1;
                return this;
            }else{
                elm = document.querySelectorAll(selector);
                for(var i=0; i<elm.length;i++){
                     this[i] = elm[i];
                }
                this.selector = selector;
                this.length = elm.length;
                return this;
            }
        },
        css:function (attr,val) {
            console.log(this.length);
            for(var i=0;i<this.length;i++){
                if(arguments.length==1){
                    return getComputedStyle(this[i],null)[attr];
                }
                this[i].style[attr] =val;
            }
            return this;
        },
      hasClass:function(cls){
          var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
          for(var i = 0 ;i< this.length ;i++){
              if(this[i].className.match(reg))
                return true;
                return false;
          }
          return this;
      },
      
      addClass :function(cls){
          var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
          for(var i = 0 ;i<this.length;i++){
              if(!this[i].className.match(reg))
                  this[i].className+= ''+cls;
              }
              return this;
          },
       removeClass :function(cls){
           var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
           for(var i=0 ;i<this.length;i++){
               if(this[i].className.match(reg))
                this[i].className = this[i].className.replace(cls,'');
           }
           return this;
       }
    };
  
    Mou.prototype.init.prototype = Mou.prototype;
    
    Mou.ajax = function () {
        console.log(this);
    }
    window.f = Mou;
})(window,document);
;