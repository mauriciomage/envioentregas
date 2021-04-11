import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { from } from 'rxjs/observable/from';
import { Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class PlacesService {
  
    constructor(
      private http: Http,
      private platform: Platform,
      private httpNative: HTTP
    ) {}

  	public deleteDayCalendarDelivery(userid, schedulerid, day){
        let data = {
            userid: userid,
            schedulerid: schedulerid,
            day: day
        };
        let url = `${Constants.API.URL}users/scheduler/delete`;
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

    public deleteAddress(placeId, userId){
        let data = {
            placeId: placeId,
            userId: userId
        };
        let url = `${Constants.API.URL}client/place/delete`;
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

    public getAddress(userid) {
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'client/places/'+userid,
        {
           headers: headers,
           method: "GET"
    
        }).map(
          (res:Response)=> {return res.json();}
        );
    }
}