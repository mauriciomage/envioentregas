var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TransportPage } from '../transport/transport';
import { Camera } from '@ionic-native/camera';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewOrderPage = /** @class */ (function () {
    function NewOrderPage(navCtrl, navParams, camera, orderService, alertCtrl, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.orderService = orderService;
        this.alertCtrl = alertCtrl;
        this.nav = nav;
        this.title = "Nueva Orden 1/6";
        this.transportPage = TransportPage;
    }
    NewOrderPage.prototype.ionViewDidLoad = function () {
        localStorage.removeItem("name");
        localStorage.removeItem("description");
    };
    NewOrderPage.prototype.takePicture = function () {
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: this.camera.EncodingType.JPEG
            //saveToPhotoAlbum: false
        };
        this.camera.getPicture(this.options).then(function (ImageData) {
            alert(ImageData);
        }).catch(function (err) { return console.log(err); });
    };
    /*sendDataOrder(req){
  
      this.orderService.saveOrder(req.value)
      .subscribe(
          data=>{
              this.showAlert(data.response); //respuesta a la hora de agregar una Orden
              this.navCtrl.setRoot(HomePage); //a la pagina que vuelve cuando inserta nueva orden
              console.log(data.response)
          },
          err=>console.log(err)
        );
    }*/
    NewOrderPage.prototype.showAlert = function (res) {
        var alert = this.alertCtrl.create({
            title: 'Informacion',
            subTitle: res,
            buttons: ['OK'],
        });
        alert.present();
    };
    NewOrderPage.prototype.sendDataStep1 = function (req) {
        var name = req.value.name;
        var description = req.value.description;
        if (name == "" || name == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debe indicar que necesita enviar",
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            localStorage.setItem("name", name);
            localStorage.setItem("description", description);
            this.nav.push(TransportPage);
        }
    };
    NewOrderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-new-order',
            templateUrl: 'new-order.html',
            providers: [[Camera]]
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Camera,
            OrderServiceProvider, AlertController, NavController])
    ], NewOrderPage);
    return NewOrderPage;
}());
export { NewOrderPage };
//# sourceMappingURL=new-order.js.map