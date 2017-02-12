"use strict";
var qtk_1 = require("qtk");
var ProjectSettingsCommand = (function () {
    function ProjectSettingsCommand(model) {
        this.model = model;
    }
    ProjectSettingsCommand.prototype.canExecute = function () {
        return true;
    };
    ProjectSettingsCommand.prototype.execute = function (args) {
        var _this = this;
        var json = [
            { type: "number", titleW: 108, name: "Design Width", desc: "Design Width", path: "designWidth" },
            { type: "number", titleW: 108, name: "Design Height", desc: "Design Height", path: "designHeight" }
        ];
        var data = { designWidth: this.model.designWidth, designHeight: this.model.designHeight };
        var propsDesc = qtk_1.PagePropsDesc.create("Project Settings", json);
        qtk_1.InteractionRequest.props(qtk_1.PropsInfo.create(propsDesc, data, true, 320), function (ret) {
            _this.model.designWidth = ret.data.designWidth;
            _this.model.designHeight = ret.data.designHeight;
        });
        return true;
    };
    ProjectSettingsCommand.create = function (model) {
        return new ProjectSettingsCommand(model);
    };
    return ProjectSettingsCommand;
}());
exports.ProjectSettingsCommand = ProjectSettingsCommand;
//# sourceMappingURL=project-settings-cmd.js.map