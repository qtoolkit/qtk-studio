"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_1 = require("./shape");
var shape_factory_1 = require("./shape-factory");
var ArrowType;
(function (ArrowType) {
    ArrowType[ArrowType["NONE"] = 0] = "NONE";
    ArrowType[ArrowType["NORMAL"] = 1] = "NORMAL";
    ArrowType[ArrowType["DIAMON"] = 2] = "DIAMON";
    ArrowType[ArrowType["TRIANGLE"] = 3] = "TRIANGLE";
    ArrowType[ArrowType["FILLED_DIAMON"] = 4] = "FILLED_DIAMON";
    ArrowType[ArrowType["FILLED_TRIANGLE"] = 5] = "FILLED_TRIANGLE";
})(ArrowType = exports.ArrowType || (exports.ArrowType = {}));
var LineShapeStyle = (function (_super) {
    __extends(LineShapeStyle, _super);
    function LineShapeStyle() {
        var _this = _super.call(this) || this;
        _this.lineStyle = 0;
        _this.firstArrow = ArrowType.NONE;
        _this.secondArrow = ArrowType.NONE;
        return _this;
    }
    LineShapeStyle.create = function (json) {
        var style = new LineShapeStyle();
        if (json) {
            style.fromJson(json);
        }
        return style;
    };
    return LineShapeStyle;
}(shape_1.ShapeStyle));
exports.LineShapeStyle = LineShapeStyle;
var LineShape = (function (_super) {
    __extends(LineShape, _super);
    function LineShape(type) {
        var _this = _super.call(this) || this;
        _this.isRect = false;
        _this.isLine = true;
        _this.type = type || LineShape.TYPE;
        _this.style = LineShapeStyle.create();
        return _this;
    }
    LineShape.prototype.isInRect = function (rect) {
        var n = this.points.length;
        if (!n) {
            return false;
        }
        var firstP = this.points[0];
        var lastP = this.points[n - 1];
        return rect.containsPoint(firstP.x, firstP.y) && rect.containsPoint(lastP.x, lastP.y);
    };
    LineShape.prototype.toJson = function () {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            isRect: true,
            isLine: false,
            style: this.style.toJson(),
        };
    };
    LineShape.prototype.fromJson = function (json) {
        for (var key in json) {
            var value = json[key];
            if (key === 'style') {
                this.style = LineShapeStyle.create(value);
            }
            else {
                this[key] = value;
            }
        }
        return this;
    };
    LineShape.prototype.draw = function (ctx) {
        var style = this.style;
        ctx.lineWidth = style.lineWidth;
        ctx.strokeStyle = style.lineColor;
        ctx.beginPath();
        this.points.forEach(function (p, index) {
            if (index) {
                ctx.lineTo(p.x, p.y);
            }
            else {
                ctx.moveTo(p.x, p.y);
            }
        });
        ctx.stroke();
    };
    LineShape.prototype.onPointerDown = function (evt) {
    };
    LineShape.prototype.onPointerMove = function (evt) {
    };
    LineShape.prototype.onPointerUp = function (evt) {
    };
    LineShape.create = function () {
        var shape = new LineShape();
        return shape;
    };
    return LineShape;
}(shape_1.Shape));
LineShape.TYPE = "line";
exports.LineShape = LineShape;
shape_factory_1.ShapeFactory.registerCreator(LineShape.TYPE, "basic", LineShape.create);
//# sourceMappingURL=line-shape.js.map