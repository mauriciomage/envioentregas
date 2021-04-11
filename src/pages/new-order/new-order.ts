import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { TransportPage  } from '../transport/transport';
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';
import { SourcePage } from '../source/source';
import { LoginPage } from '../login/login';

declare var FCMPlugin;
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
  providers: [[Camera]]
})
export class NewOrderPage {

  title: string;
  transportPage = TransportPage;
  options:any;
   photos:any;
   base64Image:string;
   myForm: any;
   loading:any;
   hasChangeProfilePhoto: Boolean = false;
   isClient: boolean = false;
   userId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public alertCtrl: AlertController,
    private nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private fcm: FCM
   ) {}

    ionViewWillEnter() {
      this.userId = localStorage.getItem('user_id');
      this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
      this.title = this.isClient ? 'Nuevo Pedido: 1/5' : 'NUEVO PEDIDO: 1/6';
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
      if(localStorage.getItem('deliveryAble')) {
        const notifierDeliveryValue = localStorage.getItem('deliveryAble');
        if (notifierDeliveryValue !== undefined && notifierDeliveryValue !== null) {
          this.alertCtrl.create({
            title : 'DELIVERY DISPONIBLE!',
            subTitle: `Si quieres enviar algo o tienes un Pedido ya cargado listo para llevar, se atento ante la propuesta de ${notifierDeliveryValue}`,
            buttons: ['OK'],
          }).present();
          
          localStorage.removeItem('deliveryAble');
        } 
      }
      localStorage.removeItem("name");
      localStorage.removeItem("description");
      localStorage.removeItem('order_published');
      localStorage.removeItem('from_list_orders');
    }
    takePhoto(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
      });
    }

    presentLoadingDefault() {
      this.loading = this.loadingCtrl.create({
        content: 'Publicando Pedido...'
      });

      this.loading.present();

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
      }, (err) => { 

      });

    }

  showAlert(res){
    let alert = this.alertCtrl.create({
      title : 'Informacion',
      subTitle: res,
      buttons: ['OK'],
    });
    alert.present();  
  }

  public sendDataStep1(req){
    var name = req.value.name;
    var description = req.value.description;
    if(name == "" || name == null){
      let alert = this.alertCtrl.create({
      title : 'Validacion',
      subTitle: "Debe indicar que necesita enviar",
      buttons: ['OK'],

    });
      alert.present();  
    }else{
      this.storage.set('name', name);
      this.storage.set('description', description);
      if(this.base64Image !== null && this.base64Image !== ""){
        this.storage.set('photo', this.base64Image);
      }
      if (this.isClient) {
        this.storage.set('vehicle','bicicleta');
        this.storage.set('dimensions','10x10x10,500');
        this.storage.set('size', 'S');
        this.nav.push(SourcePage);
      } else {
        this.nav.push(TransportPage);
      }
    }
  }

  presentUploadOrderPhoto() {
     let actionSheet = this.actionSheetCtrl.create({
       title: 'Deseas cargar una Foto de lo que vas a Enviar?',
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
  
   navLogin() {
     let currentIndex = this.navCtrl.getActive().index;
     this.navCtrl.push(LoginPage).then(() => {
       this.navCtrl.remove(currentIndex);
     });
   }

}



