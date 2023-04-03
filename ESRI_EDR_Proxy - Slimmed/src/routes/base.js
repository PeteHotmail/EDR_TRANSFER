"use strict";
exports.__esModule = true;
var RouteBase = /** @class */ (function () {
    function RouteBase() {
    }
    /**
     * validates that the input has the required keys
     * returns false if key is not in object.
     * @param input
     * @param params
     */
    RouteBase.prototype.isValidQuery = function (input, requiredParams) {
        var keys = [];
        var valid = false;
        var response = { valid: valid, keys: keys };
        // look over input and push any keys which are missing
        // to an array. 
        for (var _i = 0, requiredParams_1 = requiredParams; _i < requiredParams_1.length; _i++) {
            var param = requiredParams_1[_i];
            if (!(param in input)) {
                keys.push(param);
            }
        }
        // if there are no missing keys return "isValid" = true
        if (keys.length <= 0) {
            response.valid = true;
        }
        else {
            throw (new Error("Missing required parameters - " + response.keys));
        }
    };
    return RouteBase;
}());
exports["default"] = RouteBase;
