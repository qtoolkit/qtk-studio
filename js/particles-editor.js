"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main_window_1 = require("./views/main-window");
var qtk_1 = require("qtk");
var iparticles_view_model_1 = require("./view-models/iparticles-view-model");
var themeDataURL = "https://qtoolkit.github.io/demos/assets/theme/default/theme.json";
var ParticlesEditor = (function (_super) {
    __extends(ParticlesEditor, _super);
    function ParticlesEditor(appName, viewModelName) {
        _super.call(this, appName);
        this._viewModelName = viewModelName;
    }
    ParticlesEditor.prototype.getViewModelName = function () {
        return this._viewModelName;
    };
    ParticlesEditor.prototype.createViewModel = function () {
        var name = this.getViewModelName();
        var storage = qtk_1.ItemsStorage.create(name);
        return iparticles_view_model_1.ParticlesViewModelFactory.create(name, { storage: storage });
    };
    ParticlesEditor.prototype.onReady = function () {
        var vp = this.getViewPort();
        var viewModel = this.createViewModel();
        this.mainWindow = main_window_1.MainWindow.create({ w: vp.w, h: vp.h, app: this, viewModel: viewModel });
    };
    ParticlesEditor.run = function (appName, viewModelName) {
        var app = new ParticlesEditor(appName, viewModelName);
        app.init({ sysThemeDataURL: themeDataURL });
        app.run();
        return app;
    };
    return ParticlesEditor;
}(qtk_1.Application));
exports.ParticlesEditor = ParticlesEditor;
;
//# sourceMappingURL=particles-editor.js.map