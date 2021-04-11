import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { DeliveryService } from './services/delivery.service';
import { SigninPage } from '../../pages/signin/signin';
import { DeliverySchedulerPage } from '../delivery-scheduler/delivery-scheduler';

/**
 * Generated class for the ViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

	title:string;
  loading:any;
  user_id: string;
  array_error: any[];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private deliveryService: DeliveryService,
    private platform: Platform
  ) {
  	
  }

  ionViewDidLoad() {
    this.title = 'Ser Delivery';
  }

  //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Corroborando Usuario...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============



  checkUser(data){
    let email = data.value.email;

      //==========Email validate=============
      let email_validated = true;
      let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!regExp.test(email)) {
        email_validated = false;
      }else{
        email_validated = true;
      }
      //==========End Email validate=========

      if(email !== ""){

          if(!email_validated){

              let alert = this.alertCtrl.create({

                title : 'Validacion',
                subTitle: "Debe indicar un email válido",
                buttons: ['OK'],  

              });

            alert.present();

          }else{
             this.presentLoadingDefault(); 
              this.deliveryService.checkUserForDelivery(email)
              .subscribe(
              data=>{
                  if(this.platform.is('cordova')) {
                    data = JSON.parse(data.data);
                  }
                  
                  //usuario existente pero no verificado
                  if(data.error){
                    this.loading.dismiss();
                     let alert = this.alertCtrl.create({

                        title : 'Validacion',
                        subTitle: "El email no pertenece a ninguna cuenta. Deseas crearte una?",
                        buttons: [
                              {
                                  text: 'Si',
                                  handler: () => {
                                      this.navCtrl.push(SigninPage);
                                  }
                              }, {
                                  text: 'Cancelar',
                                  handler: () => {
                                  }
                              }
                          ]

                      });

                      alert.present();
                  }else if(data.error == 'ERROR_LOGIN'){
                    this.loading.dismiss();
                    this.showErrorAlert('ERROR_LOGIN');
                  }
                  else{
                    this.user_id = data['user'].id;
                    this.navCtrl.push(DeliverySchedulerPage, {user_id: this.user_id});
                    this.loading.dismiss();
                    
                    

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

      }else{

          let alert = this.alertCtrl.create({

              title : 'Validacion',
              subTitle: "Debe indicar email",
              buttons: ['OK'],

            });

            alert.present();

      }
      
     

  }


  showErrorAlert(type){
    if(type=='ERROR_LOGIN'){
        let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'El Usuario y/o Contraseña, son incorrectos',
        buttons: ['OK'],
      });

      alert.present();
    }else if('ERROR_CODE_VERIFIED'){
        let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Ha ocurrido un error. intenta nuevamente generando uno nuevo como lo hizo recién.',
        buttons: ['OK'],
      });

      alert.present();
    }

  }


}
