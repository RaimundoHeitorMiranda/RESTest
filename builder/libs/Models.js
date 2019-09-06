"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequisitionsTestFile = /** @class */ (function () {
    function RequisitionsTestFile(requisitionsTestList) {
        this.requisitionsTestList = requisitionsTestList;
    }
    return RequisitionsTestFile;
}());
exports.RequisitionsTestFile = RequisitionsTestFile;
var HttpTest = /** @class */ (function () {
    function HttpTest(requestTest, responseTest) {
        this.requestTest = requestTest;
        this.responseTest = responseTest;
    }
    return HttpTest;
}());
exports.HttpTest = HttpTest;
var RequestTest = /** @class */ (function () {
    // header: any;
    function RequestTest(method, path, body, responseBody) {
        this.method = method;
        this.path = path;
        this.body = body;
        this.responseBody = responseBody;
    }
    return RequestTest;
}());
exports.RequestTest = RequestTest;
var ResponseTest = /** @class */ (function () {
    function ResponseTest() {
    }
    return ResponseTest;
}());
exports.ResponseTest = ResponseTest;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["POST"] = "POST";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var Result = /** @class */ (function () {
    function Result(attributeExtra, attributeMissing, valuesDiff) {
        this.attributeExtra = [];
        this.attributeMissing = [];
        this.valuesDiff = [];
        this.attributeExtra = attributeExtra;
        this.attributeMissing = attributeMissing;
        this.valuesDiff = valuesDiff;
    }
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=Models.js.map