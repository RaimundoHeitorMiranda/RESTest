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
var Models_1 = require("./Models");
var Comparator = /** @class */ (function () {
    function Comparator() {
    }
    // Comapara os status http do test com a resposta real;
    Comparator.prototype.httpStatusComparator = function (response, responseTest) {
        return response.statusCode == responseTest.httpStatus;
    };
    Comparator.prototype.BodyComparator = function (response, responseTest, result) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.JsonComparator(response, responseTest, result)
                .then(function (result) {
                resolve(result);
            });
        });
    };
    // recebe um obj jsonTest e JsonResponse
    Comparator.prototype.JsonComparator = function (response, responseTest, errorResult, ownerPropertyName) {
        return __awaiter(this, void 0, void 0, function () {
            var responseValues, responseTestValues, index, key;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (errorResult == null || errorResult == undefined) {
                            errorResult = new Models_1.Result();
                        }
                        if (ownerPropertyName == null || ownerPropertyName == undefined) {
                            ownerPropertyName = "";
                        }
                        return [4 /*yield*/, Object.keys(response)];
                    case 1:
                        responseValues = _a.sent();
                        return [4 /*yield*/, Object.keys(responseTest)];
                    case 2:
                        responseTestValues = _a.sent();
                        // sorting
                        return [4 /*yield*/, responseValues.sort(this.sortFunction)];
                    case 3:
                        // sorting
                        _a.sent();
                        return [4 /*yield*/, responseTestValues.sort(this.sortFunction)];
                    case 4:
                        _a.sent();
                        // TODO fast test.
                        // se os os tamanhos da lista forem diferentes -> false;
                        // Verifica se existe atributo sobrando.
                        // verify if as attribute over.
                        return [4 /*yield*/, responseValues.forEach(function (key) {
                                if (responseTestValues.lastIndexOf(key) == -1) {
                                    errorResult.attributeExtra.push(key);
                                    errorResult.valid = false;
                                }
                            })
                            // verifica se existem atributos faltando.
                            // verify if exists attribute missing.
                        ];
                    case 5:
                        // TODO fast test.
                        // se os os tamanhos da lista forem diferentes -> false;
                        // Verifica se existe atributo sobrando.
                        // verify if as attribute over.
                        _a.sent();
                        index = 0;
                        _a.label = 6;
                    case 6:
                        if (!(index < responseTestValues.length)) return [3 /*break*/, 15];
                        key = responseTestValues[index];
                        if (!(responseValues.lastIndexOf(key) != -1)) return [3 /*break*/, 13];
                        if (!(responseTest[key] instanceof Array)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.comparateArrays(responseTest[key], response[key], errorResult, ownerPropertyName + "." + key)
                                .then(function (result) {
                                errorResult = result;
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 8:
                        if (!(responseTest[key] instanceof Object)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.JsonComparator(response[key], responseTest[key], errorResult, ownerPropertyName + "." + key)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, result];
                                        case 1:
                                            errorResult = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        if (!(responseTest[key] !== response[key])) return [3 /*break*/, 12];
                        errorResult.valid = false;
                        return [4 /*yield*/, errorResult.valuesDiff.push("Attribute Value Diff: " + ownerPropertyName + "." + key.toLocaleUpperCase() + " have diferent values:" + "<" + response[key] + ">" + " is diferent of " + "<" + responseTest[key] + ">(expected)")];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        errorResult.attributeMissing.push(key);
                        errorResult.valid = false;
                        _a.label = 14;
                    case 14:
                        index++;
                        return [3 /*break*/, 6];
                    case 15: return [2 /*return*/, errorResult];
                }
            });
        });
    };
    Comparator.prototype.sortFunction = function (a, b) {
        var A = a.toLocaleLowerCase();
        var B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    };
    Comparator.prototype.comparateArrays = function (array1, array2, errorResult, ownerPropertyName) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(array1.length !== array2.length)) return [3 /*break*/, 2];
                        errorResult.valid = false;
                        return [4 /*yield*/, errorResult.valuesDiff.push("Array: " + ownerPropertyName + " have diferent lenght: " + array2.length + " is diferent of " + array1.length + "(expected)")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, errorResult];
                    case 2:
                        index = 0;
                        _a.label = 3;
                    case 3:
                        if (!(index < array1.length)) return [3 /*break*/, 12];
                        if (!(typeof array1[index] !== typeof array2[index])) return [3 /*break*/, 5];
                        errorResult.valid = false;
                        return [4 /*yield*/, errorResult.valuesDiff.push("Array Value Type: " + ownerPropertyName + "[" + index + "]" + " have diferent types: <" + array1[index] + " is " + typeof array1[index] + "> is diferent of <" + array2[index] + " is " + typeof array2[index] + " (expected)>")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 5:
                        if (!(array1[index] instanceof Array)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.comparateArrays(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(function (result) {
                                errorResult = result;
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(array1[index] instanceof Object)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.JsonComparator(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(function (result) {
                                errorResult = result;
                            })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        if (!(array1[index] !== array2[index])) return [3 /*break*/, 11];
                        errorResult.valid = false;
                        return [4 /*yield*/, errorResult.valuesDiff.push("Array Value Diff: " + ownerPropertyName + "[" + index + "]" + " have diferent values: <" + array1[index] + "> is diferent of <" + array2[index] + ">(expected)")];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        index++;
                        return [3 /*break*/, 3];
                    case 12: return [2 /*return*/, errorResult];
                }
            });
        });
    };
    return Comparator;
}());
exports.Comparator = Comparator;
//# sourceMappingURL=Comparator.js.map