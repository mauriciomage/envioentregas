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
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PricePage } from '../price/price';
//import { Calendar } from '@ionic-native/calendar';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarPage = /** @class */ (function () {
    function CalendarPage(navCtrl, navParams, alertCtrl, nav, orderService, loadingCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.nav = nav;
        this.orderService = orderService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.title = 'Indique Fecha 5/6';
        this.realCost = '';
    }
    CalendarPage.prototype.ionViewDidLoad = function () {
    };
    CalendarPage.prototype.onChange = function ($event) {
        localStorage.setItem("maxDeliveryDate", $event);
    };
    //===========LOADING CONTROLLER==============
    CalendarPage.prototype.presentLoadingDefault = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Calculando costo estimativo...'
        });
        this.loading.present();
    };
    //==========LOADING CONTROLLER=============
    CalendarPage.prototype.sendDataStep5 = function (req) {
        var _this = this;
        this.presentLoadingDefault();
        var hour = req.value.hour;
        var maxDeliveryDate = localStorage.getItem("maxDeliveryDate");
        if (hour == "" || hour == null || maxDeliveryDate == "" || maxDeliveryDate == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debe indicar Dia y Hora",
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            localStorage.setItem("date", maxDeliveryDate);
            localStorage.setItem("hour", hour);
            var postalCode = localStorage.getItem("postal_code");
            var dimensions = localStorage.getItem("dimensions");
            //Se envian datos para Calcular el Precio Estipulado por Mercado Pago, de la Orden
            this.orderService.getStipulatedPrice(postalCode, dimensions)
                .subscribe(function (data) {
                if (data.error) {
                    _this.loading.dismiss();
                    _this.showErrorAlert();
                }
                else {
                    localStorage.setItem("cost_stipulated", data.price_stipulated);
                    localStorage.setItem("service_stipulated", data.service_stipulated);
                    var real_cost = parseFloat(data.price_stipulated) - parseFloat(data.service_stipulated);
                    _this.realCost = real_cost.toFixed(2);
                    localStorage.setItem("real_cost", _this.realCost);
                    _this.loading.dismiss();
                    _this.nav.push(PricePage);
                }
            }, function (err) { return console.log(err); });
        }
    };
    CalendarPage.prototype.presentMommentPickup = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'En que momento podrás?',
            buttons: [
                {
                    text: 'En la mañana',
                    role: 'morning',
                    handler: function () {
                        localStorage.setItem("mommentPickup", "morning");
                        document.getElementById('pickup_momment').innerHTML = 'EN LA MAÑANA';
                    }
                },
                {
                    text: 'En la tarde',
                    handler: function () {
                        localStorage.setItem("mommentPickup", "afternoon");
                        document.getElementById('pickup_momment').innerHTML = 'EN LA TARDE';
                    }
                },
                {
                    text: 'En la noche',
                    handler: function () {
                        localStorage.setItem("mommentPickup", "night");
                        document.getElementById('pickup_momment').innerHTML = 'EN LA NOCHE';
                    }
                },
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: function () {
                        console.log("cancelo pick momment");
                    }
                }
            ]
        });
        actionSheet.present();
    };
    CalendarPage.prototype.showErrorAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, vuelve a cargar la Orden',
            buttons: ['OK'],
        });
        alert.present();
    };
    CalendarPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-calendar',
            templateUrl: 'calendar.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AlertController, NavController,
            OrderServiceProvider, LoadingController,
            ActionSheetController])
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.js.map