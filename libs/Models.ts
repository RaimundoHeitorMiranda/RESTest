/** Classe para abstração do arquivo de testes.
 *  Class to abstract file testes.
 */
export class RequisitionsTestFile {
    requisitionsTestList: HttpTest[];

    constructor(requisitionsTestList: HttpTest[]){
        this.requisitionsTestList = requisitionsTestList;
    }
}

/* Classe para definição de um teste.
 * Class to definition of test.
 */
export class HttpTest {
    requestTest: RequestTest;
    responseTest: ResponseTest;

    constructor(requestTest :RequestTest, responseTest: ResponseTest){
        this.requestTest = requestTest;
        this.responseTest = responseTest;
    }
}

/** A requisição do teste.
 *  A teste requisition class.
 */
export class RequestTest {

    method: HttpMethod;
    path: string;
    content: any;
    responseBody: any;
    header: any;
    constructor(method: HttpMethod,path: string,body: JSON, responseBody: JSON){
        this.method = method;
        this.path = path;
        this.content = body;
        this.responseBody = responseBody;
    }
}

/** A resposta da requisição.
 *  A response of requisition.
 */
export class ResponseTest {
    httpStatus: any;
    body :any;
  constructor(){
  }
}

// Config 
export interface Config {
    requestConfig: RequestConfig;
    securityConfig: SecurityConfig;
    appConfig: AppConfig;
}

export interface RequestConfig {
    server: string;
    port: number;
    headers: any;
}

export interface SecurityConfig {
    pathLogin: string,
    login: any;
    headerKey: string;
    token: string;
}

export interface AppConfig{
    detail: boolean;
}

export enum HttpMethod {
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
    POST = "POST"
}

export class IdMapper {
    idFake: number;
    idReal: number;
    constructor(idFake: number,idReal: number){
        this.idFake = idFake;
        this.idReal = idReal;
    }
}

export class IdManagement {
    static ids: IdMapper[] = [];

    constructor(){
        
    }

    static exists(idFake: number): any {
        for (let index = 0; index < this.ids.length; index++) {
            const IdMapper = this.ids[index];
            if(idFake === IdMapper.idFake) {
                return true;
            }

            if(index === this.ids.length -1){
             return false;   
            }
        }
    }

    static get(idFake: number): any {
        for (let index = 0; index < this.ids.length; index++) {
            const IdMapper = this.ids[index];
            if(idFake === IdMapper.idFake) {
                return IdMapper.idReal;
            }
        }
    }

    static push(idMapper:IdMapper): any {
        this.ids.push(idMapper);
    }
}

/** A classe que representa o resultado de um teste.
 * The class that represents a result of test.
 */
export class Result {
    request_verb_path?: string;
    valid: boolean = true;
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