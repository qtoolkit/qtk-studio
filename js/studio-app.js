"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var main_window_1 = require("./views/main-window");
var studio_view_model_1 = require("./view-models/studio-view-model");
var themeDataURL = "/www/assets/theme/default/theme.json";
var StudioApp = (function (_super) {
    __extends(StudioApp, _super);
    function StudioApp() {
        _super.apply(this, arguments);
    }
    StudioApp.prototype.createViewModel = function () {
        return studio_view_model_1.StudioViewModel.create({});
    };
    StudioApp.prototype.onReady = function () {
        var viewModel = this.createViewModel();
        var mainWindow = main_window_1.MainWindow.create({ app: this, viewModel: viewModel }).maximize();
    };
    StudioApp.run = function () {
        var app = new StudioApp("qtk-studio");
        app.init({ sysThemeDataURL: themeDataURL });
        app.run();
        return app;
    };
    return StudioApp;
}(qtk_1.Application));
exports.StudioApp = StudioApp;
;
//# sourceMappingURL=studio-app.js.map