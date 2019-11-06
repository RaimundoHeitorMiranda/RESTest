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
const util_1 = require("util");
class HTTP {
    constructor(config) {
        this.headerObj = {};
        this.config = config;
        this.headerObj['content-type'] = 'application/json';
        if (this.config.securityConfig.token) {
            this.headerObj[this.config.securityConfig.headerKey] = this.config.securityConfig.token;
        }
        for (const att in this.config.requestConfig.headers) {
            this.headerObj[att] = this.config.requestConfig.headers[att];
        }
    }
    Test(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(util_1.isString(this.headerObj[this.config.securityConfig.headerKey]))) {
                yield this.getToken()
                    .then(result => {
                    this.headerObj[this.config.securityConfig.headerKey] = result;
                });
            }
            return new Promise((resolve, reject) => {
                const url = this.config.requestConfig.server + ":" + this.config.requestConfig.port + req.requestTest.path;
                // GET
                if (req.requestTest.method === Models_1.HttpMethod.GET) {
                    request.get(url, {
                        headers: this.headerObj,
                        json: true
                    }, (error, response) => __awaiter(this, void 0, void 0, function* () {
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
                        headers: this.headerObj,
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
                        headers: this.headerObj,
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
                    request.delete(url, {
                        headers: this.headerObj,
                        json: true
                    }, (error, response) => __awaiter(this, void 0, void 0, function* () {
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
    getToken() {
        const url = this.config.requestConfig.server + ":" + this.config.requestConfig.port + this.config.securityConfig.pathLogin;
        return new Promise((resolve, reject) => {
            request.post(url, {
                headers: this.headerObj,
                body: this.config.securityConfig.login,
                json: true
            }, (error, response) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    reject(error);
                }
                resolve(String(response.body.data.token));
            }));
        });
    }
}
exports.HTTP = HTTP;
//# sourceMappingURL=HttpTest.js.map