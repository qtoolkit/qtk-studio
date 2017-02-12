"use strict";
var CmdRemoveShape = (function () {
    function CmdRemoveShape(parent, shape) {
        this.shape = shape;
        this.parent = parent;
    }
    CmdRemoveShape.prototype.doit = function () {
        this.parent.removeShape(this.shape);
        return true;
    };
    CmdRemoveShape.prototype.undo = function () {
        this.parent.addShape(this.shape);
        return true;
    };
    CmdRemoveShape.prototype.dispose = function () {
        this.shape = null;
        this.parent = null;
    };
    CmdRemoveShape.create = function (parent, shape) {
        return new CmdRemoveShape(parent, shape);
    };
    return CmdRemoveShape;
}());
exports.CmdRemoveShape = CmdRemoveShape;
//# sourceMappingURL=cmd-remove-shape.js.map