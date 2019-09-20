import { readFile } from 'fs';
import { RequisitionsTestFile, HttpMethod, HttpTest, RequestTest, Config } from './Models';


/**
 * PT_BR: Esta classe tem como objetivo ler o arquivo Json com todos os testes e
 * converter em um objeto de testes do TSTest.
 * 
 * ENG: This class aims read json file containing all tests and convert to TSTest object test,
 * and read config file too.
 *  */
export default class File_Reader {


    // the path of files.
    private static fileTestPath: string = `./requests.json`;
    private static fileConfigPath: string =`./config.json`; 

    public constructor(){
        
    }

    // This method read file testes, verify and convert to tests objctes.
    public static loadRequisitionsTests(): Promise<RequisitionsTestFile>{
        return new Promise(async resolve => {
            let requisitionsTestFile: RequisitionsTestFile = new RequisitionsTestFile([]);
            await readFile(this.fileTestPath, "utf-8",async (error,data) => {
                requisitionsTestFile = await JSON.parse(data);
                await this.verifyRequestTestListFile(requisitionsTestFile);
                resolve(requisitionsTestFile);
                if(error){
                    throw new Error("not possible read request file config, complete error: " + error);
                }
            })
        });
    }

    // This method read config file and converto to config object
    public static loadConfig(): Promise<Config> {
        return new Promise(async resolve => {
            let config : Config;

            await readFile(this.fileConfigPath,"utf-8", async (error,data)=> {
                if(error){
                    throw new Error("not possible read config file config, complete error: " + error);
                }else {
                    config = await JSON.parse(data);
                    resolve(config)
                }
            })
        });
    }

    private static verifyRequestTestListFile(requisitionsTestFile: RequisitionsTestFile) {
        // vefirica se possui requisicoes
        if(requisitionsTestFile.requisitionsTestList == undefined || requisitionsTestFile.requisitionsTestList == null){
            throw new Error("The request testes is not defined, please define requestTest in file.");
        }else if(requisitionsTestFile.requisitionsTestList.length === 0){
            throw new Error("No tests defined, please create some tests.");
        }else {
            requisitionsTestFile.requisitionsTestList.forEach(requesition => {
                this.verifyRestTest(requesition);
            })
        }
    }


    private static verifyRestTest(httpTest: HttpTest) {
        if(httpTest.requestTest == null || httpTest.requestTest == undefined){
            throw new Error("The request file is wrong!");
        }else{
            this.verifiyRequestTest(httpTest.requestTest);
        }

        if(httpTest.responseTest == null || httpTest.responseTest == undefined){
            throw new Error("The response file is wrong!");
        }
    }

    private static verifiyRequestTest(requestTest: RequestTest) {
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


    private static convertHttpMethod(method: string): HttpMethod {
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

    public static printFileConfig(requisitionsTestFile: RequisitionsTestFile) {
        console.log("List of requets for testes:",requisitionsTestFile.requisitionsTestList);
        requisitionsTestFile.requisitionsTestList.forEach(requisition => {
            console.log("Request: ", requisition.requestTest);
            console.log("Response: ", requisition.responseTest);
            
        })
    }

    public getRequisitionsFile(requisitionsTestFile: RequisitionsTestFile): RequisitionsTestFile {
        return requisitionsTestFile;
    }


    
}
 



