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
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { PreOrderPage } from '../pre-order/pre-order';
import { GoOrderPage } from '../go-order/go-order';
/**
 * Generated class for the PricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PricePage = /** @class */ (function () {
    function PricePage(nav, events, navCtrl, navParams, orderService, alertCtrl) {
        this.nav = nav;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.alertCtrl = alertCtrl;
        this.title = 'Costo  6/6';
        this.costStipulated = '';
        this.serviceStipulated = '';
        this.realCost = '';
        this.pre_order = true;
    }
    PricePage.prototype.ionViewDidLoad = function () {
        var postalCode = localStorage.getItem("postal_code");
        var dimensions = localStorage.getItem("dimensions");
        var costStip = localStorage.getItem("cost_stipulated");
        var serviceStip = localStorage.getItem("service_stipulated");
        var realCost = localStorage.getItem("real_cost");
        this.costStipulated = costStip;
        this.serviceStipulated = serviceStip;
        this.realCost = realCost;
        //this.sendDataStipulatedPrice(postalCode,dimensions);
    };
    PricePage.prototype.sendDataNewOrden = function () {
        var _this = this;
        var logged = false;
        var namePackage = localStorage.getItem("name");
        //data.name = namePackage;
        var description = localStorage.getItem("description");
        //data.description = description;
        var vehicle = localStorage.getItem("vehicle");
        //data.vehicle = vehicle;
        var dimensions = localStorage.getItem("dimensions");
        //data.dimensions =  dimensions;
        var source_address = localStorage.getItem("source_address");
        //data.source_address =  source_address;
        var source_lat = localStorage.getItem("source_lat");
        //data.source_lat =  source_lat;
        var source_lng = localStorage.getItem("source_lng");
        //data.source_lng =  source_lng;
        var destination_address = localStorage.getItem("destination_address");
        //data.destination_address =  destination_address;
        var destination_lat = localStorage.getItem("destination_lat");
        //data.destination_lat =  destination_lat;
        var destination_lng = localStorage.getItem("destination_lng");
        //data.destination_lng =  destination_lng;
        var cost_stipulated = localStorage.getItem("cost_stipulated");
        //data.cost_stipulated =  cost_stipulated;
        var service_stipulated = localStorage.getItem("service_stipulated");
        //data.service_stipulated =  service_stipulated;
        var date = localStorage.getItem("date");
        var hour = localStorage.getItem("hour");
        var coordenates = "(" + source_lat + ", " + source_lng + ");(" + destination_lat + ", " + destination_lng + ")";
        var user_id = localStorage.getItem("user_id");
        //verificamos si el usuario esta logeado
        this.events.subscribe('user:logged', function (user, time) {
            console.log('Welcome', user, 'at', time);
            if (user.username !== "") {
                logged = true;
            }
        });
        //por si regresa a la app, chequea LS
        if (localStorage.getItem("logged") == 'true') {
            logged = true;
        }
        else {
            this.nav.push(PreOrderPage, { active: true });
        }
        if (logged) {
            this.orderService.saveOrder(namePackage, vehicle, dimensions, source_address, destination_address, cost_stipulated, service_stipulated, coordenates, date, hour, user_id, description)
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
                    _this.navCtrl.push(GoOrderPage, { source_address: source_address, destination_address: destination_address, cost_stipulated: cost_stipulated, service_stipulated: service_stipulated });
                }
            }, function (err) { return console.log(err); });
        }
    };
    PricePage.prototype.showErrorAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, vuelve a cargar la Orden',
            buttons: ['OK'],
        });
        alert.present();
    };
    PricePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-price',
            templateUrl: 'price.html',
        }),
        __metadata("design:paramtypes", [NavController, Events, NavController, NavParams, OrderServiceProvider, AlertController])
    ], PricePage);
    return PricePage;
}());
export { PricePage };
//# sourceMappingURL=price.js.map