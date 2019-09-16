import request = require('request');
import { HttpTest, HttpMethod, Result } from './Models';
import { Comparator } from './Comparator';
import { Response } from "request/index";

export class HTTP {


    public static Test(req: HttpTest): Promise<Result> {
        
        return new Promise((resolve,reject) => {
            console.log(13,"HTTPTEST:",req );

            // GET
            if(req.requestTest.method === HttpMethod.GET){
                request.get(req.requestTest.path, async (error, response) => {
                    await this.verifyTest(response ,error, req)
                    .then(result => {
                        resolve(result);
                    });
                });
            
            // POST
            } else if (req.requestTest.method === HttpMethod.POST) {
                // let data = req.requestTest.body;
                request.post(req.requestTest.path,{
                    headers: {'content-type': 'application/json'},
                    body: req.requestTest.body,
                    json: true
                }, async (error, response) => {
                    
                        await this.verifyTest(response ,error, req)
                    .then(result => {
                        resolve(result);
                    });
                });

            // PUT
            } else if (req.requestTest.method === HttpMethod.PUT) {
                request.put(req.requestTest.path,{
                    headers: {'content-type': 'application/json'},
                    body: req.requestTest.body,
                    json: true
                }, async (error, response) => {
                    await this.verifyTest(response ,error, req)
                    .then(result => {
                        resolve(result);
                    });
                });
            } else if (req.requestTest.method === HttpMethod.DELETE) {
                request.delete(req.requestTest.path, async (error, response) => {
                   await this.verifyTest(response ,error, req)
                   .then(result => {
                       resolve(result);
                   });
                });
            } else {
                reject("Deu erro");
            }

        });
    }

    private static verifyTest(responseClient : Response, error: any, request: HttpTest) :Promise<Result | any> {
        return new Promise(async resolve => {
            console.log(55,"Y1-VIRIFY",error);
            
            
            
            
            
            // Result of testes
            let resultCheck = new Result();
            
            // comparator..
            let comparator = new Comparator();

            resultCheck.request_verb_path = `${request.requestTest.method} in ${request.requestTest.path}`

            //  Http status check 
            if(comparator.httpStatusComparator(responseClient,request.responseTest)){
                resultCheck.status_ok = true;
            }else {
                resultCheck.status_ok= false;
                resultCheck.valid = false;
                resultCheck.status_diff = `Expected ${request.responseTest.httpStatus} but was ${responseClient.statusCode}`
            }
            
            // Body check
            if(!error){
                console.log(56,responseClient.body);

                // let detalhe = true;
                if(typeof responseClient.body === 'string'){
                    responseClient.body = JSON.parse(responseClient.body);
                }
              
                console.log(57,responseClient.body);
                console.log(58,request.responseTest.body);

                if(request.responseTest.body !== undefined && request.responseTest.body !== null){
                    comparator.BodyComparator(responseClient.body,request.responseTest.body,resultCheck)
                    .then(result => {
                        // if(detalhe){
                        //     console.log("status: ",responseClient.statusCode, responseTest.httpStatus);
                        //     console.log("Status confere?:", Comparator.httpStatusComparator(responseClient,responseTest));
                        //     console.log("Body: ",result);
                        //     console.log("Resultado:",result.valid);
                        // } else {
                        //     console.log(result.valid);
                        // }
                        console.log(77,"Y2- terminou a verificacao");
                        if(result.attributeExtra.length > 0 || result.attributeMissing.length >0 || result.valuesDiff.length > 0){
                            resultCheck.valid = false;
                        }
                        
                        resolve(result);
                    });
                }else {
                    console.log(77,"Y2-error na requisicao");
                    resultCheck.body_ok = true;

                    resolve(resultCheck);
                }
                
            }else{
                resultCheck.request_error = "Request error:" + error;
                resultCheck.valid = false;
                console.log("Error na requisição:" + error + " - " + responseClient );
                resolve(resultCheck);
            }
        });
    }

}