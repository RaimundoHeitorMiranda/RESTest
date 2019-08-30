import { readFileSync } from 'fs';
import { RequisitionsTestFile, HttpMethod, HttpTest, RequestTest } from './Models';


/**
 * PT_BR: Esta classe tem como objetivo ler o arquivo Json com todos os testes e
 * converter em um objeto de testes do TSTest.
 * 
 * ENG: This class aims read json file containing all tests and convert to TSTest object test.
 *  */
export default class File_Reader {

    // the object test containing all tests.
    private requisitionsTestFile : RequisitionsTestFile;

    // the path of file.
    private filepath: string = `./requests.json`;
     
    public constructor(){
        try {
            this.requisitionsTestFile = JSON.parse(readFileSync(this.filepath, "ascii"));
            this.configRequestFile();
        } catch (error) {
            throw new Error("not possible read request file config, complete error: " + error)
        }
    }

    private configRequestFile(){  
        this.verifyRequestTestListFile();
        // this.printFileConfig();
    }

    private verifyRequestTestListFile() {
        // vefirica se possui requisicoes
        if(this.requisitionsTestFile.requisitionsTestList == undefined || this.requisitionsTestFile.requisitionsTestList == null){
            throw new Error("The request testes is not defined, please define requestTest in file.");
        }else if(this.requisitionsTestFile.requisitionsTestList.length === 0){
            throw new Error("No tests defined, please create some tests.");
        }else {
            this.requisitionsTestFile.requisitionsTestList.forEach(requesition => {
                this.verifyRestTest(requesition);
            })
        }
    }


    private verifyRestTest(httpTest: HttpTest) {
        if(httpTest.requestTest == null || httpTest.requestTest == undefined){
            throw new Error("The request file is wrong!");
        }else{
            this.verifiyRequestTest(httpTest.requestTest);
        }

        if(httpTest.responseTest == null || httpTest.responseTest == undefined){
            throw new Error("The response file is wrong!");
        }
    }

    private verifiyRequestTest(requestTest: RequestTest) {
        // verifica se possui verbo
        if(requestTest.method == undefined || requestTest.method == null){
            throw new Error("The request verb is wrong");
        }else{
            requestTest.method = this.convertHttpMethod(requestTest.method);
        }

        if(requestTest.path == undefined || requestTest.path == null){
            throw new Error("The request path is wrong");
        }
    }


    private convertHttpMethod(method: string): HttpMethod {
        method = method.toLocaleUpperCase();

        if(method === HttpMethod.GET.toLocaleUpperCase()){
            return HttpMethod.GET;
        }else if (method === HttpMethod.POST.toLocaleUpperCase()){
            return HttpMethod.POST;
        }else if (method === HttpMethod.DELETE.toLocaleUpperCase()){
            return HttpMethod.DELETE;
        }else if (method === HttpMethod.PUT.toLocaleUpperCase()){
            return HttpMethod.PUT;
        }else {
            throw new Error("Method http undefined")
        }
        
    } 

    public printFileConfig() : void {
        console.log("List of requets for testes:",this.requisitionsTestFile.requisitionsTestList);
        this.requisitionsTestFile.requisitionsTestList.forEach(requisition => {
            console.log("Request: ", requisition.requestTest);
            console.log("Response: ", requisition.responseTest);
            
        })
    }

    public getRequisitionsFile(): RequisitionsTestFile {
        return this.requisitionsTestFile;
    }
    
}
 



