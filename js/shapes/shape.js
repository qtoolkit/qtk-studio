"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
/**
 * Shape的外观效果参数。
 */
var ShapeStyle = (function () {
    function ShapeStyle() {
        this.lineWidth = 1;
        this.lineColor = 'black';
        this.textColor = 'black';
        this.fontSize = 14;
        this.fontFamily = "Sans";
        this.bold = false;
        this.italic = false;
        this.underline = false;
    }
    Object.defineProperty(ShapeStyle.prototype, "font", {
        /**
         * 字体。由其它参数组合而成，目前不支持设置。
         */
        get: function () {
            var font = "";
            if (this.bold) {
                font += "Bold ";
            }
            if (this.italic) {
                font += "Italic ";
            }
            font += this.fontSize + 'px ' + this.fontFamily;
            return font;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 把当前对象的属性存到一个JSON对象中。
     */
    ShapeStyle.prototype.toJson = function () {
        var json = {};
        for (var key in this) {
            var value = this[key];
            var type = typeof this[key];
            if (type !== 'function') {
                json[key] = value;
            }
        }
        return json;
    };
    /**
     * 从JSON对象初始化当前的对象的属性。
     */
    ShapeStyle.prototype.fromJson = function (json) {
        for (var key in json) {
            this[key] = json[key];
        }
        return this;
    };
    return ShapeStyle;
}());
exports.ShapeStyle = ShapeStyle;
;
/**
 * 点击测试的结果。
 */
var HitTestResult;
(function (HitTestResult) {
    /**
     * 没有点击到Shape。
     */
    HitTestResult[HitTestResult["NONE"] = 0] = "NONE";
    /**
     * 点击到左上角。
     */
    HitTestResult[HitTestResult["TL"] = 1] = "TL";
    /**
     * 点击到上方中间点。
     */
    HitTestResult[HitTestResult["TM"] = 2] = "TM";
    /**
     * 点击到右上角。
     */
    HitTestResult[HitTestResult["TR"] = 3] = "TR";
    /**
     * 点击到左方中间点。
     */
    HitTestResult[HitTestResult["ML"] = 4] = "ML";
    /**
     * 点击到右方中间点。
     */
    HitTestResult[HitTestResult["MR"] = 5] = "MR";
    /**
     * 点击到Shape上，但不在任何特殊点上。
     */
    HitTestResult[HitTestResult["MM"] = 6] = "MM";
    /**
     * 点击到左下角。
     */
    HitTestResult[HitTestResult["BL"] = 7] = "BL";
    /**
     * 点击到下方中间点。
     */
    HitTestResult[HitTestResult["BM"] = 8] = "BM";
    /**
     * 点击到右下角。
     */
    HitTestResult[HitTestResult["BR"] = 9] = "BR";
    /**
     * 点击到点1。
     */
    HitTestResult[HitTestResult["P1"] = 10] = "P1";
    /**
     * 点击到点2。
     */
    HitTestResult[HitTestResult["P2"] = 11] = "P2";
    /**
     * 点击到点3。
     */
    HitTestResult[HitTestResult["P3"] = 12] = "P3";
    /**
     * 点击到点4。
     */
    HitTestResult[HitTestResult["P4"] = 13] = "P4";
    /**
     * 点击到点5。
     */
    HitTestResult[HitTestResult["P5"] = 14] = "P5";
    /**
     * 点击到点6。
     */
    HitTestResult[HitTestResult["P6"] = 15] = "P6";
})(HitTestResult = exports.HitTestResult || (exports.HitTestResult = {}));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(type) {
        var _this = _super.call(this) || this;
        _this.selected = 0;
        _this.isRect = false;
        _this.isLine = false;
        _this.type = type;
        _this.id = Date.now() + "-" + Math.floor(Math.random() * 10000);
        _this.changeEvent = qtk_1.Events.ChangeEvent.create();
        _this.changeEvent.init(qtk_1.Events.CHANGE, {});
        return _this;
    }
    /**
     * 判断点(x2, y2)是否在点(x1, y1)附近。
     */
    Shape.prototype.isNearBy = function (x1, y1, x2, y2) {
        return (x1 - Shape.POINT_SIZE) <= x2
            && (x1 + Shape.POINT_SIZE) >= x2
            && (y1 - Shape.POINT_SIZE) <= y2
            && (y1 + Shape.POINT_SIZE) >= y2;
    };
    Shape.prototype.isInRect = function (rect) {
        return false;
    };
    Shape.prototype.hitTest = function (x, y) {
        return HitTestResult.NONE;
    };
    Shape.prototype.notifyChange = function () {
        this.dispatchEvent(this.changeEvent);
    };
    Shape.prototype.onChange = function (func) {
        this.on(qtk_1.Events.CHANGE, func);
    };
    Shape.prototype.offChange = function (func) {
        this.off(qtk_1.Events.CHANGE, func);
    };
    Shape.prototype.toJson = function () {
        return null;
    };
    Shape.prototype.fromJson = function (json) {
        return this;
    };
    Shape.prototype.draw = function (ctx) {
    };
    Shape.prototype.onPointerDown = function (evt) {
    };
    Shape.prototype.onPointerMove = function (evt) {
    };
    Shape.prototype.onPointerUp = function (evt) {
    };
    Shape.prototype.execCmd = function (cmd) {
        //所有命令由根Shape统一执行。
        if (this.parent) {
            return this.parent.execCmd(cmd);
        }
    };
    return Shape;
}(qtk_1.Emitter));
/**
 * 选择点的大小。
 */
Shape.POINT_SIZE = 5;
exports.Shape = Shape;
//# sourceMappingURL=shape.js.map