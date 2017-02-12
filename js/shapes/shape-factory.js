"use strict";
var ShapeFactory = (function () {
    function ShapeFactory() {
    }
    ShapeFactory.unregisterCreator = function (type, category) {
        var creators = ShapeFactory.categories[category];
        if (creators) {
            delete creators[type];
            delete ShapeFactory.creators[type];
            return true;
        }
        return false;
    };
    ShapeFactory.registerCreator = function (type, category, creator) {
        var creators = ShapeFactory.categories[category];
        if (!creators) {
            ShapeFactory.categories[category] = {};
            creators = ShapeFactory.categories[category];
        }
        creators[type] = creator;
        ShapeFactory.creators[type] = creator;
        return true;
    };
    ShapeFactory.createWithJson = function (json) {
        var type = json.type;
        var create = ShapeFactory.creators[type];
        if (create) {
            var shape = create();
            return shape.fromJson(json);
        }
        return null;
    };
    return ShapeFactory;
}());
ShapeFactory.categories = {};
ShapeFactory.creators = {};
exports.ShapeFactory = ShapeFactory;
//# sourceMappingURL=shape-factory.js.map