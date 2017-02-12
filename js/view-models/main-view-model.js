"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var command_new_1 = require("./command-new");
var command_open_1 = require("./command-open");
var command_save_1 = require("./command-save");
var command_about_1 = require("./command-about");
var command_remove_1 = require("./command-remove");
var command_content_1 = require("./command-content");
var command_project_settings_1 = require("./command-project-settings");
var storage_1 = require("../models/storage");
var main_model_1 = require("../models/main-model");
var qtk_1 = require("qtk");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel(model) {
        var _this = _super.call(this, model) || this;
        _this.models = [];
        _this.nonameIndex = 0;
        _this.initCommands();
        return _this;
    }
    MainViewModel.prototype.addModel = function (model) {
        this.models.push(model);
    };
    MainViewModel.prototype.removeModel = function (model) {
        var index = this.models.indexOf(model);
        if (index >= 0) {
            this.models.splice(index, 1);
        }
        if (this.model === model) {
            this.model = null;
        }
        return index >= 0;
    };
    MainViewModel.prototype.findModel = function (docName) {
        return this.models.find(function (iter) {
            return iter.docName === docName;
        });
    };
    MainViewModel.prototype.initCommands = function () {
        this.registerCommand("about", command_about_1.CommandAbout.create(this));
        this.registerCommand("new", command_new_1.CommandNew.create(this));
        this.registerCommand("open", command_open_1.CommandOpen.create(this));
        this.registerCommand("save", command_save_1.CommandSave.create(this, false));
        this.registerCommand("save-as", command_save_1.CommandSave.create(this, true));
        this.registerCommand("remove", command_remove_1.CommandRemove.create(this));
        this.registerCommand("content", command_content_1.CommandContent.create(this));
        this.registerCommand("showProjectSettings", command_project_settings_1.CommandProjectSettings.create(this.model));
        this.registerDelegateCommand("align-left", this.alignLeft, this.canAlign);
        this.registerDelegateCommand("align-right", this.alignRight, this.canAlign);
        this.registerDelegateCommand("align-top", this.alignTop, this.canAlign);
        this.registerDelegateCommand("align-bottom", this.alignBottom, this.canAlign);
        this.registerDelegateCommand("align-width", this.alignToSameWidth, this.canAlign);
        this.registerDelegateCommand("align-height", this.alignToSameHeight, this.canAlign);
        this.registerDelegateCommand("align-dist-h", this.alignDistH, this.canDistribute);
        this.registerDelegateCommand("align-dist-v", this.alignDistV, this.canDistribute);
        this.registerDelegateCommand("copy", this.copy, this.canCopy);
        this.registerDelegateCommand("cut", this.cut, this.canCut);
        this.registerDelegateCommand("paste", this.paste, this.canPaste);
        this.registerDelegateCommand("delete", this.del, this.canDelete);
        this.registerDelegateCommand("undo", this.undo, this.canUndo);
        this.registerDelegateCommand("redo", this.redo, this.canRedo);
    };
    MainViewModel.prototype.registerDelegateCommand = function (name, exec, canExec) {
        this.registerCommand(name, qtk_1.DelegateCommand.create(exec.bind(this), canExec.bind(this)));
    };
    MainViewModel.prototype.countSelectedWidget = function () {
        return this.model ? this.model.countSelectedShapes() : 0;
    };
    MainViewModel.prototype.copy = function () {
        this.model.copy();
    };
    MainViewModel.prototype.cut = function () {
        this.model.cut();
    };
    MainViewModel.prototype.paste = function () {
        this.model.paste();
    };
    MainViewModel.prototype.del = function () {
        this.model.del();
    };
    MainViewModel.prototype.canDelete = function () {
        return this.countSelectedWidget() > 0;
    };
    MainViewModel.prototype.canCopy = function () {
        return this.countSelectedWidget() > 0;
    };
    MainViewModel.prototype.canCut = function () {
        return this.countSelectedWidget() > 0;
    };
    MainViewModel.prototype.canPaste = function () {
        return this.model && this.model.canPaste();
    };
    MainViewModel.prototype.undo = function () {
        return this.model.cmdHistory.undo();
    };
    MainViewModel.prototype.redo = function () {
        return this.model.cmdHistory.redo();
    };
    MainViewModel.prototype.canUndo = function () {
        return this.model && this.model.cmdHistory.canUndo();
    };
    MainViewModel.prototype.canRedo = function () {
        return this.model && this.model.cmdHistory.canRedo();
    };
    MainViewModel.prototype.getDocName = function () {
        return this.model.docName;
    };
    MainViewModel.prototype.getDocList = function () {
        return storage_1.Storage.getDocList();
    };
    MainViewModel.prototype.genNoName = function () {
        return "noname-" + this.nonameIndex++;
    };
    MainViewModel.prototype.isNoName = function (docName) {
        return !docName || docName.indexOf("noname-") === 0;
    };
    MainViewModel.prototype.newDoc = function () {
        this.model = main_model_1.MainModel.create();
        this.addModel(this.model);
        this.model.docName = this.genNoName();
        this.dispatchEvent(qtk_1.Events.AnyEvent.create(MainViewModel.EVT_DOC_NEW, this));
        return true;
    };
    MainViewModel.prototype.saveDoc = function (docName) {
        if (this.model.docName !== docName) {
            this.model.docName = docName;
            this.dispatchEvent(qtk_1.Events.AnyEvent.create(MainViewModel.EVT_DOC_RENAME, this));
        }
        var data = JSON.stringify(this.model.saveToJson(), null, '\t');
        return storage_1.Storage.saveDoc(docName, data);
    };
    MainViewModel.prototype.openDoc = function (docName) {
        var model = this.findModel(docName);
        if (!model) {
            model = main_model_1.MainModel.create();
            model.docName = docName;
            this.addModel(model);
        }
        this.model = model;
        this.dispatchEvent(qtk_1.Events.AnyEvent.create(MainViewModel.EVT_DOC_OPEN, this));
        var str = storage_1.Storage.openDoc(docName);
        if (str) {
            try {
                this.model.loadFromJson(JSON.parse(str));
            }
            catch (e) {
                console.dir(e);
                return false;
            }
        }
        return true;
    };
    MainViewModel.prototype.removeDoc = function (docName) {
        return storage_1.Storage.removeDoc(docName);
    };
    MainViewModel.prototype.canAlign = function () {
        return this.countSelectedWidget() > 1;
    };
    MainViewModel.prototype.alignLeft = function () {
        return this.model.alignLeft();
    };
    MainViewModel.prototype.alignTop = function () {
        return this.model.alignTop();
    };
    MainViewModel.prototype.alignRight = function () {
        return this.model.alignRight();
    };
    MainViewModel.prototype.alignBottom = function () {
        return this.model.alignBottom();
    };
    MainViewModel.prototype.alignToSameWidth = function () {
        return this.model.alignToSameWidth();
    };
    MainViewModel.prototype.alignToSameHeight = function () {
        return this.model.alignToSameHeight();
    };
    MainViewModel.prototype.canDistribute = function () {
        return this.countSelectedWidget() > 2;
    };
    MainViewModel.prototype.alignDistH = function () {
        return this.model.alignDistH();
    };
    MainViewModel.prototype.alignDistV = function () {
        return this.model.alignDistV();
    };
    MainViewModel.create = function (model) {
        return new MainViewModel(model);
    };
    return MainViewModel;
}(qtk_1.ViewModel));
MainViewModel.EVT_DOC_NEW = "doc-new";
MainViewModel.EVT_DOC_OPEN = "doc-open";
MainViewModel.EVT_DOC_RENAME = "doc-rename";
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map