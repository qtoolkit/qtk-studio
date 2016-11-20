"use strict";
var DrawInfo = (function () {
    function DrawInfo() {
    }
    DrawInfo.prototype.init = function (ctx, rect) {
        this.ctx = ctx;
        this.rect = rect;
    };
    DrawInfo.create = function () {
        return new DrawInfo();
    };
    return DrawInfo;
}());
exports.DrawInfo = DrawInfo;
;
//# sourceMappingURL=draw-info.js.map