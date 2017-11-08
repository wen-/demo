(function(b) {
    var a = {
        init: function(c) {
            settings = b.extend({
                height: 50,
                width: 50,
                initial: false,
                easing: "swing",
                duration: "fast"
            }, c);
            b(this).data("settings", settings);
            return this.each(function() {
                var g = b(this)
                    , f = settings.initial ? settings.initial : g.html()
                    , e = f.toString().split("")
                    , d = "";
                var surplus,s_l = e.length,s_s;
                if(s_l > 3){
                    s_s = true;
                    surplus = s_l%3;
                }
                b.each(e, function(h, k) {
                    if (b.isNumeric(k)) {
                        d += '<ul><li style="top:-' + (k * settings.height) + 'px">';
                        for (var j = 0; j < 10; j++) {
                            d += "<span>" + j + "</span>"
                        }
                        d += "</li></ul>";
                        settings.s&&s_s?d += (((h+1-surplus)%3==0)&&(h+1!=s_l)?",":""):"";
                    } else {
                        d += "<ul><li><span>" + k + "</span></li></ul>"
                        settings.s&&s_s?d += (((h+1-surplus)%3==0)&&(h+1!=s_l)?",":""):"";
                    }
                });
                g.html(d);
                a.updateCss.call(g, settings)
            })
        },
        updateCss: function(c) {
            return this.each(function() {
                var d = b(this);
                d.css({
                    overflow: "hidden"
                });
                b("ul", d).css({
                    position: "relative",
                    "float": "left",
                    overflow: "hidden",
                    height: c.height + "px",
                    width: c.width + "px",
                    "line-height": c.height + "px"
                });
                b("li", d).css({
                    position: "absolute",
                    width: c.width + "px"
                });
                b("span", d).css({
                    display: "block",
                    "text-align": "center",
                    height: c.height + "px",
                    width: c.width + "px"
                })
            })
        },
        update: function(c) {
            return this.each(function() {
                var k = b(this), h = c.toString().split(""), f = b("ul", k).length, g = b(this).data("settings"), j, e;
                if (f !== h.length) {
                    j = h.length - f;
                    f = h.length;
                    if (j < 0) {
                        b("ul", k).slice(j).remove()
                    } else {
                        e = "";
                        while (j--) {
                            e += "<ul><li>";
                            for (var d = 0; d < 10; d++) {
                                e += "<span>" + d + "</span>"
                            }
                            e += "</li></ul>";
                        }
                        k.prepend(e)
                    }

                    var surplus,s_l = b("ul", k).length,s_s,tt=[];
                    if(s_l > 3){
                        s_s = true;
                        surplus = s_l%3;
                    }
                    b.each(b("ul", k),function(ii,nn){
                        tt.push(nn.outerHTML);
                        settings.s&&s_s?tt.push((((ii+1-surplus)%3==0)&&(ii+1!=s_l)?",":"")):"";
                    });
                    k.html(tt.join(''));
                }
                b.each(h, function(l, o) {
                    var n = "";
                    if (g.duration === 0) {
                        b("ul:nth-child(" + (l + 1) + ") li", k).html("<span>" + o + "</span>").css({
                            top: 0
                        });
                        return
                    }
                    if (b.isNumeric(o)) {
                        if (b("ul:nth-child(" + (l + 1) + ") li span", k).length == 1) {
                            for (var m = 0; m < 10; m++) {
                                n += "<span>" + m + "</span>"
                            }
                            b("ul:nth-child(" + (l + 1) + ") li", k).html(n)
                        }
                        b("ul:nth-child(" + (l + 1) + ") li", k).animate({
                            top: -o * g.height
                        }, g.duration, g.easing)
                    } else {
                        b("ul:nth-child(" + (l + 1) + ") li", k).html("<span>" + o + "</span>").animate({
                            top: 0
                        }, g.duration, g.easing)
                    }
                });
                a.updateCss.call(k, g)
            })
        }
    };
    b.fn.kCounter = function(c) {
        if (a[c]) {
            return a[c].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof c === "object" || !c) {
                return a.init.apply(this, arguments)
            } else {
                b.error("Method " + c + " does not exist on jQuery.kCounter")
            }
        }
    }
})(jQuery);
