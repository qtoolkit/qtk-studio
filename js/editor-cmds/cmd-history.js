"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var CmdHistory = (function (_super) {
    __extends(CmdHistory, _super);
    function CmdHistory() {
        var _this = _super.call(this) || this;
        _this.reset();
        _this.changeEvent = qtk_1.Events.ChangeEvent.create();
        _this.changeEvent.init(qtk_1.Events.CHANGE, {});
        return _this;
    }
    CmdHistory.prototype.reset = function () {
        this.redoCmds = [];
        this.undoCmds = [];
        this.removeAllListeners();
    };
    CmdHistory.prototype.notifyChange = function () {
        this.dispatchEvent(this.changeEvent);
    };
    CmdHistory.prototype.exec = function (cmd) {
        this.undoCmds.push(cmd);
        var ret = cmd.doit();
        this.notifyChange();
        return ret;
    };
    CmdHistory.prototype.canRedo = function () {
        return this.redoCmds.length > 0;
    };
    CmdHistory.prototype.redo = function () {
        var ret = false;
        var cmd = this.redoCmds.pop();
        if (cmd) {
            this.undoCmds.push(cmd);
            ret = cmd.doit();
            this.notifyChange();
        }
        return ret;
    };
    CmdHistory.prototype.canUndo = function () {
        return this.undoCmds.length > 0;
    };
    CmdHistory.prototype.undo = function () {
        var ret = false;
        var cmd = this.undoCmds.pop();
        if (cmd) {
            this.redoCmds.push(cmd);
            ret = cmd.undo();
            this.notifyChange();
        }
        return ret;
    };
    CmdHistory.create = function () {
        return new CmdHistory();
    };
    return CmdHistory;
}(qtk_1.Emitter));
exports.CmdHistory = CmdHistory;
//# sourceMappingURL=cmd-history.js.map