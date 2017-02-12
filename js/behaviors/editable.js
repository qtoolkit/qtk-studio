"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var Editable = (function (_super) {
    __extends(Editable, _super);
    function Editable(widget, options) {
        var _this = _super.call(this, widget, options, Editable.TYPE) || this;
        _this.afterDrawFunc = _this.afterWidgetDraw.bind(_this);
        widget.on(qtk_1.Events.AFTER_DRAW, _this.afterDrawFunc);
        return _this;
    }
    Editable.prototype.testPointerPosition = function (evt) {
        var result = _super.prototype.testPointerPosition.call(this, evt);
        if (!result) {
            var border = this.border;
            var widget = this.widget;
            var p = widget.toLocalPoint(qtk_1.Point.point.init(evt.x, evt.y));
            if (p.x > border && p.y > border && p.x < widget.w && p.y < widget.h) {
                result = Editable.MOVE;
            }
        }
        return result;
    };
    Editable.prototype.onPointerMove = function (evt) {
        if (this.pointerDownArea === Editable.MOVE) {
            this.widget.moveTo(this.x + evt.dx, this.y + evt.dy);
            return;
        }
        _super.prototype.onPointerMove.call(this, evt);
    };
    Editable.prototype.afterWidgetDraw = function (evt) {
        var ctx = evt.ctx;
        var widget = evt.widget;
        if (widget.selected) {
            ctx.beginPath();
            ctx.rect(0, 0, widget.w, widget.h);
            ctx.strokeStyle = "gold";
            ctx.stroke();
        }
    };
    Editable.prototype.dispose = function () {
        this.widget.off(qtk_1.Events.AFTER_DRAW, this.afterDrawFunc);
        _super.prototype.dispose.call(this);
    };
    return Editable;
}(qtk_1.Resizable));
Editable.TYPE = "editable";
Editable.MOVE = "move";
exports.Editable = Editable;
qtk_1.BehaviorFactory.register(Editable.TYPE, function (widget, options) {
    return new Editable(widget, options);
});
//# sourceMappingURL=editable.js.map