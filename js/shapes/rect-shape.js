"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_factory_1 = require("./shape-factory");
var qtk_1 = require("qtk");
var cmd_move_resize_1 = require("../editor-cmds/cmd-move-resize");
var shape_1 = require("./shape");
/**
 * Rect类Shape的外观效果参数
 */
var RectShapeStyle = (function (_super) {
    __extends(RectShapeStyle, _super);
    function RectShapeStyle() {
        var _this = _super.call(this) || this;
        _this.fillColr = "white";
        _this.roundRadius = 0;
        return _this;
    }
    RectShapeStyle.create = function (json) {
        var style = new RectShapeStyle();
        if (json) {
            style.fromJson(json);
        }
        return style;
    };
    return RectShapeStyle;
}(shape_1.ShapeStyle));
exports.RectShapeStyle = RectShapeStyle;
var RectShape = (function (_super) {
    __extends(RectShape, _super);
    function RectShape(type) {
        var _this = _super.call(this, type || RectShape.TYPE) || this;
        _this.isRect = true;
        _this.isLine = false;
        _this.type = RectShape.TYPE;
        _this.x = 0;
        _this.y = 0;
        _this.w = 100;
        _this.h = 100;
        _this.style = RectShapeStyle.create();
        return _this;
    }
    /**
     * 设置位置和大小。
     */
    RectShape.prototype.moveResize = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        return this;
    };
    RectShape.prototype.isInRect = function (rect) {
        var cx = this.x + (this.w >> 1);
        var cy = this.y + (this.h >> 1);
        return rect.containsPoint(cx, cy);
    };
    RectShape.prototype.toJson = function () {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            isRect: true,
            isLine: false,
            style: this.style.toJson(),
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        };
    };
    RectShape.prototype.fromJson = function (json) {
        for (var key in json) {
            var value = json[key];
            if (key === 'style') {
                this.style = RectShapeStyle.create(value);
            }
            else if (typeof value !== "object") {
                this[key] = value;
            }
        }
        return this;
    };
    /**
     * 对于被选中的Shape，绘制其中一个可点击的特殊点的标记。
     * 当前被点击的点的标记稍微大一点点。
     */
    RectShape.prototype.drawOneHitTestMark = function (ctx, hitTestResult) {
        var p = this.getPointByHitResult(hitTestResult);
        if (p) {
            var size = hitTestResult === this.hitTestResult ? shape_1.Shape.POINT_SIZE + 2 : shape_1.Shape.POINT_SIZE;
            var x = p.x - size;
            var y = p.y - size;
            ctx.rect(x, y, size << 1, size << 1);
        }
    };
    /**
     * 对于被选中的Shape，绘制可点击的特殊点的标记。
     */
    RectShape.prototype.drawHitTestMarks = function (ctx) {
        var _this = this;
        RectShape.supportedHitTestResult.forEach(function (value) {
            _this.drawOneHitTestMark(ctx, value);
        });
    };
    /**
     * 绘制选择框和特殊点的标记。
     */
    RectShape.prototype.drawSelectedBox = function (ctx) {
        if (this.selected) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'gold';
            ctx.rect(this.x, this.y, this.w, this.h);
            this.drawHitTestMarks(ctx);
            ctx.stroke();
        }
    };
    /**
     * 绘制Shape本身。
     */
    RectShape.prototype.doDraw = function (ctx) {
        var style = this.style;
        ctx.lineWidth = style.lineWidth;
        ctx.fillStyle = style.fillColr;
        ctx.strokeStyle = style.lineColor;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
    };
    /**
     * 绘制。
     */
    RectShape.prototype.draw = function (ctx) {
        ctx.save();
        this.doDraw(ctx);
        this.drawSelectedBox(ctx);
        ctx.restore();
    };
    /**
     * 获取指定特殊点的位置坐标。
     */
    RectShape.prototype.getPointByHitResult = function (hitTestResult) {
        var x = 0;
        var y = 0;
        var xl = this.x;
        var yt = this.y;
        var xm = this.x + (this.w >> 1);
        var xr = this.x + this.w;
        var ym = this.y + (this.h >> 1);
        var yb = this.y + this.h;
        switch (hitTestResult) {
            case shape_1.HitTestResult.TL: {
                x = xl;
                y = yt;
                break;
            }
            case shape_1.HitTestResult.TM: {
                x = xm;
                y = yt;
                break;
            }
            case shape_1.HitTestResult.TR: {
                x = xr;
                y = yt;
                break;
            }
            case shape_1.HitTestResult.ML: {
                x = xl;
                y = ym;
                break;
            }
            case shape_1.HitTestResult.MR: {
                x = xr;
                y = ym;
                break;
            }
            case shape_1.HitTestResult.BL: {
                x = xl;
                y = yb;
                break;
            }
            case shape_1.HitTestResult.BM: {
                x = xm;
                y = yb;
                break;
            }
            case shape_1.HitTestResult.BR: {
                x = xr;
                y = yb;
                break;
            }
            default: {
                return null;
            }
        }
        return qtk_1.Point.point.init(x, y);
    };
    /**
     * 判断指定点所在的区域。
     */
    RectShape.prototype.hitTest = function (x, y) {
        var ret = shape_1.HitTestResult.NONE;
        var arr = RectShape.supportedHitTestResult;
        var n = arr.length;
        for (var i = 0; i < n; i++) {
            var p = this.getPointByHitResult(arr[i]);
            if (p && this.isNearBy(p.x, p.y, x, y)) {
                return arr[i];
            }
        }
        if (ret === shape_1.HitTestResult.NONE) {
            if (qtk_1.Rect.rect.init(this.x, this.y, this.w, this.h).containsPoint(x, y)) {
                ret = shape_1.HitTestResult.MM;
            }
        }
        return ret;
    };
    /**
     * 保存当前的位置和大小。
     */
    RectShape.prototype.saveXYWH = function () {
        this.xSave = this.x;
        this.ySave = this.y;
        this.wSave = this.w;
        this.hSave = this.h;
        return this;
    };
    /**
     * 增量的修改位置和大小。
     */
    RectShape.prototype.moveResizeDelta = function (hitTestResult, dx, dy) {
        var x = this.xSave;
        var y = this.ySave;
        var w = this.wSave;
        var h = this.hSave;
        switch (hitTestResult) {
            case shape_1.HitTestResult.TL: {
                x += dx;
                y += dy;
                w -= dx;
                h -= dy;
                break;
            }
            case shape_1.HitTestResult.TM: {
                y += dy;
                h -= dy;
                break;
            }
            case shape_1.HitTestResult.TR: {
                y += dy;
                h -= dy;
                w += dx;
                break;
            }
            case shape_1.HitTestResult.ML: {
                x += dx;
                w -= dx;
                break;
            }
            case shape_1.HitTestResult.MM: {
                x += dx;
                y += dy;
                break;
            }
            case shape_1.HitTestResult.MR: {
                w += dx;
                break;
            }
            case shape_1.HitTestResult.BL: {
                x += dx;
                w -= dx;
                h += dy;
                break;
            }
            case shape_1.HitTestResult.BM: {
                h += dy;
                break;
            }
            case shape_1.HitTestResult.BR: {
                h += dy;
                w += dx;
                break;
            }
        }
        this.x = Math.max(0, x);
        this.y = Math.max(0, y);
        this.w = Math.max(RectShape.MIN_SIZE, w);
        this.h = Math.max(RectShape.MIN_SIZE, h);
        return this;
    };
    RectShape.prototype.onPointerDown = function (evt) {
        this.hitTestResult = this.hitTest(evt.localX, evt.localY);
        this.saveXYWH();
    };
    RectShape.prototype.onPointerMove = function (evt) {
        if (this.hitTestResult === shape_1.HitTestResult.NONE || !evt.pointerDown) {
            return;
        }
        this.moveResizeDelta(this.hitTestResult, evt.dx, evt.dy);
    };
    RectShape.prototype.onPointerUp = function (evt) {
        this.hitTestResult = shape_1.HitTestResult.NONE;
        if (this.x !== this.xSave || this.y !== this.ySave || this.w !== this.wSave || this.h !== this.hSave) {
            this.execCmd(cmd_move_resize_1.CmdMoveResize.create(this));
        }
    };
    RectShape.create = function () {
        var shape = new RectShape();
        return shape;
    };
    return RectShape;
}(shape_1.Shape));
RectShape.MIN_SIZE = 10;
RectShape.TYPE = "rect";
RectShape.supportedHitTestResult = [shape_1.HitTestResult.TL, shape_1.HitTestResult.TM, shape_1.HitTestResult.TR,
    shape_1.HitTestResult.ML, shape_1.HitTestResult.MM, shape_1.HitTestResult.MR,
    shape_1.HitTestResult.BL, shape_1.HitTestResult.BM, shape_1.HitTestResult.BR];
exports.RectShape = RectShape;
shape_factory_1.ShapeFactory.registerCreator(RectShape.TYPE, "basic", RectShape.create);
//# sourceMappingURL=rect-shape.js.map