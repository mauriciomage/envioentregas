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
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { PricePage } from '../price/price';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { GoOrderPage } from '../go-order/go-order';
import { OrdersPage } from '../orders/orders';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { TokenService } from '../../services/token.service';
export var firebaseConfig = {
    apiKey: "AIzaSyCv4rfbHA4ntNWCxYpxRftmpDz1v7FOGZ8",
    authDomain: "envioentregasapp.firebaseapp.com",
    databaseURL: "https://envioentregasapp.firebaseio.com",
    projectId: "envioentregasapp",
    storageBucket: "envioentregasapp.appspot.com",
    messagingSenderId: "696708938384"
};
firebase.initializeApp(firebaseConfig);
var LoginPage = /** @class */ (function () {
    function LoginPage(events, navCtrl, navParams, alertCtrl, loginService, facebook, tokenService) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loginService = loginService;
        this.facebook = facebook;
        this.tokenService = tokenService;
        this.title = 'Ingresar';
        this.logged = false;
        this.login = LoginPage_1;
        this.loginThenOrder = false;
        this.loginPreOffert = false;
        this.loginPreListOrders = false;
        //datos que retornan luego de loggearse con FB
        this.userEmail = '';
        this.userName = '';
        this.userUid = '';
        this.loginThenOrder = this.navParams.get('pre_order');
        this.loginPreOffert = this.navParams.get('send_offert');
        this.loginPreListOrders = this.navParams.get('list_orders');
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        console.log("Param in Login: " + this.navParams.get('pre_order'));
    };
    LoginPage.prototype.fblogin = function () {
        var _this = this;
        this.facebook.login(['email']).then(function (res) {
            var fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            var mAuth = firebase.auth().signInWithCredential(fc).then(function (info) {
                alert(JSON.stringify(info));
                alert(info);
                _this.userEmail = info['email'];
                _this.userName = info['displayName'];
                _this.userUid = info['id'];
                _this.loginService.loginWithFacebook(_this.userEmail, _this.userName, _this.userUid)
                    .subscribe(function (data) {
                    if (data.error == 'ERROR_LOGIN') {
                        _this.showErrorAlertFB('ERROR_LOGIN');
                    }
                    else {
                        //respuesta a la hora del login
                        _this.events.publish('user:logged', data, Date.now());
                        localStorage.setItem("logged", 'true');
                        localStorage.setItem("user_id", data.id);
                        localStorage.setItem("fname_logged", data.fname);
                        localStorage.setItem("lname_logged", data.lname);
                        localStorage.setItem("photo", data.photo);
                        localStorage.setItem("phone_checked", data.phone_checked);
                        localStorage.setItem("verified", data.verified);
                        if (_this.loginThenOrder) {
                            _this.navCtrl.push(PricePage);
                        }
                        else if (_this.loginPreOffert) {
                            _this.navCtrl.push(GoOrderPage, { send_offert: _this.loginPreOffert });
                        }
                        else if (_this.loginPreListOrders) {
                            _this.navCtrl.push(OrdersPage, { from_login: true });
                        }
                        else {
                            _this.navCtrl.push(PreProfilePage);
                        }
                    }
                }, function (err) { return console.log(err); });
            }).catch(function (ferr) {
                alert("Firebase err");
            });
        }).catch(function (err) {
            alert(JSON.stringify(err));
        });
    };
    LoginPage.prototype.sendDataLogin = function (req) {
        var _this = this;
        console.log(req.value);
        this.loginService.login(req.value)
            .subscribe(function (data) {
            if (data.error == 'ERROR_LOGIN') {
                _this.showErrorAlert('ERROR_LOGIN');
            }
            else if (data.error == 'ERROR_LOGIN_VERIFIED') {
                _this.showErrorAlert('ERROR_LOGIN_VERIFIED');
            }
            else {
                //respuesta a la hora del login
                _this.events.publish('user:logged', data, Date.now());
                localStorage.setItem("logged", 'true');
                localStorage.setItem("user_id", data.id);
                localStorage.setItem("fname", data.fname);
                localStorage.setItem("lname", data.lname);
                localStorage.setItem("photo", data.photo);
                localStorage.setItem("phone_checked", data.phone_checked);
                localStorage.setItem("verified", data.verified);
                localStorage.setItem("token_device", data.token_device);
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
                if (_this.loginThenOrder) {
                    _this.navCtrl.push(PricePage);
                }
                else if (_this.loginPreOffert) {
                    _this.navCtrl.push(GoOrderPage, { send_offert: _this.loginPreOffert });
                }
                else if (_this.loginPreListOrders) {
                    _this.navCtrl.push(OrdersPage, { from_login: true });
                }
                else {
                    _this.navCtrl.push(PreProfilePage);
                }
            }
        }, function (err) { return console.log(err); });
    };
    LoginPage.prototype.showErrorAlert = function (type) {
        if (type == 'ERROR_LOGIN') {
            var alert_1 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Debe verificar su cuenta de Email y/o celular',
                buttons: ['OK'],
            });
            alert_2.present();
        }
    };
    LoginPage.prototype.showErrorAlertFB = function (type) {
        if (type == 'ERROR_LOGIN') {
            var alert_3 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert_3.present();
        }
        else {
            var alert_4 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Debe verificar su cuenta de Email y/o celular',
                buttons: ['OK'],
            });
            alert_4.present();
        }
    };
    LoginPage = LoginPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [Events, NavController,
            NavParams, AlertController,
            LoginServiceProvider, Facebook,
            TokenService])
    ], LoginPage);
    return LoginPage;
    var LoginPage_1;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map