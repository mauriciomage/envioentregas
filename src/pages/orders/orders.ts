import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController, Events, ToastController, Platform } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { GoOrderPage } from '../go-order/go-order';
import { LoginPage } from '../login/login';
import { ViewImagePage } from '../view-image/view-image';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { SigninPage } from '../signin/signin';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { NewOrderPage } from '../new-order/new-order';
import { MessageDetailPage } from '../message-detail/message-detail';
import { HandleNotificationService } from '../../services/handle-notification.service';
import { GoOrderService } from '../go-order/services/goOrder.service';
import { TokenService } from '../../services/token.service';
import { HomePage } from '../home/home';
import { FCM } from '@ionic-native/fcm/ngx';

declare var FCMPlugin;
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  actions:string;
  orderid:any;
  businessid:any;
  statusbusiness:any;
  SigninPage: any;
  orders: any[] = [];
  startPhotos: any[] = [];
  startPhotos_DELIVERY: any[] = [];
  businesses_quantity: any[] = [];
  declined_offerts: any;
  businesses: any[];
  tracking: any[];
  business_users: any[];
  business_delivery: any[];
  pushPage: any;
  delivery_orders: any[] = [];
  USER_LOGGED: Boolean = false;
  FROM_LOGIN: Boolean = false;
  logged: boolean = false;
  rating: string;
  loading: any;
  title:string = 'MIS PEDIDOS';
	url_img_orders = 'https://envioentregas.com/img/orders/';
  idorder: number;
  userData = null;
  newOrderPage: any;
  newDeliveryNotifyPage: any;
  order_info: any[];
  constructor(
      public events: Events,
      public navCtrl: NavController,
      public navParams: NavParams,
      public orderService: OrderServiceProvider,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController,
      private modalCtrl: ModalController,
      public facebook: Facebook,
      private platform: Platform,
      private fcm: FCM,
      private goOrderService: GoOrderService,
      private tokenService: TokenService
    ) {
    this.idorder = this.navParams.get('id_order');
    this.actions = 'send';
    this.pushPage = LoginPage;
    this.SigninPage = SigninPage;
    this.newOrderPage = NewOrderPage;
    this.newDeliveryNotifyPage = HomePage;

    if(navParams.get("showTab") == 'deliveries' ){
      this.actions = 'delivery';
    }

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

         let user_id = localStorage.getItem("user_id");
         this.rating = localStorage.getItem("rating");
         this.logged = true;

          this.getOrdersByUser(user_id);
          this.getDeliveryOrdersByUser(user_id);
          if(this.idorder > 0){
            this.goOrder(this.idorder, null, null);
          }
      }else{
        this.logged = false;
      }

  }

  loginWithFB(){

    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name, last_name, picture.width(720).height(720).as(picture_large)', []).then(profile => {

        this.userData = {
          email: profile['email'],
          first_name: profile['first_name'],
          last_name: profile['last_name'],
          picture: profile['picture_large']['data']['url'],
          username: profile['name']
        };

        this.orderService.checkOrSaveUserFb(this.userData.username, this.userData.email,
          this.userData.picture, this.userData.first_name, this.userData.last_name)
          .subscribe(
            data => {
              if (this.platform.is('cordova')) {
                data = JSON.parse(data.data);
              }
              this.events.publish('user:logged', data, Date.now());
              localStorage.setItem("logged", 'true');
              localStorage.setItem("user_id", data['user'].id);
              localStorage.setItem("email", data['user'].email);
              localStorage.setItem("photo_fb", data['user'].photo);
              localStorage.setItem("fname_logged", data['user'].fname);
              localStorage.setItem("lname_logged", data['user'].lname);
              localStorage.setItem("verified", data['user'].verified);

              this.navCtrl.push(PreProfilePage);
            },
            err => this.showErrorAlertFB(err)
          );
      });
    });
  }

  showErrorAlertFB(type){
    if(type=='ERROR_LOGIN'){
        let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'El Usuario y/o Contraseña, son incorrectos',
        buttons: ['OK'],
      });

      alert.present();
    }else{
        let alert = this.alertCtrl.create({
        title : 'Error SERVICIO',
        subTitle: JSON.stringify(type),
        buttons: ['OK'],
      });

      alert.present();
    }

  }
    //===========LOADING CONTROLLER==============
      presentLoadingOfferts() {
      this.loading = this.loadingCtrl.create({
        content: 'Cargando Ofertas...'
      });

      this.loading.present();

    }
    //==========LOADING CONTROLLER=============

    //===========LOADING CONTROLLER==============
      presentLoadingTracking() {
      this.loading = this.loadingCtrl.create({
        content: 'Cargando Seguimiento...'
      });

      this.loading.present();

    }
    //==========LOADING CONTROLLER=============

    viewPhoto(order){
      let imageModal = this.modalCtrl.create(ViewImagePage, { img: order.startPhoto, name: order.name, description: order.description });
       imageModal.present();
    }

    getOrdersByUser(user){
       this.orderService.getAllOrders(user)
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
              this.startPhotos = [];
              for(let f= 0 ; f<this.orders.length; f++){
                if(this.orders[f].startPhoto !== "" && this.orders[f].startPhoto !== null){
                  let photoBLOB = this.orders[f].startPhoto;
                  let photoIMG = photoBLOB;
                  let photoURI = this.orders[f].startPhoto_url;
                  if(photoURI !== ''){
                    this.startPhotos.push(photoURI);
                  }else{
                    this.startPhotos.push(photoIMG);
                  }

                }else{
                  this.startPhotos.push(null);
                }

              }

              this.businesses_quantity = data['businesses_quantity'];
            }


          },
          err=>this.showError()
        );
    }

    getDeliveryOrdersByUser(user){
       this.orderService.getAllDeliveryOrders(user)
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
              this.startPhotos_DELIVERY = [];
              for(let f= 0 ; f<this.delivery_orders.length; f++){

                if(this.delivery_orders[f].startPhoto !== "" && this.delivery_orders[f].startPhoto !== null && this.delivery_orders[f].startPhoto !== 'null'){

                  let photoBLOB = this.delivery_orders[f].startPhoto;
                  let photoIMG = photoBLOB;
                  this.startPhotos_DELIVERY.push(photoIMG);

                }else{

                  let photoURI = this.delivery_orders[f].startPhoto_url;
                  if(photoURI !== ''){
                    this.startPhotos_DELIVERY.push(photoURI);
                  }else{
                    this.startPhotos_DELIVERY.push(null);
                  }

                }

              }
            }


          },
          err=>this.showError()
        );
    }

    goOrder(id, from, get, businessid = null, businessStatus = null){

      this.orderService.getOrder(id)
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
                let business = data[1].business;
                let order = data[0].order;
                let idOrder = order.id;
                let startDate =order.startDate;
                let finishDate = order.finishDate;
                let package_id = order.package_id;
                let package_name = order.name;
                let transport_id = order.transport_id;
                let user_id = order.user_id;

                let cost = order.cost;
                let calificationRequest = order.calificationRequest;
                let calificationResponse = order.calificationResponse;
                let source = order.source;
                let destination = order.destination;
                let status = order.status;
                let charge = order.charge;
                let startCode = order.startCode;
                let startPhoto = order.startPhoto;
                let finishPhoto = order.finishPhoto;
                let create_at = order.created_at;
                let updated_at = order.updated_at;
                let coordinates = order.coordinates;
                let deliberate_cost = order.deliberate_cost;
                let maxDeliveryDate = order.maxDeliveryDate;
                let maxDeliveryHour = order.mommentPickup;
                let fname = order.fname;
                let size = order.size;
                let weight = order.weight;
                let vehicle = order.vehicle;


                let delivery_fname = business.fname_delivery;
                let delivery_id = business.delivery_id;
                localStorage.setItem("id_order",idOrder);
                localStorage.setItem("source",source);
                localStorage.setItem("destination",destination);
                localStorage.setItem("coordinates",coordinates);

                localStorage.setItem("finishDate",finishDate);
                localStorage.setItem("package_name",package_name);
                localStorage.setItem("status",status);
                localStorage.setItem("maxDeliveryHour",maxDeliveryHour);
                localStorage.setItem('fname', fname);
                localStorage.setItem('size', size);
                localStorage.setItem('weight', weight);
                localStorage.setItem('vehicle', vehicle);

                localStorage.setItem('fname_delivery', delivery_fname);

                localStorage.setItem('idUserOrder_pre_offert', user_id);
                localStorage.setItem('idDeliveryOrder_pre_offert', delivery_id);

                if(from == 'deliveries'){
                  localStorage.setItem("from_list_orders", from);
                }else if(from == 'orders'){
                  localStorage.setItem("from_list_orders", from);
                }

                cost = parseFloat(cost).toFixed(2);
                charge = parseFloat(charge).toFixed(2);
                let just_cost = cost - charge;
                just_cost = Math.round(just_cost * 100) / 100;


                localStorage.setItem("cost",cost);
                localStorage.setItem("just_cost",""+just_cost);
                localStorage.setItem("charge",charge);


                //El from indica (no siempre obligatorio) de donde proviene el llamado a la orden
                //En el caso de ir a al Orden desde LLEVAR (Pedidos) se debe aclarar, para cambiar
                //funcionalidades en el detalle orden, como cambiar estado, cancelar, enviar ubicacion
                if(get == 'offerts'){
                  this.goOfferts(from);  
                }else if(get == 'tracking'){
                  this.goTracking(businessid, from, businessStatus);
                }
                

                


            }


          },
          err=>this.showError()
        );
    }
    goOfferts(from){
        this.presentLoadingOfferts();
        let idOrder = localStorage.getItem("id_order");
        let idUser = localStorage.getItem("user_id");
       //Obtener Business Order y Offerts
       this.orderService.getBusinessesOfferts(idOrder, idUser)
        .subscribe(
          data=>{
            if(data.error){
              this.loading.dismiss();
               let alert = this.alertCtrl.create({
                title : 'Error',
                subTitle: data.error,
                buttons: ['OK'],
              });

              alert.present(); 
            }else{
              this.loading.dismiss();
              this.businesses = data['businesses'];
              this.declined_offerts = data['declined_offert'];
              this.orderid = data["orderid"];
              this.businessid = data["businessid"];
              this.statusbusiness = data["status_business"];
              let currentIndex = this.navCtrl.getActive().index;
              this.navCtrl.push(GoOrderPage, {from: from, offerts: this.businesses, business_users: [], 
                business_delivery: [], tracking: [], declined_offerts: this.declined_offerts, orderid: this.orderid,
                 businessid: this.businessid, statusbusiness: this.statusbusiness}).then(() => {
                  this.navCtrl.remove(currentIndex);
              });
             
            }
            
          }, 
          err=>this.showError()
        );
    }

    goTracking(business_id, from, businessStatus = null){
        this.presentLoadingTracking();
        let idOrder = localStorage.getItem("id_order");
        let idUser = localStorage.getItem("user_id");
       //Obtener Business Order y Offerts
       this.orderService.getBusinessesTracking(business_id)
        .subscribe(
          data=>{
            if(data.error){
              this.loading.dismiss();
               let alert = this.alertCtrl.create({
                title : 'Error',
                subTitle: data.error,
                buttons: ['OK'],
              });

              alert.present(); 
            }else{
              this.loading.dismiss();
              this.tracking = data['tracking'];
              this.business_users = data['business_users'];
              this.business_delivery = data['business_delivery'];
              this.statusbusiness = data["status_business"];
              let currentIndex = this.navCtrl.getActive().index;
              this.navCtrl.push(GoOrderPage, {from: from, tracking: this.tracking, business_users: this.business_users,
                 business_delivery: this.business_delivery, offerts: [], orderid: '', 
                 declined_offerts: "", businessid: '', statusbusiness: this.statusbusiness}).then(() => {
                   this.navCtrl.remove(currentIndex);
              });
             
            }
            
          }, 
          err=>this.showError()
        );
    }
    
    goMessages(business_id, action){
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(MessageDetailPage, {business_id: business_id, action: action}).then(() => {
      });
    }

    goLogin(){
      //Indicar de donde ingreso al Login para luego retornr a orders.
      this.navCtrl.push(LoginPage, {list_orders: true})
    }


    showmore(orderid){
      document.getElementById('first-'+orderid).style.display = "none";
      document.getElementById('second-'+orderid).style.display = "block";

      }
    
    showless(orderid){
      document.getElementById('first-'+orderid).style.display = "block";
      document.getElementById('second-'+orderid).style.display = "none";
    }

    presentOrderCodePrompt(order_id){
      let alert = this.alertCtrl.create({
        title: 'Ingresa el Código de Envío',
        subTitle: 'El mismo te permitirá dar inicio al Proceso de EnvioEntregas',
        inputs: [
          {
            name: 'code',
            placeholder: 'Código de 6 dígitos',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancelo Ingresar Código');
            }
          },
          {
            text: 'Enviar',
            handler: data => {
               
               this.presentLoadingCodeStart();

               let user_id = localStorage.getItem('user_id');
                this.goOrderService.verifyStartCodeOrder(data.code,user_id, order_id)
                    .subscribe(
                      data=>{
                        if(data.error){
                          this.loading.dismiss(); 
                           let alert = this.alertCtrl.create({
                            title : 'Error',
                            subTitle: data.error,
                            buttons: ['OK'],
                          });

                          alert.present(); 
                          
                        }else{

                          this.loading.dismiss();
                          let order_info = data['order'];
                          this.businesses = data['businesses'];
                          let user_id = data.user_id;
                         
                          this.tokenService.sendChangeStatusPush(user_id, 'EN PROCESO', order_info.order_id).subscribe(console.log, console.log)
                          let currentIndex = this.navCtrl.getActive().index;
                          this.navCtrl.push(OrdersPage, {showTab: 'deliveries'}).then(() => {
                            this.navCtrl.remove(currentIndex);
                          });
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
            }
          }
        ]
      });
      alert.present();  
    }

    presentFinalOrderCodePrompt(order_id){
      let alert = this.alertCtrl.create({
        title: 'Ingresa el Código',
        subTitle: 'El mismo te permitirá dar como finalizada la EnvioEntrega',
        inputs: [
          {
            name: 'code',
            placeholder: 'Código de 6 dígitos',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancelo Ingresar Código');
            }
          },
          {
            text: 'Enviar',
            handler: data => {
               
               this.presentLoadingCodeFinish();

               let user_id = localStorage.getItem('user_id');
                this.goOrderService.verifyFinalCodeOrder(data.code,user_id, order_id)
                    .subscribe(
                      data=>{
                        if(data.error){

                            this.loading.dismiss();

                           let alert = this.alertCtrl.create({
                            title : 'Error',
                            subTitle: data.error,
                            buttons: ['OK'],
                          });

                          alert.present(); 
                        }else{
                          
                          this.loading.dismiss();
                          
                          let order_info = data['order'];
                          this.businesses = data['businesses'];
                          let user_id = data.user_id;
                          
                          this.tokenService.sendChangeStatusPush(user_id, 'COMPLETADO', order_info.order_id).subscribe(console.log, console.log)
                          let currentIndex = this.navCtrl.getActive().index;
                          this.navCtrl.push(OrdersPage, {showTab: 'deliveries'}).then(() => {
                            this.navCtrl.remove(currentIndex);
                          });
                        }
                        
                      }, 
                      err=>console.log(err)//toast.present()
                    );
            }
          }
        ]
      });
      alert.present();  
    }

    copy(val) {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      const toast = this.toastCtrl.create({
        message: 'Copiado!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }

    private showError() {
      this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Ha ocurrido un error, compruebe su conexión.',
        buttons: ['OK'],
      }).present();
    }

    private presentLoadingCodeStart() {
      this.loading = this.loadingCtrl.create({
        content: 'Validando Código de Envío...'
      });
      this.loading.present();
    }

    private presentLoadingCodeFinish() {
      this.loading = this.loadingCtrl.create({
        content: 'Validando Código de Entrega...'
      });
      this.loading.present();
    }
}
