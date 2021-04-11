import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs/observable/from';

@Injectable()
export class DeliveryStep1Service {
  
  constructor(
    private http: Http,
    private httpNative: HTTP,
    private platform: Platform
  ) {}
  	public saveCalendarDelivery(userid, days_agenda) {
        let data = {
          userid: userid,
          days_agenda: days_agenda
        };
        let url = `${Constants.API.URL}delivery/scheduler`;
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