"use strict";
var CommandDraw = (function () {
    function CommandDraw(canvas) {
        this._canvas = canvas;
        return this;
    }
    CommandDraw.prototype.canExecute = function () {
        return true;
    };
    CommandDraw.prototype.execute = function (args) {
        var drawInfo = args;
        var ctx = drawInfo.ctx;
        var rect = drawInfo.rect;
        var canvas = this._canvas;
        if (canvas) {
            var w = rect.w >> 0;
            var h = rect.h >> 0;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            ctx.drawImage(canvas, 0, 0);
        }
        return true;
    };
    CommandDraw.create = function (canvas) {
        return new CommandDraw(canvas);
    };
    return CommandDraw;
}());
exports.CommandDraw = CommandDraw;
;
//# sourceMappingURL=command-draw.js.map