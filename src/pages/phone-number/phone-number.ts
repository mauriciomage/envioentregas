import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Loading, LoadingController, Platform } from 'ionic-angular';
import { VerifyCodePage  } from '../verify-code/verify-code';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
})
export class PhoneNumberPage {
	
  title: string = 'INDIQUE SU CELULAR';
  SEND_OFFERT:Boolean = false;	
  loading: any;


  	constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController, 
        public phoneService: PhoneServiceProvider,
        public toast:ToastController,
        private loadingCtrl: LoadingController,
        private platform: Platform
      ) {
    	if(navParams.get("send_offert")){
          this.SEND_OFFERT = true;
      }
  	}

  ionViewDidLoad() {
    
  }

  public verifyPhoneNumber(parameter){
  	let phone = parameter.value.phone;
    let email = localStorage.getItem("email");
    let fname = localStorage.getItem("fname_logged");
    let lname = localStorage.getItem("lname_logged");
    let password = localStorage.getItem("password");

  	if(phone == ""){
      let alert = this.alertCtrl.create({
        title : 'Atento!',
        subTitle: 'Debes indicar tu Celular',
        buttons: ['OK'],
      });

      alert.present(); 
    }
    else if(phone.length !== 10){
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'El número de celular en ARG es de 10 dígitos (incluído el código de área sin el 0 y el número sin el 15)',
        buttons: ['OK'],
      });

      alert.present();
    }
    else{

    	localStorage.setItem("phone", phone);
	     var toastOK = this.toast.create({
          message: 'Vuelve atrás y modifica los datos. Un usuario con esos datos ya existe en la plataforma.',
          duration: 4000,
          position: 'middle'
        });
      this.loadingPhoneCode();
      this.phoneService.generatePhoneCode(phone, email, fname, lname, password)
      .subscribe(
          data=>{
            if(this.platform.is('cordova')) {
              data = JSON.parse(data.data);
            }
            this.loading.dismiss();
            if(data.error_phone){
               let alert = this.alertCtrl.create({
                title : 'Error',
                subTitle: 'Se ha producido un error creando el Usuario, intente con otros datos o mas tarde',
                buttons: ['OK'],
              });

              alert.present(); 
            }else{
              localStorage.setItem("user_id", data.id_user);
              this.navCtrl.push(VerifyCodePage, {send_offert: this.SEND_OFFERT});
            }
              
          },  
          err=> {
            console.log(err);
            this.loading.dismiss();
            toastOK.present()
          }
        );
    }
  }

  private loadingPhoneCode() {
    this.loading = this.loadingCtrl.create({
      content: 'Generando Codigo de validacion...'
    });
    this.loading.present();

  }
}
