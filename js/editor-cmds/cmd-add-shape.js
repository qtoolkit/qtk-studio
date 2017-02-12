"use strict";
var CmdAddShape = (function () {
    function CmdAddShape(parent, shape) {
        this.shape = shape;
        this.parent = parent;
    }
    CmdAddShape.prototype.doit = function () {
        this.parent.addShape(this.shape);
        return true;
    };
    CmdAddShape.prototype.undo = function () {
        this.parent.removeShape(this.shape);
        return true;
    };
    CmdAddShape.prototype.dispose = function () {
        this.shape = null;
        this.parent = null;
    };
    CmdAddShape.create = function (parent, shape) {
        return new CmdAddShape(parent, shape);
    };
    return CmdAddShape;
}());
exports.CmdAddShape = CmdAddShape;
//# sourceMappingURL=cmd-add-shape.js.map