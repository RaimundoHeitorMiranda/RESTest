import  File_Reader from './libs/File_Reader';
import { RequisitionsTestFile } from './libs/Models';
import { HTTP } from './libs/HttpTest';
// Tratamento de erro, erro para o professor, erro para o aluno

function init(){

    // read files config
    var fr = new File_Reader();

    // get all resquests to test
    var a: RequisitionsTestFile = fr.getRequisitionsFile();
    
    // for each request test, run HttpTest
    a.requisitionsTestList.forEach(req => {
        HTTP.Test(req);        
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
