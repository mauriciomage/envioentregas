import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from 'ionic-angular';
import { from } from 'rxjs/observable/from';

@Injectable()
export class MessageDetailService {
  
  constructor(
    private http: Http,
    private httpNative: HTTP,
    private platform: Platform) {
    }

  	public getMessages(businessId, action = null){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'messages/'+businessId,
        {
        headers: headers,
        method: "GET"

        }).map(
        (res:Response)=> {return res.json();}
        );
   }

    public newMessage(user_id, message, to, businessId){
        let data = {
            user_id: user_id,
            message: message,
            to: to,
            business_id: businessId,
        };
        let url = `${Constants.API.URL}offertBusiness/newMessage`;
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