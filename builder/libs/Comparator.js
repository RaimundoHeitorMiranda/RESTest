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
        result2 = this.JsonComparator(response, responseTest, result2);
        setTimeout(function () {
            console.log(result2);
        }, 10);
    };
    // recebe um obj jsonTest e JsonResponse
    Comparator.prototype.JsonComparator = function (response, responseTest, errorResult) {
        var _this = this;
        if (errorResult == null || errorResult == undefined) {
            errorResult = new Models_1.Result([], [], []);
        }
        // Arryas to save missing and over attributes.
        var attMissing = [];
        var attOver = [];
        // get attribute keys of response and tests
        var responseValues = Object.keys(response);
        var responseTestValues = Object.keys(responseTest);
        // sorting
        responseValues.sort(this.sortFunction);
        responseTestValues.sort(this.sortFunction);
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
                // // compara se os valores são iguais
                if (responseTest[key] instanceof Array) {
                    errorResult = _this.comparateArrays(responseTest[key], response[key], errorResult);
                    console.log("array:", errorResult);
                }
                else if (responseTest[key] instanceof Object) {
                    errorResult = _this.JsonComparator(response[key], responseTest[key], errorResult);
                }
                else {
                    if (responseTest[key] !== response[key]) {
                        // adicionar o formato do dado
                        errorResult.valuesDiff.push("Attribute " + key.toLocaleUpperCase() + " have diferent values:" + "<" + response[key] + ">" + " is diferent of " + "<" + responseTest[key] + ">(expected)");
                    }
                }
            }
            else {
                attMissing.push(key);
            }
        });
        errorResult.attributeMissing = errorResult.attributeMissing.concat(attMissing);
        errorResult.attributeExtra = errorResult.attributeExtra.concat(attOver);
        // se não adiciona o nome do atributo que falta ou excede ao error e mostra o valor esperado
        // seta a flag de aprovação para false
        // compara o valor dos atributos
        // se o atributo for um obj, salva numa lista semporaria
        // se forem iguais ok
        // se não adiciona o nome e valor do atributo que falta ou excede ao error e mostra o valor esperado
        // seta a flag de aprovação para false
        // repete o processo para os atributos que estiverem nos dois
        return errorResult;
    };
    Comparator.prototype.sortFunction = function (a, b) {
        var A = a.toLocaleLowerCase();
        var B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    };
    Comparator.prototype.comparateArrays = function (array1, array2, errorResult) {
        array1 == array2;
        return errorResult;
    };
    return Comparator;
}());
exports.Comparator = Comparator;
//# sourceMappingURL=Comparator.js.map