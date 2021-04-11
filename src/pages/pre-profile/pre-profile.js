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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PreLoginPage } from '../pre-login/pre-login';
/**
 * Generated class for the PreProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PreProfilePage = /** @class */ (function () {
    function PreProfilePage(navCtrl, navParams, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.title = '';
    }
    PreProfilePage.prototype.ionViewDidLoad = function () {
        var fname = localStorage.getItem('fname');
        var lname = localStorage.getItem('lname');
        var title = fname.toUpperCase() + " " + lname.toUpperCase();
        this.title = title;
    };
    PreProfilePage.prototype.toProfilePage = function () {
        this.nav.push(ProfilePage);
    };
    PreProfilePage.prototype.killSession = function () {
        localStorage.clear();
        this.nav.push(PreLoginPage);
    };
    PreProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pre-profile',
            templateUrl: 'pre-profile.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, NavController])
    ], PreProfilePage);
    return PreProfilePage;
}());
export { PreProfilePage };
//# sourceMappingURL=pre-profile.js.map