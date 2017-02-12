"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var controls_model_1 = require("../models/controls-model");
var controls_view_model_1 = require("../view-models/controls-view-model");
var ControlsListView = (function (_super) {
    __extends(ControlsListView, _super);
    function ControlsListView() {
        return _super.call(this) || this;
    }
    ControlsListView.prototype.createTemplateItem = function () {
        var dataBindingRule = {
            text: { path: "text" },
            userData: { path: "info" }
        };
        var item = qtk_1.ListItem.create({ dataBindingRule: dataBindingRule });
        item.useBehavior("draggable", {});
        return item;
    };
    ControlsListView.prototype.hookItem = function (item) {
        item.on(qtk_1.Events.DRAGSTART, function (evt) {
            var image = {
                draw: function (ctx, x, y) {
                    var rect = qtk_1.Rect.create(x, y, 128, 30);
                    ctx.fillStyle = "gold";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
                    qtk_1.Graphics.drawTextSL(ctx, item.text, item.getStyle(), rect);
                }
            };
            evt.dataTransfer.setDragImage(image);
            evt.dataTransfer.setData("text/plain", item.userData);
        });
        item.on(qtk_1.Events.DRAGEND, function (evt) {
            console.log("DRAGEND");
        });
    };
    ControlsListView.prototype.initContent = function () {
        var _this = this;
        this.contentWidget = qtk_1.ListView.create({
            itemH: 36,
            templateItem: this.createTemplateItem()
        });
        this.titleWidget = qtk_1.Label.create({ text: "Controls palette", styleType: "dialog.title-bg" });
        this.contentWidget.bindData(controls_view_model_1.ControlsViewModel.create(controls_model_1.ControlsModel.create()));
        this.contentWidget.children.forEach(function (item) {
            _this.hookItem(item);
        });
    };
    ControlsListView.create = function (options) {
        var view = new ControlsListView();
        view.reset("controls-list-view", options);
        view.initContent();
        return view;
    };
    return ControlsListView;
}(qtk_1.TitleContent));
exports.ControlsListView = ControlsListView;
//# sourceMappingURL=controls-list-view.js.map