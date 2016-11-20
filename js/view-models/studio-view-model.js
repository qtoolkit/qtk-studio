"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var command_new_1 = require("./command-new");
var command_save_1 = require("./command-save");
var command_open_1 = require("./command-open");
var command_remove_1 = require("./command-remove");
var command_download_1 = require("./command-download");
var command_content_1 = require("./command-content");
var command_about_1 = require("./command-about");
var StudioViewModel = (function (_super) {
    __extends(StudioViewModel, _super);
    function StudioViewModel(data) {
        _super.call(this, data);
        this.initCommands();
    }
    StudioViewModel.prototype.initCommands = function () {
        this.registerCommand("new", command_new_1.CommandNew.create(this));
        this.registerCommand("open", command_open_1.CommandOpen.create(this));
        this.registerCommand("save", command_save_1.CommandSave.create(this, true));
        this.registerCommand("remove", command_remove_1.CommandRemove.create(this));
        this.registerCommand("download", command_download_1.CommandDownload.create(this));
        this.registerCommand("content", command_content_1.CommandContent.create(this, "https://github.com/qtoolkit/qtk"));
        this.registerCommand("about", command_about_1.CommandAbout.create(this));
    };
    StudioViewModel.prototype.removeDoc = function (fileName) {
    };
    StudioViewModel.prototype.saveDoc = function (fileName) {
    };
    StudioViewModel.prototype.openDoc = function (fileName) {
    };
    StudioViewModel.prototype.getDocList = function () {
        return [];
    };
    StudioViewModel.create = function (data) {
        return new StudioViewModel(data);
    };
    return StudioViewModel;
}(qtk_1.ViewModel));
exports.StudioViewModel = StudioViewModel;
//# sourceMappingURL=studio-view-model.js.map