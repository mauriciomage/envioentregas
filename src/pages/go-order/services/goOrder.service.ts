import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { from } from 'rxjs/observable/from';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from 'ionic-angular';

@Injectable()
export class GoOrderService {
  
    constructor(
        private http: Http,
        private httpNative: HTTP,
        private platform: Platform
    ) {}

    public sendDeclineOffert(report_by, user_id, order_id, business_id, reason){
        let data = {
          delivery_id: report_by,
          user_id: user_id,
          order_id: order_id,
          business_id: business_id,
          reason: reason
        };
        let url = `${Constants.API.URL}offertsBusinessTracking/decline`;
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

    public acceptClientOrder(order_id, user_id, delivery_id){
        let data = {
            order_id: order_id,
            user_id: user_id,
            delivery_id: delivery_id
        };
        let url = `${Constants.API.URL}order/accept`;
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

    public verifyStartCodeOrder(codeOrder, idUser, idOrder){
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'order/codeStart/verify/'+codeOrder+"/"+idUser+"/"+idOrder,
        {
            headers: headers,
            method: "GET"
        }).map(
            (res:Response)=> {return res.json();}
        );
    }

    public verifyFinalCodeOrder(codeOrder, idUser, idOrder){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'order/codeFinal/verify/'+codeOrder+"/"+idUser+"/"+idOrder,
        {
            headers: headers,
            method: "GET"
        }).map(
            (res:Response)=> {return res.json();}
        );
    }

    public sendMessage(delivery_id, user_id, order_id, status, message){
        let data = {
          delivery_id: delivery_id,
          user_id: user_id,
          order_id: order_id,
          status: status,
          message: message,
        };
        let url = `${Constants.API.URL}business/sendMessage`;
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

    public sendOffert(maxDeliveryDate, maxDeliveryHour, cost, delivery_id, user_id, order_id, status, vehicle, re_offert = null){
        let data = {
            maxDeliveryDate: maxDeliveryDate,
            maxDeliveryHour: maxDeliveryHour,
            cost: cost,
            delivery_id: delivery_id,
            user_id: user_id,
            order_id: order_id,
            status: status,
            vehicle: vehicle,
            re_offert: re_offert
        };
        let url = `${Constants.API.URL}business/sendOffert`;
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

    public sendRating(rating, user_id, report_by, order_id, to){
        let data = {
          point: rating,
          user_id: user_id,
          report_by: report_by,
          order_id: order_id,
          to: to
        };
        let url = `${Constants.API.URL}orders/sendRating`;
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

    public sendCurrentLocation(delivery_id, order_id, current_address, user_id){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'orders/sendCurrentLocation/'+delivery_id+"/"+order_id+"/"+current_address+"/"+user_id,
        {
        headers: headers,
        method: "GET"

        }).map(
        (res:Response)=> {return res.json();}
        );
    }

    getOrderInfo(orderId) {
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'orders/info/'+orderId,
        { headers: headers, method: "GET" }).map(
            (res:Response) => { return res.json(); }
        );
    }
}