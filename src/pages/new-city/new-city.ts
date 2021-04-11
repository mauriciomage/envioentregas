import { Component, NgZone } from '@angular/core';
import { AlertController, ToastController, LoadingController, ViewController, NavController, Platform, NavParams  } from 'ionic-angular';
import { NewCityService } from './services/newCity.service';
import { DeliverySchedulerPage } from '../delivery-scheduler/delivery-scheduler';
import * as Constants from  '../../constants/constants';

declare var google:any;

@Component({
  selector: 'page-new-city',
  templateUrl: 'new-city.html',
})

export class NewCityPage {
map: any;
geocoder = new google.maps.Geocoder;
loading:any;
title: string;
delivery: any[]; 
places: any[] = [];
userId: any;
autocomplete = { input: ''};
autocompleteItems = [];
marker_city:any;
GoogleAutocomplete = new google.maps.places.AutocompleteService();
isClient: boolean;
placeExist: boolean;
placeholder: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private newCityService: NewCityService,
    private viewCtrl: ViewController,
    private toast: ToastController,
    private zone: NgZone,
    private plarform: Platform
  ) { }
  
  ionViewWillEnter() {
    this.isClient = this.navParams.get('isClient') === true ? true : false;
    this.title = this.isClient ? 'Nueva Dirección' : 'Nueva Ciudad';
    this.placeholder = this.isClient ? 'Indica la direccion' : 'Indica la ciudad';
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");
    this.userId = localStorage.getItem('user_id');
    this.initMap(lat,lng);
    this.placeExist = false;
  }

  private initMap(latitude,longitude) {
      var point = {lat: +latitude, lng: +longitude};
      let divMap = (<HTMLInputElement>document.getElementById('map-city'));
      this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 14,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: true
      });

      const icon = {
        url: "assets/imgs/marker_moderno.png", // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      };
      
      const marker = new google.maps.Marker({
        position: point,
        map: this.map,
        icon: icon,
        zoom: 11
      });

      this.map.setCenter(point);
      this.toast.create({
        message: 'Indica tus sucursales',
        duration: 3000,
        position: 'middle'
      }).present();
      
  } 

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }


    var options = {
        input: this.autocomplete.input,
        types: this.isClient ? ['address'] : ['(cities)'], 
        componentRestrictions: {country: 'ar'},
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
    var icon = {
      url: "assets/imgs/marker_moderno.png", 
      scaledSize: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0,0), 
      anchor: new google.maps.Point(0, 0) 
    };

    this.autocompleteItems = [];
    this.autocomplete.input = item.description;

    if(this.marker_city)
    this.marker_city.setMap(null);

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };

        this.marker_city = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          icon: icon
        });
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  saveCity(){
    let user_id = localStorage.getItem('user_id');
    let arrAutocompleteInput = this.autocomplete.input.split(',');
    let city = arrAutocompleteInput[0].trim();

    if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1 ) {
      this.presentLoading();
      this.newCityService.saveCity(user_id, this.autocomplete.input, city)
      .subscribe(
        data=>{
          if (this.plarform.is('cordova')) {
            data = JSON.parse(data.data);
          }
          this.loading.dismiss();
          if(data['delivery']){
            this.delivery = data['delivery'];
            localStorage.setItem('isDelivery', 'true');
            this.toast.create({
              message: 'Ahora podrás ingresar y actualizar la Agenda en esa ciudad',
              duration: 4000,
              position: 'middle'
            });
            this.navCtrl.push(DeliverySchedulerPage);
          }else if(data['error'] == 'DELIVERY_EXIST'){
            this.showErrorNew('city');
          }
        },
        err=>this.showError(err)
      );
    } else {
      this.alertCtrl.create({
        title : ':( Lo Sentimos!',
        subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
        buttons: ['OK'],
      }).present();
    }
  }

  saveAddress() {
    if (this.userId) {
      // if it is already a user
      let arrAutocompleteInput = this.autocomplete.input.split(',');
      let city = arrAutocompleteInput[1].trim();
      if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1 ) {
        this.presentLoading();
        this.newCityService.saveAddress(this.userId, this.autocomplete.input)
        .subscribe(
          data=>{
            if (this.plarform.is('cordova')) {
              data = JSON.parse(data.data);
            }
            this.loading.dismiss();
            if (data['success']) {
              this.toast.create({
                message: 'Sucursal agregada correctamente',
                duration: 4000,
                position: 'middle'
              }).present();
              this.viewCtrl.dismiss();
            } 
            else if(data['error'] === 'already_exist') {
              this.showErrorNew('address');
            }
          },
          err=>this.showError(err)
        );
      } else {
        this.alertCtrl.create({
          title : ':( Lo Sentimos!',
          subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
          buttons: ['OK'],
        }).present();
      }
    } else {
      // if it is a new user
      let address = this.autocomplete.input;
      let arrSourceAddress = address.split(',');
      let city = arrSourceAddress[1].trim();
      if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1 ) {
        this.placeExist = this.places.find((item) => item === address );
        if (this.placeExist) {
          this.showErrorNew('address');
        } else {
          this.places.push(address);
          this.autocomplete.input = null;
          if (this.places.length === 1 && !this.placeExist) {
            this.toast.create({
              message: 'Agrega todas las sucursales que desees, al terminar selecciona \'Finalizar\'',
              duration: 4000,
              position: 'middle'
            }).present();
          }
        }   
      } else {
        this.alertCtrl.create({
          title : ':( Lo Sentimos!',
          subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
          buttons: ['OK'],
        }).present();
      }
    }
  }

  deleteAddress(address) {
    for (let a = 0; a < this.places.length; a++) {
      if (this.places[a] === address) {
        this.places.splice(a, 1);
      }
    }
  }
  
  saveAndClose() {
    this.alertCtrl.create({
      title: 'Confirmar Sucursales',
      message: 'Si Finalizas y te arrepientes, tendras que volver a cargar nuevamente, finalizaste?',
      buttons: [
        {
          text: 'No, no he finalizado',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Si, finalicé',
          handler: () => {
            this.viewCtrl.dismiss();
            localStorage.setItem('places', JSON.stringify(this.places));
          }
        }
      ]
    }).present();
  }

  closeModal() {
      this.viewCtrl.dismiss();
  }

  public showErrorNew(type){
      let alert = this.alertCtrl.create({
      title : 'Error',
      subTitle: type === 'address' ? 'La dirección que intentas agregar, ya la tienes agendada' : 'La ciudad que intentas agregar, ya la tienes agendada.',
      buttons: ['OK'],
    });

    alert.present();  
  }

  public showError(err){
    this.loading ? this.loading.dismiss() : this.loading;
    let alert = this.alertCtrl.create({
    title : 'Error',
    subTitle: 'Ha ocurrido un error en la conexion, intente nuevamente mas tarde',
    buttons: ['OK'],
  });

  alert.present();  
}

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Guardando...'
    });
    this.loading.present();

  }
    
}