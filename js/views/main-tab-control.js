"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var MainTabControl = (function (_super) {
    __extends(MainTabControl, _super);
    function MainTabControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainTabControl.prototype.closePage = function (page) {
        var _this = this;
        var info = qtk_1.ConfirmationInfo.create("Are you sure to close this page?", 300);
        qtk_1.InteractionRequest.confirm(info, function (ret) {
            if (ret.confirmed) {
                _this.removePage(page, true);
            }
        });
        console.log("closePage");
    };
    MainTabControl.prototype.renamePageByModel = function (model) {
        var docName = model.docName;
        var page = model.view.getParentByType(qtk_1.TabPage.TYPE);
        this.setPageTitle(page, docName);
    };
    MainTabControl.prototype.activatePageByModel = function (model) {
        var designView = model.view;
        this.activePage = designView.getParentByType(qtk_1.TabPage.TYPE);
    };
    MainTabControl.create = function (options) {
        var tabControl = new MainTabControl();
        tabControl.reset(MainTabControl.TYPE, options);
        return tabControl;
    };
    return MainTabControl;
}(qtk_1.TabControl));
MainTabControl.TYPE = "main-tab-control";
exports.MainTabControl = MainTabControl;
//# sourceMappingURL=main-tab-control.js.map