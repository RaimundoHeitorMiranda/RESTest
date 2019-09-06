import  File_Reader from './libs/File_Reader';
import { RequisitionsTestFile } from './libs/Models';
import { HTTP } from './libs/HttpTest';
import { Comparator } from './libs/Comparator';
// Tratamento de erro, erro para o professor, erro para o aluno

function init(){

    if(false ) {
        // read files config
        var fr = new File_Reader();
    
        // get all resquests to test
        var a: RequisitionsTestFile = fr.getRequisitionsFile();
        
        // for each request test, run HttpTest
        a.requisitionsTestList.forEach(req => {
            HTTP.Test(req);        
        });
    }

    
    // request.get('https://api.postmon.com.br/v1/cep/58400444', (err,response,body) => {
    //     if(!err){
    //         console.log("status: ",response.statusCode);
    //         console.log("reader: ", response.headers);
    //         console.log("response body: ",response.body);
    //         console.log("body: " ,body);
    //     }
    // });

    var obj1 = {
        "widget": {
            "debug": "on1",
            "window": {
                "title": "Sample Konfabulator Widget",
                "name": "main_window",
                "width": 500,
                "height": 500
            },
            "image": { 
                "srcs": "Images/Sun.img",
                "name": "sun1",
                "hOffset": 250,
                "vOffset": 250,
                "alignment": "center"
            },
            "texto": {
                "data": "Click Here",
                "size": 36,
                "style": "bold",
                "name": "text1",
                "hOffset": 250,
                "vOffset": 100,
                "alignment": "center",
                "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
            }
        }
    }    

    var obj2 = {
        "widget": {
            "debug": "on",
            "window": {
                "title": "Sample Konfabulator Widget1",
                "name": "main_window2",
                "width": "asasa",
                "height": 501
            },
            "image": { 
                "src": "Images/Sun.png",
                "name": "sun1",
                "hOffset": 250,
                "vOffset": 250,
                "alignment": "center1"
            },
            "text": {
                "datas": "Click Here",
                "size": 36,
                "style": "bold2",
                "name": "text1",
                "hOffset": 250,
                "vOffset": 100,
                "alignment": "center",
                "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
            }
        }
    }    

    let comparator = new Comparator();
    comparator.BodyComparator(obj1, obj2);
    
}
    

init();
