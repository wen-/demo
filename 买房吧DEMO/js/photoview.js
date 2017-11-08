(function(a) {
    a.fn.mfangPhotoAlbum = function(b) {
        var c = {
            previewFrame: "previewCon",
            curNum: "curNumber",
            totalNum: "totalNumber",
            previewTit: "previewTitle",
            guideFrame: "guideMinmapCon",
            curPointTo: "curGuide",
            previewDesp: "previewDescription",
            gBtns: "guideBtns",
            triggerEvent: "click",
            triggerEventGuide: "click",
            pBtnP: "previewBtnPrev",
            pBtnN: "previewBtnNext",
            gBtnP: "guideBtnPrev",
            gBtnN: "guideBtnNext",
            gBtnPDisa: "guideBtnPrevDisable",
            gBtnNDisa: "guideBtnNextDisable",
            hideTit: "false",
            hideGBtns: "false",
            initNum: "7",
            space: "4"
        };
        var b = a.extend(c, b);
        return this.each(function() {
            var t = b
              , x = a("#" + t.previewFrame)
              , i = a("#" + t.curNum)
              , w = a("#" + t.totalNum)
              , F = a("#" + t.previewTit)
              , B = a("#" + t.guideFrame)
              , r = a("#" + t.curPointTo)
              , u = a("#" + t.previewDesp)
              , g = a("#" + t.gBtns)
              , l = a("#" + t.pBtnP)
              , m = a("#" + t.pBtnN)
              , A = a("#" + t.gBtnP)
              , D = a("#" + t.gBtnN)
              , q = a("#" + t.gBtnPDisa)
              , j = a("#" + t.gBtnNDisa)
              , s = t.hideTit
              , p = t.hideGBtns
              , k = t.space
              , y = t.initNum
              , C = x.find("img")
              , d = B.find("li").not(":last")
              , z = d.outerWidth(true)
              , e = d.length
              , h = 0
              , E = 0
              , v = true;
            var f = function() {
                F.text(d.eq(E).find("img").attr("alt"));
                C.attr({
                    "src": d.eq(E).find("img").attr("data-src")
                });
            }
            ;
            f();
            var n = function() {
                if (e > 1) {
                    D.show();
                    q.show();
                }
            }
            ;
            n();
            w.text(e);
            s == "true" ? u.hide() : u.show();
            p == "true" ? g.hide() : g.show();
            d.eq(E).find("span").show().css("bottom", 0);
            x.hover(function() {
                if (e > 1) {
                    m.stop(true, false).animate({
                        "right": "0"
                    }, 300);
                }
                if (E > 0) {
                    l.stop(true, false).animate({
                        "left": "0"
                    }, 300);
                } else {
                    l.stop(true, false).animate({
                        "left": "-59" + "px"
                    }, 300);
                }
                if (E === e - 1) {
                    m.stop(true, false).animate({
                        "right": "-59" + "px"
                    }, 300);
                } else {
                    m.stop(true, false).animate({
                        "right": "0"
                    }, 300);
                }
            }, function() {
                l.stop(true, false).animate({
                    "left": "-59" + "px",
                    "opacity": "0.3"
                }, 200);
                m.stop(true, false).animate({
                    "right": "-59" + "px",
                    "opacity": "0.3"
                }, 200);
            });
            l.css("opacity", 0.3).hover(function() {
                a(this).animate({
                    "opacity": "0.6"
                }, 300);
            }, function() {
                a(this).animate({
                    "opacity": "0.3"
                }, 300);
            });
            m.css("opacity", 0.3).hover(function() {
                a(this).animate({
                    "opacity": "0.6"
                }, 300);
            }, function() {
                a(this).animate({
                    "opacity": "0.3"
                }, 300);
            });
            A.css("opacity", 0.7).hover(function() {
                a(this).animate({
                    "opacity": "1"
                }, 300);
            }, function() {
                a(this).animate({
                    "opacity": "0.7"
                }, 300);
            });
            D.css("opacity", 0.7).hover(function() {
                a(this).animate({
                    "opacity": "1"
                }, 300);
            }, function() {
                a(this).animate({
                    "opacity": "0.7"
                }, 300);
            });
            l.bind(t.triggerEvent, function() {
                if (v) {
                    E -= 1;
                    d.find("span").animate({
                        bottom: "-50px"
                    }, 300, function() {
                        a(this).hide();
                    });
                    r.stop(true, false).animate({
                        "left": (z * E) + parseInt(k)
                    }, 300, function() {
                        v = true;
                        d.eq(E).find("span").show().animate({
                            bottom: 0
                        }, 300);
                    });
                    if (E === 0) {
                        l.stop(true, false).animate({
                            "left": "-59" + "px"
                        }, 300);
                        A.hide();
                        q.show();
                    }
                    if (E !== e - 1) {
                        m.stop(true, false).animate({
                            "right": "0"
                        }, 300);
                        D.show();
                        j.hide();
                    }
                    if ((E + 1) % parseInt(y) === 0) {
                        h = parseInt(E / parseInt(y));
                        B.stop(true, false).animate({
                            "left": -(z * parseInt(y) * h)
                        }, 300);
                    }
                    i.text(E + 1);
                    f();
                    v = false;
                }
            });
            m.bind(t.triggerEvent, function() {
                if (v) {
                    E += 1;
                    d.find("span").animate({
                        bottom: "-50px"
                    }, 300, function() {
                        a(this).hide();
                    });
                    r.stop(true, false).animate({
                        "left": (z * E) + parseInt(k)
                    }, 300, function() {
                        v = true;
                        d.eq(E).find("span").show().animate({
                            bottom: 0
                        }, 300);
                    });
                    if (E > 0) {
                        l.stop(true, false).animate({
                            "left": "0"
                        }, 300);
                        A.show();
                        q.hide();
                    }
                    if (E === e - 1) {
                        m.stop(true, false).animate({
                            "right": "-59" + "px"
                        }, 300);
                        D.hide();
                        j.show();
                    }
                    if (E % parseInt(y) === 0) {
                        h = parseInt(E / parseInt(y));
                        B.stop(true, false).animate({
                            "left": -(z * parseInt(y) * h)
                        }, 300);
                    }
                    i.text(E + 1);
                    f();
                    v = false;
                }
            });
            A.bind(t.triggerEvent, function() {
                if (v) {
                    E -= 1;
                    d.find("span").animate({
                        bottom: "-50px"
                    }, 300, function() {
                        a(this).hide();
                    });
                    r.stop(true, false).animate({
                        "left": (z * E) + parseInt(k)
                    }, 300, function() {
                        v = true;
                        d.eq(E).find("span").show().animate({
                            bottom: 0
                        }, 300);
                    });
                    if (E === 0) {
                        a(this).hide();
                        q.show();
                    }
                    if (E !== e - 1) {
                        D.show();
                        j.hide();
                    }
                    if ((E + 1) % parseInt(y) === 0) {
                        h = parseInt(E / parseInt(y));
                        B.stop(true, false).animate({
                            "left": -(z * parseInt(y) * h)
                        }, 300);
                    }
                    i.text(E + 1);
                    f();
                    v = false;
                }
            });
            D.bind(t.triggerEvent, function() {
                if (v) {
                    E += 1;
                    d.find("span").animate({
                        bottom: "-50px"
                    }, 300, function() {
                        a(this).hide();
                    });
                    r.stop(true, false).animate({
                        "left": (z * E) + parseInt(k)
                    }, 300, function() {
                        v = true;
                        d.eq(E).find("span").show().animate({
                            bottom: 0
                        }, 300);
                    });
                    if (E > 0) {
                        A.show();
                        q.hide();
                    }
                    if (E === e - 1) {
                        a(this).hide();
                        j.show();
                    }
                    if (E % parseInt(y) === 0) {
                        h = parseInt(E / parseInt(y));
                        B.stop(true, false).animate({
                            "left": -(z * parseInt(y) * h)
                        }, 300);
                    }
                    i.text(E + 1);
                    f();
                    v = false;
                }
            });
            d.bind(t.triggerEventGuide, function() {
                if (v) {
                    var o = a(this).index();
                    E = o;
                    d.find("span").animate({
                        bottom: "-50px"
                    }, 300, function() {
                        a(this).hide();
                    });
                    r.stop(true, false).animate({
                        "left": (z * E) + parseInt(k)
                    }, 300, function() {
                        v = true;
                        d.eq(E).find("span").show().animate({
                            bottom: 0
                        }, 300);
                    });
                    if (E > 0 && E < parseInt(y)) {
                        A.show();
                        q.hide();
                    }
                    if (E === e - 1) {
                        D.hide();
                        j.show();
                    } else {
                        D.show();
                        j.hide();
                    }
                    if (E === 0) {
                        A.hide();
                        q.show();
                    }
                    i.text(E + 1);
                    f();
                    v = false;
                }
            });
        });
    }
    ;
})(jQuery);
(function(b) {
    var e = {
        photoArr: [],
        activeNum: 1,
        firstTipsFun: function() {},
        lastTipsFun: function() {}
    };
    var f;
    var c = ".hq-photo";
    b.mfangLightbox = function(m) {
        b.extend(e, m);
        b("body").append(h());
        a();
        if (e.activeNum == 1) {
            b(c).find(".hq-photo-prev").addClass("hq-photo-prev-dis");
        }
        if (e.activeNum == e.photoArr.length) {
            b(c).find(".hq-photo-next").addClass("hq-photo-next-dis");
        }
        i();
        g(e.photoArr[e.activeNum - 1].src, true);
        b(c).find(".hq-photo-close a").on("click", function() {
            k();
        });
        b(c).find(".hq-photo-prev a").on("click", function() {
            d();
        });
        b(c).find(".hq-photo-next a").on("click", function() {
            j();
        });
    }
    ;
    function h() {
        var m = '<div class="hq-photo">';
        m += '<div class="hq-photo-inner">';
        m += '<p class="hq-photo-view hq-photo-view-cur">';
        m += '<img src="' + e.photoArr[e.activeNum - 1].src + '" class="hq-pic" />';
        m += '<i class="refer"></i>';
        m += "</p>";
        m += '<p class="hq-photo-view hq-photo-view-next">';
        m += '<img src="' + e.photoArr[e.activeNum - 1].src + '" class="hq-pic" />';
        m += '<i class="refer"></i>';
        m += "</p>";
        m += "</div>";
        m += '<div class="hq-photo-total"></div>';
        m += '<p class="hq-photo-btn hq-photo-prev ' + (e.activeNum === 1 ? "hq-photo-prev-dis" : "") + '"><a class="btns-photoalbum" href="javascript:;"></a></p>';
        m += '<p class="hq-photo-btn hq-photo-next ' + (e.activeNum === e.photoArr.length ? "hq-photo-next-dis" : "") + '"><a class="btns-photoalbum" href="javascript:;"></a></p>';
        m += '<p class="hq-photo-close"><a class="btns-photoalbum" href="javascript:;"></a></p>';
        m += "</div>";
        return m;
    }
    function i() {
        b(c).css({
            width: b(window).width(),
            height: b(window).height()
        });
    }
    b(window).on("resize", function() {
        if (f) {
            clearTimeout(f);
        }
        f = setTimeout(i, 10);
    });
    function d() {
        if (e.activeNum == 1) {
            if (e.firstTipsFun && b.isFunction(e.firstTipsFun)) {
                e.firstTipsFun();
            }
            return;
        }
        e.activeNum--;
        if (e.activeNum <= 1) {
            e.activeNum = 1;
            b(c).find(".hq-photo-prev").addClass("hq-photo-prev-dis");
        } else {
            if (e.activeNum < e.photoArr.length) {
                b(c).find(".hq-photo-next").removeClass("hq-photo-next-dis");
            }
        }
        a();
    }
    function j() {
        if (e.activeNum == e.photoArr.length) {
            if (e.lastTipsFun && b.isFunction(e.lastTipsFun)) {
                e.lastTipsFun();
            }
            return;
        }
        e.activeNum++;
        if (e.activeNum >= e.photoArr.length) {
            e.activeNum = e.photoArr.length;
            b(c).find(".hq-photo-next").addClass("hq-photo-next-dis");
        } else {
            if (e.activeNum > 1) {
                b(c).find(".hq-photo-prev").removeClass("hq-photo-prev-dis");
            }
        }
        a();
    }
    function a() {
        var m = "";
        if (e.description && b.isFunction(e.description)) {
            m = e.description(e.activeNum, e.photoArr);
        }
        b(c).find(".hq-photo-total").text(m);
        g(e.photoArr[e.activeNum - 1].src, false);
        b(c).find(".hq-photo-view-next").find(".hq-pic").attr("src", e.photoArr[e.activeNum - 1].src);
    }
    function l() {
        b(c).find(".hq-photo-view-cur").fadeOut();
        b(c).find(".hq-photo-view-next").fadeIn(function() {
            b(c).find(".hq-photo-view").each(function() {
                if (b(this).hasClass("hq-photo-view-cur")) {
                    b(this).removeClass("hq-photo-view-cur").addClass("hq-photo-view-next");
                    return;
                }
                if (b(this).hasClass("hq-photo-view-next")) {
                    b(this).removeClass("hq-photo-view-next").addClass("hq-photo-view-cur");
                    return;
                }
            });
        });
    }
    function g(s, r) {
        var m = b(c).find(".hq-photo-inner").width();
        var p = b(c).find(".hq-photo-inner").height();
        var q = new Image();
        var n = {
            w: 0,
            h: 0
        };
        var o = r === true ? b(c).find(".hq-photo-view-cur") : b(c).find(".hq-photo-view-next");
        q.onload = function() {
            n.w = q.width;
            n.h = q.height;
            if (n.w > m || n.h > p) {
                if (n.w / n.h > m / p) {
                    o.find(".hq-pic").css({
                        width: "100%",
                        height: "auto"
                    });
                } else {
                    o.find(".hq-pic").css({
                        width: "auto",
                        height: "100%"
                    });
                }
            } else {
                o.find(".hq-pic").css({
                    width: "auto",
                    height: "auto"
                });
            }
            if (!r) {
                l();
            }
        }
        ;
        q.src = s;
    }
    function k() {
        b(c).remove();
    }
})(jQuery);

$(function(){
	$("#hsPhotos").on("click", "a", function() {
		var r = $(this);
		var p = r.parent();
		var n = r.parent().parent();
		var q = [];
		var o;
		n.find("img").each(function() {
			q.push({
				src: $(this).attr("data-src"),
				type: $(this).attr("data-type")
			});
		});
		o = r.children().attr("data-active");
		$.mfangLightbox({
			photoArr: q,
			activeNum: o,
			description: function(t, s) {
				return t + "/共" + s.length + "张" + "（" + s[t - 1].type + "）";
			},
			firstTipsFun: function() {
				layer.msg("此照片已经是第一张哦",{time:1000});
			},
			lastTipsFun: function() {
				layer.msg("此照片已经是最后一张哦",{time:1000});
			}
		});
	});
	
	$("#hsPics").on("click", "a", function() {
        var r = $(this);
        var p = r.parent();
        var n = r.parent().parent();
        var q = [];
        var o;
        n.find("img").each(function() {
            q.push({
                src: $(this).attr("data-src")
            });
        });
        o = r.children().attr("data-active");
        $.mfangLightbox({
            photoArr: q,
            activeNum: o,
            description: function(t, s) {
                return t + "/共" + s.length + "张";
            },
            firstTipsFun: function() {
                layer.msg("此照片已经是第一张哦",{time:1000});
            },
            lastTipsFun: function() {
                layer.msg("此照片已经是最后一张哦",{time:1000});
            }
        });
    });
});