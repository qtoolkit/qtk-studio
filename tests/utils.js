window.objEqualJson = function(obj, json) {
    for(var key in json) {
        var value = json[key];
        if(typeof value !== "object" && obj[key] !== json[key]) {
            return false;
        }
    }

    return true;
}