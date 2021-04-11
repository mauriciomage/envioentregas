var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';
import { GeolocationService } from '../../services/geolocation.service';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, geolocator, navParams, zone) {
        this.navCtrl = navCtrl;
        this.geolocator = geolocator;
        this.navParams = navParams;
        this.zone = zone;
        this.title = 'Busca un Delivery';
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
    }
    HomePage.prototype.ionViewWillEnter = function () {
        //obtenemos ubicacion del usuario
        var latlng = this.geolocator.getCurrentLocation();
        //se esperan 2 segunos para quetome la ubicacion
        setTimeout(this.initMap, 1500);
    };
    HomePage.prototype.initMap = function () {
        //chequear si hay conexion, para que no de error de Google
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        var point = { lat: +lat, lng: +lng };
        var divMap = document.getElementById('map-home');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true,
            visible: false
        });
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(this.map);
        var marker = new google.maps.Marker({
            position: point,
            map: this.map,
        });
        // this.markers.push(marker);
        this.map.setCenter(point);
    };
    HomePage.prototype.toSearchPage = function () {
        this.navCtrl.push(SearchPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, GeolocationService, NavParams, NgZone])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map