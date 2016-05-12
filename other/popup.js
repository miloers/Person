!
function(o, i, t, s) {
	o.fn.popUP = function(s, e) {
		function n() {
			var i = "",
			t = '<div class="popup" id="' + u + '"><div class="popMask"></div><div class="popMain"><div class="popTitle"><span class="text">' + d.popTit + '</span><span class="close"></span></div><div class="popContent">';
			"msg" != d.status ? (i = "", t += '<div class="info_icon info_icon_' + d.status + '"></div>') : i = "msg",
			t += '<div class="layer_msg ' + i + '" style="text-align: ' + d.textAlign + '">' + d.popTxt + "</div></div></div></div>",
			o("body").append(t)
		}
		function c() {
			return Util.cookie(d.checkCookie) ? !1 : (n(), o(".popMask").show().height(r), o(".popMain").show(), void p())
		}
        
		function p() {
			var s = o(".popMain"),
			e = o(i).height(),
			n = s.height(),
			c = (e - n) / 2,
			p = -(d.width / 2 + 15),
			l = "fixed";
			Util.checkIEVersion() < 7 ? (c = (e - n) / 2 + o(t).scrollTop(), l = "absolute") : 0 >= e - n && (c = 10 + o(t).scrollTop(), l = "absolute"),
			s.css({
				width: d.width,
				top: c,
				"margin-left": p,
				position: l
			})
		}
        
        
		function l() {
			"function" == typeof e && e(),
			o("#" + u).remove()
		}
		var a = {
			width: 554,
			popTxt: "",
			popTit: "",
			status: "info",
			textAlign: "center",
			textIndent: "0",
			checkCookie: "",
			scrollClose: !1
		},
		d = o.extend({},
		a, s),
		r = Math.max(t.body.scrollHeight, t.documentElement.scrollHeight),
		u = (new Date).getTime();
		c(),
		d.scrollClose && o(i).one("scroll", l),
		o(".popup .close").click(function() {
			l()
		})  ,
		o(i).resize(p)
	}
} (jQuery, window, document);