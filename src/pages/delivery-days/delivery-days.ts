import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController, ViewController, Platform  } from 'ionic-angular';
import { DeliveryDaysService } from './services/delivery-days.service';
import * as moment from 'moment'; 

@Component({
  selector: 'page-delivery-days',
  templateUrl: 'delivery-days.html',
})

export class DeliveryDaysPage {

days:any[];
delivery_id:string; 
loading:any;
title: string;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private deliveryDayService: DeliveryDaysService,
    public viewCtrl: ViewController,
    private platform: Platform
  ) {
    this.title = 'mi agenda'
    this.delivery_id = this.navParams.get('deliveryid')
  }
  ionViewWillEnter() {
    this.getDays(this.delivery_id)
  }

    public getDays(delivery) {
      this.loadingDays();
      this.deliveryDayService.getSchedulerDays(delivery)
       .subscribe(
        data=>{
        this.loading.dismiss();
        if(data.error){
          this.showErrorAlert();
        }else{
          this.days = data['days'];
          console.log(this.days);
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

    loadingDays() {
        this.loading = this.loadingCtrl.create({
        content: 'Obteniendo días...'
        });
        this.loading.present();
    }

    showErrorAlert(){
        let alert = this.alertCtrl.create({
            title : 'Error',
            subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
            buttons: ['OK'],
        });
        alert.present();
    }

    closeModal() {
      this.viewCtrl.dismiss();
    }
    presentHoursDay(day) {
      let alert = this.alertCtrl.create({
        title: 'Horarios Disponibles',
        subTitle: 'Modifica si te es necesario',
        inputs: [
          {
            name: 'hour_start',
            type: 'time',
            value: day.hour_start !== '' ? day.hour_start :  moment().format('hh:mm a')
          },
          {
            name: 'hour_finish',
            type: 'time',
            value: day.hour_finish !== '' ? day.hour_finish :  moment().format('hh:mm a')
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
            text: 'Guardar',
            handler: data => {
               
              this.presentLoadingHoursChanged();

               let user_id = localStorage.getItem('user_id');
               if(data.hour_start == "" || data.hour_finish == ""){
                  let alert = this.alertCtrl.create({
                    title : 'Error',
                    subTitle: 'Ambas horas deben ser completadas',
                    buttons: ['OK'],
                  });

                  alert.present();
               }else{
                this.deliveryDayService.saveCalendarDay(day.id, data.hour_start, data.hour_finish)
                    .subscribe(
                      data=>{
                        if (this.platform.is('cordova')) {
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
                          this.ionViewWillEnter();
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
          }
        ]
      });
      alert.present();  
    }

    hoursDayDelete(id) {
      this.deliveryDayService.deleteDayCalendar(id)
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
            this.getDays(this.delivery_id)
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

    presentLoadingHoursChanged() {
		  this.loading = this.loadingCtrl.create({
		    content: 'Guardando...'
		  });
		  this.loading.present();
		}
}