"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var Models_1 = require("./Models");
var Comparator_1 = require("./Comparator");
var HTTP = /** @class */ (function () {
    function HTTP() {
    }
    HTTP.Test = function (req) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(13, "HTTPTEST:", req);
            // GET
            if (req.requestTest.method === Models_1.HttpMethod.GET) {
                request.get(req.requestTest.path, function (error, response) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.verifyTest(response, error, req)
                                    .then(function (result) {
                                    resolve(result);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // POST
            }
            else if (req.requestTest.method === Models_1.HttpMethod.POST) {
                // let data = req.requestTest.body;
                request.post(req.requestTest.path, {
                    headers: { 'content-type': 'application/json' },
                    body: req.requestTest.body,
                    json: true
                }, function (error, response) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.verifyTest(response, error, req)
                                    .then(function (result) {
                                    resolve(result);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // PUT
            }
            else if (req.requestTest.method === Models_1.HttpMethod.PUT) {
                request.put(req.requestTest.path, {
                    headers: { 'content-type': 'application/json' },
                    body: req.requestTest.body,
                    json: true
                }, function (error, response) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.verifyTest(response, error, req)
                                    .then(function (result) {
                                    resolve(result);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else if (req.requestTest.method === Models_1.HttpMethod.DELETE) {
                request.delete(req.requestTest.path, function (error, response) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.verifyTest(response, error, req)
                                    .then(function (result) {
                                    resolve(result);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                reject("Deu erro");
            }
        });
    };
    HTTP.verifyTest = function (responseClient, error, request) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var resultCheck, comparator;
            return __generator(this, function (_a) {
                console.log(55, "Y1-VIRIFY", error);
                resultCheck = new Models_1.Result();
                comparator = new Comparator_1.Comparator();
                resultCheck.request_verb_path = request.requestTest.method + " in " + request.requestTest.path;
                //  Http status check 
                if (comparator.httpStatusComparator(responseClient, request.responseTest)) {
                    resultCheck.status_ok = true;
                }
                else {
                    resultCheck.status_ok = false;
                    resultCheck.valid = false;
                    resultCheck.status_diff = "Expected " + request.responseTest.httpStatus + " but was " + responseClient.statusCode;
                }
                // Body check
                if (!error) {
                    console.log(56, responseClient.body);
                    // let detalhe = true;
                    if (typeof responseClient.body === 'string') {
                        responseClient.body = JSON.parse(responseClient.body);
                    }
                    console.log(57, responseClient.body);
                    console.log(58, request.responseTest.body);
                    if (request.responseTest.body !== undefined && request.responseTest.body !== null) {
                        comparator.BodyComparator(responseClient.body, request.responseTest.body, resultCheck)
                            .then(function (result) {
                            // if(detalhe){
                            //     console.log("status: ",responseClient.statusCode, responseTest.httpStatus);
                            //     console.log("Status confere?:", Comparator.httpStatusComparator(responseClient,responseTest));
                            //     console.log("Body: ",result);
                            //     console.log("Resultado:",result.valid);
                            // } else {
                            //     console.log(result.valid);
                            // }
                            console.log(77, "Y2- terminou a verificacao");
                            if (result.attributeExtra.length > 0 || result.attributeMissing.length > 0 || result.valuesDiff.length > 0) {
                                resultCheck.valid = false;
                            }
                            resolve(result);
                        });
                    }
                    else {
                        console.log(77, "Y2-error na requisicao");
                        resultCheck.body_ok = true;
                        resolve(resultCheck);
                    }
                }
                else {
                    resultCheck.request_error = "Request error:" + error;
                    resultCheck.valid = false;
                    console.log("Error na requisição:" + error + " - " + responseClient);
                    resolve(resultCheck);
                }
                return [2 /*return*/];
            });
        }); });
    };
    return HTTP;
}());
exports.HTTP = HTTP;
//# sourceMappingURL=HttpTest.js.map