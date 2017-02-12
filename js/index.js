"use strict";
var app_1 = require("./app");
function run() {
    app_1.App.run();
}
exports.run = run;
var qtk_1 = require("qtk");
exports.Rect = qtk_1.Rect;
var shape_1 = require("./shapes/shape");
exports.ShapeStyle = shape_1.ShapeStyle;
exports.Shape = shape_1.Shape;
exports.HitTestResult = shape_1.HitTestResult;
var rect_shape_1 = require("./shapes/rect-shape");
exports.RectShape = rect_shape_1.RectShape;
exports.RectShapeStyle = rect_shape_1.RectShapeStyle;
var group_shape_1 = require("./shapes/group-shape");
exports.GroupShape = group_shape_1.GroupShape;
var shape_manager_1 = require("./shapes/shape-manager");
exports.ShapeManager = shape_manager_1.ShapeManager;
var line_shape_1 = require("./shapes/line-shape");
exports.LineShapeStyle = line_shape_1.LineShapeStyle;
exports.LineShape = line_shape_1.LineShape;
var widget_shape_1 = require("./shapes/widget-shape");
exports.WidgetShape = widget_shape_1.WidgetShape;
var shape_factory_1 = require("./shapes/shape-factory");
exports.ShapeFactory = shape_factory_1.ShapeFactory;
//# sourceMappingURL=index.js.map