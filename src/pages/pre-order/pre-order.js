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
import { LoginPage } from '../login/login';
import { PhoneNumberPage } from '../phone-number/phone-number';
/**
 * Generated class for the PreOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PreOrderPage = /** @class */ (function () {
    function PreOrderPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.title = '';
        this.SEND_OFFERT = false;
        if (navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
        }
    }
    PreOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PreOrderPage');
    };
    PreOrderPage.prototype.toLogin = function () {
        if (this.SEND_OFFERT) {
            this.navCtrl.push(LoginPage, { send_offert: this.SEND_OFFERT });
        }
        else {
            this.navCtrl.push(LoginPage, { pre_order: true });
        }
    };
    PreOrderPage.prototype.firstStepSignUp = function (parameters) {
        var email = parameters.value.email;
        var password = parameters.value.password;
        var fname = parameters.value.fname;
        var lname = parameters.value.lname;
        if (email == "" || password == "" || fname == "" || lname == "") {
            var alert_1 = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Los datos son obligatorios',
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            localStorage.setItem("email", email);
            localStorage.setItem("fname", fname);
            localStorage.setItem("lname", lname);
            localStorage.setItem("password", password);
            this.navCtrl.push(PhoneNumberPage, { send_offert: this.SEND_OFFERT });
        }
    };
    PreOrderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pre-order',
            templateUrl: 'pre-order.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController])
    ], PreOrderPage);
    return PreOrderPage;
}());
export { PreOrderPage };
//# sourceMappingURL=pre-order.js.map