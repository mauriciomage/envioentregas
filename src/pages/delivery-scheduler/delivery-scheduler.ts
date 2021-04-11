import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController, ToastController, NavController, Platform  } from 'ionic-angular';
import { Delivery } from '../delivery/delivery.model';
import { DeliverySchedulerService } from './services/deliveryScheduler.service';
import { ModalController } from 'ionic-angular';
import { DeliveryDaysPage } from '../delivery-days/delivery-days';
import { NewCityPage } from '../new-city/new-city';
declare var google:any;

@Component({
  selector: 'page-delivery-scheduler',
  templateUrl: 'delivery-scheduler.html',
})

export class DeliverySchedulerPage {

	schedulers:any[];
	days:Delivery[];   
	loading:any;
  title: string;
  empty_scheduler: Boolean = false;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private deliverySchedulerService: DeliverySchedulerService,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private platform: Platform
  ) {}
  ionViewWillEnter() {
    this.title = 'Disponibilidad'
    if(this.navParams.get('scheduler')){
      this.schedulers = this.navParams.get('scheduler')
  	}else{
      let user_id = localStorage.getItem('user_id');
      this.getScheduler(user_id);
    }
  }


  show(schedulerid, days){
  	this.days = days;
  	document.getElementById('second-'+schedulerid).style.display = 'block';
  }

  hidden(schedulerid){
  	document.getElementById('second-'+schedulerid).style.display = 'none';
  }

  presentEditHours(schedulerid, day, startHour, finishHour){
  	const prompt = this.alertCtrl.create({
      title: 'Disponibilidad del '+day,
      message: "Indica la hora desde y hasta si deseas editarlas",
      inputs: [
        {
          name: 'startHour',
          placeholder: 'hh:mm',
          type: 'time',
          value: startHour

        },
        {
          name: 'finishHour',
          placeholder: 'hh:mm',
          type: 'time',
          value: finishHour

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
          	let startHour = data.startHour;
          	let finishHour = data.finishHour;
          	if(startHour == "" || finishHour == ""){


          	}else{

          		
          	}
          }
        }
      ]
    });
    prompt.present();	
  }

  presentDeliveryDelete(city, deliveryid) {
    this.alertCtrl.create({
      title: 'Eliminar Ciudad',
      message: 'Está a punto de eliminar '+city+'. Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.loadingDelete();
          	let user_id = localStorage.getItem('user_id');
          	this.deliverySchedulerService.deleteDelivery(user_id, deliveryid)
          	.subscribe(
              data=>{
                if (this.platform.is('cordova')) {
                  data = JSON.parse(data.data);
                }
              	this.loading.dismiss();
                if(data['error']){
	        	      this.showErrorAlert();
                }else{
                  this.toastCtrl.create({
                  message: 'Disponibilidad eliminada correctamente',
                  duration: 3000
                  }).present();
                  this.getScheduler(user_id);	
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
    }).present();
  }

  getScheduler(userid){
  	this.loadingGetScheduler();
  	this.deliverySchedulerService.getSchedulerDelivery(userid)
  	.subscribe(
      data=>{
        this.loading.dismiss();
        if(data.error){
           this.showErrorAlert();
        }else{
           this.schedulers = data['schedulers'];
           if(this.schedulers.length === 0) {
             this.empty_scheduler = true;
           }
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
  showErrorAlert(){

    let alert = this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
      buttons: ['OK'],
    });

    alert.present();

  }	

  public showSchedulerDays(delivery){
    const modal = this.modalCtrl.create(DeliveryDaysPage, {deliveryid: delivery});
    modal.present();
  }

  public addNew(){
    const modal = this.modalCtrl.create(NewCityPage);
    modal.present();
  }

  
    loadingDelete() {
      this.loading = this.loadingCtrl.create({
        content: 'Eliminando'
      });
      this.loading.present();
    }

    
    loadingGetScheduler() {
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo Disponibilidad...'
    });
    this.loading.present();
  }

}