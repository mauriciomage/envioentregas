import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from 'ionic-angular';
import { from } from 'rxjs/observable/from';

@Injectable()
export class DeliveryService {
  
    constructor(
      private http: Http,
      private httpNative: HTTP,
      private platform: Platform
    ) {}

  	public checkUserForDelivery(email){
        let data = {
            email: email
        }
        let url = `${Constants.API.URL}users/check`;
        if (this.platform.is('cordova')) {

          let headers = { 'Accept': 'application/json;charset=UTF-8' };
          this.httpNative.setDataSerializer('json');

          let apiCall = this.httpNative.post(url, data, headers)
          return from(apiCall);

        } else {
            let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new RequestOptions({ headers: headers });
      
            return this.http.post(url, data, options)
            .map((res:Response)=> {return res.json();});
        }
    }
}