"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main_cmds_desc_1 = require("./main-cmds-desc");
var qtk_1 = require("qtk");
var qtk_2 = require("qtk");
var MainMenuBar = (function (_super) {
    __extends(MainMenuBar, _super);
    function MainMenuBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenuBar.prototype.addShortcut = function (key, command) {
        var shortcut = key.toLowerCase();
        var viewModel = this.viewModel;
        this.win.on(qtk_1.Events.SHORTCUT, function (evt) {
            if (evt.keys === shortcut) {
                viewModel.execCommand(command, null);
            }
        });
    };
    MainMenuBar.prototype.addMenuItem = function (menu, text, key, command) {
        var item = null;
        if (!text) {
            item = menu.addSpace();
        }
        else {
            item = menu.addItem(text, null, null, key);
            item.set({ dataBindingRule: { click: { command: command } } });
        }
        return item;
    };
    MainMenuBar.prototype.addShortcuts = function (cmdsDesc) {
        for (var category in cmdsDesc) {
            for (var cmd in cmdsDesc[category]) {
                var desc = cmdsDesc[category][cmd];
                if (desc.shortcut) {
                    this.addShortcut(desc.shortcut, desc.command);
                }
            }
        }
    };
    MainMenuBar.prototype.createMenu = function (cmdsDesc) {
        var bar = this;
        var viewModel = this.viewModel;
        this.addLogo("https://qtoolkit.github.io/demos/assets/icons/@density/apple.png");
        function addItem(key, descs) {
            var w = key.length > 5 ? 70 : 50;
            bar.addItem(key, function (menu) {
                menu.w = 200;
                for (var cmd in descs) {
                    var desc = descs[cmd];
                    bar.addMenuItem(menu, desc.text, desc.shortcut, desc.command);
                }
                menu.bindData(viewModel);
            }, w);
        }
        for (var key in cmdsDesc) {
            addItem(key, cmdsDesc[key]);
        }
    };
    MainMenuBar.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.createMenu(main_cmds_desc_1.MainCmdsDesc);
        this.addShortcuts(main_cmds_desc_1.MainCmdsDesc);
    };
    MainMenuBar.create = function (options) {
        var menuBar = new MainMenuBar();
        menuBar.reset("menu-bar", options);
        return menuBar;
    };
    return MainMenuBar;
}(qtk_2.MenuBar));
exports.MainMenuBar = MainMenuBar;
;
//# sourceMappingURL=main-menu-bar.js.map