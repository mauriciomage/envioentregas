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
import { VerifyCodePage } from '../verify-code/verify-code';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
/**
 * Generated class for the PhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PhoneNumberPage = /** @class */ (function () {
    function PhoneNumberPage(navCtrl, navParams, alertCtrl, phoneService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.phoneService = phoneService;
        this.title = 'Indique su Celular';
        this.SEND_OFFERT = false;
        if (navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
        }
    }
    PhoneNumberPage.prototype.ionViewDidLoad = function () {
    };
    PhoneNumberPage.prototype.verifyPhoneNumber = function (parameter) {
        var _this = this;
        var phone = parameter.value.phone;
        var email = localStorage.getItem("email");
        var fname = localStorage.getItem("fname");
        var lname = localStorage.getItem("lname");
        var password = localStorage.getItem("password");
        if (phone == "") {
            var alert_1 = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Debes indicar tu Celular',
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            localStorage.setItem("phone", phone);
            this.phoneService.generatePhoneCode(phone, email, fname, lname, password)
                .subscribe(function (data) {
                if (data.error_phone) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Se ha producido un error creando el Usuario, intente con otros datos o mas tarde',
                        buttons: ['OK'],
                    });
                    alert_2.present();
                }
                else {
                    localStorage.setItem("user_id", data.id_user);
                    _this.navCtrl.push(VerifyCodePage, { send_offert: _this.SEND_OFFERT });
                }
            }, function (err) { return console.log(err); });
        }
    };
    PhoneNumberPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-phone-number',
            templateUrl: 'phone-number.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController,
            PhoneServiceProvider])
    ], PhoneNumberPage);
    return PhoneNumberPage;
}());
export { PhoneNumberPage };
//# sourceMappingURL=phone-number.js.map