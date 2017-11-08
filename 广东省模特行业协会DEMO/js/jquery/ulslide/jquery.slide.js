// JavaScript Document
 var model = {
    $: function(objName) {
        if (document.getElementById) {
            return eval('document.getElementById("' + objName + '")')
        } else {
            return eval('document.all.' + objName)
        }
    },
    isIE: navigator.appVersion.indexOf("MSIE") != -1 ? true: false,
    addEvent: function(obj, eventType, func) {
        if (obj.attachEvent) {
            obj.attachEvent("on" + eventType, func)
        } else {
            obj.addEventListener(eventType, func, false)
        }
    },
    delEvent: function(obj, eventType, func) {
        if (obj.detachEvent) {
            obj.detachEvent("on" + eventType, func)
        } else {
            obj.removeEventListener(eventType, func, false)
        }
    },
    readCookie: function(l) {
        var i = "",
        I = l + "=";
        if (document.cookie.length > 0) {
            var offset = document.cookie.indexOf(I);
            if (offset != -1) {
                offset += I.length;
                var end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                i = unescape(document.cookie.substring(offset, end))
            }
        };
        return i
    },
    writeCookie: function(O, o, l, I) {
        var i = "",
        c = "";
        if (l != null) {
            i = new Date((new Date).getTime() + l * 3600000);
            i = "; expires=" + i.toGMTString()
        };
        if (I != null) {
            c = ";domain=" + I
        };
        document.cookie = O + "=" + escape(o) + i + c
    },
    readStyle: function(i, I) {
        if (i.style[I]) {
            return i.style[I]
        } else if (i.currentStyle) {
            return i.currentStyle[I]
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            var l = document.defaultView.getComputedStyle(i, null);
            return l.getPropertyValue(I)
        } else {
            return null
        }
    }
};
function ScrollPic(scrollContId, arrLeftId, arrRightId, dotListId, listType) {
    this.scrollContId = scrollContId;
    this.arrLeftId = arrLeftId;
    this.arrRightId = arrRightId;
    this.dotListId = dotListId;
    this.listType = listType;
    this.dotClassName = "dotItem";
    this.dotOnClassName = "dotItemOn";
    this.dotObjArr = [];
    this.listEvent = "onclick";
    this.circularly = true;
    this.pageWidth = 0;
    this.frameWidth = 0;
    this.speed = 10;
    this.space = 10;
    this.upright = false;
    this.pageIndex = 0;
    this.autoPlay = true;
    this.autoPlayTime = 5;
    this._autoTimeObj;
    this._scrollTimeObj;
    this._state = "ready";
    this.stripDiv = document.createElement("div");
    this.lDiv01 = document.createElement("div");
    this.lDiv02 = document.createElement("div")
};
ScrollPic.prototype = {
    version: " ",
    author: " ",
    pageLength: 0,
    initialize: function() {
        var thisTemp = this;
        if (!this.scrollContId) {
            throw new Error("必须指定scrollContId.");
            return
        };
        this.scDiv = model.$(this.scrollContId);
        if (!this.scDiv) {
            throw new Error("scrollContId不是正确的对象.(scrollContId = \"" + this.scrollContId + "\")");
            return
        };
        this.scDiv.style[this.upright ? 'height': 'width'] = this.frameWidth*6 + "px";//*6是用来显示图片的个数，在自动播放时一张一张播放，避免一组一组轮换,当图片很多时可一组轮播则把*6去除，在下面的参数设置里自行调整。
        this.scDiv.style.overflow = "hidden";
        this.lDiv01.innerHTML = this.scDiv.innerHTML;
        this.scDiv.innerHTML = "";
        this.scDiv.appendChild(this.stripDiv);
        this.stripDiv.appendChild(this.lDiv01);
        if (this.circularly) {
            this.stripDiv.appendChild(this.lDiv02);
            this.lDiv02.innerHTML = this.lDiv01.innerHTML
        };
        this.stripDiv.style.overflow = "hidden";
        this.stripDiv.style.zoom = "1";
        this.stripDiv.style[this.upright ? 'height': 'width'] = "32766px";
        if (!this.upright) {
            this.lDiv01.style.cssFloat = "left";
            this.lDiv01.style.styleFloat = "left";
            this.lDiv01.style.overflow = "hidden"
        };
        this.lDiv01.style.zoom = "1";
        if (this.circularly && !this.upright) {
            this.lDiv02.style.cssFloat = "left";
            this.lDiv02.style.styleFloat = "left";
            this.lDiv02.style.overflow = "hidden"
        };
        this.lDiv02.style.zoom = "1";
        model.addEvent(this.scDiv, "mouseover",
        function() {
            thisTemp.stop()
        });
        model.addEvent(this.scDiv, "mouseout",
        function() {
            thisTemp.play()
        });
        if (this.arrLeftId) {
            this.alObj = model.$(this.arrLeftId);
            if (this.alObj) {
                model.addEvent(this.alObj, "mousedown",
                function() {
                    thisTemp.rightMouseDown()
                });
                model.addEvent(this.alObj, "mouseup",
                function() {
                    thisTemp.rightEnd()
                });
                model.addEvent(this.alObj, "mouseout",
                function() {
                    thisTemp.rightEnd()
                })
            }
        };
        if (this.arrRightId) {
            this.arObj = model.$(this.arrRightId);
            if (this.arObj) {
                model.addEvent(this.arObj, "mousedown",
                function() {
                    thisTemp.leftMouseDown()
                });
                model.addEvent(this.arObj, "mouseup",
                function() {
                    thisTemp.leftEnd()
                });
                model.addEvent(this.arObj, "mouseout",
                function() {
                    thisTemp.leftEnd()
                })
            }
        };
        var pages = Math.ceil(this.lDiv01[this.upright ? 'offsetHeight': 'offsetWidth'] / this.frameWidth),
        i,
        tempObj;
        this.pageLength = pages;
        if (this.dotListId) {
            this.dotListObj = model.$(this.dotListId);
            this.dotListObj.innerHTML = "";
            if (this.dotListObj) {
                for (i = 0; i < pages; i++) {
                    tempObj = document.createElement("span");
                    this.dotListObj.appendChild(tempObj);
                    this.dotObjArr.push(tempObj);
                    if (i == this.pageIndex) {
                        tempObj.className = this.dotOnClassName
                    } else {
                        tempObj.className = this.dotClassName
                    };
                    if (this.listType == 'number') {
                        tempObj.innerHTML = i + 1
                    } else if (this.listType !== '') {
                        tempObj.innerHTML = this.listType
                    };
                    tempObj.title = "";//"第" + (i + 1) + "页";－－－－－－－－－－－要显示标签就释放这个
                    tempObj.num = i;
                    tempObj[this.listEvent] = function() {
                        thisTemp.pageTo(this.num)
                    }
                }
            }
        };
        this.scDiv[this.upright ? 'scrollTop': 'scrollLeft'] = 0;
        if (this.autoPlay) {
            this.play()
        };
        this._scroll = this.upright ? 'scrollTop': 'scrollLeft';
        this._sWidth = this.upright ? 'scrollHeight': 'scrollWidth';
        if (typeof(this.onpagechange) === 'function') {
            this.onpagechange()
        };
        this.iPad()
    },
    leftMouseDown: function() {
        if (this._state != "ready") {
            return
        };
        var thisTemp = this;
        this._state = "floating";
        this._scrollTimeObj = setInterval(function() {
            thisTemp.moveLeft()
        },
        this.speed)
    },
    rightMouseDown: function() {
        if (this._state != "ready") {
            return
        };
        var thisTemp = this;
        this._state = "floating";
        this._scrollTimeObj = setInterval(function() {
            thisTemp.moveRight()
        },
        this.speed)
    },
    moveLeft: function() {
        if (this.circularly) {
            if (this.scDiv[this._scroll] + this.space >= this.lDiv01[this._sWidth]) {
                this.scDiv[this._scroll] = this.scDiv[this._scroll] + this.space - this.lDiv01[this._sWidth]
            } else {
                this.scDiv[this._scroll] += this.space
            }
        } else {
            if (this.scDiv[this._scroll] + this.space >= this.lDiv01[this._sWidth] - this.frameWidth) {
                this.scDiv[this._scroll] = this.lDiv01[this._sWidth] - this.frameWidth;
                this.leftEnd()
            } else {
                this.scDiv[this._scroll] += this.space
            }
        };
        this.accountPageIndex()
    },
    moveRight: function() {
        if (this.circularly) {
            if (this.scDiv[this._scroll] - this.space <= 0) {
                this.scDiv[this._scroll] = this.lDiv01[this._sWidth] + this.scDiv[this._scroll] - this.space
            } else {
                this.scDiv[this._scroll] -= this.space
            }
        } else {
            if (this.scDiv[this._scroll] - this.space <= 0) {
                this.scDiv[this._scroll] = 0;
                this.rightEnd()
            } else {
                this.scDiv[this._scroll] -= this.space
            }
        };
        this.accountPageIndex()
    },
    leftEnd: function() {
        if (this._state != "floating") {
            return
        };
        this._state = "stoping";
        clearInterval(this._scrollTimeObj);
        var fill = this.pageWidth - this.scDiv[this._scroll] % this.pageWidth;
        this.move(fill)
    },
    rightEnd: function() {
        if (this._state != "floating") {
            return
        };
        this._state = "stoping";
        clearInterval(this._scrollTimeObj);
        var fill = -this.scDiv[this._scroll] % this.pageWidth;
        this.move(fill)
    },
    move: function(num, quick) {
        var thisTemp = this;
        var thisMove = num / 5;
        if (!quick) {
            if (thisMove > this.space) {
                thisMove = this.space
            };
            if (thisMove < -this.space) {
                thisMove = -this.space
            }
        };
        if (Math.abs(thisMove) < 1 && thisMove != 0) {
            thisMove = thisMove >= 0 ? 1 : -1
        } else {
            thisMove = Math.round(thisMove)
        };
        var temp = this.scDiv[this._scroll] + thisMove;
        if (thisMove > 0) {
            if (this.circularly) {
                if (this.scDiv[this._scroll] + thisMove >= this.lDiv01[this._sWidth]) {
                    this.scDiv[this._scroll] = this.scDiv[this._scroll] + thisMove - this.lDiv01[this._sWidth]
                } else {
                    this.scDiv[this._scroll] += thisMove
                }
            } else {
                if (this.scDiv[this._scroll] + thisMove >= this.lDiv01[this._sWidth] - this.frameWidth) {
                    this.scDiv[this._scroll] = this.lDiv01[this._sWidth] - this.frameWidth;
                    this._state = "ready";
                    return
                } else {
                    this.scDiv[this._scroll] += thisMove
                }
            }
        } else {
            if (this.circularly) {
                if (this.scDiv[this._scroll] + thisMove < 0) {
                    this.scDiv[this._scroll] = this.lDiv01[this._sWidth] + this.scDiv[this._scroll] + thisMove
                } else {
                    this.scDiv[this._scroll] += thisMove
                }
            } else {
                if (this.scDiv[this._scroll] - thisMove < 0) {
                    this.scDiv[this._scroll] = 0;
                    this._state = "ready";
                    return
                } else {
                    this.scDiv[this._scroll] += thisMove
                }
            }
        };
        num -= thisMove;
        if (Math.abs(num) == 0) {
            this._state = "ready";
            if (this.autoPlay) {
                this.play()
            };
            this.accountPageIndex();
            return
        } else {
            this.accountPageIndex();
            this._scrollTimeObj = setTimeout(function() {
                thisTemp.move(num, quick)
            },
            this.speed)
        }
    },
    pre: function() {
        if (this._state != "ready") {
            return
        };
        this._state = "stoping";
        this.pageTo(this.pageIndex - 1)
    },
    next: function(reStar) {
        if (this._state != "ready") {
            return
        };
        this._state = "stoping";
        if (this.circularly) {
            this.pageTo(this.pageIndex + 1)
        } else {
            if (this.scDiv[this._scroll] >= this.lDiv01[this._sWidth] - this.frameWidth) {
                this._state = "ready";
                if (reStar) {
                    this.pageTo(0)
                }
            } else {
                this.pageTo(this.pageIndex + 1)
            }
        }
    },
    play: function() {
        var thisTemp = this;
        if (!this.autoPlay) {
            return
        };
        clearInterval(this._autoTimeObj);
        this._autoTimeObj = setInterval(function() {
            thisTemp.next(true)
        },
        this.autoPlayTime * 1000)
    },
    stop: function() {
        clearInterval(this._autoTimeObj)
    },
    pageTo: function(num) {
        if (this.pageIndex == num) {
            return
        };
        if (num < 0) {
            num = this.pageLength - 1
        };
        clearTimeout(this._scrollTimeObj);
        this._state = "stoping";
        var fill = num * this.frameWidth - this.scDiv[this._scroll];
        this.move(fill, true)
    },
    accountPageIndex: function() {
        var pageIndex = Math.floor(this.scDiv[this._scroll] / this.frameWidth);
        if (pageIndex == this.pageIndex) {
            return
        };
        this.pageIndex = pageIndex;
        if (this.pageIndex > Math.floor(this.lDiv01[this.upright ? 'offsetHeight': 'offsetWidth'] / this.frameWidth)) {
            this.pageIndex = 0
        };
        var i;
        for (i = 0; i < this.dotObjArr.length; i++) {
            if (i == this.pageIndex) {
                this.dotObjArr[i].className = this.dotOnClassName
            } else {
                this.dotObjArr[i].className = this.dotClassName
            }
        };
        if (typeof(this.onpagechange) === 'function') {
            this.onpagechange()
        }
    },
    iPadX: 0,
    iPadLastX: 0,
    iPadStatus: 'ok',
    iPad: function() {
        if (typeof(window.ontouchstart) === 'undefined') {
            return
        };
        var tempThis = this;
        model.addEvent(this.scDiv, 'touchstart',
        function(e) {
            tempThis._touchstart(e)
        });
        model.addEvent(this.scDiv, 'touchmove',
        function(e) {
            tempThis._touchmove(e)
        });
        model.addEvent(this.scDiv, 'touchend',
        function(e) {
            tempThis._touchend(e)
        })
    },
    _touchstart: function(e) {
        this.stop();
        this.iPadX = e.touches[0].pageX;
        this.iPadScrollX = window.pageXOffset;
        this.iPadScrollY = window.pageYOffset;
        this.scDivScrollLeft = this.scDiv[this._scroll]
    },
    _touchmove: function(e) {
        if (e.touches.length > 1) {
            this.iPadStatus = 'ok';
            return
        };
        this.iPadLastX = e.touches[0].pageX;
        var cX = this.iPadX - this.iPadLastX;
        if (this.iPadStatus == 'ok') {
            if (this.iPadScrollY == window.pageYOffset && this.iPadScrollX == window.pageXOffset && Math.abs(cX) > 50) {
                this.iPadStatus = 'touch'
            } else {
                return
            }
        };
        this._state = 'touch';
        var scrollNum = this.scDivScrollLeft + cX;
        if (scrollNum >= this.lDiv01[this._sWidth]) {
            scrollNum = scrollNum - this.lDiv01[this._sWidth]
        };
        if (scrollNum < 0) {
            scrollNum = scrollNum + this.lDiv01[this._sWidth]
        };
        this.scDiv[this._scroll] = scrollNum;
        e.preventDefault()
    },
    _touchend: function(e) {
        if (this.iPadStatus != 'touch') {
            return
        };
        this.iPadStatus = 'ok';
        this._state = 'ready';
        var cX = this.iPadX - this.iPadLastX;
        if (cX < 0) {
            this.pre()
        } else {
            this.next()
        };
        this.play()
    }
};

					
					
					
