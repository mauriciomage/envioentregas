import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, Platform } from 'ionic-angular';
import { LoginPage  } from '../login/login';
import { PhoneNumberPage  } from '../phone-number/phone-number';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { TokenService } from '../../services/token.service';
import { FCM } from '@ionic-native/fcm/ngx';  



@Component({
  selector: 'page-pre-order',
  templateUrl: 'pre-order.html',
})
export class PreOrderPage {
	title:string = '';
	SEND_OFFERT:Boolean = false;
  LoginPage: any;
  userData = null;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public facebook: Facebook,
    public tokenService: TokenService,
    public orderService: OrderServiceProvider,
    private fcm: FCM,
    private platform: Platform
  ) {
      if (navParams.get("send_offert")) {
        this.SEND_OFFERT = true;
      }
      this.LoginPage = LoginPage;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreOrderPage');
  }

  toLogin(){
    if(this.SEND_OFFERT){
      this.navCtrl.push(LoginPage, {send_offert: this.SEND_OFFERT});
    }else{
      this.navCtrl.push(LoginPage, {pre_order: true});
    }

  }
  loginWithFB(){
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse)=> {
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
          data=>{
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

                  this.fcm.getAPNSToken().then(tokenKey => {
                    this.tokenService.saveToken(tokenKey, data['id'], 'ios').subscribe(console.log, console.log)
                  });

                  this.fcm.getToken().then(token => {
                    this.tokenService.saveToken(token, data['user'].id, 'android').subscribe(console.log, console.log)
                  }, (error) => {
                    console.log('error retrieving token: ' + error);
                  });

                this.navCtrl.push(PreProfilePage);
          },
          err=>this.showErrorAlertFB(err)
        );
        });
    });
  }

  public firstStepSignUp(parameters){
    let email = parameters.value.email;
    let password = parameters.value.password;
    let fname = parameters.value.fname;
    let lname = parameters.value.lname;

        //==========Email validate=============
        let email_validated = true;
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!regExp.test(email)) {
          email_validated = false;
        }else{
          email_validated = true;
        }
        //==========End Email validate==========

        //==========password validate=============
        let password_validated = true;
        let regExp2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!regExp2.test(password)) {
          password_validated = false;
        }else{
          password_validated = true;
        }
        //==========End Email validate==========


    if(email == "" || password == "" || fname == "" || lname == ""){
      let alert = this.alertCtrl.create({
        title : 'Atento!',
        subTitle: 'Los datos son obligatorios',
        buttons: ['OK'],
      });

      alert.present();
    }
   else if(!email_validated){
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Debes indicar un email válido',
        buttons: ['OK'],
      });

      alert.present();
    }
    else if(!password_validated){
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'La contraseña debe contener números y letras con al menos 6 caracteres',
        buttons: ['OK'],
      });

      alert.present();
    }
    else{
      localStorage.setItem("email", email);
      localStorage.setItem("fname_logged", fname);
      localStorage.setItem("lname_logged", lname);
      localStorage.setItem("password", password);

      this.navCtrl.push(PhoneNumberPage, {send_offert: this.SEND_OFFERT});

    }
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

}
