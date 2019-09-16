import  File_Reader from './libs/File_Reader';
import { HTTP } from './libs/HttpTest';
import { Result, HttpTest } from './libs/Models';
// Tratamento de erro, erro para o professor, erro para o aluno


export class RestTest {

    private static resultList: Result[] = [];
    private static testList: HttpTest[] = [];

    constructor(){

    }
    
    public static async init() : Promise<Result[]> {
    
        console.log("1-buscar arquivo");
        
        await File_Reader.loadRequisitionsTests()
        .then(
            result => {
                console.log("2-Leu arquivo");
                this.testList = result.requisitionsTestList;          
            },
            error =>{
                console.log("-----------------ERROR: ",error);
                throw error
            }
        );
        console.log("3-Terminou de ler os arquivos");
        
        console.log("3- rodar os testes");
        
        await this.runTests(this.testList).then(
            result => {
                console.log("4 -Terminouuuu!! os testes", result);
            },
            error =>{
                console.log("-----------------ERROR: ",error);
                throw error
            }
        );

        await setTimeout(() => {
            console.log(5000,"5 segundos dentro do init");
            
        }, 5000);
    
        console.log(51,"5 ---------------------Deve esperar as promisses para terminar");
        
        return this.resultList;
    
        
    }

    private static runTests(testsList: HttpTest[]): Promise<any> {
        return new Promise(async resolve => {
            console.log("T1- COmecou os testes");
            
            for (let index = 0; index < testsList.length; index++) {
                const element = testsList[index];
                console.log(23,"T2------request: ",element);
                
                await HTTP.Test(element)
                .then(
                    result => {
                        
                        console.log(29,"T3-------------result: ",result);
                        this.resultList.push(result);
                    },
                    error =>{
                        console.log("-----------------ERROR: ",error);
                        
                    }
                );
                console.log(38, "T4--------executar depois de cada teste -----------");
                
            }
            console.log("T5- terminou os testes");
            
            resolve(null);
        });
    }
}

RestTest.init().then(
    result =>{
        console.log(62,"-------------List de resultado", result);
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
    
);
