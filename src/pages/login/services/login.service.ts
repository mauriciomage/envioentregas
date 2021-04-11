import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Constants from  '../../../constants/constants';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs/observable/from';
import { Platform } from 'ionic-angular';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';



@Injectable()
export class LoginService {
	private userLogged: Boolean; 
	observableLogged
	dataLogin: String;
  constructor(public http: HTTP, private httpStandar: Http, private platform: Platform) {
		this.userLogged = false;
		this.observableLogged = new BehaviorSubject<Boolean>(this.userLogged);
	}

	public logged(active: Boolean) {
		this.observableLogged.next(active);
	}

	public checkOrSaveUserFb(username, email, photo, fname, lname) {
      
	    let data = {
	      username: username,
	      email: email,
	      photo: photo,
	      fname: fname,
	      lname: lname
	    };

		let url = `${Constants.API.URL}signup/fb`;
		if (this.platform.is('cordova')) {

			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.http.setDataSerializer('json');
			
			let nativeRequest =  this.http.post(url, data, headers);
			return from(nativeRequest);
		} else {

			let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
			let options = new RequestOptions({ headers: headers });

			return this.httpStandar.post(url, data, options)
			.map((res:Response)=> {return res.json();});
		}
    }

    public generatePhoneCodeAtLogin(phone, email){
	    let data = {
	        phone: phone,
	        email: email
	    };
		let url = `${Constants.API.URL}phone/code/atLogin`;
		if (this.platform.is('cordova')) {
			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.http.setDataSerializer('json');
			let nativeRequest =  this.http.post(url, data, headers);

			return from(nativeRequest);
		} else {
			let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
			let options = new RequestOptions({ headers: headers });

			return this.httpStandar.post(url, data, options)
			.map((res:Response)=> {return res.json();});
		}     
  	}

  login(email, password) {
	    let data = {
	      email: email,
	      password: password
		};
		
		let url = `${Constants.API.URL}signup`;
		if (this.platform.is('cordova')) {
			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.http.setDataSerializer('json');
			
			let nativeRequest =  this.http.post(url, data, headers);
			return from(nativeRequest);
		} else {
			let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
			let options = new RequestOptions({ headers: headers });

			return this.httpStandar.post(url, data, options)
			.map((res:Response)=> {return res.json();});
		}
	}

		public saveChangeProfilePhoto(photo, id_user){
			let data = {
			photo: photo,
			id_user: id_user
			}
			let url = `${Constants.API.URL}user/edit/photo`;
			if (this.platform.is('cordova')) {
				let headers = { 'Accept': 'application/json;charset=UTF-8' };
				this.http.setDataSerializer('json');
				let nativeRequest =  this.http.post(url, data, headers);

				return from(nativeRequest);
			} else {
				let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
				let options = new RequestOptions({ headers: headers });

				return this.httpStandar.post(url, data, options)
				.map((res:Response)=> {return res.json();});
			}
		}

	public getUserRating(idUser) {
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this.httpStandar.get(`${Constants.API.URL}rating/${idUser}`,
		{ headers: headers, method: "GET" }).map((res:Response)=> {return res.json();});
	}
}
