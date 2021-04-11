import { Injectable } from '@angular/core';
import * as Constants from  '../../constants/constants';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from 'ionic-angular';
import { from } from 'rxjs/observable/from';

@Injectable()
export class PhoneServiceProvider {
  constructor(
    private http: Http,
    private httpNative: HTTP,
    private platform: Platform
  ) {}

  public generatePhoneCode(phone, email, fname, lname, password, isClient = false, places = []) {
    let data = {
        phone: phone,
        email: email,
        fname: fname,
        lname: lname,
        password: password,
        isClient: isClient,
        places: places
    };
    let url = `${Constants.API.URL}phone/code`;
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

  public generatePhoneCodeAtLogin(phone, email) {
    let data = {
        phone: phone,
        email: email
    };
    
    let url = `${Constants.API.URL}phone/code/atLogin`;
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

  public verifyPhoneCode(code, user_id){
  	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  	return this.http.get(Constants.API.URL+'phone/code/verify/'+code+'/'+user_id, 
      {
          headers: headers,
          method: "GET"

      }).map(
        (res:Response)=> {return res.json();}
      ); 	
  }

}
