"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var ControlsModel = (function (_super) {
    __extends(ControlsModel, _super);
    function ControlsModel() {
        var _this = _super.call(this) || this;
        _this.push({ text: "Button",
            info: {
                type: "widget",
                w: 200,
                h: 30,
                widgetInfo: { type: qtk_1.Button.TYPE, _text: "Button" }
            }
        });
        _this.push({ text: "Label",
            info: {
                type: "widget",
                w: 200,
                h: 30,
                widgetInfo: { type: qtk_1.Label.TYPE, _text: "Label" }
            }
        });
        _this.push({ text: "Edit",
            info: {
                type: "widget",
                w: 200,
                h: 30,
                widgetInfo: { type: qtk_1.Edit.TYPE, _text: "Edit" }
            }
        });
        _this.push({ text: "ComboBox",
            info: {
                type: "widget",
                w: 200,
                h: 30,
                widgetInfo: { type: qtk_1.ComboBox.TYPE, _text: "ComboBox" }
            }
        });
        return _this;
    }
    ControlsModel.create = function () {
        return new ControlsModel();
    };
    return ControlsModel;
}(Array));
exports.ControlsModel = ControlsModel;
;
//# sourceMappingURL=controls-model.js.map