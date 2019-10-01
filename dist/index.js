/*
Copyright (c) Daybrush
name: @daybrush/home
license: ISC
author: Daybrush
repository: git+https://github.com/daybrush/daybrush.github.io.git
version: 1.0.0
*/
(function () {
  'use strict';

  var width = 0;
  var height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  var observers = {};
  function observe(selectors, callbacks) {
    if (callbacks === void 0) {
      callbacks = {};
    }

    var targets = observers;
    var observer;
    var el = document;
    selectors.forEach(function (selector) {
      observer = targets[selector];

      if (!observer) {
        el = el.querySelector(selector);
        observer = {
          el: el,
          state: "exit",
          rect: {
            top: -1,
            height: -1
          },
          children: {},
          callbacks: {},
          firstEnter: false,
          firstExit: false
        };
        targets[selector] = observer;
      }

      targets = targets[selector].children;
    });
    observer.callbacks = callbacks;
  }

  function onEnter(observer) {
    var _a = observer.callbacks,
        firstEnter = _a.firstEnter,
        enter = _a.enter;
    var el = observer.el;

    if (observer.state === "exit") {
      if (!observer.firstEnter) {
        observer.firstEnter = true;
        firstEnter && firstEnter(el);
      }

      observer.state = "enter";
      enter && enter(el);
    }

    onCheck(observer.children, true);
  }

  function onExit(observer) {
    var _a = observer.callbacks,
        firstExit = _a.firstExit,
        exit = _a.exit;
    var el = observer.el;

    if (observer.state === "enter") {
      if (!observer.firstExit) {
        observer.firstExit = true;
        firstExit && firstExit(el);
      }

      exit && exit(el);
      observer.state = "exit";
    }

    var children = observer.children;

    for (var selector in children) {
      onExit(children[selector]);
    }
  }

  function onCheck(targets, isEnter) {
    for (var name in targets) {
      var observer = targets[name];
      var rect = observer.el.getBoundingClientRect();
      var top = rect.top;
      var height$$1 = rect.height;
      observer.rect = {
        top: top,
        height: height$$1
      };

      if (top + height$$1 <= 0 || top >= height) {
        !isEnter && onExit(observer);
      } else {
        onEnter(observer);
      }
    }
  }

  function check() {
    onCheck(observers);
  }

  function initialize() {
    function scroll() {
      check();
    }

    window.addEventListener("scroll", scroll);
    scroll();
  }

  function $(selector, isMulti) {
    if (isMulti === void 0) {
      isMulti = false;
    }

    return isMulti ? document.querySelectorAll(selector) : document.querySelector(selector);
  }

  /*
  Copyright (c) 2018 Daybrush
  license: MIT
  author: Daybrush
  repository: https://github.com/daybrush/shape-svg
  @version 0.1.0
  */
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  var __assign = function () {
    __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
    var t = {};

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  }

  var CLASS_NAME = "__shape-svg";

  function makeDOM(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  function makeSVGDOM() {
    var el = makeDOM("svg");
    el.setAttribute("class", CLASS_NAME);
    return el;
  }

  function setAttributes(element, attributes) {
    for (var name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
  }

  function setStyles(element, styles) {
    var cssText = [];

    for (var name in styles) {
      cssText.push(name + ":" + styles[name] + ";");
    }

    element.style.cssText += cssText.join("");
  }

  function getRect(_a) {
    var _b = _a.left,
        left = _b === void 0 ? 0 : _b,
        _c = _a.top,
        top = _c === void 0 ? 0 : _c,
        _d = _a.side,
        side = _d === void 0 ? 3 : _d,
        _e = _a.rotate,
        rotate = _e === void 0 ? 0 : _e,
        _f = _a.innerRadius,
        innerRadius = _f === void 0 ? 100 : _f,
        _g = _a.height,
        height = _g === void 0 ? 0 : _g,
        _h = _a.split,
        split = _h === void 0 ? 1 : _h,
        _j = _a.width,
        width = _j === void 0 ? height ? 0 : 100 : _j,
        _k = _a.strokeLinejoin,
        strokeLinejoin = _k === void 0 ? "round" : _k,
        _l = _a.strokeWidth,
        strokeWidth = _l === void 0 ? 0 : _l;
    var xPoints = [];
    var yPoints = [];
    var sideCos = Math.cos(Math.PI / side);
    var startRad = Math.PI / 180 * rotate + Math.PI * ((side % 2 ? 0 : 1 / side) - 1 / 2);

    for (var i = 0; i < side; ++i) {
      var rad = Math.PI * (1 / side * 2 * i) + startRad;
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      xPoints.push(cos);
      yPoints.push(sin);

      if (innerRadius !== 100) {
        if (sideCos <= innerRadius / 100) {
          continue;
        } else {
          xPoints.push(innerRadius / 100 * Math.cos(rad + Math.PI / side));
          yPoints.push(innerRadius / 100 * Math.sin(rad + Math.PI / side));
        }
      }
    }

    var minX = Math.min.apply(Math, xPoints);
    var minY = Math.min.apply(Math, yPoints);
    var maxX = Math.max.apply(Math, xPoints);
    var maxY = Math.max.apply(Math, yPoints);
    var isWidth = !!width;
    var scale = isWidth ? width / (maxX - minX) : height / (maxY - minY);
    var isOuter = strokeLinejoin === "miter" || strokeLinejoin === "arcs" || strokeLinejoin === "miter-clip";
    var sideSin = Math.sin(Math.PI / side);
    var innerCos = Math.min(sideCos, innerRadius / 100);
    var innerScale = scale * innerCos;
    var diagonal = strokeWidth / 2 / (sideCos === innerCos ? 1 : Math.sin(Math.atan(sideSin / (sideCos - innerCos))));
    var outerScale = isOuter ? (innerScale + diagonal) / innerScale : 1;
    var pos = isOuter ? 0 : strokeWidth / 2;
    xPoints = xPoints.map(function (xp) {
      return (xp - minX * outerScale) * scale + pos;
    });
    yPoints = yPoints.map(function (yp) {
      return (yp - minY * outerScale) * scale + pos;
    });
    var pathWidth = (maxX - minX) * outerScale * scale + pos * 2;
    var pathHeight = (maxY - minY) * outerScale * scale + pos * 2;
    var length = xPoints.length;
    var points = [];
    points.push([left + xPoints[0], top + yPoints[0]]);

    for (var i = 1; i <= length; ++i) {
      var x1 = xPoints[i - 1];
      var y1 = yPoints[i - 1];
      var x2 = xPoints[i === length ? 0 : i];
      var y2 = yPoints[i === length ? 0 : i];

      for (var j = 1; j <= split; ++j) {
        var x = (x1 * (split - j) + x2 * j) / split;
        var y = (y1 * (split - j) + y2 * j) / split;
        points.push([left + x, top + y]);
      }
    }

    return {
      points: points,
      width: pathWidth,
      height: pathHeight
    };
  }
  function getPath(points) {
    return points.map(function (point, i) {
      return (i === 0 ? "M" : "L") + " " + point.join(" ");
    }).join(" ") + " Z";
  }
  function be(path, _a, container) {
    var _b = _a.left,
        left = _b === void 0 ? 0 : _b,
        _c = _a.top,
        top = _c === void 0 ? 0 : _c,
        _d = _a.right,
        right = _d === void 0 ? 0 : _d,
        _e = _a.bottom,
        bottom = _e === void 0 ? 0 : _e,
        side = _a.side,
        split = _a.split,
        rotate = _a.rotate,
        innerRadius = _a.innerRadius,
        height = _a.height,
        width = _a.width,
        _f = _a.fill,
        fill = _f === void 0 ? "transparent" : _f,
        _g = _a.strokeLinejoin,
        strokeLinejoin = _g === void 0 ? "round" : _g,
        _h = _a.strokeWidth,
        strokeWidth = _h === void 0 ? 0 : _h,
        _j = _a.css,
        css = _j === void 0 ? false : _j,
        attributes = __rest(_a, ["left", "top", "right", "bottom", "side", "split", "rotate", "innerRadius", "height", "width", "fill", "strokeLinejoin", "strokeWidth", "css"]);

    var _k = getRect({
      left: left,
      top: top,
      split: split,
      side: side,
      rotate: rotate,
      width: width,
      height: height,
      innerRadius: innerRadius,
      strokeLinejoin: strokeLinejoin,
      strokeWidth: strokeWidth
    }),
        points = _k.points,
        pathWidth = _k.width,
        pathHeight = _k.height;

    if (container && container.getAttribute("class") === CLASS_NAME) {
      container.setAttribute("viewBox", "0 0 " + (left + pathWidth + right) + " " + (top + pathHeight + bottom));
    }

    var d = getPath(points);
    css && (d = "path('" + d + "')");
    (css ? setStyles : setAttributes)(path, __assign({
      fill: fill,
      d: d,
      "stroke-linejoin": strokeLinejoin,
      "stroke-width": "" + strokeWidth
    }, attributes));
  }
  function star(_a, container) {
    var _b = _a.side,
        side = _b === void 0 ? 3 : _b,
        _c = _a.innerRadius,
        innerRadius = _c === void 0 ? 60 * Math.cos(Math.PI / side) : _c;
    return poly(__assign({}, arguments[0], {
      innerRadius: innerRadius
    }), container);
  }
  function poly(options, container) {
    if (container === void 0) {
      container = makeSVGDOM();
    }

    var path = makeDOM("path");
    be(path, options, container);
    container.appendChild(path);
    return container;
  }

  var prefixes = ["webkit", "ms", "moz", "o"];

  var checkProperties =
  /*#__PURE__*/
  function (property) {
    var styles = (document.body || document.documentElement).style;
    var length = prefixes.length;

    if (typeof styles[property] !== "undefined") {
      return property;
    }

    for (var i = 0; i < length; ++i) {
      var name = "-" + prefixes[i] + "-" + property;

      if (typeof styles[name] !== "undefined") {
        return name;
      }
    }

    return "";
  };

  var RGB = "rgb";
  var RGBA = "rgba";
  var HSL = "hsl";
  var HSLA = "hsla";
  var TRANSFORM =
  /*#__PURE__*/
  checkProperties("transform");
  var FILTER =
  /*#__PURE__*/
  checkProperties("filter");
  var ANIMATION =
  /*#__PURE__*/
  checkProperties("animation");
  var KEYFRAMES =
  /*#__PURE__*/
  ANIMATION.replace("animation", "keyframes");

  function isUndefined(value) {
    return typeof value === "undefined";
  }
  function isObject(value) {
    return value && typeof value === "object";
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  /**
  * divide text by space.
  * @memberof Property
  * @function splitSpace
  * @param {String} text - text to divide
  * @return {Array} divided texts
  * @example
  console.log(splitSpace("a b c d e f g"));
  // ["a", "b", "c", "d", "e", "f", "g"]
  console.log(splitSpace("'a,b' c 'd,e' f g"));
  // ["'a,b'", "c", "'d,e'", "f", "g"]
  */

  function splitSpace(text) {
    // divide comma(,)
    var matches = text.match(/("[^"]*")|('[^']*')|([^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\S+/g);
    return matches || [];
  }
  /**
  * divide text by comma.
  * @memberof Property
  * @function splitComma
  * @param {String} text - text to divide
  * @return {Array} divided texts
  * @example
  console.log(splitComma("a,b,c,d,e,f,g"));
  // ["a", "b", "c", "d", "e", "f", "g"]
  console.log(splitComma("'a,b',c,'d,e',f,g"));
  // ["'a,b'", "c", "'d,e'", "f", "g"]
  */

  function splitComma(text) {
    // divide comma(,)
    // "[^"]*"|'[^']*'
    var matches = text.match(/("[^"]*"|'[^']*'|[^,\s()]*\((?:[^()]*|\([^()]*\))*\)[^,\s()]*|[^,])+/g);
    return matches ? matches.map(function (str) {
      return str.trim();
    }) : [];
  }
  function splitBracket(text) {
    var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

    if (!matches || matches.length < 4) {
      return {};
    } else {
      return {
        prefix: matches[1],
        value: matches[2],
        suffix: matches[3]
      };
    }
  }
  function splitUnit(text) {
    var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

    if (!matches) {
      return {
        prefix: "",
        unit: "",
        value: NaN
      };
    }

    var prefix = matches[1];
    var value = matches[2];
    var unit = matches[3];
    return {
      prefix: prefix,
      unit: unit,
      value: parseFloat(value)
    };
  }
  function camelize(str) {
    return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
      return letter.toUpperCase();
    });
  }
  function decamelize(str) {
    return str.replace(/([a-z])([A-Z])/g, function (all, letter, letter2) {
      return letter + "-" + letter2.toLowerCase();
    });
  }

  /**
  * @namespace
  * @name Color
  */

  var COLOR_MODELS = [RGB, RGBA, HSL, HSLA];
  /**
  * Remove the # from the hex color.
  * @memberof Color
  * @param {String} hex - hex color
  * @return {String} hex color
  * @example
  console.log(cutHex("#000000"))
  // "000000"
  */

  function cutHex(hex) {
    return hex.charAt(0) === "#" ? hex.substring(1) : hex;
  }
  /**
  * convert hex color to rgb color.
  * @memberof Color
  * @param {String} hex - hex color
  * @return {Array} rgb color
  * @example
  console.log(hexToRGB("#000000"));
  // [0, 0, 0]
  console.log(hexToRGB("#201045"));
  // [32, 16, 69]
  */

  function hexToRGBA(hex) {
    var h = cutHex(hex);
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    var a = parseInt(h.substring(6, 8), 16) / 255;

    if (isNaN(a)) {
      a = 1;
    }

    return [r, g, b, a];
  }
  /**
  * convert 3-digit hex color to 6-digit hex color.
  * @memberof Color
  * @param {String} hex - 3-digit hex color
  * @return {String} 6-digit hex color
  * @example
  console.log(hex3to6("#123"));
  // "#112233"
  */

  function hex3to6(h) {
    var r = h.charAt(1);
    var g = h.charAt(2);
    var b = h.charAt(3);
    var arr = ["#", r, r, g, g, b, b];
    return arr.join("");
  }
  /**
  * convert hsl color to rgb color.
  * @memberof Color
  * @param {Array} hsl(a) - hsl color(hue: 0 ~ 360, saturation: 0 ~ 1, lightness: 0 ~ 1, alpha: 0 ~ 1)
  * @return {Array} rgb color
  * @example
  console.log(hslToRGB([150, 0.5, 0.4]));
  // [51, 153, 102]
  */

  function hslToRGBA(hsl) {
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];

    if (h < 0) {
      h += Math.floor((Math.abs(h) + 360) / 360) * 360;
    }

    h %= 360;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(h / 60 % 2 - 1));
    var m = l - c / 2;
    var rgb;

    if (h < 60) {
      rgb = [c, x, 0];
    } else if (h < 120) {
      rgb = [x, c, 0];
    } else if (h < 180) {
      rgb = [0, c, x];
    } else if (h < 240) {
      rgb = [0, x, c];
    } else if (h < 300) {
      rgb = [x, 0, c];
    } else if (h < 360) {
      rgb = [c, 0, x];
    }

    var result = [Math.round((rgb[0] + m) * 255), Math.round((rgb[1] + m) * 255), Math.round((rgb[2] + m) * 255), hsl.length > 3 ? hsl[3] : 1];
    return result;
  }
  /**
  * convert string to rgba color.
  * @memberof Color
  * @param {String} - Hex(rgb, rgba) or RGB(A), or HSL(A)
  * @return {Array} rgba color
  */

  function stringToRGBA(color) {
    if (color.charAt(0) === "#") {
      if (color.length === 4) {
        return hexToRGBA(hex3to6(color));
      } else {
        return hexToRGBA(color);
      }
    } else if (color.indexOf("(") !== -1) {
      // in bracket.
      var _a = splitBracket(color),
          prefix = _a.prefix,
          value = _a.value;

      if (!prefix || !value) {
        return;
      }

      var arr = splitComma(value);
      var colorArr = [];
      var length = arr.length;

      switch (prefix) {
        case RGB:
        case RGBA:
          for (var i = 0; i < length; ++i) {
            colorArr[i] = parseFloat(arr[i]);
          }

          return colorArr;

        case HSL:
        case HSLA:
          for (var i = 0; i < length; ++i) {
            if (arr[i].indexOf("%") !== -1) {
              colorArr[i] = parseFloat(arr[i]) / 100;
            } else {
              colorArr[i] = parseFloat(arr[i]);
            }
          } // hsl, hsla to rgba


          return hslToRGBA(colorArr);
      }
    }

    return;
  }

  function hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    }

    return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += " " + className;
    }
  }
  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      element.className = element.className.replace(reg, " ");
    }
  }
  function fromCSS(elements, properties) {
    if (!elements || !properties || !properties.length) {
      return {};
    }

    var element;

    if (elements instanceof Element) {
      element = elements;
    } else if (elements.length) {
      element = elements[0];
    } else {
      return {};
    }

    var cssObject = {};
    var styles = window.getComputedStyle(element);
    var length = properties.length;

    for (var i = 0; i < length; ++i) {
      cssObject[properties[i]] = styles[properties[i]];
    }

    return cssObject;
  }

  /*
  Copyright (c) 2018 Daybrush
  license: MIT
  author: Daybrush
  repository: https://github.com/daybrush/scenejs.git
  @version 1.0.0-beta11
  */

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  var PREFIX = "__SCENEJS_";
  var TIMING_FUNCTION = "animation-timing-function";
  var ROLES = {
    transform: {},
    filter: {},
    attribute: {}
  };
  var ALIAS = {
    easing: [TIMING_FUNCTION]
  };
  var FIXED = {
    "animation-timing-function": true,
    "contents": true
  };
  var MAXIMUM = 1000000;
  var THRESHOLD = 0.000001;
  var DURATION = "duration";
  var FILL_MODE = "fillMode";
  var DIRECTION = "direction";
  var ITERATION_COUNT = "iterationCount";
  var DELAY = "delay";
  var EASING = "easing";
  var PLAY_SPEED = "playSpeed";
  var EASING_NAME = "easingName";
  var ITERATION_TIME = "iterationTime";
  var PAUSED = "paused";
  var ENDED = "ended";
  var TIMEUPDATE = "timeupdate";
  var ANIMATE = "animate";
  var PLAY = "play";
  var RUNNING = "running";
  var START_ANIMATION = "startAnimation";
  var PAUSE_ANIMATION = "pauseAnimation";
  var ALTERNATE = "alternate";
  var REVERSE = "reverse";
  var ALTERNATE_REVERSE = "alternate-reverse";
  var NORMAL = "normal";
  var INFINITE = "infinite";
  var PLAY_STATE = "playState";
  var FUNCTION = "function";
  var PROPERTY = "property";

  /**
  * attach and trigger event handlers.
  * @memberof Scene
  */

  var EventTrigger =
  /*#__PURE__*/
  function () {
    /**
      * @example
    const et = new Scene.EventTrigger();
    const scene = new Scene();
     scene.on("call", e => {
      console.log(e.param);
    });
    et.on("call", e => {
      console.log(e.param);
    });
    scene.trigger("call", {param: 1});
    et.trigger("call", {param: 1});
       */
    function EventTrigger() {
      this.events = {};
    }
    /**
      * Attach an event handler function for one or more events to target
      * @param {String} name - event's name
      * @param {Function} callback -  function to execute when the event is triggered.
      * @return {EventTrigger} An Instance itself.
      * @example
    target.on("animate", function() {
      console.log("animate");
    });
     target.trigger("animate");
         */


    var __proto = EventTrigger.prototype;

    __proto.on = function (name, callback) {
      var _this = this;

      var events = this.events;

      if (isObject(name)) {
        for (var i in name) {
          this.on(i, name[i]);
        }

        return this;
      }

      if (!(name in events)) {
        events[name] = [];
      }

      if (!callback) {
        return this;
      }

      if (isObject(callback)) {
        callback.forEach(function (func) {
          return _this.on(name, func);
        });
        return this;
      }

      var event = events[name];
      event.push(callback);
      return this;
    };
    /**
      * Dettach an event handler function for one or more events to target
      * @param {String} name - event's name
      * @param {Function} callback -  function to execute when the event is triggered.
      * @return {EventTrigger} An Instance itself.
      * @example
    const callback = function() {
      console.log("animate");
    };
    target.on("animate", callback);
     target.off("animate", callback);
    target.off("animate");
         */


    __proto.off = function (name, callback) {
      if (!name) {
        this.events = {};
      } else if (!callback) {
        this.events[name] = [];
      } else {
        var callbacks = this.events[name];

        if (!callbacks) {
          return this;
        }

        var index = callbacks.indexOf(callback);

        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      }

      return this;
    };
    /**
      * execute event handler
      * @param {String} name - event's name
      * @param {Function} [...data] - event handler's additional parameter
      * @return {EventTrigger} An Instance itself.
      * @example
    target.on("animate", function(a1, a2) {
      console.log("animate", a1, a2);
    });
     target.trigger("animate", [1, 2]); // log => "animate", 1, 2
         */


    __proto.trigger = function (name) {
      var _this = this;

      var data = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
      }

      var events = this.events;

      if (!(name in events)) {
        return this;
      }

      var event = events[name];

      if (data.length) {
        var target = data[0];
        target.type = name;
        target.currentTarget = this;
        !target.target && (target.target = this);
      }

      event.forEach(function (callback) {
        callback.apply(_this, data);
      });
      return this;
    };

    return EventTrigger;
  }();

  function cubic(y1, y2, t) {
    var t2 = 1 - t; // Bezier Curve Formula

    return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
  }

  function solveFromX(x1, x2, x) {
    // x  0 ~ 1
    // t 0 ~ 1
    var t = x;
    var solveX = x;
    var dx = 1;

    while (Math.abs(dx) > 1 / 1000) {
      // 예상 t초에 의한 _x값
      solveX = cubic(x1, x2, t);
      dx = solveX - x; // 차이가 미세하면 그 값을 t로 지정

      if (Math.abs(dx) < 1 / 1000) {
        return t;
      }

      t -= dx / 2;
    }

    return t;
  }
  /**
   * @namespace easing
   */

  /**
  * Cubic Bezier curve.
  * @memberof easing
  * @func bezier
  * @param {number} [x1] - point1's x
  * @param {number} [y1] - point1's y
  * @param {number} [x2] - point2's x
  * @param {number} [y2] - point2's y
  * @return {function} the curve function
  * @example
  import {bezier} from "scenejs";
  Scene.bezier(0, 0, 1, 1) // LINEAR
  Scene.bezier(0.25, 0.1, 0.25, 1) // EASE
  */


  function bezier(x1, y1, x2, y2) {
    /*
          x = f(t)
          calculate inverse function by x
          t = f-1(x)
      */
    var func = function (x) {
      var t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));
      return cubic(y1, y2, t);
    };

    func.easingName = "cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + ")";
    return func;
  }
  /**
  * Linear Speed (0, 0, 1, 1)
  * @memberof easing
  * @name LINEAR
  * @static
  * @type {function}
  * @example
  import {LINEAR} from "scenejs";
  Scene.LINEAR
  */

  var LINEAR =
  /*#__PURE__#*/
  bezier(0, 0, 1, 1);
  /**
  * Ease Speed (0.25, 0.1, 0.25, 1)
  * @memberof easing
  * @name EASE
  * @static
  * @type {function}
  * @example
  import {EASE} from "scenejs";
  Scene.EASE
  */

  var EASE =
  /*#__PURE__#*/
  bezier(0.25, 0.1, 0.25, 1);
  /**
  * Ease In Speed (0.42, 0, 1, 1)
  * @memberof easing
  * @name EASE_IN
  * @static
  * @type {function}
  * @example
  import {EASE_IN} from "scenejs";
  Scene.EASE_IN
  */

  var EASE_IN =
  /*#__PURE__#*/
  bezier(0.42, 0, 1, 1);
  /**
  * Ease Out Speed (0, 0, 0.58, 1)
  * @memberof easing
  * @name EASE_OUT
  * @static
  * @type {function}
  * @example
  import {EASE_OUT} from "scenejs";
  Scene.EASE_OUT
  */

  var EASE_OUT =
  /*#__PURE__#*/
  bezier(0, 0, 0.58, 1);
  /**
  * Ease In Out Speed (0.42, 0, 0.58, 1)
  * @memberof easing
  * @name EASE_IN_OUT
  * @static
  * @type {function}
  * @example
  import {EASE_IN_OUT} from "scenejs";
  Scene.EASE_IN_OUT
  */

  var EASE_IN_OUT =
  /*#__PURE__#*/
  bezier(0.42, 0, 0.58, 1);

  /**
  * Make string, array to PropertyObject for the dot product
  * @memberof Scene
  */
  var PropertyObject =
  /*#__PURE__*/
  function () {
    /**
      * @param {String|Array} value - This value is in the array format ..
      * @param {String} separator - Array separator.
      * @example
    var obj1 = new PropertyObject("1,2,3", ",");
    var obj2 = new PropertyObject([1,2,3], " ");
    var obj3 = new PropertyObject("1$2$3", "$");
     // rgba(100, 100, 100, 0.5)
    var obj4 = new PropertyObject([100,100,100,0.5], {
      "separator" : ",",
      "prefix" : "rgba(",
      "suffix" : ")"
    });
       */
    function PropertyObject(value, options) {
      if (options === void 0) {
        options = {};
      }

      this.options = {
        prefix: "",
        suffix: "",
        model: "",
        type: "",
        separator: ","
      };
      this.setOptions(options);
      this.init(value);
    }

    var __proto = PropertyObject.prototype;

    __proto.setOptions = function (options) {
      Object.assign(this.options, options);
      return this;
    };

    __proto.getOption = function (name) {
      return this.options[name];
    };
    /**
      * the number of values.
      * @example
    const obj1 = new PropertyObject("1,2,3", ",");
     console.log(obj1.length);
    // 3
       */


    __proto.size = function () {
      return this.value.length;
    };
    /**
      * retrieve one of values at the index
      * @param {Number} index - index
      * @return {Object} one of values at the index
      * @example
    const obj1 = new PropertyObject("1,2,3", ",");
     console.log(obj1.get(0));
    // 1
       */


    __proto.get = function (index) {
      return this.value[index];
    };
    /**
      * Set the value at that index
      * @param {Number} index - index
      * @param {Object} value - text, a number, object to set
      * @return {PropertyObject} An instance itself
      * @example
    const obj1 = new PropertyObject("1,2,3", ",");
    obj1.set(0, 2);
    console.log(obj1.toValue());
    // 2,2,3
       */


    __proto.set = function (index, value) {
      this.value[index] = value;
      return this;
    };
    /**
      * create a copy of an instance itself.
      * @return {PropertyObject} clone
      * @example
    const obj1 = new PropertyObject("1,2,3", ",");
    const obj2 = obj1.clone();
       */


    __proto.clone = function () {
      var arr = this.value.map(function (v) {
        return v instanceof PropertyObject ? v.clone() : v;
      });
      return new PropertyObject(arr, {
        separator: this.options.separator,
        prefix: this.options.prefix,
        suffix: this.options.suffix,
        model: this.options.model,
        type: this.options.type
      });
    };
    /**
      * Make Property Object to String
      * @return {String} Make Property Object to String
      * @example
    //rgba(100, 100, 100, 0.5)
    const obj4 = new PropertyObject([100,100,100,0.5], {
      "separator" : ",",
      "prefix" : "rgba(",
      "suffix" : ")",
    });
    console.log(obj4.toValue());
    // "rgba(100,100,100,0.5)"
      */


    __proto.toValue = function () {
      return this.options.prefix + this.join() + this.options.suffix;
    };
    /**
      * Make Property Object's array to String
      * @return {String} Join the elements of an array into a string
      * @example
      //rgba(100, 100, 100, 0.5)
      var obj4 = new PropertyObject([100,100,100,0.5], {
          "separator" : ",",
          "prefix" : "rgba(",
          "suffix" : ")"
      });
      obj4.join();  // =>   "100,100,100,0.5"
       */


    __proto.join = function () {
      return this.value.map(function (v) {
        return v instanceof PropertyObject ? v.toValue() : v;
      }).join(this.options.separator);
    };
    /**
      * executes a provided function once per array element.
      * @param {Function} callback - Function to execute for each element, taking three arguments
      * @param {All} [callback.currentValue] The current element being processed in the array.
      * @param {Number} [callback.index] The index of the current element being processed in the array.
      * @param {Array} [callback.array] the array.
      * @return {PropertyObject} An instance itself
      * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
      * @example
    //rgba(100, 100, 100, 0.5)
    var obj4 = new PropertyObject([100,100,100,0.5], {
      "separator" : ",",
      "prefix" : "rgba(",
      "suffix" : ")"
    });
     obj4.forEach(t => {
      console.log(t);
    });  // =>   "100,100,100,0.5"
      */


    __proto.forEach = function (func) {
      this.value.forEach(func);
      return this;
    };

    __proto.init = function (value) {
      var type = typeof value;

      if (type === "string") {
        this.value = value.split(this.options.separator);
      } else if (type === "object") {
        this.value = value;
      } else {
        this.value = [value];
      }

      return this;
    };

    return PropertyObject;
  }();
  function getType(value) {
    var type = typeof value;

    if (type === "object") {
      if (isArray(value)) {
        return "array";
      } else if (value instanceof PropertyObject) {
        return "property";
      }
    } else if (type === "string" || type === "number") {
      return "value";
    }

    return type;
  }
  function toFixed(num) {
    return Math.round(num * MAXIMUM) / MAXIMUM;
  }
  function isInProperties(roles, args, isCheckTrue) {
    var length = args.length;
    var role = roles;

    if (length === 0) {
      return false;
    }

    for (var i = 0; i < length; ++i) {
      if (role === true) {
        return false;
      }

      role = role[args[i]];

      if (!role || !isCheckTrue && role === true) {
        return false;
      }
    }

    return true;
  }
  function isRole(args, isCheckTrue) {
    return isInProperties(ROLES, args, isCheckTrue);
  }
  function isFixed(args) {
    return isInProperties(FIXED, args, true);
  }
  function isPausedCSS(item) {
    return item.state.playCSS && item.getPlayState() === PAUSED;
  }
  function exportCSS(id, css) {
    var styleId = PREFIX + "STYLE_" + toId(id);
    var styleElement = document.querySelector("#" + styleId);

    if (styleElement) {
      styleElement.innerText = css;
    } else {
      document.body.insertAdjacentHTML("beforeend", "<style id=\"" + styleId + "\">" + css + "</style>");
    }
  }
  function toId(text) {
    return text.match(/[0-9a-zA-Z]+/g).join("");
  }
  function playCSS(item, isExportCSS, properties) {
    if (properties === void 0) {
      properties = {};
    }

    if (!ANIMATION || item.getPlayState() === RUNNING) {
      return;
    }

    if (isPausedCSS(item)) {
      item.addPlayClass(true, properties);
    } else {
      if (item.isEnded()) {
        item.setTime(0);
      }

      isExportCSS && item.exportCSS();
      var el = item.addPlayClass(false, properties);

      if (!el) {
        return;
      }

      !item.state.peusdo && addAnimationEvent(item, el);
      item.setState({
        playCSS: true
      });
    }

    item.setPlayState(RUNNING);
    item.trigger(PLAY);
  }
  function addAnimationEvent(item, el) {
    var duration = item.getDuration();
    var isZeroDuration = !duration || !isFinite(duration);

    var animationend = function () {
      if (!isZeroDuration) {
        item.setState({
          playCSS: false
        });
        item.finish();
      }
    };

    item.on(ENDED, function () {
      el.removeEventListener("animationend", animationend);
      el.removeEventListener("animationiteration", animationiteration);
    });

    var animationiteration = function (_a) {
      var elapsedTime = _a.elapsedTime;
      var currentTime = elapsedTime;
      var iterationCount = isZeroDuration ? 0 : currentTime / duration;
      item.state.currentTime = currentTime;
      item.setCurrentIterationCount(iterationCount);
    };

    el.addEventListener("animationend", animationend);
    el.addEventListener("animationiteration", animationiteration);
  }

  var lastTime = 0;

  function GetterSetter(getter, setter, parent) {
    return function (constructor) {
      var prototype = constructor.prototype;
      getter.forEach(function (name) {
        prototype[camelize("get " + name)] = function () {
          return this[parent][name];
        };
      });
      setter.forEach(function (name) {
        prototype[camelize("set " + name)] = function (value) {
          this[parent][name] = value;
          return this;
        };
      });
    };
  }

  var requestAnimFrame =
  /*#__PURE__*/
  function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      var currTime = Date.now();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, 1000 / 60);
      lastTime = currTime + timeToCall;
      return id;
    };
  }();

  function isDirectionReverse(currentIterationCount, iteraiontCount, direction) {
    if (direction === REVERSE) {
      return true;
    } else if (iteraiontCount !== "infinite" && currentIterationCount === iteraiontCount && iteraiontCount % 1 === 0) {
      return direction === (currentIterationCount % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
    }

    return direction === (currentIterationCount % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
  }
  /**
  * @typedef {Object} AnimatorOptions The Animator options. Properties used in css animation.
  * @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
  * @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
  * @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
  * @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
  * @property {number} [delay] The delay property specifies a delay for the start of an animation.
  * @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
  */

  /**
  * play video, animation, the others
  * @memberof Scene
  * @class Animator
  * @extends Scene.EventTrigger
  * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
  * @param {AnimatorOptions} [options] - animator's options
  * @example
  const animator = new Animator({
      delay: 2,
      diretion: "alternate",
      duration: 2,
      fillMode: "forwards",
      iterationCount: 3,
      easing: Scene.eaasing.EASE,
  });
  */

  var setters = [ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED, DURATION, PLAY_SPEED, ITERATION_TIME, PLAY_STATE];
  var getters = setters.concat([EASING, EASING_NAME]);

  var Animator =
  /*#__PURE__*/
  function (_super) {
    __extends(Animator, _super);

    function Animator(options) {
      var _this = _super.call(this) || this;

      _this.options = {};
      _this.state = {
        id: "",
        easing: 0,
        easingName: "linear",
        iterationCount: 1,
        delay: 0,
        fillMode: "forwards",
        direction: NORMAL,
        playSpeed: 1,
        currentTime: 0,
        iterationTime: -1,
        currentIterationCount: 0,
        tickTime: 0,
        prevTime: 0,
        playState: PAUSED,
        duration: 0
      };

      _this.setOptions(options);

      return _this;
    }
    /**
      * set animator's easing.
      * @method Scene.Animator#setEasing
      * @param {array| function} curverArray - The speed curve of an animation.
      * @return {Scene.Animator} An instance itself.
      * @example
    animator.({
      delay: 2,
      diretion: "alternate",
      duration: 2,
      fillMode: "forwards",
      iterationCount: 3,
      easing: Scene.easing.EASE,
    });
      */


    var __proto = Animator.prototype;

    __proto.setEasing = function (curveArray) {
      var easing = Array.isArray(curveArray) ? bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]) : curveArray;
      var easingName = easing[EASING_NAME] || "linear";
      this.setState({
        easing: easing,
        easingName: easingName
      });
      return this;
    };
    /**
      * set animator's options.
      * @method Scene.Animator#setOptions
      * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
      * @param {Object} [AnimatorOptions] - animator's options
      * @return {Scene.Animator} An instance itself.
      * @example
    animator.({
      delay: 2,
      diretion: "alternate",
      duration: 2,
      fillMode: "forwards",
      iterationCount: 3,
      easing: Scene.eaasing.EASE,
    });
      */


    __proto.setOptions = function (options) {
      if (options === void 0) {
        options = {};
      }

      for (var name in options) {
        var value = options[name];

        if (name === EASING) {
          this.setEasing(value);
          continue;
        } else if (name === DURATION) {
          value && this.setDuration(value);
          continue;
        }

        (name in this.state ? this.state : this.options)[name] = value;
      }

      return this;
    };
    /**
      * Get the animator's total duration including delay
      * @method Scene.Animator#getTotalDuration
      * @return {number} Total duration
      * @example
    animator.getTotalDuration();
      */


    __proto.getTotalDuration = function () {
      if (this.state[ITERATION_COUNT] === INFINITE) {
        return Infinity;
      }

      return this.state[DELAY] + this.getActiveDuration();
    };
    /**
      * Get the animator's total duration excluding delay
      * @method Scene.Animator#getActiveDuration
      * @return {number} Total duration excluding delay
      * @example
    animator.getTotalDuration();
      */


    __proto.getActiveDuration = function () {
      if (this.state[ITERATION_COUNT] === INFINITE) {
        return Infinity;
      }

      return this.getDuration() * this.state[ITERATION_COUNT];
    };
    /**
      * Check if the animator has reached the end.
      * @method Scene.Animator#isEnded
      * @return {boolean} ended
      * @example
    animator.isEnded(); // true or false
      */


    __proto.isEnded = function () {
      if (this.state.tickTime === 0 && this.state[PLAY_STATE] === PAUSED) {
        return true;
      } else if (this.getTime() < this.getActiveDuration()) {
        return false;
      }

      return true;
    };
    /**
      *Check if the animator is paused:
      * @method Scene.Animator#isPaused
      * @return {boolean} paused
      * @example
    animator.isPaused(); // true or false
      */


    __proto.isPaused = function () {
      return this.state[PLAY_STATE] === PAUSED;
    };

    __proto.setNext = function (animator) {
      this.on(ENDED, function () {
        animator.play();
      });
      return this;
    };
    /**
      * play animator
      * @method Scene.Animator#play
      * @return {Scene.Animator} An instance itself.
      */


    __proto.play = function () {
      var _this = this;

      this.state[PLAY_STATE] = RUNNING;

      if (this.isEnded()) {
        this.setTickTime(0);
      }

      this.state.tickTime = this.getTime();
      requestAnimFrame(function (time) {
        _this.state.prevTime = time;

        _this.tick(time);
      });
      /**
           * This event is fired when play animator.
           * @event Scene.Animator#play
           */

      this.trigger(PLAY);
      return this;
    };
    /**
      * pause animator
      * @method Scene.Animator#pause
      * @return {Scene.Animator} An instance itself.
      */


    __proto.pause = function () {
      this.state[PLAY_STATE] = PAUSED;
      /**
           * This event is fired when animator is paused.
           * @event Scene.Animator#paused
           */

      this.trigger(PAUSED);
      return this;
    };
    /**
       * end animator
       * @method Scene.Animator#finish
       * @return {Scene.Animator} An instance itself.
      */


    __proto.finish = function () {
      this.state.tickTime = 0;
      this.setTime(0);
      this.end();
      return this;
    };
    /**
       * end animator
       * @method Scene.Animator#end
       * @return {Scene.Animator} An instance itself.
      */


    __proto.end = function () {
      this.pause();
      /**
           * This event is fired when animator is ended.
           * @event Scene.Animator#ended
           */

      this.trigger(ENDED);
      return this;
    };
    /**
      * set currentTime
      * @method Scene.Animator#setTime
      * @param {Number|String} time - currentTime
      * @return {Scene.Animator} An instance itself.
      * @example
     animator.setTime("from"); // 0
    animator.setTime("to"); // 100%
    animator.setTime("50%");
    animator.setTime(10);
    animator.getTime() // 10
      */


    __proto.setTime = function (time, isTick) {
      var activeDuration = this.getActiveDuration();
      var currentTime = isTick ? time : this.getUnitTime(time);
      this.state.tickTime = this.state.delay + currentTime;

      if (currentTime < 0) {
        currentTime = 0;
      } else if (currentTime > activeDuration) {
        currentTime = activeDuration;
      }

      this.state.currentTime = currentTime;
      this.calculateIterationTime();

      if (this.isDelay()) {
        return this;
      }
      /**
           * This event is fired when the animator updates the time.
           * @event Scene.Animator#timeupdate
           * @param {Object} param The object of data to be sent to an event.
           * @param {Number} param.currentTime The total time that the animator is running.
           * @param {Number} param.time The iteration time during duration that the animator is running.
           * @param {Number} param.iterationCount The iteration count that the animator is running.
           */


      this.trigger(TIMEUPDATE, {
        currentTime: currentTime,
        time: this.getIterationTime(),
        iterationCount: this.getIterationCount()
      });
      return this;
    };

    __proto.getState = function (name) {
      return this.state[name];
    };

    __proto.setState = function (object) {
      for (var name in object) {
        this.state[name] = object[name];
      }

      return this;
    };
    /**
      * Get the animator's current time
      * @method Scene.Animator#getTime
      * @return {number} current time
      * @example
    animator.getTime();
      */


    __proto.getTime = function () {
      return this.state.currentTime;
    };

    __proto.getUnitTime = function (time) {
      if (isString(time)) {
        var duration = this.getDuration() || 100;

        if (time === "from") {
          return 0;
        } else if (time === "to") {
          return duration;
        }

        var _a = splitUnit(time),
            unit = _a.unit,
            value = _a.value;

        if (unit === "%") {
          !this.getDuration() && (this.state.duration = duration);
          return parseFloat(time) / 100 * duration;
        } else if (unit === ">") {
          return value + THRESHOLD;
        } else {
          return value;
        }
      } else {
        return toFixed(time);
      }
    };
    /**
       * Check if the current state of animator is delayed.
       * @method Scene.Animator#isDelay
       * @return {boolean} check delay state
       */


    __proto.isDelay = function () {
      var _a = this.state,
          delay = _a.delay,
          tickTime = _a.tickTime;
      return delay > 0 && tickTime < delay;
    };

    __proto.setCurrentIterationCount = function (iterationCount) {
      var state = this.state;
      var passIterationCount = Math.floor(iterationCount);

      if (state.currentIterationCount < passIterationCount) {
        /**
              * The event is fired when an iteration of an animation ends.
              * @event Scene.Animator#iteration
              * @param {Object} param The object of data to be sent to an event.
              * @param {Number} param.currentTime The total time that the animator is running.
              * @param {Number} param.iterationCount The iteration count that the animator is running.
              */
        this.trigger("iteration", {
          currentTime: state.currentTime,
          iterationCount: passIterationCount
        });
      }

      state.currentIterationCount = iterationCount;
      return this;
    };

    __proto.calculateIterationTime = function () {
      var _a = this.state,
          iterationCount = _a.iterationCount,
          fillMode = _a.fillMode,
          direction = _a.direction;
      var duration = this.getDuration();
      var time = this.getTime();
      var currentIterationCount = duration === 0 ? 0 : time / duration;
      var currentIterationTime = duration ? time % duration : 0;

      if (!duration) {
        this.setIterationTime(0);
        return this;
      }

      this.setCurrentIterationCount(currentIterationCount); // direction : normal, reverse, alternate, alternate-reverse
      // fillMode : forwards, backwards, both, none

      var isReverse = isDirectionReverse(currentIterationCount, iterationCount, direction);

      if (isReverse) {
        currentIterationTime = duration - currentIterationTime;
      }

      if (iterationCount !== INFINITE) {
        var isForwards = fillMode === "both" || fillMode === "forwards"; // fill forwards

        if (currentIterationCount >= iterationCount) {
          currentIterationTime = duration * (isForwards ? iterationCount % 1 || 1 : 0);
          isReverse && (currentIterationTime = duration - currentIterationTime);
        }
      }

      this.setIterationTime(currentIterationTime);
      return this;
    };

    __proto.tick = function (now) {
      var _this = this;

      var state = this.state;
      var playSpeed = state.playSpeed,
          prevTime = state.prevTime;
      var currentTime = this.state.tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;
      state.prevTime = now;
      this.setTickTime(currentTime);

      if (this.isEnded()) {
        this.end();
        return;
      }

      if (state[PLAY_STATE] === PAUSED) {
        return;
      }

      requestAnimFrame(function (time) {
        _this.tick(time);
      });
    };

    __proto.setTickTime = function (time) {
      this.setTime(time - this.state.delay, true);
    };

    Animator = __decorate([GetterSetter(getters, setters, "state")], Animator);
    return Animator;
  }(EventTrigger);

  /**
  * @namespace
  * @name Property
  */
  function splitStyle(str) {
    var _a;

    var properties = str.split(";");
    var length = properties.length;
    var obj = [];

    for (var i = 0; i < length; ++i) {
      var matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

      if (!matches || matches.length < 3 || !matches[1]) {
        continue;
      }

      obj.push((_a = {}, _a[matches[1].trim()] = toPropertyObject(matches[2].trim()), _a));
    }

    return obj;
  }
  /**
  * convert array to PropertyObject[type=color].
  * default model "rgba"
  * @memberof Property
  * @function arrayToColorObject
  * @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
  * @return {PropertyObject} PropertyObject[type=color]
  * @example
  arrayToColorObject([0, 0, 0])
  // => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
  */

  function arrayToColorObject(arr) {
    var model = RGBA;

    if (arr.length === 3) {
      arr[3] = 1;
    }

    return new PropertyObject(arr, {
      model: model,
      separator: ",",
      type: "color",
      prefix: model + "(",
      suffix: ")"
    });
  }
  /**
  * convert text with parentheses to object.
  * @memberof Property
  * @function stringToBracketObject
  * @param {String} value ex) "rgba(0,0,0,1)"
  * @return {PropertyObject} PropertyObject
  * @example
  stringToBracketObject("abcde(0, 0, 0,1)")
  // => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
  */

  function stringToBracketObject(text) {
    // [prefix, value, other]
    var _a = splitBracket(text),
        model = _a.prefix,
        value = _a.value,
        afterModel = _a.suffix;

    if (typeof value === "undefined") {
      return text;
    }

    if (COLOR_MODELS.indexOf(model) !== -1) {
      return arrayToColorObject(stringToRGBA(text));
    } // divide comma(,)


    var obj = toPropertyObject(value);
    var arr = [value];
    var separator = ",";
    var prefix = model + "(";
    var suffix = ")" + afterModel;

    if (obj instanceof PropertyObject) {
      separator = obj.getOption("separator");
      arr = obj.value;
      prefix += obj.getOption("prefix");
      suffix = obj.getOption("suffix") + suffix;
    }

    return new PropertyObject(arr, {
      separator: separator,
      model: model,
      prefix: prefix,
      suffix: suffix
    });
  }
  function arrayToPropertyObject(arr, separator) {
    return new PropertyObject(arr, {
      type: "array",
      separator: separator
    });
  }
  /**
  * convert text with parentheses to PropertyObject[type=color].
  * If the values are not RGBA model, change them RGBA mdoel.
  * @memberof Property
  * @function stringToColorObject
  * @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
  * @return {PropertyObject} PropertyObject[type=color]
  * @example
  stringToColorObject("rgba(0, 0, 0,1)")
  // => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
  */

  function stringToColorObject(value) {
    var result = stringToRGBA(value);
    return result ? arrayToColorObject(result) : value;
  }
  /**
  * convert CSS Value to PropertyObject
  * @memberof Property
  * @function toPropertyObject
  * @param {String} value it's text contains the array.
  * @return {String} Not Array, Not Separator, Only Number & Unit
  * @return {PropertyObject} Array with Separator.
  * @see referenced regular expression {@link http://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex}
  * @example
  toPropertyObject("1px solid #000");
  // => PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)])
  */

  function toPropertyObject(value) {
    if (!isString(value)) {
      if (Array.isArray(value)) {
        return arrayToPropertyObject(value, ",");
      }

      return value;
    }

    var values = splitComma(value);

    if (values.length > 1) {
      return arrayToPropertyObject(values.map(function (v) {
        return toPropertyObject(v);
      }), ",");
    }

    values = splitSpace(value);

    if (values.length > 1) {
      return arrayToPropertyObject(values.map(function (v) {
        return toPropertyObject(v);
      }), " ");
    }

    values = /^(['"])([^'"]*)(['"])$/g.exec(value);

    if (values && values[1] === values[3]) {
      // Quotes
      return new PropertyObject([toPropertyObject(values[2])], {
        prefix: values[1],
        suffix: values[1]
      });
    } else if (value.indexOf("(") !== -1) {
      // color
      return stringToBracketObject(value);
    } else if (value.charAt(0) === "#") {
      return stringToColorObject(value);
    }

    return value;
  }
  function toObject(object, result) {
    if (result === void 0) {
      result = {};
    }

    var model = object.getOption("model");

    if (model) {
      object.setOptions({
        model: "",
        suffix: "",
        prefix: ""
      });
      var value = object.size() > 1 ? object : object.get(0);
      result[model] = value;
    } else {
      object.forEach(function (obj) {
        return toObject(obj, result);
      });
    }

    return result;
  }

  function toInnerProperties(obj) {
    if (!obj) {
      return "";
    }

    var arrObj = [];

    for (var name in obj) {
      arrObj.push(name.replace(/\d/g, "") + "(" + obj[name] + ")");
    }

    return arrObj.join(" ");
  }

  function isPropertyObject(value) {
    return value instanceof PropertyObject;
  }
  /* eslint-disable */


  function clone(target, toValue) {
    if (toValue === void 0) {
      toValue = false;
    }

    return merge({}, target, toValue);
  }

  function merge(to, from, toValue) {
    if (toValue === void 0) {
      toValue = false;
    }

    for (var name in from) {
      var value = from[name];
      var type = getType(value);

      if (type === PROPERTY) {
        to[name] = toValue ? value.toValue() : value.clone();
      } else if (type === FUNCTION) {
        to[name] = toValue ? getValue([name], value()) : value;
      } else if (type === "array") {
        to[name] = value.slice();
      } else if (type === "object") {
        if (isObject(to[name]) && !isPropertyObject(to[name])) {
          merge(to[name], value, toValue);
        } else {
          to[name] = clone(value, toValue);
        }
      } else {
        to[name] = from[name];
      }
    }

    return to;
  }
  /* eslint-enable */


  function getValue(names, value) {
    var type = getType(value);

    if (type === PROPERTY) {
      return value.toValue();
    } else if (type === FUNCTION) {
      if (names[0] !== TIMING_FUNCTION) {
        return getValue(names, value());
      }
    } else if (type === "object") {
      return clone(value, true);
    }

    return value;
  }
  /**
  * Animation's Frame
  * @class Scene.Frame
  * @param {Object} properties - properties
  * @example
  const frame = new Scene.Frame({
      display: "none"
      transform: {
          translate: "50px",
          scale: "5, 5",
      }
  });
   */


  var Frame =
  /*#__PURE__*/
  function () {
    function Frame(properties) {
      if (properties === void 0) {
        properties = {};
      }

      this.properties = {};
      this.set(properties);
    }
    /**
      * get property value
      * @method Scene.Frame#get
      * @param {...Number|String|Scene.PropertyObject} args - property name or value
      * @example
      frame.get("display") // => "none", "block", ....
      frame.get("transform", "translate") // => "10px,10px"
      */


    var __proto = Frame.prototype;

    __proto.get = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var value = this.raw.apply(this, args);
      return getValue(args[0] in ALIAS ? ALIAS[args[0]] : args, value);
    };

    __proto.raw = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var properties = this.properties;
      var params = args[0] in ALIAS ? ALIAS[args[0]] : args;
      var length = params.length;

      for (var i = 0; i < length; ++i) {
        if (!isObject(properties)) {
          return undefined;
        }

        properties = properties[params[i]];
      }

      return properties;
    };
    /**
      * remove property value
      * @method Scene.Frame#remove
      * @param {...String} args - property name
      * @return {Scene.Frame} An instance itself
      * @example
      frame.remove("display")
      */


    __proto.remove = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var properties = this.properties;
      var params = args[0] in ALIAS ? ALIAS[args[0]] : args;
      var length = params.length;

      if (!length) {
        return this;
      }

      for (var i = 0; i < length - 1; ++i) {
        if (!isObject(properties)) {
          return this;
        }

        properties = properties[params[i]];
      }

      delete properties[params[length - 1]];
      return this;
    };
    /**
      * set property
      * @method Scene.Frame#set
      * @param {...Number|String|Scene.PropertyObject} args - property names or values
      * @return {Scene.Frame} An instance itself
      * @example
    // one parameter
    frame.set({
      display: "none",
      transform: {
          translate: "10px, 10px",
          scale: "1",
      },
      filter: {
          brightness: "50%",
          grayscale: "100%"
      }
    });
     // two parameters
    frame.set("transform", {
      translate: "10px, 10px",
      scale: "1",
    });
     // three parameters
    frame.set("transform", "translate", "50px");
      */


    __proto.set = function () {
      var _this = this;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var length = args.length;
      var params = args.slice(0, -1);
      var value = args[length - 1];

      if (params[0] in ALIAS) {
        this._set(ALIAS[params[0]], value);
      } else if (length === 2 && isArray(params[0])) {
        this._set(params[0], value);
      } else if (isObject(value)) {
        if (isArray(value)) {
          this._set(params, value);
        } else if (isPropertyObject(value)) {
          if (isRole(params)) {
            this.set.apply(this, params.concat([toObject(value)]));
          } else {
            this._set(params, value);
          }
        } else if (value instanceof Frame) {
          this.merge(value);
        } else {
          for (var name in value) {
            this.set.apply(this, params.concat([name, value[name]]));
          }
        }
      } else if (isString(value)) {
        if (isRole(params)) {
          var obj = toPropertyObject(value);

          if (isObject(obj)) {
            this.set.apply(this, params.concat([obj]));
          }

          return this;
        } else {
          var styles = splitStyle(value);
          styles.forEach(function (style) {
            _this.set.apply(_this, params.concat([style]));
          });

          if (styles.length) {
            return this;
          }
        }

        this._set(params, value);
      } else {
        this._set(params, value);
      }

      return this;
    };
    /**
      * check that has property.
      * @method Scene.Frame#has
      * @param {...String} args - property name
      * @example
      frame.has("property", "display") // => true or false
      */


    __proto.has = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var properties = this.properties;
      var params = args[0] in ALIAS ? ALIAS[args[0]] : args;
      var length = params.length;

      if (!length) {
        return false;
      }

      for (var i = 0; i < length; ++i) {
        if (!isObject(properties) || !(params[i] in properties)) {
          return false;
        }

        properties = properties[params[i]];
      }

      return true;
    };
    /**
      * clone frame.
      * @method Scene.Frame#clone
      * @return {Scene.Frame} An instance of clone
      * @example
      frame.clone();
      */


    __proto.clone = function () {
      var frame = new Frame();
      frame.merge(this);
      return frame;
    };
    /**
      * merge one frame to other frame.
      * @method Scene.Frame#merge
      * @param {Scene.Frame} frame - target frame.
      * @return {Scene.Frame} An instance itself
      * @example
      frame.merge(frame2);
      */


    __proto.merge = function (frame) {
      var properties = this.properties;
      var frameProperties = frame.properties;

      if (!frameProperties) {
        return this;
      }

      merge(properties, frameProperties);
      return this;
    };

    __proto.toObject = function () {
      return clone(this.properties, true);
    };
    /**
      * Specifies an css object that coverted the frame.
      * @method Scene.Frame#toCSSObject
      * @return {object} cssObject
      */


    __proto.toCSSObject = function () {
      var properties = this.toObject();
      var cssObject = {};

      for (var name in properties) {
        if (isRole([name], true)) {
          continue;
        }

        var value = properties[name];

        if (name === TIMING_FUNCTION) {
          cssObject[TIMING_FUNCTION.replace("animation", ANIMATION)] = (isString(value) ? value : value.easingName) || "initial";
          continue;
        }

        cssObject[name] = value;
      }

      var transform = toInnerProperties(properties.transform);
      var filter = toInnerProperties(properties.filter);
      TRANSFORM && transform && (cssObject[TRANSFORM] = transform);
      FILTER && filter && (cssObject[FILTER] = filter);
      return cssObject;
    };
    /**
      * Specifies an css text that coverted the frame.
      * @method Scene.Frame#toCSS
      * @return {string} cssText
      */


    __proto.toCSS = function () {
      var cssObject = this.toCSSObject();
      var cssArray = [];

      for (var name in cssObject) {
        cssArray.push(name + ":" + cssObject[name] + ";");
      }

      return cssArray.join("");
    };

    __proto._set = function (args, value) {
      var properties = this.properties;
      var length = args.length;

      for (var i = 0; i < length - 1; ++i) {
        var name = args[i];
        !(name in properties) && (properties[name] = {});
        properties = properties[name];
      }

      if (!length) {
        return;
      }

      properties[args[length - 1]] = isString(value) ? toPropertyObject(value) : value;
    };

    return Frame;
  }();

  function getNames(names, stack) {
    var arr = [];

    for (var name in names) {
      stack.push(name);

      if (isObject(names[name])) {
        arr = arr.concat(getNames(names[name], stack));
      } else {
        arr.push(stack.slice());
      }

      stack.pop();
    }

    return arr;
  }

  function updateFrame(names, properties) {
    for (var name in properties) {
      var value = properties[name];

      if (!isObject(value) || isArray(value) || value instanceof PropertyObject) {
        names[name] = true;
        continue;
      }

      if (!isObject(names[name])) {
        names[name] = {};
      }

      updateFrame(names[name], properties[name]);
    }
  }
  /**
  * a list of objects in chronological order.
  * @memberof Scene
  */


  var Keyframes =
  /*#__PURE__*/
  function () {
    /**
       */
    function Keyframes() {
      this.times = [];
      this.items = {};
      this.names = {};
    }
    /**
      * A list of names
      * @return {string[][]} names
      * @example
    keyframes.getNames(); // [["a"], ["transform", "translate"], ["transform", "scale"]]
      */


    var __proto = Keyframes.prototype;

    __proto.getNames = function () {
      var names = this.names;
      return getNames(names, []);
    };
    /**
      * Check if keyframes has propery's name
      * @param {...string[]} name - property's time
      * @return {Boolean} true: if has property, false: not
      * @example
    keyframes.hasName("transform", "translate"); // true or not
      */


    __proto.hasName = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return isInProperties(this.names, args, true);
    };
    /**
       * update property names used in frames.
       * @return {Scene.Keyframes} An instance itself
       */


    __proto.update = function () {
      var items = this.items;

      for (var time in items) {
        this.updateFrame(items[time]);
      }

      return this;
    };
    /**
       * executes a provided function once for each scene item.
       * @param {Function} callback Function to execute for each element, taking three arguments
       * @param {Scene.Frame} [callback.item] The value of the item being processed in the keyframes.
       * @param {string} [callback.time] The time of the item being processed in the keyframes.
       * @param {object} [callback.items] The object that forEach() is being applied to.
       * @return {Scene.Keyframes} An instance itself
       */


    __proto.forEach = function (callback) {
      var times = this.times;
      var items = this.items;
      times.forEach(function (time) {
        callback(items[time], time, items);
      });
    };
    /**
      * update property names used in frame.
      * @param {Scene.Frame} [frame] - frame of that time.
      * @return {Scene.Keyframes} An instance itself
      * @example
    keyframes.updateFrame(frame);
      */


    __proto.updateFrame = function (frame) {
      if (!frame) {
        return this;
      }

      var properties = frame.properties;
      var names = this.names;
      updateFrame(names, properties);
      return this;
    };
    /**
       * Get how long an animation should take to complete one cycle.
       * @return {number} duration
       */


    __proto.getDuration = function () {
      var times = this.times;
      return times.length === 0 ? 0 : times[times.length - 1];
    };
    /**
       * Set how long an animation should take to complete one cycle.
       * @param {number} duration - duration
       * @return {Scene.Keyframes} An instance itself.
       */


    __proto.setDuration = function (duration, originalDuration) {
      if (originalDuration === void 0) {
        originalDuration = this.getDuration();
      }

      var ratio = duration / originalDuration;

      var _a = this,
          times = _a.times,
          items = _a.items;

      var obj = {};
      this.times = times.map(function (time) {
        var time2 = toFixed(time * ratio);
        obj[time2] = items[time];
        return time2;
      });
      this.items = obj;
    };
    /**
       * Set how much time you want to push ahead.
       * @param {number} time - time
       * @return {Scene.Keyframes} An instance itself.
       */


    __proto.unshift = function (time) {
      var _a = this,
          times = _a.times,
          items = _a.items;

      var obj = {};
      this.times = times.map(function (t) {
        var time2 = toFixed(time + t);
        obj[time2] = items[t];
        return time2;
      });
      this.items = obj;
      return this;
    };
    /**
      * get size of list
      * @return {Number} length of list
      */


    __proto.size = function () {
      return this.times.length;
    };
    /**
      * add object in list
      * @param {Number} time - frame's time
      * @param {Object} object - target
      * @return {Scene.Keyframes} An instance itself
      */


    __proto.add = function (time, object) {
      this.items[time] = object;
      this.addTime(time);
      return this;
    };
    /**
      * Check if keyframes has object at that time.
      * @param {Number} time - object's time
      * @return {Boolean} true: if has time, false: not
      */


    __proto.has = function (time) {
      return time in this.items;
    };
    /**
      * get object at that time.
      * @param {Number} time - object's time
      * @return {Object} object at that time
      */


    __proto.get = function (time) {
      return this.items[time];
    };
    /**
      * remove object at that time.
      * @param {Number} time - object's time
      * @return {Keyframes} An instance itself
      */


    __proto.remove = function (time) {
      var items = this.items;
      delete items[time];
      this.removeTime(time);
      return this;
    };

    __proto.addTime = function (time) {
      var times = this.times;
      var length = times.length;
      var pushIndex = length;

      for (var i = 0; i < length; ++i) {
        // if time is smaller than times[i], add time to index
        if (time === times[i]) {
          return this;
        } else if (time < times[i]) {
          pushIndex = i;
          break;
        }
      }

      this.times.splice(pushIndex, 0, time);
      return this;
    };

    __proto.removeTime = function (time) {
      var index = this.times.indexOf(time);

      if (index > -1) {
        this.times.splice(index, 1);
      }

      return this;
    };

    return Keyframes;
  }();

  /**
  * @namespace
  * @name Dot
  */
  /**
  * The dot product of Arrays
  * @memberof Dot
  * @function dotArray
  * @param {Array} a1 value1
  * @param {Array} a2 value2
  * @param {Number} b1 b1 ratio
  * @param {Number} b2 b2 ratio
  * @return {Array|Object} Array.
  * @example
  dotArray([0, 0, 0, 1],[50, 50, 50, 1],0.5, 0.5);
  // => [25, 25, 25, 1]
  */

  function dotArray(a1, a2, b1, b2) {
    if (b2 === 0) {
      return a2;
    }

    if (!isArray(a2)) {
      return a1;
    }

    var length = a2.length;
    return a1.map(function (v1, i) {
      if (i >= length) {
        return v1;
      } else {
        return dot(v1, a2[i], b1, b2);
      }
    });
  }
  /**
  * The dot product of PropertyObject(type=color)
  * If the values are not RGBA model, change them RGBA mdoel.
  * @memberof Dot
  * @function dotColor
  * @param {PropertyObject} a1 value1
  * @param {PropertyObject} a2 value2
  * @param {Number} b1 b1 ratio
  * @param {Number} b2 b2 ratio
  * @return {PropertyObject} PropertyObject(type=color).
  * @example
  var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
  dotColor("#000",  colorObject, 0.5, 0.5);
  // "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
  // return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
  */

  function dotColor(color1, color2, b1, b2) {
    if (b2 === 0) {
      return color2;
    } // convert array to PropertyObject(type=color)


    var value1 = color1.value;
    var value2 = color2.value; // If the model name is not same, the inner product is impossible.

    var model1 = color1.getOption("model");
    var model2 = color2.getOption("model");

    if (model1 !== model2) {
      // It is recognized as a string.
      return dot(color1.toValue(), color2.toValue(), b1, b2);
    }

    if (value1.length === 3) {
      value1[3] = 1;
    }

    if (value2.length === 3) {
      value2[3] = 1;
    }

    var v = dotArray(value1, value2, b1, b2);
    var colorModel = model1;

    for (var i = 0; i < 3; ++i) {
      v[i] = parseInt(v[i], 10);
    }

    var object = new PropertyObject(v, {
      type: "color",
      model: colorModel,
      prefix: colorModel + "(",
      suffix: ")"
    });
    return object;
  }
  /**
  * The dot product of Objects
  * @memberof Dot
  * @function dotObject
  * @param {PropertyObject} a1 value1
  * @param {PropertyObject} a2 value2
  * @param {Number} b1 b1 ratio
  * @param {Number} b2 b2 ratio
  * @return {PropertyObject} Array with Separator.
  * @example
  dotObject(PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)]),
  PropertyObject(["9px", "solid", rgba(50, 50, 50, 1)]),
  0.5, 0.5);
  // => PropertyObject(["5px", "solid", rgba(25, 25, 25, 1)])
  */

  function dotObject(a1, a2, b1, b2) {
    var a1Type = a1.getOption("type");

    if (a1Type === "color") {
      return dotColor(a1, a2, b1, b2);
    }

    var value1 = a1.value;
    var value2 = a2.value;
    var arr = dotArray(value1, value2, b1, b2);
    return new PropertyObject(arr, {
      type: a1Type,
      separator: a1.getOption("separator") || a2.getOption("separator"),
      prefix: a1.getOption("prefix") || a2.getOption("prefix"),
      suffix: a1.getOption("suffix") || a2.getOption("suffix"),
      model: a1.getOption("model") || a2.getOption("model")
    });
  }
  /**
  * The dot product of a1 and a2 for the b1 and b2.
  * @memberof Dot
  * @function dot
  * @param {String|Number|PropertyObject} a1 value1
  * @param {String|Number|PropertyObject} a2 value2
  * @param {Number} b1 b1 ratio
  * @param {Number} b2 b2 ratio
  * @return {String} Not Array, Not Separator, Only Number & Unit
  * @return {PropertyObject} Array with Separator.
  * @example
  dot(1, 3, 0.3, 0.7);
  // => 1.6
  */

  function dot(a1, a2, b1, b2) {
    if (b2 === 0) {
      return a2;
    } else if (b1 === 0 || b1 + b2 === 0) {
      // prevent division by zero.
      return a1;
    } // dot Object


    var type1 = getType(a1);
    var type2 = getType(a2);
    var isFunction1 = type1 === FUNCTION;
    var isFunction2 = type2 === FUNCTION;

    if (isFunction1 || isFunction2) {
      return function () {
        return dot(isFunction1 ? toPropertyObject(a1()) : a1, isFunction2 ? toPropertyObject(a2()) : a2, b1, b2);
      };
    } else if (type1 === type2) {
      if (type1 === PROPERTY) {
        return dotObject(a1, a2, b1, b2);
      } else if (type1 === "array") {
        return dotArray(a1, a2, b1, b2);
      } else if (type1 !== "value") {
        return a1;
      }
    } else {
      return a1;
    } // split number and unit of the value.


    var r1 = b1 / (b1 + b2);
    var r2 = 1 - r1;
    var v1 = splitUnit("" + a1);
    var v2 = splitUnit("" + a2);
    var v; // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환

    if (isNaN(v1.value) || isNaN(v2.value)) {
      return a1;
    } else {
      v = v1.value * r2 + v2.value * r1;
    }

    var prefix = v1.prefix || v2.prefix;
    var unit = v1.unit || v2.unit;

    if (!prefix && !unit) {
      return v;
    }

    return prefix + v + unit;
  }
  function dotValue(time, prevTime, nextTime, prevValue, nextValue, easing) {
    if (time === prevTime) {
      return prevValue;
    } else if (time === nextTime) {
      return nextValue;
    } else if (!easing) {
      return dot(prevValue, nextValue, time - prevTime, nextTime - time);
    }

    var ratio = easing((time - prevTime) / (nextTime - prevTime));
    var value = dot(prevValue, nextValue, ratio, 1 - ratio);
    return value;
  }

  function makeId(selector) {
    for (;;) {
      var id = "" + Math.floor(Math.random() * 100000);

      if (!selector) {
        return id;
      }

      var checkElement = document.querySelector("[data-scene-id=\"" + id + "\"]");

      if (!checkElement) {
        return id;
      }
    }
  }

  function makeAnimationProperties(properties) {
    var cssArray = [];

    for (var name in properties) {
      cssArray.push(ANIMATION + "-" + decamelize(name) + " : " + properties[name] + ";");
    }

    return cssArray.join("");
  }
  /**
  * manage Frame Keyframes and play keyframes.
  * @memberof Scene
  * @extends Scene.Animator
  * @example
  const item = new Scene.SceneItem({
      0: {
          display: "none",
      },
      1: {
          display: "block",
          opacity: 0,
      },
      2: {
          opacity: 1,
      }
  });
  */


  var SceneItem =
  /*#__PURE__*/
  function (_super) {
    __extends(SceneItem, _super);
    /**
      * @param {Object} [properties] - properties
      * @param {AnimatorOptions} [options] - options
      * @example
      const item = new Scene.SceneItem({
          0: {
              display: "none",
          },
          1: {
              display: "block",
              opacity: 0,
          },
          2: {
              opacity: 1,
          }
      });
       */


    function SceneItem(properties, options) {
      var _this = _super.call(this) || this;

      _this.keyframes = new Keyframes();
      _this.elements = [];

      _this.load(properties, options);

      return _this;
    }

    var __proto = SceneItem.prototype;

    __proto.getDuration = function () {
      return Math.max(this.state[DURATION], this.keyframes.getDuration());
    };

    __proto.setDuration = function (duration) {
      if (duration === 0) {
        return this;
      }

      var originalDuration = this.getDuration();

      if (originalDuration > 0) {
        this.keyframes.setDuration(duration, originalDuration);
      }

      _super.prototype.setDuration.call(this, toFixed(duration));

      return this;
    };
    /**
      * set the unique indicator of the item.
      * @method Scene.SceneItem#setId
      * @param {String} [id] - the indicator of the item.
      * @return {Scene.SceneItem} An instance itself
      * @example
    const item = new SceneItem();
     item.setId("item");
    console.log(item.getId()); // item
      */


    __proto.setId = function (id) {
      var elements = this.elements;
      var length = elements.length;
      this.setState({
        id: id || makeId(!!length)
      });
      var sceneId = toId(this.getId());
      this.state.selector || (this.state.selector = "[data-scene-id=\"" + sceneId + "\"]");

      if (!length) {
        return this;
      }

      for (var i = 0; i < length; ++i) {
        elements[i].setAttribute("data-scene-id", sceneId);
      }

      return this;
    };
    /**
      * Specifies the unique indicator of the item.
      * @method Scene.SceneItem#getId
      * @return {String} the indicator of the item.
      * @example
    const item = scene.newItem("item");
    console.log(item.getId()); // item
      */


    __proto.getId = function () {
      return this.state.id;
    };
    /**
      * Set properties to the sceneItem at that time
      * @method Scene.SceneItem#set
      * @param {Number} time - time
      * @param {...String|Object} [properties] - property names or values
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
    console.log(item.get(0, "a")); // "b"
      */


    __proto.set = function (time) {
      var _this = this;

      var args = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }

      if (isObject(time)) {
        this.load(time);
        return this;
      } else if (args[0]) {
        if (args[0] instanceof SceneItem) {
          var item = args[0];
          var delay = item.getDelay();
          var realTime_1 = this.getUnitTime(time) + delay;

          var _a = item.getAllTimes(!!delay || !this.hasFrame(time)),
              keys = _a.keys,
              values_1 = _a.values,
              frames_1 = _a.frames;

          var easing = this.getEasingName() !== item.getEasingName() ? item.getEasing() : 0;
          keys.forEach(function (t) {
            _this.set(realTime_1 + t, frames_1[values_1[t]]);
          });

          if (easing) {
            this.set(realTime_1 + keys[0], EASING, easing);
            this.set(realTime_1 + keys[keys.length - 1], EASING, "initial");
          }

          return this;
        } else if (args.length === 1 && isArray(args[0])) {
          args[0].forEach(function (item) {
            _this.set(time, item);
          });
          return this;
        }
      }

      var frame = this.newFrame(time);
      frame.set.apply(frame, args);
      this.updateFrame(frame);
      return this;
    };
    /**
      * Get properties of the sceneItem at that time
      * @param {Number} time - time
      * @param {...String|Object} args property's name or properties
      * @return {Number|String|Scene.PropertyObejct} property value
      * @example
    item.get(0, "a"); // item.getFrame(0).get("a");
    item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
      */


    __proto.get = function (time) {
      var args = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }

      var frame = this.getFrame(time);
      return frame && frame.get.apply(frame, args);
    };
    /**
      * remove properties to the sceneItem at that time
      * @param {Number} time - time
      * @param {...String|Object} [properties] - property names or values
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.remove(0, "a");
      */


    __proto.remove = function (time) {
      var args = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }

      var frame = this.getFrame(time);
      frame && frame.remove.apply(frame, args);
      this.update();
      return this;
    };
    /**
      * Append the item or object at the last time.
      * @param {SceneItem | object} item - the scene item or item object
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.append(new SceneItem({
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      }
    }));
    item.append({
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      }
    });
    item.set(item.getDuration(), {
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      }
    });
      */


    __proto.append = function (item) {
      this.set(this.getDuration(), item);
      return this;
    };
    /**
      * Push the front frames for the time and prepend the scene item or item object.
      * @param {SceneItem | object} item - the scene item or item object
      * @return {Scene.SceneItem} An instance itself
      */


    __proto.prepend = function (item) {
      if (item instanceof SceneItem) {
        var delay = item.getDelay();
        var duration = item.getIterationCount() === INFINITE ? item.getDuration() : item.getActiveDuration();
        var unshiftTime = duration + delay;
        var firstFrame = this.keyframes.get(0);

        if (firstFrame) {
          this.keyframes.remove(0);
        }

        this.keyframes.unshift(unshiftTime);
        this.set(0, item);
        this.set(unshiftTime + THRESHOLD, firstFrame);
      } else {
        this.prepend(new SceneItem(item));
      }

      return this;
    };
    /**
      * Specifies an element to synchronize items' keyframes.
      * @method Scene.SceneItem#setSelector
      * @param {string} selectors - Selectors to find elements in items.
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.setSelector("#id.class");
      */


    __proto.setSelector = function (selector) {
      this.state.selector = selector === true ? this.state.id : selector || "[data-scene-id=\"" + this.state.id + "\"]";
      var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(this.state.selector);

      if (matches) {
        this.state.selector = matches[1];
        this.state.peusdo = matches[2];
      }

      this.setElement(document.querySelectorAll(this.state.selector));
      return this;
    };
    /**
      * Specifies an element to synchronize item's keyframes.
      * @method Scene.SceneItem#setElement
      * @param {Element|Array|string} elements - elements to synchronize item's keyframes.
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.setElement(document.querySelector("#id.class"));
    item.setElement(document.querySelectorAll(".class"));
      */


    __proto.setElement = function (elements) {
      if (!elements) {
        return this;
      }

      this.elements = elements instanceof Element ? [elements] : elements;
      this.setId(this.getId());
      return this;
    };
    /**
      * add css styles of items's element to the frame at that time.
      * @method Scene.SceneItem#setCSS
      * @param {Array} properties - elements to synchronize item's keyframes.
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.setElement(document.querySelector("#id.class"));
    item.setCSS(0, ["opacity"]);
    item.setCSS(0, ["opacity", "width", "height"]);
      */


    __proto.setCSS = function (time, properties) {
      this.set(time, fromCSS(this.elements, properties));
      return this;
    };

    __proto.animate = function (time, parentEasing) {
      _super.prototype.setTime.call(this, time, true);

      return this._animate(parentEasing);
    };

    __proto.setTime = function (time, isNumber, parentEasing) {
      _super.prototype.setTime.call(this, time, isNumber);

      this._animate(parentEasing);

      return this;
    };
    /**
      * update property names used in frames.
      * @method Scene.SceneItem#update
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.update();
      */


    __proto.update = function () {
      this.keyframes.update();
      return this;
    };
    /**
      * update property names used in frame.
      * @method Scene.SceneItem#updateFrame
      * @param {Scene.Frame} [frame] - frame of that time.
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.updateFrame(time, this.get(time));
      */


    __proto.updateFrame = function (frame) {
      this.keyframes.updateFrame(frame);
      return this;
    };
    /**
      * Create and add a frame to the sceneItem at that time
      * @method Scene.SceneItem#newFrame
      * @param {Number} time - frame's time
      * @return {Scene.Frame} Created frame.
      * @example
    item.newFrame(time);
      */


    __proto.newFrame = function (time) {
      var frame = this.getFrame(time);

      if (frame) {
        return frame;
      }

      frame = new Frame();
      this.setFrame(time, frame);
      return frame;
    };
    /**
      * Add a frame to the sceneItem at that time
      * @method Scene.SceneItem#setFrame
      * @param {Number} time - frame's time
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.setFrame(time, frame);
      */


    __proto.setFrame = function (time, frame) {
      this.keyframes.add(this.getUnitTime(time), frame);
      this.keyframes.update();
      return this;
    };
    /**
      * get sceneItem's frame at that time
      * @method Scene.SceneItem#getFrame
      * @param {Number} time - frame's time
      * @return {Scene.Frame} sceneItem's frame at that time
      * @example
    const frame = item.getFrame(time);
      */


    __proto.getFrame = function (time) {
      return this.keyframes.get(this.getUnitTime(time));
    };
    /**
      * check if the item has a frame at that time
      * @method Scene.SceneItem#hasFrame
      * @param {Number} time - frame's time
      * @return {Boolean} true: the item has a frame // false: not
      * @example
    if (item.hasFrame(10)) {
      // has
    } else {
      // not
    }
      */


    __proto.hasFrame = function (time) {
      return this.keyframes.has(this.getUnitTime(time));
    };
    /**
      * remove sceneItem's frame at that time
      * @method Scene.SceneItem#removeFrame
      * @param {Number} time - frame's time
      * @return {Scene.SceneItem} An instance itself
      * @example
    item.removeFrame(time);
      */


    __proto.removeFrame = function (time) {
      var keyframes = this.keyframes;
      keyframes.remove(time);
      keyframes.update();
      return this;
    };
    /**
      * Copy frame of the previous time at the next time.
      * @method Scene.SceneItem#copyFrame
      * @param {number|string|object} fromTime - the previous time
      * @param {number} toTime - the next time
      * @return {Scene.SceneItem} An instance itself
      * @example
    // getFrame(0) equal getFrame(1)
    item.copyFrame(0, 1);
      */


    __proto.copyFrame = function (fromTime, toTime) {
      if (isObject(fromTime)) {
        for (var time in fromTime) {
          this.copyFrame(time, fromTime[time]);
        }

        return this;
      }

      var frame = this.getFrame(fromTime);

      if (!frame) {
        return this;
      }

      var copyFrame = frame.clone();
      this.setFrame(toTime, copyFrame);
      return this;
    };
    /**
      * merge frame of the previous time at the next time.
      * @method Scene.SceneItem#mergeFrame
      * @param {number|string|object} fromTime - the previous time
      * @param {number|string} toTime - the next time
      * @return {Scene.SceneItem} An instance itself
      * @example
    // getFrame(1) contains getFrame(0)
    item.merge(0, 1);
      */


    __proto.mergeFrame = function (fromTime, toTime) {
      if (isObject(fromTime)) {
        for (var time in fromTime) {
          this.mergeFrame(time, fromTime[time]);
        }

        return this;
      }

      var frame = this.getFrame(fromTime);

      if (!frame) {
        return this;
      }

      var toFrame = this.newFrame(toTime);
      toFrame.merge(frame);
      return this;
    };
    /**
      * Get frame of the current time
      * @method Scene.SceneItem#getNowFrame
      * @param {Number} time - the current time
      * @param {function} easing - the speed curve of an animation
      * @return {Scene.Frame} frame of the current time
      * @example
    let item = new Scene.SceneItem({
      0: {
          display: "none",
      },
      1: {
          display: "block",
          opacity: 0,
      },
      2: {
          opacity: 1,
      }
    });
    // opacity: 0.7; display:"block";
    const frame = item.getNowFrame(1.7);
      */


    __proto.getNowFrame = function (time, easing) {
      var _this = this;

      var frame = new Frame();
      var names = this.keyframes.getNames();

      var _a = this._getNearTimeIndex(time),
          left = _a.left,
          right = _a.right;

      var realEasing = this._getEasing(time, left, right, this.getEasing() || easing);

      names.forEach(function (properties) {
        var value = _this._getNowValue(time, left, right, properties, realEasing);

        if (isUndefined(value)) {
          return;
        }

        frame.set(properties, value);
      });
      return frame;
    };

    __proto.load = function (properties, options) {
      if (properties === void 0) {
        properties = {};
      }

      if (options === void 0) {
        options = properties.options;
      }

      if (isArray(properties)) {
        var length = properties.length;

        for (var i = 0; i < length; ++i) {
          var time = length === 1 ? 0 : this.getUnitTime(i / (length - 1) * 100 + "%");
          this.set(time, properties[i]);
        }
      } else if (properties.keyframes) {
        this.set(properties.keyframes);
      } else {
        for (var time in properties) {
          if (time === "options" || time === "keyframes") {
            continue;
          }

          var value = properties[time];
          var realTime = this.getUnitTime(time);

          if (typeof value === "number") {
            this.mergeFrame(value, realTime);
            continue;
          }

          this.set(realTime, value);
        }
      }

      options && this.setOptions(options);
      return this;
    };
    /**
       * clone SceneItem.
       * @method Scene.SceneItem#clone
       * @param {AnimatorOptions} [options] animator options
       * @return {Scene.SceneItem} An instance of clone
       * @example
       * item.clone();
       */


    __proto.clone = function (options) {
      if (options === void 0) {
        options = {};
      }

      var item = new SceneItem();
      item.setOptions(this.state);
      item.setOptions(options);
      this.keyframes.forEach(function (frame, time) {
        return item.setFrame(time, frame.clone());
      });
      return item;
    };

    __proto.setOptions = function (options) {
      if (options === void 0) {
        options = {};
      }

      _super.prototype.setOptions.call(this, options);

      var id = options.id,
          selector = options.selector,
          duration = options.duration,
          elements = options.elements;
      duration && this.setDuration(duration);
      id && this.setId(id);

      if (elements) {
        this.setElement(elements);
      } else if (selector) {
        this.setSelector(selector === true ? this.state.id : selector);
      }

      return this;
    };

    __proto.getAllTimes = function (isStartZero, options) {
      if (isStartZero === void 0) {
        isStartZero = true;
      }

      if (options === void 0) {
        options = {};
      }

      var times = this.keyframes.times.slice();
      var length = times.length;
      var keys = [];
      var values = {};

      if (!length) {
        return {
          keys: [],
          values: {},
          frames: {}
        };
      }

      var frames = {};
      var duration = this.getDuration();
      var direction = options[DIRECTION] || this.state[DIRECTION];
      var isShuffle = direction === ALTERNATE || direction === ALTERNATE_REVERSE;
      !this.getFrame(0) && times.unshift(0);
      !this.getFrame(duration) && times.push(duration);
      length = times.length;
      var iterationCount = options[ITERATION_COUNT] || this.state[ITERATION_COUNT];
      iterationCount = iterationCount !== INFINITE ? iterationCount : 1;
      var totalDuration = iterationCount * duration;

      for (var i = 0; i < iterationCount; ++i) {
        var isReverse = isDirectionReverse(i, iterationCount, direction);
        var start = i * duration;

        for (var j = 0; j < length; ++j) {
          if (isShuffle && i !== 0 && j === 0) {
            // pass duplicate
            continue;
          } // isStartZero is keytimes[0] is 0 (i === 0 & j === 0)


          var threshold = j === 0 && (i === 0 ? !isStartZero : !isShuffle) ? THRESHOLD : 0;
          var keyvalue = toFixed(isReverse ? times[length - 1 - j] : times[j]);
          var time = toFixed(isReverse ? duration - keyvalue : keyvalue);
          var keytime = toFixed(start + time + threshold);

          if (totalDuration < keytime) {
            break;
          }

          keys.push(keytime);
          values[keytime] = keyvalue;

          if (!frames[keyvalue]) {
            var frame = this.getFrame(keyvalue);

            if (!frame || j === 0 || j === length - 1 || frame.has("transform") || frame.has("filter")) {
              frames[keyvalue] = this.getNowFrame(keyvalue);
            } else {
              frames[keyvalue] = frame;
            }
          }
        }
      }

      if (keys[keys.length - 1] < totalDuration) {
        // last time === totalDuration
        var isReverse = isDirectionReverse(iterationCount, iterationCount, direction);
        var keyvalue = toFixed(duration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));
        keys.push(totalDuration);
        values[totalDuration] = keyvalue;
        !frames[keyvalue] && (frames[keyvalue] = this.getNowFrame(keyvalue));
      }

      return {
        keys: keys,
        values: values,
        frames: frames
      };
    };
    /**
      * Specifies an css text that coverted the keyframes of the item.
      * @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
      * @param {Array} [options={}] - parent options to unify options of items.
      * @example
    item.setCSS(0, ["opacity"]);
    item.setCSS(0, ["opacity", "width", "height"]);
      */


    __proto.toCSS = function (parentDuration, options) {
      if (parentDuration === void 0) {
        parentDuration = this.getDuration();
      }

      if (options === void 0) {
        options = {};
      }

      var state = this.state;
      var selector = state.selector || this.options.selector;

      if (!selector) {
        return "";
      }

      var peusdo = state.peusdo || "";

      var id = this._getId(); // infinity or zero


      var isParent = !isUndefined(options[ITERATION_COUNT]);
      var isZeroDuration = parentDuration === 0;
      var duration = isZeroDuration ? this.getDuration() : parentDuration;
      var playSpeed = options[PLAY_SPEED] || 1;
      var delay = ((options[DELAY] || 0) + (isZeroDuration ? state[DELAY] : 0)) / playSpeed;
      var easingName = state[EASING] && state[EASING_NAME] || isParent && options[EASING] && options[EASING_NAME] || state[EASING_NAME];
      var iterationCount = !isZeroDuration && options[ITERATION_COUNT] || state[ITERATION_COUNT];
      var fillMode = options[FILL_MODE] !== "forwards" && options[FILL_MODE] || state[FILL_MODE];
      var direction = options[DIRECTION] || state[DIRECTION];
      var cssText = makeAnimationProperties({
        fillMode: fillMode,
        direction: direction,
        iterationCount: iterationCount,
        delay: delay + "s",
        name: PREFIX + "KEYFRAMES_" + toId(id),
        duration: duration / playSpeed + "s",
        timingFunction: easingName
      });

      var css = selector + "." + START_ANIMATION + peusdo + " {\n\t\t\t" + cssText + "\n\t\t}" + selector + "." + PAUSE_ANIMATION + peusdo + " {\n      " + ANIMATION + "-play-state: paused;\n    }\n\t\t" + this._toKeyframes(duration, !isZeroDuration && isParent);

      return css;
    };

    __proto.exportCSS = function (duration, options) {
      if (duration === void 0) {
        duration = this.getDuration();
      }

      if (options === void 0) {
        options = {};
      }

      if (!this.elements.length) {
        return "";
      }

      var css = this.toCSS(duration, options);
      var isParent = !isUndefined(options[ITERATION_COUNT]);
      !isParent && exportCSS(this._getId(), css);
      return css;
    };

    __proto.pause = function () {
      _super.prototype.pause.call(this);

      this.isPausedCSS() && this.pauseCSS();
      return this;
    };

    __proto.isPausedCSS = function () {
      return this.state.playCSS && this.isPaused();
    };

    __proto.pauseCSS = function () {
      var elements = this.elements;
      var length = elements.length;

      if (!length) {
        return this;
      }

      for (var i = 0; i < length; ++i) {
        addClass(elements[i], PAUSE_ANIMATION);
      }
    };

    __proto.endCSS = function () {
      var elements = this.elements;
      var length = elements.length;

      if (!length) {
        return this;
      }

      for (var i = 0; i < length; ++i) {
        var element = elements[i];
        removeClass(element, PAUSE_ANIMATION);
        removeClass(element, START_ANIMATION);
      }

      this.setState({
        playCSS: false
      });
    };

    __proto.end = function () {
      !this.isEnded() && this.state.playCSS && this.endCSS();

      _super.prototype.end.call(this);

      return this;
    };
    /**
      * Play using the css animation and keyframes.
      * @param {boolean} [exportCSS=true] Check if you want to export css.
      * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
      * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
      * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
      * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
      * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
      * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
      * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
      * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
      * @example
    item.playCSS();
    item.playCSS(false, {
      direction: "reverse",
      fillMode: "forwards",
    });
      */


    __proto.playCSS = function (isExportCSS, properties) {
      if (isExportCSS === void 0) {
        isExportCSS = true;
      }

      if (properties === void 0) {
        properties = {};
      }

      playCSS(this, isExportCSS, properties);
      return this;
    };

    __proto.addPlayClass = function (isPaused, properties) {
      if (properties === void 0) {
        properties = {};
      }

      var elements = this.elements;
      var length = elements.length;
      var cssText = makeAnimationProperties(properties);

      if (!length) {
        return;
      }

      if (isPaused) {
        for (var i = 0; i < length; ++i) {
          removeClass(elements[i], PAUSE_ANIMATION);
        }
      } else {
        for (var i = 0; i < length; ++i) {
          var element = elements[i];
          element.style.cssText += cssText;

          if (hasClass(element, START_ANIMATION)) {
            removeClass(element, START_ANIMATION);

            (function (el) {
              requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                  addClass(el, START_ANIMATION);
                });
              });
            })(element);
          } else {
            addClass(element, START_ANIMATION);
          }
        }
      }

      return elements[0];
    };

    __proto._getId = function () {
      return this.state.id || this.setId().getId();
    };

    __proto._getEasing = function (time, left, right, easing) {
      if (this.keyframes.hasName(TIMING_FUNCTION)) {
        var nowEasing = this._getNowValue(time, left, right, [TIMING_FUNCTION], 0, true);

        return typeof nowEasing === "function" ? nowEasing : easing;
      }

      return easing;
    };

    __proto._toKeyframes = function (duration, isParent) {
      if (duration === void 0) {
        duration = this.getDuration();
      }

      var id = this._getId();

      var state = this.state;
      var playSpeed = state[PLAY_SPEED];
      var iterationCount = state[ITERATION_COUNT];
      var fillMode = state[FILL_MODE];
      var delay = isParent ? state[DELAY] : 0;
      var direction = isParent ? state[DIRECTION] : NORMAL;
      var isReverse = direction === REVERSE || direction === ALTERNATE_REVERSE;

      var _a = this.getAllTimes(true, {
        duration: duration,
        delay: delay,
        direction: direction,
        iterationCount: isParent && iterationCount !== INFINITE ? iterationCount : 1,
        isCSS: true
      }),
          keys = _a.keys,
          values = _a.values,
          frames = _a.frames;

      var length = keys.length;
      var css = {};
      var keyframes = [];

      if (!keys.length) {
        return "";
      }

      for (var time in frames) {
        css[time] = frames[time].toCSS();
      }

      var lastTime = keys[length - 1];
      var lastCSS = css[values[lastTime]];

      if (delay) {
        var delayCSS = isReverse && (fillMode === "both" || fillMode === "backwards") ? lastCSS : css[0];
        keyframes.push("0%{" + delayCSS + "}");
        isReverse && keyframes.push(delay / playSpeed / duration * 100 - THRESHOLD + "%{" + delayCSS + "}");
      }

      keys.forEach(function (time) {
        keyframes.push((delay + time) / playSpeed / duration * 100 + "%{" + css[values[time]] + "}");
      }); // if (afterDelay) {
      //   keyframes.push(`${lastTime / playSpeed / duration * 100 + THRESHOLD}%{${lastCSS}}`);
      //   keyframes.push(`100%{${lastCSS}`);
      // } else {

      if ((delay + lastTime) / playSpeed < duration) {
        // not 100%
        keyframes.push("100%{" + lastCSS + "}");
      } // }


      return "@" + KEYFRAMES + " " + PREFIX + "KEYFRAMES_" + toId(id) + "{\n\t\t\t" + keyframes.join("\n") + "\n\t\t}";
    };

    __proto._getNowValue = function (time, left, right, properties, easing, usePrevValue) {
      if (easing === void 0) {
        easing = this.getEasing();
      }

      if (usePrevValue === void 0) {
        usePrevValue = isFixed(properties);
      }

      var keyframes = this.keyframes;
      var times = keyframes.times;
      var length = times.length;
      var prevTime;
      var nextTime;
      var prevFrame;
      var nextFrame;

      for (var i = left; i >= 0; --i) {
        var frame = keyframes.get(times[i]);

        if (frame.has.apply(frame, properties)) {
          prevTime = times[i];
          prevFrame = frame;
          break;
        }
      }

      var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);

      if (usePrevValue) {
        return prevValue;
      }

      for (var i = right; i < length; ++i) {
        var frame = keyframes.get(times[i]);

        if (frame.has.apply(frame, properties)) {
          nextTime = times[i];
          nextFrame = frame;
          break;
        }
      }

      var nextValue = nextFrame && nextFrame.raw.apply(nextFrame, properties);

      if (!prevFrame || isUndefined(prevValue)) {
        return nextValue;
      }

      if (!nextFrame || isUndefined(nextValue) || prevValue === nextValue) {
        return prevValue;
      }

      if (prevTime < 0) {
        prevTime = 0;
      }

      return dotValue(time, prevTime, nextTime, prevValue, nextValue, easing);
    };

    __proto._getNearTimeIndex = function (time) {
      var keyframes = this.keyframes;
      var times = keyframes.times;
      var length = times.length;

      for (var i = 0; i < length; ++i) {
        if (times[i] === time) {
          return {
            left: i,
            right: i
          };
        } else if (times[i] > time) {
          return {
            left: i === 0 ? 0 : i - 1,
            right: i
          };
        }
      }

      return {
        left: length - 1,
        right: length - 1
      };
    };

    __proto._animate = function (parentEasing) {
      var iterationTime = this.getIterationTime();
      var easing = this.getEasing() || parentEasing;
      var frame = this.getNowFrame(iterationTime, easing);
      var currentTime = this.getTime();
      /**
           * This event is fired when timeupdate and animate.
           * @event Scene.SceneItem#animate
           * @param {Number} param.currentTime The total time that the animator is running.
           * @param {Number} param.time The iteration time during duration that the animator is running.
           * @param {Scene.Frame} param.frame frame of that time.
           */

      this.trigger("animate", {
        frame: frame,
        currentTime: currentTime,
        time: iterationTime
      });
      var elements = this.elements;
      var length = elements.length;

      if (!length || this.state.peusdo) {
        return frame;
      }

      var attributes = frame.get("attribute");

      if (attributes) {
        for (var name in attributes) {
          for (var i = 0; i < length; ++i) {
            elements[i].setAttribute(name, attributes[name]);
          }
        }
      }

      var cssText = frame.toCSS();

      if (this.state.cssText !== cssText) {
        this.state.cssText = cssText;

        for (var i = 0; i < length; ++i) {
          elements[i].style.cssText += cssText;
        }

        return frame;
      }
    };

    return SceneItem;
  }(Animator);

  /**
  * manage sceneItems and play Scene.
  * @extends Scene.Animator
  */

  var Scene =
  /*#__PURE__*/
  function (_super) {
    __extends(Scene, _super);
    /**
      * @param {Object} [properties] - properties
      * @param {AnimatorOptions} [options] - options
      * @example
      const scene = new Scene({
          item1: {
              0: {
                  display: "none",
              },
              1: {
                  display: "block",
                  opacity: 0,
              },
              2: {
                  opacity: 1,
              },
          },
          item2: {
              2: {
                  opacity: 1,
              },
          }
      });
       */


    function Scene(properties, options) {
      var _this = _super.call(this) || this;

      _this.items = {};

      _this.load(properties, options);

      return _this;
    }

    var __proto = Scene.prototype;

    __proto.setId = function (id) {
      if (id === void 0) {
        id = "scene" + Math.floor(Math.random() * 100000);
      }

      this.state.id = id;
      return this;
    };

    __proto.getId = function () {
      return this.state.id;
    };

    __proto.getDuration = function () {
      var items = this.items;
      var time = 0;

      for (var id in items) {
        var item = items[id];
        time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
      }

      return time;
    };

    __proto.setDuration = function (duration) {
      var items = this.items;
      var sceneDuration = this.getDuration();

      if (duration === 0 || !isFinite(sceneDuration)) {
        return this;
      }

      if (sceneDuration === 0) {
        for (var id in items) {
          var item = items[id];
          item.setDuration(duration);
        }
      } else {
        var ratio = duration / sceneDuration;

        for (var id in items) {
          var item = items[id];
          item.setDelay(item.getDelay() * ratio);
          item.setDuration(item.getDuration() * ratio);
        }
      }

      return this;
    };
    /**
      * get item in scene by name
      * @method Scene#getItem
      * @param {string} name - item's name
      * @return {Scene.SceneItem} item
      * @example
    const item = scene.getItem("item1")
      */


    __proto.getItem = function (name) {
      return this.items[name];
    };
    /**
      * create item in scene
      * @method Scene#newItem
      * @param {String} name - name of item to create
      * @param {StateOptions} options - The option object of SceneItem
      * @return {Sceme.SceneItem} Newly created item
      * @example
    const item = scene.newItem("item1")
      */


    __proto.newItem = function (name, options) {
      if (options === void 0) {
        options = {};
      }

      if (name in this.items) {
        return;
      }

      var item = new SceneItem();
      this.setItem(name, item);
      item.setOptions(options);
      return item;
    };
    /**
      * add a sceneItem to the scene
      * @param {String} name - name of item to create
      * @param {Scene.SceneItem} item - sceneItem
      * @example
    const item = scene.newItem("item1")
      */


    __proto.setItem = function (name, item) {
      if (item instanceof Animator) {
        item.setId(name);
      }

      this.items[name] = item;
      return this;
    };

    __proto.animate = function (time, parentEasing) {
      _super.prototype.setTime.call(this, time, true);

      return this._animate(parentEasing);
    };

    __proto.setTime = function (time, isNumber, parentEasing) {
      _super.prototype.setTime.call(this, time, isNumber);

      this._animate(parentEasing);

      return this;
    };
    /**
       * executes a provided function once for each scene item.
       * @param {Function} func Function to execute for each element, taking three arguments
       * @param {Scene | Scene.SceneItem} [func.item] The value of the item being processed in the scene.
       * @param {string} [func.name] The name of the item being processed in the scene.
       * @param {object} [func.items] The object that forEach() is being applied to.
       * @return {Scene} An instance itself
       */


    __proto.forEach = function (func) {
      var items = this.items;

      for (var name in items) {
        func(items[name], name, items);
      }

      return this;
    };
    /**
       * Export the CSS of the items to the style.
       * @return {Scene} An instance itself
       */


    __proto.exportCSS = function (duration, state) {
      if (duration === void 0) {
        duration = this.getDuration();
      }

      var items = this.items;
      var totalDuration = state ? this.getDuration() : duration;

      if (!totalDuration || !isFinite(totalDuration)) {
        totalDuration = 0;
      }

      var isParent = !!state;
      var styles = [];

      for (var id in items) {
        var item = items[id];
        styles.push(item.exportCSS(totalDuration, this.state));
      }

      var css = styles.join("");
      !isParent && exportCSS(this.getId() || this.setId().getId(), css);
      return css;
    };

    __proto.append = function (item) {
      item.setDelay(item.getDelay() + this.getDuration());
      this.setItem(item.getId() || item.setId().getId(), item);
    };

    __proto.isPausedCSS = function () {
      return this.state.playCSS && this.isPaused();
    };

    __proto.pauseCSS = function () {
      var items = this.items;

      for (var id in items) {
        items[id].pauseCSS();
      }
    };

    __proto.pause = function () {
      _super.prototype.pause.call(this);

      this.isPausedCSS() && this.pauseCSS();
      return this;
    };

    __proto.endCSS = function () {
      var items = this.items;

      for (var id in items) {
        items[id].endCSS();
      }

      this.setState({
        playCSS: false
      });
    };

    __proto.end = function () {
      !this.isEnded() && this.state.playCSS && this.endCSS();

      _super.prototype.end.call(this);

      return this;
    };

    __proto.addPlayClass = function (isPaused, properties) {
      if (properties === void 0) {
        properties = {};
      }

      var items = this.items;
      var animtionElement;

      for (var id in items) {
        var el = items[id].addPlayClass(isPaused, properties);
        !animtionElement && (animtionElement = el);
      }

      return animtionElement;
    };
    /**
      * Play using the css animation and keyframes.
      * @param {boolean} [exportCSS=true] Check if you want to export css.
      * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
      * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
      * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
      * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
      * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
      * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
      * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
      * @return {Scene} An instance itself
      * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
      * @example
    scene.playCSS();
    scene.playCSS(false, {
      direction: "reverse",
      fillMode: "forwards",
    });
      */


    __proto.playCSS = function (isExportCSS, properties) {
      if (isExportCSS === void 0) {
        isExportCSS = true;
      }

      if (properties === void 0) {
        properties = {};
      }

      playCSS(this, isExportCSS, properties);
      return this;
    };

    __proto.set = function (properties) {
      if (properties === void 0) {
        properties = {};
      }

      this.load(properties);
    };

    __proto.load = function (properties, options) {
      if (properties === void 0) {
        properties = {};
      }

      if (options === void 0) {
        options = properties.options;
      }

      if (!properties) {
        return this;
      }

      var isSelector = options && options.selector;

      for (var name in properties) {
        if (name === "options") {
          continue;
        }

        var object = properties[name];
        var item = void 0;

        if (object instanceof Scene || object instanceof SceneItem) {
          this.setItem(name, object);
          item = object;
        } else {
          item = this.newItem(name);
          item.load(object);
        }

        isSelector && item.setSelector(name);
      }

      this.setOptions(options);
    };

    __proto.setSelector = function (_) {
      var isSelector = this.options.selector;
      this.forEach(function (item, name) {
        item.setSelector(isSelector ? name : false);
      });
    };

    __proto._animate = function (parentEasing) {
      var iterationTime = this.getIterationTime();
      var items = this.items;
      var easing = this.getEasing() || parentEasing;
      var frames = {};

      for (var id in items) {
        var item = items[id];
        frames[id] = item.animate(Math.max(iterationTime * item.getPlaySpeed() - item.getDelay(), 0), easing);
      }
      /**
           * This event is fired when timeupdate and animate.
           * @param {Number} param.currentTime The total time that the animator is running.
           * @param {Number} param.time The iteration time during duration that the animator is running.
           * @param {Frame} param.frames frame of that time.
           */


      this.trigger(ANIMATE, {
        currentTime: this.getTime(),
        time: iterationTime,
        frames: frames
      });
      return frames;
    };

    return Scene;
  }(Animator);

  /**
   * @namespace presets
   */

  /**
   * Use the property to create an effect.
   * @memberof presets
   * @func set
   * @param {string | string[]} property - property to set effect
   * @param {any[]} values - values of 100%
   * @param {AnimatorOptions} [options]
   * @example
  // import {set, blink} from "scenejs";
  // set("opacity", [0, 1, 0], {duration: 2});
  Scene.set("opacity", [0, 1, 0], {duration: 2});

  // Same
  Scene.blink({duration: 2});

  // Same
  new SceneItem({
      "0%": {
          opacity: 0,
      },
      "50%": {
          opacity: 1,
      }
      "100%": {
          opacity: 0,
      }
  }, {
      duration: 2,
  });
   */

  function set(property, values, options) {
    var item = new SceneItem({}, options);
    var length = values.length;

    for (var i = 0; i < length; ++i) {
      item.set(i / (length - 1) * 100 + "%", property, values[i]);
    }

    return item;
  }
  /**
   * Make a zoom in effect.
   * @memberof presets
   * @func zoomIn
   * @param {AnimatorOptions} options
   * @param {number} [options.from = 0] start zoom
   * @param {number}[options.to = 1] end zoom
   * @param {number} options.duration animation's duration
   * @example
  // import {set, zoomIn} from "scenejs";
  // zoomIn({duration: 2});
  Scene.zoomIn({duration: 2});
  // Same
  new SceneItem({
      "0%": {
          "transform": "scale(0)",
      },
      "100%": {
          "transform": "scale(1)",
      }
  }, {
      duration: 2,
  });
   */

  function zoomIn(_a) {
    var _b = _a.from,
        from = _b === void 0 ? 0 : _b,
        _c = _a.to,
        to = _c === void 0 ? 1 : _c;
    return set(["transform", "scale"], [from, to], arguments[0]);
  }

  $(".star5").appendChild(star({
    side: 5,
    width: 50,
    stroke: "#ccc",
    strokeWidth: 2
  }));
  $(".polygon6").appendChild(poly({
    side: 6,
    width: 50,
    stroke: "#ccc",
    strokeWidth: 2
  }));
  $(".triangle").appendChild(poly({
    side: 3,
    width: 50,
    stroke: "#ccc",
    strokeWidth: 2
  }));
  var characterKeyframes = {
    0: {
      transform: "translate(-100%)"
    },
    1: {
      transform: "translate(0%)"
    }
  };
  var mainScene = new Scene({
    ".page.main .line-top": {
      0: {
        transform: "translateY(-100%) scaleY(1)"
      },
      1: {
        transform: "translateY(0%) scaleY(0)"
      },
      options: {
        easing: EASE_IN
      }
    },
    ".page.main .circle1": {
      0: {
        "border-width": "100px",
        "transform": "scale(0)"
      },
      0.9: {
        opacity: 1
      },
      1: {
        "border-width": "0px",
        "transform": "scale(1)",
        "opacity": 0
      },
      options: {
        delay: 1
      }
    },
    ".page.main .circle2": {
      0: {
        "border-width": "200px",
        "transform": "scale(0)"
      },
      0.3: {
        opacity: 1
      },
      0.9: {
        "border-width": "0px",
        "transform": "scale(1)",
        "opacity": 0
      },
      2: 1,
      options: {
        delay: 1.6
      }
    },
    ".page.main .rectangle": {
      0: {
        opacity: 0,
        transform: "translate(-50%, -50%) rotate(30deg) translate2(0px) scale(0.3)"
      },
      0.1: {
        opacity: 1
      },
      1: {
        opacity: 1
      },
      1.5: {
        transform: "rotate(0deg) translate2(-100px) scale(1)",
        opacity: 0
      },
      options: {
        delay: 2
      }
    },
    ".page.main .star5": {
      0: {
        opacity: 0,
        transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)"
      },
      0.1: {
        opacity: 1
      },
      1: {
        opacity: 1
      },
      1.5: {
        transform: "rotate(150deg) translate2(-5px, -98px) scale(1)",
        opacity: 0
      },
      options: {
        delay: 2
      }
    },
    ".page.main .circle3": {
      0: {
        opacity: 0,
        transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)"
      },
      0.1: {
        opacity: 1
      },
      1: {
        opacity: 1
      },
      1.5: {
        transform: "rotate(150deg) translate2(95px, -40px) scale(1)",
        opacity: 0
      },
      options: {
        delay: 2
      }
    },
    ".page.main .polygon6": {
      0: {
        opacity: 0,
        transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)"
      },
      0.1: {
        opacity: 1
      },
      1: {
        opacity: 1
      },
      1.5: {
        transform: "rotate(150deg) translate2(75px, 75px) scale(1)",
        opacity: 0
      },
      options: {
        delay: 2
      }
    },
    ".page.main .triangle": {
      0: {
        opacity: 0,
        transform: "translate(-50%, -50%) translate2(0px, 0px) rotate(0deg) scale(0.3)"
      },
      0.1: {
        opacity: 1
      },
      1: {
        opacity: 1
      },
      1.5: {
        transform: "rotate(-150deg) translate2(-40px, 90px) scale(1)",
        opacity: 0
      },
      options: {
        delay: 2
      }
    },
    ".page.main .character.d .back1": {
      0: {
        transform: "scaleX(0)"
      },
      1: {
        transform: "scaleX(1)"
      },
      options: {
        delay: 2.8
      }
    },
    ".page.main .character.d .back2": {
      0: {
        transform: "scaleX(0)"
      },
      1: {
        transform: "scaleX(1)"
      },
      options: {
        delay: 3
      }
    },
    ".page.main .character.d span": {
      keyframes: characterKeyframes,
      options: {
        delay: 3.1
      }
    },
    ".page.main .character.a span": {
      keyframes: characterKeyframes,
      options: {
        delay: 3.3
      }
    },
    ".page.main .character.y span": {
      keyframes: characterKeyframes,
      options: {
        delay: 3.5
      }
    },
    ".page.main .character.b span": {
      keyframes: characterKeyframes,
      options: {
        delay: 3.7
      }
    },
    ".page.main .character.r span": {
      keyframes: characterKeyframes,
      options: {
        delay: 3.9
      }
    },
    ".page.main .character.u span": {
      keyframes: characterKeyframes,
      options: {
        delay: 4.1
      }
    },
    ".page.main .character.s span": {
      keyframes: characterKeyframes,
      options: {
        delay: 4.3
      }
    },
    ".page.main .character.h span": {
      keyframes: characterKeyframes,
      options: {
        delay: 4.5
      }
    }
  }, {
    easing: EASE_OUT,
    selector: true,
    iterationCount: 1
  });

  for (var i = 1; i <= 8; ++i) {
    mainScene.newItem(".glitter" + i, {
      selector: true
    }).set({
      0: {
        width: "0px",
        transform: {
          rotate: 360 / 8 * i + "deg",
          translate: "0px",
          scaleX: 1
        },
        opacity: 0
      },
      0.5: {
        width: "50px",
        opacity: 1
      },
      1: {
        width: "0px",
        transform: {
          translate: "100px",
          scaleX: 0
        },
        opacity: 0
      },
      options: {
        delay: 1
      }
    });
  }

  var wheelScene = new Scene({
    ".page.main .scroll-wheel": {
      0: {
        opacity: 0,
        transform: "translateY(0px)"
      },
      0.1: {
        opacity: 1
      },
      0.9: {
        opacity: 1
      },
      1: {
        opacity: 0,
        transform: "translateY(30px)"
      }
    }
  }, {
    iterationCount: "infinite",
    selector: true
  });

  function typing(_a) {
    var property = _a.property,
        text = _a.text,
        duration = _a.duration,
        _b = _a.quote,
        quote = _b === void 0 ? "" : _b;
    var item = new SceneItem();
    var length = text.length;

    for (var i = 0; i <= length; ++i) {
      item.set(duration * i / length, property, "" + quote + text.substring(0, i) + quote);
    }

    return item;
  }

  var characters = {
    f: ["a", "b", "c", "d", "F"],
    r: ["a", "p", "g", "1", "r"],
    o: ["b", "q", "h", "u", "o"],
    n: ["c", "n", "o", "y", "n"],
    t: ["d", "m", "3", "j", "t"],
    dash: ["*", "+", "!", "@", "-"],
    e: ["f", "z", "a", "1", "e"],
    n2: ["g", "x", "7", "v", "n"],
    d: ["h", "c", "6", "b", "d"]
  };
  var aboutScene = new Scene({
    ".page.about .description .span1": {
      1: typing({
        property: ["attribute", "data-character"],
        text: "with main focus on",
        duration: 1
      })
    },
    ".page.about .description .span2": {
      2: typing({
        property: ["attribute", "data-character"],
        text: "Develope and Design.",
        duration: 1
      })
    }
  }, {
    selector: true
  });
  Object.keys(characters).forEach(function (name, index) {
    var item = aboutScene.newItem(".page.about h3 .character." + name, {
      selector: true
    });
    var character = characters[name];
    item.set(index * 0.1, "attribute", "data-character", "");
    character.forEach(function (chr, i) {
      item.set((index + i + 1) * 0.1, "attribute", "data-character", "" + chr);
    });
  }); // aboutScene.play();

  var prefixes$1 = ["webkit", "ms", "moz", "o"];

  var checkProperties$1 =
  /*#__PURE__*/
  function (property) {
    var styles = (document.body || document.documentElement).style;
    var length = prefixes$1.length;

    if (typeof styles[property] !== "undefined") {
      return property;
    }

    for (var i = 0; i < length; ++i) {
      var name = "-" + prefixes$1[i] + "-" + property;

      if (typeof styles[name] !== "undefined") {
        return name;
      }
    }

    return "";
  };
  var TRANSFORM$1 =
  /*#__PURE__*/
  checkProperties$1("transform");
  var FILTER$1 =
  /*#__PURE__*/
  checkProperties$1("filter");
  var ANIMATION$1 =
  /*#__PURE__*/
  checkProperties$1("animation");
  var KEYFRAMES$1 =
  /*#__PURE__*/
  ANIMATION$1.replace("animation", "keyframes");
  function now() {
    return Date.now ? Date.now() : new Date().getTime();
  }
  var requestAnimationFrame$1 =
  /*#__PURE__*/
  function () {
    var firstTime = now();
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      var currTime = now();
      var id = window.setTimeout(function () {
        callback(currTime - firstTime);
      }, 1000 / 60);
      return id;
    };
  }();
  function addClass$1(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += " " + className;
    }
  }
  function removeClass$1(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      element.className = element.className.replace(reg, " ");
    }
  }

  function setDrag(el, options) {
    var flag = false;
    var startX = 0;
    var startY = 0;
    var datas = {};
    var _a = options.container,
        container = _a === void 0 ? el : _a,
        dragstart = options.dragstart,
        drag = options.drag,
        dragend = options.dragend;

    function getPosition(e) {
      return e.touches && e.touches.length ? e.touches[0] : e;
    }

    function onDragStart(e) {
      flag = true;

      var _a = getPosition(e),
          clientX = _a.clientX,
          clientY = _a.clientY;

      startX = clientX;
      startY = clientY;
      datas = {};
      (dragstart && dragstart({
        datas: datas
      })) === false && (flag = false);
      flag && e.preventDefault();
    }

    function onDrag(e) {
      if (!flag) {
        return;
      }

      var _a = getPosition(e),
          clientX = _a.clientX,
          clientY = _a.clientY;

      drag && drag({
        deltaX: clientX - startX,
        deltaY: clientY - startY,
        datas: datas
      });
    }

    function onDragEnd() {
      if (!flag) {
        return;
      }

      flag = false;
      dragend && dragend({
        datas: datas
      });
    }

    el.addEventListener("mousedown", onDragStart);
    el.addEventListener("touchstart", onDragStart);
    container.addEventListener("mousemove", onDrag);
    container.addEventListener("touchmove", onDrag);
    container.addEventListener("mouseup", onDragEnd);
    container.addEventListener("mouseleave", onDragEnd);
    container.addEventListener("touchend", onDragEnd);
  }

  var _a, _b;
  $(".page.works .play").appendChild(poly({
    strokeWidth: 10,
    left: 5,
    top: 5,
    right: 5,
    bottom: 5,
    width: 50,
    rotate: 90,
    fill: "#333",
    stroke: "#333"
  }));
  var clapperScene = new Scene({
    ".clapper": {
      2: {
        transform: "rotate(0deg)"
      },
      2.5: {
        transform: "rotate(-15deg)"
      },
      3: {
        transform: "rotate(0deg)"
      },
      options: {
        easing: EASE_IN_OUT
      }
    },
    ".clapper-container": {
      0: [zoomIn({
        duration: 1
      })]
    },
    ".page.works .circle": {
      0.3: zoomIn({
        duration: 1
      })
    },
    ".page.works .clapper .play": {
      0.6: zoomIn({
        duration: 1
      })
    },
    ".page.works .top .stick1": {
      2: {
        transform: {
          rotate: "0deg"
        }
      },
      2.5: {
        transform: {
          rotate: "-20deg"
        }
      },
      3: {
        transform: {
          rotate: "0deg"
        }
      },
      options: {
        easing: EASE_IN_OUT
      }
    }
  }, {
    easing: bezier(.74, 0, .42, 1.47),
    selector: true
  });

  for (var i$1 = 0; i$1 < 6; ++i$1) {
    clapperScene.newItem(".stick1 .rect" + (i$1 + 1), {
      selector: true
    }).set((_a = {
      0: {
        opacity: 0
      }
    }, _a[0.6 + i$1 * 0.1] = {
      opacity: 1,
      transform: {
        scale: 0,
        skew: "15deg"
      }
    }, _a[1.3 + i$1 * 0.1] = {
      transform: {
        scale: 1
      }
    }, _a));
    clapperScene.newItem(".stick2 .rect" + (i$1 + 1), {
      selector: true
    }).set((_b = {
      0: {
        opacity: 0
      }
    }, _b[0.8 + i$1 * 0.1] = {
      opacity: 1,
      transform: {
        scale: 0,
        skew: "-15deg"
      }
    }, _b[1.5 + i$1 * 0.1] = {
      transform: {
        scale: 1
      }
    }, _b));
  }

  clapperScene.setDuration(4);
  var svg = poly({
    left: 10,
    side: 3,
    width: 100,
    split: 20,
    stroke: "#333",
    strokeWidth: 5
  });
  svg.setAttribute("class", "logo");
  svg.setAttribute("viewBox", "0 0 120 120");
  document.querySelector(".shape-svg").appendChild(svg);
  var rect1 = getRect({
    left: 10,
    side: 3,
    split: 20,
    strokeWidth: 5
  });
  var rect2 = getRect({
    left: 10,
    side: 3,
    innerRadius: 30,
    split: 10,
    strokeWidth: 5
  });
  var rect3 = getRect({
    left: 10,
    side: 5,
    split: 12,
    strokeWidth: 5
  });
  var rect4 = getRect({
    left: 10,
    side: 5,
    innerRadius: 30,
    split: 6,
    strokeWidth: 5
  });
  var shapeScene = new Scene({
    ".shape-svg .thumb": {
      0: {
        left: "0%"
      },
      5: {
        left: "100%"
      },
      options: {
        easing: LINEAR
      }
    },
    ".shape-svg .logo": {
      2: {
        transform: "rotate(0deg)"
      },
      3: {
        transform: "rotate(90deg)"
      },
      4: {
        transform: "rotate(90deg)"
      },
      5: {
        transform: "rotate(0deg)"
      }
    },
    ".shape-svg .logo path": {
      0: {
        attribute: {
          "stroke-dasharray": "0 500"
        },
        easing: LINEAR
      },
      2: {
        attribute: {
          "stroke-dasharray": "500 500",
          "d": getPath(rect1.points)
        },
        transform: "rotate(0deg)",
        easing: EASE_IN_OUT
      },
      3: {
        attribute: {
          d: getPath(rect2.points)
        },
        transform: "rotate(90deg)"
      },
      4: {
        attribute: {
          d: getPath(rect3.points)
        },
        transform: "rotate(90deg)"
      },
      5: {
        attribute: {
          d: getPath(rect4.points)
        },
        transform: "rotate(0deg)"
      }
    }
  }, {
    duration: 4,
    selector: true,
    easing: EASE_IN_OUT
  });
  $(".page.works .clapper .play").addEventListener("click", function () {
    ANIMATION$1 ? clapperScene.playCSS(false) : clapperScene.play();
  });
  var thumb = $(".page.works .shape-svg .thumb");
  setDrag(thumb, {
    container: document.body,
    dragstart: function (_a) {
      var datas = _a.datas;

      if (shapeScene.getPlayState() === "running") {
        return false;
      }

      datas.time = shapeScene.getTime();
    },
    drag: function (_a) {
      var deltaX = _a.deltaX,
          datas = _a.datas;
      shapeScene.setTime(datas.time + deltaX / 50);
    }
  });

  function observeScene(selectors, scene, css) {
    observe(selectors, {
      firstEnter: function () {
        ANIMATION$1 && css && scene.exportCSS();
      },
      enter: function () {
        css && ANIMATION$1 ? scene.playCSS(false) : scene.play();
      },
      exit: function () {
        scene.finish();
      }
    });
  }

  observeScene([".page.main"], wheelScene, true);
  observeScene([".page.main", ".motion"], mainScene, true);
  observeScene([".page.about", ".header"], aboutScene, false);
  observe([".page.about", ".blocks"], {
    enter: function (el) {
      addClass$1(el, "show");
    },
    exit: function (el) {
      removeClass$1(el, "show");
    }
  });
  observeScene([".page.works", ".container1 .work"], clapperScene, true);
  observeScene([".page.works", ".container2 .work"], shapeScene);
  initialize();

}());
//# sourceMappingURL=index.js.map
