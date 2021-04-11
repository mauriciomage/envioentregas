import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { LoginPage } from '../login/login';
import { MessageDetailPage } from '../message-detail/message-detail';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';
import { SigninPage } from '../signin/signin';
import { ViewImagePage } from '../view-image/view-image';


/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var FCMPlugin;
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

	title:string = 'MIS MENSAJES';
	orders: any[] = [];
  messages_quantity: any[] = [];
	pushPage: any;
	delivery_orders: any[] = [];
	USER_LOGGED: Boolean = false;
	FROM_LOGIN: Boolean = false;
	idorder: number;
  counter:number = 0;
  loading: any;
  actions:string;
  logged:boolean = true;
  rating: string;
  SigninPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  	public orderService: OrderServiceProvider,
    public alertCtrl: AlertController,
    private fcm: FCM,
    private modalCtrl: ModalController
    ) {
    this.actions = 'send';
    this.SigninPage = SigninPage;
  }

  ionViewWillEnter() {
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
     if(localStorage.getItem("logged") == 'true'){
         this.logged = true;
         let user_id = localStorage.getItem("user_id");
         this.rating = localStorage.getItem("rating");
         this.getOrdersOnNegotiation(user_id);
      }else{
         this.logged = false;
      }


  }

  getOrdersOnNegotiation(user){
      this.orderService.getNegotiationOrders(user)
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
            this.orders = data['results'];
          }
        },
        err => {
          this.alertCtrl.create({
            title : 'Error',
            subTitle: 'Ha ocurrido un error. Compruebe su conexión',
            buttons: ['OK'],
          }).present();  
        },
      );
      this.getDeliveryOrdersByUser(user);
  }

  getDeliveryOrdersByUser(user){
      this.orderService.getDeliveryOrders(user)
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
            this.delivery_orders = data['results'];
          }
        },
        err => {
          this.alertCtrl.create({
            title : 'Error',
            subTitle: 'Ha ocurrido un error. Compruebe su conexión',
            buttons: ['OK'],
          }).present();  
        },
      );
  }

  goMessages(business_id, action, status = null){
    this.navCtrl.push(MessageDetailPage, {business_id: business_id, action: action, status: status})
  }

  goLogin(){
   this.navCtrl.push(LoginPage, {list_messages: true})
  }

  viewPhoto(photoName){
    let imageModal = this.modalCtrl.create(ViewImagePage, { img: photoName });
     imageModal.present();
  }

}
