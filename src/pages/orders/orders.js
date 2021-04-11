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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { GoOrderPage } from '../go-order/go-order';
import { LoginPage } from '../login/login';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrdersPage = /** @class */ (function () {
    function OrdersPage(navCtrl, navParams, orderService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.alertCtrl = alertCtrl;
        this.orders = [];
        this.delivery_orders = [];
        this.USER_LOGGED = false;
        this.FROM_LOGIN = false;
        this.url_img_orders = 'https://envioentregas.com/img/orders/';
        this.idorder = this.navParams.get('id_order');
        this.pushPage = LoginPage;
    }
    OrdersPage.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem("logged") == 'true') {
            document.getElementById('verify-login').style.display = 'none';
            document.getElementById('sections-orders').style.display = '';
            document.getElementById('actions-orders').style.display = '';
            var user_id = localStorage.getItem("user_id");
            this.getOrdersByUser(user_id);
            this.getDeliveryOrdersByUser(user_id);
            if (this.idorder > 0) {
                this.goOrder(this.idorder, null);
            }
        }
        else {
            document.getElementById('verify-login').style.display = '';
            document.getElementById('sections-orders').style.display = 'none';
            document.getElementById('actions-orders').style.display = 'none';
        }
    };
    OrdersPage.prototype.getOrdersByUser = function (user) {
        var _this = this;
        this.orderService.getAllOrders(user)
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
                _this.orders = data['results'];
            }
        }, function (err) { return console.log(err); });
    };
    OrdersPage.prototype.getDeliveryOrdersByUser = function (user) {
        var _this = this;
        this.orderService.getAllDeliveryOrders(user)
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
                _this.delivery_orders = data['results'];
            }
        }, function (err) { return console.log(err); });
    };
    OrdersPage.prototype.goOrder = function (id, from) {
        var _this = this;
        this.orderService.getOrder(id)
            .subscribe(function (data) {
            if (data.error) {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert_3.present();
            }
            else {
                var idOrder = data.order.id;
                var startDate = data.order.startDate;
                var finishDate = data.order.finishDate;
                var package_id = data.order.package_id;
                var package_name = data.order.name;
                var transport_id = data.order.transport_id;
                var user_id = data.order.user_id;
                var delivery_id = data.order.delivery_id;
                var cost = data.order.cost;
                var calificationRequest = data.order.calificationRequest;
                var calificationResponse = data.order.calificationResponse;
                var source = data.order.source;
                var destination = data.order.destination;
                var status_1 = data.order.status;
                var charge = data.order.charge;
                var startCode = data.order.startCode;
                var startPhoto = data.order.startPhoto;
                var finishPhoto = data.order.finishPhoto;
                var create_at = data.order.created_at;
                var updated_at = data.order.updated_at;
                var coordinates = data.order.coordinates;
                var deliberate_cost = data.order.deliberate_cost;
                var maxDeliveryDate = data.order.maxDeliveryDate;
                localStorage.setItem("id_order", idOrder);
                localStorage.setItem("source", source);
                localStorage.setItem("destination", destination);
                localStorage.setItem("coordinates", coordinates);
                localStorage.setItem("finishDate", finishDate);
                localStorage.setItem("package_name", package_name);
                localStorage.setItem("status", status_1);
                if (from == 'deliveries') {
                    localStorage.setItem("from_list_orders", from);
                }
                else if (from == 'orders') {
                    localStorage.setItem("from_list_orders", from);
                }
                cost = parseFloat(cost).toFixed(2);
                charge = parseFloat(charge).toFixed(2);
                var just_cost = cost - charge;
                just_cost = Math.round(just_cost * 100) / 100;
                localStorage.setItem("cost", cost);
                localStorage.setItem("just_cost", "" + just_cost);
                localStorage.setItem("charge", charge);
                //El from indica (no siempre obligatorio) de donde proviene el llamado a la orden
                //En el caso de ir a al Orden desde LLEVAR (Pedidos) se debe aclarar, para cambiar 
                //funcionalidades en el detalle orden, como cambiar estado, cancelar, enviar ubicacion
                _this.navCtrl.push(GoOrderPage, { from: from });
            }
        }, function (err) { return console.log(err); });
    };
    OrdersPage.prototype.goLogin = function () {
        //Indicar de donde ingreso al Login para luego retornr a orders.
        this.navCtrl.push(LoginPage, { list_orders: true });
    };
    OrdersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-orders',
            templateUrl: 'orders.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, OrderServiceProvider, AlertController])
    ], OrdersPage);
    return OrdersPage;
}());
export { OrdersPage };
//# sourceMappingURL=orders.js.map