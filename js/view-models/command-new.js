"use strict";
var CommandNew = (function () {
    function CommandNew(viewModel) {
        this._viewModel = viewModel;
    }
    CommandNew.prototype.canExecute = function () {
        return true;
    };
    CommandNew.prototype.execute = function (args) {
        return true;
    };
    CommandNew.create = function (viewModel) {
        return new CommandNew(viewModel);
    };
    return CommandNew;
}());
exports.CommandNew = CommandNew;
;
//# sourceMappingURL=command-new.js.map