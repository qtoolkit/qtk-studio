"use strict";
var qtk_1 = require("qtk");
var CommandSave = (function () {
    function CommandSave(viewModel, isSaveAs) {
        this._isSaveAs = isSaveAs;
        this._viewModel = viewModel;
        this._inputInfo = qtk_1.InputInfo.create("Please input file name:", null);
    }
    CommandSave.prototype.canExecute = function () {
        return true;
    };
    CommandSave.prototype.execute = function (args) {
        var viewModel = this._viewModel;
        var fileName = viewModel.getDocName();
        if (viewModel.isNoName(fileName) || this._isSaveAs) {
            qtk_1.InteractionRequest.input(this._inputInfo, function (ret) {
                if (ret.value) {
                    viewModel.saveDoc(ret.value);
                }
            });
        }
        else {
            viewModel.saveDoc(fileName);
            qtk_1.InteractionRequest.toast(qtk_1.ToastInfo.create("Save done."));
        }
        return true;
    };
    CommandSave.create = function (viewModel, isSaveAs) {
        return new CommandSave(viewModel, isSaveAs);
    };
    return CommandSave;
}());
exports.CommandSave = CommandSave;
;
//# sourceMappingURL=command-save.js.map