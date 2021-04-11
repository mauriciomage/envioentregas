import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, Platform, Loading, LoadingController, ModalController } from 'ionic-angular';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { PricePage  } from '../price/price';
import { PreProfilePage  } from '../pre-profile/pre-profile';
import { GoOrderPage  } from '../go-order/go-order';
import { TokenService } from '../../services/token.service'
import { FCM } from '@ionic-native/fcm/ngx';
import { UserCreatedPage } from '../user-created/user-created';
import { LoginPage } from '../login/login';
import { tokenKey } from '@angular/core/src/view';

/**
 * Generated class for the VerifyCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var FCMPlugin;


@Component({
  selector: 'page-verify-code',
  templateUrl: 'verify-code.html',
})
export class VerifyCodePage {
  
  SEND_OFFERT:Boolean = false;
  FROM_SIGNIN:Boolean = false;
  title: string = 'Verificar Codigo';
  loading: any;
  constructor(
    private events: Events,
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private phoneService: PhoneServiceProvider,
    private tokenService:TokenService,
    private fcm: FCM,
    private loadingCtrl: LoadingController
  ) {
    if(this.navParams.get("send_offert")){
      this.SEND_OFFERT = true;

    }
    this.FROM_SIGNIN = navParams.get("signin");
  }

  ionViewDidLoad() {
  }

  verifyCode(parameter) {
  	let code = parameter.value.phone_code;
    let user_id = localStorage.getItem("user_id");

    if (code == "") {
      this.alertCtrl.create({
        title : 'Atento!',
        subTitle: 'Debes indicar el Codigo',
        buttons: ['OK'],
      }).present(); 
    } else {
      this.loadingVerifyCode();
      this.phoneService.verifyPhoneCode(code,user_id)
      .subscribe(
        data => {
          this.loading.dismiss();
          if (data.error) {
            if (data.error == 'ERROR_PHONE_CODE_VERIFY') {
              this.alertCtrl.create({
                title : 'Error',
                subTitle: 'El Codigo ingresado es Incorrecto.',
                buttons: ['OK'],
              }).present(); 
            } else {
              this.showErrorAlert();
            }
          } else {
            let user = data['result']; 
            this.events.publish('user:logged', user, Date.now());
            localStorage.setItem("logged", 'true');
            localStorage.setItem("user_id", user['id']);
            localStorage.setItem("fname_logged", user['fname']);
            localStorage.setItem("lname_logged", user['lname']);
            localStorage.setItem("email", user['email']);
            localStorage.setItem("photo", user['photo']);
            localStorage.setItem("phone_checked", user['phone_checked']);
            localStorage.setItem("verified", user['verified']); 
            localStorage.setItem("isClient", user['is_client']);  
            localStorage.removeItem("password");
            
            this.fcm.getAPNSToken().then(token => {
              this.tokenService.saveToken(token, user['id'], 'ios').subscribe(console.log, console.log)
            }, (error) => {
              console.log('error retrieving token: ' + error);
            });

            this.fcm.getToken().then(token => {
              this.tokenService.saveToken(token, user['id'], 'android').subscribe(console.log, console.log)
            }, (error) => {
              console.log('error retrieving token: ' + error);
            });

            let currentIndex = this.navCtrl.getActive().index; 
            this.navCtrl.push(LoginPage, { action: 'newuser' }).then(() => {
                this.navCtrl.remove(currentIndex);
            });
          }
        },  
        () => {
          this.loading.dismiss();
          this.showErrorAlert()
        }
      );
    }
  }

  showErrorAlert() {
    let alert = this.alertCtrl.create({
      title : 'Algo salió mal!',
      subTitle: 'Ha ocurrido un error en la conexión, intente nuevamente',
      buttons: ['OK'],
    });
  
    alert.present();
  }

  private loadingVerifyCode() {
    this.loading = this.loadingCtrl.create({
      content: 'Generando Codigo de validacion...'
    });
    this.loading.present();

  }
}
