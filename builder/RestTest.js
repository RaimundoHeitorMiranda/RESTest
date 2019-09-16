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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var File_Reader_1 = __importDefault(require("./libs/File_Reader"));
var HttpTest_1 = require("./libs/HttpTest");
// Tratamento de erro, erro para o professor, erro para o aluno
var RestTest = /** @class */ (function () {
    function RestTest() {
    }
    RestTest.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("1-buscar arquivo");
                        return [4 /*yield*/, File_Reader_1.default.loadRequisitionsTests()
                                .then(function (result) {
                                console.log("2-Leu arquivo");
                                _this.testList = result.requisitionsTestList;
                            }, function (error) {
                                console.log("-----------------ERROR: ", error);
                                throw error;
                            })];
                    case 1:
                        _a.sent();
                        console.log("3-Terminou de ler os arquivos");
                        console.log("3- rodar os testes");
                        return [4 /*yield*/, this.runTests(this.testList).then(function (result) {
                                console.log("4 -Terminouuuu!! os testes", result);
                            }, function (error) {
                                console.log("-----------------ERROR: ", error);
                                throw error;
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, setTimeout(function () {
                                console.log(5000, "5 segundos dentro do init");
                            }, 5000)];
                    case 3:
                        _a.sent();
                        console.log(51, "5 ---------------------Deve esperar as promisses para terminar");
                        return [2 /*return*/, this.resultList];
                }
            });
        });
    };
    RestTest.runTests = function (testsList) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var index, element;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("T1- COmecou os testes");
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < testsList.length)) return [3 /*break*/, 4];
                        element = testsList[index];
                        console.log(23, "T2------request: ", element);
                        return [4 /*yield*/, HttpTest_1.HTTP.Test(element)
                                .then(function (result) {
                                console.log(29, "T3-------------result: ", result);
                                _this.resultList.push(result);
                            }, function (error) {
                                console.log("-----------------ERROR: ", error);
                            })];
                    case 2:
                        _a.sent();
                        console.log(38, "T4--------executar depois de cada teste -----------");
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("T5- terminou os testes");
                        resolve(null);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RestTest.resultList = [];
    RestTest.testList = [];
    return RestTest;
}());
exports.RestTest = RestTest;
RestTest.init().then(function (result) {
    console.log(62, "-------------List de resultado", result);
    var show = "";
    result.forEach(function (result) {
        if (result.valid) {
            show = show + ".";
        }
        else if (result.request_error) {
            show = show + "E";
        }
        else if (result.other) {
            show = show + "?";
        }
        else {
            show = show + "F";
        }
    });
    console.log(show);
});
//# sourceMappingURL=RestTest.js.map