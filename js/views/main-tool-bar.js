"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main_cmds_desc_1 = require("./main-cmds-desc");
var qtk_1 = require("qtk");
var MainToolBar = (function (_super) {
    __extends(MainToolBar, _super);
    function MainToolBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainToolBar.prototype.getIconURL = function (name) {
        return "assets/icons/@density/" + name + ".png";
    };
    MainToolBar.prototype.getDisableIconURL = function (name) {
        return "assets/icons/@density/" + name + "-disable.png";
    };
    MainToolBar.prototype.createItems = function (cmdsDesc) {
        for (var categeory in cmdsDesc) {
            var items = cmdsDesc[categeory];
            for (var cmd in items) {
                var desc = items[cmd];
                if (desc.toolbar) {
                    if (desc.icon) {
                        var normalIconURL = this.getIconURL(desc.icon);
                        var disableIconURL = this.getDisableIconURL(desc.icon);
                        this.addItem(desc.command, desc.text, desc.tips, normalIconURL, disableIconURL);
                    }
                    else {
                        this.addSpacer(desc.w || 10);
                    }
                }
            }
        }
    };
    MainToolBar.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.createItems(main_cmds_desc_1.MainCmdsDesc);
        this.bindData(this.viewModel);
    };
    MainToolBar.create = function (options) {
        var bar = new MainToolBar(MainToolBar.TYPE);
        bar.reset(MainToolBar.TYPE, options);
        bar.styleType = qtk_1.ToolBar.TYPE;
        return bar;
    };
    return MainToolBar;
}(qtk_1.ToolBar));
MainToolBar.TYPE = "main-tool-bar";
exports.MainToolBar = MainToolBar;
;
//# sourceMappingURL=main-tool-bar.js.map