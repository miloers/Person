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
            if(typeof selector  =="object"){
                var selector = [selector];
                for(var i= 0;i<selector.length;i++){
                    this[i]= selector[i];
                }
                this.length = selector.length;
                return this;
            }else if(typeof selector =="function"){
                Mou.ready(selector);
                return;
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
      css:function(attr,val){
          for(var i=0;i<this.length;i++){
              if(typeof attr == 'string'){
                  if(arguments.length == 1){
                      return getComputedStyle(this[0],null)[attr];
                  }
                  this[i].style[attr] = val;
              }else{
                  var _this =this[i];
                  f.each(attr,function(attr,val){
                      _this.style.cssText +=''+attr+':'+val+';';
                  });
              }
          }
           return this;
      },
      hasClass:function(cls){
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)' );
        var arr =[];
        for(var i=0;i<this.length;i++){
            if(this[i].className.match(reg)){
                return true;
            }
        }
        return false;  
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
       },
       next:function () {
           return sibling(this[0],"nextSibling");
       },
       find:function(selector){
           if(!selector) return;
           var context = this.selector;
           return new Mou(context+''+selector);
       },
       first:function(){
           return new Mou(this[0]);
       },
       last:function(){
           var num = this.length-1;
           return new Mou(this[num]);
       },
       eq:function(num){
           var num = num < 0 ? (this.length -1):num;
           console,log(num);
           return this[num];
       },
       prev:function () {
           return sibling(this[0],"previousSibling");
       },
       parent:function(){
           var parent = this[0].parentNode;
           parent && parent.nodeType !== 11 ? parent :null;
           var a = Mou();
                   a[0]=parent;
                   a.selector = parent.tagName.toLocaleLowerCase();
                   a.length =1;
           return a;
       },
       parents:function(){
           var a = Mou(),
               i = 0;
           while ( (this[0] = this[0]['parentNode']) && this[0].nodeType !==9){
               if ( this[0].nodeType === 1){
                   a[i] = this[0];
                   i++;
               }
           }
           a.length = i ;
           return a;
       },
       attr:function(attr,val){
           for(var i=0;i<this.length;i++){
               if(typeof attr == "string"){
                   if( arguments.length == 1){
                       return this[i].getAttribute(attr);
                   }
                   this[i].setAttribute(attr,val);
               }else{
                   var _this = this[i];
                   f.each(attr,function(attr,val){
                       _this.setAttribute(attr,val);
                   });
               }
           }
           return this;
       },
       data: function(attr,val){
           for(var i=0;i<this.length;i++){
               if(typeof attr =="string"){
                   if(arguments.length == 1){
                       return this[i].getAttribute('data-'+attr);
                   }
                   this[i].setAttribute('data-'+attr,val);
               }else{
                   var _this =this[i];
                   f.each(attr,function (attr,val) {
                       _this.setAttribute('data-'+attr,val);
                   });
               }
           }
           return this;
       },
       html:function(value){
           if(value === undefined && this[0].nodeType === 1){
               return this[0].innerHTML;
           }else{
               for(var i=0;i<this.length;i++){
                   this[i].innerHTML = value;
               }
           }
           return this;
       },
       text:function(val){
           if(val === undefined && this[0].nodeType ===1){
               return this[0].innerHTML;
           }else{
               for(var i=0;i<this.length;i++){
                   this[i].innerHTML =val;
               }
           }
       },
       append:function(str){
           for(var i=0;i<this.length;i++){
               domAppend(this[i],'beforeend',str);
           }
           return this;
       },
       before:function(str){
           for(var i=0;i<this.length;i++){
               domAppend(this[i],'beforeBegin',str);
           }
           return this;
       },
       after:function(str){
           for(var i=0;i<this.length;i++){
               domAppend(this[i],'afterEnd',str);
           }
           return this;
       },
       remove:function(){
           for(var i=0;i<this.length;i++){
               this[i].parentNode.removeChild(this[i]);
           }
           return this;
       },
       on:function(type,selector,fn){
           if(typeof selector == 'function'){
               fn = selector;
               for(var i=0;i<this.length;i++){
                   if(!this[i].guid){
                       this[i].guid = ++Mou.guid;
                       Mou.Events[Mou.guid] = {};
                       Mou.Events[Mou.guid][type] = [fn];
                       bind(this[i],type,this[i].guid);
                   }else{
                       var id =this[i].guid;
                       if(Mou.Events[id][type]){
                           Mou.Events[id][type].push(fn);
                       }else{
                           Mou.Events[id][type] =[fn];
                           bind(this[i],type,id);
                       }
                   }
               }
           }
       },
       off:function(type,selector){
           if(arguments.length == 0){
               for(var i=0;i<this.length;i++){
                   var id = this[i].guid;
                   for(var j in Mou.Events[id]){
                       delete Mou.Events[id][j];
                   }
               }
           }else if(arguments.length ==1){
               for(var i=0;i<this.length;i++){
                   var id =this[i].guid;
                   delete Mou.Events[id][type];
               }
           }
       }
      
       
       
    };
  
    Mou.prototype.init.prototype = Mou.prototype;
    
    Mou.ajax = function () {
        console.log(this);
    };
    Mou.Events = [];
    Mou.guid=0;
    Mou.ready = function(fn){
        doc.addEventListener('DOMContentLoaded',function(){
            fn && fn();
        },false);
        doc.removeEventListener('DOMContentLoaded',fn,true);
    };
    
    Mou.each = function(obj,callback){
        var len = obj.length,
            constru =obj.constructor,
            i=0;
        if(constru===w.f){
            for(;i<len;i++){
                var val =callback.call(obj[i],i,obj[i]);
                if(val===false)
                break;
            }
        }else if(isArray(obj)){
            for(;i<len;i++){
                var val =callback.call(obj[i],i,obj[i]);
                if(val===false) break;
            }
        }else{
            for(i in obj){
                var val =callback.call(obj[i],i,obj[i]);
                if(val===false) break;
            }
        }
    };
    
    Mou.get = function(url,sucBack,complete){
        var options = {
            url:url,
            success : sucBack,
            complete:complete
        };
        ajax(options);
    };
    
    Mou.post = function(url,data,sucBack,complete){
        var options = {
            url: url,
            type:"POST",
            data:data,
            sucBack :sucBack,
            complete:complete
        };
        ajax(options);
    };
     
       function bind(dom,type,guid){
           dom.addEventListener(type,function(e){
               for(var i=0;i<Mou.Events[guid][type].length;i++){
                   Mou.Events[guid][type][i].call(dom,e);
               }
           },false);
       }

    function ajax(options){
        var defaultOptions ={
            url:false,
            type:"GET",
            data:false,
            success:false,
            complete:false
        };
        for(i in defaultOptions){
            if(options[i]===undefined){
                options[i] = defaultOptions[i];
            }
        }
        var xhr = new XMLHttpRequest();
        var url =options.url;
        xhr.open(options.type,url);
        xhr.onreadystatechange = onStateChange;
        if(options.type ==="POST"){
            xhr.setRequestHeader('Content-Type','applications/x-www-form-urlencoded');
        }
        xhr.send(options.data?options.data:null);
    }
    
    function onStateChange(){
        if(xhr.readyState == 4){
            var  result,
                 status = xhr.status;
            if((status>=200&&status<300)||status ==304){
                result =xhr.responseText;
                if(window.JSON){
                    result =JSON.parse(result);
                }else{
                    result = eval('('+result+')');
                }
                ajaxSuccess(result,xhr)
            }else{
                console.log("ERR",xhr.status);
            }
        }
    }
    function ajaxSuccess(data,xhr){
        var status ='success';
        options.success &&  options.success(data,options,status,xhr)
        ajaxComplete(status)
    }
    function ajaxComplete(status){
        options.complete && options.complete(status);
    }
    
    function sibling(cur,dir) {
        while ((cur=cur[dir]) && cur.nodeType !==1){};
        return cur;
    }
    
    function domAppend(elm,type,str){
        elm.insertAdjacentHTML(type,str);
    }
    
    function delegate(agent,type,selector,fn){
        agent.addEventListener(type,function(e){
             
             var target = e.target;
             var ctarget =e.currentTarget;
             var bubble = true;
             
             while(bubble && target != ctarget){
                 if(filiter(agent,selector,target)){
                     bubble = fn.call(target,e);
                     return bubble;
                 }
                 target =target.parentNode;
             }
        },false);
        function filiter(agent,selector,target){
            var nodes =agent.querySelectorAll(selector);
            for(var i=0; i<nodes.length;i++){
                if(nodes[i] == target){
                    return true;
                }
            }
        }
    }
    
    
    window.f = Mou;
})(window,document);
;