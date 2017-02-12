"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qtk_1 = require("qtk");
var ControlsViewModel = (function (_super) {
    __extends(ControlsViewModel, _super);
    function ControlsViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlsViewModel.create = function (data) {
        return new ControlsViewModel(data);
    };
    return ControlsViewModel;
}(qtk_1.CollectionViewModel));
exports.ControlsViewModel = ControlsViewModel;
//# sourceMappingURL=controls-view-model.js.map