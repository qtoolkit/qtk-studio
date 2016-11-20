"use strict";
var qtk_1 = require("qtk");
var CommandAbout = (function () {
    function CommandAbout(viewModel, propsInfo) {
        this._viewModel = viewModel;
        this._propsInfo = propsInfo;
    }
    CommandAbout.prototype.canExecute = function () {
        return true;
    };
    CommandAbout.prototype.execute = function (args) {
        qtk_1.InteractionRequest.props(this._propsInfo, function (ret) {
        });
        return true;
    };
    CommandAbout.create = function (viewModel) {
        var data = {
            author: "Li XianJing",
            email: "xianjimli@hotmail.com",
            home: "https://github.com/qtoolkit/qtk",
        };
        var descJson = [
            { type: "text-readonly", name: "Author", path: "author" },
            { type: "link", name: "Email", path: "email" },
            { type: "link", name: "Home", path: "home" },
        ];
        var pagePropsDesc = qtk_1.PagePropsDesc.create("About", descJson);
        var propsInfo = qtk_1.PropsInfo.create(pagePropsDesc, data, false, 300);
        return new CommandAbout(viewModel, propsInfo);
    };
    return CommandAbout;
}());
exports.CommandAbout = CommandAbout;
;
//# sourceMappingURL=command-about.js.map