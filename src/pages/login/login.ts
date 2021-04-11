import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, LoadingController, ActionSheetController, ToastController, Platform, ModalController } from 'ionic-angular';
import { PricePage } from '../price/price';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { VerifyCodePage } from '../verify-code/verify-code';
import { GoOrderPage  } from '../go-order/go-order';
import { OrdersPage  } from '../orders/orders';
import { MessagesPage  } from '../messages/messages';
import { SigninPage } from '../signin/signin';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoginService } from './services/login.service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { ProfilePage  } from '../profile/profile';
import { DeliverySchedulerPage } from '../delivery-scheduler/delivery-scheduler';
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { HomePage } from '../home/home';
import { TokenService } from '../../services/token.service';
import { NotificationsPage } from '../notifications/notifications';
import { PlacesPage } from '../places/places';
import { UserCreatedPage } from '../user-created/user-created';

declare var FCMPlugin;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	title: string;
	logged:boolean = false;
  array_user: any[] = [];
  notifications: any[] = [];
  array_error: any;
  photo:string;
  photo_fb:string;
  rating:string;
  login = LoginPage;
  dataResponse: any;
  loginThenOrder:boolean = false;
  loginPreOffert:boolean = false;
  loginHomePreOffert:boolean = false;
  loginHomePreAcceptOrder: boolean = false;
  loginPreListOrders:boolean = false;
  loginPreListMessages:boolean = false;
  base64Image:string;
  hasChangeProfilePhoto: Boolean = false;
  loading: any;
  isDelivery: Boolean;
  pushPage:any;
  userData = null;
  SigninPage: any;
  generalNotificationHome: string;
  usersByCurrentLocation: any[];
  fbUserId: any;
  isClient: boolean = false;
  externalAction: string;
  user_id;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public facebook: Facebook,
    public loginService: LoginService,
    public orderService: OrderServiceProvider,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private tokenService: TokenService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {


    this.loginThenOrder = this.navParams.get('pre_order');
    this.loginPreOffert = this.navParams.get('send_offert');
    this.loginHomePreOffert = this.navParams.get('home_send_offert');
    this.loginHomePreAcceptOrder = this.navParams.get('home_send_offert');
    this.loginPreListOrders = this.navParams.get('list_orders');
    this.loginPreListMessages = this.navParams.get('list_messages');
    this.generalNotificationHome = this.navParams.get('sendGeneralNotification');
    this.SigninPage = SigninPage;
    this.pushPage = NotificationsPage;
    this.externalAction = this.navParams.get('action');
  }

  ionViewWillEnter() {
    this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
    this.user_id = localStorage.getItem('user_id');
    this.checkLogin();

    if (this.externalAction) {
      switch (this.externalAction) {
        case 'rating':
          this.getRating();
          break;
          case 'newuser':
            this.modalCtrl.create(UserCreatedPage, {isClient: this.isClient}).present();
            break;
        default:
          break;
      }
    }
  }

    goPage(page){
      switch(page) {
        case 'scheduler':
          this.navCtrl.push(DeliverySchedulerPage);
          break;
        case 'places':
          this.navCtrl.push(PlacesPage);
          break;
        default:
          break;
      }
    }
 
    presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Ingresando a EnvioEntergas...'
    });

    this.loading.present();

  }

   private loadingFb() {
    this.loading = this.loadingCtrl.create({
      content: 'Esperando respuesta de Facebook'
    });

    this.loading.present();

  }

  presentLoadingPhoto() {
    this.loading = this.loadingCtrl.create({
      content: 'Actualizando foto...'
    });
    this.loading.present();
  }
 

  private checkLogin(){
    if(localStorage.getItem('logged') == 'true'){
      this.title= `${localStorage.getItem('fname_logged')} ${localStorage.getItem('lname_logged')}`.toLocaleUpperCase();
      this.rating = localStorage.getItem('rating');
      this.photo_fb = localStorage.getItem('photo_fb');
      this.photo = localStorage.getItem('photo');
      this.photo === 'null' ? this.photo = null : this.photo;
      this.logged = true;
    }else{
      this.loginService.observableLogged.subscribe(active => {
        this.logged = active;
      });
    }
    this.isClient = localStorage.getItem('isClient') === '1' ? true : false; 
  }

  loginWithFB(){

    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.fbUserId = response.authResponse.userID;
      this.loadingFb();
      this.facebook.api('me?fields=name,email', ['email', 'public_profile']).then(profile => {
        this.loading.dismiss();
        
        let username = profile['name'].toString();
        let splitted = username.split(" ");
        let fname = splitted[0];
        let lname = splitted[1];


        this.userData = {
          email: profile['email'],
          first_name: fname,
          last_name: lname,
          picture: `https://graph.facebook.com/${this.fbUserId}/picture?type=large`,
          username: profile['name']
        };

        this.presentLoadingDefault();
        this.orderService.checkOrSaveUserFb(this.userData.username, this.userData.email,
          this.userData.picture, this.userData.first_name, this.userData.last_name)
          .subscribe(
            data => {
              if (this.platform.is('cordova')) {
                data = JSON.parse(data.data);
              }
              this.loading.dismiss();
              
              this.events.publish('user:logged', data, Date.now());
              localStorage.setItem("logged", 'true');
              localStorage.setItem("user_id", data['user'].id);
              localStorage.setItem("email", data['user'].email);
              localStorage.setItem("photo_fb", data['user'].photo);
              localStorage.setItem("fname_logged", data['user'].fname);
              localStorage.setItem("lname_logged", data['user'].lname);
              localStorage.setItem("verified", data['user'].verified);

              this.navCtrl.push(PreProfilePage);
            },
            err => this.showErrorAlertFB(err)
          );
        });    
    });
  }




   async sendDataLogin(parameters){
    let email = parameters.value.email;
    let password = parameters.value.password;
    let email_validated = true;
    let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!regExp.test(email)) {
      email_validated = false;
    }else{
      email_validated = true;
    }

    if(email == "" || password == ""){
      this.alertCtrl.create({
        title : 'Validacion',
        subTitle: "Debe indicar email y contraseña",
        buttons: ['OK'],
      }).present();
    }
    else if(!email_validated){
      this.alertCtrl.create({
        title : 'Validacion',
        subTitle: "Debe indicar un email válido",
        buttons: ['OK'],

      }).present();
    }
    else{
        this.presentLoadingDefault(); 
        this.loginService.login(email,password)
        .subscribe(data => {
            if (this.platform.is('cordova')) {
              this.dataResponse = JSON.parse(data.data);
            } else {
              this.dataResponse = data;
            }
            this.loading.dismiss();
            this.array_user = this.dataResponse['user'];
            this.array_error = this.dataResponse['error'];
            if(this.array_error == 'ERROR_LOGIN_VERIFIED'){
              this.loginService.logged(false);
              this.showErrorAlertNotVerified(this.array_user[0].fname, this.array_user[0].lname, this.array_user[0].email, this.array_user[0].phone);
            }

            else if(this.array_error == 'ERROR_LOGIN'){
              this.loginService.logged(false);
              this.showErrorAlert('ERROR_LOGIN');
            }
            else{
              this.array_user = this.dataResponse['user'];
              this.rating = this.dataResponse['rating'];
              this.isDelivery = this.dataResponse['delivery'];
              this.notifications = this.dataResponse['notifications'];
              
              this.events.publish('user:logged', this.dataResponse, Date.now());
              localStorage.setItem("logged", 'true');
              localStorage.setItem("user_id", this.array_user[0].id);
              localStorage.setItem("fname_logged", this.array_user[0].fname);
              localStorage.setItem("lname_logged", this.array_user[0].lname);
              localStorage.setItem("username", this.array_user[0].username);
              localStorage.setItem("phone", this.array_user[0].phone);
              localStorage.setItem("email", this.array_user[0].email);
              localStorage.setItem("photo", this.array_user[0].photo);
              localStorage.setItem("phone_checked", this.array_user[0].phone_checked);
              localStorage.setItem("verified", this.array_user[0].verified);
              localStorage.setItem("token_device", this.array_user[0].token_device);
              localStorage.setItem("rating", this.rating);
              localStorage.setItem('isClient', ''+this.array_user[0].is_client);
              localStorage.setItem('isDelivery', ''+this.isDelivery);
              
              for (let n=0; n<this.notifications.length; n++) {
                localStorage.setItem('new_messages_push', this.notifications[0].status);
                localStorage.setItem('new_offert_push', this.notifications[1].status);
                localStorage.setItem('new_delivery_push', this.notifications[2].status);
              }

              if(this.loginThenOrder){
                this.navCtrl.push(PricePage)
              }else if(this.loginPreOffert){
                this.navCtrl.push(GoOrderPage, {send_offert: this.loginPreOffert, offerts:[], tracking:[], business_delivery: [], business_users: [], declined_offerts: ""});
              }else if(this.loginHomePreOffert){
                this.navCtrl.push(HomePage, {list_orders: true});
              }
              else if(this.loginHomePreAcceptOrder){
                this.navCtrl.push(HomePage, {list_orders: true});
              }
              else if(this.loginPreListOrders){
                this.navCtrl.push(OrdersPage, {from_login: true});
              }else if(this.loginPreListMessages){
                this.navCtrl.push(MessagesPage, {from_login: true});
              }else if(this.generalNotificationHome){
                const user_id = this.array_user[0].id;
                //const current_city = localStorage.getItem('current_city_ok');
                const current_city = 'Córdoba';
                if(this.generalNotificationHome) {
                  let messageLoading;
                  let messageToast;
                  if(this.generalNotificationHome == 'delivery'){
                    messageLoading = 'Notificando Usuarios de tu zona...';
                    messageToast = 'Has notificado a los Usuarios de tu ciudad que quieres llevar Envios!';
                  }else{
                    messageLoading = 'Notificando a Usuarios Delivery de tu zona...';
                    messageToast = 'Has notificado a Delivery Usuarios de tu ciudad!';
                  }
                  const loadingNotifier = this.loadingCtrl.create({
                    content: messageLoading
                  });
                  this.orderService.getUsersByCurrentLocation(user_id, current_city).subscribe((data) => {
                    this.usersByCurrentLocation = data['users'];
                    let usersArrayParsed: any[] = [];
                    for (let u=0; u < this.usersByCurrentLocation.length; u++) {
                      let user = this.usersByCurrentLocation[u];
                      usersArrayParsed.push(user.user_id);
                    }
                    let fname = localStorage.getItem('fname_logged');
                    let lname = localStorage.getItem('lname_logged');
                    this.tokenService.sendNotifierPush(usersArrayParsed, this.generalNotificationHome, fname, lname).subscribe(
                      response => {
                        loadingNotifier.present();
                      },
                      err => {
                        loadingNotifier.dismiss();
                        this.alertCtrl.create({
                          title : 'Error',
                          subTitle: 'Ha ocurrido un error al notificar. Compruebe su conexión',
                          buttons: ['OK'],
                        }).present();  
                      },
                      () => {
                        loadingNotifier.dismiss();
                        this.toastCtrl.create({
                          message: messageToast,
                          duration: 3500
                        }).present();
                        let currentIndex = this.navCtrl.getActive().index; 
                        this.navCtrl.push(HomePage).then(() => {
                          localStorage.removeItem('orders_loaded');
                          this.navCtrl.remove(currentIndex);
                        });
                      }); 
                  });
                }
              }
              else{
                this.checkLogin();
              }
          }
        }, err => {
          this.loading.dismiss();
          this.alertCtrl.create({
            title : 'Error',
            subTitle: 'Ha ocurrido un error. Compruebe su conexión',
            buttons: ['OK'],
          }).present();  
        });
      }
  }

  showErrorAlertNotVerified(fname, lname, email, phone){
    let confirm = this.alertCtrl.create({
        title: 'Eres '+fname+' ? Los datos son correctos!',
        message: 'Debes validar tu cuenta, deseas recibir un código de validación para ello?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {}
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.loginService.generatePhoneCodeAtLogin(phone, email)
              .subscribe(
                data => {
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
                    localStorage.setItem("user_id", data.id_user);
                    this.navCtrl.push(VerifyCodePage, {signin: true});
                  }

                },
                err=>this.showErrorAlert('ERROR_CODE_VERIFIED')
              );
            }
          }
        ]
      });
      confirm.present();
  }


  showErrorAlert(type = null){
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
    } else {
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle: 'Ha ocurrido un error. intenta nuevamente generando uno nuevo como lo hizo recién.',
        buttons: ['OK'],
      });

      alert.present();
    }

  }

  showErrorAlertFB(type){
    this.loading ? this.loading.dismiss() : this.loading;
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
  public toProfilePage(){
    let fname = localStorage.getItem('fname_logged');
    let lname = localStorage.getItem('lname_logged');
    let email = localStorage.getItem('email');
    let phone = localStorage.getItem('phone');

    this.navCtrl.push(ProfilePage, {fname: fname, lname: lname, email: email, phone: phone});
  }

  takePhoto(){

      const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:

     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     this.hasChangeProfilePhoto = true;
    }, (err) => {
     // Handle error
     this.hasChangeProfilePhoto = false;
    });

  }

  getPhoto(){

    var options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetwidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.hasChangeProfilePhoto = true;
    }, (err) => {

      this.hasChangeProfilePhoto = false;

    });

  }

  presentChangeProfilePhoto() {
     let actionSheet = this.actionSheetCtrl.create({
       title: 'Quieres cambiar la Foto de Perfil?',
       buttons: [
         {
           text: 'Tomar una Foto',
           handler: () => {
             this.takePhoto();
           }
         },
         {
           text: 'Elegir una Foto',
           handler: () => {
             this.getPhoto();
           }
         },
         {
           text: 'Volver',
           role: 'cancel',
           handler: () => {
             console.log("cancelo change profile photo");
           }
         }
       ]
     });

     actionSheet.present();
   }


   saveChangeProfilePhoto(){

    if(this.base64Image == "" || this.base64Image == null){
      let alert = this.alertCtrl.create({
        title : 'Validacion',
        subTitle: "No ha subido ninguna nueva Foto",
        buttons: ['OK'],
      });
      alert.present();
    }
   else{
        let user_id = localStorage.getItem("user_id");
        this.presentLoadingPhoto();
        this.loginService.saveChangeProfilePhoto(this.base64Image, user_id)
        .subscribe(
        data=>{
            if(this.platform.is('cordova')) {
              data = JSON.parse(data.data);
            }
            if(data.photo !== ''){
              this.loading.dismiss();
              this.photo = data.photo;
              localStorage.setItem("photo", data.photo);
              this.hasChangeProfilePhoto = false;
            }
            else{
              this.loading.dismiss();
              this.showErrorAlert();
          }
        },
        err => {
          this.loading.dismiss();
          this.alertCtrl.create({
            title : 'Error',
            subTitle: 'Ha ocurrido un error. Compruebe su conexión',
            buttons: ['OK'],
          }).present();  
        }
      );
    }
  }

  isDeliveryRegistered() {
    return this.isDelivery || localStorage.getItem('isDelivery') == 'true'
  }

  private getRating() {
    this.loginService.getUserRating(this.user_id)
      .subscribe(
      data=>{
          if (data['rating']) {
            this.rating = data['rating'];
            localStorage.setItem("rating_now", this.rating);
          }
      });
  }
}
