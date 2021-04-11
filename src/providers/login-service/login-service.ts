import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../constants/constants';
/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  api:string = 'https://envioentregas.com/api/'

  constructor(public http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }

  
  login(parameters) {
  	let email = parameters.email;
    let arr_email = email.split('@');

    let user_email = arr_email[0];
    let domain_email = arr_email[1];

  	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  	return this.http.get(Constants.API.URL+'signup/'+user_email+'/'+domain_email,
  						{
					  		 headers: headers,
					  		 method: "GET"

					  	}).map(
					  		(res:Response)=> {return res.json();}
					  	);
  }

  public loginWithFacebook(userEmail,userName,userUid){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'login/fb/'+userEmail+'/'+userName+'/'+userUid,
      {
         headers: headers,
         method: "GET"

      }).map(
        (res:Response)=> {return res.json();}
      );
  }

  
  
}
