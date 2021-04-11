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
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { PricePage } from '../price/price';
import { GoOrderPage } from '../go-order/go-order';
import { HomePage } from '../home/home';
import { TokenService } from '../../services/token.service';
var VerifyCodePage = /** @class */ (function () {
    function VerifyCodePage(events, navCtrl, navParams, alertCtrl, phoneService, tokenService) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.phoneService = phoneService;
        this.tokenService = tokenService;
        this.SEND_OFFERT = false;
        this.FROM_SIGNIN = false;
        if (this.navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
        }
        this.FROM_SIGNIN = navParams.get("signin");
    }
    VerifyCodePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerifyCodePage');
    };
    VerifyCodePage.prototype.verifyCode = function (parameter) {
        var _this = this;
        var code = parameter.value.phone_code;
        var user_id = localStorage.getItem("user_id");
        if (code == "") {
            var alert_1 = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Debes indicar el Codigo',
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            this.phoneService.verifyPhoneCode(code, user_id)
                .subscribe(function (data) {
                if (data.error) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: data.error,
                        buttons: ['OK'],
                    });
                    alert_2.present();
                }
                else {
                    if (_this.FROM_SIGNIN) {
                        //PROVIENE DE LA PANTALLA REGISTER
                        var alert_3 = _this.alertCtrl.create({
                            title: 'Bienvenido !',
                            subTitle: 'Publica y Lleva Deliveries cuando quieras!',
                            buttons: ['OK'],
                        });
                        alert_3.present();
                        //Logged
                        _this.events.publish('user:logged', data, Date.now());
                        localStorage.setItem("logged", 'true');
                        localStorage.setItem("user_id", data.id_user);
                        localStorage.setItem("fname", data.fname);
                        localStorage.setItem("lname", data.lname);
                        localStorage.setItem("email", data.email);
                        localStorage.setItem("photo", data.photo);
                        localStorage.setItem("phone_checked", data.phone_checked);
                        localStorage.setItem("verified", data.verified);
                        localStorage.removeItem("password");
                        //guardar token para las notificaciones
                        if (typeof FCMPlugin != 'undefined') {
                            FCMPlugin.getToken(function (token) {
                                console.log("Llamando al Servicio para guardar el Token");
                                //Solicitamos el Token a Firebase, luego usamos el servicio (token.service) para enviar la peticion  al server.
                                _this.tokenService.saveToken(token, data.id_user).subscribe(console.log, console.log); //cuando todo salga bien, se loggea, y si sale mal lo mismo. Cambia el arg que se le pasa a la funcion .log
                            }, function (error) {
                                console.log('error retrieving token: ' + error);
                            });
                        }
                        _this.navCtrl.push(HomePage);
                    }
                    else {
                        //PROVIENE DE UN SIGNIN ANTES DE CREAR UNA ORDEN
                        var alert_4 = _this.alertCtrl.create({
                            title: 'Bienvenido !',
                            subTitle: 'Ahora si puedes Publicar la orden.',
                            buttons: ['OK'],
                        });
                        alert_4.present();
                        //Logged
                        _this.events.publish('user:logged', data, Date.now());
                        localStorage.setItem("logged", 'true');
                        localStorage.setItem("user_id", data.id_user);
                        localStorage.setItem("fname", data.fname);
                        localStorage.setItem("lname", data.lname);
                        localStorage.setItem("email", data.email);
                        localStorage.setItem("photo", data.photo);
                        localStorage.setItem("phone_checked", data.phone_checked);
                        localStorage.setItem("verified", data.verified);
                        localStorage.removeItem("password");
                        //ACA SE VERIFICA EL SEND_OFFERT O PRICEPAGE
                        if (_this.SEND_OFFERT) {
                            _this.navCtrl.push(GoOrderPage, { send_offert: _this.SEND_OFFERT });
                        }
                        else {
                            _this.navCtrl.push(PricePage);
                        }
                    }
                }
            }, function (err) { return console.log(err); });
        }
    };
    VerifyCodePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-verify-code',
            templateUrl: 'verify-code.html',
        }),
        __metadata("design:paramtypes", [Events, NavController, NavParams,
            AlertController, PhoneServiceProvider, TokenService])
    ], VerifyCodePage);
    return VerifyCodePage;
}());
export { VerifyCodePage };
//# sourceMappingURL=verify-code.js.map