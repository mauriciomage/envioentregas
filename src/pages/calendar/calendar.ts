import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController  } from 'ionic-angular';
import { CalendarService } from './services/calendar.service';
import { PricePage } from '../price/price';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';
import { NewOrderPage } from '../new-order/new-order';

declare var FCMPlugin;
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})

export class CalendarPage {
	title:string;
	date: string;
  type: Date;
  realCost : string = '';
  loading:any;
  isClient: boolean = false;
  user_id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public nav:NavController, 
    public calendarService: CalendarService,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private fcm: FCM) {
  }

  ionViewWillEnter() {
    this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
    this.title = this.isClient ? 'Indique Fecha 4/5' : 'Indique Fecha 5/6';
    this.user_id = localStorage.getItem('user_id');
    if (!this.user_id) {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(NewOrderPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
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
    localStorage.removeItem('hour');
    localStorage.removeItem('cost_stipulated');
    localStorage.removeItem('service_stipulated');
  }
 
  onChange($event) {
    this.storage.set("maxDeliveryDate", $event);
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: this.isClient ? 'Ultimo paso...' : 'Calculando costo estimativo...'
    });
    this.loading.present();
  }

  sendDataStep5() {
    var hour, maxDeliveryDate, postalCode, dimensions;
    this.storage.get('mommentPickup').then((val) => {
        hour = val;
      });
    this.storage.get('maxDeliveryDate').then((val) => {
      maxDeliveryDate = val;
      if (hour == "" || hour == null ||  maxDeliveryDate == "" || maxDeliveryDate == null) {
    
        this.alertCtrl.create({
          title : 'Validacion',
          subTitle: "Debe indicar Dia y Momento del Dia",
          buttons: ['OK'],
        }).present();
      } else {
          this.presentLoadingDefault(); 
          this.storage.set("date",maxDeliveryDate);
          
            switch (hour) {
              case "morning":
                this.storage.set("hour",'mañana');    
                break;
              case "afternoon":
                this.storage.set("hour",'tarde');    
              break;
              
              default:
                this.storage.set("hour",'noche');   
                break;
            }
            this.storage.get('postal_code').then((val) => {
              postalCode = val;
            });

            this.storage.get('dimensions').then((val) => {
            dimensions = val;
            this.calendarService.getStipulatedPrice(postalCode, dimensions)
              .subscribe(
                data => {
                    if (data.error) {
                      this.loading.dismiss();
                      this.showErrorAlert();
                    } else {
                      let cost_string = data.price_stipulated;
                      cost_string = cost_string.toFixed(2);

                      let service_string = data.service_stipulated;
                      service_string = service_string.toFixed(2);
                      
                      this.storage.set("cost_stipulated", cost_string);
                      this.storage.set("service_stipulated", service_string);
                      
                      let real_cost = parseFloat(data.price_stipulated) - parseFloat(data.service_stipulated);
                      this.realCost= real_cost.toFixed(2);
                      
                      this.storage.set("real_cost", this.realCost);
                      
                      this.loading.dismiss();
                      this.nav.push(PricePage);
                  }
                },
                err => {
                  this.loading.dismiss();
                  this.alertCtrl.create({
                    title : 'Error',
                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                    buttons: ['OK'],
                  }).present();  
                }
              );
          });
        }  
    });
  }

  presentMommentPickup() {
     let actionSheet = this.actionSheetCtrl.create({
       title: 'En que momento podrás?',
       buttons: [
         {
           text: 'En la mañana',
           role: 'morning',  
           handler: () => {
             this.storage.set("mommentPickup", "morning");
             document.getElementById('pickup_momment').innerHTML = 'EN LA MAÑANA';
           }
         },
         {
           text: 'En la tarde',
           handler: () => {
             this.storage.set("mommentPickup", "afternoon");
             document.getElementById('pickup_momment').innerHTML = 'EN LA TARDE';
           }
         },
         {
           text: 'En la noche',
           handler: () => {
             this.storage.set("mommentPickup", "night");
             document.getElementById('pickup_momment').innerHTML = 'EN LA NOCHE';
           }
         },
         {
           text: 'Volver',
           role: 'cancel',
           handler: () => {
             console.log("cancelo pick momment");
           }
         }
       ]
     });

     actionSheet.present();
   }

  showErrorAlert(){
    let alert = this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error, vuelve a cargar la Orden',
      buttons: ['OK'],
    });

    alert.present();  
  }
}
