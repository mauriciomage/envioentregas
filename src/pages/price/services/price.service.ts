import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs/observable/from';

@Injectable()
export class PriceService {
  
  constructor(
    public http: Http,
    private platform: Platform,
    private httpNative: HTTP) {}
  
  public saveOrder(namePackage, vehicle, dimensions, source_address, destination_address, cost_stipulated,
    service_stipulated, insurance, coordenates, date, hour, user_id, size, description, photo, isClient) {
       let data = {
         package: namePackage,
         description: description,
         vehicle: vehicle,
         dimensions: dimensions,
         size: size,
         source: source_address,
         destination: destination_address,
         cost_stipulated: cost_stipulated,
         service_stipulated: service_stipulated,
         insurance: insurance,
         coordenates: coordenates,
         date: date,
         hour: hour,
         user_id: user_id,
         photo: photo,
         isClient: isClient
     };
     
      let url = `${Constants.API.URL}orders/new`;
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