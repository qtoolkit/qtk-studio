"use strict";
var qtk_1 = require("qtk");
var CommandOpen = (function () {
    function CommandOpen(viewModel) {
        this._viewModel = viewModel;
    }
    CommandOpen.prototype.canExecute = function () {
        var viewModel = this._viewModel;
        var docList = viewModel.getDocList();
        return docList && docList.length > 0;
    };
    CommandOpen.prototype.execute = function (args) {
        var viewModel = this._viewModel;
        var docList = viewModel.getDocList();
        var choiceInfo = qtk_1.ChoiceInfo.create("Open...", false, 300, 300);
        docList.forEach(function (item) {
            choiceInfo.addOption(item);
        });
        qtk_1.InteractionRequest.choice(choiceInfo, function (ret) {
            var arr = ret.value;
            if (arr && arr.length) {
                var fileName = arr[0].text;
                viewModel.openDoc(fileName);
            }
        });
        return true;
    };
    CommandOpen.create = function (viewModel) {
        return new CommandOpen(viewModel);
    };
    return CommandOpen;
}());
exports.CommandOpen = CommandOpen;
;
//# sourceMappingURL=command-open.js.map