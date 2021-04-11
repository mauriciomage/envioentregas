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
/*
  Generated class for the PhoneServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PhoneServiceProvider = /** @class */ (function () {
    function PhoneServiceProvider(http) {
        this.http = http;
        this.api = 'https://envioentregas.com/api/';
    }
    PhoneServiceProvider.prototype.generatePhoneCode = function (phone, email, fname, lname, password) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        console.log(this.api + 'phone/code/' + phone + '/' + email + '/' + fname + '/' + lname + '/' + password);
        return this.http.get(this.api + 'phone/code/' + phone + '/' + email + '/' + fname + '/' + lname + '/' + password, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    PhoneServiceProvider.prototype.verifyPhoneCode = function (code, user_id) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'phone/code/verify/' + code + '/' + user_id, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    PhoneServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], PhoneServiceProvider);
    return PhoneServiceProvider;
}());
export { PhoneServiceProvider };
//# sourceMappingURL=phone-service.js.map