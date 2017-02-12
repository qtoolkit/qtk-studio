"use strict";
var CmdMoveResize = (function () {
    function CmdMoveResize(shape) {
        this.xOld = shape.xSave;
        this.yOld = shape.ySave;
        this.wOld = shape.wSave;
        this.hOld = shape.hSave;
        this.x = shape.x;
        this.y = shape.y;
        this.w = shape.w;
        this.h = shape.h;
        this.shape = shape;
    }
    CmdMoveResize.prototype.doit = function () {
        this.shape.moveResize(this.x, this.y, this.w, this.h);
        return true;
    };
    CmdMoveResize.prototype.undo = function () {
        this.shape.moveResize(this.xOld, this.yOld, this.wOld, this.hOld);
        return true;
    };
    CmdMoveResize.prototype.dispose = function () {
        this.shape = null;
    };
    CmdMoveResize.create = function (shape) {
        return new CmdMoveResize(shape);
    };
    return CmdMoveResize;
}());
exports.CmdMoveResize = CmdMoveResize;
//# sourceMappingURL=cmd-move-resize.js.map