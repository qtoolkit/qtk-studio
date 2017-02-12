"use strict";
var CommandDelete = (function () {
    function CommandDelete(viewModel) {
        this._viewModel = viewModel;
    }
    CommandDelete.prototype.canExecute = function () {
        return this._viewModel.canDelete();
    };
    CommandDelete.prototype.execute = function (args) {
        this._viewModel.del();
        return true;
    };
    CommandDelete.create = function (viewModel) {
        return new CommandDelete(viewModel);
    };
    return CommandDelete;
}());
exports.CommandDelete = CommandDelete;
;
//# sourceMappingURL=command-delete.js.map