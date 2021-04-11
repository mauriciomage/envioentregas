import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from  '../../../constants/constants';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from 'ionic-angular';
import { from } from 'rxjs/observable/from';

@Injectable()
export class DeliveryDaysService {
  
  constructor(
    private http: Http,
    private httpNative: HTTP,
    private platform: Platform
  ) {}

  	public saveCalendarDay(calendar_id, hour_start, hour_finish){
        let data = {
          calendarid: calendar_id,
          hourstart: hour_start,
          hourfinish: hour_finish
        };
        let url = `${Constants.API.URL}delivery/day/calendar`;
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
    
    public getSchedulerDays(delivery) {
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this.http.get(Constants.API.URL+'delivery/days/'+delivery,
        {
           headers: headers,
           method: "GET"
    
        }).map(
          (res:Response)=> {return res.json();}
        );
    
    }

    public deleteDayCalendar(id){
      let data = {
          calendarid: id,
      };
      let headers = new Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
      let options = new RequestOptions({ headers: headers });
  
      return this.http.post(Constants.API.URL+'delivery/day/delete', data, options)
      .map((res:Response)=> {return res.json();});
  }
}