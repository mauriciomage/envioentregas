'use strict';
import { Component, NgZone  } from '@angular/core';
import { NavController,NavParams, ToastController, LoadingController, AlertController, ModalController, Platform } from 'ionic-angular';
import {SearchPage} from '../../pages/search/search';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NewOrderPage } from '../../pages/new-order/new-order';
import { OrdersPage } from '../../pages/orders/orders';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { GoOrderPage } from '../go-order/go-order';
import { GeolocationService } from '../../services/geolocation.service';
import { GoOrderService } from '../go-order/services/goOrder.service';
import { TokenService } from '../../services/token.service';
import { LoginPage } from '../login/login';
import { ViewImagePage } from '../view-image/view-image';
import { HandleNotificationService } from '../../services/handle-notification.service';
import * as Constants from  '../../constants/constants';
import { FCM } from '@ionic-native/fcm/ngx';
import { NotificationsConstants } from '../../constants/notifications-home.constants';

declare var google: any;
declare var FCMPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	  title: string = 'BUSCA UN DELIVERY';
    map: any;
    loading: any;
    geocoder = new google.maps.Geocoder;
    pushPage: any;
    markers = [];
    latitudes = [];
    longitudes = [];
    usersByCurrentLocation: any[];
    coordinatesRepeated: Boolean = false;
    orders: any[] = [];
    quantity_orders: number = 0;
    executed_times: number = 0;
    marker:any;
    FLAG_ERROR_GEOLOCATION : Boolean = false;
    listOrders: Boolean = false;
    
    //Data pre offert.
    user_order_id;
    order_id;
    order_info: any[];
    orders_offerted: any[];
    businesses: any[];
    user_id;
    lat;
    lng;

  constructor(
    
    public navCtrl: NavController,  
    private geolocation: Geolocation,
    public navParams: NavParams,
    public zone: NgZone,
    public toastCtrl: ToastController,
    public orderService: OrderServiceProvider,
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
    private geolocator: GeolocationService,
    private modalCtrl: ModalController,
    private goOrderService: GoOrderService,
    private tokenService:TokenService,
    private platform: Platform
   ) {
    this.pushPage = NewOrderPage;
    if (this.navParams.get('list_orders')) {
      let from_login = true;
      this.showOrders(true, from_login);
    }
  }
  ionViewWillEnter() {
    this.user_id = localStorage.getItem('user_id');
    const notifierUserValue = localStorage.getItem('userAble');
    if (notifierUserValue !== undefined && notifierUserValue !== null) {
      this.alertController.create({
        title : 'ALGUIEN NECESITA AYUDA!',
        subTitle: `${notifierUserValue} necesita que le lleven su Pedido, lista las ordenes y busca la que creo él`,
        buttons: ['OK'],
      }).present();

      localStorage.removeItem('userAble');
    }

    if (Constants.DEBUG) {
      localStorage.setItem("lat",''+Constants.DEBUG.LAT);
      localStorage.setItem("lng",''+Constants.DEBUG.LNG);
      this.lat = Constants.DEBUG.LAT;
      this.lng = Constants.DEBUG.LNG;
      this.initMap();
    } else {
      this.geolocation.getCurrentPosition().then((resp) => {
      
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        
        var latlng = [];
        latlng.push(lat,lng);
        
        localStorage.setItem("lat",''+lat);
        localStorage.setItem("lng",''+lng);
        this.initMap();
        })
        .catch((error) => {
          let toast = this.toastCtrl.create({
              message: 'No se ha podido encontrar la ubicación actual',
              duration: 2500
            });
          toast.present();
        }); 
    }   
  }

  private initMap() {
      if (!Constants.DEBUG) {
        this.lat = localStorage.getItem('lat');
        this.lng = localStorage.getItem('lng'); 
      }
      this.getAddressCurrentLocation(this.lat, this.lng);
      var point = {lat: +this.lat, lng: +this.lng}
      let divMap = (<HTMLInputElement>document.getElementById('map-home'));
      this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 13,
      disableDefaultUI: true,
      draggable: true,
      visible:true,
      zoomControl: true,
      gestureHandling: 'greedy',
      panControl:true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      });
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
        this.map.setCenter(point); 
        this.getOrdersByCurrentLocation();
        
       
  }

  showOrders(show, from_login = false) {
    if (from_login) {
      this.getOrdersByCurrentLocation();
    } else {
      if (show) {
        this.listOrders = true;
        document.getElementById('map-home').style.display = 'none';
      } else {
        this.listOrders = false;
        document.getElementById('map-home').style.display = 'block';
        this.initMap();
      }
    }
  }

  showmore(orderid){
    document.getElementById('first-'+orderid).style.display = "none";
    document.getElementById('second-'+orderid).style.display = "block";

    }
  
  showless(orderid){
    document.getElementById('first-'+orderid).style.display = "block";
    document.getElementById('second-'+orderid).style.display = "none";
  }

  presentDeliveryConfirm(order) {
    this.user_order_id = order.user_id;
    this.order_id = order.id;
    let alert = this.alertController.create({
      title: 'Oferta para realizar Delivery',
      subTitle: 'Puedes proponer otra FECHA y COSTO. Luego, '+order.fname.toUpperCase()+' respondera a tu oferta',
      inputs: [
        {
          name: 'maxDeliveryDate',
          placeholder: '',
          type: 'date',
          value: order.maxDeliveryDate,
        },
        {
          name: 'cost',
          placeholder: 'Ingrese el Costo que le parezca..',
          type: 'number',
          value: order.cost,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
           this.presentPickAMommentConfirm(data)
          }
        }
      ]
    });
    alert.present();
  }

  //for orders provides from Clients/Restaurantes
  presentDeliveryClientConfirm(order) {
    if (this.user_id) {
      let alert = this.alertController.create({
        title: 'Llevar Pedido',
        subTitle: 'Estás aceptando todas las condiciones del Pedido. '+order.fname+' '+order.lname+' va a ser notificado.',
        buttons: [
          {
            text: 'Me arrepentí',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Aceptar',
            handler: data => {
              this.presentLoading();
              // orderId, userId (creo la orden), deliveryId
              this.goOrderService.acceptClientOrder(order.id, order.user_id, this.user_id)
                .subscribe(
                  data => {
                    if (this.platform.is('cordova')) {
                      data = JSON.parse(data.data);
                    }
                    this.loading.dismiss();
                    if (data['order'] && data['business']) {
                      this.order_info = data['order'];
                      this.businesses = data['business'];
                      let package_detail = data['package'];
                      let fname_delivery = localStorage.getItem('fname_logged');
                      let lname_delivery = localStorage.getItem('lname_logged');
                      // send order accepted notification to the User
                      this.tokenService.sendOrderAccepted(order.user_id, order.PackageName, fname_delivery, lname_delivery, package_detail.name).subscribe(console.log, console.log)
                      this.navCtrl.setRoot(OrdersPage, {showTab: 'deliveries'})
                    } else {
                      this.showError();
                    }
                  }, 
                  err=>{
                    this.loading.dismiss();
                    this.showError();
                  }
                );
            }
          }
        ]
      });
      alert.present();
    }
    else {
      let currentIndex = this.navCtrl.getActive().index;  
        this.navCtrl.push(LoginPage, {home_accept_order: true}).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
  }

  private presentPickAMommentConfirm(input, re_offert = null){
    var logged = false;
    
    let prompt = this.alertController.create({
     title: 'Indica en que momento puedes Retirar el Pedido!',
     inputs : [
     {
         type:'radio',
         label:'En la Mañana',
         value:'mañana',
         name: 'maxDeliveryHour'

     },
     {
         type:'radio',
         label:'En la Tarde',
         value:'tarde',
         name: 'maxDeliveryHour'
     },
     {
         type:'radio',
         label:'En la Noche',
         value:'noche',
         name: 'maxDeliveryHour'
     }],
     buttons : [
     {
         text: "Cancelar",
         handler: data => {
           
         }
     },
     {
         text: "Aceptar",
         handler: data => {
            let mommentPickup = data;
            this.presentPickAMommentFinalConfirm(input.maxDeliveryDate, mommentPickup, input.cost, re_offert);
         }
     }]});
     prompt.present();


  }

viewPhoto(photoName){
  let imageModal = this.modalCtrl.create(ViewImagePage, { img: photoName });
   imageModal.present();
}

private presentPickAMommentFinalConfirm(maxDeliveryDate, mommentPickup, cost, re_offert = null){
  var logged = false;
  
  let prompt = this.alertController.create({
   title: 'Ya terminamos.. ',
   message: '¿Que vehículo tienes?',
   inputs : [
   {
       type:'radio',
       label:'A pie',
       value:'caminando',
       name: 'vehicle'

   },
   {
       type:'radio',
       label:'Bicicleta',
       value:'bicicleta',
       name: 'vehicle'
   },
   {
       type:'radio',
       label:'Auto',
       value:'auto',
       name: 'vehicle'
   },
   {
       type:'radio',
       label:'Voy en Colectivo',
       value:'colectivo',
       name: 'vehicle'
   },
   {
       type:'radio',
       label:'Furgon/Camioneta',
       value:'furgon',
       name: 'vehicle'
   }],
   buttons : [
   {
       text: "Cancelar",
       handler: data => {
         
       }
   },
   {
       text: "Enviar Oferta",
       handler: data => {
         

          if(localStorage.getItem("logged") == 'true'){
             logged = true;    
             localStorage.setItem("vehicle", vehicle);
           }
        

          //por si regresa a la app, chequea LS
          if(localStorage.getItem("logged") == 'true'){
            logged = true;

            let status = 'en negociacion';
            let delivery_id = localStorage.getItem("user_id");
            var vehicle = data;
            this.loading = this.loadingCtrl.create({
              content: 'Enviando Oferta...'
            });
            this.loading.present();

            this.goOrderService.sendOffert(maxDeliveryDate,mommentPickup, cost,
             delivery_id, this.user_order_id, this.order_id, status, vehicle)
             .subscribe(
               data=>{
                if(this.platform.is('cordova')) {
                  data = JSON.parse(data.data);
                }
                 this.loading.dismiss();
                 if(data.error){
                    let alert = this.alertController.create({
                     title : 'Error',
                     subTitle: data.error,
                     buttons: ['OK'],
                   });

                   alert.present(); 
                 }else{
                   this.order_info = data['order'];
                   this.businesses = data['businesses'];
                   if (localStorage.getItem('new_offert_push').toString() === '1') {
                    this.tokenService.sendOffertPush(this.user_order_id).subscribe(console.log, console.log)
                   } 
                    let currentIndex = this.navCtrl.getActive().index; 
                    this.navCtrl.push(OrdersPage, {showTab: 'deliveries'}).then(() => {
                      localStorage.removeItem('orders_loaded');
                      this.navCtrl.remove(currentIndex);
                  });
                 }
               }, 
               err=>this.errorSendOffert()
             );
          } else {
              let currentIndex = this.navCtrl.getActive().index;  
              this.navCtrl.push(LoginPage, {home_send_offert: true}).then(() => {
                this.navCtrl.remove(currentIndex);
              });
          }
       }
   }]});
   prompt.present();
}

private errorSendOffert() {
  (this.loading) ? this.loading.dismiss() : this.loading;
  this.toastCtrl.create({
    message: 'Ha Ocurrido un Error en la Conexion. Intente nuevamente!',
    duration: 3000,
    position: 'middle'
  }).present();
}

private getOrdersByCurrentLocation(){
  let location  = new google.maps.LatLng(+this.lat, +this.lng);
  let user_id = localStorage.getItem("user_id");
  let current_city = Constants.DEBUG ? Constants.DEBUG.CURRENT_CITY_OK : localStorage.getItem('current_city_ok');
  var icon = {
    url: "assets/icon/order.svg", // url
    scaledSize: new google.maps.Size(35, 35), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(current_city) > -1) {
    this.orderService.searchOrders(current_city, location, location, user_id, true)
      .subscribe(
        data=>{
          (this.loading) ? this.loading.dismiss() : this.loading;
          this.orders = data['results']; 
          this.orders_offerted = data['orders_offerted'];
          this.quantity_orders = this.orders.length;

          for(let m=0; m<this.markers.length; m++){
            this.markers[m].setMap(null);
          }
          this.markers.length = 0;
            for(let i = 0 ; i<this.orders.length; i++){
            let coordinates =  this.orders[i].coordinates;
            let idorder = this.orders[i].id;
            let name = this.orders[i].PackageName;
            let source = this.orders[i].source;
            let destination = this.orders[i].destination;
            let cost = this.orders[i].cost;
            let charge = this.orders[i].charge;
            let maxDeliveryDate = this.orders[i].maxDeliveryDate;
            let mommentPickup = this.orders[i].mommentPickup;
            let fname = this.orders[i].fname;
            let lname = this.orders[i].lname;
            let id_user_order = this.orders[i].user_id
            let status = this.orders[i].status;
            let username = this.orders[i].username;
            let size = this.orders[i].size;
            let weight = this.orders[i].weight;
            let vehicle = this.orders[i].vehicle;
            let statusbusiness = this.orders[i].statusbusiness;
            let description = this.orders[i].description;
            let isClient = this.orders[i].is_client;
            let arr_coordinates = coordinates.split(";");
            let coordinates_source = arr_coordinates[0];
            let arr_coordinates_source = coordinates_source.split(",");

            let lat = arr_coordinates_source[0];

            if(lat)
              lat = lat.replace("(","");

            let lng = arr_coordinates_source[1];

            if(lng)
              lng = lng.replace(")","");


            this.coordinatesRepeated = this.checkCoordinatesRepeat(lat, lng);  

            var point = {lat: +lat, lng: +lng};
            var marker = new google.maps.Marker({
              position: point,
              map: this.map,
              icon: icon,
              zoom: 11
            });

            this.markers.push(marker);
            this.map.setCenter(point);


            var object = new SearchPage(this.navCtrl,this.navParams, this.zone, this.geolocator, this.orderService, this.toastCtrl,this.modalCtrl, this.loadingCtrl);
            marker.addListener('click', function () {
              object.navCtrl.push(GoOrderPage, {id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, mommentPickup: mommentPickup, fname: fname, lname: lname, id_user: id_user_order, status: status, username: username, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], business_declined: "", statusbusiness: statusbusiness, description: description, isClient: isClient});
            });
          }
          if(!this.coordinatesRepeated){
            if(this.quantity_orders == 0){
              this.toastOrdersNotify(true);
            }else{
              this.toastOrdersNotify(false);
            }
          }
          localStorage.setItem('orders_loaded', 'yes');
          if(this.navParams.get('list_orders')){
            this.showOrders(true);
          }
        },  
        err=>this.showError()
      );
    } else {
      this.excludedPlaceAlert();
    }
}
  
  getIfHasAnOffert(orderid){
    let offerted = false;
    for(let i=0; i<this.orders_offerted.length; i++) {
        if(this.orders_offerted[i].order_id == orderid){
          offerted = true;
          i = this.orders_offerted.length;
        }
    }
    return offerted;
  }

  private checkCoordinatesRepeat(lat, lng){
    if(this.latitudes.includes(lat) && this.longitudes.includes(lng)){
      this.latitudes.push(lat);
      this.longitudes.push(lng);
      return true;
    }
      this.latitudes.push(lat);
      this.longitudes.push(lng);
      return false;
    
  }

  private showError() {
    localStorage.setItem('orders_loaded', 'no');
    (this.loading) ? this.loading.dismiss() : this.loading;
    this.alertController.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error, compruebe su conexión.',
      buttons: ['OK'],
    }).present();
  }
  
  private getAddressCurrentLocation(lat,lng){
    let location  = new google.maps.LatLng(+lat, +lng);
    this.geocoder.geocode({'latLng': location}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let current_city = results[0].address_components.filter(ac=>~ac.types.indexOf('locality'))[0].long_name;
        localStorage.setItem("current_city_ok", current_city);
      }
    });
  }
  private toastOrdersNotify(nothing) {
    if (nothing) {
      this.toastCtrl.create({
        message: NotificationsConstants.NO_ORDERS_TAKE_TOAST,
        duration: 2500,
        position: 'middle',
        showCloseButton: true,
        closeButtonText: 'OK'
      }).present();
    } else {
      this.toastCtrl.create({
        message: NotificationsConstants.ORDERS_TAKE_TOAST,
        duration: 2500,
        position: 'middle'
      }).present();
    }
  }

  async alertAction(type) {
    if(type == 'delivery') {
      const alert = this.alertController.create({
        message: NotificationsConstants.DELIVERY_AVAILABLE_TITLE_ALERT,
        buttons: [
          {
            text: NotificationsConstants.CANCEL,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('cancel operation');
            }
          }, {
            text: NotificationsConstants.ACCEPT,
            handler: () => {
              this.handlerAcceptAlertAction(type);
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = this.alertController.create({
        message: NotificationsConstants.NEED_DELIVERY_TITLE_ALERT,
        buttons: [
          {
            text: NotificationsConstants.CANCEL,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('cancel operation');
            }
          }, {
            text: NotificationsConstants.ACCEPT,
            handler: () => {
              this.handlerAcceptAlertAction(type);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  private excludedPlaceAlert() {
    this.alertController.create({
      title : NotificationsConstants.APP_NOT_AVAILABLE_TITLE,
      subTitle: NotificationsConstants.APP_NOT_AVAILABLE_DESC,
      buttons: ['OK'],
    }).present();
  }

  private presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    this.loading.present();

  }

  private handlerAcceptAlertAction(type) {
    let messageLoading;
    let messageToast;
    if (type === 'delivery') {
      messageLoading = NotificationsConstants.USER_SPINNER_TEXT;
      messageToast = NotificationsConstants.USER_TOAST_TEXT;
    } else {
      messageLoading = NotificationsConstants.DELIVERY_SPINNER_TEXT;
      messageToast = NotificationsConstants.DELIVERY_TOAST_TEXT;
    }
    const loadingNotifier = this.loadingCtrl.create({
      content: messageLoading
    });
    const user_id = localStorage.getItem('user_id');
    const current_city = localStorage.getItem('current_city_ok').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(current_city) > -1) {
      if (user_id) {
        loadingNotifier.present();
        this.orderService.getUsersByCurrentLocation(user_id, current_city).subscribe((data) => {
        this.usersByCurrentLocation = data['users'];
        let usersArrayParsed: any[] = [];
        for (let u=0; u < this.usersByCurrentLocation.length; u++) {
          let user = this.usersByCurrentLocation[u];
          usersArrayParsed.push(user.user_id);
        }
        let fname = localStorage.getItem('fname_logged');
        let lname = localStorage.getItem('lname_logged');
        this.tokenService.sendNotifierPush(usersArrayParsed, type, fname, lname).subscribe(
          () => {
            loadingNotifier.present();
          },
          () => {
            loadingNotifier.dismiss();
            this.alertController.create({
              title : NotificationsConstants.ERROR_TITLE,
              subTitle: NotificationsConstants.ERROR_DESC,
              buttons: ['OK'],
            }).present();  
          },
          () => {
            loadingNotifier.dismiss();
            this.toastCtrl.create({
              message: messageToast,
              duration: 3500
            }).present();
          });
        });  
      } else {
        let currentIndex = this.navCtrl.getActive().index; 
            this.navCtrl.push(LoginPage, {sendGeneralNotification: 'user'}).then(() => {
              this.navCtrl.remove(currentIndex);
          });
      }
    } else {
      this.excludedPlaceAlert();
    }
  }
}
