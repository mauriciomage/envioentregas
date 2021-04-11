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
import { PaymentPage } from '../payment/payment';
/**
 * Generated class for the OrderTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderTrackingPage = /** @class */ (function () {
    function OrderTrackingPage(navCtrl, navParams, alertCtrl, orderService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.orderService = orderService;
        this.title = 'Seguimiento';
        this.label_date = '';
        this.order_info = this.navParams.get("order_info");
        this.businesses = this.navParams.get("businesses");
    }
    OrderTrackingPage.prototype.ionViewDidLoad = function () {
        console.log(this.order_info);
        console.log(this.businesses);
    };
    //Aceptar Orden desde Seguimiento desde el Usuario que ve sus Ordenes
    OrderTrackingPage.prototype.presentAcceptOrder = function (packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Aceptar Orden',
            subTitle: 'Te llegara un Codigo el cuál de lo darás al Delivery caundo retire el pedido',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('se arrepintio');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                        console.log('confirmo orden: ' + idDelivery + " " + idUser + " " + idOrder + " " + idBusiness);
                        _this.orderService.acceptOrderPayment(packageName, cost, idDelivery, idUser, idOrder, idBusiness)
                            .subscribe(function (data) {
                            if (data.error) {
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert_1.present();
                            }
                            else {
                                _this.navCtrl.push(PaymentPage, { link_pay: data['link_pay'], packageName: packageName, cost: cost,
                                    idDelivery: idDelivery, idUser: idUser, idOrder: idOrder, idBusiness: idBusiness });
                                //this.showLinkPayment(data['link_pay']);
                                //this.navCtrl.setRoot(OrderTrackingPage); 
                            }
                        }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        alert.present();
    };
    //Cancelar Orden desde Seguimiento desde el Usuario que ve sus Ordenes
    OrderTrackingPage.prototype.presentCancelOrder = function () {
        var alert = this.alertCtrl.create({
            title: 'Cancelar Orden',
            subTitle: 'Una vez realizada la cancelación se notificará al Delivery',
            buttons: [
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('se arrepintio');
                    }
                },
                {
                    text: 'Cancelar Envío',
                    handler: function (data) {
                        console.log('cancelo orden' + data);
                    }
                }
            ]
        });
        alert.present();
    };
    OrderTrackingPage.prototype.showLinkPayment = function (link) {
        var alert = this.alertCtrl.create({
            title: 'Pagar Delivery',
            subTitle: 'Pagar: ' + link,
            buttons: ['OK'],
        });
        alert.present();
    };
    OrderTrackingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-order-tracking',
            templateUrl: 'order-tracking.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController,
            OrderServiceProvider])
    ], OrderTrackingPage);
    return OrderTrackingPage;
}());
export { OrderTrackingPage };
//# sourceMappingURL=order-tracking.js.map