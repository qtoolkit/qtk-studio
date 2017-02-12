"use strict";
var CommandCut = (function () {
    function CommandCut(viewModel) {
        this._viewModel = viewModel;
    }
    CommandCut.prototype.canExecute = function () {
        return this._viewModel.canCut();
    };
    CommandCut.prototype.execute = function (args) {
        this._viewModel.cut();
        return true;
    };
    CommandCut.create = function (viewModel) {
        return new CommandCut(viewModel);
    };
    return CommandCut;
}());
exports.CommandCut = CommandCut;
;
//# sourceMappingURL=command-cut.js.map