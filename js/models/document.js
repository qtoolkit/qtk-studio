"use strict";
var qtk_1 = require("qtk");
var Document = (function () {
    function Document() {
    }
    Document.prototype.toJson = function () {
        var json = {
            data: this.data,
            propsDesc: this.propsDesc.map(function (item) {
                return item.toJson();
            })
        };
        return json;
    };
    Document.prototype.fromJson = function (json) {
        this.data = json.data;
        this.propsDesc = json.propsDesc.map(function (item) {
            return qtk_1.PagePropsDesc.create(item.title, item.propsDesc.items);
        });
        if (!this.data.backGroundColor) {
            this.data.backGroundColor = "#f6f6f6";
        }
        return this;
    };
    Document.prototype.fromTemplate = function (name) {
        var json = Document.templates[name];
        var data = {};
        this.propsDesc = json.map(function (item) {
            var pagePropsDesc = qtk_1.PagePropsDesc.create(item.title, item.propsDesc);
            item.propsDesc.forEach(function (desc) {
                if (desc.path) {
                    data[desc.path] = desc.value;
                }
            });
            return pagePropsDesc;
        });
        this.data = data;
        if (!this.data.backGroundColor) {
            this.data.backGroundColor = "#f6f6f6";
        }
        return this;
    };
    Document.prototype.getTemplateList = function () {
        return Document.templateNames;
    };
    Document.create = function () {
        return new Document();
    };
    Document.registerTemplate = function (name, json) {
        Document.templates[name] = json;
        Document.templateNames.push(name);
    };
    Document.getTemplateList = function () {
        return Document.templateNames;
    };
    Document.templates = {};
    Document.templateNames = [];
    return Document;
}());
exports.Document = Document;
//# sourceMappingURL=document.js.map