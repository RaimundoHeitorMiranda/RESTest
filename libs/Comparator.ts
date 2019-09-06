import { ResponseTest, Result } from "./Models";
import { Response } from "request";

export class Comparator {
    
    // Comapara os status http do test com a resposta real;
    public static httpStatusComparator(response: Response, responseTest: ResponseTest) :boolean {
        return response.statusCode == responseTest.httpStatus;
    }

    constructor(){

    }

    public  BodyComparator(response: any, responseTest: any){
        let result2 = new Result([],[],[]);
        result2 = this.JsonComparator(response,responseTest,result2);
        setTimeout(() => {
            console.log(result2);
        },10);
        
        
    }

    // recebe um obj jsonTest e JsonResponse
    private JsonComparator(response: any, responseTest: any, errorResult: Result): Result{
        
        if(errorResult == null || errorResult == undefined){
            errorResult = new Result([],[],[]);
        }

        // Arryas to save missing and over attributes.
        let attMissing: string[] = [];
        let attOver: string[] = [];

        // get attribute keys of response and tests
        let responseValues =  Object.keys(response);
        let responseTestValues =  Object.keys(responseTest);
        
        // sorting
         responseValues.sort(this.sortFunction);
         responseTestValues.sort(this.sortFunction);

        // TODO fast test.
        // se os os tamanhos da lista forem diferentes -> false;

        // Verifica se existe atributo sobrando.
        // verify if as attribute over.
        responseValues.forEach(key => {
            if(responseTestValues.lastIndexOf(key) == -1) {
                attOver.push(key);
            }
        })        
        
        // verifica se existem atributos faltando.
        // verify if exists attribute missing.
        responseTestValues.forEach(key => {
            
            // se existe/ if exists
            if(responseValues.lastIndexOf(key) != -1){

                // // compara se os valores são iguais
                if(responseTest[key] instanceof Array){
                    errorResult = this.comparateArrays(responseTest[key],response[key], errorResult);
                    console.log("array:", errorResult);
                    
                } else if (responseTest[key] instanceof Object) {
                    errorResult = this.JsonComparator(response[key],responseTest[key],errorResult)
                    

                } else {
                    if(responseTest[key] !== response[key]){
                        // adicionar o formato do dado
                        errorResult.valuesDiff.push("Attribute "+ key.toLocaleUpperCase() +" have diferent values:" +"<"+response[key] +">"+ " is diferent of " + "<"+responseTest[key]+">(expected)" );
                    }
                }

            } else {
                attMissing.push(key);
            }
        })

       
        
        
        errorResult.attributeMissing = errorResult.attributeMissing.concat(attMissing);
        errorResult.attributeExtra = errorResult.attributeExtra.concat(attOver);
        
        

        
        
        // se não adiciona o nome do atributo que falta ou excede ao error e mostra o valor esperado
        // seta a flag de aprovação para false
        // compara o valor dos atributos
        // se o atributo for um obj, salva numa lista semporaria
        // se forem iguais ok
        // se não adiciona o nome e valor do atributo que falta ou excede ao error e mostra o valor esperado
        // seta a flag de aprovação para false
        // repete o processo para os atributos que estiverem nos dois
        return errorResult;
    }

    private sortFunction(a:string, b :string) {
        let A = a.toLocaleLowerCase();
        let B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    }

    private comparateArrays(array1: Array<any>, array2: Array<any>, errorResult: Result): Result{
        array1 == array2
        
        return errorResult;
    }
}