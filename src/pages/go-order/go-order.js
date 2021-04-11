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
import { IonicPage, NavController, NavParams, AlertController, Events, ToastController } from 'ionic-angular';
import { GeolocationService } from '../../services/geolocation.service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PreOrderPage } from '../pre-order/pre-order';
import { OrderTrackingPage } from '../order-tracking/order-tracking';
import { TokenService } from '../../services/token.service';
var GoOrderPage = /** @class */ (function () {
    function GoOrderPage(navCtrl, geolocator, navParams, alertCtrl, zone, events, orderService, toast, tokenService) {
        this.navCtrl = navCtrl;
        this.geolocator = geolocator;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.events = events;
        this.orderService = orderService;
        this.toast = toast;
        this.tokenService = tokenService;
        this.geocoder = new google.maps.Geocoder;
        this.SEND_OFFERT = false;
        this.markers = [];
        this.title = 'Orden';
        this.name = '';
        this.status = '';
        this.username = '';
        this.source = '';
        this.destination = '';
        this.cost = '';
        this.just_cost = '';
        this.charge = '';
        this.maxDeliveryDate = '';
        this.justDateDelivery = '';
        this.justHourDelivery = '';
        this.fname = '';
        this.THEN_ORDER_CREATED = false;
        this.NOT_MODAL = false;
        this.PROVIDED_FROM_LOGIN = false;
        this.FROM_DELIVERIES = false;
        this.FROM_ORDERS = false;
        this.NOT_FROM_DELIVERIES = true;
        if (navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
            var lat = localStorage.getItem("lat");
            var lng = localStorage.getItem("lng");
            this.THEN_ORDER_CREATED = true;
            this.name = localStorage.getItem("name_pre_offert");
            this.source = localStorage.getItem("source_pre_offert");
            this.destination = localStorage.getItem("destination_pre_offert");
            this.cost = localStorage.getItem("cost_pre_offert");
            this.charge = localStorage.getItem("charge_pre_offert");
            var cost = parseFloat(this.cost);
            var charge = parseFloat(this.charge);
            var just_cost = cost - charge;
            this.just_cost = just_cost.toFixed(2);
            this.title = 'Realiza el Delivery';
            this.maxDeliveryDate = localStorage.getItem("maxDeliveryDate_pre_offert");
            var arrMaxDeliveryDate = this.maxDeliveryDate.split(" ");
            this.justDateDelivery = arrMaxDeliveryDate[0];
            this.justHourDelivery = arrMaxDeliveryDate[1];
            this.fname = localStorage.getItem("fname_pre_offert").toUpperCase();
        }
        else if (navParams.get("id_order")) {
            //guardamos en LOCALSTORAGE, por si el Usuario no esta logeado
            localStorage.setItem("id_order_pre_offert", navParams.get("id_order"));
            this.name = navParams.get('name');
            this.source = navParams.get('source');
            this.destination = navParams.get('destination');
            this.cost = navParams.get('cost');
            this.charge = navParams.get('charge');
            this.maxDeliveryDate = navParams.get('maxDeliveryDate');
            var arrMaxDeliveryDate = this.maxDeliveryDate.split(" ");
            this.justDateDelivery = arrMaxDeliveryDate[0];
            this.justHourDelivery = arrMaxDeliveryDate[1];
            this.fname = navParams.get('fname').toUpperCase();
            this.id_user_order = navParams.get("id_user");
            var cost = parseFloat(this.cost);
            var charge = parseFloat(this.charge);
            var just_cost = cost - charge;
            this.just_cost = just_cost.toFixed(2);
            this.title = 'Realizar Delivery';
            this.NOT_MODAL = true;
            this.status = navParams.get('status');
            this.username = navParams.get('username');
        }
        else if (navParams.get('source_address')) {
            this.THEN_ORDER_CREATED = true;
            this.source = navParams.get('source_address');
            this.destination = navParams.get('destination_address');
            this.cost = navParams.get('cost_stipulated');
            this.charge = navParams.get('service_stipulated');
            var cost = parseFloat(this.cost);
            var charge = parseFloat(this.charge);
            var just_cost = cost - charge;
            this.just_cost = just_cost.toFixed(2);
            this.title = 'Orden Publicada';
            this.maxDeliveryDate = navParams.get('date');
            //document.getElementById('section-accept-delivery').style.display = "none";
        }
        else if (navParams.get('from')) {
            //Aqui entra cuando se ingresa al detalle de la Orden desde la seccion ENVIAR O LLEVAR (mis pedidos)
            if (navParams.get('from') == 'deliveries') {
                this.THEN_ORDER_CREATED = false;
                this.FROM_DELIVERIES = true;
                this.FROM_ORDERS = false;
                this.source = localStorage.getItem('source');
                this.destination = localStorage.getItem('destination');
                this.cost = localStorage.getItem('cost');
                this.charge = localStorage.getItem('charge');
                this.just_cost = localStorage.getItem('just_cost');
                this.maxDeliveryDate = localStorage.getItem('finishDate');
                this.name = localStorage.getItem('package_name');
                this.status = localStorage.getItem('status');
                this.title = 'Detalle Delivery';
                //Nos permite saber desde donde veo la oferta, para asi mostrar ciertos BOTONES.
                this.from_list_orders = localStorage.getItem('from_list_orders');
                this.NOT_FROM_DELIVERIES = false;
            }
            else if (navParams.get('from') == 'orders') {
                this.THEN_ORDER_CREATED = false;
                this.FROM_ORDERS = true;
                this.FROM_DELIVERIES = false;
                this.source = localStorage.getItem('source');
                this.destination = localStorage.getItem('destination');
                this.cost = localStorage.getItem('cost');
                this.charge = localStorage.getItem('charge');
                this.just_cost = localStorage.getItem('just_cost');
                this.maxDeliveryDate = localStorage.getItem('finishDate');
                this.name = localStorage.getItem('package_name');
                this.status = localStorage.getItem('status');
                //Nos permite saber desde donde veo la oferta, para asi mostrar ciertos BOTONES.
                this.from_list_orders = localStorage.getItem('from_list_orders');
                this.title = 'Detalle Delivery';
                this.NOT_FROM_DELIVERIES = false;
            }
        }
    }
    GoOrderPage.prototype.ionViewWillEnter = function () {
        //obtenemos ubicacion del usuario
        var latlng = this.geolocator.getCurrentLocation();
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        if (!this.THEN_ORDER_CREATED && !this.NOT_MODAL && this.NOT_FROM_DELIVERIES) {
            var source = localStorage.getItem("source");
            var destination = localStorage.getItem("destination");
            var name_1 = localStorage.getItem("name");
            var cost = localStorage.getItem("cost");
            var just_cost = localStorage.getItem("just_cost");
            var charge = localStorage.getItem("charge");
            this.name = name_1;
            this.source = source;
            this.destination = destination;
            this.cost = cost;
            this.just_cost = just_cost;
            this.charge = charge;
        }
        if (this.FROM_DELIVERIES) {
            document.getElementById('go-back-go-order').style.display = 'none';
            // document.getElementById('section-message-order').style.display = 'none';
            // document.getElementById('section-accept-delivery').style.display = 'none';
            if (this.status == 'confirmado') {
                // document.getElementById('section-status-order').style.display = 'none';
                // document.getElementById('section-code-order').style.display = '';   
            }
            else if (this.status == 'en camino') {
                // document.getElementById('send-localization').style.display = '';  
                // document.getElementById('section-code-order').style.display = 'none';  
                // document.getElementById('section-status-order').style.display = '';  
            }
            document.getElementById('header-order-from-deliveries').style.display = '';
            document.getElementById('header-pre-offert').style.display = 'none';
        }
        else if (this.FROM_ORDERS) {
            document.getElementById('go-back-go-order').style.display = 'none';
            // document.getElementById('section-message-order').style.display = 'none';
            // document.getElementById('section-accept-delivery').style.display = 'none';
            // document.getElementById('send-localization').style.display = 'none';  
            // //document.getElementById('section-code-order').style.display = 'none';  
            // document.getElementById('section-status-order').style.display = 'none';
            // document.getElementById('section-view-offerts').style.display = '';
            document.getElementById('header-order-from-deliveries').style.display = '';
            document.getElementById('header-pre-offert').style.display = 'none';
        }
        else {
            document.getElementById('header-order-from-deliveries').style.display = 'none';
            document.getElementById('header-pre-offert').style.display = '';
            // document.getElementById('section-message-order').style.display = '';
            // document.getElementById('section-accept-delivery').style.display = '';
        }
        this.initMap(lat, lng);
    };
    GoOrderPage.prototype.initMap = function (latitude, longitude) {
        var point = { lat: +latitude, lng: +longitude };
        var divMap = document.getElementById('map-order');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    GoOrderPage.prototype.calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
        directionsService.route({
            origin: this.source,
            destination: this.destination,
            travelMode: 'DRIVING' //Antes estaba TRANSIT
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var divMap = document.getElementById('map-order');
                this.map = new google.maps.Map(divMap);
                directionsDisplay.setMap(this.map);
                console.log(response);
            }
            else {
                console.log("fallo la ruta");
            }
        });
    };
    GoOrderPage.prototype.calculateAndDisplayRoute_TryAgain = function (directionsService, directionsDisplay) {
        directionsService.route({
            origin: this.source,
            destination: this.destination,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var divMap = document.getElementById('map-order');
                this.map = new google.maps.Map(divMap);
                directionsDisplay.setMap(this.map);
                console.log(response);
            }
            else {
                console.log("fallo la ruta, intentamos con otro TravelMode");
            }
        });
    };
    GoOrderPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    GoOrderPage.prototype.presentMessagePrompt = function () {
        var alert = this.alertCtrl.create({
            title: 'Consulta a ' + this.fname,
            subTitle: this.fname + ', te contactará luego de que le hayas consultado. Serás notificado.',
            inputs: [
                {
                    name: 'message',
                    placeholder: 'Escribe un mensaje..',
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancelo mensaje');
                    }
                },
                {
                    text: 'Enviar',
                    handler: function (data) {
                        console.log(data.message);
                    }
                }
            ]
        });
        alert.present();
    };
    GoOrderPage.prototype.presentDeliveryConfirm = function () {
        var _this = this;
        var logged = false;
        var alert = this.alertCtrl.create({
            title: 'Oferta para realizar Delivery',
            subTitle: this.fname + ' te confirmará la Oferta que le hagas para comenzar el Delivery. \n (Puede cambiar la Fecha de delivery y Costo si lo desea)',
            inputs: [
                {
                    name: 'maxDeliveryDate',
                    placeholder: '',
                    label: 'Fecha de Delivery',
                    type: 'date',
                    value: this.justDateDelivery,
                },
                {
                    name: 'cost',
                    placeholder: 'Ingrese el Costo que le parezca..',
                    label: 'Costo propuesto',
                    type: 'number',
                    value: this.cost,
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancelo Oferta');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                        _this.presentPickAMommentConfirm(data.maxDeliveryDate, data.cost);
                    }
                }
            ]
        });
        alert.present();
    };
    GoOrderPage.prototype.presentPickAMommentConfirm = function (maxDeliveryDate, cost) {
        var _this = this;
        var logged = false;
        var prompt = this.alertCtrl.create({
            title: 'Ahora confirma cuando puedes retirarlo!',
            message: 'Selecciona en que momento puedes',
            inputs: [
                {
                    type: 'radio',
                    label: 'En la Mañana',
                    value: 'mañana',
                    name: 'maxDeliveryHour'
                },
                {
                    type: 'radio',
                    label: 'En la Tarde',
                    value: 'tarde',
                    name: 'maxDeliveryHour'
                },
                {
                    type: 'radio',
                    label: 'En la Noche',
                    value: 'noche',
                    name: 'maxDeliveryHour'
                }
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: function (data) {
                    }
                },
                {
                    text: "Enviar Oferta",
                    handler: function (data) {
                        _this.events.subscribe('user:logged', function (user, time) {
                            if (user.username !== "") {
                                logged = true;
                                localStorage.setItem("momment_pickup", data.maxDeliveryHour);
                            }
                        });
                        //por si regresa a la app, chequea LS
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                            var toast = _this.toast.create({
                                message: 'YA HAZ REALIZADO UNA OFERTA!',
                                duration: 3000,
                                position: 'middle'
                            });
                            var status_1 = 'en negociacion';
                            var delivery_id = localStorage.getItem("user_id");
                            var order_id = localStorage.getItem("id_order_pre_offert");
                            var user_id_order = localStorage.getItem("idUserOrder_pre_offert");
                            var message = '';
                            //enviar ofert a usuario (save businesses)
                            var mommentPickup = localStorage.getItem("momment_pickup");
                            _this.orderService.sendOffert(maxDeliveryDate, mommentPickup, cost, delivery_id, user_id_order, order_id, status_1)
                                .subscribe(function (data) {
                                if (data.error) {
                                    var alert_1 = _this.alertCtrl.create({
                                        title: 'Error',
                                        subTitle: data.error,
                                        buttons: ['OK'],
                                    });
                                    alert_1.present();
                                }
                                else {
                                    console.log(data);
                                    _this.order_info = data['order'];
                                    _this.businesses = data['businesses'];
                                    _this.tokenService.sendOffertPush('107').subscribe(console.log, console.log);
                                    _this.navCtrl.push(OrderTrackingPage, { order: _this.order_info, businesses: _this.businesses });
                                }
                            }, function (err) { return toast.present(); });
                        }
                        else {
                            _this.navCtrl.pop();
                            localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                            _this.navCtrl.push(PreOrderPage, { send_offert: true });
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    //Function para ir a las ofertas que tiene esa orden
    GoOrderPage.prototype.goOfferts = function () {
        var _this = this;
        var idOrder = localStorage.getItem("id_order");
        var idUser = localStorage.getItem("user_id");
        //Obtener Business Order y Offerts
        this.orderService.getBusinessesOfferts(idOrder, idUser)
            .subscribe(function (data) {
            if (data.error) {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert_2.present();
            }
            else {
                console.log(data);
                _this.businesses = data['businesses'];
                _this.navCtrl.push(OrderTrackingPage, { businesses: _this.businesses });
            }
        }, function (err) { return console.log(err); });
    };
    GoOrderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-go-order',
            templateUrl: 'go-order.html',
        }),
        __metadata("design:paramtypes", [NavController, GeolocationService,
            NavParams, AlertController, NgZone,
            Events, OrderServiceProvider, ToastController,
            TokenService])
    ], GoOrderPage);
    return GoOrderPage;
}());
export { GoOrderPage };
//# sourceMappingURL=go-order.js.map