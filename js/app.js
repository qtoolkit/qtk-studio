"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var main_window_1 = require("./views/main-window");
var main_view_model_1 = require("./view-models/main-view-model");
var themeDataURL = "assets/theme/default/theme.js";
var appThemeDataURL = "assets/theme/default/demo.js";
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.onReady = function () {
        var viewModel = main_view_model_1.MainViewModel.create(null);
        var mainWindow = main_window_1.MainWindow.create({ app: this, viewModel: viewModel }).maximize();
    };
    App.run = function () {
        var app = new App("QToolKit Studio");
        var assetsURLs = [themeDataURL, appThemeDataURL];
        app.preload(assetsURLs, function () {
            app.init({ sysThemeDataURL: themeDataURL, appThemeDataURL: appThemeDataURL });
            app.run();
        });
        return app;
    };
    return App;
}(qtk_1.Application));
exports.App = App;
;
//# sourceMappingURL=app.js.map