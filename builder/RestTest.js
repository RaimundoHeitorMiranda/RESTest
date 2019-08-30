"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var File_Reader_1 = __importDefault(require("./libs/File_Reader"));
var HttpTest_1 = require("./libs/HttpTest");
// Tratamento de erro, erro para o professor, erro para o aluno
function init() {
    // read files config
    var fr = new File_Reader_1.default();
    // get all resquests to test
    var a = fr.getRequisitionsFile();
    // for each request test, run HttpTest
    a.requisitionsTestList.forEach(function (req) {
        HttpTest_1.HTTP.Test(req);
    });
    // request.get('https://api.postmon.com.br/v1/cep/58400444', (err,response,body) => {
    //     if(!err){
    //         console.log("status: ",response.statusCode);
    //         console.log("reader: ", response.headers);
    //         console.log("response body: ",response.body);
    //         console.log("body: " ,body);
    //     }
    // });
}
init();
