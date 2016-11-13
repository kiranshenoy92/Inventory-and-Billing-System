import {Injectable} from '@angular/core';
import {BrowserXhr} from '@angular/http';
import { Http, Headers, ResponseContentType } from '@angular/http';

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor(private _http :Http) {
    super()
  }
  
  build() {
   return this._http.get("/test",{ responseType: ResponseContentType.Blob })
              .map(res => {
               // return new Blob([res.blob()], { type: 'application/pdf' })
               res.json();
              })
  }
}