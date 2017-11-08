var MyPoi = function(c, a, d, b, e) {
    this.poiIndex = c;
    this.point = a;
    this.title = d;
    this.address = b;
    this.distance = e;
    this.id = "_" + a.lat + "_" + a.lng;
};
nearFacilityMap = {
    _map: null ,
    _localSearch: null ,
    _bounds: null ,
    gardenPoint: null ,
    mapDiv: "mapDiv",
    showDataDiv: "msl",
    pageSize: 10,
    zoom: 15,
    distance: 1000,
    initPanoramaed: false,
    _panorama: null ,
    loadingDiv: '<p class="map-surrounding-loading" >' + '<img src="'+ base +'images/loading-map.gif" width="32" height="32">' + "<span>努力加载中...</span>" + "</p>",
    noResultDiv: '<div class="no-data-wrap">' + '<i class="icons-qdoll icons-qdoll-empty ie6_pngbg"></i>' + '<div class="no-data-txt">' + '<p class="no-data-titsml">对不起，暂无数据</p>' + "</div>" + "</div>",
    init: function() {
        //给出经纬度，就实例化地图
        if (longitude && latitude && longitude > 0 && latitude > 0) {
            nearFacilityMap.gardenPoint = new BMap.Point(longitude,latitude);
        }
        //否则退出
        if (!nearFacilityMap.gardenPoint) {
            return;
        }
        nearFacilityMap.loadBaiMap();
        $("#mapFuncsTbs").on("click", "a", function() {
            $(this).addClass("cur").siblings().removeClass("cur");
            nearFacilityMap.searchPOI();
        });
        nearFacilityMap.searchPOI();
    },
    loadBaiMap: function() {
        _map = new BMap.Map(nearFacilityMap.mapDiv,{
            enableMapClick: false
        });
        if (typeof (houseCompare) == "undefined" || !houseCompare) {
            _map.disableScrollWheelZoom();
        }
        nearFacilityMap._map = _map;
        if (nearFacilityMap.gardenPoint) {
            _map.centerAndZoom(nearFacilityMap.gardenPoint, nearFacilityMap.zoom);
        } else {
            _map.centerAndZoom(city, nearFacilityMap.zoom);
        }
        _localSearch = new BMap.LocalSearch(_map,{
            pageCapacity: nearFacilityMap.pageSize,
            onSearchComplete: nearFacilityMap.baiduSearchCompleteCallback
        });
        nearFacilityMap.initZoom();
    },
    initZoom: function() {
        $("#map-side-btns").find(".zoom-in-out ").removeClass("zoom-dis");
        _map.addEventListener("zoomend", function() {
            var a = _map.getZoom();
            console.log(a);
            $("#map-side-btns").find(".zoom-in-out").removeClass("zoom-dis");
            if (a == 3) {
                $("#map-side-btns").find('.zoom-in-out[type="smaller"]').addClass("zoom-dis");
            } else {
                if (a == 19) {
                    $("#map-side-btns").find('.zoom-in-out[type="bigger"]').addClass("zoom-dis");
                }
            }
        });
        if (nearFacilityMap.initZoomed) {
            return;
        }
        $("#map-side-btns").on("click", ".zoom-in-out", function() {
            var c = null ;
            var b = nearFacilityMap._map.getZoom();
            var a = $(this).attr("type");
            if (a == "bigger") {
                b++;
            } else {
                b--;
            }
            nearFacilityMap._map.setZoom(b);
        });
        nearFacilityMap.initZoomed = true;
    },
    initPanorama: function() {
        $("#panromaTab").bind("click", function() {
            $("#mapPoiBox").hide();
            $(this).addClass("cur").siblings().removeClass("cur");
            nearFacilityMap.showPanorama();
            $("#panoramaBox").show();
        });
        $("#mapPoiTab").bind("click", function() {
            $("#panoramaBox").hide();
            $("#mapPoiBox").show();
            $(this).addClass("cur").siblings().removeClass("cur");
            nearFacilityMap.loadBaiMap();
            nearFacilityMap.searchPOI();
        });
        nearFacilityMap.showPanorama();
        nearFacilityMap.initFulleScreen();
    },
    initFulleScreen: function() {
        var e = false;
        var f = false;
        var c = false;
        $(".full-screen-btn").on("click", function() {
            var h = $("#switchMap b.cur");
            g(h);
            if ($(this).hasClass("default-screen-btn")) {
                $(".full-screen-btn").removeClass("default-screen-btn");
                f = false;
                nearFacilityMap.fullScreen = false;
                a();
            } else {
                $(".full-screen-btn").addClass("default-screen-btn");
                f = true;
                nearFacilityMap.fullScreen = true;
                b();
            }
        });
        $("#fullScreenMapClose").on("click", function() {
            var h = $("#switchMap b.cur");
            g(h);
            f = false;
            nearFacilityMap.fullScreen = false;
            a();
        });
        function g(i) {
            var h = i.data("type");
            if (h == "panoramic-map") {
                c = true;
            } else {
                c = false;
            }
        }
        function b() {
            $("#fullScreenMapWrap").append($("#miniMap"));
            layer.open({
                type:1,
                skin:'popup-class',
                title:'周边配套',
                area: '90%',
                content: $("#fullScreenMap"),
                success:function(layero){
                    $("#mapWapper").appendTo($("#fullScreenMapWrap"));
                    $("#msb,.map-surrounding-layer,#msl").css({"height":$(window).height()-60});
                    $("#msb,.map-surrounding-layer").css({"width":$("#fullScreenMapWrap").width()-$("#msl").width()-5});
                    window.setTimeout(function(){
                        $(".layui-layer").css("top","10px");
                    },100);
                    nearFacilityMap.loadBaiMap();
                    nearFacilityMap.searchPOI();
                },
                end:function(){
                    a();
                }
            });
        }
        function a() {
            $("#surroundingMap").append($("#miniMap"));
            $('[data-type="full-screen"]').removeClass("default-screen-btn");
            layer.closeAll();
            $("html, body").animate({
                scrollTop: $("#scrollto-3").offset().top - $("#anchorNav").outerHeight()
            }, 1);
            $("#mapWapper").appendTo($(".baidumap_box"));
            $("#msb,.map-surrounding-layer,#msl").css({"height":"380px"});
            $("#msb,.map-surrounding-layer").width("688px");
            nearFacilityMap.loadBaiMap();
            nearFacilityMap.searchPOI();
        }
        $(window).on("resize", function() {
            if (!e && $('[data-type="full-screen"]').hasClass("default-screen-btn")) {
                e = true;
                setTimeout(function() {
                    $("#msb,.map-surrounding-layer,#msl").css({"height":$(window).height()-60});
                    $("#msb,.map-surrounding-layer").css({"width":$("#fullScreenMapWrap").width()-$("#msl").width()-5});
                    e = false;
                }, 100);
            }
        });
    },
    showPanorama: function() {
        if (nearFacilityMap.initPanoramaed) {
            return;
        }
        var a = new BMap.PanoramaService();
        a.getPanoramaByLocation(nearFacilityMap.gardenPoint, function(c) {
            var b = "";
            if (c == null ) {
                $("#panromaTab").hide();
                $("#panoramaBox").hide();
                return;
            }
            nearFacilityMap._panorama = new BMap.Panorama("panorama");
            nearFacilityMap._panorama.setPosition(nearFacilityMap.gardenPoint);
            nearFacilityMap._panorama.disableScrollWheelZoom();
        });
        nearFacilityMap.initPanoramaed = true;
    },
    searchPOI: function() {
        nearFacilityMap.clearResult();
        nearFacilityMap.showGardenOverlay();
        nearFacilityMap.showCircleOverlay(true);
        nearFacilityMap.loading();
        nearFacilityMap.searchInBounds();
    },
    searchInBounds: function() {
        //var a = ctx + "/garden/ipoi/" + gardenId;
        var a = "";
        var b = {
            types: $("#mapFuncsTbs a[class='cur']").attr("types"),
            distance: nearFacilityMap.distance
        };
        $.ajax({
            url: a,
            type: "POST",
            dataType: "JSON",
            data: b,
            success: nearFacilityMap.mfangSearchCompleteCallback,
            error: function(e) {
                var c = new Array();
                var d = $("#mapFuncsTbs a[class='cur']").attr("keyText");
                if (d) {
                    c = d.split(",");
                }
                _localSearch.searchInBounds(c, _bounds);
            }
        });
    },
    barduSearchInBounds: function() {
        var a = new Array();
        var b = $("#mapFuncsTbs a[class='cur']").attr("keyText");
        if (b) {
            a = b.split(",");
        }
        _localSearch.searchInBounds(a, _bounds);
    },
    getKeyword: function(a) {
        var b = {
            "BUS": "公交站",
            "METRO": "地铁站",
            "HOSPITAL": "医院",
            "PHARMACY": "药店",
            "FACTORY": "工厂",
            "GAS_STATION": "加油站",
            "AIRPORT": "飞机场",
            "CEMETERY": "墓地陵园",
            "PARK": "公园",
            "SUPERMARKET": "超市",
            "MALL": "商场",
            "CONVENIENCE_STORE": "便利店",
            "ATM": "ATM",
            "BANK": "银行",
            "RESTAURANT": "餐馆",
            "HOTEL": "酒店",
            "KTV": "KTV",
            "CAFE": "咖啡厅",
            "KINDERGARTEN": "幼儿园",
            "PRIMARY_SCHOOL": "小学",
            "JUNIOR_SCHOOL": "初中",
            "MIDDLE_SCHOOL": "高中",
            "UNIVERSITY": "大学",
            "SPECIAL_SCHOOL": "特殊学校"
        };
        return b[a];
    },
    mfangSearchCompleteCallback: function(e) {
        if (e && e.ret == "1") {
            nearFacilityMap.clearPoiData();
            var l = 0;
            for (var j in e) {
                var h = nearFacilityMap.getKeyword(j);
                var g = new Array();
                for (var f = 0; f < e[j].length; f++) {
                    if (f >= 10) {
                        break;
                    }
                    var c = e[j][f];
                    var m = new BMap.Point(c.lng,c.lat);
                    var a = Math.floor(_map.getDistance(nearFacilityMap.gardenPoint, m), 0);
                    if (a > nearFacilityMap.distance) {
                        continue;
                    }
                    var b = new MyPoi(0,m,c.name,c.address,a);
                    g.push(b);
                }
                if (g.length > 0) {
                    g.sort(function(k, i) {
                        return k.distance - i.distance;
                    });
                    for (var d = 0; d < g.length; d++) {
                        l++;
                        g[d].id = l + g[d].id;
                        g[d].poiIndex = l;
                    }
                    nearFacilityMap.showPoiOverlay(g);
                    nearFacilityMap.showPoiData(h, g);
                }
            }
            if (l == 0) {
                nearFacilityMap.barduSearchInBounds();
            }
        } else {
            nearFacilityMap.barduSearchInBounds();
        }
    },
    baiduSearchCompleteCallback: function(g) {
        if (_localSearch.getStatus() != BMAP_STATUS_SUCCESS) {
            nearFacilityMap.noResult();
            return;
        }
        if (g && g.length > 0) {
            nearFacilityMap.clearPoiData();
            var m = 0;
            for (var f = 0; f < g.length; f++) {
                var l = g[f].keyword;
                var h = new Array();
                for (var e = 0; e < g[f].getCurrentNumPois(); e++) {
                    var c = g[f].getPoi(e);
                    var a = Math.floor(_map.getDistance(nearFacilityMap.gardenPoint, c.point), 0);
                    if (a > nearFacilityMap.distance) {
                        continue;
                    }
                    var b = new MyPoi(0,c.point,c.title,c.address,a);
                    h.push(b);
                }
                h.sort(function(j, i) {
                    return j.distance - i.distance;
                });
                if (h.length > 0) {
                    for (var d = 0; d < h.length; d++) {
                        m++;
                        h[d].id = m + h[d].id;
                        h[d].poiIndex = m;
                    }
                    nearFacilityMap.showPoiOverlay(h);
                    nearFacilityMap.showPoiData(l, h);
                }
            }
            if (m == 0) {
                nearFacilityMap.noResult();
            }
        } else {
            nearFacilityMap.noResult();
        }
    },
    showPoiOverlay: function(d) {
        if (d && d.length > 0) {
            for (var b = 0; b < d.length; b++) {
                var e = d[b];
                var c = '<div class="crt-coordinates" data-myId="coordinates' + e.id + '" divType="poiMarker" onclick="nearFacilityMap.clickPoiOverlay(this)"><span class="data">' + e.poiIndex + '</span><i class="shadow"></i></div>';
                var a = new BMapLib.RichMarker(c,e.point);
                _map.addOverlay(a);
            }
            $("#mapDiv").find('div[divType="poiMarker"]').parent().css("background", "none");
        }
    },
    showPoiData: function(a, c) {
        if (a && c && c.length > 0) {
            var e = '<div class="map-funcs-item clearfix">' + '<p class="title-big">' + a + "</p>";
            for (var b = 0; b < c.length; b++) {
                var d = c[b];
                e += '<div class="map-funcs-item-con clearfix" data-id="' + d.id + '" id="mfic' + d.id + '" onclick="nearFacilityMap.clickPoiData(this)">';
                e += '<i class="map-funcs-snumber lfloat">' + d.poiIndex + "</i>";
                e += '<div class="map-funcs-con lfloat">';
                e += '<p class="map-funcs-con-header clearfix">';
                e += '<span class="title lfloat">' + d.title + "</span>";
                e += '<span class="distance rfloat">' + d.distance + "米</span>";
                e += "</p>";
                e += '<p class="map-funcs-con-main">' + d.address + "</p>";
                e += "</div>";
                e += "</div>";
            }
            e += "</div>";
            $("#" + nearFacilityMap.showDataDiv).append(e);
        }
    },
    clickPoiData: function(b) {
        if (!$(b).hasClass("mfic-active")) {
            $(b).addClass("mfic-active").siblings().removeClass("mfic-active").parent().siblings().find(".map-funcs-item-con").removeClass("mfic-active");
            var a = "coordinates" + $(b).attr("data-id");
            $("#mapDiv").find("div .crt-coordinates-active").removeClass("crt-coordinates-active");
            $("#mapDiv").find('div[data-myId="' + a + '"]').addClass("crt-coordinates-active");
            $("#mapDiv").find('div[divType="poiMarker"]').parent().css("z-index", "0");
            $("#mapDiv").find('div[data-myId="' + a + '"]').parent().css("z-index", "1");
            _map.setZoom(nearFacilityMap.zoom);
            _map.setCenter(nearFacilityMap.gardenPoint);
        }
    },
    clickPoiOverlay: function(b) {
        $("#mapDiv").find("div .crt-coordinates-active").removeClass("crt-coordinates-active");
        $(b).addClass("crt-coordinates-active");
        $("#mapDiv").find('div[divType="poiMarker"]').parent().css("z-index", "0");
        $(b).parent().css("z-index", "1");
        var a = $(b).attr("data-myId").replace("coordinates", "");
        $("#msl").find('div[data-id="' + a + '"]').addClass("mfic-active").siblings().removeClass("mfic-active").parent().siblings().find(".map-funcs-item-con").removeClass("mfic-active");
        nearFacilityMap.checkVisible(a);
    },
    checkVisible: function(e) {
        var d = 0;
        var a = 380;
        var h = $("#msl").find('div[data-id="' + e + '"]');
        var c = $("#msl").scrollTop();
        var g = h.offset().top + c - $("#msl").offset().top;
        var b = c > g;
        var f = a + c < g + h.outerHeight(true);
        if (f) {
            d = g + h.outerHeight(true) - a;
            $("#msl").animate({
                scrollTop: d
            });
        } else {
            if (b) {
                d = g;
                $("#msl").animate({
                    scrollTop: d
                });
            }
        }
    },
    showGardenOverlay: function() {
        if (nearFacilityMap.gardenPoint && gardenName) {
            var a = '<p class="crt-building" style="position:absolute; left:-35px; top:-10px;">' + gardenName + '<i class="arrow"></i></p>';
            var b = new BMapLib.RichMarker(a,nearFacilityMap.gardenPoint);
            _map.addOverlay(b);
        }
    },
    showCircleOverlay: function(a) {
        var d = new BMap.Circle(nearFacilityMap.gardenPoint,nearFacilityMap.distance,{
            strokeWeight: 2,
            fillOpacity: 0.3,
            strokeOpacity: 0.3
        });
        var c = {
            position: new BMap.Point(nearFacilityMap.gardenPoint.lng,parseFloat(nearFacilityMap.gardenPoint.lat) + 0.0093)
        };
        var b = new BMap.Label("1km",c);
        b.setStyle({
            color: "green",
            fontSize: "12px",
            height: "20px",
            width: "30px",
            textAlign: "center",
            lineHeight: "20px",
            border: "1px solid green",
            fontFamily: "微软雅黑"
        });
        if (a) {
            _map.addOverlay(d);
            _map.addOverlay(b);
        }
        _bounds = nearFacilityMap.getSquareBounds(d.getCenter(), d.getRadius());
    },
    loading: function() {
        $("#" + nearFacilityMap.showDataDiv).html(nearFacilityMap.loadingDiv);
    },
    clearResult: function() {
        _map.clearOverlays();
        _map.setZoom(nearFacilityMap.zoom);
        _map.setCenter(nearFacilityMap.gardenPoint);
        nearFacilityMap.clearPoiData();
    },
    clearPoiData: function() {
        $("#" + nearFacilityMap.showDataDiv).empty();
    },
    noResult: function() {
        $("#" + nearFacilityMap.showDataDiv).html(nearFacilityMap.noResultDiv);
    },
    getSquareBounds: function(g, b) {
        var k = Math.sqrt(2) * b;
        var i = nearFacilityMap.getMecator(g);
        var e = i.x
            , m = i.y;
        var d = e + k / 2
            , j = m + k / 2;
        var c = e - k / 2
            , h = m - k / 2;
        var f = nearFacilityMap.getPoi(new BMap.Pixel(d,j))
            , l = nearFacilityMap.getPoi(new BMap.Pixel(c,h));
        return new BMap.Bounds(l,f);
    },
    getMecator: function(a) {
        return _map.getMapType().getProjection().lngLatToPoint(a);
    },
    getPoi: function(a) {
        return _map.getMapType().getProjection().pointToLngLat(a);
    }
};
$(function() {
	if($("#mapWapper").length){
		if (typeof (pageStyle) != "undefined" && pageStyle == "new") {
			$("#msb,#mapDiv").css({
				"width": 878
			});
		}
		if (typeof (houseCompare) == "undefined" || !houseCompare) {
			nearFacilityMap.init();
			nearFacilityMap.initPanorama();
		}
	}
});
