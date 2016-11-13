import { Component } from '@angular/core';
import { CustomBrowserXhr } from "../../service/CustomBrowser.service";
import { UserService } from "../../service/user.service";
import { Http , ResponseContentType , Response } from '@angular/http';
@Component({
  
    selector: 'home-component',
    templateUrl: 'client/components/HomeComponent/home.component.html',
    providers: [ CustomBrowserXhr , UserService ]
})
export class HomeComponent { 

    constructor( private _authHttp :  Http, private userService :UserService) {

    }

    clicked() {
   /* this.userService.getPDF()
            .subscribe(res => {
               saveAs(res, "myPDF.pdf");
            var fileURL = URL.createObjectURL(res);
                window.open(fileURL); // if you want to open it in new tab
          })*/

      
       /* return this._authHttp.get('/test', { responseType: ResponseContentType.Blob })
        //.map((res:Response) => new Blob([res.blob()], { type: 'application/pdf' }))
        .map((res:Response) => res.blob())
        .subscribe(
            data => {
                console.log(data);
                var blob = new Blob([data], {type: 'application/pdf'});
                console.log(blob);
                saveAs(blob, "testData.pdf");

        },
            err => console.error(err),
        () => console.log('done')
    );*/
    }

        
}
