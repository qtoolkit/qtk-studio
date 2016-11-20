"use strict";
var saveAs = require('save-as').default;
var qtk_1 = require("qtk");
var CommandExport = (function () {
    function CommandExport(viewModel, choiceInfo) {
        this._viewModel = viewModel;
        this._choiceInfo = choiceInfo;
    }
    CommandExport.prototype.canExecute = function () {
        return true;
    };
    CommandExport.prototype.execute = function (args) {
        var viewModel = this._viewModel;
        qtk_1.InteractionRequest.choice(this._choiceInfo, function (ret) {
            var arr = ret.value;
            if (arr && arr.length) {
                var format = arr[0].text;
                var result = viewModel.exportDoc(format);
                if (result) {
                    var blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
                    saveAs(blob, 'particles.json');
                }
            }
        });
        return true;
    };
    CommandExport.create = function (viewModel) {
        var formatList = viewModel.getFormatList();
        var choiceInfo = qtk_1.ChoiceInfo.create("Export as...", false, 300, 200);
        formatList.forEach(function (item) {
            choiceInfo.addOption(item);
        });
        return new CommandExport(viewModel, choiceInfo);
    };
    return CommandExport;
}());
exports.CommandExport = CommandExport;
;
//# sourceMappingURL=command-export.js.map