/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 * 切换图片浏览器时，更改body的overflow
 * 退出图片浏览器时硬删除，图片浏览器
 *  .qy_overflow{
      overflow: inherit !important;
    }
    .qy_ovhidden{
      overflow: hidden !important;
    }
 * 	d.close = function() {
			$("body").removeClass("qy_ovhidden").addClass("qy_overflow"),
			d.opened = !1,
			d.swiperContainer && 0 !== d.swiperContainer.length && (d.params.onClose && d.params.onClose(d), d.attachEvents(!0), "standalone" === d.params.type && d.container.removeClass("photo-browser-in").addClass("photo-browser-out").remove(".photo-browser").transitionEnd(function() {
				d.container.remove();
			}), d.swiper.destroy(), d.swiper = d.swiperContainer = d.swiperWrapper = d.slides = t = u = v = void 0)
		},
 * =====================================================
 */
+
function(a) {
	"use strict";
	var b = function(c, d) {
		function e() {
			return "horizontal" === o.params.direction
		}
		function f() {
			o.autoplayTimeoutId = setTimeout(function() {
				o.params.loop ? (o.fixLoop(), o._slideNext()) : o.isEnd ? d.autoplayStopOnLast ? o.stopAutoplay() : o._slideTo(0) : o._slideNext()
			},
			o.params.autoplay)
		}
		function g(b, c) {
			var d = a(b.target);
			if (!d.is(c)) if ("string" == typeof c) d = d.parents(c);
			else if (c.nodeType) {
				var e;
				return d.parents().each(function(a, b) {
					b === c && (e = c)
				}),
				e ? c: void 0
			}
			if (0 !== d.length) return d[0]
		}
		function h(a, b) {
			b = b || {};
			var c = window.MutationObserver || window.WebkitMutationObserver,
			d = new c(function(a) {
				a.forEach(function(a) {
					o.onResize(),
					o.emit("onObserverUpdate", o, a)
				})
			});
			d.observe(a, {
				attributes: "undefined" == typeof b.attributes ? !0 : b.attributes,
				childList: "undefined" == typeof b.childList ? !0 : b.childList,
				characterData: "undefined" == typeof b.characterData ? !0 : b.characterData
			}),
			o.observers.push(d)
		}
		function i(b, c) {
			b = a(b);
			var d, f, g;
			d = b.attr("data-swiper-parallax") || "0",
			f = b.attr("data-swiper-parallax-x"),
			g = b.attr("data-swiper-parallax-y"),
			f || g ? (f = f || "0", g = g || "0") : e() ? (f = d, g = "0") : (g = d, f = "0"),
			f = f.indexOf("%") >= 0 ? parseInt(f, 10) * c + "%": f * c + "px",
			g = g.indexOf("%") >= 0 ? parseInt(g, 10) * c + "%": g * c + "px",
			b.transform("translate3d(" + f + ", " + g + ",0px)")
		}
		function j(a) {
			return 0 !== a.indexOf("on") && (a = a[0] !== a[0].toUpperCase() ? "on" + a[0].toUpperCase() + a.substring(1) : "on" + a),
			a
		}
		var k = this.defaults,
		l = d && d.virtualTranslate;
		d = d || {};
		for (var m in k) if ("undefined" == typeof d[m]) d[m] = k[m];
		else if ("object" == typeof d[m]) for (var n in k[m])"undefined" == typeof d[m][n] && (d[m][n] = k[m][n]);
		var o = this;
		if (o.params = d, o.classNames = [], o.$ = a, o.container = a(c), 0 !== o.container.length) {
			if (o.container.length > 1) return void o.container.each(function() {
				new a.Swiper(this, d)
			});
			o.container[0].swiper = o,
			o.container.data("swiper", o),
			o.classNames.push("swiper-container-" + o.params.direction),
			o.params.freeMode && o.classNames.push("swiper-container-free-mode"),
			o.support.flexbox || (o.classNames.push("swiper-container-no-flexbox"), o.params.slidesPerColumn = 1),
			(o.params.parallax || o.params.watchSlidesVisibility) && (o.params.watchSlidesProgress = !0),
			["cube", "coverflow"].indexOf(o.params.effect) >= 0 && (o.support.transforms3d ? (o.params.watchSlidesProgress = !0, o.classNames.push("swiper-container-3d")) : o.params.effect = "slide"),
			"slide" !== o.params.effect && o.classNames.push("swiper-container-" + o.params.effect),
			"cube" === o.params.effect && (o.params.resistanceRatio = 0, o.params.slidesPerView = 1, o.params.slidesPerColumn = 1, o.params.slidesPerGroup = 1, o.params.centeredSlides = !1, o.params.spaceBetween = 0, o.params.virtualTranslate = !0, o.params.setWrapperSize = !1),
			"fade" === o.params.effect && (o.params.slidesPerView = 1, o.params.slidesPerColumn = 1, o.params.slidesPerGroup = 1, o.params.watchSlidesProgress = !0, o.params.spaceBetween = 0, "undefined" == typeof l && (o.params.virtualTranslate = !0)),
			o.params.grabCursor && o.support.touch && (o.params.grabCursor = !1),
			o.wrapper = o.container.children("." + o.params.wrapperClass),
			o.params.pagination && (o.paginationContainer = a(o.params.pagination), o.params.paginationClickable && o.paginationContainer.addClass("swiper-pagination-clickable")),
			o.rtl = e() && ("rtl" === o.container[0].dir.toLowerCase() || "rtl" === o.container.css("direction")),
			o.rtl && o.classNames.push("swiper-container-rtl"),
			o.rtl && (o.wrongRTL = "-webkit-box" === o.wrapper.css("display")),
			o.params.slidesPerColumn > 1 && o.classNames.push("swiper-container-multirow"),
			o.device.android && o.classNames.push("swiper-container-android"),
			o.container.addClass(o.classNames.join(" ")),
			o.translate = 0,
			o.progress = 0,
			o.velocity = 0,
			o.lockSwipeToNext = function() {
				o.params.allowSwipeToNext = !1
			},
			o.lockSwipeToPrev = function() {
				o.params.allowSwipeToPrev = !1
			},
			o.lockSwipes = function() {
				o.params.allowSwipeToNext = o.params.allowSwipeToPrev = !1
			},
			o.unlockSwipeToNext = function() {
				o.params.allowSwipeToNext = !0
			},
			o.unlockSwipeToPrev = function() {
				o.params.allowSwipeToPrev = !0
			},
			o.unlockSwipes = function() {
				o.params.allowSwipeToNext = o.params.allowSwipeToPrev = !0
			},
			o.params.grabCursor && (o.container[0].style.cursor = "move", o.container[0].style.cursor = "-webkit-grab", o.container[0].style.cursor = "-moz-grab", o.container[0].style.cursor = "grab"),
			o.imagesToLoad = [],
			o.imagesLoaded = 0,
			o.loadImage = function(a, b, c, d) {
				function e() {
					d && d()
				}
				var f;
				a.complete && c ? e() : b ? (f = new Image, f.onload = e, f.onerror = e, f.src = b) : e()
			},
			o.preloadImages = function() {
				function a() {
					"undefined" != typeof o && null !== o && (void 0 !== o.imagesLoaded && o.imagesLoaded++, o.imagesLoaded === o.imagesToLoad.length && (o.params.updateOnImagesReady && o.update(), o.emit("onImagesReady", o)))
				}
				o.imagesToLoad = o.container.find("img");
				for (var b = 0; b < o.imagesToLoad.length; b++) o.loadImage(o.imagesToLoad[b], o.imagesToLoad[b].currentSrc || o.imagesToLoad[b].getAttribute("src"), !0, a)
			},
			o.autoplayTimeoutId = void 0,
			o.autoplaying = !1,
			o.autoplayPaused = !1,
			o.startAutoplay = function() {
				return "undefined" != typeof o.autoplayTimeoutId ? !1 : o.params.autoplay ? o.autoplaying ? !1 : (o.autoplaying = !0, o.emit("onAutoplayStart", o), void f()) : !1
			},
			o.stopAutoplay = function() {
				o.autoplayTimeoutId && (o.autoplayTimeoutId && clearTimeout(o.autoplayTimeoutId), o.autoplaying = !1, o.autoplayTimeoutId = void 0, o.emit("onAutoplayStop", o))
			},
			o.pauseAutoplay = function(a) {
				o.autoplayPaused || (o.autoplayTimeoutId && clearTimeout(o.autoplayTimeoutId), o.autoplayPaused = !0, 0 === a ? (o.autoplayPaused = !1, f()) : o.wrapper.transitionEnd(function() {
					o.autoplayPaused = !1,
					o.autoplaying ? f() : o.stopAutoplay()
				}))
			},
			o.minTranslate = function() {
				return - o.snapGrid[0]
			},
			o.maxTranslate = function() {
				return - o.snapGrid[o.snapGrid.length - 1]
			},
			o.updateContainerSize = function() {
				o.width = o.container[0].clientWidth,
				o.height = o.container[0].clientHeight,
				o.size = e() ? o.width: o.height
			},
			o.updateSlidesSize = function() {
				o.slides = o.wrapper.children("." + o.params.slideClass),
				o.snapGrid = [],
				o.slidesGrid = [],
				o.slidesSizesGrid = [];
				var a, b = o.params.spaceBetween,
				c = 0,
				d = 0,
				f = 0;
				"string" == typeof b && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * o.size),
				o.virtualSize = -b,
				o.rtl ? o.slides.css({
					marginLeft: "",
					marginTop: ""
				}) : o.slides.css({
					marginRight: "",
					marginBottom: ""
				});
				var g;
				o.params.slidesPerColumn > 1 && (g = Math.floor(o.slides.length / o.params.slidesPerColumn) === o.slides.length / o.params.slidesPerColumn ? o.slides.length: Math.ceil(o.slides.length / o.params.slidesPerColumn) * o.params.slidesPerColumn);
				var h;
				for (a = 0; a < o.slides.length; a++) {
					h = 0;
					var i = o.slides.eq(a);
					if (o.params.slidesPerColumn > 1) {
						var j, k, l, m, n = o.params.slidesPerColumn;
						"column" === o.params.slidesPerColumnFill ? (k = Math.floor(a / n), l = a - k * n, j = k + l * g / n, i.css({
							"-webkit-box-ordinal-group": j,
							"-moz-box-ordinal-group": j,
							"-ms-flex-order": j,
							"-webkit-order": j,
							order: j
						})) : (m = g / n, l = Math.floor(a / m), k = a - l * m),
						i.css({
							"margin-top": 0 !== l && o.params.spaceBetween && o.params.spaceBetween + "px"
						}).attr("data-swiper-column", k).attr("data-swiper-row", l)
					}
					"none" !== i.css("display") && ("auto" === o.params.slidesPerView ? h = e() ? i.outerWidth(!0) : i.outerHeight(!0) : (h = (o.size - (o.params.slidesPerView - 1) * b) / o.params.slidesPerView, e() ? o.slides[a].style.width = h + "px": o.slides[a].style.height = h + "px"), o.slides[a].swiperSlideSize = h, o.slidesSizesGrid.push(h), o.params.centeredSlides ? (c = c + h / 2 + d / 2 + b, 0 === a && (c = c - o.size / 2 - b), Math.abs(c) < .001 && (c = 0), f % o.params.slidesPerGroup === 0 && o.snapGrid.push(c), o.slidesGrid.push(c)) : (f % o.params.slidesPerGroup === 0 && o.snapGrid.push(c), o.slidesGrid.push(c), c = c + h + b), o.virtualSize += h + b, d = h, f++)
				}
				o.virtualSize = Math.max(o.virtualSize, o.size);
				var p;
				if (o.rtl && o.wrongRTL && ("slide" === o.params.effect || "coverflow" === o.params.effect) && o.wrapper.css({
					width: o.virtualSize + o.params.spaceBetween + "px"
				}), (!o.support.flexbox || o.params.setWrapperSize) && (e() ? o.wrapper.css({
					width: o.virtualSize + o.params.spaceBetween + "px"
				}) : o.wrapper.css({
					height: o.virtualSize + o.params.spaceBetween + "px"
				})), o.params.slidesPerColumn > 1 && (o.virtualSize = (h + o.params.spaceBetween) * g, o.virtualSize = Math.ceil(o.virtualSize / o.params.slidesPerColumn) - o.params.spaceBetween, o.wrapper.css({
					width: o.virtualSize + o.params.spaceBetween + "px"
				}), o.params.centeredSlides)) {
					for (p = [], a = 0; a < o.snapGrid.length; a++) o.snapGrid[a] < o.virtualSize + o.snapGrid[0] && p.push(o.snapGrid[a]);
					o.snapGrid = p
				}
				if (!o.params.centeredSlides) {
					for (p = [], a = 0; a < o.snapGrid.length; a++) o.snapGrid[a] <= o.virtualSize - o.size && p.push(o.snapGrid[a]);
					o.snapGrid = p,
					Math.floor(o.virtualSize - o.size) > Math.floor(o.snapGrid[o.snapGrid.length - 1]) && o.snapGrid.push(o.virtualSize - o.size)
				}
				0 === o.snapGrid.length && (o.snapGrid = [0]),
				0 !== o.params.spaceBetween && (e() ? o.rtl ? o.slides.css({
					marginLeft: b + "px"
				}) : o.slides.css({
					marginRight: b + "px"
				}) : o.slides.css({
					marginBottom: b + "px"
				})),
				o.params.watchSlidesProgress && o.updateSlidesOffset()
			},
			o.updateSlidesOffset = function() {
				for (var a = 0; a < o.slides.length; a++) o.slides[a].swiperSlideOffset = e() ? o.slides[a].offsetLeft: o.slides[a].offsetTop
			},
			o.updateSlidesProgress = function(a) {
				if ("undefined" == typeof a && (a = o.translate || 0), 0 !== o.slides.length) {
					"undefined" == typeof o.slides[0].swiperSlideOffset && o.updateSlidesOffset();
					var b = o.params.centeredSlides ? -a + o.size / 2 : -a;
					o.rtl && (b = o.params.centeredSlides ? a - o.size / 2 : a),
					o.slides.removeClass(o.params.slideVisibleClass);
					for (var c = 0; c < o.slides.length; c++) {
						var d = o.slides[c],
						e = o.params.centeredSlides === !0 ? d.swiperSlideSize / 2 : 0,
						f = (b - d.swiperSlideOffset - e) / (d.swiperSlideSize + o.params.spaceBetween);
						if (o.params.watchSlidesVisibility) {
							var g = -(b - d.swiperSlideOffset - e),
							h = g + o.slidesSizesGrid[c],
							i = g >= 0 && g < o.size || h > 0 && h <= o.size || 0 >= g && h >= o.size;
							i && o.slides.eq(c).addClass(o.params.slideVisibleClass)
						}
						d.progress = o.rtl ? -f: f
					}
				}
			},
			o.updateProgress = function(a) {
				"undefined" == typeof a && (a = o.translate || 0);
				var b = o.maxTranslate() - o.minTranslate();
				0 === b ? (o.progress = 0, o.isBeginning = o.isEnd = !0) : (o.progress = (a - o.minTranslate()) / b, o.isBeginning = o.progress <= 0, o.isEnd = o.progress >= 1),
				o.isBeginning && o.emit("onReachBeginning", o),
				o.isEnd && o.emit("onReachEnd", o),
				o.params.watchSlidesProgress && o.updateSlidesProgress(a),
				o.emit("onProgress", o, o.progress)
			},
			o.updateActiveIndex = function() {
				var a, b, c, d = o.rtl ? o.translate: -o.translate;
				for (b = 0; b < o.slidesGrid.length; b++)"undefined" != typeof o.slidesGrid[b + 1] ? d >= o.slidesGrid[b] && d < o.slidesGrid[b + 1] - (o.slidesGrid[b + 1] - o.slidesGrid[b]) / 2 ? a = b: d >= o.slidesGrid[b] && d < o.slidesGrid[b + 1] && (a = b + 1) : d >= o.slidesGrid[b] && (a = b); (0 > a || "undefined" == typeof a) && (a = 0),
				c = Math.floor(a / o.params.slidesPerGroup),
				c >= o.snapGrid.length && (c = o.snapGrid.length - 1),
				a !== o.activeIndex && (o.snapIndex = c, o.previousIndex = o.activeIndex, o.activeIndex = a, o.updateClasses())
			},
			o.updateClasses = function() {
				o.slides.removeClass(o.params.slideActiveClass + " " + o.params.slideNextClass + " " + o.params.slidePrevClass);
				var b = o.slides.eq(o.activeIndex);
				if (b.addClass(o.params.slideActiveClass), b.next("." + o.params.slideClass).addClass(o.params.slideNextClass), b.prev("." + o.params.slideClass).addClass(o.params.slidePrevClass), o.bullets && o.bullets.length > 0) {
					o.bullets.removeClass(o.params.bulletActiveClass);
					var c;
					o.params.loop ? (c = Math.ceil(o.activeIndex - o.loopedSlides) / o.params.slidesPerGroup, c > o.slides.length - 1 - 2 * o.loopedSlides && (c -= o.slides.length - 2 * o.loopedSlides), c > o.bullets.length - 1 && (c -= o.bullets.length)) : c = "undefined" != typeof o.snapIndex ? o.snapIndex: o.activeIndex || 0,
					o.paginationContainer.length > 1 ? o.bullets.each(function() {
						a(this).index() === c && a(this).addClass(o.params.bulletActiveClass)
					}) : o.bullets.eq(c).addClass(o.params.bulletActiveClass)
				}
				o.params.loop || (o.params.prevButton && (o.isBeginning ? (a(o.params.prevButton).addClass(o.params.buttonDisabledClass), o.params.a11y && o.a11y && o.a11y.disable(a(o.params.prevButton))) : (a(o.params.prevButton).removeClass(o.params.buttonDisabledClass), o.params.a11y && o.a11y && o.a11y.enable(a(o.params.prevButton)))), o.params.nextButton && (o.isEnd ? (a(o.params.nextButton).addClass(o.params.buttonDisabledClass), o.params.a11y && o.a11y && o.a11y.disable(a(o.params.nextButton))) : (a(o.params.nextButton).removeClass(o.params.buttonDisabledClass), o.params.a11y && o.a11y && o.a11y.enable(a(o.params.nextButton)))))
			},
			o.updatePagination = function() {
				if (o.params.pagination && o.paginationContainer && o.paginationContainer.length > 0) {
					for (var a = "",
					b = o.params.loop ? Math.ceil((o.slides.length - 2 * o.loopedSlides) / o.params.slidesPerGroup) : o.snapGrid.length, c = 0; b > c; c++) a += o.params.paginationBulletRender ? o.params.paginationBulletRender(c, o.params.bulletClass) : '<span class="' + o.params.bulletClass + '"></span>';
					o.paginationContainer.html(a),
					o.bullets = o.paginationContainer.find("." + o.params.bulletClass)
				}
			},
			o.update = function(a) {
				function b() {
					d = Math.min(Math.max(o.translate, o.maxTranslate()), o.minTranslate()),
					o.setWrapperTranslate(d),
					o.updateActiveIndex(),
					o.updateClasses()
				}
				if (o.updateContainerSize(), o.updateSlidesSize(), o.updateProgress(), o.updatePagination(), o.updateClasses(), o.params.scrollbar && o.scrollbar && o.scrollbar.set(), a) {
					var c, d;
					o.params.freeMode ? b() : (c = "auto" === o.params.slidesPerView && o.isEnd && !o.params.centeredSlides ? o.slideTo(o.slides.length - 1, 0, !1, !0) : o.slideTo(o.activeIndex, 0, !1, !0), c || b())
				}
			},
			o.onResize = function() {
				if (o.updateContainerSize(), o.updateSlidesSize(), o.updateProgress(), ("auto" === o.params.slidesPerView || o.params.freeMode) && o.updatePagination(), o.params.scrollbar && o.scrollbar && o.scrollbar.set(), o.params.freeMode) {
					var a = Math.min(Math.max(o.translate, o.maxTranslate()), o.minTranslate());
					o.setWrapperTranslate(a),
					o.updateActiveIndex(),
					o.updateClasses()
				} else o.updateClasses(),
				"auto" === o.params.slidesPerView && o.isEnd && !o.params.centeredSlides ? o.slideTo(o.slides.length - 1, 0, !1, !0) : o.slideTo(o.activeIndex, 0, !1, !0)
			};
			var p = ["mousedown", "mousemove", "mouseup"];
			window.navigator.pointerEnabled ? p = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
			o.touchEvents = {
				start: o.support.touch || !o.params.simulateTouch ? "touchstart": p[0],
				move: o.support.touch || !o.params.simulateTouch ? "touchmove": p[1],
				end: o.support.touch || !o.params.simulateTouch ? "touchend": p[2]
			},
			(window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === o.params.touchEventsTarget ? o.container: o.wrapper).addClass("swiper-wp8-" + o.params.direction),
			o.initEvents = function(b) {
				var c = b ? "off": "on",
				e = b ? "removeEventListener": "addEventListener",
				f = "container" === o.params.touchEventsTarget ? o.container[0] : o.wrapper[0],
				g = o.support.touch ? f: document,
				h = o.params.nested ? !0 : !1;
				o.browser.ie ? (f[e](o.touchEvents.start, o.onTouchStart, !1), g[e](o.touchEvents.move, o.onTouchMove, h), g[e](o.touchEvents.end, o.onTouchEnd, !1)) : (o.support.touch && (f[e](o.touchEvents.start, o.onTouchStart, !1), f[e](o.touchEvents.move, o.onTouchMove, h), f[e](o.touchEvents.end, o.onTouchEnd, !1)), !d.simulateTouch || o.device.ios || o.device.android || (f[e]("mousedown", o.onTouchStart, !1), g[e]("mousemove", o.onTouchMove, h), g[e]("mouseup", o.onTouchEnd, !1))),
				window[e]("resize", o.onResize),
				o.params.nextButton && (a(o.params.nextButton)[c]("click", o.onClickNext), o.params.a11y && o.a11y && a(o.params.nextButton)[c]("keydown", o.a11y.onEnterKey)),
				o.params.prevButton && (a(o.params.prevButton)[c]("click", o.onClickPrev), o.params.a11y && o.a11y && a(o.params.prevButton)[c]("keydown", o.a11y.onEnterKey)),
				o.params.pagination && o.params.paginationClickable && a(o.paginationContainer)[c]("click", "." + o.params.bulletClass, o.onClickIndex),
				(o.params.preventClicks || o.params.preventClicksPropagation) && f[e]("click", o.preventClicks, !0)
			},
			o.attachEvents = function() {
				o.initEvents()
			},
			o.detachEvents = function() {
				o.initEvents(!0)
			},
			o.allowClick = !0,
			o.preventClicks = function(a) {
				o.allowClick || (o.params.preventClicks && a.preventDefault(), o.params.preventClicksPropagation && (a.stopPropagation(), a.stopImmediatePropagation()))
			},
			o.onClickNext = function(a) {
				a.preventDefault(),
				o.slideNext()
			},
			o.onClickPrev = function(a) {
				a.preventDefault(),
				o.slidePrev()
			},
			o.onClickIndex = function(b) {
				b.preventDefault();
				var c = a(this).index() * o.params.slidesPerGroup;
				o.params.loop && (c += o.loopedSlides),
				o.slideTo(c)
			},
			o.updateClickedSlide = function(b) {
				var c = g(b, "." + o.params.slideClass);
				if (!c) return o.clickedSlide = void 0,
				void(o.clickedIndex = void 0);
				if (o.clickedSlide = c, o.clickedIndex = a(c).index(), o.params.slideToClickedSlide && void 0 !== o.clickedIndex && o.clickedIndex !== o.activeIndex) {
					var d, e = o.clickedIndex;
					if (o.params.loop) if (d = a(o.clickedSlide).attr("data-swiper-slide-index"), e > o.slides.length - o.params.slidesPerView) o.fixLoop(),
					e = o.wrapper.children("." + o.params.slideClass + '[data-swiper-slide-index="' + d + '"]').eq(0).index(),
					setTimeout(function() {
						o.slideTo(e)
					},
					0);
					else if (e < o.params.slidesPerView - 1) {
						o.fixLoop();
						var f = o.wrapper.children("." + o.params.slideClass + '[data-swiper-slide-index="' + d + '"]');
						e = f.eq(f.length - 1).index(),
						setTimeout(function() {
							o.slideTo(e)
						},
						0)
					} else o.slideTo(e);
					else o.slideTo(e)
				}
			};
			var q, r, s, t, u, v, w, x, y, z = "input, select, textarea, button",
			A = Date.now(),
			B = [];
			o.animating = !1,
			o.touches = {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			};
			var C, D;
			o.onTouchStart = function(b) {
				if (b.originalEvent && (b = b.originalEvent), C = "touchstart" === b.type, C || !("which" in b) || 3 !== b.which) {
					if (o.params.noSwiping && g(b, "." + o.params.noSwipingClass)) return void(o.allowClick = !0);
					if (!o.params.swipeHandler || g(b, o.params.swipeHandler)) {
						if (q = !0, r = !1, t = void 0, D = void 0, o.touches.startX = o.touches.currentX = "touchstart" === b.type ? b.targetTouches[0].pageX: b.pageX, o.touches.startY = o.touches.currentY = "touchstart" === b.type ? b.targetTouches[0].pageY: b.pageY, s = Date.now(), o.allowClick = !0, o.updateContainerSize(), o.swipeDirection = void 0, o.params.threshold > 0 && (w = !1), "touchstart" !== b.type) {
							var c = !0;
							a(b.target).is(z) && (c = !1),
							document.activeElement && a(document.activeElement).is(z) && document.activeElement.blur(),
							c && b.preventDefault()
						}
						o.emit("onTouchStart", o, b)
					}
				}
			},
			o.onTouchMove = function(b) {
				if (b.originalEvent && (b = b.originalEvent), !(C && "mousemove" === b.type || b.preventedByNestedSwiper)) {
					if (o.params.onlyExternal) return r = !0,
					void(o.allowClick = !1);
					if (C && document.activeElement && b.target === document.activeElement && a(b.target).is(z)) return r = !0,
					void(o.allowClick = !1);
					if (o.emit("onTouchMove", o, b), !(b.targetTouches && b.targetTouches.length > 1)) {
						if (o.touches.currentX = "touchmove" === b.type ? b.targetTouches[0].pageX: b.pageX, o.touches.currentY = "touchmove" === b.type ? b.targetTouches[0].pageY: b.pageY, "undefined" == typeof t) {
							var c = 180 * Math.atan2(Math.abs(o.touches.currentY - o.touches.startY), Math.abs(o.touches.currentX - o.touches.startX)) / Math.PI;
							t = e() ? c > o.params.touchAngle: 90 - c > o.params.touchAngle
						}
						if (t && o.emit("onTouchMoveOpposite", o, b), "undefined" == typeof D && o.browser.ieTouch && (o.touches.currentX !== o.touches.startX || o.touches.currentY !== o.touches.startY) && (D = !0), q) {
							if (t) return void(q = !1);
							if (D || !o.browser.ieTouch) {
								o.allowClick = !1,
								o.emit("onSliderMove", o, b),
								b.preventDefault(),
								o.params.touchMoveStopPropagation && !o.params.nested && b.stopPropagation(),
								r || (d.loop && o.fixLoop(), v = o.getWrapperTranslate(), o.setWrapperTransition(0), o.animating && o.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), o.params.autoplay && o.autoplaying && (o.params.autoplayDisableOnInteraction ? o.stopAutoplay() : o.pauseAutoplay()), y = !1, o.params.grabCursor && (o.container[0].style.cursor = "move", o.container[0].style.cursor = "-webkit-grabbing", o.container[0].style.cursor = "-moz-grabbin", o.container[0].style.cursor = "grabbing")),
								r = !0;
								var f = o.touches.diff = e() ? o.touches.currentX - o.touches.startX: o.touches.currentY - o.touches.startY;
								f *= o.params.touchRatio,
								o.rtl && (f = -f),
								o.swipeDirection = f > 0 ? "prev": "next",
								u = f + v;
								var g = !0;
								if (f > 0 && u > o.minTranslate() ? (g = !1, o.params.resistance && (u = o.minTranslate() - 1 + Math.pow( - o.minTranslate() + v + f, o.params.resistanceRatio))) : 0 > f && u < o.maxTranslate() && (g = !1, o.params.resistance && (u = o.maxTranslate() + 1 - Math.pow(o.maxTranslate() - v - f, o.params.resistanceRatio))), g && (b.preventedByNestedSwiper = !0), !o.params.allowSwipeToNext && "next" === o.swipeDirection && v > u && (u = v), !o.params.allowSwipeToPrev && "prev" === o.swipeDirection && u > v && (u = v), o.params.followFinger) {
									if (o.params.threshold > 0) {
										if (! (Math.abs(f) > o.params.threshold || w)) return void(u = v);
										if (!w) return w = !0,
										o.touches.startX = o.touches.currentX,
										o.touches.startY = o.touches.currentY,
										u = v,
										void(o.touches.diff = e() ? o.touches.currentX - o.touches.startX: o.touches.currentY - o.touches.startY)
									} (o.params.freeMode || o.params.watchSlidesProgress) && o.updateActiveIndex(),
									o.params.freeMode && (0 === B.length && B.push({
										position: o.touches[e() ? "startX": "startY"],
										time: s
									}), B.push({
										position: o.touches[e() ? "currentX": "currentY"],
										time: (new Date).getTime()
									})),
									o.updateProgress(u),
									o.setWrapperTranslate(u)
								}
							}
						}
					}
				}
			},
			o.onTouchEnd = function(b) {
				if (b.originalEvent && (b = b.originalEvent), o.emit("onTouchEnd", o, b), q) {
					o.params.grabCursor && r && q && (o.container[0].style.cursor = "move", o.container[0].style.cursor = "-webkit-grab", o.container[0].style.cursor = "-moz-grab", o.container[0].style.cursor = "grab");
					var c = Date.now(),
					d = c - s;
					if (o.allowClick && (o.updateClickedSlide(b), o.emit("onTap", o, b), 300 > d && c - A > 300 && (x && clearTimeout(x), x = setTimeout(function() {
						o && (o.params.paginationHide && o.paginationContainer.length > 0 && !a(b.target).hasClass(o.params.bulletClass) && o.paginationContainer.toggleClass(o.params.paginationHiddenClass), o.emit("onClick", o, b))
					},
					300)), 300 > d && 300 > c - A && (x && clearTimeout(x), o.emit("onDoubleTap", o, b))), A = Date.now(), setTimeout(function() {
						o && o.allowClick && (o.allowClick = !0)
					},
					0), !q || !r || !o.swipeDirection || 0 === o.touches.diff || u === v) return void(q = r = !1);
					q = r = !1;
					var e;
					if (e = o.params.followFinger ? o.rtl ? o.translate: -o.translate: -u, o.params.freeMode) {
						if (e < -o.minTranslate()) return void o.slideTo(o.activeIndex);
						if (e > -o.maxTranslate()) return void o.slideTo(o.slides.length - 1);
						if (o.params.freeModeMomentum) {
							if (B.length > 1) {
								var f = B.pop(),
								g = B.pop(),
								h = f.position - g.position,
								i = f.time - g.time;
								o.velocity = h / i,
								o.velocity = o.velocity / 2,
								Math.abs(o.velocity) < .02 && (o.velocity = 0),
								(i > 150 || (new Date).getTime() - f.time > 300) && (o.velocity = 0)
							} else o.velocity = 0;
							B.length = 0;
							var j = 1e3 * o.params.freeModeMomentumRatio,
							k = o.velocity * j,
							l = o.translate + k;
							o.rtl && (l = -l);
							var m, n = !1,
							p = 20 * Math.abs(o.velocity) * o.params.freeModeMomentumBounceRatio;
							l < o.maxTranslate() && (o.params.freeModeMomentumBounce ? (l + o.maxTranslate() < -p && (l = o.maxTranslate() - p), m = o.maxTranslate(), n = !0, y = !0) : l = o.maxTranslate()),
							l > o.minTranslate() && (o.params.freeModeMomentumBounce ? (l - o.minTranslate() > p && (l = o.minTranslate() + p), m = o.minTranslate(), n = !0, y = !0) : l = o.minTranslate()),
							0 !== o.velocity && (j = o.rtl ? Math.abs(( - l - o.translate) / o.velocity) : Math.abs((l - o.translate) / o.velocity)),
							o.params.freeModeMomentumBounce && n ? (o.updateProgress(m), o.setWrapperTransition(j), o.setWrapperTranslate(l), o.onTransitionStart(), o.animating = !0, o.wrapper.transitionEnd(function() {
								y && (o.emit("onMomentumBounce", o), o.setWrapperTransition(o.params.speed), o.setWrapperTranslate(m), o.wrapper.transitionEnd(function() {
									o.onTransitionEnd()
								}))
							})) : o.velocity ? (o.updateProgress(l), o.setWrapperTransition(j), o.setWrapperTranslate(l), o.onTransitionStart(), o.animating || (o.animating = !0, o.wrapper.transitionEnd(function() {
								o.onTransitionEnd()
							}))) : o.updateProgress(l),
							o.updateActiveIndex()
						}
						return void((!o.params.freeModeMomentum || d >= o.params.longSwipesMs) && (o.updateProgress(), o.updateActiveIndex()))
					}
					var t, w = 0,
					z = o.slidesSizesGrid[0];
					for (t = 0; t < o.slidesGrid.length; t += o.params.slidesPerGroup)"undefined" != typeof o.slidesGrid[t + o.params.slidesPerGroup] ? e >= o.slidesGrid[t] && e < o.slidesGrid[t + o.params.slidesPerGroup] && (w = t, z = o.slidesGrid[t + o.params.slidesPerGroup] - o.slidesGrid[t]) : e >= o.slidesGrid[t] && (w = t, z = o.slidesGrid[o.slidesGrid.length - 1] - o.slidesGrid[o.slidesGrid.length - 2]);
					var C = (e - o.slidesGrid[w]) / z;
					if (d > o.params.longSwipesMs) {
						if (!o.params.longSwipes) return void o.slideTo(o.activeIndex);
						"next" === o.swipeDirection && (C >= o.params.longSwipesRatio ? o.slideTo(w + o.params.slidesPerGroup) : o.slideTo(w)),
						"prev" === o.swipeDirection && (C > 1 - o.params.longSwipesRatio ? o.slideTo(w + o.params.slidesPerGroup) : o.slideTo(w))
					} else {
						if (!o.params.shortSwipes) return void o.slideTo(o.activeIndex);
						"next" === o.swipeDirection && o.slideTo(w + o.params.slidesPerGroup),
						"prev" === o.swipeDirection && o.slideTo(w)
					}
				}
			},
			o._slideTo = function(a, b) {
				return o.slideTo(a, b, !0, !0)
			},
			o.slideTo = function(a, b, c, d) {
				"undefined" == typeof c && (c = !0),
				"undefined" == typeof a && (a = 0),
				0 > a && (a = 0),
				o.snapIndex = Math.floor(a / o.params.slidesPerGroup),
				o.snapIndex >= o.snapGrid.length && (o.snapIndex = o.snapGrid.length - 1);
				var e = -o.snapGrid[o.snapIndex];
				o.params.autoplay && o.autoplaying && (d || !o.params.autoplayDisableOnInteraction ? o.pauseAutoplay(b) : o.stopAutoplay()),
				o.updateProgress(e);
				for (var f = 0; f < o.slidesGrid.length; f++) - e >= o.slidesGrid[f] && (a = f);
				return "undefined" == typeof b && (b = o.params.speed),
				o.previousIndex = o.activeIndex || 0,
				o.activeIndex = a,
				e === o.translate ? (o.updateClasses(), !1) : (o.onTransitionStart(c), 0 === b ? (o.setWrapperTransition(0), o.setWrapperTranslate(e), o.onTransitionEnd(c)) : (o.setWrapperTransition(b), o.setWrapperTranslate(e), o.animating || (o.animating = !0, o.wrapper.transitionEnd(function() {
					o.onTransitionEnd(c)
				}))), o.updateClasses(), !0)
			},
			o.onTransitionStart = function(a) {
				"undefined" == typeof a && (a = !0),
				o.lazy && o.lazy.onTransitionStart(),
				a && (o.emit("onTransitionStart", o), o.activeIndex !== o.previousIndex && o.emit("onSlideChangeStart", o))
			},
			o.onTransitionEnd = function(a) {
				o.animating = !1,
				o.setWrapperTransition(0),
				"undefined" == typeof a && (a = !0),
				o.lazy && o.lazy.onTransitionEnd(),
				a && (o.emit("onTransitionEnd", o), o.activeIndex !== o.previousIndex && o.emit("onSlideChangeEnd", o)),
				o.params.hashnav && o.hashnav && o.hashnav.setHash()
			},
			o.slideNext = function(a, b, c) {
				return o.params.loop ? o.animating ? !1 : (o.fixLoop(), o.slideTo(o.activeIndex + o.params.slidesPerGroup, b, a, c)) : o.slideTo(o.activeIndex + o.params.slidesPerGroup, b, a, c)
			},
			o._slideNext = function(a) {
				return o.slideNext(!0, a, !0)
			},
			o.slidePrev = function(a, b, c) {
				return o.params.loop ? o.animating ? !1 : (o.fixLoop(), o.slideTo(o.activeIndex - 1, b, a, c)) : o.slideTo(o.activeIndex - 1, b, a, c)
			},
			o._slidePrev = function(a) {
				return o.slidePrev(!0, a, !0)
			},
			o.slideReset = function(a, b) {
				return o.slideTo(o.activeIndex, b, a)
			},
			o.setWrapperTransition = function(a, b) {
				o.wrapper.transition(a),
				"slide" !== o.params.effect && o.effects[o.params.effect] && o.effects[o.params.effect].setTransition(a),
				o.params.parallax && o.parallax && o.parallax.setTransition(a),
				o.params.scrollbar && o.scrollbar && o.scrollbar.setTransition(a),
				o.params.control && o.controller && o.controller.setTransition(a, b),
				o.emit("onSetTransition", o, a)
			},
			o.setWrapperTranslate = function(a, b, c) {
				var d = 0,
				f = 0,
				g = 0;
				e() ? d = o.rtl ? -a: a: f = a,
				o.params.virtualTranslate || (o.support.transforms3d ? o.wrapper.transform("translate3d(" + d + "px, " + f + "px, " + g + "px)") : o.wrapper.transform("translate(" + d + "px, " + f + "px)")),
				o.translate = e() ? d: f,
				b && o.updateActiveIndex(),
				"slide" !== o.params.effect && o.effects[o.params.effect] && o.effects[o.params.effect].setTranslate(o.translate),
				o.params.parallax && o.parallax && o.parallax.setTranslate(o.translate),
				o.params.scrollbar && o.scrollbar && o.scrollbar.setTranslate(o.translate),
				o.params.control && o.controller && o.controller.setTranslate(o.translate, c),
				o.emit("onSetTranslate", o, o.translate)
			},
			o.getTranslate = function(a, b) {
				var c, d, e, f;
				return "undefined" == typeof b && (b = "x"),
				o.params.virtualTranslate ? o.rtl ? -o.translate: o.translate: (e = window.getComputedStyle(a, null), window.WebKitCSSMatrix ? f = new WebKitCSSMatrix("none" === e.webkitTransform ? "": e.webkitTransform) : (f = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), c = f.toString().split(",")), "x" === b && (d = window.WebKitCSSMatrix ? f.m41: 16 === c.length ? parseFloat(c[12]) : parseFloat(c[4])), "y" === b && (d = window.WebKitCSSMatrix ? f.m42: 16 === c.length ? parseFloat(c[13]) : parseFloat(c[5])), o.rtl && d && (d = -d), d || 0)
			},
			o.getWrapperTranslate = function(a) {
				return "undefined" == typeof a && (a = e() ? "x": "y"),
				o.getTranslate(o.wrapper[0], a)
			},
			o.observers = [],
			o.initObservers = function() {
				if (o.params.observeParents) for (var a = o.container.parents(), b = 0; b < a.length; b++) h(a[b]);
				h(o.container[0], {
					childList: !1
				}),
				h(o.wrapper[0], {
					attributes: !1
				})
			},
			o.disconnectObservers = function() {
				for (var a = 0; a < o.observers.length; a++) o.observers[a].disconnect();
				o.observers = []
			},
			o.createLoop = function() {
				o.wrapper.children("." + o.params.slideClass + "." + o.params.slideDuplicateClass).remove();
				var b = o.wrapper.children("." + o.params.slideClass);
				o.loopedSlides = parseInt(o.params.loopedSlides || o.params.slidesPerView, 10),
				o.loopedSlides = o.loopedSlides + o.params.loopAdditionalSlides,
				o.loopedSlides > b.length && (o.loopedSlides = b.length);
				var c, d = [],
				e = [];
				for (b.each(function(c, f) {
					var g = a(this);
					c < o.loopedSlides && e.push(f),
					c < b.length && c >= b.length - o.loopedSlides && d.push(f),
					g.attr("data-swiper-slide-index", c)
				}), c = 0; c < e.length; c++) o.wrapper.append(a(e[c].cloneNode(!0)).addClass(o.params.slideDuplicateClass));
				for (c = d.length - 1; c >= 0; c--) o.wrapper.prepend(a(d[c].cloneNode(!0)).addClass(o.params.slideDuplicateClass))
			},
			o.destroyLoop = function() {
				o.wrapper.children("." + o.params.slideClass + "." + o.params.slideDuplicateClass).remove(),
				o.slides.removeAttr("data-swiper-slide-index")
			},
			o.fixLoop = function() {
				var a;
				o.activeIndex < o.loopedSlides ? (a = o.slides.length - 3 * o.loopedSlides + o.activeIndex, a += o.loopedSlides, o.slideTo(a, 0, !1, !0)) : ("auto" === o.params.slidesPerView && o.activeIndex >= 2 * o.loopedSlides || o.activeIndex > o.slides.length - 2 * o.params.slidesPerView) && (a = -o.slides.length + o.activeIndex + o.loopedSlides, a += o.loopedSlides, o.slideTo(a, 0, !1, !0))
			},
			o.appendSlide = function(a) {
				if (o.params.loop && o.destroyLoop(), "object" == typeof a && a.length) for (var b = 0; b < a.length; b++) a[b] && o.wrapper.append(a[b]);
				else o.wrapper.append(a);
				o.params.loop && o.createLoop(),
				o.params.observer && o.support.observer || o.update(!0)
			},
			o.prependSlide = function(a) {
				o.params.loop && o.destroyLoop();
				var b = o.activeIndex + 1;
				if ("object" == typeof a && a.length) {
					for (var c = 0; c < a.length; c++) a[c] && o.wrapper.prepend(a[c]);
					b = o.activeIndex + a.length
				} else o.wrapper.prepend(a);
				o.params.loop && o.createLoop(),
				o.params.observer && o.support.observer || o.update(!0),
				o.slideTo(b, 0, !1)
			},
			o.removeSlide = function(a) {
				o.params.loop && o.destroyLoop();
				var b, c = o.activeIndex;
				if ("object" == typeof a && a.length) {
					for (var d = 0; d < a.length; d++) b = a[d],
					o.slides[b] && o.slides.eq(b).remove(),
					c > b && c--;
					c = Math.max(c, 0)
				} else b = a,
				o.slides[b] && o.slides.eq(b).remove(),
				c > b && c--,
				c = Math.max(c, 0);
				o.params.observer && o.support.observer || o.update(!0),
				o.slideTo(c, 0, !1)
			},
			o.removeAllSlides = function() {
				for (var a = [], b = 0; b < o.slides.length; b++) a.push(b);
				o.removeSlide(a)
			},
			o.effects = {
				fade: {
					fadeIndex: null,
					setTranslate: function() {
						for (var a = 0; a < o.slides.length; a++) {
							var b = o.slides.eq(a),
							c = b[0].swiperSlideOffset,
							d = -c;
							o.params.virtualTranslate || (d -= o.translate);
							var f = 0;
							e() || (f = d, d = 0);
							var g = o.params.fade.crossFade ? Math.max(1 - Math.abs(b[0].progress), 0) : 1 + Math.min(Math.max(b[0].progress, -1), 0);
							g > 0 && 1 > g && (o.effects.fade.fadeIndex = a),
							b.css({
								opacity: g
							}).transform("translate3d(" + d + "px, " + f + "px, 0px)")
						}
					},
					setTransition: function(a) {
						if (o.slides.transition(a), o.params.virtualTranslate && 0 !== a) {
							var b = null !== o.effects.fade.fadeIndex ? o.effects.fade.fadeIndex: o.activeIndex;
							o.slides.eq(b).transitionEnd(function() {
								for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], b = 0; b < a.length; b++) o.wrapper.trigger(a[b])
							})
						}
					}
				},
				cube: {
					setTranslate: function() {
						var b, c = 0;
						o.params.cube.shadow && (e() ? (b = o.wrapper.find(".swiper-cube-shadow"), 0 === b.length && (b = a('<div class="swiper-cube-shadow"></div>'), o.wrapper.append(b)), b.css({
							height: o.width + "px"
						})) : (b = o.container.find(".swiper-cube-shadow"), 0 === b.length && (b = a('<div class="swiper-cube-shadow"></div>'), o.container.append(b))));
						for (var d = 0; d < o.slides.length; d++) {
							var f = o.slides.eq(d),
							g = 90 * d,
							h = Math.floor(g / 360);
							o.rtl && (g = -g, h = Math.floor( - g / 360));
							var i = Math.max(Math.min(f[0].progress, 1), -1),
							j = 0,
							k = 0,
							l = 0;
							d % 4 === 0 ? (j = 4 * -h * o.size, l = 0) : (d - 1) % 4 === 0 ? (j = 0, l = 4 * -h * o.size) : (d - 2) % 4 === 0 ? (j = o.size + 4 * h * o.size, l = o.size) : (d - 3) % 4 === 0 && (j = -o.size, l = 3 * o.size + 4 * o.size * h),
							o.rtl && (j = -j),
							e() || (k = j, j = 0);
							var m = "rotateX(" + (e() ? 0 : -g) + "deg) rotateY(" + (e() ? g: 0) + "deg) translate3d(" + j + "px, " + k + "px, " + l + "px)";
							if (1 >= i && i > -1 && (c = 90 * d + 90 * i, o.rtl && (c = 90 * -d - 90 * i)), f.transform(m), o.params.cube.slideShadows) {
								var n = e() ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
								p = e() ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
								0 === n.length && (n = a('<div class="swiper-slide-shadow-' + (e() ? "left": "top") + '"></div>'), f.append(n)),
								0 === p.length && (p = a('<div class="swiper-slide-shadow-' + (e() ? "right": "bottom") + '"></div>'), f.append(p)),
								n.length && (n[0].style.opacity = -f[0].progress),
								p.length && (p[0].style.opacity = f[0].progress)
							}
						}
						if (o.wrapper.css({
							"-webkit-transform-origin": "50% 50% -" + o.size / 2 + "px",
							"-moz-transform-origin": "50% 50% -" + o.size / 2 + "px",
							"-ms-transform-origin": "50% 50% -" + o.size / 2 + "px",
							"transform-origin": "50% 50% -" + o.size / 2 + "px"
						}), o.params.cube.shadow) if (e()) b.transform("translate3d(0px, " + (o.width / 2 + o.params.cube.shadowOffset) + "px, " + -o.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + o.params.cube.shadowScale + ")");
						else {
							var q = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
							r = 1.5 - (Math.sin(2 * q * Math.PI / 360) / 2 + Math.cos(2 * q * Math.PI / 360) / 2),
							s = o.params.cube.shadowScale,
							t = o.params.cube.shadowScale / r,
							u = o.params.cube.shadowOffset;
							b.transform("scale3d(" + s + ", 1, " + t + ") translate3d(0px, " + (o.height / 2 + u) + "px, " + -o.height / 2 / t + "px) rotateX(-90deg)")
						}
						var v = o.isSafari || o.isUiWebView ? -o.size / 2 : 0;
						o.wrapper.transform("translate3d(0px,0," + v + "px) rotateX(" + (e() ? 0 : c) + "deg) rotateY(" + (e() ? -c: 0) + "deg)")
					},
					setTransition: function(a) {
						o.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),
						o.params.cube.shadow && !e() && o.container.find(".swiper-cube-shadow").transition(a)
					}
				},
				coverflow: {
					setTranslate: function() {
						for (var b = o.translate,
						c = e() ? -b + o.width / 2 : -b + o.height / 2, d = e() ? o.params.coverflow.rotate: -o.params.coverflow.rotate, f = o.params.coverflow.depth, g = 0, h = o.slides.length; h > g; g++) {
							var i = o.slides.eq(g),
							j = o.slidesSizesGrid[g],
							k = i[0].swiperSlideOffset,
							l = (c - k - j / 2) / j * o.params.coverflow.modifier,
							m = e() ? d * l: 0,
							n = e() ? 0 : d * l,
							p = -f * Math.abs(l),
							q = e() ? 0 : o.params.coverflow.stretch * l,
							r = e() ? o.params.coverflow.stretch * l: 0;
							Math.abs(r) < .001 && (r = 0),
							Math.abs(q) < .001 && (q = 0),
							Math.abs(p) < .001 && (p = 0),
							Math.abs(m) < .001 && (m = 0),
							Math.abs(n) < .001 && (n = 0);
							var s = "translate3d(" + r + "px," + q + "px," + p + "px)  rotateX(" + n + "deg) rotateY(" + m + "deg)";
							if (i.transform(s), i[0].style.zIndex = -Math.abs(Math.round(l)) + 1, o.params.coverflow.slideShadows) {
								var t = e() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
								u = e() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
								0 === t.length && (t = a('<div class="swiper-slide-shadow-' + (e() ? "left": "top") + '"></div>'), i.append(t)),
								0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (e() ? "right": "bottom") + '"></div>'), i.append(u)),
								t.length && (t[0].style.opacity = l > 0 ? l: 0),
								u.length && (u[0].style.opacity = -l > 0 ? -l: 0)
							}
						}
						if (o.browser.ie) {
							var v = o.wrapper[0].style;
							v.perspectiveOrigin = c + "px 50%"
						}
					},
					setTransition: function(a) {
						o.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a)
					}
				}
			},
			o.lazy = {
				initialImageLoaded: !1,
				loadImageInSlide: function(b) {
					if ("undefined" != typeof b && 0 !== o.slides.length) {
						var c = o.slides.eq(b),
						d = c.find("img.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
						0 !== d.length && d.each(function() {
							var b = a(this);
							b.addClass("swiper-lazy-loading");
							var d = b.attr("data-src");
							o.loadImage(b[0], d, !1,
							function() {
								b.attr("src", d),
								b.removeAttr("data-src"),
								b.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),
								c.find(".swiper-lazy-preloader, .preloader").remove(),
								o.emit("onLazyImageReady", o, c[0], b[0])
							}),
							o.emit("onLazyImageLoad", o, c[0], b[0])
						})
					}
				},
				load: function() {
					if (o.params.watchSlidesVisibility) o.wrapper.children("." + o.params.slideVisibleClass).each(function() {
						o.lazy.loadImageInSlide(a(this).index())
					});
					else if (o.params.slidesPerView > 1) for (var b = o.activeIndex; b < o.activeIndex + o.params.slidesPerView; b++) o.slides[b] && o.lazy.loadImageInSlide(b);
					else o.lazy.loadImageInSlide(o.activeIndex);
					if (o.params.lazyLoadingInPrevNext) {
						var c = o.wrapper.children("." + o.params.slideNextClass);
						c.length > 0 && o.lazy.loadImageInSlide(c.index());
						var d = o.wrapper.children("." + o.params.slidePrevClass);
						d.length > 0 && o.lazy.loadImageInSlide(d.index())
					}
				},
				onTransitionStart: function() {
					o.params.lazyLoading && (o.params.lazyLoadingOnTransitionStart || !o.params.lazyLoadingOnTransitionStart && !o.lazy.initialImageLoaded) && (o.lazy.initialImageLoaded = !0, o.lazy.load())
				},
				onTransitionEnd: function() {
					o.params.lazyLoading && !o.params.lazyLoadingOnTransitionStart && o.lazy.load()
				}
			},
			o.scrollbar = {
				set: function() {
					if (o.params.scrollbar) {
						var b = o.scrollbar;
						b.track = a(o.params.scrollbar),
						b.drag = b.track.find(".swiper-scrollbar-drag"),
						0 === b.drag.length && (b.drag = a('<div class="swiper-scrollbar-drag"></div>'), b.track.append(b.drag)),
						b.drag[0].style.width = "",
						b.drag[0].style.height = "",
						b.trackSize = e() ? b.track[0].offsetWidth: b.track[0].offsetHeight,
						b.divider = o.size / o.virtualSize,
						b.moveDivider = b.divider * (b.trackSize / o.size),
						b.dragSize = b.trackSize * b.divider,
						e() ? b.drag[0].style.width = b.dragSize + "px": b.drag[0].style.height = b.dragSize + "px",
						b.divider >= 1 ? b.track[0].style.display = "none": b.track[0].style.display = "",
						o.params.scrollbarHide && (b.track[0].style.opacity = 0)
					}
				},
				setTranslate: function() {
					if (o.params.scrollbar) {
						var a, b = o.scrollbar,
						c = b.dragSize;
						a = (b.trackSize - b.dragSize) * o.progress,
						o.rtl && e() ? (a = -a, a > 0 ? (c = b.dragSize - a, a = 0) : -a + b.dragSize > b.trackSize && (c = b.trackSize + a)) : 0 > a ? (c = b.dragSize + a, a = 0) : a + b.dragSize > b.trackSize && (c = b.trackSize - a),
						e() ? (o.support.transforms3d ? b.drag.transform("translate3d(" + a + "px, 0, 0)") : b.drag.transform("translateX(" + a + "px)"), b.drag[0].style.width = c + "px") : (o.support.transforms3d ? b.drag.transform("translate3d(0px, " + a + "px, 0)") : b.drag.transform("translateY(" + a + "px)"), b.drag[0].style.height = c + "px"),
						o.params.scrollbarHide && (clearTimeout(b.timeout), b.track[0].style.opacity = 1, b.timeout = setTimeout(function() {
							b.track[0].style.opacity = 0,
							b.track.transition(400)
						},
						1e3))
					}
				},
				setTransition: function(a) {
					o.params.scrollbar && o.scrollbar.drag.transition(a)
				}
			},
			o.controller = {
				setTranslate: function(a, c) {
					var d, e, f = o.params.control;
					if (o.isArray(f)) for (var g = 0; g < f.length; g++) f[g] !== c && f[g] instanceof b && (a = f[g].rtl && "horizontal" === f[g].params.direction ? -o.translate: o.translate, d = (f[g].maxTranslate() - f[g].minTranslate()) / (o.maxTranslate() - o.minTranslate()), e = (a - o.minTranslate()) * d + f[g].minTranslate(), o.params.controlInverse && (e = f[g].maxTranslate() - e), f[g].updateProgress(e), f[g].setWrapperTranslate(e, !1, o), f[g].updateActiveIndex());
					else f instanceof b && c !== f && (a = f.rtl && "horizontal" === f.params.direction ? -o.translate: o.translate, d = (f.maxTranslate() - f.minTranslate()) / (o.maxTranslate() - o.minTranslate()), e = (a - o.minTranslate()) * d + f.minTranslate(), o.params.controlInverse && (e = f.maxTranslate() - e), f.updateProgress(e), f.setWrapperTranslate(e, !1, o), f.updateActiveIndex())
				},
				setTransition: function(a, c) {
					var d = o.params.control;
					if (o.isArray(d)) for (var e = 0; e < d.length; e++) d[e] !== c && d[e] instanceof b && d[e].setWrapperTransition(a, o);
					else d instanceof b && c !== d && d.setWrapperTransition(a, o)
				}
			},
			o.parallax = {
				setTranslate: function() {
					o.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						i(this, o.progress)
					}),
					o.slides.each(function() {
						var b = a(this);
						b.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
							var a = Math.min(Math.max(b[0].progress, -1), 1);
							i(this, a)
						})
					})
				},
				setTransition: function(b) {
					"undefined" == typeof b && (b = o.params.speed),
					o.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						var c = a(this),
						d = parseInt(c.attr("data-swiper-parallax-duration"), 10) || b;
						0 === b && (d = 0),
						c.transition(d)
					})
				}
			},
			o._plugins = [];
			for (var E in o.plugins) if (o.plugins.hasOwnProperty(E)) {
				var F = o.plugins[E](o, o.params[E]);
				F && o._plugins.push(F)
			}
			return o.callPlugins = function(a) {
				for (var b = 0; b < o._plugins.length; b++) a in o._plugins[b] && o._plugins[b][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			},
			o.emitterEventListeners = {},
			o.emit = function(a) {
				o.params[a] && o.params[a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				var b;
				if (o) {
					if (o.emitterEventListeners[a]) for (b = 0; b < o.emitterEventListeners[a].length; b++) o.emitterEventListeners[a][b](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
					o.callPlugins && o.callPlugins(a, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
				}
			},
			o.on = function(a, b) {
				return a = j(a),
				o.emitterEventListeners[a] || (o.emitterEventListeners[a] = []),
				o.emitterEventListeners[a].push(b),
				o
			},
			o.off = function(a, b) {
				var c;
				if (a = j(a), "undefined" == typeof b) return o.emitterEventListeners[a] = [],
				o;
				if (o.emitterEventListeners[a] && 0 !== o.emitterEventListeners[a].length) {
					for (c = 0; c < o.emitterEventListeners[a].length; c++) o.emitterEventListeners[a][c] === b && o.emitterEventListeners[a].splice(c, 1);
					return o
				}
			},
			o.once = function(a, b) {
				a = j(a);
				var c = function() {
					b(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]),
					o.off(a, c)
				};
				return o.on(a, c),
				o
			},
			o.a11y = {
				makeFocusable: function(a) {
					return a[0].tabIndex = "0",
					a
				},
				addRole: function(a, b) {
					return a.attr("role", b),
					a
				},
				addLabel: function(a, b) {
					return a.attr("aria-label", b),
					a
				},
				disable: function(a) {
					return a.attr("aria-disabled", !0),
					a
				},
				enable: function(a) {
					return a.attr("aria-disabled", !1),
					a
				},
				onEnterKey: function(b) {
					13 === b.keyCode && (a(b.target).is(o.params.nextButton) ? (o.onClickNext(b), o.isEnd ? o.a11y.notify(o.params.lastSlideMsg) : o.a11y.notify(o.params.nextSlideMsg)) : a(b.target).is(o.params.prevButton) && (o.onClickPrev(b), o.isBeginning ? o.a11y.notify(o.params.firstSlideMsg) : o.a11y.notify(o.params.prevSlideMsg)))
				},
				liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
				notify: function(a) {
					var b = o.a11y.liveRegion;
					0 !== b.length && (b.html(""), b.html(a))
				},
				init: function() {
					if (o.params.nextButton) {
						var b = a(o.params.nextButton);
						o.a11y.makeFocusable(b),
						o.a11y.addRole(b, "button"),
						o.a11y.addLabel(b, o.params.nextSlideMsg)
					}
					if (o.params.prevButton) {
						var c = a(o.params.prevButton);
						o.a11y.makeFocusable(c),
						o.a11y.addRole(c, "button"),
						o.a11y.addLabel(c, o.params.prevSlideMsg)
					}
					a(o.container).append(o.a11y.liveRegion)
				},
				destroy: function() {
					o.a11y.liveRegion && o.a11y.liveRegion.length > 0 && o.a11y.liveRegion.remove()
				}
			},
			o.init = function() {
				o.params.loop && o.createLoop(),
				o.updateContainerSize(),
				o.updateSlidesSize(),
				o.updatePagination(),
				o.params.scrollbar && o.scrollbar && o.scrollbar.set(),
				"slide" !== o.params.effect && o.effects[o.params.effect] && (o.params.loop || o.updateProgress(), o.effects[o.params.effect].setTranslate()),
				o.params.loop ? o.slideTo(o.params.initialSlide + o.loopedSlides, 0, o.params.runCallbacksOnInit) : (o.slideTo(o.params.initialSlide, 0, o.params.runCallbacksOnInit), 0 === o.params.initialSlide && (o.parallax && o.params.parallax && o.parallax.setTranslate(), o.lazy && o.params.lazyLoading && o.lazy.load())),
				o.attachEvents(),
				o.params.observer && o.support.observer && o.initObservers(),
				o.params.preloadImages && !o.params.lazyLoading && o.preloadImages(),
				o.params.autoplay && o.startAutoplay(),
				o.params.keyboardControl && o.enableKeyboardControl && o.enableKeyboardControl(),
				o.params.mousewheelControl && o.enableMousewheelControl && o.enableMousewheelControl(),
				o.params.hashnav && o.hashnav && o.hashnav.init(),
				o.params.a11y && o.a11y && o.a11y.init(),
				o.emit("onInit", o)
			},
			o.cleanupStyles = function() {
				o.container.removeClass(o.classNames.join(" ")).removeAttr("style"),
				o.wrapper.removeAttr("style"),
				o.slides && o.slides.length && o.slides.removeClass([o.params.slideVisibleClass, o.params.slideActiveClass, o.params.slideNextClass, o.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
				o.paginationContainer && o.paginationContainer.length && o.paginationContainer.removeClass(o.params.paginationHiddenClass),
				o.bullets && o.bullets.length && o.bullets.removeClass(o.params.bulletActiveClass),
				o.params.prevButton && a(o.params.prevButton).removeClass(o.params.buttonDisabledClass),
				o.params.nextButton && a(o.params.nextButton).removeClass(o.params.buttonDisabledClass),
				o.params.scrollbar && o.scrollbar && (o.scrollbar.track && o.scrollbar.track.length && o.scrollbar.track.removeAttr("style"), o.scrollbar.drag && o.scrollbar.drag.length && o.scrollbar.drag.removeAttr("style"))
			},
			o.destroy = function(a, b) {
				o.detachEvents(),
				o.stopAutoplay(),
				o.params.loop && o.destroyLoop(),
				b && o.cleanupStyles(),
				o.disconnectObservers(),
				o.params.keyboardControl && o.disableKeyboardControl && o.disableKeyboardControl(),
				o.params.mousewheelControl && o.disableMousewheelControl && o.disableMousewheelControl(),
				o.params.a11y && o.a11y && o.a11y.destroy(),
				o.emit("onDestroy"),
				a !== !1 && (o = null)
			},
			o.init(),
			o
		}
	};
	b.prototype = {
		defaults: {
			direction: "horizontal",
			touchEventsTarget: "container",
			initialSlide: 0,
			speed: 300,
			autoplay: !1,
			autoplayDisableOnInteraction: !0,
			freeMode: !1,
			freeModeMomentum: !0,
			freeModeMomentumRatio: 1,
			freeModeMomentumBounce: !0,
			freeModeMomentumBounceRatio: 1,
			setWrapperSize: !1,
			virtualTranslate: !1,
			effect: "slide",
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: !0
			},
			cube: {
				slideShadows: !0,
				shadow: !0,
				shadowOffset: 20,
				shadowScale: .94
			},
			fade: {
				crossFade: !1
			},
			parallax: !1,
			scrollbar: null,
			scrollbarHide: !0,
			keyboardControl: !1,
			mousewheelControl: !1,
			mousewheelForceToAxis: !1,
			hashnav: !1,
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerColumn: 1,
			slidesPerColumnFill: "column",
			slidesPerGroup: 1,
			centeredSlides: !1,
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: !0,
			shortSwipes: !0,
			longSwipes: !0,
			longSwipesRatio: .5,
			longSwipesMs: 300,
			followFinger: !0,
			onlyExternal: !1,
			threshold: 0,
			touchMoveStopPropagation: !0,
			pagination: null,
			paginationClickable: !1,
			paginationHide: !1,
			paginationBulletRender: null,
			resistance: !0,
			resistanceRatio: .85,
			nextButton: null,
			prevButton: null,
			watchSlidesProgress: !1,
			watchSlidesVisibility: !1,
			grabCursor: !1,
			preventClicks: !0,
			preventClicksPropagation: !0,
			slideToClickedSlide: !1,
			lazyLoading: !1,
			lazyLoadingInPrevNext: !1,
			lazyLoadingOnTransitionStart: !1,
			preloadImages: !0,
			updateOnImagesReady: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			control: void 0,
			controlInverse: !1,
			allowSwipeToPrev: !0,
			allowSwipeToNext: !0,
			swipeHandler: null,
			noSwiping: !0,
			noSwipingClass: "swiper-no-swiping",
			slideClass: "swiper-slide",
			slideActiveClass: "swiper-slide-active",
			slideVisibleClass: "swiper-slide-visible",
			slideDuplicateClass: "swiper-slide-duplicate",
			slideNextClass: "swiper-slide-next",
			slidePrevClass: "swiper-slide-prev",
			wrapperClass: "swiper-wrapper",
			bulletClass: "swiper-pagination-bullet",
			bulletActiveClass: "swiper-pagination-bullet-active",
			buttonDisabledClass: "swiper-button-disabled",
			paginationHiddenClass: "swiper-pagination-hidden",
			observer: !1,
			observeParents: !1,
			a11y: !1,
			prevSlideMessage: "Previous slide",
			nextSlideMessage: "Next slide",
			firstSlideMessage: "This is the first slide",
			lastSlideMessage: "This is the last slide",
			runCallbacksOnInit: !0
		},
		isSafari: function() {
			var a = navigator.userAgent.toLowerCase();
			return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0
		} (),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
		isArray: function(a) {
			return "[object Array]" === Object.prototype.toString.apply(a)
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
		},
		device: function() {
			var a = navigator.userAgent,
			b = a.match(/(Android);?[\s\/]+([\d.]+)?/),
			c = a.match(/(iPad).*OS\s([\d_]+)/),
			d = !c && a.match(/(iPhone\sOS)\s([\d_]+)/);
			return {
				ios: c || d || c,
				android: b
			}
		} (),
		support: {
			touch: window.Modernizr && Modernizr.touch === !0 ||
			function() {
				return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			} (),
			transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 ||
			function() {
				var a = document.createElement("div").style;
				return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a
			} (),
			flexbox: function() {
				for (var a = document.createElement("div").style, b = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), c = 0; c < b.length; c++) if (b[c] in a) return ! 0
			} (),
			observer: function() {
				return "MutationObserver" in window || "WebkitMutationObserver" in window
			} ()
		},
		plugins: {}
	},
	a.Swiper = b
} (Zepto),
+
function(a) {
	"use strict";
	a.Swiper.prototype.defaults.pagination = ".page-current .swiper-pagination",
	a.swiper = function(b, c) {
		return new a.Swiper(b, c)
	},
	a.fn.swiper = function(b) {
		return new a.Swiper(this, b)
	},
	a.initSwiper = function(b) {
		function c(a) {
			function b() {
				a.destroy(),
				d.off("pageBeforeRemove", b)
			}
			d.on("pageBeforeRemove", b)
		}
		var d = a(b || document.body),
		e = d.find(".swiper-container");
		if (0 !== e.length) for (var f = 0; f < e.length; f++) {
			var g, h = e.eq(f);
			if (h.data("swiper")) h.data("swiper").update(!0);
			else {
				g = h.dataset();
				var i = a.swiper(h[0], g);
				c(i)
			}
		}
	},
	a.reinitSwiper = function(b) {
		var c = a(b || ".page-current"),
		d = c.find(".swiper-container");
		if (0 !== d.length) for (var e = 0; e < d.length; e++) {
			var f = d[0].swiper;
			f && f.update(!0)
		}
	}
} (Zepto),
+
function(a) {
	"use strict";
	var b = function(b) {
		var c, d = this,
		e = this.defaults;
		b = b || {};
		for (var f in e)"undefined" == typeof b[f] && (b[f] = e[f]);
		d.params = b;
		var g = d.params.navbarTemplate || '<header class="bar bar-nav"><a class="icon icon-left pull-left photo-browser-close-link' + ("popup" === d.params.type ? " close-popup": "") + '"></a><h1 class="title"><div class="center sliding"><span class="photo-browser-current"></span> <span class="photo-browser-of">' + d.params.ofText + '</span> <span class="photo-browser-total"></span></div></h1></header>',
		h = d.params.toolbarTemplate || '<nav class="bar bar-tab"><a class="tab-item photo-browser-prev" href="#"><i class="icon icon-prev"></i></a><a class="tab-item photo-browser-next" href="#"><i class="icon icon-next"></i></a></nav>',
		i = d.params.template || '<div class="photo-browser photo-browser-' + d.params.theme + '">{{navbar}}{{toolbar}}<div data-page="photo-browser-slides" class="content">{{captions}}<div class="photo-browser-swiper-container swiper-container"><div class="photo-browser-swiper-wrapper swiper-wrapper">{{photos}}</div></div></div></div>',
		j = d.params.lazyLoading ? d.params.photoLazyTemplate || '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide"><div class="preloader' + ("dark" === d.params.theme ? " preloader-white": "") + '"></div><span class="photo-browser-zoom-container"><img data-src="{{url}}" class="swiper-lazy"></span></div>': d.params.photoTemplate || '<div class="photo-browser-slide swiper-slide"><span class="photo-browser-zoom-container"><img src="{{url}}"></span></div>',
		k = d.params.captionsTheme || d.params.theme,
		l = d.params.captionsTemplate || '<div class="photo-browser-captions photo-browser-captions-' + k + '">{{captions}}</div>',
		m = d.params.captionTemplate || '<div class="photo-browser-caption" data-caption-index="{{captionIndex}}">{{caption}}</div>',
		n = d.params.objectTemplate || '<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{html}}</div>',
		o = "",
		p = "";
		for (c = 0; c < d.params.photos.length; c++) {
			var q = d.params.photos[c],
			r = "";
			"string" == typeof q || q instanceof String ? r = q.indexOf("<") >= 0 || q.indexOf(">") >= 0 ? n.replace(/{{html}}/g, q) : j.replace(/{{url}}/g, q) : "object" == typeof q && (q.hasOwnProperty("html") && q.html.length > 0 ? r = n.replace(/{{html}}/g, q.html) : q.hasOwnProperty("url") && q.url.length > 0 && (r = j.replace(/{{url}}/g, q.url)), q.hasOwnProperty("caption") && q.caption.length > 0 ? p += m.replace(/{{caption}}/g, q.caption).replace(/{{captionIndex}}/g, c) : r = r.replace(/{{caption}}/g, "")),
			o += r
		}
		var s = i.replace("{{navbar}}", d.params.navbar ? g: "").replace("{{noNavbar}}", d.params.navbar ? "": "no-navbar").replace("{{photos}}", o).replace("{{captions}}", l.replace(/{{captions}}/g, p)).replace("{{toolbar}}", d.params.toolbar ? h: "");
		d.activeIndex = d.params.initialSlide,
		d.openIndex = d.activeIndex,
		d.opened = !1,
		d.open = function(b) {
			return "undefined" == typeof b && (b = d.activeIndex),
			b = parseInt(b, 10),
			d.opened && d.swiper ? void d.swiper.slideTo(b) : (d.opened = !0, d.openIndex = b, "standalone" === d.params.type && a(d.params.container).append(s), "popup" === d.params.type && (d.popup = a.popup('<div class="popup photo-browser-popup">' + s + "</div>"), a(d.popup).on("closed", d.onPopupClose)), "page" === d.params.type ? (a(document).on("pageBeforeInit", d.onPageBeforeInit), a(document).on("pageBeforeRemove", d.onPageBeforeRemove), d.params.view || (d.params.view = a.mainView), void d.params.view.loadContent(s)) : (d.layout(d.openIndex), void(d.params.onOpen && d.params.onOpen(d))))
		},
		d.close = function() {
			$("body").removeClass("qy_ovhidden").addClass("qy_overflow"),
			d.opened = !1,
			d.swiperContainer && 0 !== d.swiperContainer.length && (d.params.onClose && d.params.onClose(d), d.attachEvents(!0), "standalone" === d.params.type && d.container.removeClass("photo-browser-in").addClass("photo-browser-out").remove(".photo-browser").transitionEnd(function() {
				d.container.remove();
			}), d.swiper.destroy(), d.swiper = d.swiperContainer = d.swiperWrapper = d.slides = t = u = v = void 0)
		},
		d.onPopupClose = function() {
			d.close(),
			a(d.popup).off("pageBeforeInit", d.onPopupClose)
		},
		d.onPageBeforeInit = function(b) {
			"photo-browser-slides" === b.detail.page.name && d.layout(d.openIndex),
			a(document).off("pageBeforeInit", d.onPageBeforeInit)
		},
		d.onPageBeforeRemove = function(b) {
			"photo-browser-slides" === b.detail.page.name && d.close()
			a(document).off("pageBeforeRemove", d.onPageBeforeRemove)
		
		},
		d.onSliderTransitionStart = function(b) {
			d.activeIndex = b.activeIndex;
			var c = b.activeIndex + 1,
			e = b.slides.length;
			if (d.params.loop && (e -= 2, c -= b.loopedSlides, 1 > c && (c = e + c), c > e && (c -= e)), d.container.find(".photo-browser-current").text(c), d.container.find(".photo-browser-total").text(e), a(".photo-browser-prev, .photo-browser-next").removeClass("photo-browser-link-inactive"), b.isBeginning && !d.params.loop && a(".photo-browser-prev").addClass("photo-browser-link-inactive"), b.isEnd && !d.params.loop && a(".photo-browser-next").addClass("photo-browser-link-inactive"), d.captions.length > 0) {
				d.captionsContainer.find(".photo-browser-caption-active").removeClass("photo-browser-caption-active");
				var f = d.params.loop ? b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") : d.activeIndex;
				d.captionsContainer.find('[data-caption-index="' + f + '"]').addClass("photo-browser-caption-active")
			}
			var g = b.slides.eq(b.previousIndex).find("video");
			g.length > 0 && "pause" in g[0] && g[0].pause(),
			d.params.onSlideChangeStart && d.params.onSlideChangeStart(b)
		},
		d.onSliderTransitionEnd = function(a) {
			d.params.zoom && t && a.previousIndex !== a.activeIndex && (u.transform("translate3d(0,0,0) scale(1)"), v.transform("translate3d(0,0,0)"), t = u = v = void 0, w = x = 1),
			d.params.onSlideChangeEnd && d.params.onSlideChangeEnd(a)
		},
		d.layout = function(b) {
			"page" === d.params.type ? d.container = a(".photo-browser-swiper-container").parents(".view") : d.container = a(".photo-browser"),
			"standalone" === d.params.type && d.container.addClass("photo-browser-in"),
			d.swiperContainer = d.container.find(".photo-browser-swiper-container"),
			d.swiperWrapper = d.container.find(".photo-browser-swiper-wrapper"),
			d.slides = d.container.find(".photo-browser-slide"),
			d.captionsContainer = d.container.find(".photo-browser-captions"),
			d.captions = d.container.find(".photo-browser-caption");
			var c = {
				nextButton: d.params.nextButton || ".photo-browser-next",
				prevButton: d.params.prevButton || ".photo-browser-prev",
				indexButton: d.params.indexButton,
				initialSlide: b,
				spaceBetween: d.params.spaceBetween,
				speed: d.params.speed,
				loop: d.params.loop,
				lazyLoading: d.params.lazyLoading,
				lazyLoadingInPrevNext: d.params.lazyLoadingInPrevNext,
				lazyLoadingOnTransitionStart: d.params.lazyLoadingOnTransitionStart,
				preloadImages: d.params.lazyLoading ? !1 : !0,
				onTap: function(a, b) {
					d.params.onTap && d.params.onTap(a, b)
				},
				onClick: function(a, b) {
					d.params.exposition && d.toggleExposition(),
					d.params.onClick && d.params.onClick(a, b)
				},
				onDoubleTap: function(b, c) {
					d.toggleZoom(a(c.target).parents(".photo-browser-slide")),
					d.params.onDoubleTap && d.params.onDoubleTap(b, c)
				},
				onTransitionStart: function(a) {
					d.onSliderTransitionStart(a)
				},
				onTransitionEnd: function(a) {
					d.onSliderTransitionEnd(a)
				},
				onLazyImageLoad: function(a, b, c) {
					d.params.onLazyImageLoad && d.params.onLazyImageLoad(d, b, c)
				},
				onLazyImageReady: function(b, c, e) {
					a(c).removeClass("photo-browser-slide-lazy"),
					d.params.onLazyImageReady && d.params.onLazyImageReady(d, c, e)
				}
			};
			d.params.swipeToClose && "page" !== d.params.type && (c.onTouchStart = d.swipeCloseTouchStart, c.onTouchMoveOpposite = d.swipeCloseTouchMove, c.onTouchEnd = d.swipeCloseTouchEnd),
			d.swiper = a.swiper(d.swiperContainer, c),
			0 === b && d.onSliderTransitionStart(d.swiper),
			d.attachEvents()
		},
		d.attachEvents = function(a) {
			var b = a ? "off": "on";
			if (d.params.zoom) {
				var c = d.params.loop ? d.swiper.slides: d.slides;
				c[b]("gesturestart", d.onSlideGestureStart),
				c[b]("gesturechange", d.onSlideGestureChange),
				c[b]("gestureend", d.onSlideGestureEnd),
				c[b]("touchstart", d.onSlideTouchStart),
				c[b]("touchmove", d.onSlideTouchMove),
				c[b]("touchend", d.onSlideTouchEnd)
			}
			d.container.find(".photo-browser-close-link")[b]("click", d.close)
		},
		d.exposed = !1,
		d.toggleExposition = function() {
			d.container && d.container.toggleClass("photo-browser-exposed"),
			d.params.expositionHideCaptions && d.captionsContainer.toggleClass("photo-browser-captions-exposed"),
			d.exposed = !d.exposed
		},
		d.enableExposition = function() {
			d.container && d.container.addClass("photo-browser-exposed"),
			d.params.expositionHideCaptions && d.captionsContainer.addClass("photo-browser-captions-exposed"),
			d.exposed = !0
		},
		d.disableExposition = function() {
			d.container && d.container.removeClass("photo-browser-exposed"),
			d.params.expositionHideCaptions && d.captionsContainer.removeClass("photo-browser-captions-exposed"),
			d.exposed = !1
		};
		var t, u, v, w = 1,
		x = 1,
		y = !1;
		d.onSlideGestureStart = function() {
			return t || (t = a(this), u = t.find("img, svg, canvas"), v = u.parent(".photo-browser-zoom-container"), 0 !== v.length) ? (u.transition(0), void(y = !0)) : void(u = void 0)
		},
		d.onSlideGestureChange = function(a) {
			u && 0 !== u.length && (w = a.scale * x, w > d.params.maxZoom && (w = d.params.maxZoom - 1 + Math.pow(w - d.params.maxZoom + 1, .5)), w < d.params.minZoom && (w = d.params.minZoom + 1 - Math.pow(d.params.minZoom - w + 1, .5)), u.transform("translate3d(0,0,0) scale(" + w + ")"))
		},
		d.onSlideGestureEnd = function() {
			u && 0 !== u.length && (w = Math.max(Math.min(w, d.params.maxZoom), d.params.minZoom), u.transition(d.params.speed).transform("translate3d(0,0,0) scale(" + w + ")"), x = w, y = !1, 1 === w && (t = void 0))
		},
		d.toggleZoom = function() {
			t || (t = d.swiper.slides.eq(d.swiper.activeIndex), u = t.find("img, svg, canvas"), v = u.parent(".photo-browser-zoom-container")),
			u && 0 !== u.length && (v.transition(300).transform("translate3d(0,0,0)"), w && 1 !== w ? (w = x = 1, u.transition(300).transform("translate3d(0,0,0) scale(1)"), t = void 0) : (w = x = d.params.maxZoom, u.transition(300).transform("translate3d(0,0,0) scale(" + w + ")")))
		};
		var z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q = {},
		R = {};
		d.onSlideTouchStart = function(b) {
			u && 0 !== u.length && (z || ("android" === a.device.os && b.preventDefault(), z = !0, Q.x = "touchstart" === b.type ? b.targetTouches[0].pageX: b.pageX, Q.y = "touchstart" === b.type ? b.targetTouches[0].pageY: b.pageY))
		},
		d.onSlideTouchMove = function(b) {
			if (u && 0 !== u.length && (d.swiper.allowClick = !1, z && t)) {
				A || (H = u[0].offsetWidth, I = u[0].offsetHeight, J = a.getTranslate(v[0], "x") || 0, K = a.getTranslate(v[0], "y") || 0, v.transition(0));
				var c = H * w,
				e = I * w;
				if (! (c < d.swiper.width && e < d.swiper.height)) {
					if (D = Math.min(d.swiper.width / 2 - c / 2, 0), F = -D, E = Math.min(d.swiper.height / 2 - e / 2, 0), G = -E, R.x = "touchmove" === b.type ? b.targetTouches[0].pageX: b.pageX, R.y = "touchmove" === b.type ? b.targetTouches[0].pageY: b.pageY, !A && !y && (Math.floor(D) === Math.floor(J) && R.x < Q.x || Math.floor(F) === Math.floor(J) && R.x > Q.x)) return void(z = !1);
					b.preventDefault(),
					b.stopPropagation(),
					A = !0,
					B = R.x - Q.x + J,
					C = R.y - Q.y + K,
					D > B && (B = D + 1 - Math.pow(D - B + 1, .8)),
					B > F && (B = F - 1 + Math.pow(B - F + 1, .8)),
					E > C && (C = E + 1 - Math.pow(E - C + 1, .8)),
					C > G && (C = G - 1 + Math.pow(C - G + 1, .8)),
					L || (L = R.x),
					O || (O = R.y),
					M || (M = Date.now()),
					N = (R.x - L) / (Date.now() - M) / 2,
					P = (R.y - O) / (Date.now() - M) / 2,
					Math.abs(R.x - L) < 2 && (N = 0),
					Math.abs(R.y - O) < 2 && (P = 0),
					L = R.x,
					O = R.y,
					M = Date.now(),
					v.transform("translate3d(" + B + "px, " + C + "px,0)")
				}
			}
		},
		d.onSlideTouchEnd = function() {
			if (u && 0 !== u.length) {
				if (!z || !A) return z = !1,
				void(A = !1);
				z = !1,
				A = !1;
				var a = 300,
				b = 300,
				c = N * a,
				e = B + c,
				f = P * b,
				g = C + f;
				0 !== N && (a = Math.abs((e - B) / N)),
				0 !== P && (b = Math.abs((g - C) / P));
				var h = Math.max(a, b);
				B = e,
				C = g;
				var i = H * w,
				j = I * w;
				D = Math.min(d.swiper.width / 2 - i / 2, 0),
				F = -D,
				E = Math.min(d.swiper.height / 2 - j / 2, 0),
				G = -E,
				B = Math.max(Math.min(B, F), D),
				C = Math.max(Math.min(C, G), E),
				v.transition(h).transform("translate3d(" + B + "px, " + C + "px,0)")
			}
		};
		var S, T, U, V, W, X = !1,
		Y = !0,
		Z = !1;
		return d.swipeCloseTouchStart = function() {
			Y && (X = !0)
		},
		d.swipeCloseTouchMove = function(a, b) {
			if (X) {
				Z || (Z = !0, T = "touchmove" === b.type ? b.targetTouches[0].pageY: b.pageY, V = d.swiper.slides.eq(d.swiper.activeIndex), W = (new Date).getTime()),
				b.preventDefault(),
				U = "touchmove" === b.type ? b.targetTouches[0].pageY: b.pageY,
				S = T - U;
				var c = 1 - Math.abs(S) / 300;
				V.transform("translate3d(0," + -S + "px,0)"),
				d.swiper.container.css("opacity", c).transition(0)
			}
		},
		d.swipeCloseTouchEnd = function() {
			if (X = !1, !Z) return void(Z = !1);
			Z = !1,
			Y = !1;
			var b = Math.abs(S),
			c = (new Date).getTime() - W;
			return 300 > c && b > 20 || c >= 300 && b > 100 ? void setTimeout(function() {
				"standalone" === d.params.type && d.close(),
				"popup" === d.params.type && a.closeModal(d.popup),
				d.params.onSwipeToClose && d.params.onSwipeToClose(d),
				Y = !0
			},
			0) : (0 !== b ? V.addClass("transitioning").transitionEnd(function() {
				Y = !0,
				V.removeClass("transitioning")
			}) : Y = !0, d.swiper.container.css("opacity", "").transition(""), void V.transform(""))
		},
		d
	};
	b.prototype = {
		defaults: {
			photos: [],
			container: "body",
			initialSlide: 0,
			spaceBetween: 20,
			speed: 300,
			zoom: !0,
			maxZoom: 3,
			minZoom: 1,
			exposition: !0,
			expositionHideCaptions: !1,
			type: "standalone",
			navbar: !0,
			toolbar: !0,
			theme: "light",
			swipeToClose: !0,
			backLinkText: "Close",
			ofText: "of",
			loop: !1,
			lazyLoading: !1,
			lazyLoadingInPrevNext: !1,
			lazyLoadingOnTransitionStart: !1
		}
	},
	a.photoBrowser = function(c) {
		return a.extend(c, a.photoBrowser.prototype.defaults),
		new b(c)
	},
	a.photoBrowser.prototype = {
		defaults: {}
	}
} (Zepto);