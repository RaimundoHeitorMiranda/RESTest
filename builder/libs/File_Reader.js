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
var fs_1 = require("fs");
var Models_1 = require("./Models");
/**
 * PT_BR: Esta classe tem como objetivo ler o arquivo Json com todos os testes e
 * converter em um objeto de testes do TSTest.
 *
 * ENG: This class aims read json file containing all tests and convert to TSTest object test.
 *  */
var File_Reader = /** @class */ (function () {
    function File_Reader() {
    }
    File_Reader.loadRequisitionsTests = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var requisitionsTestFile;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requisitionsTestFile = new Models_1.RequisitionsTestFile([]);
                        return [4 /*yield*/, fs_1.readFile(this.filepath, "utf-8", function (error, data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, JSON.parse(data)];
                                        case 1:
                                            requisitionsTestFile = _a.sent();
                                            return [4 /*yield*/, this.verifyRequestTestListFile(requisitionsTestFile)];
                                        case 2:
                                            _a.sent();
                                            resolve(requisitionsTestFile);
                                            if (error) {
                                                throw new Error("not possible read request file config, complete error: " + error);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    File_Reader.verifyRequestTestListFile = function (requisitionsTestFile) {
        var _this = this;
        // vefirica se possui requisicoes
        if (requisitionsTestFile.requisitionsTestList == undefined || requisitionsTestFile.requisitionsTestList == null) {
            throw new Error("The request testes is not defined, please define requestTest in file.");
        }
        else if (requisitionsTestFile.requisitionsTestList.length === 0) {
            throw new Error("No tests defined, please create some tests.");
        }
        else {
            requisitionsTestFile.requisitionsTestList.forEach(function (requesition) {
                _this.verifyRestTest(requesition);
            });
        }
    };
    File_Reader.verifyRestTest = function (httpTest) {
        if (httpTest.requestTest == null || httpTest.requestTest == undefined) {
            throw new Error("The request file is wrong!");
        }
        else {
            this.verifiyRequestTest(httpTest.requestTest);
        }
        if (httpTest.responseTest == null || httpTest.responseTest == undefined) {
            throw new Error("The response file is wrong!");
        }
    };
    File_Reader.verifiyRequestTest = function (requestTest) {
        // verifica se possui verbo
        if (requestTest.method == undefined || requestTest.method == null) {
            throw new Error("The request verb is wrong");
        }
        else {
            requestTest.method = this.convertHttpMethod(requestTest.method);
        }
        if (requestTest.path == undefined || requestTest.path == null) {
            throw new Error("The request path is wrong");
        }
    };
    File_Reader.convertHttpMethod = function (method) {
        method = method.toLocaleUpperCase();
        if (method === Models_1.HttpMethod.GET.toLocaleUpperCase()) {
            return Models_1.HttpMethod.GET;
        }
        else if (method === Models_1.HttpMethod.POST.toLocaleUpperCase()) {
            return Models_1.HttpMethod.POST;
        }
        else if (method === Models_1.HttpMethod.DELETE.toLocaleUpperCase()) {
            return Models_1.HttpMethod.DELETE;
        }
        else if (method === Models_1.HttpMethod.PUT.toLocaleUpperCase()) {
            return Models_1.HttpMethod.PUT;
        }
        else {
            throw new Error("Method http undefined");
        }
    };
    File_Reader.printFileConfig = function (requisitionsTestFile) {
        console.log("List of requets for testes:", requisitionsTestFile.requisitionsTestList);
        requisitionsTestFile.requisitionsTestList.forEach(function (requisition) {
            console.log("Request: ", requisition.requestTest);
            console.log("Response: ", requisition.responseTest);
        });
    };
    File_Reader.prototype.getRequisitionsFile = function (requisitionsTestFile) {
        return requisitionsTestFile;
    };
    // the path of file.
    File_Reader.filepath = "./requests.json";
    return File_Reader;
}());
exports.default = File_Reader;
//# sourceMappingURL=File_Reader.js.map