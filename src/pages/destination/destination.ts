import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform, AlertController  } from 'ionic-angular';
import {GeolocationService} from '../../services/geolocation.service';
import { CalendarPage  } from '../calendar/calendar';
import { Storage } from '@ionic/storage';
import * as Constants from  '../../constants/constants';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';
import { NewOrderPage } from '../new-order/new-order';

declare var google:any;
declare var FCMPlugin;

@Component({
  selector: 'page-destination',
  templateUrl: 'destination.html',
})


export class DestinationPage {
  map: any;
  geocoder = new google.maps.Geocoder;
  markers = [];
  marker:any;
  title: string;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems = [];
  isClient: boolean = false;
  userId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocator: GeolocationService,
    public alertCtrl: AlertController,
    public zone: NgZone,
    public nav:NavController,
    private storage: Storage,
    private fcm: FCM
  ) {



  }
  ionViewWillEnter() {
    this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
    this.userId = localStorage.getItem('user_id');
    if (!this.userId) {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(NewOrderPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
    this.title = this.isClient ? 'Lugar de Entrega 3/5' : 'Lugar de Entrega 4/6';
    if (typeof FCMPlugin != 'undefined') {
      this.fcm.onNotification().subscribe((data) => {
          if (data.wasTapped) {
              let params = JSON.parse(data.params);
              switch(params.page) {
                  case 'goOrder':
                      this.navCtrl.push(GoOrderPage, {order_id: params.orderId, getOrder: true});
                      break;    
                  default:
                  break;
              }
          }  
      });
    }
  	  //obtenemos ubicacion del usuario
      var latlng = this.geolocator.getCurrentLocation();
      var lat = localStorage.getItem("lat");
      var lng = localStorage.getItem("lng");

      let alertAreSure = this.alertCtrl.create({
        title: '¿Lo van a enviar donde estás en éste momento?',
        message: 'Indica "Si", si quieres indicar que lleven al pedido a tu ubicación actual!',
        buttons: [
          {
            text: 'No, otra dirección.',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: 'Si!',
            handler: () => {
                  let point = {lat: +lat, lng: +lng};
                  
                  var icon = {
                       url: "assets/imgs/marker_moderno.png", // url
                       scaledSize: new google.maps.Size(35, 35), // scaled size
                       origin: new google.maps.Point(0,0), // origin
                       anchor: new google.maps.Point(0, 0) // anchor
                  };

                  let marker = new google.maps.Marker({
                    position: point,
                    map: this.map,
                    icon: icon
                  });
                  this.markers.push(marker);
                  this.map.setCenter(point);

                    let latlng = new google.maps.LatLng(+lat, +lng);
                    this.geocoder.geocode({
                        'latLng': latlng
                    }, function (results, status) {
                        if (status ==
                            google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                let address = results[0].formatted_address;

                                  this.storage.set('destination_lat', lat);
                                  this.storage.set('destination_lng', lng);
                                  this.storage.set('destination_address', address);

                            } else {
                                alert('Quizas estás en un área de poca cobertura de GPS, intenta colocando la dirección manualmente');
                            }
                        } else {
                            alert('Intenta nuevamente, recuerda tener GPS activado.');
                        }
                    });

            }
          }
        ]
      });
      alertAreSure.present();

    this.initMap(lat,lng);
   }


  private initMap(latitude,longitude) {
      var point = {lat: -31.4137274, lng: -64.1655693};
      let divMap = (<HTMLInputElement>document.getElementById('map-dest'));
      this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 15,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: true
      });
  }


  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }

    // set autocomplete options
   var options      = {
       input: this.autocomplete.input,
       types: ['address'], //retrict result only address searches
       componentRestrictions: {country: 'ar'}, // restrict results to argentina
   };

   
    this.GoogleAutocomplete.getPlacePredictions(options,
    (predictions, status) => {
    	if(predictions){
	      this.autocompleteItems = [];
	      this.zone.run(() => {
	        predictions.forEach((prediction) => {
	          	this.autocompleteItems.push(prediction);
	        });
	      });
	    }
    });
  }


selectSearchResult(item){

    this.autocompleteItems = [];
    this.autocomplete.input = item.description;

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };

        this.storage.set("destination_address", item.description);

        var postalCode = '';

         for(var i=0; i<results[0].address_components.length; i++){
             let element = results[0].address_components[i].types[0];
            if(element == 'postal_code'){
              postalCode = results[0].address_components[i].long_name;
            }else{
              postalCode = '5000';
            }
         }

          this.storage.set('postal_code', postalCode);

        var icon = {
             url: "assets/imgs/marker_moderno.png", // url
             scaledSize: new google.maps.Size(35, 35), // scaled size
             origin: new google.maps.Point(0,0), // origin
             anchor: new google.maps.Point(0, 0) // anchor
        };

        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          icon: icon
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })

    this.geocoder.geocode({'address': item.description}, (results, status) => {
      if(status == google.maps.GeocoderStatus.OK){
        this.storage.set("destination_lat", results[0].geometry.location.lat());
        this.storage.set("destination_lng", results[0].geometry.location.lng());
      }
    })
  }

    public sendDataStep4(){
      var destination_address, destination_lat, destination_lng, source_address;
      this.storage.get('destination_address').then((val) => {
        destination_address = val;
      });

      this.storage.get('destination_lng').then((val) => {
        destination_lng = val;
      });

      this.storage.get('destination_lng').then((val) => {
        destination_lng = val;
      });

      this.storage.get('source_address').then((val) => {
        source_address = val;

        let arrSourceAddress = destination_address.split(',');
        let city = arrSourceAddress[1].trim();
        if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
          if (destination_address !== null && destination_lat !== null && destination_lng !== null) {
            if (source_address == destination_address) {
              this.alertCtrl.create({
                title : 'Validacion',
                subTitle: "Las direcciones de Origen y Destino no pueden ser iguales",
                buttons: ['OK'],
              }).present();
            } else {
                this.nav.push(CalendarPage);
            }
          } else {
            this.alertCtrl.create({
              title : 'Validacion',
              subTitle: "Debes indicar donde se envia",
              buttons: ['OK'],
            }).present();
          }
        } else {
          this.alertCtrl.create({
            title : ':( Lo Sentimos!',
            subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
            buttons: ['OK'],
          }).present();
        }
      });
    }
}
