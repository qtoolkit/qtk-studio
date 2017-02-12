"use strict";
var Storage = (function () {
    function Storage() {
    }
    Storage.docNameToStorageName = function (docName) {
        return Storage.DOC_PREFIX + docName;
    };
    Storage.docNameFromStorageName = function (storageName) {
        return storageName.replace(Storage.DOC_PREFIX, "");
    };
    Storage.getDocList = function () {
        var ret = [];
        var n = localStorage.length;
        for (var i = 0; i < n; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(Storage.DOC_PREFIX) === 0) {
                ret.push(Storage.docNameFromStorageName(key));
            }
        }
        return ret;
    };
    Storage.saveDoc = function (docName, data) {
        localStorage.setItem(Storage.docNameToStorageName(docName), data);
        return true;
    };
    Storage.openDoc = function (docName) {
        return localStorage.getItem(Storage.docNameToStorageName(docName));
    };
    Storage.removeDoc = function (docName) {
        localStorage.removeItem(Storage.docNameToStorageName(docName));
        return true;
    };
    return Storage;
}());
Storage.DOC_PREFIX = "--doc--";
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map