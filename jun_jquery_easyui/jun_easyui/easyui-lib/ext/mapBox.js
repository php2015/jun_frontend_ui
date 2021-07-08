/**
 *<p>****************************************************************************</p>
 * <p><b>Copyright © 2010-2017 soho team All Rights Reserved<b></p>
 * <ul style="margin:15px;">
 * <li>Description : 地图选址组建</li>
 * <li>Version     : 1.0</li>
 * <li>Creation    : 2017年12月11日</li>
 * <li>@author     : ____′↘夏悸</li>
 * </ul>
 * <p>****************************************************************************</p>
 */
(function($) {
    $.fn.mapBox = function(h) {

        return this.each(function() {
            h = h || {};
            var mapObj;
            var data = $.data(this, "mapBox");
            var newOptions;
            if (data) {
                newOptions = $.extend(data.options, h);
                data.opts = newOptions;
            } else {
                newOptions = $.extend({}, $.fn.mapBox.defaults, $.fn.mapBox.parseOptions(this), h);
                $.data(this, "mapBox", {
                    options: newOptions
                });
            }

            var textBox = $(this),
                point, latitude, longitude;
            textBox.textbox({});
            var input = textBox.textbox('textbox');

            if (newOptions.location || newOptions.address) {
                if (h.location) {
                    point = new BMap.Point(h.location[0], h.location[1]);
                    longitude = newOptions.location[0];
                    latitude = newOptions.location[1];
                    if (!h.address) {
                        c(point, null, false)
                    } else {
                        textBox.textbox('setValue', newOptions.address);
                    }
                } else {
                    textBox.textbox('setValue', newOptions.address);
                    var geocoder = new BMap.Geocoder();
                    geocoder.getPoint(newOptions.address, function(r) {
                        point = r;
                        longitude = r.lng;
                        latitude = r.lat;
                    })
                }
            } else {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(t) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        point = t.point;
                        longitude = t.point.lng;
                        latitude = t.point.lat
                    }
                }, {
                    enableHighAccuracy: true
                })
            }


            var mapDiv = $("#mapDiv-" + textBox.textbox('textbox').attr('id'));
            if (!mapDiv.length) {
                mapDiv = $("<div/>", {
                    id: 'mapDiv-' + textBox.textbox('textbox').attr('id')
                });
                mapDiv.css({
                    position: 'absolute',
                    width: input.outerWidth(),
                    height: 300,
                    display: 'none',
                    top: input.offset().top + input.outerHeight(),
                    left: input.offset().left,
                    border: '1px solid #D4D4D4',
                    zIndex: 100000
                });

                mapDiv.appendTo("body");
                $("head").append('<style> .tangram-suggestion-main {z-index: 100001} </style>');
            }

            input.on('focus', function() {
                loadMap(point, textBox, newOptions);
                mapDiv.css({
                    top: input.offset().top + input.outerHeight(),
                    left: input.offset().left,
                }).show();
            }).on('blur', function() {
                mapDiv.hide();
            });


            function loadMap(point, textBox, newOptions) {
                if (mapObj) {
                    return false
                }
                mapObj = new BMap.Map("mapDiv-" + textBox.textbox('textbox').attr('id'), {
                    enableMapClick: false
                });
                mapObj.centerAndZoom(point, 15);
                mapObj.enableScrollWheelZoom();
                mapObj.enableContinuousZoom();

                mapObj.addEventListener("click", function(s) {
                    addPoint(s.point);
                    getAddress(s.point, textBox, newOptions);
                });
                window.smapObj = mapObj;

                addPoint(point, textBox);

                var r = textBox.textbox("getValue");
                var autocomplete = new BMap.Autocomplete({
                    input: textBox.textbox('textbox').attr('id'),
                    location: mapObj
                });
                autocomplete.setInputValue(r);

                autocomplete.addEventListener("onconfirm", function(v) {
                    var t = v.item.value;
                    var myValue = t.province + t.city + t.district + t.street + t.business;

                    var u = new BMap.LocalSearch(mapObj, {
                        onSearchComplete: s
                    });

                    function s() {
                        var w = u.getResults().getPoi(0).point;
                        mapObj.centerAndZoom(w, 15);
                        getAddress(w, textBox, newOptions, autocomplete, t);
                        addPoint(w);
                    }

                    u.search(myValue)
                })
            }

            function addPoint(point) {
                mapObj.clearOverlays();
                var s = new BMap.Marker(point);
                mapObj.addOverlay(s);
            }

            function getAddress(point, textBox, newOptions, autocomplete, s) {
                var t = new BMap.Geocoder();
                t.getLocation(point, function(v) {
                    var w = v.addressComponents;
                    if (s) {
                        w = $.extend(s, w)
                    }
                    w.business = w.business ? w.business : "";
                    if (autocomplete) {
                        autocomplete.setInputValue(w.province + w.city + w.district + w.street + w.streetNumber + w.business)
                    } else {
                        t.getLocation(point, function(x) {
                            textBox.textbox('setValue', x.address);
                        })
                    }

                    if (newOptions.callback) {
                        newOptions.callback.call(w, point);
                    }
                });
            }
        });
    };

    $.fn.mapBox.parseOptions = function(target) {
        return $.extend({}, $.parser.parseOptions(target, ["address", "location", "name", {
            address: "string",
            location: "array"
        }]));
    };

    $.fn.mapBox.defaults = {
        address: "北京市",
        location: [116.331398, 39.897445],
        callback: function(address, point) { //回调函数，返回地址数组与坐标

        }
    };

    $.parser.plugins.push('mapBox');
})(jQuery);
