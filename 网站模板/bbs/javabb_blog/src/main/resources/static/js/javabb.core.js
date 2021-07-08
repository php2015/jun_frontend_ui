
(function ($) {
	/**
     * 扩展String方法
     */
    $.extend(String.prototype, {
        trim: function () {
            return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
        },
        startsWith: function (pattern) {
            return this.indexOf(pattern) === 0;
        },
        endsWith: function (pattern) {
            var d = this.length - pattern.length;
            return d >= 0 && this.lastIndexOf(pattern) === d;
        },
        replaceSuffix: function (index) {
            return this.replace(/\[[0-9]+\]/, '[' + index + ']').replace('#index#', index);
        },
        getRequestURI: function () {
            var indexOf = this.indexOf("?");
            return (indexOf == -1) ? this : this.substr(0, indexOf);
        },
        getParams: function (encode) {
            var params = {},
                    indexOf = this.indexOf("?");
            if (indexOf != -1) {
                var str = this.substr(indexOf + 1),
                        strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    var item = strs[i].split("=");
                    var val = encode ? item[1].encodeParam() : item[1];
                    params[item[0]] = item.length > 1 ? val : '';
                }
            }
            return params;
        },
        encodeParam: function () {
            return encodeURIComponent(this);
        },
        replaceAll: function (os, ns) {
            return this.replace(new RegExp(os, "gm"), ns);
        },
        skipChar: function (ch) {
            if (!this || this.length === 0) {
                return '';
            }
            if (this.charAt(0) === ch) {
                return this.substring(1).skipChar(ch);
            }
            return this;
        },
        isPositiveInteger: function () {
            return (new RegExp(/^[1-9]\d*$/).test(this));
        },
        isInteger: function () {
            return (new RegExp(/^\d+$/).test(this));
        },
        isNumber: function (value, element) {
            return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
        },
        isValidPwd: function () {
            return (new RegExp(/^([_]|[a-zA-Z0-9]){6,32}$/).test(this));
        },
        isValidMail: function () {
            return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
        },
        isSpaces: function () {
            for (var i = 0; i < this.length; i += 1) {
                var ch = this.charAt(i);
                if (ch != ' ' && ch != "\n" && ch != "\t" && ch != "\r") {
                    return false;
                }
            }
            return true;
        },
        isMobile: function () {
            return (new RegExp(/(^[0-9]{11,11}$)/).test(this));
        },
        isUrl: function () {
            return (new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this));
        },
        isExternalUrl: function () {
            return this.isUrl() && this.indexOf("://" + document.domain) == -1;
        },
        parseCurrency: function (num) {
            var numberValue = parseFloat(this);
            return parseFloat(numberValue.toFixed(num || 2));
        }
    });
/* 鼠标点击向上冒泡弹出提示动画 */
    $.extend({
        bubble: {
            _tip: ['法制', '爱国', '敬业', '诚信', '友善', '富强', '民主', '文明', '和谐', '自由', '平等', '公正'],
            init: function () {
                var bubbleIndex = 0;
                $('body').click(function (e) {
                    bubbleIndex = bubbleIndex >= $.bubble._tip.length ? 0 : bubbleIndex;
                    if (!e.originalEvent) {
                        return;
                    }
                    var x = e.originalEvent.x || e.originalEvent.layerX || 0;
                    var y = e.originalEvent.y || e.originalEvent.layerY || 0;
                    var html = '<span style="position: fixed;z-index:9999;left: ' + x + 'px;top: ' + y + 'px;"></span>';
                    var $box = $(html).appendTo($(this));
                    $box.effectBubble({
                        y: -100,
                        className: 'thumb-bubble',
                        fontSize: 0.5,
                        content: '<i class="fa fa-smile-o"></i>' + $.bubble._tip[bubbleIndex]
                    });
                    setTimeout(function () {
                        $box.remove();
                    }, 1002);
                    bubbleIndex++;
                });
            },
            unbind: function (duration) {
                $("body").unbind('click');
                if (duration && !isNaN(duration = parseInt(duration))) {
                    setTimeout(function () {
                        $.bubble.init();
                    }, duration);
                }
            }
        }
    });
    $.fn.extend({
        // 翻牌效果
        flipCard: function (options) {
            var op = $.extend({}, options);
            return this.each(function () {
                var $box = $(this);
                $box.removeClass('animation-rotate-up').removeClass('animation-rotate-up-back');
                $box.addClass("animation-rotate-up");
                setTimeout(function () {
                    $box.addClass("animation-rotate-up-back");
                }, 500);
            });
        },

        // 文字向上冒泡
        effectBubble: function (options) {
            var op = $.extend({content: '+1', y: -100, duration: 1000, effectType: 'ease', className: '', fontSize: 2}, options);

            return this.each(function () {
                var $box = $(this), flyId = 'effect-fly-' + (new Date().getTime());

                var tpl = '<span id="#flyId#" class="effect-bubble-fly #class#" style="opacity: 1;top:#top#px;left:#left#px;font-size: #fontSize#rem;">#content#</span>';
                var html = tpl.replaceAll('#left#', 12).replaceAll('#top#', -8)
                        .replaceAll('#flyId#', flyId).replaceAll('#content#', op.content)
                        .replaceAll('#class#', op.className).replaceAll('#fontSize#', op.fontSize);

                var $fly = $(html).appendTo($box);
                $fly.fadeIn(100, "swing", function () {
                    $fly.animate({top: op.y, opacity: 0}, 100, function () {
                        $fly.fadeOut(op.duration, function () {
                            $fly.remove();
                        });
                    });
                });
            });
        }
    });
})(jQuery);  
$(document).ready(function() {
	$.bubble.init();

});