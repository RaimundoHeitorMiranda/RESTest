

export class RequisitionsTestFile {
    requisitionsTestList: HttpTest[];

    constructor(requisitionsTestList: HttpTest[]){
        this.requisitionsTestList = requisitionsTestList;
    }
}

export class HttpTest {
    requestTest: RequestTest;
    responseTest: ResponseTest;

    constructor(requestTest :RequestTest, responseTest: ResponseTest){
        this.requestTest = requestTest;
        this.responseTest = responseTest;
    }
}

export class RequestTest {
    
    method: HttpMethod;
    path: string;
    body: any;
    responseBody: any;
    // header: any;
    constructor(method: HttpMethod,path: string,body: JSON, responseBody: JSON){
        this.method = method;
        this.path = path;
        this.body = body;
        this.responseBody = responseBody;
    }
}

export class ResponseTest {
    httpStatus: any;
    body :any;
  constructor(){
  }
}

export enum HttpMethod {
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
    POST = "POST"
}

export class Result {
    valid: boolean = true;
    request_verb_path?: string;
    request_error?: any;
    status_ok?: boolean;
    status_diff?:string;
    other?:string[];
    body_ok?: boolean;
    attributeExtra: string[] = [];
    attributeMissing: string[] = [];
    valuesDiff: string[] = [];

    constructor(){
        this.request_verb_path = '';
        this.attributeExtra = [];
        this.attributeMissing = [];
        this.valuesDiff = [];
    }
}