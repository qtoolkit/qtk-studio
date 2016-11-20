"use strict";
var saveAs = require('save-as').default;
var CommandDownload = (function () {
    function CommandDownload(viewModel) {
        this._viewModel = viewModel;
    }
    CommandDownload.prototype.canExecute = function () {
        return true;
    };
    CommandDownload.prototype.execute = function (args) {
        var viewModel = this._viewModel;
        //	let blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
        //	saveAs(blob, 'dialog.json')
        return true;
    };
    CommandDownload.create = function (viewModel) {
        return new CommandDownload(viewModel);
    };
    return CommandDownload;
}());
exports.CommandDownload = CommandDownload;
;
//# sourceMappingURL=command-download.js.map