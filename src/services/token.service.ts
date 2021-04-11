
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import * as Constants from  '../constants/constants';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from 'ionic-angular';
import { from } from 'rxjs/observable/from';
import { getLocaleDayNames } from '@angular/common';

@Injectable()

export class TokenService{
	
	constructor(
		private http : Http,
		private httpNative: HTTP,
		private platform: Platform
	){}

	send(token : string){
		let data = {
			token: token,
			os: 'android',
			//user_id: user_id
		};

		return this.http.post(Constants.API.URL+'/devices',data, this.options())
					.map((r : Response)=> r.text()) //recibimos la respuesta despues de ejecutarse la peticion ajax, y procesarla.
					.catch((err) => {
						console.log("Ha ocurrido un Error: ");
						console.log(err.text());
						return Observable.throw(err.text()); 
						
					}) 
	}
	//v1.0
	saveToken(token : string, user_id : string, os){
		let data = {
			token: token,
			os: os,
			user_id: user_id
		};
		const url = `${Constants.API.URL}/push/newtoken`;
		if (this.platform.is('cordova')) {
			this.httpNative.setDataSerializer('json');
			const nativeRequest =  this.httpNative.post(url, data, this.options());
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}  

	sendOffertPush(user_id){
	    let data = {
	      user_id: user_id
	    };
		let url = `${Constants.API.URL}/newoffert`;
		if (this.platform.is('cordova')) {

			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		} 
	}
	sendDeclineOffertPush(delivery_id){
		let data = {
			user_id: delivery_id
		};

		const url = `${Constants.API.URL}/declineoffert`;
		if (this.platform.is('cordova')) {
			this.httpNative.setDataSerializer('json');
			let nativeRequest =  this.httpNative.post(url, data, this.options());
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}

	//v1.0
	sendChangeStatusPush(user_id, status, order_id){
		let data = {
			user_id: user_id,
			status: status,
			orderId: order_id
		};
		const url = `${Constants.API.URL}/push/changestatus`;
		if (this.platform.is('cordova')) {
			this.httpNative.setDataSerializer('json');
			let nativeRequest =  this.httpNative.post(url, data, this.options());
			return from(nativeRequest);
		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}

	//v1.0
	sendRatingPush(user_id, fname, lname, rating){
	    let data = {
	      user_id: user_id,
				fname: fname,
				lname: lname,
				rating: rating
	    };

		let url = `${Constants.API.URL}/push/rating`;
		if (this.platform.is('cordova')) {

			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}

	//v1.0
	sendLocationPush(user_id, current_address){
	    let data = {
	      user_id: user_id,
	      address: current_address
	    };

		let url = `${Constants.API.URL}/push/currentlocation`;
		if (this.platform.is('cordova')) {
			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);
		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}


	sendAcceptPush(delivery_id, user_id, startCode, finishCode){
	    let data = {
			delivery_id: delivery_id,
			user_id: user_id,
			startCode: startCode,
			finishCode: finishCode
	    };

		let url = `${Constants.API.URL}/acceptoffert`;
		if (this.platform.is('cordova')) {

			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	} 

	//v1.0
  sendMessagePush(user_id, fname, lname, message, business_id){
    let data = {
      user_id: user_id,
      fname: fname,
      lname: lname,
			message: message,
			business_id: business_id
    };

		let url = `${Constants.API.URL}push/newmessage`;
		if (this.platform.is('cordova')) {
			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);
		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
  }

  sendCancelPush(delivery_id){
    let data = {
      user_id: delivery_id
    };

		let url = `${Constants.API.URL}/cancelOrder`;
		if (this.platform.is('cordova')) {

			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}
	
	sendNotifierPush(users, type, fname, lname) {
		let data = {
			users_id: users,
			fname: fname,
			lname: lname
		};
		let route;
		if (type === 'delivery') {
			route = 'notifierDelivery'
		} else {
			route = 'notifierUsers'
		}
		let url = `${Constants.API.URL}/${route}`;
		if (this.platform.is('cordova')) {

			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);

		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}

	//v1.0
	sendOrderAccepted(user_id, order_id, fname, lname, order){
		let data = {
			user_id: user_id,
			orderId: order_id,
			fname: fname,
			lname: lname,
			order: order
		};
		let url = `${Constants.API.URL}/push/orderaccepted`;
		if (this.platform.is('cordova')) {
			let headers = { 'Accept': 'application/json;charset=UTF-8' };
			this.httpNative.setDataSerializer('json');
			let nativeRequest =  this.httpNative.post(url, data, headers);
			return from(nativeRequest);
		} else {
			return this.http.post(url, data, this.options())
			.map((r : Response)=> r.text())
			.catch((err) => {return Observable.throw(err.text());})
		}
	}

	options() : RequestOptions{
		let headers = new Headers({'Content-Type': 'application/json'});

		return new RequestOptions({headers: headers});
	}
} 