"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var main_menu_bar_1 = require("./main-menu-bar");
var main_tool_bar_1 = require("./main-tool-bar");
var qtk_2 = require("qtk");
var MainWindow = (function (_super) {
    __extends(MainWindow, _super);
    function MainWindow() {
        _super.apply(this, arguments);
    }
    MainWindow.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        var viewModel = this.viewModel;
        this.childrenLayouter = qtk_2.DockLayouter.create();
        this.addChild(main_menu_bar_1.MainMenuBar.create({ viewModel: viewModel,
            layoutParam: qtk_2.DockLayouterParam.create({ position: qtk_1.Direction.TOP, size: 30 })
        }));
        this.addChild(main_tool_bar_1.MainToolBar.create({ viewModel: viewModel,
            layoutParam: qtk_2.DockLayouterParam.create({ position: qtk_1.Direction.TOP, size: 30 })
        }));
    };
    MainWindow.create = function (options) {
        var win = new MainWindow();
        win.reset("main-window", options);
        win.open();
        return win;
    };
    return MainWindow;
}(qtk_2.WindowNormal));
exports.MainWindow = MainWindow;
;
//# sourceMappingURL=main-window.js.map