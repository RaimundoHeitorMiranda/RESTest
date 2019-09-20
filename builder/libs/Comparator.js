"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("./Models");
class Comparator {
    constructor() {
    }
    // Comapara os status http do test com a resposta real;
    httpStatusComparator(response, responseTest) {
        return response.statusCode == responseTest.httpStatus;
    }
    BodyComparator(response, responseTest, result) {
        return new Promise(resolve => {
            this.JsonComparator(response, responseTest, result)
                .then(result => {
                resolve(result);
            });
        });
    }
    // recebe um obj jsonTest e JsonResponse
    JsonComparator(response, responseTest, errorResult, ownerPropertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (errorResult == null || errorResult == undefined) {
                errorResult = new Models_1.Result();
            }
            if (ownerPropertyName == null || ownerPropertyName == undefined) {
                ownerPropertyName = "";
            }
            // get attribute keys of response and tests
            // console.log(38,"response    ",response);
            // console.log(39,"responseTest",responseTest);
            let responseValues = yield Object.keys(response);
            let responseTestValues = yield Object.keys(responseTest);
            // sorting
            yield responseValues.sort(this.sortFunction);
            yield responseTestValues.sort(this.sortFunction);
            // TODO fast test.
            // se os os tamanhos da lista forem diferentes -> false;
            // Verifica se existe atributo sobrando.
            // verify if as attribute over.
            yield responseValues.forEach(key => {
                if (responseTestValues.lastIndexOf(key) == -1) {
                    errorResult.attributeExtra.push(key);
                    errorResult.valid = false;
                }
            });
            // verifica se existem atributos faltando.
            // verify if exists attribute missing.
            for (let index = 0; index < responseTestValues.length; index++) {
                let key = responseTestValues[index];
                // se existe/ if exists
                if (responseValues.lastIndexOf(key) != -1) {
                    // verifica se é um array
                    if (responseTest[key] instanceof Array) {
                        yield this.comparateArrays(responseTest[key], response[key], errorResult, ownerPropertyName + "." + key)
                            .then(result => {
                            errorResult = result;
                        });
                        // Verifica se é um objeto
                    }
                    else if (responseTest[key] instanceof Object) {
                        yield this.JsonComparator(response[key], responseTest[key], errorResult, ownerPropertyName + "." + key)
                            .then((result) => __awaiter(this, void 0, void 0, function* () {
                            errorResult = yield result;
                        }));
                    }
                    else {
                        // veririca dados primários
                        if (responseTest[key] !== response[key]) {
                            errorResult.valid = false;
                            yield errorResult.valuesDiff.push("Attribute Value Diff: " + ownerPropertyName + "." + key.toLocaleUpperCase() + " have diferent values:" + "<" + response[key] + ">" + " is diferent of " + "<" + responseTest[key] + ">(expected)");
                        }
                    }
                }
                else {
                    errorResult.attributeMissing.push(key);
                    errorResult.valid = false;
                }
            }
            return errorResult;
        });
    }
    sortFunction(a, b) {
        let A = a.toLocaleLowerCase();
        let B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    }
    comparateArrays(array1, array2, errorResult, ownerPropertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (array1.length !== array2.length) {
                errorResult.valid = false;
                yield errorResult.valuesDiff.push("Array: " + ownerPropertyName + " have diferent lenght: " + array2.length + " is diferent of " + array1.length + "(expected)");
                return errorResult;
            }
            else {
                for (let index = 0; index < array1.length; index++) {
                    if (typeof array1[index] !== typeof array2[index]) {
                        errorResult.valid = false;
                        yield errorResult.valuesDiff.push("Array Value Type: " + ownerPropertyName + "[" + index + "]" + " have diferent types: <" + array1[index] + " is " + typeof array1[index] + "> is diferent of <" + array2[index] + " is " + typeof array2[index] + " (expected)>");
                    }
                    else {
                        if (array1[index] instanceof Array) {
                            yield this.comparateArrays(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(result => {
                                errorResult = result;
                            });
                        }
                        else if (array1[index] instanceof Object) {
                            yield this.JsonComparator(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(result => {
                                errorResult = result;
                            });
                        }
                        else {
                            if (array1[index] !== array2[index]) {
                                errorResult.valid = false;
                                yield errorResult.valuesDiff.push("Array Value Diff: " + ownerPropertyName + "[" + index + "]" + " have diferent values: <" + array1[index] + "> is diferent of <" + array2[index] + ">(expected)");
                            }
                        }
                    }
                }
                return errorResult;
            }
        });
    }
}
exports.Comparator = Comparator;
//# sourceMappingURL=Comparator.js.map