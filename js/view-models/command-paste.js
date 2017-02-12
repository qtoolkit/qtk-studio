"use strict";
var CommandPaste = (function () {
    function CommandPaste(viewModel) {
        this._viewModel = viewModel;
    }
    CommandPaste.prototype.canExecute = function () {
        return this._viewModel.canPaste();
    };
    CommandPaste.prototype.execute = function (args) {
        this._viewModel.paste();
        return true;
    };
    CommandPaste.create = function (viewModel) {
        return new CommandPaste(viewModel);
    };
    return CommandPaste;
}());
exports.CommandPaste = CommandPaste;
;
//# sourceMappingURL=command-paste.js.map