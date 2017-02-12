"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_factory_1 = require("../shapes/shape-factory");
var qtk_1 = require("qtk");
var cmd_add_shape_1 = require("../editor-cmds/cmd-add-shape");
var DesignView = (function (_super) {
    __extends(DesignView, _super);
    function DesignView() {
        return _super.call(this, DesignView.TYPE) || this;
    }
    Object.defineProperty(DesignView.prototype, "designWidth", {
        get: function () {
            return this.model.w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DesignView.prototype, "designHeight", {
        get: function () {
            return this.model.h;
        },
        enumerable: true,
        configurable: true
    });
    DesignView.prototype.activate = function () {
        this.viewModel.model = this.model;
    };
    DesignView.prototype.dispatchClick = function (evt) {
        this.model.onClick(evt);
    };
    DesignView.prototype.dispatchPointerDown = function (evt) {
        _super.prototype.dispatchPointerDown.call(this, evt);
        if (!this.dragging) {
            this.model.onPointerDown(evt);
        }
    };
    DesignView.prototype.dispatchPointerMove = function (evt) {
        _super.prototype.dispatchPointerMove.call(this, evt);
        if (!this.dragging) {
            this.model.onPointerMove(evt);
        }
        if (evt.pointerDown) {
            this.requestRedraw();
        }
    };
    DesignView.prototype.dispatchPointerUp = function (evt) {
        _super.prototype.dispatchPointerUp.call(this, evt);
        if (!this.dragging) {
            this.model.onPointerUp(evt);
        }
        this.requestRedraw();
    };
    DesignView.prototype.dispatchKeyUp = function (evt) {
        if (evt.keyCode === qtk_1.KeyEvent.VK_DELETE || evt.keyCode == qtk_1.KeyEvent.VK_BACK_SPACE) {
            this.model.removeSelectedShapes();
        }
    };
    DesignView.prototype.doDraw = function (ctx, style) {
        _super.prototype.doDraw.call(this, ctx, style);
        var x = (this.w - this.designWidth) >> 1;
        var y = (this.h - this.designHeight) >> 1;
        this.model.draw(ctx);
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "Gray";
        ctx.beginPath();
        ctx.rect(0, 0, this.w, y);
        ctx.rect(0, y + this.designHeight, this.w, this.h - y - this.designHeight);
        ctx.rect(0, y, x, this.designHeight);
        ctx.rect(x + this.designWidth, y, this.w - x - this.designWidth, this.designHeight);
        ctx.fill();
        ctx.restore();
    };
    DesignView.prototype.createWidgetAt = function (info, x, y) {
        var p = this.toLocalPoint(qtk_1.Point.point.init(x, y));
        var json = JSON.parse(JSON.stringify(info));
        var shape = shape_factory_1.ShapeFactory.createWithJson(json);
        shape.selected = Date.now();
        if (shape.isRect) {
            shape.x = p.x;
            shape.y = p.y;
        }
        this.model.execCmd(cmd_add_shape_1.CmdAddShape.create(this.model, shape));
    };
    DesignView.prototype.onDeinit = function () {
        _super.prototype.onDeinit.call(this);
        this.viewModel.removeModel(this.model);
    };
    DesignView.create = function (options) {
        var view = new DesignView();
        view.reset(DesignView.TYPE, options);
        view.useBehavior("droppable", {});
        view.on(qtk_1.Events.DROP, function (evt) {
            var info = evt.dataTransfer.getData("text/plain");
            view.createWidgetAt(info, evt.x, evt.y);
            view.dragging = false;
        });
        view.on(qtk_1.Events.DRAGENTER, function (evt) {
            view.dragging = true;
        });
        view.on(qtk_1.Events.DRAGLEAVE, function (evt) {
            view.dragging = false;
        });
        view.viewModel = options.viewModel;
        view.model = view.viewModel.model;
        view.model.view = view;
        return view;
    };
    return DesignView;
}(qtk_1.Widget));
DesignView.TYPE = "design-view";
exports.DesignView = DesignView;
//# sourceMappingURL=design-view.js.map