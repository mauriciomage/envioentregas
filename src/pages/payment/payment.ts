import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { HomePage} from '../home/home';
import {TokenService} from '../../services/token.service';


/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
	link_pay: string = '';
	title: string = 'Pagar Delivery';

	packageName:string;
	cost:string;
	idDelivery:string;
	idUser:string;
	idOrder:string;
	idBusiness:string;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private alertCtrl: AlertController,
  	  public orderService: OrderServiceProvider,
      public tokenService: TokenService,
      private platform: Platform

    ) {
  	this.link_pay = this.navParams.get("link_pay");
  	//Luego quitarlas - cuando se arrgle la BACK URL de MP con su confirmacion de PAGO
  	this.packageName = this.navParams.get("packageName");
  	this.cost = this.navParams.get("cost");
  	this.idDelivery = this.navParams.get("idDelivery");
  	this.idUser = this.navParams.get("idUser");
  	this.idOrder = this.navParams.get("idOrder");
  	this.idBusiness = this.navParams.get("idBusiness");
  	
  }

  ionViewDidLoad() {
    
  }

  acceptOrder(){
	   this.orderService.acceptOrder(this.packageName, this.cost, this.idDelivery, this.idUser, this.idOrder, this.idBusiness)
      .subscribe(
        data=>{
          if (this.platform.is('cordova')) {
            data = JSON.parse(data.data);
          }
          if(data.accepted == 'false'){
              let alert = this.alertCtrl.create({
              title : 'Error',
              subTitle: 'Se ha producido un error, algo ha salido mal.',
              buttons: ['OK'],
            });

            alert.present(); 
          }else{
            this.navCtrl.push(HomePage); 
          }
        },  
        err=>console.log(err)
      ); 
  }
}
