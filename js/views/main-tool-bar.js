"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var MainToolBar = (function (_super) {
    __extends(MainToolBar, _super);
    function MainToolBar() {
        _super.apply(this, arguments);
    }
    MainToolBar.prototype.addButton = function (command, tips) {
        var btn = qtk_1.Button.create({
            tips: tips,
            styleType: "toolbar." + command,
            dataBindingRule: { click: { command: command } },
            layoutParam: qtk_1.LinearLayouterParam.create({ w: 40 }) });
        this.addChild(btn);
    };
    MainToolBar.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        this.childrenLayouter = qtk_1.LinearLayouter.createH();
        this.addButton("new", "Create New File");
        this.addButton("save", "Save File");
        this.addButton("open", "Open File");
        this.bindData(this.viewModel);
    };
    MainToolBar.create = function (options) {
        var toolBar = new MainToolBar();
        toolBar.reset("tool-bar", options);
        return toolBar;
    };
    return MainToolBar;
}(qtk_1.Group));
exports.MainToolBar = MainToolBar;
;
//# sourceMappingURL=main-tool-bar.js.map