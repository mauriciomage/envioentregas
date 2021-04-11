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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeolocationService } from '../../services/geolocation.service';
import { CalendarPage } from '../calendar/calendar';
var DestinationPage = /** @class */ (function () {
    function DestinationPage(navCtrl, navParams, geolocator, alertCtrl, zone, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocator = geolocator;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.nav = nav;
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
        this.title = 'Lugar de Entrega 4/6';
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }
    DestinationPage.prototype.ngOnInit = function () {
        localStorage.removeItem("destination_address");
        localStorage.removeItem("destination_lat");
        localStorage.removeItem("destination_lng");
        //obtenemos ubicacion del usuario
        var latlng = this.geolocator.getCurrentLocation();
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        this.initMap(lat, lng);
    };
    DestinationPage.prototype.initMap = function (latitude, longitude) {
        var point = { lat: -31.4137274, lng: -64.1655693 };
        var divMap = document.getElementById('map-dest');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
    };
    DestinationPage.prototype.updateSearchResults = function () {
        var _this = this;
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, function (predictions, status) {
            if (predictions) {
                _this.autocompleteItems = [];
                _this.zone.run(function () {
                    predictions.forEach(function (prediction) {
                        _this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    };
    DestinationPage.prototype.selectSearchResult = function (item) {
        var _this = this;
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                var position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                localStorage.setItem("destination_address", item.description);
                var postalCode = '';
                for (var i = 0; i < results[0].address_components.length; i++) {
                    var element = results[0].address_components[i].types[0];
                    if (element == 'postal_code') {
                        postalCode = results[0].address_components[i].long_name;
                    }
                    else {
                        postalCode = '5000';
                    }
                }
                localStorage.setItem("postal_code", postalCode);
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: _this.map,
                });
                _this.markers.push(marker);
                _this.map.setCenter(results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                localStorage.setItem("destination_lat", results[0].geometry.location.lat());
                localStorage.setItem("destination_lng", results[0].geometry.location.lng());
            }
        });
    };
    DestinationPage.prototype.sendDataStep4 = function () {
        if (localStorage.getItem("destination_address") !== null
            && localStorage.getItem("destination_lat") !== null
            && localStorage.getItem("destination_lng") !== null) {
            this.nav.push(CalendarPage);
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debes indicar donde se envia",
                buttons: ['OK'],
            });
            alert_1.present();
        }
    };
    DestinationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-destination',
            templateUrl: 'destination.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            GeolocationService, AlertController, NgZone,
            NavController])
    ], DestinationPage);
    return DestinationPage;
}());
export { DestinationPage };
//# sourceMappingURL=destination.js.map