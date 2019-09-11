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
        this.JsonComparator(response,responseTest,result2)
        .then(result => {
            console.log(result);
        });
        
    }

    // recebe um obj jsonTest e JsonResponse
    private JsonComparator(response: any, responseTest: any, errorResult: Result, ownerPropertyName?:string): Promise<Result>{
        return new Promise(resolve =>{

            if(errorResult == null || errorResult == undefined){
                errorResult = new Result([],[],[]);
            }
    
            if(ownerPropertyName == null || ownerPropertyName == undefined) {
                ownerPropertyName = ""
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
    
                    // verifica se é um array
                    if(responseTest[key] instanceof Array){
                        
                        this.comparateArrays(responseTest[key],response[key], errorResult, ownerPropertyName + "." + key)
                            .then( result => {
                                errorResult = result;
                            }
                        );
                        
                    // Verifica se é um objeto
                    } else if (responseTest[key] instanceof Object) {
                        this.JsonComparator(response[key],responseTest[key],errorResult, ownerPropertyName +"."+ key)
                        .then(result =>{
                            errorResult = result;
                        });
                    } else {
                        // veririca dados primários
                        if(responseTest[key] !== response[key]){
                            errorResult.valuesDiff.push("Attribute Value Diff: "+ ownerPropertyName + "." +key.toLocaleUpperCase() +" have diferent values:" +"<"+response[key] +">"+ " is diferent of " + "<"+responseTest[key]+">(expected)" );
                        }
                    }
    
                } else {
                    attMissing.push(key);
                }
            })
    
            errorResult.attributeMissing = errorResult.attributeMissing.concat(attMissing);
            errorResult.attributeExtra = errorResult.attributeExtra.concat(attOver);
            setTimeout(() => {
                resolve(errorResult);
            }, 1000);
        });
    }

    private sortFunction(a:string, b :string) {
        let A = a.toLocaleLowerCase();
        let B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    }

    private comparateArrays(array1: Array<any>, array2: Array<any>, errorResult: Result, ownerPropertyName?: string): Promise<Result>{
        return new Promise((resolve) => {
            
            if(array1.length !== array2.length){
                errorResult.valuesDiff.push("Array: "+ ownerPropertyName + " have diferent lenght: " + array2.length + " is diferent of " + array1.length +"(expected)")
                resolve(errorResult);
            
            }else {
                
                for (let index = 0; index < array1.length; index++) {
                    if( typeof array1[index] !==  typeof array2[index]){
                        errorResult.valuesDiff.push("Array Value Type: "+ ownerPropertyName +"["+ index +"]"+ " have diferent types: <" + array1[index] +" is " + typeof array1[index] + "> is diferent of <" + array2[index]+ " is "+typeof array2[index] +" (expected)>")
                    }else {
                        if(array1[index] instanceof Array){
                            this.comparateArrays(array1[index], array2[index], errorResult, ownerPropertyName)
                                .then(result => {
                                    console.log("log recursivo",result);
                                    errorResult = result;
                                }
                            )
                        }else if (array1[index] instanceof Object){
                            this.JsonComparator(array1[index],array2[index],errorResult,ownerPropertyName)
                            .then(result => {
                                errorResult = result;
                            })
                        }else {
                            
                            if(array1[index] !== array2[index]){
                                errorResult.valuesDiff.push("Array Value Diff: "+ ownerPropertyName +"["+ index +"]"+ " have diferent values: <" +array1[index] +"> is diferent of <" + array2[index] +">(expected)");
                            }
                        }
                    }
                    
                }
                resolve(errorResult);
            }
        });
    }
}