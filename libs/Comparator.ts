import { ResponseTest } from "./Models";
import { Response } from "request";

export class Comparator {
    
    // Comapara os status http do test com a resposta real;
    public static httpStatusComparator(response: Response, responseTest: ResponseTest) :boolean {
        return response.statusCode == responseTest.httpStatus;
    }

    public static bodyComparator(response: Response, responseTest: ResponseTest){
        return response.body == responseTest.body;
    }

}