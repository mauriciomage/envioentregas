import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, Events, ToastController, LoadingController, ModalController, Platform  } from 'ionic-angular';
import {GeolocationService} from '../../services/geolocation.service';
import { GoOrderService } from './services/goOrder.service';
import { PreOrderPage  } from '../pre-order/pre-order';
import { MessagesPage } from '../messages/messages';
import { OrdersPage } from '../orders/orders';
import { TokenService } from '../../services/token.service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PaymentPage } from '../../pages/payment/payment';
import { MessageDetailPage } from '../../pages/message-detail/message-detail'
import { ViewImagePage } from '../view-image/view-image';
import { userInfo } from 'os';
import { FCM } from '@ionic-native/fcm/ngx';

declare var google:any;
declare var FCMPlugin;

@Component({
  selector: 'page-go-order',
  templateUrl: 'go-order.html',
})
export class GoOrderPage {
	  preOrderPage: PreOrderPage;
    order_created: string;
    id_order: string;
    map: any;
	  geocoder = new google.maps.Geocoder;
	  SEND_OFFERT:Boolean = false;
	  markers = [];
    orderid:any;
    businessid:any;
	  marker:any;
    offerts: any[];
    tracking: any[];
    business_users: any[];
    offert_business: any[];
    user_fname:string;
    user_lname:string;
    user_photo:string;

    business_delivery: any[];
	  delivery_fname:string;
    delivery_lname:string;
    delivery_photo:string;

    title: string = 'Orden';
    size: string = '';
    weight: string = '';
	  name: string = '';
    status: string = '';
    statusbusiness:string;
    username: string = '';
	  source: string = '';
	  destination: string = '';
	  cost: string = '';
	  just_cost: string = '';
	  charge: string = '';
    maxDeliveryDate: string = '';
    maxDeliveryHour: string = '';
    justDateDelivery: string = '';
    justHourDelivery: string = '';
    mommentPickup: string;
    fname: string = '';
    lname: string;
    photoOrder: string;
    orderFromClient: boolean;
    from_list_orders:string; 
    search_order : Boolean = false;
    order_info: any[];
    deliveriesToNotifyCancel: any[];
    businesses: any[];
    id_user_order: string;
    THEN_ORDER_CREATED: Boolean = false;
    NOT_MODAL: Boolean = false;
    PROVIDED_FROM_LOGIN: Boolean = false;
    FROM_DELIVERIES: Boolean = false;
    FROM_ORDERS: Boolean = false;
    ORDER_PUBLISHED: Boolean = false;
    NOT_FROM_DELIVERIES: Boolean = true;
    businesses_quantity: string = '';
    typeSHOW_MAP:string;
    vehicle:string;
    loading:any;
    declined_offerts: any;
    description: string;
    lat: string;
    lng: string;
    showSecondaryMap: boolean;
    divMap: any;
    isClient: boolean;
    user_id;

  constructor(
    private navCtrl: NavController, 
    private geolocator: GeolocationService, 
    private navParams: NavParams,  
    private alertCtrl: AlertController,
    private goOrderService: GoOrderService,
    private modalCtrl: ModalController,
    private toast:ToastController,
    private tokenService:TokenService,
    private loadingCtrl: LoadingController,
    private orderService: OrderServiceProvider,
    private platform: Platform,
    private fcm: FCM
    ) {
      this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
      this.offerts = this.navParams.get("offerts") ? this.navParams.get("offerts") : [];
      this.tracking = this.navParams.get("tracking") ? this.navParams.get("tracking") : [];
      this.business_users = this.navParams.get("business_users") ? this.navParams.get("business_users") : [];
      this.business_delivery = this.navParams.get("business_delivery") ? this.navParams.get("business_delivery") : [];
      this.declined_offerts = this.navParams.get("declined_offerts") ? this.navParams.get("declined_offerts") : [];

    if (this.offerts && this.offerts.length > 0) {
      this.title = 'OFERTAS';
    } else if (this.tracking && this.tracking.length > 0) {
      this.title = 'SEGUIMIENTO';
      if (this.business_users && this.business_users.length > 0) {
        this.user_fname = this.business_users[0].fname;
        this.user_lname = this.business_users[0].lname;
        this.user_photo = this.business_users[0].photo;
      }
      if (this.business_delivery && this.business_delivery.length) {
        this.delivery_fname = this.business_delivery[0].fname;
        this.delivery_lname = this.business_delivery[0].lname;
        this.delivery_photo = this.business_delivery[0].photo;
      }
    }
    if (this.navParams.get("send_offert")) {
      this.SEND_OFFERT = true;
      this.search_order = true;
      this.THEN_ORDER_CREATED = true;
      this.name = localStorage.getItem("name_pre_offert");
      this.source = localStorage.getItem("source_pre_offert");
      this.destination = localStorage.getItem("destination_pre_offert");
      this.cost =   localStorage.getItem("cost_pre_offert");
      this.charge = localStorage.getItem("charge_pre_offert");
      let cost = parseFloat(this.cost);
      let charge =  parseFloat(this.charge);
      let just_cost = cost - charge;
      this.just_cost = just_cost.toFixed(2);
      this.title = 'Realiza el Delivery';
      this.maxDeliveryDate = localStorage.getItem("maxDeliveryDate_pre_offert");
      this.mommentPickup = localStorage.getItem('mommentPickup_pre_offert');
      this.description = localStorage.getItem('description_pre_offert');
      this.status = localStorage.getItem('status_pre_offert');
      this.fname = localStorage.getItem("fname_pre_offert").toUpperCase();
      this.lname = localStorage.getItem("lname_pre_offert").toUpperCase();
      this.id_order = localStorage.getItem('id_order_pre_offert');

    } else if (this.navParams.get("id_order") && !this.navParams.get('getOrder')) {
      this.offerts = this.navParams.get('offerts');
      this.tracking = this.navParams.get('tracking');
      this.statusbusiness = this.navParams.get('statusbusiness');
      this.search_order = true;
      localStorage.setItem("id_order_pre_offert", this.navParams.get('id_order'));
      this.id_order = this.navParams.get('id_order');
      localStorage.setItem("source_pre_offert", this.navParams.get('source'));
      localStorage.setItem("destination_pre_offert", this.navParams.get('destination'));
      localStorage.setItem("name_pre_offert", this.navParams.get('name'));
      localStorage.setItem("cost_pre_offert", this.navParams.get('cost'));
      localStorage.setItem("charge_pre_offert", this.navParams.get('charge'));
      localStorage.setItem("maxDeliveryDate_pre_offert", this.navParams.get('maxDeliveryDate'));
      localStorage.setItem("mommentPickup_pre_offert", this.navParams.get('mommentPickup'));
      localStorage.setItem("fname_pre_offert", this.navParams.get('fname'));
      localStorage.setItem("lname_pre_offert", this.navParams.get('lname'));
      localStorage.setItem("idUserOrder_pre_offert", this.navParams.get('id_user'));
      localStorage.setItem("status_pre_offert", this.navParams.get('status'));
      localStorage.setItem("size_pre_offert", this.navParams.get('size'));
      localStorage.setItem("weight_pre_offert", this.navParams.get('weight'));
      localStorage.setItem("vehicle_pre_offert", this.navParams.get('vehicle'));
      localStorage.setItem("description_pre_offert", this.navParams.get('description'));
      this.orderFromClient = this.navParams.get('isClient') === 1 ? true : false;

      this.name = this.navParams.get('name');
      this.source = this.navParams.get('source');
      this.destination = this.navParams.get('destination');
      this.cost = this.navParams.get('cost');
      this.charge = this.navParams.get('charge');
      this.maxDeliveryDate = this.navParams.get('maxDeliveryDate');
       
      this.mommentPickup = this.navParams.get('mommentPickup');
      this.fname = this.navParams.get('fname');
      this.lname = this.navParams.get('lname');
      this.id_user_order = this.navParams.get("id_user");
      let cost = parseFloat(this.cost);
      let charge =  parseFloat(this.charge);
      let just_cost = cost - charge;

      this.just_cost = just_cost.toFixed(2);
      this.NOT_MODAL = true;
      this.status = this.navParams.get('status');
      this.status === 'cargada' ? this.title = 'PEDIDO CARGADO' : this.title = 'REALIZAR DELIVERY';
      this.username = this.navParams.get('username');
      this.size = this.navParams.get('size');
      this.weight = this.navParams.get('weight');
      this.vehicle = this.navParams.get('vehicle');
       
      this.toast.create({
        message: 'Desliza hacia arriba para ver mas detalles del Envío',
        duration: 2500,
        position: 'middle'
      }).present(); 
      this.order_created = this.navParams.get('order_created');

    } else if( this.navParams.get('source_address')) {

      this.THEN_ORDER_CREATED = true;
      this.source = this.navParams.get('source_address');
      this.destination = this.navParams.get('destination_address');
      this.cost = this.navParams.get('cost_stipulated');
      this.charge = this.navParams.get('service_stipulated');
      let cost = parseFloat(this.cost);
      let charge =  parseFloat(this.charge);
      let just_cost = cost - charge;
      this.just_cost = just_cost.toFixed(2);
      this.title = 'Orden Publicada';
      this.name = this.navParams.get('name');
      this.status = this.navParams.get('status');
      this.from_list_orders = null;
      this.maxDeliveryDate = this.navParams.get("date");
      this.photoOrder = this.navParams.get('photo');
 

      this.maxDeliveryHour = 'En la '+this.navParams.get('hour');
      this.ORDER_PUBLISHED = true;
      this.size = this.navParams.get('size');
      this.weight = this.navParams.get('weight');
      this.vehicle = this.navParams.get('vehicle');
      localStorage.setItem("order_published", 'true');

    } else if (this.navParams.get('from')) {
      if (this.navParams.get('from') == 'deliveries') {

        this.offerts = this.navParams.get('offerts'); 
        this.tracking = this.navParams.get('tracking'); 
        this.orderid = this.navParams.get('orderid');
        this.businessid = this.navParams.get('businessid');
        this.statusbusiness = this.navParams.get('statusbusiness');
        this.search_order = false;
        this.THEN_ORDER_CREATED = false;
        this.FROM_DELIVERIES = true;
        this.FROM_ORDERS = false;
        this.source = localStorage.getItem('source');
        this.destination = localStorage.getItem('destination');
        this.cost = localStorage.getItem('cost');
        this.charge = localStorage.getItem('charge');
        this.just_cost = localStorage.getItem('just_cost');
        this.maxDeliveryDate = localStorage.getItem('finishDate');
 
        this.maxDeliveryHour = "En la "+localStorage.getItem('maxDeliveryHour');
        this.name = localStorage.getItem('package_name');
        this.status = localStorage.getItem('status');
        this.fname = localStorage.getItem('fname').toUpperCase();
        
        
        this.size = localStorage.getItem('size');
        this.weight = localStorage.getItem('weight');
        this.vehicle = localStorage.getItem('vehicle');
        
        this.from_list_orders = localStorage.getItem('from_list_orders');
        this.NOT_FROM_DELIVERIES = false;

      } else if (this.navParams.get('from') == 'orders') {

        this.offerts = this.navParams.get('offerts'); 
        this.tracking = this.navParams.get('tracking'); 
        this.orderid = this.navParams.get('orderid');
        this.businessid = this.navParams.get('businessid');
        this.statusbusiness = this.navParams.get('statusbusiness');
        this.THEN_ORDER_CREATED = false;
        this.FROM_ORDERS = true;
        this.FROM_DELIVERIES = false;
        this.source = localStorage.getItem('source');
        this.destination = localStorage.getItem('destination');
        this.cost = localStorage.getItem('cost');
        this.charge = localStorage.getItem('charge');
        this.just_cost = localStorage.getItem('just_cost');
        this.maxDeliveryDate = localStorage.getItem('finishDate');
        this.size = localStorage.getItem('size');
        this.weight = localStorage.getItem('weight');
        this.vehicle = localStorage.getItem('vehicle');
        this.fname = localStorage.getItem('fname_delivery').toUpperCase();  
         
        this.maxDeliveryHour = "En la "+localStorage.getItem('maxDeliveryHour');
        this.name = localStorage.getItem('package_name');
        this.status = localStorage.getItem('status');
        this.from_list_orders = localStorage.getItem('from_list_orders');
        this.NOT_FROM_DELIVERIES = false;
      }
    } else if (this.navParams.get('order_id') && this.navParams.get('getOrder') == true) {
      let orderId = this.navParams.get('order_id');
      this.getDataOrder(orderId);
    }
  }

  presentAcceptOrder(packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
      let alert = this.alertCtrl.create({
        title: 'Aceptar Orden',
        subTitle: 'Te llegaran dos Códigos: Código de Envío al cual deberas dar al Delivery cuando pase a retirar el Pedido. Y Código de Entrega, se lo vas a indicar al Destinatario para que lo valide y complete el proceso al recibir el Pedido.',
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
                      // this.tokenService.sendAcceptPush(idDelivery, idUser, startCode, finishCode).subscribe(console.log, console.log) 
                      this.navCtrl.push(PaymentPage, {link_pay: data['link_pay'], packageName: packageName, cost: cost, 
                        idDelivery: idDelivery, idUser: idUser, idOrder: idOrder, idBusiness: idBusiness});
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

    presentDeclineOffert(delivery_id, user_id, order_id, business_id){
      let alert = this.alertCtrl.create({
        title: 'Rechazar Oferta',
        subTitle: 'Debes indicar el motivo, para que el Delivery sepa si hacer una contra Oferta o Descartar el Pedido.',
        inputs : [
          {
              type:'radio',
              label:'No puedo pagar ese Dinero.',
              value:'cost',
              name: 'reason'

          },
          {
              type:'radio',
              label:'Vehículo no apto.',
              value:'vehicle',
              name: 'reason'
          },
          {
              type:'radio',
              label:'Costo Alto y Vehículo no apto.',
              value:'cost_vehicle',
              name: 'reason'
          },
          {
              type:'radio',
              label:'Ya acepté otra Oferta.',
              value:'nothing',
              name: 'reason'
          },
          {
              type:'radio',
              label:'Cancelo mi Pedido.',
              value:'cancel',
              name: 'reason'
          }],
          buttons : [
          {
              text: "Cancelar",
              handler: data => {
                
              }
          },
          {
              text: "Rechazar Oferta",
              handler: data => {
                
                this.presentLoadingDeclineOffert();
                
                if(localStorage.getItem("logged") == 'true'){
                  var toast = this.toast.create({
                      message: 'Ha ocurrido un error, inténtalo nuevamente.',
                      duration: 3000,
                      position: 'middle'
                    });
                   let status = 'oferta rechazada';

                   var reason = data;
                   this.goOrderService.sendDeclineOffert(delivery_id, user_id, order_id, business_id, reason)
                    .subscribe(
                      data=>{
                        if(this.platform.is('cordova')) {
                          data = JSON.parse(data.data);
                        }
                        this.loading.dismiss();
                        
                          this.offert_business = data['offert_business'];
                         
                           this.tokenService.sendDeclineOffertPush(delivery_id).subscribe(console.log, console.log)
                           this.navCtrl.push(OrdersPage)
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
                   this.navCtrl.pop();
                   localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                   this.navCtrl.push(PreOrderPage, {send_offert: true});
                 }
              }
          }]});
      alert.present();
    }  

    goMessages(business_id, action){

      this.navCtrl.push(MessageDetailPage, {business_id: business_id, action: action})
    }

   //===========LOADING CONTROLLER==============
    presentLoadingCodeStart() {
    this.loading = this.loadingCtrl.create({
      content: 'Validando Código de Envío...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============

   //===========LOADING CONTROLLER==============
    presentLoadingCodeFinish() {
    this.loading = this.loadingCtrl.create({
      content: 'Validando Código de Entrega...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============

  //===========LOADING CONTROLLER==============
    presentLoadingRating() {
    this.loading = this.loadingCtrl.create({
      content: 'Enviando Calificación...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============

  //===========LOADING CONTROLLER==============
    presentLoadingOffert() {
    this.loading = this.loadingCtrl.create({
      content: 'Enviando Oferta...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============

  //===========LOADING CONTROLLER==============
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============

  //===========LOADING CONTROLLER==============
  presentLoadingDeclineOffert() {
    this.loading = this.loadingCtrl.create({
      content: 'Rechazando Oferta...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============


  ionViewWillEnter() {
    this.user_id = localStorage.getItem('user_id');
    if (typeof FCMPlugin != 'undefined') {
      this.fcm.onNotification().subscribe((data) => {
          if (data.wasTapped) {
              let params = JSON.parse(data.params);
              switch(params.page) {
                  case 'goOrder':
                      let currentIndex = this.navCtrl.getActive().index;
                      this.navCtrl.push(GoOrderPage, {order_id: params.orderId, getOrder: true}).then(() => {
                        this.navCtrl.remove(currentIndex);
                      });
                      break;    
                  default:
                  break;
              }
          }  
      });
    }
      if(localStorage.getItem('logged') !== 'true' && localStorage.getItem('current_tab') !== '0'){
        this.navCtrl.push(OrdersPage);
      }
      //obtenemos ubicacion del usuario
      var latlng = this.geolocator.getCurrentLocation();
      this.lat = localStorage.getItem("lat");
      this.lng = localStorage.getItem("lng");

      if (!this.THEN_ORDER_CREATED && !this.NOT_MODAL && this.NOT_FROM_DELIVERIES) {
        let source = localStorage.getItem("source");
        let destination = localStorage.getItem("destination");
        let name = localStorage.getItem("name");
        let cost = localStorage.getItem("cost");
        let just_cost = localStorage.getItem("just_cost");  
        let charge = localStorage.getItem("charge");


        this.name = name;
        this.source = source;
        this.destination = destination;

        this.cost = cost;
        this.just_cost = just_cost;
        this.charge = charge;
         
        
      }

      if(this.FROM_DELIVERIES){
         //document.getElementById('go-back-go-order').style.display = 'none';

        if(this.status == 'confirmado'){
          
        }else if(this.status == 'en camino'){
          
        }
        
      }
      else if(this.FROM_ORDERS){
        this.typeSHOW_MAP ='from_orders';
      }
      else{
        this.typeSHOW_MAP ='from_search';
      }
      if (!this.navParams.get('getOrder')) {
        this.initMap(this.lat,this.lng);      
      }
  }

  private initMap(latitude,longitude, secondaryMap = false) {
    let point = {lat: +latitude, lng: +longitude};
    (<HTMLInputElement>document.getElementById('map-order')).value = null;
    this.divMap = (<HTMLInputElement>document.getElementById('map-order'));  

    new google.maps.Map(this.divMap, {
      center: point,
      zoom: 15,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: true
    });
    
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    this.calculateAndDisplayRoute(directionsService, directionsDisplay, latitude, longitude);
  }

  private getDataOrder(orderId) {
    this.goOrderService.getOrderInfo(orderId)
    .subscribe((data) => {
      let orderInfo = data['results'];
      orderInfo = orderInfo[0];
      this.lat = localStorage.getItem("lat");
      this.lng = localStorage.getItem("lng");
      this.id_order = orderInfo.order_id;
      this.name = orderInfo.name;
      this.source = orderInfo.source;
      this.destination = orderInfo.destination;
      this.description = orderInfo.description;
      this.status = orderInfo.status_order;
      this.cost = orderInfo.cost;
      this.maxDeliveryDate = orderInfo.maxDeliveryDate;
      this.mommentPickup = orderInfo.mommentPickup;
      this.vehicle = orderInfo.vehicle;
      this.photoOrder = orderInfo.orderPhoto;
      this.fname = orderInfo.fname;
      this.lname = orderInfo.lname;
      this.search_order = true;
      this.order_created = null;
      this.showSecondaryMap = true;
      this.id_user_order = orderInfo.userOrderId;
      this.orderFromClient = orderInfo.is_client === 1 ? true : false;
      this.initMap(this.lat, this.lng, true);
    }, (err) => console.log(err)
    )}

    calculateAndDisplayRoute(directionsService, directionsDisplay, lat, lng, secondaryMap = false) {
      
      directionsDisplay = new google.maps.DirectionsRenderer();
      var position = new google.maps.LatLng(+lat, +lng);
      var mapOptions = {
        zoom:15,
        center: position  
      }
      this.map = new google.maps.Map(document.getElementById('map-order'), mapOptions); 
      directionsDisplay.setMap(this.map);

      var start = this.source;
      var end = this.destination;
      var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      };
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });

      this.getAddressCurrentLocation(lat, lng);

  }

    getAddressCurrentLocation(lat,lng){
        let geocoder  = new google.maps.Geocoder(); 
        let location  = new google.maps.LatLng(+lat, +lng);
        var current_city = "";   
      
      this.geocoder.geocode({'latLng': location}, function (results, status) {
        if(status == google.maps.GeocoderStatus.OK) {         
          var current_address = results[0].formatted_address;
          localStorage.setItem("current_address", current_address);
        }
      });

      
    }  

    goBack(){
      this.navCtrl.pop();
    }

    presentOrderCodePrompt(){
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
               let order_id = localStorage.getItem('id_order');
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
                          this.navCtrl.push(OrdersPage, {showTab: 'deliveries'});   
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
    presentFinalOrderCodePrompt(){
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
               let order_id = localStorage.getItem('id_order');

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
                          this.navCtrl.push(OrdersPage, {showTab: 'deliveries'});  
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

    presentDeliveryConfirm(re_offert = null) {
      var logged = false;
      let alert = this.alertCtrl.create({
        title: 'Oferta para realizar Delivery',
        subTitle: this.fname+' te confirmará la Oferta que le hagas para comenzar el Delivery. \n (Puede cambiar la Fecha de delivery y Costo si lo desea)',
        inputs: [
          {
            name: 'maxDeliveryDate',
            placeholder: '',
            label: 'Fecha de Delivery',
            type: 'date',
            value: this.maxDeliveryDate,
          },
          {
            name: 'cost',
            placeholder: 'Ingrese el Costo que le parezca..',
            label: 'Costo propuesto',
            type: 'number',
            value: this.cost,
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancelo Oferta');
            }
          },
          {
            text: 'Aceptar',
            handler: data => {
              if (data.maxDeliveryDate !== "" && data.cost !== "") {
                this.presentPickAMommentConfirm(data.maxDeliveryDate, data.cost, re_offert)
              } else {
                this.alertValidator();
              }
            }
          }
        ]
      });
      alert.present();
    }

    //for orders provides from Clients/Restaurantes
    presentDeliveryClientConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Llevar Pedido',
        subTitle: 'Estás aceptando todas las condiciones del Pedido. '+this.fname+' '+this.lname+' va a ser notificado.',
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
              this.goOrderService.acceptClientOrder(this.id_order, this.id_user_order, this.user_id)
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
                      //send order accepted notification to the User
                      this.tokenService.sendOrderAccepted(this.id_user_order, this.id_order, fname_delivery, lname_delivery, package_detail.name ).subscribe(console.log, console.log)
                      this.navCtrl.setRoot(OrdersPage, {showTab: 'deliveries'})
                    } else {
                      this.errorDB();
                    }
                  }, 
                  err=>{
                    this.loading.dismiss();
                    this.errorDB();
                  }
                );
            }
          }
        ]
      });
      alert.present();
    }

    private alertValidator() {
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Debes completar los datos obligatorios',
        buttons: ['OK'],
      });

      alert.present();
    }
    presentPickAMommentConfirm(maxDeliveryDate, cost, re_offert = null){
         var logged = false;
         
         let prompt = this.alertCtrl.create({
          title: 'Ahora confirma cuando puedes retirarlo!',
          message: 'Selecciona en que momento puedes',
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
                 if (mommentPickup) {
                    this.presentPickAMommentFinalConfirm(maxDeliveryDate, mommentPickup, cost, re_offert); 
                 } else {
                   this.alertValidator();
                 }
                 
              }
          }]});
          prompt.present();


    }
    presentPickAMommentFinalConfirm(maxDeliveryDate, mommentPickup, cost, re_offert = null){
         var logged = false;
         
         let prompt = this.alertCtrl.create({
          title: 'Por último indica en que lo vas a llevar!',
          message: 'Selecciona el vehículo',
          inputs : [
          {
              type:'radio',
              label:'Caminando',
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
              label:'Colectivo',
              value:'colectivo',
              name: 'vehicle'
          },
          {
              type:'radio',
              label:'Furgon',
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
                if (data) {
                  this.presentLoadingOffert();

                  if(localStorage.getItem("logged") == 'true'){
                      logged = true;    
                      localStorage.setItem("vehicle", vehicle);
                    }
                

                  //por si regresa a la app, chequea LS
                  if(localStorage.getItem("logged") == 'true'){
                    logged = true;

                    var toast = this.toast.create({
                        message: 'YA HAZ REALIZADO UNA OFERTA!',
                        duration: 3000,
                        position: 'middle'
                      });
                    let status = 'en negociacion';
                    let delivery_id = localStorage.getItem("user_id");
                    let order_id = localStorage.getItem("id_order_pre_offert");
                    if(!order_id){
                      order_id = localStorage.getItem('id_order');
                    }
                    
                    let user_id_order = this.id_user_order;
                    if(!user_id_order){
                      user_id_order = localStorage.getItem("idUserOrder_pre_offert");    
                    }
                    

                    let message = '';
                    //enviar ofert a usuario (save businesses)
                    var vehicle = data;
                    this.goOrderService.sendOffert(maxDeliveryDate,mommentPickup, cost,
                      delivery_id, user_id_order, order_id, status, vehicle, re_offert)
                      .subscribe(
                        data=>{
                          if(this.platform.is('cordova')) {
                            data = JSON.parse(data.data);
                          }
                          this.loading.dismiss();
                          if(data.error){
                            let alert = this.alertCtrl.create({
                              title : 'Error',
                              subTitle: data.error,
                              buttons: ['OK'],
                            });

                            alert.present(); 
                          }else{
                            this.order_info = data['order'];
                            this.businesses = data['businesses'];
                            if (localStorage.getItem('new_offert_push').toString() === '1') {
                            this.tokenService.sendOffertPush(user_id_order).subscribe(console.log, console.log)
                            }
                            this.navCtrl.setRoot(OrdersPage, {showTab: 'deliveries'})
                          }
                        }, 
                        err=>{
                          this.loading.dismiss();
                          toast.present();
                        }
                      );
                  }else{
                    this.loading.dismiss();
                    let currentIndex = this.navCtrl.getActive().index;
                    localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                    this.navCtrl.push(PreOrderPage, {send_offert: true}).then(() => {
                      this.navCtrl.remove(currentIndex);
                    })
                  }
                } else {
                  this.alertValidator();
                }
              }
          }]});
          prompt.present();
    }


    //enviar calificacion
    
     presentRatingPrompt(){
         var logged = false;
         
         let prompt = this.alertCtrl.create({
          title: 'Califica Al Usuario',
          message: 'Es importante para que la comunidad sepa como se maneja',
          inputs : [
          {
              type:'radio',
              label:'Muy Malo',
              value:'1',
              name: 'rating'

          },
          {
              type:'radio',
              label:'Poco Confiable',
              value:'2',
              name: 'rating'
          },
          {
              type:'radio',
              label:'Normal',
              value:'3',
              name: 'rating'
          },
          {
              type:'radio',
              label:'Muy Bueno!',
              value:'4',
              name: 'rating'
          },
          {
              type:'radio',
              label:'Excelente!',
              value:'5',
              name: 'rating'
          }],
          buttons : [
          {
              text: "Cancelar",
              handler: data => {
                
              }
          },
          {
              text: "Enviar Calificación",
              handler: data => {
                 if(localStorage.getItem("logged") == 'true'){
                    logged = true;    
                  }
               

                 //por si regresa a la app, chequea LS
                 if(localStorage.getItem("logged") == 'true'){
                   logged = true;

                  var toast = this.toast.create({
                      message: 'Ha ocurrido un error, intentalo de nuevo',
                      duration: 3000,
                      position: 'middle'
                    });
                   let user_id = localStorage.getItem("idUserOrder_pre_offert"); //el Usuario de la ORDEN
                   let report_by = localStorage.getItem("user_id"); //el Usuario logeado (Delivery)
                   let order_id = localStorage.getItem("id_order"); //la orden en si

                   var rating = data;
                   var to = 'user';
                   
                   this.presentLoadingRating();

                   this.goOrderService.sendRating(rating, user_id, report_by, order_id, to)
                    .subscribe(
                      data=>{
                        if(this.platform.is('cordova')) {
                          data = JSON.parse(data.data);
                        }
                        if(data.empty){
                          
                          this.loading.dismiss();

                           let alert = this.alertCtrl.create({
                            title : 'Error',
                            subTitle: 'Ya has calificado al Usuario en ésta Orden',
                            buttons: ['OK'],
                          });

                          alert.present(); 
                        }else{
                           this.loading.dismiss();
                           let fname = localStorage.getItem('fname');
                           let lname = localStorage.getItem('lname');
                           this.tokenService.sendRatingPush(user_id, fname, lname, rating).subscribe(console.log, console.log)
                           this.navCtrl.push(OrdersPage, {showTab: 'deliveries'});  
                        }
                      }, 
                      err=>toast.present()


                    );
                 }else{
                   this.navCtrl.pop();
                   localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');

                   //enviar push
                   this.navCtrl.push(PreOrderPage, {send_offert: true});
                 }
              }
          }]});
          prompt.present();
    }

    //enviar calificacion
    
     presentRatingDeliveryPrompt(){
         var logged = false;
         
         let prompt = this.alertCtrl.create({
          title: 'Califica Al Delivery',
          message: 'Es importante para que la comunidad sepa como trabaja',
          inputs : [
          {
              type:'radio',
              label:'Muy Malo',
              value:'1',
              name: 'rating'

          },
          {
              type:'radio',
              label:'Poco Confiable',
              value:'2',
              name: 'rating'
          },
          {
              type:'radio',
              label:'Normal',
              value:'3',
              name: 'rating'
          },
          {
              type:'radio',
              label:'Muy Bueno!',
              value:'4',
              name: 'rating'
          },
          {
              type:'radio',
              label:'Excelente!',
              value:'5',
              name: 'rating'
          }],
          buttons : [
          {
              text: "Cancelar",
              handler: data => {
                
              }
          },
          {
              text: "Enviar Calificación",
              handler: data => {
                 if(localStorage.getItem("logged") == 'true'){
                    logged = true;    
                  }
               

                 //por si regresa a la app, chequea LS
                 if(localStorage.getItem("logged") == 'true'){
                   logged = true;

                  var toast = this.toast.create({
                      message: 'Ha ocurrido un error, intentalo de nuevo',
                      duration: 3000,
                      position: 'middle'
                    });
                   let user_id = localStorage.getItem("idDeliveryOrder_pre_offert");
                   let report_by = localStorage.getItem("user_id");
                   let order_id = localStorage.getItem("id_order");
                   
                   

                   let message = '';
                   //enviar ofert a usuario (save businesses)
                   var rating = data;
                   var to = 'delivery';
                   this.presentLoadingRating();

                   this.goOrderService.sendRating(rating, user_id, report_by, order_id, to)
                    .subscribe(
                      data=>{
                        if(this.platform.is('cordova')) {
                          data = JSON.parse(data.data);
                        }
                        if(data.empty){
                           this.loading.dismiss();
                           let alert = this.alertCtrl.create({
                            title : 'Error',
                            subTitle: 'Ya has calificado al Delivery en ésta Orden',
                            buttons: ['OK'],
                          });

                          alert.present(); 
                        }else{
                          this.loading.dismiss();
                           let fname = localStorage.getItem('fname');
                           let lname = localStorage.getItem('lname');
                           this.tokenService.sendRatingPush(user_id, fname, lname, rating).subscribe(console.log, console.log)
                           this.navCtrl.push(OrdersPage);
                        }
                      }, 
                      err=>toast.present()


                    );
                 }else{
                   this.navCtrl.pop();
                   localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                   this.navCtrl.push(PreOrderPage, {send_offert: true});
                 }
              }
          }]});
          prompt.present();
    }

    //enviar ubicacion
    presentLocalization(delivery){
      let alert = this.alertCtrl.create({
        title: 'Enviar ubicación actual',
        message: 'Indica al Usuario por donde vas',
        buttons: [
          {
            text: 'Aún no he salido',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Enviar Ubicación!',
            handler: () => {
              
              let current_address = localStorage.getItem('current_address');
              let delivery_id = localStorage.getItem("user_id"); //Quien Va a Cancelar el Pedido
              let order_id = localStorage.getItem('id_order'); //De que orden Trata
              let user_id = localStorage.getItem('idUserOrder_pre_offert'); //De que orden Trata
                   

              this.goOrderService.sendCurrentLocation(delivery_id, order_id, current_address, user_id)
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
                            this.tokenService.sendLocationPush(user_id, current_address).subscribe(console.log, console.log)
                            let alert = this.alertCtrl.create({
                              title : 'GENIAL!',
                              subTitle: 'Acabas de Notificar tu Ubicación actual.',
                              buttons: ['OK'],
                            });

                            alert.present(); 
                           this.navCtrl.push(OrdersPage)
                        }
                      }, 
                    );    

              

            }
          }
        ]
      });
      alert.present();  
    }

    //cancelar pedido
    presentCancelMessagePrompt(dateDelivery) {
      let alert = this.alertCtrl.create({
        title: 'Cancelar Pedido',
        message: 'Realmente deseas cancelar?',
        buttons: [
          {
            text: 'Cancel',
            role: 'No, me arrepentí',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Si, quiero cancelar',
            handler: () => {
              
              var today = new Date();
              var dd = today.getDate();
              var mm = today.getMonth()+1;
              var yyyy = today.getFullYear();

              var ddS;
              var mmS;
               if(dd<10) {
                   ddS = '0'+dd
              }else{
                ddS = dd;
              } 

              if(mm<10) {
                  mmS = '0'+mm
              } else{
                mmS = mm;
              } 

              var todayS= yyyy + '-' + mmS + '-' + ddS;
              
              if(todayS>dateDelivery)
              {
                  let alert = this.alertCtrl.create({
                    title : 'NO PUEDE CANCELAR ÉSTA ORDEN',
                    subTitle: 'Los terminos y condiciones de EnvioEntergas indican que el mismo día de la fecha de retiro del pedido, o días posteriores a ello. No puede cancelar el Pedido.',
                    buttons: ['OK'],
                  });
                  alert.present(); 
              }
              else
              {
                  this.presentReasonCancel();
              }

            }
          }
        ]
      });
      alert.present();
    }


    //Se elije la razon de porque se cancela
    presentReasonCancel(){
         var logged = false;
         
         let prompt = this.alertCtrl.create({
          title: 'Razon de Cancelación',
          message: 'Selecciona en porque motivo cancelas',
          inputs : [
          {
              type:'radio',
              label:'No va a haber nadie en la dirección de Retiro y/o Entrega',
              value:'No va a haber nadie en la dirección de Retiro y/o Entrega',
              name: 'reason'

          },
          {
              type:'radio',
              label:'Me arrepentí de enviar el Pedido',
              value:'Me arrepentí de enviar el Pedido',
              name: 'reason'
          },
          {
              type:'radio',
              label:'Lo voy a solicitar nuevamente mas adelante',
              value:'Lo voy a solicitar nuevamente mas adelante',
              name: 'reason'
          },
          {
              type:'radio',
              label:'Motivos personales',
              value:'Motivos personales',
              name: 'reason'
          }],
          buttons : [
          {
              text: "Volver",
              handler: data => {
                
              }
          },
          {
              text: "Cancelar Pedido",
              handler: data => {
                 
                 if(localStorage.getItem("logged") == 'true'){
                   logged = true;

                    var toast = this.toast.create({
                      message: 'Ha ocurrido un error, intenta nuevamente',
                      duration: 3000,
                      position: 'middle'
                    });

                   
                   let user_id = localStorage.getItem("user_id"); //Quien Va a Cancelar el Pedido
                   let order_id = localStorage.getItem('id_order'); //De que orden Trata

                   let user_id_order = this.id_user_order;
                   if(!user_id_order){
                     user_id_order = localStorage.getItem("idUserOrder_pre_offert");    
                   }
                   this.orderService.cancelOrder(user_id, order_id)
                    .subscribe(
                      data=>{
                        if (this.platform.is('cordova')) {
                          data = JSON.parse(data.data);
                        }
                        if(data.error){
                           let alert = this.alertCtrl.create({
                            title : 'Error',
                            subTitle: data.error,
                            buttons: ['OK'],
                          });

                          alert.present(); 
                        }else{
                           this.deliveriesToNotifyCancel = data['deliveries'];
                             for(let d= 0; d<this.deliveriesToNotifyCancel.length; d++){
                               this.tokenService.sendCancelPush(this.deliveriesToNotifyCancel[d]).subscribe(console.log, console.log)    
                             }
                           
                           this.navCtrl.setRoot(OrdersPage)
                        }
                      }, 
                      err=>toast.present()
                    );
                 }else{
                   this.navCtrl.pop();
                   localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                   this.navCtrl.push(PreOrderPage, {send_offert: true});
                 }
              }
          }]});
          prompt.present();
    }


    showmore(orderid){
      document.getElementById('first-'+orderid).style.display = "none";
      document.getElementById('second-'+orderid).style.display = "block";

      }
    
    showless(orderid){
      document.getElementById('first-'+orderid).style.display = "block";
      document.getElementById('second-'+orderid).style.display = "none";
    }
    
    errorDB(){
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'ha ocurrido un error de conexión y datos.',
        buttons: ['OK'],
      });

      alert.present();
    }

    viewPhoto(photoName){
      let imageModal = this.modalCtrl.create(ViewImagePage, { img: photoName });
       imageModal.present();
    }

    close() {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(OrdersPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
}
