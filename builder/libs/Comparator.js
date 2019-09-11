"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Models_1 = require("./Models");
var Comparator = /** @class */ (function () {
    function Comparator() {
    }
    // Comapara os status http do test com a resposta real;
    Comparator.httpStatusComparator = function (response, responseTest) {
        return response.statusCode == responseTest.httpStatus;
    };
    Comparator.prototype.BodyComparator = function (response, responseTest) {
        var result2 = new Models_1.Result([], [], []);
        this.JsonComparator(response, responseTest, result2)
            .then(function (result) {
            console.log(result);
        });
    };
    // recebe um obj jsonTest e JsonResponse
    Comparator.prototype.JsonComparator = function (response, responseTest, errorResult, ownerPropertyName) {
        var _this = this;
        return new Promise(function (resolve) {
            if (errorResult == null || errorResult == undefined) {
                errorResult = new Models_1.Result([], [], []);
            }
            if (ownerPropertyName == null || ownerPropertyName == undefined) {
                ownerPropertyName = "";
            }
            // Arryas to save missing and over attributes.
            var attMissing = [];
            var attOver = [];
            // get attribute keys of response and tests
            var responseValues = Object.keys(response);
            var responseTestValues = Object.keys(responseTest);
            // sorting
            responseValues.sort(_this.sortFunction);
            responseTestValues.sort(_this.sortFunction);
            // TODO fast test.
            // se os os tamanhos da lista forem diferentes -> false;
            // Verifica se existe atributo sobrando.
            // verify if as attribute over.
            responseValues.forEach(function (key) {
                if (responseTestValues.lastIndexOf(key) == -1) {
                    attOver.push(key);
                }
            });
            // verifica se existem atributos faltando.
            // verify if exists attribute missing.
            responseTestValues.forEach(function (key) {
                // se existe/ if exists
                if (responseValues.lastIndexOf(key) != -1) {
                    // verifica se é um array
                    if (responseTest[key] instanceof Array) {
                        _this.comparateArrays(responseTest[key], response[key], errorResult, ownerPropertyName + "." + key)
                            .then(function (result) {
                            errorResult = result;
                        });
                        // Verifica se é um objeto
                    }
                    else if (responseTest[key] instanceof Object) {
                        _this.JsonComparator(response[key], responseTest[key], errorResult, ownerPropertyName + "." + key)
                            .then(function (result) {
                            errorResult = result;
                        });
                    }
                    else {
                        // veririca dados primários
                        if (responseTest[key] !== response[key]) {
                            errorResult.valuesDiff.push("Attribute Value Diff: " + ownerPropertyName + "." + key.toLocaleUpperCase() + " have diferent values:" + "<" + response[key] + ">" + " is diferent of " + "<" + responseTest[key] + ">(expected)");
                        }
                    }
                }
                else {
                    attMissing.push(key);
                }
            });
            errorResult.attributeMissing = errorResult.attributeMissing.concat(attMissing);
            errorResult.attributeExtra = errorResult.attributeExtra.concat(attOver);
            setTimeout(function () {
                resolve(errorResult);
            }, 1000);
        });
    };
    Comparator.prototype.sortFunction = function (a, b) {
        var A = a.toLocaleLowerCase();
        var B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    };
    Comparator.prototype.comparateArrays = function (array1, array2, errorResult, ownerPropertyName) {
        var _this = this;
        return new Promise(function (resolve) {
            if (array1.length !== array2.length) {
                errorResult.valuesDiff.push("Array: " + ownerPropertyName + " have diferent lenght: " + array2.length + " is diferent of " + array1.length + "(expected)");
                resolve(errorResult);
            }
            else {
                for (var index = 0; index < array1.length; index++) {
                    if (typeof array1[index] !== typeof array2[index]) {
                        errorResult.valuesDiff.push("Array Value Type: " + ownerPropertyName + "[" + index + "]" + " have diferent types: <" + array1[index] + " is " + typeof array1[index] + "> is diferent of <" + array2[index] + " is " + typeof array2[index] + " (expected)>");
                    }
                    else {
                        if (array1[index] instanceof Array) {
                            _this.comparateArrays(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(function (result) {
                                console.log("log recursivo", result);
                                errorResult = result;
                            });
                        }
                        else if (array1[index] instanceof Object) {
                            _this.JsonComparator(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(function (result) {
                                errorResult = result;
                            });
                        }
                        else {
                            if (array1[index] !== array2[index]) {
                                errorResult.valuesDiff.push("Array Value Diff: " + ownerPropertyName + "[" + index + "]" + " have diferent values: <" + array1[index] + "> is diferent of <" + array2[index] + ">(expected)");
                            }
                        }
                    }
                }
                resolve(errorResult);
            }
        });
    };
    return Comparator;
}());
exports.Comparator = Comparator;
//# sourceMappingURL=Comparator.js.map