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
var OrderServiceProvider = /** @class */ (function () {
    function OrderServiceProvider(http) {
        this.http = http;
        this.api = 'https://envioentregas.com/api/';
    }
    OrderServiceProvider.prototype.getOrder = function (id) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'orders/showOrder/' + id, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.getAllOrders = function (user) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'orders/' + user, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.getAllDeliveryOrders = function (user) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'orders/delivery/' + user, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.saveOrder = function (namePackage, vehicle, dimensions, source_address, destination_address, cost_stipulated, service_stipulated, coordenates, date, hour, user_id, description) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = "";
        if (description == "") {
            url = namePackage + '/' + vehicle + '/' + dimensions + '/' + source_address + '/' + destination_address + '/' + cost_stipulated + '/' + service_stipulated + '/' + coordenates + '/' + date + '/' + hour + '/' + user_id;
        }
        else {
            url = namePackage + '/' + vehicle + '/' + dimensions + '/' + source_address + '/' + destination_address + '/' + cost_stipulated + '/' + service_stipulated + '/' + coordenates + '/' + date + '/' + hour + '/' + user_id + '/' + description;
        }
        return this.http.get(this.api + 'orders/new/' + url, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.searchOrders = function (city_source, city_destination, latlng_source, latlng_destination, userLogged, currentLocation) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = "";
        url = city_source + '/' + city_destination + '/' + latlng_source + '/' + latlng_destination + '/' + userLogged + '/' + currentLocation;
        return this.http.get(this.api + 'orders/showByLocations/' + url, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.getStipulatedPrice = function (postalCode, dimensions) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'price/' + postalCode + "/" + dimensions, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.sendOffert = function (maxDeliveryDate, maxDeliveryHour, cost, delivery_id, user_id, order_id, status) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'business/sendOffert/' + maxDeliveryDate + "/" + maxDeliveryHour + "/" + cost + "/" + delivery_id + "/" + user_id + "/" + order_id + "/" + status, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    //============== SEND PUSH NOTIFICATION ABOUT NEWW OFFERT ==============
    //============== SEND PUSH NOTIFICATION ABOUT NEWW OFFERT ==============
    OrderServiceProvider.prototype.getBusinessesOfferts = function (idOrder, idUser) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'offertsBusiness/' + idOrder + "/" + idUser, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.acceptOrderPayment = function (packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'business/acceptOffertPayment/' + packageName + '/' + cost + '/' + idDelivery + "/" + idUser + "/" + idOrder + "/" + idBusiness, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.acceptOrder = function (packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(this.api + 'business/acceptOffert/' + packageName + '/' + cost + '/' + idDelivery + "/" + idUser + "/" + idOrder + "/" + idBusiness, {
            headers: headers,
            method: "GET"
        }).map(function (res) { return res.json(); });
    };
    OrderServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], OrderServiceProvider);
    return OrderServiceProvider;
}());
export { OrderServiceProvider };
//# sourceMappingURL=order-service.js.map