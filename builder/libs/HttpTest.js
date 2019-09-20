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
const request = require("request");
const Models_1 = require("./Models");
const Comparator_1 = require("./Comparator");
class HTTP {
    constructor(config) {
        this.config = config;
    }
    Test(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const url = this.config.requestConfig.server + ":" + this.config.requestConfig.port + req.requestTest.path;
                // GET
                if (req.requestTest.method === Models_1.HttpMethod.GET) {
                    request.get(url, (error, response) => __awaiter(this, void 0, void 0, function* () {
                        yield this.verifyTest(response, error, req)
                            .then(result => {
                            resolve(result);
                        });
                    }));
                    // POST
                }
                else if (req.requestTest.method === Models_1.HttpMethod.POST) {
                    // let data = req.requestTest.body;
                    request.post(url, {
                        headers: { 'content-type': 'application/json' },
                        body: req.requestTest.content,
                        json: true
                    }, (error, response) => __awaiter(this, void 0, void 0, function* () {
                        yield this.verifyTest(response, error, req)
                            .then(result => {
                            resolve(result);
                        });
                    }));
                    // PUT
                }
                else if (req.requestTest.method === Models_1.HttpMethod.PUT) {
                    request.put(url, {
                        headers: { 'content-type': 'application/json' },
                        body: req.requestTest.content,
                        json: true
                    }, (error, response) => __awaiter(this, void 0, void 0, function* () {
                        yield this.verifyTest(response, error, req)
                            .then(result => {
                            resolve(result);
                        });
                    }));
                }
                else if (req.requestTest.method === Models_1.HttpMethod.DELETE) {
                    request.delete(url, (error, response) => __awaiter(this, void 0, void 0, function* () {
                        yield this.verifyTest(response, error, req)
                            .then(result => {
                            resolve(result);
                        });
                    }));
                }
                else {
                    reject("Deu erro");
                }
            });
        });
    }
    verifyTest(responseClient, error, request) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // Result of testes
            let resultCheck = new Models_1.Result();
            // comparator..
            let comparator = new Comparator_1.Comparator();
            resultCheck.request_verb_path = `${request.requestTest.method} in ${request.requestTest.path}`;
            //  Http status check 
            if (comparator.httpStatusComparator(responseClient, request.responseTest)) {
                resultCheck.status_ok = true;
            }
            else {
                resultCheck.status_ok = false;
                resultCheck.valid = false;
                resultCheck.status_diff = `Expected ${request.responseTest.httpStatus} but was ${responseClient.statusCode}`;
            }
            // Body check
            if (!error) {
                // let detalhe = true;
                if (typeof responseClient.body === 'string') {
                    responseClient.body = JSON.parse(responseClient.body);
                }
                if (request.responseTest.body !== undefined && request.responseTest.body !== null) {
                    comparator.BodyComparator(responseClient.body, request.responseTest.body, resultCheck)
                        .then(result => {
                        if (result.attributeExtra.length > 0 || result.attributeMissing.length > 0 || result.valuesDiff.length > 0) {
                            resultCheck.valid = false;
                        }
                        resolve(result);
                    });
                }
                else {
                    resultCheck.body_ok = true;
                    resolve(resultCheck);
                }
            }
            else {
                resultCheck.request_error = "Request error:" + error;
                resultCheck.valid = false;
                resolve(resultCheck);
            }
        }));
    }
}
exports.HTTP = HTTP;
//# sourceMappingURL=HttpTest.js.map