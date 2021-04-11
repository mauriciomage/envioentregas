import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PaymentPage } from '../payment/payment';
import { OrdersPage } from '../orders/orders';
import {TokenService} from '../../services/token.service';
/**
 * Generated class for the OrderTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-order-tracking',
  templateUrl: 'order-tracking.html',
})
export class OrderTrackingPage {
	title: string = 'Ofertas';
  	order_info: any[];
  	businesses: any[];
  	label_date:String = '';
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams, 
      public alertCtrl: AlertController, 
      public orderService: OrderServiceProvider,
      public tokenService: TokenService,
      private platform: Platform
    ) {
  	this.order_info = this.navParams.get("order_info");
  	this.businesses = this.navParams.get("businesses");

  		
  }

  ionViewDidLoad() {
    console.log(this.order_info);
    console.log(this.businesses);
  }


  //Aceptar Orden desde Seguimiento desde el Usuario que ve sus Ordenes
    presentAcceptOrder(packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
      let alert = this.alertCtrl.create({
        title: 'Aceptar Orden',
        subTitle: 'Te llegaran dos Codigos: Codigo de Envio al cual deberas darselo al Delivery cuando pase a retirar el Pedido. Y Codigo de Entrega, se lo indicaras al Destinatario para que se lo de al Delivery cuando éste entrege el Pedido.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('se arrepintio');
            }
          },
          {
            text: 'Aceptar',
            handler: data => {
               console.log('confirmo orden: '+idDelivery+" "+idUser+" "+idOrder+" "+idBusiness);
               this.orderService.acceptOrderPayment(packageName, cost, idDelivery, idUser, idOrder, idBusiness)
               .subscribe(
                  data=>{
                    if(data.error){
                       let alert = this.alertCtrl.create({
                        title : 'Error',
                        subTitle: data.error,
                        buttons: ['OK'],
                      });

                      alert.present(); 
                    }else{
                      // this.tokenService.sendAcceptPush(idDelivery).subscribe(console.log, console.log) 
                      this.navCtrl.push(PaymentPage, {link_pay: data['link_pay'], packageName: packageName, cost: cost, 
                        idDelivery: idDelivery, idUser: idUser, idOrder: idOrder, idBusiness: idBusiness});
                     //this.showLinkPayment(data['link_pay']);
                     //this.navCtrl.setRoot(OrderTrackingPage); 
                     

                    }
                    
                      
                  },  
                  err=>console.log(err)
                ); 
            }
          }
        ]
      });
      alert.present();
    }
    //Cancelar Orden desde Seguimiento desde el Usuario que ve sus Ordenes
    presentCancelOrder(orderId, deliveryId, userId, date, businessId) {
      let alert = this.alertCtrl.create({
        title: 'Cancelar Orden',
        subTitle: 'Una vez realizada la cancelación se notificará al Delivery',
        buttons: [
          {
            text: 'Volver',
            role: 'cancel',
            handler: data => {
              console.log('se arrepintio');
            }
          },
          {
            text: 'Cancelar Envío',
            handler: data => {
               //Comparamos si la fecha de retiro NO es HOY
               let q = new Date();
               let m = q.getMonth()+1;
               let d = q.getDay();
               let y = q.getFullYear();

               let date = new Date(y,m,d);
               let dateDelivery = new Date(date);

               if(date>dateDelivery){
                 //cancela pedido
                 let currentId = localStorage.getItem("user_id"); 
                 this.orderService.cancelOrder(deliveryId, userId, orderId, businessId, currentId)
               .subscribe(
                  data=>{
                    if (this.platform.is('cordova')) {
                      data = JSON.parse(data.data);
                    }
                    if(data.error){
                       let alert = this.alertCtrl.create({
                        title : 'Error',
                        subTitle: 'Intentalo mas tarde',
                        buttons: ['OK'],
                      });

                      alert.present(); 
                    }else{
                        this.navCtrl.push(OrdersPage); //se cancelo el pedido, retornamos a Ordes
                    }
                    
                      
                  },  
                  err=>console.log(err)
                ); 
               }else{
                 //no se puede cancelar el pedido
                 let alert = this.alertCtrl.create({
                    title : 'No vas a poder Cancelar',
                    subTitle: 'Debido a las Políticas y Condiciones de EnvioEntregas que usted ha aceptado, el Delivery transcurre HOY por lo tanto no es posible cancelarlo',
                    buttons: ['OK'],
                  });

                  alert.present(); 
               }
            }
          }
        ]
      });
      alert.present();
    }

    showLinkPayment(link){
    let alert = this.alertCtrl.create({
      title : 'Pagar Delivery',
      subTitle: 'Pagar: '+link,
      buttons: ['OK'],
    });

    alert.present();  
  }
}
