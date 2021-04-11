import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';

@Injectable()
export class ProfileService {
  
  constructor(public http: Http) {}

    public getCounters(user) {
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'counters/'+user,
        {
            headers: headers,
            method: "GET"

        }).map(
        (res:Response)=> {return res.json();}
        );

    }
}    