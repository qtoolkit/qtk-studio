"use strict";
var CommandCopy = (function () {
    function CommandCopy(viewModel) {
        this._viewModel = viewModel;
    }
    CommandCopy.prototype.canExecute = function () {
        return this._viewModel.canCopy();
    };
    CommandCopy.prototype.execute = function (args) {
        this._viewModel.copy();
        return true;
    };
    CommandCopy.create = function (viewModel) {
        return new CommandCopy(viewModel);
    };
    return CommandCopy;
}());
exports.CommandCopy = CommandCopy;
;
//# sourceMappingURL=command-copy.js.map