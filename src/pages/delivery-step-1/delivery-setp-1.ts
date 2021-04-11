import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { Delivery } from '../delivery/delivery.model';
import { DeliverySchedulerPage } from '../../pages/delivery-scheduler/delivery-scheduler';
import { DeliveryStep1Service } from './services/deliveryStep1Service.service';

declare var google:any;

@Component({
  selector: 'page-delivery-step-1',
  templateUrl: 'delivery-step-1.html',
})

export class DeliveryStep1Page {

  title:string;
  loading:any;
  array_user: any[];
  array_error: any[];
  user:string;
  days: Delivery[];

  lunes:string;
  martes:string;
  miercoles:string;
  jueves:string;
  viernes:string;
  sabado:string;
  domingo:string;

  monCalendar:{};
  tueCalendar:{};
  wedCalendar:{};
  thuCalendar:{};
  friCalendar:{};
  satCalendar:{};
  sunCalendar:{};

  //vars google autocomplete
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocomplete = { input: '', input2: '' };
  autocompleteItems = [];
  map: any;
  geocoder = new google.maps.Geocoder;


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private deliveryStep1Service: DeliveryStep1Service,
    private zone: NgZone,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {
    
  	if(this.navParams.get('user_id')){
      this.user = this.navParams.get('user_id');
    }
  }

  ionViewWillEnter() {
    this.presentToast();
    this.title = 'Disponibilidad';
    this.days = [
    
     {day: 'lunes', startHour: '', finishHour: '', status:''},
     {day: 'martes', startHour: '', finishHour: '', status:''},
     {day: 'miercoles', startHour: '', finishHour: '', status:''},
     {day: 'jueves', startHour: '', finishHour: '', status:''},
     {day: 'viernes', startHour: '', finishHour: '', status:''},
     {day: 'sabado', startHour: '', finishHour: '', status:''},
     {day: 'domingo', startHour: '', finishHour: '', status:''}

    ];
  }

  //functions autocomplete & update & select results Google
  updateSearchResults(){
      if (this.autocomplete.input == '') {
        this.autocompleteItems = [];
        return;
      }


       // set autocomplete options
      var options      = {
          input: this.autocomplete.input,
          types: ['cities'], //retrict result only address searches
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
      var icon = {
           url: "assets/imgs/marker_moderno.png", // url
           scaledSize: new google.maps.Size(35, 35), // scaled size
           origin: new google.maps.Point(0,0), // origin
           anchor: new google.maps.Point(0, 0) // anchor
      };
      this.autocompleteItems = [];
      this.autocomplete.input = item.description;

      this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
       
        if(status === 'OK' && results[0]){
          let position = {
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
          };
          localStorage.setItem("city_calendar", results[0].geometry.location);
        }
      })

    }



  saveDeliveryCalendar(){
    var days_agenda = [];
    var flag_validate = false;

    if(this.days[0]['startHour'] !== "" && this.days[0]['finishHour'] !== ""){
      this.monCalendar = {day: 'lunes', startHour: this.days[0]['startHour'], finishHour: this.days[0]['finishHour'], status: '1'}
      
        if(this.days[0]['startHour'] < this.days[0]['finishHour']){
            
            days_agenda.push(this.monCalendar);  
            flag_validate = true;
            console.log(this.monCalendar);
        
        }else{
          this.showAlertErrorTime(this.days[0]['day']);
          flag_validate = false;
        }

    }

    if(this.days[1]['startHour'] !== "" && this.days[1]['finishHour'] !== ""){
      this.tueCalendar = {day: 'martes', startHour: this.days[1]['startHour'], finishHour: this.days[1]['finishHour'], status: '1'}
      
      if(this.days[1]['startHour'] < this.days[1]['finishHour']){
            
            days_agenda.push(this.tueCalendar);  
            flag_validate = true;
            console.log(this.tueCalendar);
        
      }else{
        this.showAlertErrorTime(this.days[1]['day']);
        flag_validate = false;
      }

      
    }

    if(this.days[2]['startHour'] !== "" && this.days[2]['finishHour'] !== ""){
      
      this.wedCalendar = {day: 'miercoles', startHour: this.days[2]['startHour'], finishHour: this.days[2]['finishHour'], status: '1'}
      if(this.days[2]['startHour'] < this.days[2]['finishHour']){
            
          days_agenda.push(this.wedCalendar);  
          flag_validate = true;
          console.log(this.wedCalendar);
      
      }else{
        this.showAlertErrorTime(this.days[2]['day']);
        flag_validate = false;
      }

    }

    if(this.days[3]['startHour'] !== "" && this.days[3]['finishHour'] !== ""){
      
      this.thuCalendar = {day: 'jueves', startHour: this.days[3]['startHour'], finishHour: this.days[3]['finishHour'], status: '1'}
      if(this.days[3]['startHour'] < this.days[3]['finishHour']){
            
          days_agenda.push(this.thuCalendar);  
          flag_validate = true;
          console.log(this.thuCalendar);
      
      }else{
        this.showAlertErrorTime(this.days[3]['day']);
        flag_validate = false;
      }

    }


    if(this.days[4]['startHour'] !== "" && this.days[4]['finishHour'] !== ""){
      
      this.friCalendar = {day: 'viernes', startHour: this.days[4]['startHour'], finishHour: this.days[4]['finishHour'], status: '1'}
      if(this.days[4]['startHour'] < this.days[4]['finishHour']){
            
          days_agenda.push(this.friCalendar);  
          flag_validate = true;
          console.log(this.friCalendar);
      
      }else{
        this.showAlertErrorTime(this.days[4]['day']);
        flag_validate = false;
      }

    }


    if(this.days[5]['startHour'] !== "" && this.days[5]['finishHour'] !== ""){
      
      this.satCalendar = {day: 'sabado', startHour: this.days[5]['startHour'], finishHour: this.days[5]['finishHour'], status: '1'}
      if(this.days[5]['startHour'] < this.days[5]['finishHour']){
            
          days_agenda.push(this.satCalendar);  
          flag_validate = true;
          console.log(this.satCalendar);
      
      }else{
        this.showAlertErrorTime(this.days[5]['day']);
        flag_validate = false;
      }

    }


    if(this.days[6]['startHour'] !== "" && this.days[6]['finishHour'] !== ""){
      
      this.sunCalendar = {day: 'domingo', startHour: this.days[6]['startHour'], finishHour: this.days[6]['finishHour'], status: '1'}
      if(this.days[6]['startHour'] < this.days[6]['finishHour']){
            
          days_agenda.push(this.sunCalendar);  
          flag_validate = true;
          console.log(this.sunCalendar);
      
      }else{
        this.showAlertErrorTime(this.days[6]['day']);
        flag_validate = false;
      }

    }

    
 
   
      let city = 'cordoba';//localStorage.getItem('city_calendar');
        
        if(city !== '' && flag_validate){
          this.deliveryStep1Service.saveCalendarDelivery(this.user, days_agenda)
          .subscribe(
              data=>{
                if(this.platform.is('cordova')) {
                  data = JSON.parse(data.data);
                }
                if(data.error == 'EXIST'){
                   this.showErrorAlert(data.error);
                }else{
                  let scheduler = data['scheduler'];
                  let userid = data['user_id'];
                  this.navCtrl.push(DeliverySchedulerPage, {user_id: userid, scheduler: scheduler});
                }

              },
              err => {
                this.alertCtrl.create({
                  title : 'Error',
                  subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                  buttons: ['OK'],
                }).present();  
              }
            );  
        }else{

          this.showErrorAlertCity();
        }      
        

  }

  showErrorAlert(error = null){
    if(error == 'EXIST'){
        let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Ya registro su Disponibilidad. Vaya a \'Mi Perfil\' para editarla si lo desea.',
        buttons: ['OK'],
      });

      alert.present();  
    }else{
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
        buttons: ['OK'],
      });

      alert.present();  
    }
  }

  showErrorAlertCity(){

    let alert = this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Debes indicar la ciudad en la que estarás Disponible.',
      buttons: ['OK'],
    });

    alert.present();

  }

   showAlertErrorTime(day){

    let alert = this.alertCtrl.create({
      title : 'Error en día '+day.toUpperCase(),
      subTitle: 'La fecha hasta debe ser MAYOR con respecto a la fecha DESDE.',
      buttons: ['OK'],
    });

    alert.present();

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Indica Disponibilidad Desde y Hasta, solo de los días que puedas.',
      duration: 4500,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}