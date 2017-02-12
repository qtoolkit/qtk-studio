"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_factory_1 = require("./shape-factory");
var group_shape_1 = require("./group-shape");
var cmd_add_shape_1 = require("../editor-cmds/cmd-add-shape");
var cmd_composite_1 = require("../editor-cmds/cmd-composite");
var cmd_move_resize_1 = require("../editor-cmds/cmd-move-resize");
var cmd_remove_shape_1 = require("../editor-cmds/cmd-remove-shape");
/**
 * Shape管理器，在GroupShape提供了一些编辑功能。
 */
var ShapeManager = (function (_super) {
    __extends(ShapeManager, _super);
    function ShapeManager() {
        return _super.call(this) || this;
    }
    /**
     * 剪切选中的shapes。
     */
    ShapeManager.prototype.cut = function () {
        this.copy();
        this.del();
    };
    /**
     * 拷贝选中的shapes。
     */
    ShapeManager.prototype.copy = function () {
        var selectedShapes = this.getSelectedShapes(false);
        this.clipBoard = selectedShapes.map(function (iter) { return iter.toJson(); });
    };
    /**
     * 删除选中的shapes。
     */
    ShapeManager.prototype.del = function () {
        this.removeSelectedShapes();
    };
    /**
     * 删除选中的shapes。
     */
    ShapeManager.prototype.removeSelectedShapes = function () {
        var _this = this;
        var cmd = cmd_composite_1.CmdComposite.create();
        var selectedIShapes = this.shapes.filter(function (iter) { return iter.selected; });
        selectedIShapes.forEach(function (iter) {
            cmd.add(cmd_remove_shape_1.CmdRemoveShape.create(_this, iter));
        });
        this.execCmd(cmd);
        return this;
    };
    /**
     * 粘贴。用剪切板中的JSON创建shapes，并加入到当前shape中。
     */
    ShapeManager.prototype.paste = function () {
        var _this = this;
        var json = this.clipBoard;
        if (json) {
            var cmd = cmd_composite_1.CmdComposite.create();
            json.forEach(function (iter) {
                delete iter.id; //删除id，否则与之前的id重复。
                var shape = shape_factory_1.ShapeFactory.createWithJson(iter);
                cmd.add(cmd_add_shape_1.CmdAddShape.create(_this, shape));
            });
            this.execCmd(cmd);
        }
    };
    /**
     * 检查是否可以粘贴。
     */
    ShapeManager.prototype.canPaste = function () {
        return this.clipBoard && this.clipBoard.length > 0;
    };
    /**
     * 用指定的方式对齐当前被选中的Rect Shapes。
     */
    ShapeManager.prototype.align = function (doAlign) {
        var selectedShapes = this.getSelectedRectShapes(true);
        var first = selectedShapes[0];
        var last = selectedShapes[selectedShapes.length - 1];
        var cmd = cmd_composite_1.CmdComposite.create();
        selectedShapes.forEach(function (iter) {
            iter.saveXYWH();
            doAlign(iter, first, last);
            cmd.add(cmd_move_resize_1.CmdMoveResize.create(iter));
        });
        this.execCmd(cmd);
        return true;
    };
    /**
     * 让当前被选中的Rect Shapes在垂直方向上均匀分布。
     */
    ShapeManager.prototype.alignDistV = function () {
        var cmd = cmd_composite_1.CmdComposite.create();
        var selectedShapes = this.getSelectedRectShapes(true);
        if (selectedShapes.length < 3)
            return true;
        var first = selectedShapes[0];
        var last = selectedShapes[selectedShapes.length - 1];
        var y = first.y;
        var h = selectedShapes.reduce(function (result, iter) {
            result += iter.h;
            return result;
        }, 0);
        var gap = (last.y + last.h - first.y - h) / (selectedShapes.length - 1);
        selectedShapes.forEach(function (iter) {
            iter.saveXYWH();
            y += iter.h + gap;
            iter.y = y;
            cmd.add(cmd_move_resize_1.CmdMoveResize.create(iter));
        });
        this.execCmd(cmd);
        return true;
    };
    /**
     * 让当前被选中的Rect Shapes在水平方向上均匀分布。
     */
    ShapeManager.prototype.alignDistH = function () {
        var cmd = cmd_composite_1.CmdComposite.create();
        var selectedShapes = this.getSelectedRectShapes(true);
        if (selectedShapes.length < 3)
            return true;
        var first = selectedShapes[0];
        var last = selectedShapes[selectedShapes.length - 1];
        var x = first.x;
        var w = selectedShapes.reduce(function (result, iter) {
            result += iter.w;
            return result;
        }, 0);
        var gap = (last.x + last.w - first.x - w) / (selectedShapes.length - 1);
        selectedShapes.forEach(function (iter) {
            iter.saveXYWH();
            iter.x = x;
            x += iter.w + gap;
            cmd.add(cmd_move_resize_1.CmdMoveResize.create(iter));
        });
        this.execCmd(cmd);
        return true;
    };
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的左边为基准对齐。
     */
    ShapeManager.prototype.alignLeft = function () {
        return this.align(function (iter, first) {
            iter.x = first.x;
        });
    };
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的顶部为基准对齐。
     */
    ShapeManager.prototype.alignTop = function () {
        return this.align(function (iter, first) {
            iter.y = first.y;
        });
    };
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的右边为基准对齐。
     */
    ShapeManager.prototype.alignRight = function () {
        return this.align(function (iter, first) {
            iter.x = first.x + first.w - iter.w;
        });
    };
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的底部为基准对齐。
     */
    ShapeManager.prototype.alignBottom = function () {
        return this.align(function (iter, first) {
            iter.y = first.y + first.h - iter.h;
        });
    };
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape为基准设置为相同的宽度。
     */
    ShapeManager.prototype.alignToSameWidth = function () {
        return this.align(function (iter, first) {
            iter.w = first.w;
        });
    };
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape为基准设置为相同的高度。
     */
    ShapeManager.prototype.alignToSameHeight = function () {
        return this.align(function (iter, first) {
            iter.h = first.h;
        });
    };
    ShapeManager.prototype.doDraw = function (ctx) {
        this.shapes.forEach(function (iter) { return iter.draw(ctx); });
    };
    ShapeManager.prototype.draw = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        this.doDraw(ctx);
        ctx.restore();
    };
    ShapeManager.prototype.onPointerDown = function (evt) {
        _super.prototype.onPointerDown.call(this, evt);
    };
    ShapeManager.prototype.onPointerMove = function (evt) {
        _super.prototype.onPointerMove.call(this, evt);
    };
    ShapeManager.prototype.onPointerUp = function (evt) {
        _super.prototype.onPointerUp.call(this, evt);
    };
    ShapeManager.create = function () {
        var shape = new ShapeManager();
        return shape;
    };
    return ShapeManager;
}(group_shape_1.GroupShape));
exports.ShapeManager = ShapeManager;
//# sourceMappingURL=shape-manager.js.map