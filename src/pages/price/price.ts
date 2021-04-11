import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController, Events, Platform } from 'ionic-angular';
import { PriceService } from './services/price.service';
import { PreOrderPage  } from '../pre-order/pre-order';
import { GoOrderPage  } from '../go-order/go-order';
import { OrdersPage  } from '../orders/orders';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { NewOrderPage } from '../new-order/new-order';

declare var FCMPlugin;
@Component({
  selector: 'page-price',
  templateUrl: 'price.html',
})
export class PricePage {
  title : string;
  titleCard: string;
  titlePrice: string;
  costStipulated: any;
  finalCost: number;
	serviceStipulated : number;
  realCost : number;
  insuranceCost : number = 0;
  isInsuranced: Boolean = false;
  preOrderPage: PreOrderPage;
  pre_order:boolean = true;
  loading:any;
  isClient: boolean;
  userId;

  constructor(
     public nav:NavController,
     public events: Events,
     public navCtrl: NavController, 
     public navParams: NavParams,
     public priceService: PriceService,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     private storage: Storage,
     private platform: Platform,
     private fcm: FCM
   ) {
  }

  ionViewWillEnter() {
    this.userId = localStorage.getItem('user_id');
    if (!this.userId) {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(NewOrderPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
    this.finalCost = 0;
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
    this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
    this.title = this.isClient ? 'Costo  5/5' : 'Costo  6/6';
    this.checkUserType(this.isClient);
    let postalCode, dimensions, costStip, serviceStip, realCost;
    if (!this.isClient) {
      this.storage.get('postal_code').then((val) => {
          postalCode = val;
        });

      this.storage.get('dimensions').then((val) => {
          dimensions = val;
        });

      this.storage.get('cost_stipulated').then((val) => {
          costStip = val;
        });

      this.storage.get('service_stipulated').then((val) => {
          serviceStip = val;
        });

      this.storage.get('real_cost').then((val) => {
          realCost = val;
          this.costStipulated = costStip;
          this.serviceStipulated = serviceStip;
          this.realCost = realCost;
      });
    }
  }

  private checkUserType(isClient) {
    this.titleCard = isClient ? 'Indique el Costo del Producto' : '¿Cuanto estás dispuesto a pagar?';
    this.titlePrice = isClient ? 'Precio del Producto' : 'Precio Estimado';
    if (isClient) {
      this.costStipulated = 0;
      this.serviceStipulated = 0;
    }
  }

  costStipulatedOnChange() {
    if (this.costStipulated > 0) {
      this.serviceStipulated = 40;
      let costProduct: number = parseFloat(this.costStipulated);
      let serviceEE: number = costProduct * 0.035;
      this.serviceStipulated += serviceEE ;
      this.costStipulated = parseFloat(this.costStipulated)
      this.finalCost = this.costStipulated + this.serviceStipulated; 
    }
  }

  sendDataNewOrden(){
    var logged = false;
     var namePackage,description, photo, vehicle, dimensions, size, weight, 
     source_address, source_lat, source_lng, destination_address, destination_lat, destination_lng,cost_stipulated, service_stipulated
     , insurance_cost, date, hour;
    this.storage.get('name').then((val) => {
      namePackage = val;
    });
  	
  	this.storage.get('description').then((val) => {
       description = val;
    });

    this.storage.get('photo').then((val) => {
       photo = val;
    });

    this.storage.get('vehicle').then((val) => {
       vehicle = val;
    });

    this.storage.get('dimensions').then((val) => {
       dimensions = val;
    });

    this.storage.get('size').then((val) => {
       size = val;
    });

    this.storage.get('weight').then((val) => {
       weight = val;
    });

    this.storage.get('source_address').then((val) => {
       source_address = val;
    });

    this.storage.get('source_lat').then((val) => {
       source_lat = val;
    });

    this.storage.get('source_lng').then((val) => {
       source_lng = val;
    });

    this.storage.get('destination_address').then((val) => {
       destination_address = val;
    });

    this.storage.get('destination_address').then((val) => {
       destination_address = val;
    });

    this.storage.get('destination_lat').then((val) => {
       destination_lat = val;
    });

    this.storage.get('destination_lng').then((val) => {
       destination_lng = val;
    });

    this.storage.get('cost_stipulated').then((val) => {
      if (this.isClient) {
        cost_stipulated = this.finalCost;
      } else {
        cost_stipulated = val;
      }
    });

    this.storage.get('service_stipulated').then((val) => {
      if (this.isClient) {
        service_stipulated = this.serviceStipulated;
      } else {
        service_stipulated = val;
      }
    });

    this.storage.get('insurance_cost').then((val) => {
      if(val){
        insurance_cost = val;
      }else{
        insurance_cost = 0;
      }
    });

    this.storage.get('date').then((val) => {
       date = val;
    });

    this.storage.get('hour').then((val) => {
       hour = val;

        let coordenates = "("+source_lat+", "+source_lng+");("+destination_lat+", "+destination_lng+")";
        let user_id = localStorage.getItem("user_id");  

        //verifiºos si el usuario esta logeado
           this.events.subscribe('user:logged', (user, time) => {
              console.log('Welcome', user, 'at', time);
              if(user.username !== ""){
                logged = true;    
              }
            });

           //por si regresa a la app, chequea LS
           if(localStorage.getItem("logged") == 'true'){
             logged = true;
           }else{
             this.nav.push(PreOrderPage, {active: true});
             return;
           }

          // Se consulta si desea realmente publicar la Orden
          if (cost_stipulated > 0 && service_stipulated > 0) {
            this.alertCtrl.create({
            title: '¿Estás seguro de publicar ésta Orden?',
            message: this.isClient? 'Una vez publicada, cualquier Delivery podra aceptar y enviar inmediatamente el Pedido' : 'Una vez realizada la publicación, recibiras ofertas de Deliveries',
            buttons: [
              {
                text: 'No, no estoy seguro.',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel Publish Order');
                }
              },
              {
                text: 'Publicar ya!',
                handler: () => {
                  if (logged) {
                    if (cost_stipulated > 0 && service_stipulated > 0) {

                    }
                    this.presentLoadingDefault(); 
                    if (localStorage.getItem('order_published') !== 'true') {
                    this.priceService.saveOrder(namePackage, vehicle, dimensions, source_address, destination_address,  cost_stipulated, service_stipulated, insurance_cost, coordenates, date, hour,user_id, size, description, photo, this.isClient)
                    .subscribe(
                        data=>{
                          if (this.platform.is('cordova')) {
                            data = JSON.parse(data.data);
                          }
                          const id_order = data.order_id;
                          if (data.error) {
                              this.loading.dismiss();
                              let alert = this.alertCtrl.create({
                              title : 'Error',
                              subTitle: data.error,
                              buttons: ['OK'],
                            });

                            alert.present(); 
                          } else {
                              this.loading.dismiss();
                              this.storage.remove('name');
                              this.storage.remove('description');
                              this.storage.remove('charge_pre_offert');
                              this.storage.remove('cost_pre_offert');
                              this.storage.remove('date');
                              this.storage.remove('destination_address');
                              this.storage.remove('destination_lat');
                              this.storage.remove('destination_lng');
                              this.storage.remove('destination_pre_offert');
                              this.storage.remove('dimensions');
                              this.storage.remove('fname_pre_offert');
                              this.storage.remove('idUserOrder_pre_offert');
                              this.storage.remove('id_order_pre_offert');
                              this.storage.remove('maxDeliveryDate');
                              this.storage.remove('maxDeliveryDate_pre_offert');
                              this.storage.remove('mommentPickup');
                              this.storage.remove('name_pre_offert');
                              this.storage.remove('postal_code');
                              this.storage.remove('real_cost');
                              this.storage.remove('insurance_cost');
                              this.storage.remove('size');
                              this.storage.remove('weight');
                              this.storage.remove('source_address');
                              this.storage.remove('source_lat');
                              this.storage.remove('source_lng');
                              this.storage.remove('source_pre_offert');
                              this.storage.remove('vehicle');
                              this.storage.remove('description');
                              this.storage.remove('name');
                              this.storage.remove('hour');
                              this.storage.remove('cost_stipulated');
                              this.storage.remove('service_stipulated');

                              this.cleanOrderCreated();
                              
                              let fname = localStorage.getItem('fname_logged');
                              let lname = localStorage.getItem('lname_logged'); 
                              let currentIndex = this.navCtrl.getActive().index; 
                              this.navCtrl.push(GoOrderPage, {id_order: id_order, source: source_address, destination: destination_address, cost: cost_stipulated,
                              charge: service_stipulated, name:namePackage, maxDeliveryDate: date, mommentPickup: hour, status: 'cargada', size: size, 
                              weigth: weight, vehicle: vehicle, offerts: [], tracking: [], business_users: "", business_delivery: "", declined_offerts: "",
                                fname: fname, lname: lname, order_created: true, photo: photo}).then(() => {
                                  this.navCtrl.remove(currentIndex);
                                });  
                          }
                        },  
                        err=> {
                          this.loading.dismiss();
                          let alert = this.alertCtrl.create({
                          title : 'Error',
                          subTitle: 'Algo ha ocurrido, intenta nuevamente.',
                          buttons: ['OK'],
                        });
                        alert.present();
                        }
                      );
                    } else {
                        this.loading.dismiss();
                        if (this.isClient) {
                          this.alertCtrl.create({
                            title : 'Ya haz publicado tu Pedido!',
                            subTitle: 'En breve vas a ser notificado cuando un Delivery lo tome.',
                            buttons: ['OK'],
                          }).present();
                        } else {
                          this.alertCtrl.create({
                            title : 'Ya haz publicado la Orden!',
                            subTitle: 'Ahora espera las ofertas y elije la más conveniente.',
                            buttons: ['OK'],
                          }).present();
                        }
                        localStorage.removeItem('order_published');
                        this.navCtrl.push(OrdersPage);
                    }
                  }     
                }
              }
            ]
            }).present();
          } else {
            this.alertCtrl.create({
              title : 'Error',
              subTitle: 'El costo no es válido',
              buttons: ['OK'],
            }).present();
          }
    });

 }

    //===========LOADING CONTROLLER==============
      presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
        content: 'Publicando Pedido...'
      });

      this.loading.present();

    }
    //==========LOADING CONTROLLER=============

    presentNewPrice(){
      var logged = false;
      let alert = this.alertCtrl.create({
        title: 'Indicar lo que está dispuesto a Pagar',
        subTitle: 'De todas formas, luego al negociar con el Delivery se determina el Precio conveniente para ambos. Puede que sea el mismo.',
        inputs: [
          {
            name: 'new_cost',
            placeholder: '',
            label: 'Indique el monto',
            type: 'number',
            
          }
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
              this.costStipulated = parseFloat(data.new_cost);
              this.storage.set("cost_stipulated", this.costStipulated);
              if (this.insuranceCost > 0) {
                this.costStipulated = this.costStipulated + this.insuranceCost;
              }
             
              this.serviceStipulated =  parseFloat(data.new_cost) * 0.035;
              this.storage.set("service_stipulated", this.serviceStipulated);

              this.realCost =  parseFloat(data.new_cost) - this.serviceStipulated; 
              this.storage.set("real_cost", this.realCost);

            }
          }
        ]
      });
      alert.present();

    }

    presentInsurance(){
      var logged = false;
      let alert = this.alertCtrl.create({
        title: 'Indica el Valor Asegurado de lo que envías',
        subTitle: 'El seguro es OPCIONAL, el maximo valor que te van a Asegurar es hasta $5000',
        inputs: [
          {
            name: 'cost_product',
            placeholder: '',
            label: 'Indique el monto',
            type: 'number',
            
          }
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
              if(data.cost_product > 5000){
                this.showErrorMoreThan5000();
              }else{
                this.insuranceCost = data.cost_product * 0.05;
                this.costStipulated+= this.insuranceCost;
                this.storage.set("insurance_cost", this.insuranceCost);
                this.storage.set("cost_stipulated", this.costStipulated);
                this.isInsuranced = true;
              }
            }
          }
        ]
      });
      alert.present();

    }

    presentDeleteInsurance(){
      var logged = false;
      let alert = this.alertCtrl.create({
        title: 'Estás a punto de Quitar el Seguro. Deseas hacerlo?',
        subTitle: 'El seguro es OPCIONAL, el maximo valor que te van a Asegurar es hasta $5000',
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
              this.costStipulated -= this.insuranceCost;
              this.storage.remove("insurance_cost");
              this.storage.set("cost_stipulated", this.costStipulated);
              this.isInsuranced = false;
              this.insuranceCost = 0;
            }
          }
        ]
      });
      alert.present();

    }
    
  private showErrorMoreThan5000(){
    this.alertCtrl.create({
      title : 'Error',
      subTitle: 'El VA que Aseguramos es Hasta $5000',
      buttons: ['OK'],
    }).present();
  }  

  private showErrorAlert(){
    let alert = this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error, vuelve a cargar la Orden',
      buttons: ['OK'],
    });

    alert.present();  
  }

  private cleanOrderCreated() {
    localStorage.removeItem('name');
    localStorage.removeItem('description');
    localStorage.removeItem('charge_pre_offert');
    localStorage.removeItem('cost_pre_offert');
    localStorage.removeItem('date');
    localStorage.removeItem('destination_address');
    localStorage.removeItem('destination_lat');
    localStorage.removeItem('destination_lng');
    localStorage.removeItem('destination_pre_offert');
    localStorage.removeItem('dimensions');
    localStorage.removeItem('fname_pre_offert');
    localStorage.removeItem('idUserOrder_pre_offert');
    localStorage.removeItem('id_order_pre_offert');
    localStorage.removeItem('maxDeliveryDate');
    localStorage.removeItem('maxDeliveryDate_pre_offert');
    localStorage.removeItem('mommentPickup');
    localStorage.removeItem('name_pre_offert');
    localStorage.removeItem('postal_code');
    localStorage.removeItem('real_cost');
    localStorage.removeItem('insurance_cost');
    localStorage.removeItem('size');
    localStorage.removeItem('weight');
    localStorage.removeItem('source_address');
    localStorage.removeItem('source_lat');
    localStorage.removeItem('source_lng');
    localStorage.removeItem('source_pre_offert');
    localStorage.removeItem('vehicle');
    localStorage.removeItem('description');
    localStorage.removeItem('name');
    localStorage.removeItem('hour');
    localStorage.removeItem('cost_stipulated');
    localStorage.removeItem('service_stipulated');
  }

}
