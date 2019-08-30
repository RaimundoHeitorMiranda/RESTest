"use strict";
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
        // the path of file.
        this.filepath = "./requests.json";
        try {
            this.requisitionsTestFile = JSON.parse(fs_1.readFileSync(this.filepath, "ascii"));
            this.configRequestFile();
        }
        catch (error) {
            throw new Error("not possible read request file config, complete error: " + error);
        }
    }
    File_Reader.prototype.configRequestFile = function () {
        this.verifyRequestTestListFile();
        // this.printFileConfig();
    };
    File_Reader.prototype.verifyRequestTestListFile = function () {
        var _this = this;
        // vefirica se possui requisicoes
        if (this.requisitionsTestFile.requisitionsTestList == undefined || this.requisitionsTestFile.requisitionsTestList == null) {
            throw new Error("The request testes is not defined, please define requestTest in file.");
        }
        else if (this.requisitionsTestFile.requisitionsTestList.length === 0) {
            throw new Error("No tests defined, please create some tests.");
        }
        else {
            this.requisitionsTestFile.requisitionsTestList.forEach(function (requesition) {
                _this.verifyRestTest(requesition);
            });
        }
    };
    File_Reader.prototype.verifyRestTest = function (httpTest) {
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
    File_Reader.prototype.verifiyRequestTest = function (requestTest) {
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
    File_Reader.prototype.convertHttpMethod = function (method) {
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
    File_Reader.prototype.printFileConfig = function () {
        console.log("List of requets for testes:", this.requisitionsTestFile.requisitionsTestList);
        this.requisitionsTestFile.requisitionsTestList.forEach(function (requisition) {
            console.log("Request: ", requisition.requestTest);
            console.log("Response: ", requisition.responseTest);
        });
    };
    File_Reader.prototype.getRequisitionsFile = function () {
        return this.requisitionsTestFile;
    };
    return File_Reader;
}());
exports.default = File_Reader;
