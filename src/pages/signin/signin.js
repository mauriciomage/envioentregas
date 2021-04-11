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
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { VerifyCodePage } from '../verify-code/verify-code';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SigninPage = /** @class */ (function () {
    function SigninPage(navCtrl, navParams, alertCtrl, phoneService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.phoneService = phoneService;
        this.title = 'Nueva Cuenta';
    }
    SigninPage.prototype.ionViewDidLoad = function () {
    };
    SigninPage.prototype.signin = function (parameters) {
        var _this = this;
        var email = parameters.value.email;
        var password = parameters.value.password;
        var passwordOK = parameters.value.passwordOK;
        var fname = parameters.value.fname;
        var lname = parameters.value.lname;
        var phone = parameters.value.phone;
        if (email == "" || password == "" || fname == "" || lname == "" || passwordOK == "") {
            var alert_1 = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Los datos son obligatorios',
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else if (password !== passwordOK) {
            var alert_2 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Las contraseñas son diferentes',
                buttons: ['OK'],
            });
            alert_2.present();
        }
        else {
            //Guardamos en LS para poder obtener los datos en la pagina de Verificacion de Telefono
            localStorage.setItem("email", email);
            localStorage.setItem("fname", fname);
            localStorage.setItem("lname", lname);
            localStorage.setItem("password", password);
            localStorage.setItem("phone", phone);
            //Estan los datos completos, primero verificamos el Numero de Telefono
            this.phoneService.generatePhoneCode(phone, email, fname, lname, password)
                .subscribe(function (data) {
                if (data.error) {
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: data.error,
                        buttons: ['OK'],
                    });
                    alert_3.present();
                }
                else {
                    localStorage.setItem("user_id", data.id_user);
                    _this.navCtrl.push(VerifyCodePage, { signin: true });
                }
            }, function (err) { return _this.showErrorAlert(); });
        }
    };
    SigninPage.prototype.showErrorAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Atención!',
            subTitle: 'Los datos concuerdan con un Usuario ya creado',
            buttons: ['OK'],
        });
        alert.present();
    };
    SigninPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signin',
            templateUrl: 'signin.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController,
            PhoneServiceProvider])
    ], SigninPage);
    return SigninPage;
}());
export { SigninPage };
//# sourceMappingURL=signin.js.map