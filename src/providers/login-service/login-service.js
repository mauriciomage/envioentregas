var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoginServiceProvider = /** @class */ (function () {
    function LoginServiceProvider(http) {
        this.http = http;
        this.api = 'https://envioentregas.com/api/';
        console.log('Hello LoginServiceProvider Provider');
    }
    LoginServiceProvider.prototype.login = function (parameters) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'login/' + parameters.email, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    LoginServiceProvider.prototype.loginWithFacebook = function (userEmail, userName, userUid) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'login/fb/' + userEmail + '/' + userName + '/' + userUid, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    LoginServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], LoginServiceProvider);
    return LoginServiceProvider;
}());
export { LoginServiceProvider };
//# sourceMappingURL=login-service.js.map