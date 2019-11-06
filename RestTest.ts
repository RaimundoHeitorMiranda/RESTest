import  File_Reader from './libs/File_Reader';
import { HTTP } from './libs/HttpTest';
import { Result, HttpTest, Config } from './libs/Models';
// Tratamento de erro, erro para o professor, erro para o aluno


export class RestTest {

    private static resultList: Result[] = [];
    private static testList: HttpTest[] = [];
    private static config: Config;

    constructor(){

    }
    
    public static async init() : Promise<Result[]> {
    
        await File_Reader.loadConfig()
        .then(
            result => {
                this.config = result;
            },
            error => {
                console.log("-----------------ERROR: ",error);
                throw error;
            }
        );

        await File_Reader.loadRequisitionsTests()
        .then(
            result => {
                this.testList = result.requisitionsTestList;          
            },
            error =>{
                console.log("-----------------ERROR: ",error);
                throw error;
            }
        );
        
        await this.runTests(this.testList).then(
            result => {
                result;
            },
            error =>{
                console.log("-----------------ERROR: ",error);
                throw error
            }
        );

        return this.resultList;
    
        
    }

    private static runTests(testsList: HttpTest[]): Promise<any> {
        let http = new HTTP(this.config);

        setTimeout(() => {
            
        }, 100);
        return new Promise(async resolve => {
            
            for (let index = 0; index < testsList.length; index++) {
                const element = testsList[index];
                
                await http.Test(element)
                .then(
                    result => {
                        
                        this.resultList.push(result);
                    },
                    error =>{
                        console.log("-----------------ERROR: ",error);
                        
                    }
                );
                
            }
            
            resolve(null);
        });
    }

    public static detail() {
        return this.config.appConfig.detail;
    }
}

RestTest.init().then(
    result =>{
        if(RestTest.detail()){
            console.log(result);
        } else {
            let show: string = "";
            result.forEach(result => {
                if(result.valid){
                    show = show + ".";
                } else if(result.request_error){
                    show = show + "E";
                } else if(result.other){
                    show = show + "?";
                }else {
                    show = show + "F";
                }
            }) 
            console.log(show);
        }
        
    }
    
);
