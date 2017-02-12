"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cmd_history_1 = require("../editor-cmds/cmd-history");
var qtk_1 = require("qtk");
var shape_manager_1 = require("../shapes/shape-manager");
var MainModel = (function (_super) {
    __extends(MainModel, _super);
    function MainModel() {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.w = 800;
        _this.h = 600;
        _this.cmdHistory = cmd_history_1.CmdHistory.create();
        _this.selectingRect = qtk_1.Rect.create(0, 0, 0, 0);
        _this.cmdHistory.on(qtk_1.Events.CHANGE, function (evt) {
            _this.view.requestRedraw();
        });
        return _this;
    }
    MainModel.prototype.doDraw = function (ctx) {
        _super.prototype.doDraw.call(this, ctx);
        var rect = this.selectingRect;
        if (rect.w && rect.h) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "gold";
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.stroke();
        }
    };
    MainModel.prototype.onPointerDown = function (evt) {
        _super.prototype.onPointerDown.call(this, evt);
        this.selectingRect.init(evt.localX, evt.localY, 0, 0);
    };
    MainModel.prototype.onPointerMove = function (evt) {
        _super.prototype.onPointerMove.call(this, evt);
        var rect = this.selectingRect;
        if (evt.pointerDown && !this.target) {
            rect.w = evt.dx;
            rect.h = evt.dy;
            this.selectShapesInRect(rect);
        }
    };
    MainModel.prototype.onPointerUp = function (evt) {
        _super.prototype.onPointerUp.call(this, evt);
        var rect = this.selectingRect;
        rect.w = 0;
        rect.h = 0;
    };
    Object.defineProperty(MainModel.prototype, "docName", {
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    MainModel.prototype.saveToJson = function () {
        var doc = {
            magic: "shape-manager",
            version: "1.0.0",
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            data: this.toJson()
        };
        return doc;
    };
    MainModel.prototype.loadFromJson = function (json) {
        this.x = json.x;
        this.y = json.y;
        this.w = json.w;
        this.h = json.h;
        this.fromJson(json.data);
        return;
    };
    MainModel.prototype.execCmd = function (cmd) {
        var ret = this.cmdHistory.exec(cmd);
        this.notifyChange();
        this.view.requestRedraw();
        return ret;
    };
    MainModel.create = function () {
        return new MainModel();
    };
    return MainModel;
}(shape_manager_1.ShapeManager));
exports.MainModel = MainModel;
;
//# sourceMappingURL=main-model.js.map