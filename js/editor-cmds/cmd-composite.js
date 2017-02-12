"use strict";
var CmdComposite = (function () {
    function CmdComposite() {
        this.cmds = [];
    }
    CmdComposite.prototype.add = function (cmd) {
        this.cmds.push(cmd);
        return this;
    };
    CmdComposite.prototype.doit = function () {
        this.cmds.forEach(function (cmd) { return cmd.doit(); });
        return true;
    };
    CmdComposite.prototype.undo = function () {
        this.cmds.forEach(function (cmd) { return cmd.undo(); });
        return true;
    };
    CmdComposite.prototype.dispose = function () {
        this.cmds.forEach(function (cmd) { return cmd.dispose(); });
    };
    CmdComposite.create = function () {
        return new CmdComposite();
    };
    return CmdComposite;
}());
exports.CmdComposite = CmdComposite;
//# sourceMappingURL=cmd-composite.js.map