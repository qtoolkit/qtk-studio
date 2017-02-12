"use strict";
var CommandAlign = (function () {
    function CommandAlign(viewModel) {
        this._viewModel = viewModel;
    }
    CommandAlign.prototype.canExecute = function () {
        var viewModel = this._viewModel;
        return viewModel.countSelectedWidget() > 1;
    };
    CommandAlign.prototype.execute = function (args) {
        var viewModel = this._viewModel;
        return viewModel.align(args);
    };
    CommandAlign.create = function (viewModel) {
        return new CommandAlign(viewModel);
    };
    return CommandAlign;
}());
exports.CommandAlign = CommandAlign;
;
//# sourceMappingURL=command-align.js.map