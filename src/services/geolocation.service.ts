import {Injectable} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, ToastController  } from 'ionic-angular';


@Injectable()
export class GeolocationService{
	fullAddress: string;	
	constructor(private geolocation: Geolocation,public alertCtrl: AlertController, public toastCtrl: ToastController) {}

		public getCurrentLocation(){
			this.geolocation.getCurrentPosition().then((resp) => {
			 
			 let lat = resp.coords.latitude;
			 let lng = resp.coords.longitude;
			 
			 var latlng = [];
			 latlng.push(lat,lng);
			 
			 localStorage.setItem("lat",''+lat);
			 localStorage.setItem("lng",''+lng);
			 
		}).catch((error) => {
					
			let toast = this.toastCtrl.create({
		      message: 'No se ha podido encontrar la ubicación actual',
		      duration: 2500
		    });
		    toast.present();

		});		
		

		}

}