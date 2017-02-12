"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_factory_1 = require("./shape-factory");
var rect_shape_1 = require("./rect-shape");
var qtk_1 = require("qtk");
/**
 * WidgetShape
 */
var WidgetShape = (function (_super) {
    __extends(WidgetShape, _super);
    function WidgetShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WidgetShape.prototype.moveResize = function (x, y, w, h) {
        _super.prototype.moveResize.call(this, x, y, w, h);
        this.widget.w = w;
        this.widget.h = h;
        return this;
    };
    WidgetShape.prototype.doDraw = function (ctx) {
        if (this.widget) {
            ctx.save();
            ctx.translate(this.x, this.y);
            this.widget.draw(ctx);
            ctx.restore();
        }
    };
    WidgetShape.prototype.toJson = function () {
        var json = _super.prototype.toJson.call(this);
        json.widgetInfo = this.widget.toJson();
        return json;
    };
    WidgetShape.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.widget = qtk_1.WidgetFactory.createWithJson(json.widgetInfo);
        this.widget.app = qtk_1.Application.get();
        this.widget.w = this.w;
        this.widget.h = this.h;
        this.style.fillColr = "green";
        this.widget.init();
        return this;
    };
    WidgetShape.create = function () {
        var shape = new WidgetShape();
        return shape;
    };
    return WidgetShape;
}(rect_shape_1.RectShape));
WidgetShape.TYPE = "widget";
exports.WidgetShape = WidgetShape;
shape_factory_1.ShapeFactory.registerCreator(WidgetShape.TYPE, "basic", WidgetShape.create);
//# sourceMappingURL=widget-shape.js.map