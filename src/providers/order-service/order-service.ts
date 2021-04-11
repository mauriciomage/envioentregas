import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../constants/constants';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs/observable/from';
import { finalize } from 'rxjs/operators';
import { Platform, AlertController } from 'ionic-angular';

@Injectable()
export class OrderServiceProvider {

  constructor(
    private http: Http,
    private httpNative: HTTP,
    private platform: Platform,
    private alertController: AlertController) {
  }

  public getOrder(id) {
  	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'orders/showOrder/'+id,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }

  public getAllOrders(user) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'orders/'+user,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }
  public getAllDeliveryOrders(user) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'orders/delivery/'+user,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }
  // Usado para Messages 
  public getNegotiationOrders(user) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'orders/OnMessages/'+user,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }
  // Usado para Messages
  public getDeliveryOrders(user) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'orders/delivery/OnMessages/'+user,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }
  public getMessagesOfferts(orderId, action, userId) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'offerts/'+orderId+'/'+action+'/'+userId,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }
  public getDeliveryMessagesOfferts(orderId, action, userId) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'offerts/'+orderId+'/'+action+'/'+userId,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

  }

  public searchOrders(city, latlng_source, latlng_destination, userLogged, currentLocation){
    let queryPparams = city+'/'+latlng_source+'/'+latlng_destination+'/'+userLogged+'/'+currentLocation;
    let url = `${Constants.API.URL}orders/showByLocations/${queryPparams}`;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(url, { headers: headers, method: "GET"})
    .map((res:Response)=> {return res.json();});
  }

  public getStipulatedPrice(postalCode, dimensions){
   let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'price/'+postalCode+"/"+dimensions,
              {
                 headers: headers,
                 method: "GET"

              }).map(
                (res:Response)=> {return res.json();}
              );

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


  public getBusinessesOfferts(idOrder, idUser){
      let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.get(Constants.API.URL+'offertsBusiness/'+idOrder+"/"+idUser,
        {
           headers: headers,
           method: "GET"

        }).map(
          (res:Response)=> {return res.json();}
        );
  }

  public getBusinessesTracking(businessid){
      let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.get(Constants.API.URL+'offertsBusinessTracking/'+businessid,
        {
           headers: headers,
           method: "GET"

        }).map(
          (res:Response)=> {return res.json();}
        );
  }

  public acceptOrderPayment(packageName, cost, idDelivery, idUser, idOrder, idBusiness){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.get(Constants.API.URL+'business/acceptOffertPayment/'+packageName+'/'+cost+'/'+idDelivery+"/"+idUser+"/"+idOrder+"/"+idBusiness,
        {
           headers: headers,
           method: "GET"

        }).map(
          (res:Response)=> {return res.json();}
        );
  }

  public acceptOrder(packageName, cost, idDelivery, idUser, idOrder, idBusiness){
    let data = {
      packageName: packageName,
      cost: cost,
      delivery_id: idDelivery,
      user_id: idUser,
      order_id: idOrder,
      business_id: idBusiness

    }
    
    let url = `${Constants.API.URL}business/acceptOffert`;
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

  public cancelOrder(idUser, idOrder, idDelivery = null, idBusiness = null, currentId = null){
      let data = {
        user_id: idUser,
        order_id: idOrder,
        delivery_id: idDelivery,
        business_id: idBusiness,
        current_id: currentId,
      }

      let url = `${Constants.API.URL}business/cancelOrder`;
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

  public getUsersByCurrentLocation(user, currentCity) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get(Constants.API.URL+'users/byCurrentLocation/'+user+'/'+currentCity,
    {
        headers: headers,
        method: "GET"

    }).map(
      (res:Response)=> {return res.json();}
    );
  }

  public sendGeneralOrderNotification(user, currentCity) {
  }

}
