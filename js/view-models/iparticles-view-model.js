"use strict";
;
var ParticlesViewModelFactory = (function () {
    function ParticlesViewModelFactory() {
    }
    ParticlesViewModelFactory.register = function (type, creator) {
        ParticlesViewModelFactory.viewModels[type] = creator;
    };
    ParticlesViewModelFactory.create = function (type, options) {
        var creator = ParticlesViewModelFactory.viewModels[type];
        return creator(options);
    };
    ParticlesViewModelFactory.viewModels = {};
    return ParticlesViewModelFactory;
}());
exports.ParticlesViewModelFactory = ParticlesViewModelFactory;
//# sourceMappingURL=iparticles-view-model.js.map