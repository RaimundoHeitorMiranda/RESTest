"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Classe para abstração do arquivo de testes.
 *  Class to abstract file testes.
 */
class RequisitionsTestFile {
    constructor(requisitionsTestList) {
        this.requisitionsTestList = requisitionsTestList;
    }
}
exports.RequisitionsTestFile = RequisitionsTestFile;
/* Classe para definição de um teste.
 * Class to definition of test.
 */
class HttpTest {
    constructor(requestTest, responseTest) {
        this.requestTest = requestTest;
        this.responseTest = responseTest;
    }
}
exports.HttpTest = HttpTest;
/** A requisição do teste.
 *  A teste requisition class.
 */
class RequestTest {
    constructor(method, path, body, responseBody) {
        this.method = method;
        this.path = path;
        this.content = body;
        this.responseBody = responseBody;
    }
}
exports.RequestTest = RequestTest;
/** A resposta da requisição.
 *  A response of requisition.
 */
class ResponseTest {
    constructor() {
    }
}
exports.ResponseTest = ResponseTest;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["POST"] = "POST";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
class IdMapper {
    constructor(idFake, idReal) {
        this.idFake = idFake;
        this.idReal = idReal;
    }
}
exports.IdMapper = IdMapper;
class IdManagement {
    constructor() {
    }
    static exists(idFake) {
        for (let index = 0; index < this.ids.length; index++) {
            const IdMapper = this.ids[index];
            if (idFake === IdMapper.idFake) {
                return true;
            }
            if (index === this.ids.length - 1) {
                return false;
            }
        }
    }
    static get(idFake) {
        for (let index = 0; index < this.ids.length; index++) {
            const IdMapper = this.ids[index];
            if (idFake === IdMapper.idFake) {
                return IdMapper.idReal;
            }
        }
    }
    static push(idMapper) {
        this.ids.push(idMapper);
    }
}
IdManagement.ids = [];
exports.IdManagement = IdManagement;
/** A classe que representa o resultado de um teste.
 * The class that represents a result of test.
 */
class Result {
    constructor() {
        this.valid = true;
        this.attributeExtra = [];
        this.attributeMissing = [];
        this.valuesDiff = [];
        this.request_verb_path = '';
        this.attributeExtra = [];
        this.attributeMissing = [];
        this.valuesDiff = [];
    }
}
exports.Result = Result;
//# sourceMappingURL=Models.js.map