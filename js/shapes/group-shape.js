"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rect_shape_1 = require("./rect-shape");
var shape_factory_1 = require("./shape-factory");
var shape_1 = require("./shape");
/**
 * GroupShape可以容纳其它Shape，通过addShape/removeShape等函数管理其中的Shapes。
 */
var GroupShape = (function (_super) {
    __extends(GroupShape, _super);
    function GroupShape(type) {
        var _this = _super.call(this, type) || this;
        _this.shapes = [];
        return _this;
    }
    /**
     * 通过名称查找其容纳的子Shapes。
     */
    GroupShape.prototype.findChildByName = function (name) {
        return this.shapes.find(function (iter) { return iter.name === name; });
    };
    /**
     * 通过ID查找其容纳的子Shapes。
     */
    GroupShape.prototype.findChildByID = function (id) {
        return this.shapes.find(function (iter) { return iter.id === id; });
    };
    /**
     * 增加一个shape
     */
    GroupShape.prototype.addShape = function (shape) {
        this.shapes.push(shape);
        shape.parent = this;
        return this;
    };
    /**
     * 删除全部Shapes。
     */
    GroupShape.prototype.removeAllShapes = function () {
        this.shapes.forEach(function (shape) { return shape.parent = null; });
        this.shapes.length = 0;
        return this;
    };
    /**
     * 删除指定的Shape。
     */
    GroupShape.prototype.removeShape = function (shape) {
        var index = this.shapes.indexOf(shape);
        if (index >= 0) {
            this.shapes.splice(index, 1);
        }
        shape.parent = null;
        return this;
    };
    /**
     * 统计被选中的Shapes的个数。
     */
    GroupShape.prototype.countSelectedShapes = function () {
        var nr = 0;
        this.shapes.forEach(function (iter) {
            if (iter.selected) {
                nr++;
            }
        });
        return nr;
    };
    /**
     * 将全部shapes设置为非选中状态。
     */
    GroupShape.prototype.selectNone = function () {
        this.shapes.forEach(function (iter) {
            iter.selected = 0;
        });
        return this;
    };
    /**
     * 将全部shapes设置为选中状态。
     */
    GroupShape.prototype.selectAll = function () {
        this.shapes.forEach(function (iter) {
            iter.selected = Date.now();
        });
        return this;
    };
    /**
     * 选中指定区域的Shapes
     */
    GroupShape.prototype.selectShapesInRect = function (rect) {
        this.shapes.forEach(function (iter) {
            if (iter.isInRect(rect)) {
                iter.selected = Date.now();
            }
            else {
                iter.selected = 0;
            }
        });
        return this;
    };
    /**
     * 选中/反选指定Shape。
     */
    GroupShape.prototype.selectShape = function (target, exclude) {
        if (!target) {
            this.selectNone();
            return this;
        }
        if (!exclude) {
            if (target.selected) {
                target.selected = 0;
            }
            else {
                target.selected = Date.now();
            }
        }
        else {
            this.shapes.forEach(function (iter) {
                if (iter === target) {
                    iter.selected = Date.now();
                }
                else {
                    iter.selected = 0;
                }
            });
        }
        return this;
    };
    /**
     * 获取当前被选中的Shapes。
     */
    GroupShape.prototype.getSelectedShapes = function (sort) {
        var selectedShapes = this.shapes.filter(function (iter) { return iter.selected; });
        if (sort) {
            selectedShapes.sort(function (a, b) { return a.selected - b.selected; });
        }
        return selectedShapes;
    };
    /**
     * 获取当前被选中的Rect Shapes。
     */
    GroupShape.prototype.getSelectedRectShapes = function (sort) {
        var selectedShapes = this.getSelectedShapes(sort).filter(function (iter) { return iter.isRect; });
        return selectedShapes;
    };
    GroupShape.prototype.toJson = function () {
        return this.shapes.map(function (iter) { return iter.toJson(); });
    };
    GroupShape.prototype.fromJson = function (arr) {
        this.shapes = arr.map(function (iter) { return shape_factory_1.ShapeFactory.createWithJson(iter); });
        this.notifyChange();
        return this;
    };
    /**
     * 查找指定位置处的Shape，如果有多个取最上层的一个。
     */
    GroupShape.prototype.findShapeByPoint = function (x, y) {
        var arr = this.shapes;
        var n = arr.length;
        for (var i = n - 1; i >= 0; i--) {
            var iter = arr[i];
            if (iter.hitTest(x, y) !== shape_1.HitTestResult.NONE) {
                return iter;
            }
        }
        return null;
    };
    /**
     * 转换指针事件的localX/localY为相对于当前shape的。
     */
    GroupShape.prototype.translatePointEvent = function (evt) {
        evt.localX -= this.x;
        evt.localY -= this.y;
        return this;
    };
    /**
     * 恢复指针事件的localX/localY。
     */
    GroupShape.prototype.untranslatePointEvent = function (evt) {
        evt.localX += this.x;
        evt.localY += this.y;
        return this;
    };
    GroupShape.prototype.onPointerDown = function (evt) {
        this.translatePointEvent(evt);
        this.target = this.findShapeByPoint(evt.localX, evt.localY);
        if (this.target) {
            this.selectedRectShapes = this.getSelectedRectShapes(false);
            if (this.countSelectedShapes() === 1) {
                this.target.onPointerDown(evt);
            }
            else if (this.selectedRectShapes) {
                this.selectedRectShapes.forEach(function (iter) { return iter.saveXYWH(); });
            }
        }
        this.untranslatePointEvent(evt);
    };
    GroupShape.prototype.onPointerMove = function (evt) {
        if (this.target) {
            var dx = evt.dx;
            var dy = evt.dy;
            if (this.countSelectedShapes() === 1) {
                this.translatePointEvent(evt);
                this.target.onPointerMove(evt);
                this.untranslatePointEvent(evt);
            }
            else if (this.selectedRectShapes && this.selectedRectShapes.length > 0) {
                this.selectedRectShapes.forEach(function (iter) {
                    iter.moveResize(iter.xSave + dx, iter.ySave + dy, iter.w, iter.h);
                });
            }
        }
    };
    GroupShape.prototype.onPointerUp = function (evt) {
        if (this.target) {
            if (this.countSelectedShapes() === 1) {
                this.translatePointEvent(evt);
                this.target.onPointerUp(evt);
                this.untranslatePointEvent(evt);
            }
            else if (this.selectedRectShapes) {
                this.selectedRectShapes = null;
            }
        }
    };
    GroupShape.prototype.onClick = function (evt) {
        if (Math.abs(evt.dx) > 0 && Math.abs(evt.dy) > 0) {
            return;
        }
        this.translatePointEvent(evt);
        if (this.target) {
            this.selectShape(this.target, !evt.ctrlKey);
        }
        else {
            this.selectShape(null, false);
        }
        this.untranslatePointEvent(evt);
    };
    GroupShape.create = function () {
        var shape = new GroupShape();
        return shape;
    };
    return GroupShape;
}(rect_shape_1.RectShape));
exports.GroupShape = GroupShape;
//# sourceMappingURL=group-shape.js.map