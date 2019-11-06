import { ResponseTest, Result } from "./Models";
import { Response } from "request";

export class Comparator {
    
    
    constructor(){
        
    }

    // Comapara os status http do test com a resposta real;
    public httpStatusComparator(response: Response, responseTest: ResponseTest) :boolean {
        return response.statusCode == responseTest.httpStatus;
    }

    public  BodyComparator(response: any, responseTest: any, result: Result) : Promise<Result>{
        return new Promise(resolve => {
            this.JsonComparator(response,responseTest,result)
            .then(result => {
                resolve(result); 
            });
        });
        
    }

    // recebe um obj jsonTest e JsonResponse
    private  async JsonComparator(response: any, responseTest: any, errorResult: Result, ownerPropertyName?:string): Promise<Result>{

        if(errorResult == null || errorResult == undefined){
            errorResult = new Result();
        }

        if(ownerPropertyName == null || ownerPropertyName == undefined) {
            ownerPropertyName = ""
        }

        // get attribute keys of response and tests
        // console.log(38,"response    ",response);
        // console.log(39,"responseTest",responseTest);
        
        
        let responseValues = await Object.keys(response);
        let responseTestValues = await Object.keys(responseTest);
        
        // sorting
        await responseValues.sort(this.sortFunction);
        await responseTestValues.sort(this.sortFunction);

        // TODO fast test.
        // se os os tamanhos da lista forem diferentes -> false;

        // Verifica se existe atributo sobrando.
        // verify if as attribute over.
        await responseValues.forEach(key => {
            if(responseTestValues.lastIndexOf(key) == -1) {
                errorResult.attributeExtra.push(key);
                errorResult.valid = false;
            }
        })        
        
        // verifica se existem atributos faltando.
        // verify if exists attribute missing.
        for (let index = 0; index < responseTestValues.length; index++) {
           let key = responseTestValues[index];

            // se existe/ if exists
            if(responseValues.lastIndexOf(key) != -1){

                // verifica se é um array
                if(responseTest[key] instanceof Array){
                    
                    await this.comparateArrays(response[key],responseTest[key], errorResult, ownerPropertyName + "." + key)
                        .then( result => {
                            errorResult =  result;
                        }
                    );
                    
                // Verifica se é um objeto
                } else if (responseTest[key] instanceof Object) {
                    await this.JsonComparator(response[key],responseTest[key],errorResult, ownerPropertyName +"."+ key)
                        .then( async result =>{
                            errorResult = await result;
                        });
                } else {
                    // veririca dados primários
                    if(responseTest[key] !== response[key]){
                        
                    errorResult.valid = false;
                    await errorResult.valuesDiff.push("Attribute Value Diff: "+ ownerPropertyName + "." +key.toLocaleUpperCase() +" have diferent values:" +"<"+response[key] +">"+ " is diferent of " + "<"+responseTest[key]+">(expected)" );
                    }
                }

            } else {
                errorResult.attributeMissing.push(key);
                errorResult.valid = false;
            }
           
        }

        return errorResult;
    }

    private sortFunction(a:string, b :string) {
        let A = a.toLocaleLowerCase();
        let B = b.toLocaleLowerCase();
        return A.localeCompare(B);
    }

    private async comparateArrays(array1: Array<any>, array2: Array<any>, errorResult: Result, ownerPropertyName?: string): Promise<Result>{
            
        if(array1.length !== array2.length){
            errorResult.valid = false;
            await errorResult.valuesDiff.push("Array: "+ ownerPropertyName + " have diferent lenght: " + array1.length + " is diferent of " + array2.length +"(expected)")
            return errorResult;
        
        }else {
            
            for (let index = 0; index < array1.length; index++) {
                if( typeof array1[index] !==  typeof array2[index]){
                    errorResult.valid = false;
                    await errorResult.valuesDiff.push("Array Value Type: "+ ownerPropertyName +"["+ index +"]"+ " have diferent types: <" + array1[index] +" is " + typeof array1[index] + "> is diferent of <" + array2[index]+ " is "+typeof array2[index] +" (expected)>")
                }else {
                    if(array1[index] instanceof Array){
                        await this.comparateArrays(array1[index], array2[index], errorResult, ownerPropertyName)
                            .then(result => {
                                errorResult = result;
                            }
                        )
                    }else if (array1[index] instanceof Object){
                        await this.JsonComparator(array1[index],array2[index],errorResult,ownerPropertyName)
                        .then(result => {
                            errorResult = result;
                        })
                    }else {
                        
                        if(array1[index] !== array2[index]){
                            errorResult.valid = false;
                            await errorResult.valuesDiff.push("Array Value Diff: "+ ownerPropertyName +"["+ index +"]"+ " have diferent values: <" +array1[index] +"> is diferent of <" + array2[index] +">(expected)");
                        }
                    }
                }
                
            }
            return errorResult;
        }
    }
}