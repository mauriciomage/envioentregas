import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';

@Injectable()
export class CalendarService {
  
  constructor(public http: Http) {}

  	public getStipulatedPrice(postalCode, dimensions){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
         return this.http.get(Constants.API.URL+'price/'+postalCode+"/"+dimensions,
        {
            headers: headers,
            method: "GET"

        }).map(
            (res:Response)=> {return res.json();}
        );
     
    }
}