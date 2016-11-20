"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var MainMenuBar = (function (_super) {
    __extends(MainMenuBar, _super);
    function MainMenuBar() {
        _super.apply(this, arguments);
    }
    MainMenuBar.prototype.onFileMenu = function (menu) {
        menu.w = 128;
        menu.addItem("New", null).set({ dataBindingRule: { click: { command: "new" } } });
        menu.addItem("Open", null).set({ dataBindingRule: { click: { command: "open" } } });
        menu.addItem("Save", null).set({ dataBindingRule: { click: { command: "save" } } });
        menu.addItem("Save As", null).set({ dataBindingRule: { click: { command: "save-as" } } });
        menu.addItem("Remove", null).set({ dataBindingRule: { click: { command: "remove" } } });
        menu.addSpace();
        menu.addItem("Export", null).set({ dataBindingRule: { click: { command: "export" } } });
        menu.bindData(this.viewModel);
    };
    MainMenuBar.prototype.onHelpMenu = function (menu) {
        menu.w = 128;
        menu.addItem("Content", null).set({ dataBindingRule: { click: { command: "content" } } });
        menu.addItem("About", null).set({ dataBindingRule: { click: { command: "about" } } });
        menu.bindData(this.viewModel);
    };
    MainMenuBar.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        this.addLogo("/www/assets/theme/default/images/@density/logo.png");
        this.addItem("File", this.onFileMenu.bind(this));
        this.addItem("Help", this.onHelpMenu.bind(this));
    };
    MainMenuBar.create = function (options) {
        var menuBar = new MainMenuBar();
        menuBar.reset("menu-bar", options);
        return menuBar;
    };
    return MainMenuBar;
}(qtk_1.MenuBar));
exports.MainMenuBar = MainMenuBar;
;
//# sourceMappingURL=main-menu-bar.js.map