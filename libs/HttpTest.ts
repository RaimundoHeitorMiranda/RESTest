import request = require('request');
import { HttpTest, HttpMethod, Result, Config } from './Models';
import { Comparator } from './Comparator';
import { Response } from "request/index";

export class HTTP {

    config: Config;

    constructor(config : Config){
        this.config = config;
    }


    public async Test(req: HttpTest): Promise<Result> {
        


        return new Promise((resolve,reject) => {
            const url = this.config.requestConfig.server +":" + this.config.requestConfig.port + req.requestTest.path;

            // GET
            if(req.requestTest.method === HttpMethod.GET){
                request.get(url, async (error, response) => {
                    await this.verifyTest(response ,error, req)
                    .then(result => {
                        resolve(result);
                    });
                });
            
            // POST
            } else if (req.requestTest.method === HttpMethod.POST) {
                // let data = req.requestTest.body;
                request.post(url,{
                    headers: {'content-type': 'application/json'},
                    body: req.requestTest.content,
                    json: true
                }, async (error, response) => {
                    
                        await this.verifyTest(response ,error, req)
                    .then(result => {
                        resolve(result);
                    });
                });

            // PUT
            } else if (req.requestTest.method === HttpMethod.PUT) {
                request.put(url,{
                    headers: {'content-type': 'application/json'},
                    body: req.requestTest.content,
                    json: true
                }, async (error, response) => {
                    await this.verifyTest(response ,error, req)
                    .then(result => {
                        resolve(result);
                    });
                });
            } else if (req.requestTest.method === HttpMethod.DELETE) {
                request.delete(url, async (error, response) => {
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

    private verifyTest(responseClient : Response, error: any, request: HttpTest) :Promise<Result | any> {
        return new Promise(async resolve => {
            
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

                // let detalhe = true;
                if(typeof responseClient.body === 'string'){
                    responseClient.body = JSON.parse(responseClient.body);
                }
              
                if(request.responseTest.body !== undefined && request.responseTest.body !== null){
                    comparator.BodyComparator(responseClient.body,request.responseTest.body,resultCheck)
                    .then(result => {
                        if(result.attributeExtra.length > 0 || result.attributeMissing.length >0 || result.valuesDiff.length > 0){
                            resultCheck.valid = false;
                        }
                        
                        resolve(result);
                    });
                }else {
                    resultCheck.body_ok = true;

                    resolve(resultCheck);
                }
                
            }else{
                resultCheck.request_error = "Request error:" + error;
                resultCheck.valid = false;
                resolve(resultCheck);
            }
        });
    }

}