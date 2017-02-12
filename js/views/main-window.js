"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var design_view_1 = require("./design-view");
var main_menu_bar_1 = require("./main-menu-bar");
var main_tool_bar_1 = require("./main-tool-bar");
var main_tab_control_1 = require("./main-tab-control");
var component_list_view_1 = require("./component-list-view");
var main_view_model_1 = require("../view-models/main-view-model");
var qtk_1 = require("qtk");
var qtk_2 = require("qtk");
var qtk_3 = require("qtk");
var MainWindow = (function (_super) {
    __extends(MainWindow, _super);
    function MainWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainWindow.prototype.createNewTab = function () {
        var viewModel = this.viewModel;
        var docName = viewModel.getDocName();
        var tabControl = this.tabControl;
        var clientView = qtk_3.Group.create({
            name: "client-view",
            childrenLayouter: qtk_2.SimpleLayouter.create(),
            layoutParam: qtk_2.SimpleLayouterParam.create("0", "0", "100%", "100%")
        });
        var page = tabControl.addPage(docName, null, null, true);
        page.addChild(clientView);
        page.childrenLayouter = qtk_2.SimpleLayouter.create();
        clientView.addChild(design_view_1.DesignView.create({
            name: "design-view",
            viewModel: viewModel,
            layoutParam: qtk_2.SimpleLayouterParam.create("0", "0", "100%", "100%")
        }));
        clientView.addChild(component_list_view_1.ComponentListView.create({
            movable: true,
            layoutParam: qtk_2.SimpleLayouterParam.create("10", "10", "200", "90%")
        }));
        this.tabControl.activePage = page;
    };
    MainWindow.prototype.onCreated = function () {
        var _this = this;
        _super.prototype.onCreated.call(this);
        var viewModel = this.viewModel;
        this.childrenLayouter = qtk_2.DockLayouter.create();
        this.addChild(main_menu_bar_1.MainMenuBar.create({
            viewModel: viewModel,
            layoutParam: qtk_2.DockLayouterParam.create(qtk_3.Direction.TOP, "30")
        }));
        this.addChild(main_tool_bar_1.MainToolBar.create({
            viewModel: viewModel,
            layoutParam: qtk_2.DockLayouterParam.create(qtk_3.Direction.TOP, "30")
        }));
        var tabControl = main_tab_control_1.MainTabControl.create({
            expandButton: false,
            buttonGroupAtTop: true,
            layoutParam: qtk_2.DockLayouterParam.create(qtk_3.Direction.TOP, "100%")
        });
        this.addChild(tabControl);
        this.tabControl = tabControl;
        viewModel.on(main_view_model_1.MainViewModel.EVT_DOC_NEW, function (evt) {
            _this.createNewTab();
        });
        viewModel.on(main_view_model_1.MainViewModel.EVT_DOC_RENAME, function (evt) {
            _this.tabControl.renamePageByModel(viewModel.model);
        });
        viewModel.on(main_view_model_1.MainViewModel.EVT_DOC_OPEN, function (evt) {
            var model = viewModel.model;
            if (!model.view) {
                _this.createNewTab();
            }
            else {
                _this.tabControl.activatePageByModel(viewModel.model);
            }
        });
        tabControl.on(qtk_1.Events.CHANGE, function (evt) {
            var page = tabControl.activePage;
            if (page) {
                var clientView = page.children[0];
                if (clientView) {
                    var designView = clientView.findChildByName("design-view");
                    designView.activate();
                }
            }
        });
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