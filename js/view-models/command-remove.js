"use strict";
var qtk_1 = require("qtk");
var CommandRemove = (function () {
    function CommandRemove(viewModel) {
        this._viewModel = viewModel;
    }
    CommandRemove.prototype.canExecute = function () {
        var viewModel = this._viewModel;
        var docList = viewModel.getDocList();
        return docList && docList.length > 0;
    };
    CommandRemove.prototype.confirmRemove = function (items) {
        var viewModel = this._viewModel;
        var fileNames = items.map(function (item) {
            return item.text;
        }).join(",");
        var info = qtk_1.ConfirmationInfo.create("Are you sure to remove " + fileNames + " ?", 300);
        qtk_1.InteractionRequest.confirm(info, function (ret) {
            if (info.confirmed) {
                items.forEach(function (item) {
                    viewModel.removeDoc(item.text);
                });
            }
        });
    };
    CommandRemove.prototype.execute = function (args) {
        var _this = this;
        var viewModel = this._viewModel;
        var docList = viewModel.getDocList();
        var choiceInfo = qtk_1.ChoiceInfo.create("Remove...", true, 300, 300);
        docList.forEach(function (item) {
            choiceInfo.addOption(item);
        });
        qtk_1.InteractionRequest.choice(choiceInfo, function (ret) {
            var arr = ret.value;
            if (arr && arr.length) {
                _this.confirmRemove(arr);
            }
        });
        return true;
    };
    CommandRemove.create = function (viewModel) {
        return new CommandRemove(viewModel);
    };
    return CommandRemove;
}());
exports.CommandRemove = CommandRemove;
;
//# sourceMappingURL=command-remove.js.map