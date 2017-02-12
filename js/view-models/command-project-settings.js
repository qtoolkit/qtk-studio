"use strict";
var qtk_1 = require("qtk");
var CommandProjectSettings = (function () {
    function CommandProjectSettings(model) {
        this.model = model;
    }
    CommandProjectSettings.prototype.canExecute = function () {
        return true;
    };
    CommandProjectSettings.prototype.execute = function (args) {
        var _this = this;
        var json = [
            { type: "number", titleW: 108, name: "Design Width", desc: "Design Width", path: "designWidth" },
            { type: "number", titleW: 108, name: "Design Height", desc: "Design Height", path: "designHeight" }
        ];
        var data = { designWidth: this.model.w, designHeight: this.model.h };
        var propsDesc = qtk_1.PagePropsDesc.create("Project Settings", json);
        qtk_1.InteractionRequest.props(qtk_1.PropsInfo.create(propsDesc, data, true, 320), function (ret) {
            _this.model.w = ret.data.designWidth;
            _this.model.h = ret.data.designHeight;
        });
        return true;
    };
    CommandProjectSettings.create = function (model) {
        return new CommandProjectSettings(model);
    };
    return CommandProjectSettings;
}());
exports.CommandProjectSettings = CommandProjectSettings;
//# sourceMappingURL=command-project-settings.js.map