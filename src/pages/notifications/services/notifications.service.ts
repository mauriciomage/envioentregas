import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs/observable/from';

@Injectable()
export class NotificationService {
  
  constructor(
    private http: Http,
    private httpNative: HTTP,
    private platform: Platform
  ) {}

    getNotifications(user_id) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'notifications/'+user_id,
    {
      headers: headers,
      method: "GET"

   }).map(
     (res:Response)=> {return res.json();}
   );
  }

  public configNotifications(messageNotif, messageEmail, messageSMS, offertNotif, offertEmail, offertSMS, deliveriesNotif, deliveriesEmail, deliveriesSMS, user_id) {
    let data = {
        messageNotif: messageNotif,
        messageEmail: messageEmail,
        messageSMS: messageSMS,
        offertNotif: offertNotif,
        offertEmail: offertEmail,
        offertSMS: offertSMS,
        deliveriesNotif: deliveriesNotif,
        deliveriesEmail: deliveriesEmail,
        deliveriesSMS: deliveriesSMS,
        user_id: user_id

    };

    let url = `${Constants.API.URL}notifications/config`;
    if (this.platform.is('cordova')) {

      let headers = { 'Accept': 'application/json;charset=UTF-8' };
      this.httpNative.setDataSerializer('json');
      
      let nativeRequest =  this.httpNative.post(url, data, headers);
      return from(nativeRequest);

    } else {
      let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(url, data, options)
      .map((res:Response)=> {return res.json();});
    }
  }
}  