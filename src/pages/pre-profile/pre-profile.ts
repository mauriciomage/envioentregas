import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController, Platform, ModalController } from 'ionic-angular';
import { ProfilePage  } from '../profile/profile';
import { DeliverySchedulerPage } from '../delivery-scheduler/delivery-scheduler';
import { NotificationsPage  } from '../notifications/notifications';
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { PreProfileService } from './services/preProfile.service';
import { UserCreatedPage } from '../user-created/user-created';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';

declare var FCMPlugin;
@Component({
  selector: 'page-pre-profile',
  templateUrl: 'pre-profile.html',
})
export class PreProfilePage {

  title:string = '';
  photo:string;
  photo_fb:string;
  rating:string;
  pushPage: any;
  pushInfo: any;
  base64Image:string;
  hasChangeProfilePhoto: Boolean = false;
  array_user: any[] = [];
  array_error: any;
  loading: any;
  isDelivery:boolean;

  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private modalCtrl: ModalController,
      private nav:NavController,
      private camera: Camera,
      private actionSheetCtrl: ActionSheetController,
      private alertCtrl: AlertController,
      private preProfileService: PreProfileService,
      private loadingCtrl: LoadingController,
      private plarform: Platform,
      private fcm: FCM
    ) {
    this.pushPage = NotificationsPage;
    if(this.navParams.get('action') == 'newuser') {
      this.modalCtrl.create(UserCreatedPage).present();
    }  
  }

  ionViewWillEnter() {
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
    let fname = localStorage.getItem('fname_logged');
    let lname = localStorage.getItem('lname_logged');
    this.rating = localStorage.getItem('rating');
    this.photo_fb = localStorage.getItem('photo_fb');
    this.photo = localStorage.getItem('photo');
     
    //Logica para mostrar Boton Correcto de Delivery  
    let isDeliveryStr = localStorage.getItem('isDelivery');
    (isDeliveryStr == 'true') ? this.isDelivery = true : this.isDelivery = false;

    if(fname !== null && lname !== null)
    {
      let title = fname.toUpperCase()+" "+lname.toUpperCase();
      this.title = title;
    }
  }

  //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Actualizando Foto...'
    });

    this.loading.present();

  }
  //==========LOADING CONTROLLER=============

  public toAnotherPage(page){
    let currentIndex = this.navCtrl.getActive().index;    
    if(page == 'profile'){
      let fname = localStorage.getItem('fname_logged');
      let lname = localStorage.getItem('lname_logged');
      let email = localStorage.getItem('email');
      let phone = localStorage.getItem('phone');
      this.nav.push(ProfilePage, {fname: fname, lname: lname, email: email, phone: phone}).then(() => {
        this.navCtrl.remove(currentIndex);
    });
    }else {
      this.nav.push(NotificationsPage).then(() => {
        this.navCtrl.remove(currentIndex);
    });

    }
    
  }

  takePhoto(){

      const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
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
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
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
           this.presentLoadingDefault();
          this.preProfileService.saveChangeProfilePhoto(this.base64Image, user_id)
          .subscribe(
          data=>{
            if (this.plarform.is('cordova')) {
              data = JSON.parse(data.data);
            }
              //usuario existente pero no verificado
              if(data.photo !== ''){
                this.loading.dismiss();
                this.photo = data.photo;
                localStorage.setItem("photo", data.photo);
                this.hasChangeProfilePhoto = false;
                this.navCtrl.push(PreProfilePage)
              }
              else{
                this.loading.dismiss();
                this.showErrorAlert();
            }
          },
          err=>this.showErrorAlert(err)
        );
      }
  }

  goDeliveryStep(){
    let userid = localStorage.getItem('user_id');
    this.navCtrl.push(DeliverySchedulerPage, {user_id: userid});
  }



  showErrorAlert(err = null){
    let alert = this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error, vuelve a cargar la Foto.'+err,
      buttons: ['OK'],
    });

    alert.present();
  }

}
