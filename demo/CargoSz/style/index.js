 var formquery = Vue.extend({
     template: '<form action="{{formlink}}" id="queryform" ><div class="weui_panel"><div class="weui_panel_hd  font_yhui font_sz15">{{pagetitle}}</div><div class="weui_media_box " ><h6 class="weui_media_title"><span class="dis_inline "><i class="iconfont ">&#xe619;</i></span><input class="weui_input font_sz13 font_yhui margin_l5" name="hscode"  placeholder="{{pageholder1}}"></h6></div><div class="weui_media_box " ><h6 class="weui_media_title"><span class="dis_inline"><i class="iconfont">&#xe708;</i></span><input class="weui_input font_sz13 font_yhui margin_l5"  type="text" placeholder="{{pageholder2}}" name="hsname"></h6></div></div><div class="query_button"><a href="javascript:;" class="weui_btn weui_btn_primary font_yhui" v-on:click="query">{{pagebutton}}</a></div></form>',
     data: function() {
         return {
             pagetitle: "税则速查",
             formlink: "query.html",
             pageholder1: "请输入商品编码",
             pageholder2: "请输入商品名称",
             pagebutton: "查询"
         }
     },
     methods: {
         query: function() {
             document.getElementById('queryform').submit();
         }
     }
 });
 Vue.component('query', formquery);
 var fromquery = new Vue({
     el: "#app"
 });