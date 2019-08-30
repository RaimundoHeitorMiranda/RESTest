"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var Models_1 = require("./Models");
var Comparator_1 = require("./Comparator");
var HTTP = /** @class */ (function () {
    function HTTP() {
    }
    // private options: CoreOptions = {
    //     "encoding" : "ascii"
    // }
    HTTP.Test = function (req) {
        if (req.requestTest.method = Models_1.HttpMethod.GET) {
            this.GET(req);
        }
        else if (req.requestTest.method = Models_1.HttpMethod.POST) {
            this.POST(req);
        }
        else if (req.requestTest.method = Models_1.HttpMethod.PUT) {
            this.PUT(req);
        }
        else if (req.requestTest.method = Models_1.HttpMethod.DELETE) {
            this.DELETE(req);
        }
    };
    HTTP.GET = function (req) {
        var _this = this;
        request.get(req.requestTest.path, function (error, response) {
            _this.verifyTest(req, error, response);
        });
    };
    HTTP.POST = function (req) {
        request.post(req.requestTest.path, req.requestTest.body, function (error, response) {
            if (!error) {
                console.log("status: ", response.statusCode, req.responseTest.httpStatus);
                console.log("Status confere?:", Comparator_1.Comparator.httpStatusComparator(response, req.responseTest));
                console.log("Body: ", response.body, "BodyTest: ", req.responseTest.body);
                console.log("Body Confere?: ", Comparator_1.Comparator.bodyComparator(response, req.responseTest));
            }
            else {
                console.log("Error na requisição:" + req.requestTest.method + " - " + req.requestTest.path);
            }
        });
    };
    HTTP.PUT = function (req) {
        request.post(req.requestTest.path, req.requestTest.body, function (error, response) {
            if (!error) {
                console.log("status: ", response.statusCode, req.responseTest.httpStatus);
                console.log("Status confere?:", Comparator_1.Comparator.httpStatusComparator(response, req.responseTest));
                console.log("Body: ", response.body, "BodyTest: ", req.responseTest.body);
                console.log("Body Confere?: ", Comparator_1.Comparator.bodyComparator(response, req.responseTest));
            }
            else {
                console.log("Error na requisição:" + req.requestTest.method + " - " + req.requestTest.path);
            }
        });
    };
    HTTP.DELETE = function (req) {
        var _this = this;
        request.post(req.requestTest.path, req.requestTest.body, function (error, response) {
            _this.verifyTest(req, error, response);
        });
    };
    HTTP.verifyTest = function (req, error, response) {
        if (!error) {
            console.log("status: ", response.statusCode, req.responseTest.httpStatus);
            console.log("Status confere?:", Comparator_1.Comparator.httpStatusComparator(response, req.responseTest));
            console.log("Body: ", response.body, "BodyTest: ", req.responseTest.body);
            console.log("Body Confere?: ", Comparator_1.Comparator.bodyComparator(response, req.responseTest));
        }
        else {
            console.log("Error na requisição:" + req.requestTest.method + " - " + req.requestTest.path);
        }
    };
    return HTTP;
}());
exports.HTTP = HTTP;
