import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { DestinationPage  } from '../destination/destination';
import { Storage } from '@ionic/storage';
import * as Constants from  '../../constants/constants';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';
import { PlacesService } from '../places/services/places.service';
import { NewOrderPage } from '../new-order/new-order';

declare var google:any;
declare var FCMPlugin;

@Component({
  selector: 'page-source',
  templateUrl: 'source.html',
})


export class SourcePage {
  map: any;
  geocoder = new google.maps.Geocoder;

  markers = [];
  marker:any;
  title: string;

  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems = [];
  isClient: boolean = false;
  isGoogleBarVisible: boolean = false;
  user_id;
  places: any[] = [];
  loading: any;
  lat;
  lng;

  constructor(
    private navCtrl: NavController,
    private placesService: PlacesService,
    private alertCtrl: AlertController,
    private zone: NgZone,
    private nav:NavController,
    private storage: Storage,
    private fcm: FCM
  ) {}

  ionViewWillEnter() {
    this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
    this.title = this.isClient ? 'Lugar de Retiro: 2/5' : 'Lugar de Retiro 3/6';
    this.user_id = localStorage.getItem('user_id');
    if (!this.user_id) {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(NewOrderPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
    this.cleanStorage();

    if (this.isClient) {
      this.isGoogleBarVisible = false;
      this.getClientAddress();
    } else {
      this.places = [];
      this.isGoogleBarVisible = true;
      this.dialogCurrentAddress();
    }
    
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
    this.lat = localStorage.getItem("lat");
    this.lng = localStorage.getItem("lng");
    this.initMap(this.lat, this.lng);
   }

  private dialogCurrentAddress() {
    this.alertCtrl.create({
      title: '¿Lo van a retirar donde estás en éste momento?',
      message: 'Indica "Si", si quieres indicar que lo pasen a buscar en tu ubicación actual!',
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
                let point = {lat: +this.lat, lng: +this.lng};
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

                let latlng = new google.maps.LatLng(+this.lat, +this.lng);
                this.geocoder.geocode({
                    'latLng': latlng
                }, 
                function (results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                      if (results[1]) {
                          let address = results[0].formatted_address;
                          this.storage.set('source_lat', this.lat);
                          this.storage.set('source_lng', this.lng);
                          this.storage.set('address', address);

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
      }).present();
  }

  private initMap(latitude,longitude) {
      var point = {lat: +latitude, lng: +longitude};
      let divMap = (<HTMLInputElement>document.getElementById('map'));
      this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 15,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: true
      });
  }

  private getClientAddress() {
    this.placesService.getAddress(this.user_id)
  	.subscribe(
      data=>{
        if (data['error']) {
           this.showErrorAlert();
        } else {
           this.places = data['places'];
        }
      },
      err => {
        this.loading.dismiss();
        this.showErrorAlert();
      }
    );
  }

  private showAddressOnMap(address){
    this.geocoder.geocode({'address': address}, (results, status) => {
      if(status == google.maps.GeocoderStatus.OK){
        this.storage.set('source_lat',  results[0].geometry.location.lat());
        this.storage.set('source_lng',  results[0].geometry.location.lng());
      }
      const icon = {
          url: "assets/imgs/marker_moderno.png",
          scaledSize: new google.maps.Size(35, 35),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 0)
      };
      const marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.map,
        icon:icon
      });
      
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }

      this.markers.push(marker);
      this.map.setCenter(results[0].geometry.location);
    });
  }

  private cleanStorage() {
    this.storage.remove('source_address');
    this.storage.remove('source_lat');
    this.storage.remove('source_lng');
  }

  showErrorAlert(){
    this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
      buttons: ['OK'],
    }).present();
  }	

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }

    // set autocomplete options
   var options = {
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

          this.storage.set('source_address',  item.description);

          var icon = {
              url: "assets/imgs/marker_moderno.png", // url
              scaledSize: new google.maps.Size(35, 35), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
          };

          let marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
            icon:icon
          });

          for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
          }

          this.markers.push(marker);
          this.map.setCenter(results[0].geometry.location);
        }
      })


      this.geocoder.geocode({'address': item.description}, (results, status) => {
        if(status == google.maps.GeocoderStatus.OK){
          this.storage.set('source_lat',  results[0].geometry.location.lat());
          this.storage.set('source_lng',  results[0].geometry.location.lng());
        }
      })


  }

  sendDataStep3() {
    let source_address = null;
    let source_lat = null; 
    let source_lng = null;

    this.storage.get('source_address').then((val) => {
      source_address = val;
    });

    this.storage.get('source_lat').then((val) => {
      source_lat = val;
    });

    this.storage.get('source_lng').then((val) => {
      source_lng = val;
      if (source_address !== null) {
        let arrSourceAddress = source_address.split(',');
        let city = arrSourceAddress[1].trim();
        if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
          if (source_lat !== null && source_lng !== null) {
            this.nav.push(DestinationPage);
          } else {
              this.alertCtrl.create({
                title : 'Validacion',
                subTitle: "Debes indicar por donde se retira",
                buttons: ['OK'],
              }).present();
          }
        } else {
          this.alertCtrl.create({
            title : ':( Lo Sentimos!',
            subTitle: this.isClient ? 'Debes indicar la Sucursal' : 'Debes indicar por donde se retira',
            buttons: ['OK'],
          }).present(); 
        }
      } else {
          this.alertCtrl.create({
            title : 'Validacion',
            subTitle: this.isClient ? 'Debes indicar la Sucursal' : 'Debes indicar por donde se retira',
            buttons: ['OK'],
          }).present();
      }
    });
  }

  onChangePlace(address) {
    this.autocomplete.input = address;
    this.storage.set('source_address',  address);
    this.showAddressOnMap(address);
  }
}
