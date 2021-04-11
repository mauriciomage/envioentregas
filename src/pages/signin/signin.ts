import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, LoadingController, Platform, ModalController } from 'ionic-angular';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { VerifyCodePage  } from '../verify-code/verify-code';
import {TokenService} from '../../services/token.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { FCM } from '@ionic-native/fcm/ngx';  
import { NewCityPage } from '../new-city/new-city';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  title:String = 'Nueva Cuenta';
  userData = null;
  email:string;
  loading:any;
  isClient: boolean = false;
  places: any[];

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
  	public phoneService: PhoneServiceProvider,
    public tokenService: TokenService,
    public facebook: Facebook,
    public orderService: OrderServiceProvider,
    public loadingCtrl: LoadingController,
    private fcm: FCM,
    private platform: Platform,
    public modalCtrl: ModalController
  ) {


  }

  ionViewDidLoad() {
    this.places = [];
    if(this.navParams.get('email')){
      this.email = this.navParams.get('email');
    }
    
  }

  //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Registrando...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============  

  public signin(parameters) {
    let email = parameters.value.email;
    let password = parameters.value.password;
    let passwordOK = parameters.value.passwordOK;
    let fname = parameters.value.fname;
    let lname = parameters.value.lname;
    let phone = parameters.value.phone;
    const placesLocalStorage = localStorage.getItem('places');
    placesLocalStorage ? this.places = JSON.parse(placesLocalStorage) : this.places;

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

    if(email == "" || password == "" || fname == "" || lname == "" || passwordOK == "" ){
      let alert = this.alertCtrl.create({
        title : 'Atento!',
        subTitle: 'Los datos son obligatorios',
        buttons: ['OK'],
      });

      alert.present();
    }
    else if(password !== passwordOK){
    	let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Las contraseñas son diferentes',
        buttons: ['OK'],
      });

      alert.present();
    }else if(!email_validated){
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
    else if (phone.length !== 10){
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'El número de celular en ARG es de 10 dígitos (incluído el código de área sin el 0 y el número sin el 15)',
        buttons: ['OK'],
      });

      alert.present();
    }
    else {
    	localStorage.setItem("email", email);
	    localStorage.setItem("fname", fname);
	    localStorage.setItem("lname", lname);
	    localStorage.setItem("password", password);
      localStorage.setItem("phone", phone);
      
      this.presentLoadingDefault();
      this.phoneService.generatePhoneCode(phone, email, fname, lname, password, this.isClient, this.places)
      .subscribe(
        data => {
          if (this.platform.is('cordova')) {
            data = JSON.parse(data.data);
          }
          this.loading.dismiss();
          if (data.error) {
              let alert = this.alertCtrl.create({
              title : 'Error',
              subTitle: data.error,
              buttons: ['OK'],
            });

            alert.present();
          } else {
            if (this.isClient) {
              this.alertCtrl.create({
                title : 'Bien!',
                subTitle: 'No olvides de cargar la direccion de tus Sucursales en tu Perfil.',
                buttons: ['OK'],
              }).present();
            }
            localStorage.setItem("user_id", data.id_user);
            this.navCtrl.push(VerifyCodePage, { signin: true });
          }
        },
      () => this.showErrorAlert());
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


  public showErrorAlert(){
    (this.loading) ? this.loading.dismiss() : this.loading
  	let alert = this.alertCtrl.create({
        title : 'Atención!',
        subTitle: 'Los datos concuerdan con un Usuario ya creado',
        buttons: ['OK'],
      });

      alert.present();
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
