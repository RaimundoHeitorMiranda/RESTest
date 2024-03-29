#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_Reader_1 = __importDefault(require("./libs/File_Reader"));
const HttpTest_1 = require("./libs/HttpTest");
// Tratamento de erro, erro para o professor, erro para o aluno
// imprimir primeiro os pontos seguidos dos detalhes -> ok
// headers específicos para cada requisição
// endereço específico para cada requisição
// aceitar o nome de um arquivo como entrada, a priore apenas 1.
class RestTest {
    constructor() {
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield File_Reader_1.default.loadConfig()
                .then(result => {
                this.config = result;
            }, error => {
                console.log("-----------------ERROR: ", error);
                throw error;
            });
            yield File_Reader_1.default.loadRequisitionsTests(process.argv[2])
                .then(result => {
                this.testList = result.requisitionsTestList;
            }, error => {
                console.log("-----------------ERROR: ", error);
                throw error;
            });
            yield this.runTests(this.testList).then(result => {
                result;
            }, error => {
                console.log("-----------------ERROR: ", error);
                throw error;
            });
            return this.resultList;
        });
    }
    static runTests(testsList) {
        let http = new HttpTest_1.HTTP(this.config);
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < testsList.length; index++) {
                const element = testsList[index];
                yield http.Test(element)
                    .then(result => {
                    this.resultList.push(result);
                }, error => {
                    console.log("-----------------ERROR: ", error);
                });
            }
            resolve(null);
        }));
    }
    static detail() {
        return this.config.appConfig.detail;
    }
}
RestTest.resultList = [];
RestTest.testList = [];
exports.RestTest = RestTest;
RestTest.init().then(result => {
    let show = "";
    result.forEach(result => {
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
    setTimeout(() => {
        console.log(show);
        console.log(result);
    }, 10);
});
//# sourceMappingURL=RestTest.js.map