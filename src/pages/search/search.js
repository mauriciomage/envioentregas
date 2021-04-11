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
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { GeolocationService } from '../../services/geolocation.service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { GoOrderPage } from '../go-order/go-order';
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, zone, geolocator, orderService, toast, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.geolocator = geolocator;
        this.orderService = orderService;
        this.toast = toast;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
        this.orders = [];
        this.title = 'Realiza un Delivery!';
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '', input2: '' };
        this.autocompleteItems = [];
        this.autocompleteItems2 = [];
    }
    SearchPage_1 = SearchPage;
    SearchPage.prototype.ngOnInit = function () {
        this.initMap();
    };
    SearchPage.prototype.initMap = function () {
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        var point = { lat: +lat, lng: +lng };
        var divMap = document.getElementById('map-search');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 14,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true,
            mapTypeId: 'roadmap'
        });
        var marker = new google.maps.Marker({
            position: point,
            map: this.map,
            label: 'ESTAS AQUÍ',
        });
        this.markers.push(marker);
        this.map.setCenter(point);
        this.getAddressCurrentLocation(lat, lng);
    };
    SearchPage.prototype.updateSearchResults = function () {
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
    SearchPage.prototype.updateSearchResults2 = function () {
        var _this = this;
        if (this.autocomplete.input2 == '') {
            this.autocompleteItems2 = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input2 }, function (predictions, status) {
            if (predictions) {
                _this.autocompleteItems2 = [];
                _this.zone.run(function () {
                    predictions.forEach(function (prediction) {
                        _this.autocompleteItems2.push(prediction);
                    });
                });
            }
        });
    };
    SearchPage.prototype.selectSearchResult = function (item) {
        var _this = this;
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                var position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: _this.map,
                });
                _this.markers.push(marker);
                _this.map.setCenter(results[0].geometry.location);
                localStorage.setItem("search_latlng_selected_source", results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // localStorage.setItem("source_lat", results[0].geometry.location.lat());
                //localStorage.setItem("source_lng", results[0].geometry.location.lng());
            }
        });
    };
    SearchPage.prototype.selectSearchResult2 = function (item) {
        var _this = this;
        this.autocompleteItems2 = [];
        this.autocomplete.input2 = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                var position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                // localStorage.setItem("source_address", item.description);   
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: _this.map,
                });
                _this.markers.push(marker);
                _this.map.setCenter(results[0].geometry.location);
                localStorage.setItem("search_latlng_selected_destination", results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //localStorage.setItem("source_lat", results[0].geometry.location.lat());
                //localStorage.setItem("source_lng", results[0].geometry.location.lng());
            }
        });
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    SearchPage.prototype.calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
        localStorage.setItem("search_source", this.autocomplete.input);
        localStorage.setItem("search_destination", this.autocomplete.input2);
        directionsService.route({
            origin: this.autocomplete.input,
            destination: this.autocomplete.input2,
            travelMode: 'TRANSIT'
        }, function (response, status) {
            //console.log(response);
            //console.log(status);
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var divMap = document.getElementById('map-search');
                this.map = new google.maps.Map(divMap);
                directionsDisplay.setMap(this.map);
                document.getElementById('button-search-orders').style.display = "";
                document.getElementById('button-search-orders-current-location').style.display = "none";
            }
            else {
                console.log("fallo la ruta");
            }
        });
    };
    //===========LOADING CONTROLLER==============
    SearchPage.prototype.presentLoadingDefault = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Buscando Deliveries cercanos...'
        });
        this.loading.present();
    };
    //==========LOADING CONTROLLER=============
    SearchPage.prototype.getOrdersBySearch = function () {
        var _this = this;
        var source = localStorage.getItem('search_source');
        var destination = localStorage.getItem('search_destination');
        var arr_source = source.split(",");
        var len_arr_source = arr_source.length;
        var city_source = arr_source[len_arr_source - 2];
        var arr_destination = destination.split(",");
        var len_arr_destination = arr_destination.length;
        var city_destination = arr_destination[len_arr_destination - 2];
        var latlng_source = localStorage.getItem("search_latlng_selected_source");
        var latlng_destination = localStorage.getItem("search_latlng_selected_destination");
        var user_id = localStorage.getItem("user_id");
        this.orderService.searchOrders(city_source, city_destination, latlng_source, latlng_destination, user_id, true)
            .subscribe(function (data) {
            _this.orders = data['result'];
        }, function (err) { return console.log(err); });
        for (var i = 0; i < this.orders.length; i++) {
            var coordinates = this.orders[i].coordinates;
            var arr_coordinates = coordinates.split(";");
            var coordinates_source = arr_coordinates[0];
            var arr_coordinates_source = coordinates_source.split(",");
            var lat = arr_coordinates_source[0];
            lat = lat.replace("(", "");
            var lng = arr_coordinates_source[1];
            lng = lng.replace(")", "");
            var point = { lat: +lat, lng: +lng };
            var marker = new google.maps.Marker({
                position: point,
                map: this.map,
            });
            this.markers.push(marker);
            this.map.setCenter(point);
        }
    };
    SearchPage.prototype.getAddressCurrentLocation = function (lat, lng) {
        var geocoder = new google.maps.Geocoder();
        var location = new google.maps.LatLng(+lat, +lng);
        var current_city = "";
        this.geocoder.geocode({ 'latLng': location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var current_city = results[0].address_components[2].long_name;
                localStorage.setItem("current_city", current_city);
            }
        });
    };
    SearchPage.prototype.getOrdersByCurrentLocation = function () {
        var _this = this;
        this.presentLoadingDefault();
        var current_city = localStorage.getItem("current_city");
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        var location = new google.maps.LatLng(+lat, +lng);
        var icon = 'assets/imgs/logo_marker.png';
        var user_id = localStorage.getItem("user_id");
        this.orderService.searchOrders(current_city, current_city, location, location, user_id, true)
            .subscribe(function (data) {
            console.log(data['results']);
            _this.orders = data['results'];
            var _loop_1 = function (i) {
                var coordinates = _this.orders[i].coordinates;
                var idorder = _this.orders[i].id;
                var name_1 = _this.orders[i].PackageName;
                var source = _this.orders[i].source;
                var destination = _this.orders[i].destination;
                var cost = _this.orders[i].cost;
                var charge = _this.orders[i].charge;
                var maxDeliveryDate = _this.orders[i].maxDeliveryDate;
                var fname = _this.orders[i].fname;
                var id_user_order = _this.orders[i].user_id;
                var status_1 = _this.orders[i].status;
                var username = _this.orders[i].username;
                //se guardan en LS para cuando el usuario se registra antes de enviar una oferta de delivery
                localStorage.setItem("source_pre_offert", source);
                localStorage.setItem("destination_pre_offert", destination);
                localStorage.setItem("name_pre_offert", name_1);
                localStorage.setItem("cost_pre_offert", cost);
                localStorage.setItem("charge_pre_offert", charge);
                localStorage.setItem("maxDeliveryDate_pre_offert", maxDeliveryDate);
                localStorage.setItem("fname_pre_offert", fname);
                localStorage.setItem("idUserOrder_pre_offert", id_user_order);
                var arr_coordinates = coordinates.split(";");
                var coordinates_source = arr_coordinates[0];
                var arr_coordinates_source = coordinates_source.split(",");
                var lat_1 = arr_coordinates_source[0];
                //if(lat)
                lat_1 = lat_1.replace("(", "");
                var lng_1 = arr_coordinates_source[1];
                if (lng_1) {
                    lng_1 = lng_1.replace(")", "");
                }
                point = { lat: +lat_1, lng: +lng_1 };
                marker = new google.maps.Marker({
                    position: point,
                    map: _this.map,
                    icon: icon
                });
                _this.markers.push(marker);
                _this.map.setCenter(point);
                object = new SearchPage_1(_this.navCtrl, _this.navParams, _this.zone, _this.geolocator, _this.orderService, _this.toast, _this.modalCtrl, _this.loadingCtrl);
                marker.addListener('click', function () {
                    var goOrderModal = object.modalCtrl.create(GoOrderPage, { id_order: idorder, name: name_1, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status_1, username: username });
                    goOrderModal.onDidDismiss(function (data) {
                        console.log(data);
                    });
                    goOrderModal.present();
                });
            };
            var point, marker, object;
            for (var i = 0; i < _this.orders.length; i++) {
                _loop_1(i);
            }
            var toast = _this.toast.create({
                message: 'Haz clic en el Delivery que desees realizar!',
                duration: 3000,
                position: 'middle'
            });
            var toast_zero = _this.toast.create({
                message: 'No tienes ningun Delivery cercano, busca en otra zona!',
                duration: 4000,
                position: 'middle'
            });
            if (_this.orders.length > 0) {
                toast.present();
                _this.loading.dismiss();
            }
            else {
                toast_zero.present();
                _this.loading.dismiss();
            }
        }, function (err) { return console.log(err); });
    };
    SearchPage = SearchPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, NgZone,
            GeolocationService, OrderServiceProvider,
            ToastController, ModalController,
            LoadingController])
    ], SearchPage);
    return SearchPage;
    var SearchPage_1;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map