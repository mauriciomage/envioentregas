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
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
var TokenService = /** @class */ (function () {
    function TokenService(http) {
        this.http = http;
    }
    TokenService.prototype.send = function (token) {
        var data = {
            token: token,
            os: 'android',
        };
        return this.http.post('http://5b4e5cfd.ngrok.io/devices', data, this.options())
            .map(function (r) { return r.text(); }) //recibimos la respuesta despues de ejecutarse la peticion ajax, y procesarla.
            .catch(function (err) {
            console.log("Ha ocurrido un Error: ");
            console.log(err.text());
            return Observable.throw(err.text());
        });
    };
    TokenService.prototype.saveToken = function (token, user_id) {
        var data = {
            token: token,
            os: 'android',
            user_id: user_id
        };
        return this.http.post('http://289a4c47.ngrok.io/newtoken', data, this.options())
            .map(function (r) { return r.text(); }) //recibimos la respuesta despues de ejecutarse la peticion ajax, y procesarla.
            .catch(function (err) {
            console.log("Ha ocurrido un Error: ");
            console.log(err.text());
            return Observable.throw(err.text());
        });
    };
    TokenService.prototype.sendOffertPush = function (user_id) {
        var data = {
            user_id: user_id
        };
        return this.http.post('http://289a4c47.ngrok.io/newoffert', data, this.options())
            .map(function (r) { return r.text(); }) //recibimos la respuesta despues de ejecutarse la peticion ajax, y procesarla.
            .catch(function (err) {
            console.log("Ha ocurrido un Error: ");
            console.log(err.text());
            return Observable.throw(err.text());
        });
    };
    
    TokenService.prototype.options = function () {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    };
    TokenService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], TokenService);
    return TokenService;
}());
export { TokenService };
//# sourceMappingURL=token.service.js.map