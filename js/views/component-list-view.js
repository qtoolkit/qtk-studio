"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var controls_model_1 = require("../models/controls-model");
var controls_view_model_1 = require("../view-models/controls-view-model");
var ComponentListView = (function (_super) {
    __extends(ComponentListView, _super);
    function ComponentListView() {
        var _this = _super.call(this) || this;
        _this.TYPE = "component-list-view";
        return _this;
    }
    ComponentListView.prototype.createTemplateItem = function () {
        var dataBindingRule = {
            text: { path: "text" },
            userData: { path: "info" }
        };
        var item = qtk_1.ListItem.create({ dataBindingRule: dataBindingRule });
        item.useBehavior("draggable", {});
        return item;
    };
    ComponentListView.prototype.hookItem = function (item) {
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
    ComponentListView.prototype.initContent = function () {
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
    ComponentListView.create = function (options) {
        var view = new ComponentListView();
        view.reset(ComponentListView.TYPE, options);
        view.initContent();
        return view;
    };
    return ComponentListView;
}(qtk_1.TitleContent));
exports.ComponentListView = ComponentListView;
//# sourceMappingURL=component-list-view.js.map