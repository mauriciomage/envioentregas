import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SourcePage  } from '../source/source';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';
import { NewOrderPage } from '../new-order/new-order';

declare var FCMPlugin;
@Component({
  selector: 'page-transport',
  templateUrl: 'transport.html',
})
export class TransportPage {

	sourcePage = SourcePage;
	title: string = "TRANSPORTE 2/6";
	userId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: NavController,
    public alertCtrl: AlertController,
    private storage: Storage,
    private fcm: FCM) {
  }

  ionViewWillEnter() {
    this.userId = localStorage.getItem('user_id');
    if (!this.userId) {
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
  }

  public sendDataStep2(req){
   var vehicle = req.value.vehicle;
   var weight = req.value.weight;
   
    if(vehicle == "" || vehicle == null)
    {
     
	      let alert = this.alertCtrl.create({
	      title : 'Validacion',
	      subTitle: "Debes Seleccionar un Vehiculo",
	      buttons: ['OK'],

    	});
      
      	alert.present();  

    }
    else if(weight == null || weight == ""){
       let alert = this.alertCtrl.create({
        title : 'Validacion',
        subTitle: "Debes Indicar el Peso del paquete",
        buttons: ['OK'],

      });
      
        alert.present();  
    }
    else{

    	if(vehicle == 'caminando'){

        this.storage.set('dimensions', '15x15x15,'+weight);
        this.storage.set('size', 'XS');
      
      }
    	 	

	 	  if(vehicle == 'bicicleta'){
        
        this.storage.set('dimensions', '20x20x20,'+weight);
        this.storage.set('size', 'S');
     
      }
        

      if(vehicle == 'auto'){

        this.storage.set('dimensions', '30x30x30,'+weight);
        this.storage.set('size', 'M');
      }
        

      if(vehicle == 'colectivo'){

        localStorage.setItem("dimensions",'20x20x20,'+weight);    
        this.storage.set('dimensions','20x20x20,'+weight);
        this.storage.set('size', 'L');
      }

      if(vehicle == 'furgon'){

        this.storage.set('dimensions','40x40x40,'+weight);
        this.storage.set('size', 'XL');
      }  
        

      this.storage.set('vehicle', vehicle);
    	this.nav.push(SourcePage);
    }

    
  }

}
