"use strict";
var CommandContent = (function () {
    function CommandContent(viewModel, helpURL) {
        this._viewModel = viewModel;
        this._helpURL = helpURL;
    }
    CommandContent.prototype.canExecute = function () {
        return true;
    };
    CommandContent.prototype.execute = function (args) {
        console.log("CommandContent");
        window.open(this._helpURL, "_blank");
        return true;
    };
    CommandContent.create = function (viewModel, helpURL) {
        return new CommandContent(viewModel, helpURL);
    };
    return CommandContent;
}());
exports.CommandContent = CommandContent;
;
//# sourceMappingURL=command-content.js.map