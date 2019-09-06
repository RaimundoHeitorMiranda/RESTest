import request = require('request');
import { HttpTest, HttpMethod, ResponseTest } from './Models';
import { Comparator } from './Comparator';
import { Response } from "request/index";

export class HTTP {

    // private options: CoreOptions = {
    //     "encoding" : "ascii"
    // }

    public static Test(req: HttpTest) {
        if(req.requestTest.method = HttpMethod.GET){
            this.GET(req);
        } else if (req.requestTest.method = HttpMethod.POST) {
            this.POST(req);
        } else if (req.requestTest.method = HttpMethod.PUT) {
            this.PUT(req);
        } else if (req.requestTest.method = HttpMethod.DELETE) {
            this.DELETE(req);
        }
    }

    private static GET (req: HttpTest) {
        request.get(req.requestTest.path, (error, response) => {
            this.verifyTest(req.responseTest ,error, response);
        });
    }

    private static POST (req: HttpTest) {
        request.post(req.requestTest.path, req.requestTest.body, (error, response) => {
            this.verifyTest(req.responseTest, error , response);
        });
    }

    private static PUT (req: HttpTest) {
        request.post(req.requestTest.path, req.requestTest.body, (error, response) => {
            this.verifyTest(req.responseTest, error , response);
        });
    }

    private static DELETE (req: HttpTest) {
        request.post(req.requestTest.path, req.requestTest.body, (error, response) => {
            this.verifyTest(req.responseTest, error, response);
        });
    }

    private static verifyTest(responseTest : ResponseTest, error: any, responseClient: Response) {
        if(!error){
            console.log("status: ",responseClient.statusCode, responseTest.httpStatus);
            console.log("Status confere?:", Comparator.httpStatusComparator(responseClient,responseTest));
            console.log("Body: ",responseClient.body,"BodyTest: ", responseTest.body);
            // console.log("Body Confere?: " ,Comparator.JsonComparator(responseClient,responseTest,));
        }else{
            console.log("Error na requisição:" + error + " - " + responseClient );
        }
    }

}