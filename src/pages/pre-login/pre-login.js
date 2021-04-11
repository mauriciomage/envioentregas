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
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { SigninPage } from '../signin/signin';
/**
 * Generated class for the PreLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PreLoginPage = /** @class */ (function () {
    function PreLoginPage(events, navCtrl, navParams, nav, alertCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loginPage = LoginPage;
        this.title = 'Bienvenido a EnvioEntregas';
        this.SigninPage = SigninPage;
    }
    PreLoginPage.prototype.ionViewWillEnter = function () {
        this.checkLogin();
    };
    PreLoginPage.prototype.checkLogin = function () {
        //verificamos si el usuario esta logeado
        //por si regresa a la app, chequea LS
        if (localStorage.getItem("logged") == 'true') {
            this.nav.push(PreProfilePage);
        }
    };
    PreLoginPage.prototype.toLoginPage = function () {
        if (localStorage.getItem("logged") == 'true') {
            this.nav.push(PreProfilePage);
        }
        else {
            this.nav.push(LoginPage);
        }
    };
    PreLoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pre-login',
            templateUrl: 'pre-login.html',
        }),
        __metadata("design:paramtypes", [Events, NavController, NavParams, NavController, AlertController])
    ], PreLoginPage);
    return PreLoginPage;
}());
export { PreLoginPage };
//# sourceMappingURL=pre-login.js.map