"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparator = /** @class */ (function () {
    function Comparator() {
    }
    // Comapara os status http do test com a resposta real;
    Comparator.httpStatusComparator = function (response, responseTest) {
        return response.statusCode == responseTest.httpStatus;
    };
    Comparator.bodyComparator = function (response, responseTest) {
        return response.body == responseTest.body;
    };
    return Comparator;
}());
exports.Comparator = Comparator;
