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
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { HomePage } from '../home/home';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentPage = /** @class */ (function () {
    function PaymentPage(navCtrl, navParams, alertCtrl, orderService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.orderService = orderService;
        this.link_pay = '';
        this.title = 'Pagar Delivery';
        this.link_pay = this.navParams.get("link_pay");
        //Luego quitarlas - cuando se arrgle la BACK URL de MP con su confirmacion de PAGO
        this.packageName = this.navParams.get("packageName");
        this.cost = this.navParams.get("cost");
        this.idDelivery = this.navParams.get("idDelivery");
        this.idUser = this.navParams.get("idUser");
        this.idOrder = this.navParams.get("idOrder");
        this.idBusiness = this.navParams.get("idBusiness");
    }
    PaymentPage.prototype.ionViewDidLoad = function () {
    };
    //este metodo es provisorio para aceptar la orden, ya que la orden debe ser aceptada
    //una vez aceptado el pago por MP, solo que ahora no me reconoce ninguna tarjeta, y no puedo probar su back_urls
    //que configue
    PaymentPage.prototype.acceptOrder = function () {
        var _this = this;
        this.orderService.acceptOrder(this.packageName, this.cost, this.idDelivery, this.idUser, this.idOrder, this.idBusiness)
            .subscribe(function (data) {
            if (data.accepted == 'false') {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Se ha producido un error, algo ha salido mal.',
                    buttons: ['OK'],
                });
                alert_1.present();
            }
            else {
                _this.navCtrl.push(HomePage);
            }
        }, function (err) { return console.log(err); });
    };
    PaymentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-payment',
            templateUrl: 'payment.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController,
            OrderServiceProvider])
    ], PaymentPage);
    return PaymentPage;
}());
export { PaymentPage };
//# sourceMappingURL=payment.js.map