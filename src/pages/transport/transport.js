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
import { SourcePage } from '../source/source';
/**
 * Generated class for the TransportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransportPage = /** @class */ (function () {
    function TransportPage(navCtrl, navParams, nav, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.sourcePage = SourcePage;
        this.title = "Transporte 2/6";
    }
    TransportPage.prototype.ionViewDidLoad = function () {
        localStorage.removeItem("vehicle");
        localStorage.removeItem("dimensions");
    };
    TransportPage.prototype.sendDataStep2 = function (req) {
        var vehicle = req.value.vehicle;
        console.log(vehicle);
        if (vehicle == "" || vehicle == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debes Seleccionar un Vehiculo",
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            if (vehicle == 'caminando') {
                localStorage.setItem("dimensions", '15x15x15,500');
                localStorage.setItem("size", 'XS');
            }
            if (vehicle == 'bicicleta') {
                localStorage.setItem("dimensions", '20x20x20,750');
                localStorage.setItem("size", 'S');
            }
            if (vehicle == 'auto') {
                localStorage.setItem("dimensions", '30x30x30,1250');
                localStorage.setItem("size", 'M');
            }
            if (vehicle == 'colectivo') {
                localStorage.setItem("dimensions", '20x20x20,1000');
                localStorage.setItem("size", 'L');
            }
            if (vehicle == 'furgon') {
                localStorage.setItem("dimensions", '40x40x40,2000');
                localStorage.setItem("size", 'XL');
            }
            localStorage.setItem("vehicle", vehicle);
            this.nav.push(SourcePage);
        }
    };
    TransportPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-transport',
            templateUrl: 'transport.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            NavController, AlertController])
    ], TransportPage);
    return TransportPage;
}());
export { TransportPage };
//# sourceMappingURL=transport.js.map