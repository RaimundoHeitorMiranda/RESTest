"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Models_1 = require("./Models");
/**
 * PT_BR: Esta classe tem como objetivo ler o arquivo Json com todos os testes e
 * converter em um objeto de testes do TSTest.
 *
 * ENG: This class aims read json file containing all tests and convert to TSTest object test,
 * and read config file too.
 *  */
class File_Reader {
    constructor() {
    }
    // This method read file testes, verify and convert to tests objctes.
    static loadRequisitionsTests() {
        return new Promise((resolve, reject) => {
            let requisitionsTestFile = new Models_1.RequisitionsTestFile([]);
            fs_1.readFile(this.fileTestPath, "utf-8", (error, data) => {
                requisitionsTestFile = JSON.parse(data);
                this.verifyRequestTestListFile(requisitionsTestFile);
                resolve(requisitionsTestFile);
                if (error) {
                    reject(new Error("not possible read request file config, complete error: " + error));
                }
            });
        });
    }
    // This method read config file and convert to config object
    static loadConfig() {
        return new Promise((resolve, reject) => {
            let config;
            fs_1.readFile(this.fileConfigPath, "utf-8", (error, data) => {
                if (error) {
                    reject(new Error("not possible read config file config, complete error: " + error));
                }
                else {
                    config = JSON.parse(data);
                    resolve(config);
                }
            });
        });
    }
    static verifyRequestTestListFile(requisitionsTestFile) {
        // vefirica se possui requisicoes
        if (requisitionsTestFile.requisitionsTestList == undefined || requisitionsTestFile.requisitionsTestList == null) {
            throw new Error("The request testes is not defined, please define requestTest in file.");
        }
        else if (requisitionsTestFile.requisitionsTestList.length === 0) {
            throw new Error("No tests defined, please create some tests.");
        }
        else {
            requisitionsTestFile.requisitionsTestList.forEach(requesition => {
                this.verifyRestTest(requesition);
            });
        }
    }
    static verifyRestTest(httpTest) {
        if (httpTest.requestTest == null || httpTest.requestTest == undefined) {
            throw new Error("The request file is wrong!");
        }
        else {
            this.verifiyRequestTest(httpTest.requestTest);
        }
        if (httpTest.responseTest == null || httpTest.responseTest == undefined) {
            throw new Error("The response file is wrong!");
        }
    }
    static verifiyRequestTest(requestTest) {
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
    }
    static convertHttpMethod(method) {
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
    }
    static printFileConfig(requisitionsTestFile) {
        console.log("List of requets for testes:", requisitionsTestFile.requisitionsTestList);
        requisitionsTestFile.requisitionsTestList.forEach(requisition => {
            console.log("Request: ", requisition.requestTest);
            console.log("Response: ", requisition.responseTest);
        });
    }
    getRequisitionsFile(requisitionsTestFile) {
        return requisitionsTestFile;
    }
}
// the path of files.
File_Reader.fileTestPath = `./requests.json`;
File_Reader.fileConfigPath = `./config.json`;
exports.default = File_Reader;
//# sourceMappingURL=File_Reader.js.map