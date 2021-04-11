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
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
var GeolocationService = /** @class */ (function () {
    function GeolocationService(geolocation, alertCtrl) {
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
    }
    GeolocationService.prototype.getCurrentLocation = function () {
        this.geolocation.getCurrentPosition().then(function (resp) {
            var lat = resp.coords.latitude;
            var lng = resp.coords.longitude;
            var latlng = [];
            latlng.push(lat, lng);
            localStorage.setItem("lat", '' + lat);
            localStorage.setItem("lng", '' + lng);
        }).catch(function (error) {
        });
    };
    GeolocationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Geolocation, AlertController])
    ], GeolocationService);
    return GeolocationService;
}());
export { GeolocationService };
//# sourceMappingURL=geolocation.service.js.map