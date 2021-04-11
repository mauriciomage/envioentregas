webpackJsonp([1],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const from_1 = __webpack_require__(21);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
let GoOrderService = class GoOrderService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    sendDeclineOffert(report_by, user_id, order_id, business_id, reason) {
        let data = {
            delivery_id: report_by,
            user_id: user_id,
            order_id: order_id,
            business_id: business_id,
            reason: reason
        };
        let url = `${Constants.API.URL}offertsBusinessTracking/decline`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    acceptClientOrder(order_id, user_id, delivery_id) {
        let data = {
            order_id: order_id,
            user_id: user_id,
            delivery_id: delivery_id
        };
        let url = `${Constants.API.URL}order/accept`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    verifyStartCodeOrder(codeOrder, idUser, idOrder) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'order/codeStart/verify/' + codeOrder + "/" + idUser + "/" + idOrder, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    verifyFinalCodeOrder(codeOrder, idUser, idOrder) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'order/codeFinal/verify/' + codeOrder + "/" + idUser + "/" + idOrder, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    sendMessage(delivery_id, user_id, order_id, status, message) {
        let data = {
            delivery_id: delivery_id,
            user_id: user_id,
            order_id: order_id,
            status: status,
            message: message,
        };
        let url = `${Constants.API.URL}business/sendMessage`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    sendOffert(maxDeliveryDate, maxDeliveryHour, cost, delivery_id, user_id, order_id, status, vehicle, re_offert = null) {
        let data = {
            maxDeliveryDate: maxDeliveryDate,
            maxDeliveryHour: maxDeliveryHour,
            cost: cost,
            delivery_id: delivery_id,
            user_id: user_id,
            order_id: order_id,
            status: status,
            vehicle: vehicle,
            re_offert: re_offert
        };
        let url = `${Constants.API.URL}business/sendOffert`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    sendRating(rating, user_id, report_by, order_id, to) {
        let data = {
            point: rating,
            user_id: user_id,
            report_by: report_by,
            order_id: order_id,
            to: to
        };
        let url = `${Constants.API.URL}orders/sendRating`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    sendCurrentLocation(delivery_id, order_id, current_address, user_id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/sendCurrentLocation/' + delivery_id + "/" + order_id + "/" + current_address + "/" + user_id, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    getOrderInfo(orderId) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/info/' + orderId, { headers: headers, method: "GET" }).map((res) => { return res.json(); });
    }
};
GoOrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], GoOrderService);
exports.GoOrderService = GoOrderService;
//# sourceMappingURL=goOrder.service.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const login_1 = __webpack_require__(32);
const phone_number_1 = __webpack_require__(531);
const ngx_1 = __webpack_require__(88);
const order_service_1 = __webpack_require__(37);
const pre_profile_1 = __webpack_require__(63);
const token_service_1 = __webpack_require__(38);
const ngx_2 = __webpack_require__(26);
let PreOrderPage = class PreOrderPage {
    constructor(events, navCtrl, navParams, alertCtrl, facebook, tokenService, orderService, fcm, platform) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.facebook = facebook;
        this.tokenService = tokenService;
        this.orderService = orderService;
        this.fcm = fcm;
        this.platform = platform;
        this.title = '';
        this.SEND_OFFERT = false;
        this.userData = null;
        if (navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
        }
        this.LoginPage = login_1.LoginPage;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad PreOrderPage');
    }
    toLogin() {
        if (this.SEND_OFFERT) {
            this.navCtrl.push(login_1.LoginPage, { send_offert: this.SEND_OFFERT });
        }
        else {
            this.navCtrl.push(login_1.LoginPage, { pre_order: true });
        }
    }
    loginWithFB() {
        this.facebook.login(['email', 'public_profile']).then((response) => {
            this.facebook.api('me?fields=id,name,email,first_name, last_name, picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {
                    email: profile['email'],
                    first_name: profile['first_name'],
                    last_name: profile['last_name'],
                    picture: profile['picture_large']['data']['url'],
                    username: profile['name']
                };
                this.orderService.checkOrSaveUserFb(this.userData.username, this.userData.email, this.userData.picture, this.userData.first_name, this.userData.last_name)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    this.events.publish('user:logged', data, Date.now());
                    localStorage.setItem("logged", 'true');
                    localStorage.setItem("user_id", data['user'].id);
                    localStorage.setItem("email", data['user'].email);
                    localStorage.setItem("photo_fb", data['user'].photo);
                    localStorage.setItem("fname_logged", data['user'].fname);
                    localStorage.setItem("lname_logged", data['user'].lname);
                    localStorage.setItem("verified", data['user'].verified);
                    this.fcm.getAPNSToken().then(tokenKey => {
                        this.tokenService.saveToken(tokenKey, data['id'], 'ios').subscribe(console.log, console.log);
                    });
                    this.fcm.getToken().then(token => {
                        this.tokenService.saveToken(token, data['user'].id, 'android').subscribe(console.log, console.log);
                    }, (error) => {
                        console.log('error retrieving token: ' + error);
                    });
                    this.navCtrl.push(pre_profile_1.PreProfilePage);
                }, err => this.showErrorAlertFB(err));
            });
        });
    }
    firstStepSignUp(parameters) {
        let email = parameters.value.email;
        let password = parameters.value.password;
        let fname = parameters.value.fname;
        let lname = parameters.value.lname;
        //==========Email validate=============
        let email_validated = true;
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regExp.test(email)) {
            email_validated = false;
        }
        else {
            email_validated = true;
        }
        //==========End Email validate==========
        //==========password validate=============
        let password_validated = true;
        let regExp2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!regExp2.test(password)) {
            password_validated = false;
        }
        else {
            password_validated = true;
        }
        //==========End Email validate==========
        if (email == "" || password == "" || fname == "" || lname == "") {
            let alert = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Los datos son obligatorios',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (!email_validated) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Debes indicar un email válido',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (!password_validated) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'La contraseña debe contener números y letras con al menos 6 caracteres',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            localStorage.setItem("email", email);
            localStorage.setItem("fname_logged", fname);
            localStorage.setItem("lname_logged", lname);
            localStorage.setItem("password", password);
            this.navCtrl.push(phone_number_1.PhoneNumberPage, { send_offert: this.SEND_OFFERT });
        }
    }
    showErrorAlertFB(type) {
        if (type == 'ERROR_LOGIN') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error SERVICIO',
                subTitle: JSON.stringify(type),
                buttons: ['OK'],
            });
            alert.present();
        }
    }
};
PreOrderPage = __decorate([
    core_1.Component({
        selector: 'page-pre-order',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/pre-order/pre-order.html"*/'<!--\n  Generated template for the PreOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n<ion-content class="background">\n	<form #fPreOrder="ngForm">\n		<ion-card>\n		  <ion-card-header>\n		    ¿ Listo para EnvioEntregas ?\n		  </ion-card-header>\n\n\n		  	<ion-card-content>\n		  		<ion-list no-line>\n			    	<ion-item>\n			    		<ion-input  type="email" placeholder="Ingrese un email" name="email" ngModel #email = "ngModel" ></ion-input>\n			    	</ion-item>\n			    	<ion-item>\n			    		<ion-input text-capitalize placeholder="su Nombre"  type="text" name="fname" ngModel #fname = "ngModel" ></ion-input>\n			    	</ion-item>\n			    	<ion-item>\n			    		<ion-input text-capitalize  placeholder="su Apellido" type="text" name="lname" ngModel #lname = "ngModel" ></ion-input>\n			    	</ion-item>\n			    	<ion-item>\n			    		<ion-input type="password" placeholder="Contraseña por numeros y letras" name="password" ngModel #password = "ngModel"></ion-input>\n			    	</ion-item>\n			    </ion-list>\n\n\n				<button ion-button block outline color="light" (click)="firstStepSignUp(fPreOrder);">Aceptar</button>\n\n				<button ion-button block color="facebook" (click)=\'loginWithFB()\'>\n			  		<ion-icon name="logo-facebook"></ion-icon> &nbsp; Ingresar con Facebook\n			  	</button>\n\n			</ion-card-content>\n\n			<button class="bottom" ion-button clear full color="light" (click)="toLogin()">\n				Ya tienes una cuenta? Ingresar\n			</button>\n\n		</ion-card>\n	</form>\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/pre-order/pre-order.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        ngx_1.Facebook,
        token_service_1.TokenService,
        order_service_1.OrderServiceProvider,
        ngx_2.FCM,
        ionic_angular_1.Platform])
], PreOrderPage);
exports.PreOrderPage = PreOrderPage;
//# sourceMappingURL=pre-order.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const Constants = __webpack_require__(14);
const http_1 = __webpack_require__(17);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let PhoneServiceProvider = class PhoneServiceProvider {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    generatePhoneCode(phone, email, fname, lname, password, isClient = false, places = []) {
        let data = {
            phone: phone,
            email: email,
            fname: fname,
            lname: lname,
            password: password,
            isClient: isClient,
            places: places
        };
        let url = `${Constants.API.URL}phone/code`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    generatePhoneCodeAtLogin(phone, email) {
        let data = {
            phone: phone,
            email: email
        };
        let url = `${Constants.API.URL}phone/code/atLogin`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    verifyPhoneCode(code, user_id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'phone/code/verify/' + code + '/' + user_id, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
};
PhoneServiceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], PhoneServiceProvider);
exports.PhoneServiceProvider = PhoneServiceProvider;
//# sourceMappingURL=phone-service.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const phone_service_1 = __webpack_require__(114);
const token_service_1 = __webpack_require__(38);
const ngx_1 = __webpack_require__(26);
const login_1 = __webpack_require__(32);
let VerifyCodePage = class VerifyCodePage {
    constructor(events, navCtrl, navParams, alertCtrl, phoneService, tokenService, fcm, loadingCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.phoneService = phoneService;
        this.tokenService = tokenService;
        this.fcm = fcm;
        this.loadingCtrl = loadingCtrl;
        this.SEND_OFFERT = false;
        this.FROM_SIGNIN = false;
        this.title = 'Verificar Codigo';
        if (this.navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
        }
        this.FROM_SIGNIN = navParams.get("signin");
    }
    ionViewDidLoad() {
    }
    verifyCode(parameter) {
        let code = parameter.value.phone_code;
        let user_id = localStorage.getItem("user_id");
        if (code == "") {
            this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Debes indicar el Codigo',
                buttons: ['OK'],
            }).present();
        }
        else {
            this.loadingVerifyCode();
            this.phoneService.verifyPhoneCode(code, user_id)
                .subscribe(data => {
                this.loading.dismiss();
                if (data.error) {
                    if (data.error == 'ERROR_PHONE_CODE_VERIFY') {
                        this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'El Codigo ingresado es Incorrecto.',
                            buttons: ['OK'],
                        }).present();
                    }
                    else {
                        this.showErrorAlert();
                    }
                }
                else {
                    let user = data['result'];
                    this.events.publish('user:logged', user, Date.now());
                    localStorage.setItem("logged", 'true');
                    localStorage.setItem("user_id", user['id']);
                    localStorage.setItem("fname_logged", user['fname']);
                    localStorage.setItem("lname_logged", user['lname']);
                    localStorage.setItem("email", user['email']);
                    localStorage.setItem("photo", user['photo']);
                    localStorage.setItem("phone_checked", user['phone_checked']);
                    localStorage.setItem("verified", user['verified']);
                    localStorage.setItem("isClient", user['is_client']);
                    localStorage.removeItem("password");
                    this.fcm.getAPNSToken().then(token => {
                        this.tokenService.saveToken(token, user['id'], 'ios').subscribe(console.log, console.log);
                    }, (error) => {
                        console.log('error retrieving token: ' + error);
                    });
                    this.fcm.getToken().then(token => {
                        this.tokenService.saveToken(token, user['id'], 'android').subscribe(console.log, console.log);
                    }, (error) => {
                        console.log('error retrieving token: ' + error);
                    });
                    let currentIndex = this.navCtrl.getActive().index;
                    this.navCtrl.push(login_1.LoginPage, { action: 'newuser' }).then(() => {
                        this.navCtrl.remove(currentIndex);
                    });
                }
            }, () => {
                this.loading.dismiss();
                this.showErrorAlert();
            });
        }
    }
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Algo salió mal!',
            subTitle: 'Ha ocurrido un error en la conexión, intente nuevamente',
            buttons: ['OK'],
        });
        alert.present();
    }
    loadingVerifyCode() {
        this.loading = this.loadingCtrl.create({
            content: 'Generando Codigo de validacion...'
        });
        this.loading.present();
    }
};
VerifyCodePage = __decorate([
    core_1.Component({
        selector: 'page-verify-code',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/verify-code/verify-code.html"*/'<!--\n  Generated template for the VerifyCodePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n		<p class="normal_text">INDICA EL CODIGO PARA VALIDAR</p>\n		<form #fVerifyCode="ngForm">	\n			 <ion-card>\n			 	<ion-card-header>\n			 		<ion-input  type="number" maxlength="10" placeholder="Ingrese Codigo de 6 dig." name="phone_code" ngModel #phone_code = "ngModel" ></ion-input>\n			 	</ion-card-header>\n			 	<ion-card-content>\n			 		\n				<button ion-button block outline color="light" (click)="verifyCode(fVerifyCode);">ACEPTAR</button> 			\n			 		\n			 	</ion-card-content>\n			</ion-card>	\n			\n		</form>	\n		<hr>\n		<p class="normal_text">Revisa si ha llegado un SMS y/o email a tu correo que indicaste anteriormente.</p>\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/verify-code/verify-code.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        phone_service_1.PhoneServiceProvider,
        token_service_1.TokenService,
        ngx_1.FCM,
        ionic_angular_1.LoadingController])
], VerifyCodePage);
exports.VerifyCodePage = VerifyCodePage;
//# sourceMappingURL=verify-code.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const order_service_1 = __webpack_require__(37);
const login_1 = __webpack_require__(32);
const message_detail_1 = __webpack_require__(65);
const ngx_1 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const signin_1 = __webpack_require__(62);
const view_image_1 = __webpack_require__(87);
let MessagesPage = class MessagesPage {
    constructor(navCtrl, navParams, orderService, alertCtrl, fcm, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.modalCtrl = modalCtrl;
        this.title = 'MIS MENSAJES';
        this.orders = [];
        this.messages_quantity = [];
        this.delivery_orders = [];
        this.USER_LOGGED = false;
        this.FROM_LOGIN = false;
        this.counter = 0;
        this.logged = true;
        this.actions = 'send';
        this.SigninPage = signin_1.SigninPage;
    }
    ionViewWillEnter() {
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        if (localStorage.getItem("logged") == 'true') {
            this.logged = true;
            let user_id = localStorage.getItem("user_id");
            this.rating = localStorage.getItem("rating");
            this.getOrdersOnNegotiation(user_id);
        }
        else {
            this.logged = false;
        }
    }
    getOrdersOnNegotiation(user) {
        this.orderService.getNegotiationOrders(user)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.orders = data['results'];
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
        this.getDeliveryOrdersByUser(user);
    }
    getDeliveryOrdersByUser(user) {
        this.orderService.getDeliveryOrders(user)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.delivery_orders = data['results'];
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    goMessages(business_id, action, status = null) {
        this.navCtrl.push(message_detail_1.MessageDetailPage, { business_id: business_id, action: action, status: status });
    }
    goLogin() {
        this.navCtrl.push(login_1.LoginPage, { list_messages: true });
    }
    viewPhoto(photoName) {
        let imageModal = this.modalCtrl.create(view_image_1.ViewImagePage, { img: photoName });
        imageModal.present();
    }
};
MessagesPage = __decorate([
    core_1.Component({
        selector: 'page-messages',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/messages/messages.html"*/'<ion-header>\n\n  <ion-navbar color="ee" hideBackButton>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="ee" *ngIf="logged"  [(ngModel)]="actions">\n    <ion-segment color="light">\n      <ion-segment-button value="send">\n       ENVIAR\n      </ion-segment-button>\n      <ion-segment-button value="delivery">\n       LLEVAR\n      </ion-segment-button>\n      <!-- TODO After release <ion-list *ngSwitchCase="\'other\'">\n      <ion-segment-button value="other">\n       OTROS MENSAJES\n      </ion-segment-button>\n      -->\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n\n  <div padding  *ngIf="!logged" >\n    <ion-avatar item-start>\n      <div align="center">\n        <img src="assets/imgs/user_default.png" height="200px">\n      </div>\n    </ion-avatar>\n  \n\n    <button ion-button block color="ee" (click)="goLogin();">INGRESAR</button>\n\n    <button ion-button block color="facebook" (click)=\'loginWithFB()\'>\n      <ion-icon name="logo-facebook"></ion-icon> &nbsp; Ingresar con Facebook\n    </button>\n    <ion-footer>\n\n        <button class="bottom" ion-button clear full color="light" [navPush]="SigninPage">\n              No tienes cuenta? Registrate\n        </button>\n\n    </ion-footer>\n  </div>\n\n  <div [ngSwitch]="actions"  *ngIf="logged">\n\n        <ion-list *ngSwitchCase="\'send\'">\n              <ion-card class="background-card" *ngIf="orders.length == 0">\n                \n                <img src="assets/imgs/empty_orders.jpg"/>\n                <button ion-button color="dark" [navPush]="newOrderPage">¿Quieres Enviar algo?</button>\n              \n              </ion-card>\n\n\n\n              <ion-card class="background-card" *ngFor="let order of orders; let k = index">\n                <ion-card-content>\n                  <!--ORDER NAME-->\n                  <p class="title-card">\n                      <ion-icon color="ee" *ngIf="order.startPhoto" (tap)="viewPhoto(order.startPhoto)" ios="ios-camera-outline" md="md-camera"></ion-icon>\n                      {{order.name | uppercase}}\n                  </p>\n                  <!--STATUS-->\n                <div class="status-container">\n                    <ion-icon name="options"></ion-icon> <label class="status-text">{{order.status_order | uppercase}}</label>\n                </div>\n                <!--FROM TO-->\n                <div class="row">\n                  <div class="col source-text">\n                    {{order.source.split(\',\')[0] | uppercase}}\n                  </div>\n                  <div class="col">\n                      <ion-icon class="icon-address" name="arrow-round-forward"></ion-icon>\n                  </div>\n                  <div class="col destination-text">\n                    {{order.destination.split(\',\')[0] | uppercase}}\n                  </div>\n                </div>\n                <ion-item class="background-card">\n                  <button item-end ion-button outline icon-start color="ee" (tap)="goMessages(order.business_id, \'order\', order.status_order)">\n                    <ion-icon name="chatbubbles"></ion-icon>\n                    Consultar al delivery\n                  </button>\n                </ion-item>\n                <!--COST-->\n                <ion-item class="background-card">\n                    <ion-badge color="ee" item-end> {{order.cost | currency:\'ARS\'}}</ion-badge>\n                </ion-item>\n              </ion-card-content>\n\n              </ion-card>  \n\n       </ion-list>\n       \n       <ion-list *ngSwitchCase="\'delivery\'">\n              <ion-card class="background-card" *ngIf="delivery_orders.length == 0">\n                <img src="assets/imgs/empty_orders.jpg"/>\n                <button ion-button color="dark" [navPush]="newDeliveryNotifyPage">¿Quieres Llevar algo?</button>\n              </ion-card>\n\n              <ion-card class="background-card" *ngFor="let order of delivery_orders; let k = index">\n\n                    <ion-card-content>\n                        <!--ORDER NAME-->\n                        <p class="title-card">\n                          <ion-icon color="ee" *ngIf="order.startPhoto" (tap)="viewPhoto(order.startPhoto)" ios="ios-camera-outline" md="md-camera"></ion-icon>\n                          {{order.name | uppercase}}\n                        </p>\n                        <!--DETAILS  -->\n                        <p class="detail-text" *ngIf="order.description">\n                          <i>Detalle: {{order.description}}</i>\n                        </p>\n                        <p class="subtitle-delivery-card" color="ee">\n                          Por {{order.fname | uppercase}} {{order.lname | uppercase}}\n                        </p>\n                        <!--RATING DELIVERY-->\n                        <div col="col center">\n                          <ion-icon *ngIf="order.avg_point >= 1" color="ee" name="star"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point > 0 && order.avg_point < 1" color="ee" name="star-half"></ion-icon>\n                          <ion-icon *ngIf="!order.avg_point" color="ee" name="star-outline"></ion-icon>\n    \n                          <ion-icon *ngIf="order.avg_point >= 2" color="ee" name="star"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point > 1 && order.avg_point < 2" color="ee" name="star-half"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point <= 1" color="ee" name="star-outline"></ion-icon>\n    \n                          <ion-icon *ngIf="order.avg_point >= 3" color="ee" name="star"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point > 2 && order.avg_point < 3" color="ee" name="star-half"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point <= 2" color="ee" name="star-outline"></ion-icon>\n    \n                          <ion-icon *ngIf="order.avg_point >= 4" color="ee" name="star"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point > 3 && order.avg_point < 4" color="ee" name="star-half"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point <= 3" color="ee" name="star-outline"></ion-icon>\n    \n                          <ion-icon *ngIf="order.avg_point == 5" color="ee" name="star"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point > 4 && order.avg_point < 5" color="ee" name="star-half"></ion-icon>\n                          <ion-icon *ngIf="order.avg_point <= 4" color="ee" name="star-outline"></ion-icon>\n                        </div>\n                        <!--STATUS-->\n                        <div class="status-container">\n                          <ion-icon name="options"></ion-icon> <label class="status-text">{{order.status_order | uppercase}}</label>\n                        </div>\n                        <!--FROM TO-->\n                        <div class="row">\n                          <div class="col source-text">\n                            {{order.source.split(\',\')[0] | uppercase}}\n                          </div>\n                          <div class="col">\n                              <ion-icon class="icon-address" name="arrow-round-forward"></ion-icon>\n                          </div>\n                          <div class="col destination-text">\n                            {{order.destination.split(\',\')[0] | uppercase}}\n                          </div>\n                        </div>\n                        <!--MENSAJES-->\n                        <ion-item class="background-card">\n                          <button item-end ion-button outline icon-start color="ee" (tap)="goMessages(order.business_id, \'delivery\')">\n                            <ion-icon name="chatbubbles"></ion-icon>\n                            CHAT\n                          </button>\n                        </ion-item>\n                        <!--COST-->\n                        <ion-item class="background-card">\n                            <ion-badge color="ee" item-end> {{order.cost | currency:\'ARS\'}}</ion-badge>\n                        </ion-item>\n                    </ion-card-content>\n              </ion-card>\n          </ion-list>\n    </div>\n\n    \n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/messages/messages.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.AlertController,
        ngx_1.FCM,
        ionic_angular_1.ModalController])
], MessagesPage);
exports.MessagesPage = MessagesPage;
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.API_LOCAL_PROXY_ENDPOINT = 'http://192.168.0.3:8100/api/';
exports.API_LOCAL_ENDPOINT = 'http://localhost:8000/api/';
exports.API_PROD_ENDPOINT = 'https://envioentregas.com/api/';
exports.API = {
    URL: exports.API_PROD_ENDPOINT,
};
exports.EXCLUDE_PLACES = [];
exports.DEBUG = {
    SAND_BOX: true,
    LAT: '-31.4184727',
    LNG: '-64.1710925',
    CURRENT_CITY_OK: 'Cordoba'
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const geolocation_service_1 = __webpack_require__(86);
const order_service_1 = __webpack_require__(37);
const go_order_1 = __webpack_require__(28);
let SearchPage = SearchPage_1 = class SearchPage {
    constructor(navCtrl, navParams, zone, geolocator, orderService, toast, modalCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.geolocator = geolocator;
        this.orderService = orderService;
        this.toast = toast;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geocoder = new google.maps.Geocoder;
        this.search_executed = false;
        this.markers_orders = [];
        this.markers_current = [];
        this.lat_used = [];
        this.lng_used = [];
        this.markers = [];
        this.orders = [];
        this.title = 'Realiza un Delivery!';
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '', input2: '' };
        this.autocompleteItems = [];
        this.autocompleteItems2 = [];
        this.SAME_POINT = false;
        this.MARKER_SAME_POSITION = 0;
        if (this.navParams.get('orders') !== null && this.navParams.get('orders') !== "") {
            this.orders = this.navParams.get('orders');
        }
    }
    ionViewWillEnter() {
        this.initMap();
    }
    initMap() {
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        this.pointHERE = { lat: +lat, lng: +lng };
        let divMap = document.getElementById('map-search');
        this.map = new google.maps.Map(divMap, {
            center: this.pointHERE,
            zoom: 11,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true,
            mapTypeId: 'roadmap'
        });
        var icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        this.markerHERE = new google.maps.Marker({
            position: this.pointHERE,
            map: this.map,
            label: 'ESTAS AQUÍ',
            icon: icon
        });
        this.map.setCenter(this.pointHERE);
        google.maps.event.addListener(this.markerHERE, 'click', function () {
            var current_address = localStorage.getItem('current_address');
            //localStorage.setItem('set_current_address', 'true');
        });
        this.getAddressCurrentLocation(lat, lng);
    }
    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        // set autocomplete options
        var options = {
            input: this.autocomplete.input,
            types: ['address'],
            componentRestrictions: { country: 'ar' },
        };
        this.GoogleAutocomplete.getPlacePredictions(options, (predictions, status) => {
            if (predictions) {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    }
    updateSearchResults2() {
        if (this.autocomplete.input2 == '') {
            this.autocompleteItems2 = [];
            return;
        }
        // set autocomplete options
        var options = {
            input: this.autocomplete.input2,
            types: ['address'],
            componentRestrictions: { country: 'ar' },
        };
        this.GoogleAutocomplete.getPlacePredictions(options, (predictions, status) => {
            if (predictions) {
                this.autocompleteItems2 = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems2.push(prediction);
                    });
                });
            }
        });
    }
    selectSearchResult(item) {
        var icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        //Limpio el marker origen
        if (this.marker_source)
            this.marker_source.setMap(null);
        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                this.marker_source = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                    icon: icon
                });
                this.markers_orders.push(this.marker_source);
                this.map.setCenter(results[0].geometry.location);
                localStorage.setItem("search_latlng_selected_source", results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                // localStorage.setItem("source_lat", results[0].geometry.location.lat());
                //localStorage.setItem("source_lng", results[0].geometry.location.lng());
            }
        });
    }
    selectSearchResult2(item) {
        var icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        this.autocompleteItems2 = [];
        this.autocomplete.input2 = item.description;
        if (this.marker_destination)
            this.marker_destination.setMap(null);
        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                // localStorage.setItem("source_address", item.description);
                this.marker_destination = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                    icon: icon
                });
                this.markers_orders.push(this.marker_destination);
                this.map.setCenter(results[0].geometry.location);
                localStorage.setItem("search_latlng_selected_destination", results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                //localStorage.setItem("source_lat", results[0].geometry.location.lat());
                //localStorage.setItem("source_lng", results[0].geometry.location.lng());
            }
        });
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        localStorage.setItem("search_source", this.autocomplete.input);
        localStorage.setItem("search_destination", this.autocomplete.input2);
        document.getElementById('button-search-orders').style.display = "";
        // document.getElementById('button-search-current-orders').style.display = "none";
        //this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: this.autocomplete.input,
            destination: this.autocomplete.input2,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                let divMap = document.getElementById('map-search');
                this.map = new google.maps.Map(divMap);
                directionsDisplay.setMap(this.map);
                document.getElementById('button-search-orders').style.display = "";
                document.getElementById('button-search-orders-current-location').style.display = "none";
            }
            else {
                alert("No se pudo trazar la ruta");
            }
        });
    }
    //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Buscando Deliveries...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    getOrdersBySearch() {
        let source = localStorage.getItem('search_source');
        let destination = localStorage.getItem('search_destination');
        let arr_source = source.split(",");
        let len_arr_source = arr_source.length;
        let city_source = arr_source[len_arr_source - 2];
        let arr_destination = destination.split(",");
        let len_arr_destination = arr_destination.length;
        let city_destination = arr_destination[len_arr_destination - 2];
        let latlng_source = localStorage.getItem("search_latlng_selected_source");
        let latlng_destination = localStorage.getItem("search_latlng_selected_destination");
        let user_id = localStorage.getItem("user_id");
        var icon = 'assets/imgs/logo_marker.png';
        this.presentLoadingDefault();
        this.orderService.searchOrders(city_source, latlng_source, latlng_destination, user_id, true);
        /*.subscribe(
        data=>{
          console.log(data['results']);
          this.orders = data['results'];

          for(let m=0; m<this.markers.length; m++){
              this.markers[m].setMap(null);
          }
          this.markers.length = 0;

          for(let i = 0 ; i<this.orders.length; i++){

              let coordinates =  this.orders[i].coordinates;

              let idorder = this.orders[i].id;
              let name = this.orders[i].PackageName;
              let source = this.orders[i].source;
              let destination = this.orders[i].destination;
              let cost = this.orders[i].cost;
              let charge = this.orders[i].charge;
              let maxDeliveryDate = this.orders[i].maxDeliveryDate;
              let mommentPickup = this.orders[i].mommentPickup;
              let fname = this.orders[i].fname;
              let id_user_order = this.orders[i].user_id
              let status = this.orders[i].status;
              let username = this.orders[i].username;
              let size = this.orders[i].size;
              let weight = this.orders[i].weight;
              let vehicle = this.orders[i].vehicle;
              let statusbusiness = this.orders[i].statusbusiness;

              let arr_coordinates = coordinates.split(";");
              let coordinates_source = arr_coordinates[0];
              let arr_coordinates_source = coordinates_source.split(",");

              let lat = arr_coordinates_source[0];

              if(lat)
                  lat = lat.replace("(","");

              let lng = arr_coordinates_source[1];

              if(lng)
                  lng = lng.replace(")","");




              var point = {lat: +lat, lng: +lng};
              var marker = new google.maps.Marker({
                position: point,
                map: this.map,
                icon: icon,
                zoom: 11
              });

              this.markers.push(marker);
              this.map.setCenter(point);


              var object = new SearchPage(this.navCtrl,this.navParams, this.zone, this.geolocator, this.orderService, this.toast,this.modalCtrl, this.loadingCtrl);
                  marker.addListener('click', function () {
                             object.navCtrl.push(GoOrderPage, {id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status, username: username, mommentPickup: mommentPickup, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], business_declined: "", statusbusiness: statusbusiness});
                  });



            }

                  var toast = this.toast.create({
                      message: 'Haz clic en el Delivery que desees realizar!',
                      duration: 3000,
                      position: 'middle'
                  });

                  var toast_zero = this.toast.create({
                      message: 'No hay Deliveries para realizar, busca Deliveries Cercanos!',
                      duration: 4000,
                      position: 'middle'
                  });

                  if(this.orders.length > 0){
                      toast.present();
                      this.loading.dismiss();
                  }else{
                      toast_zero.present();
                      this.loading.dismiss();
                  }
        },
        err=>console.log(err)
        );*/
    }
    getAddressCurrentLocation(lat, lng) {
        let geocoder = new google.maps.Geocoder();
        let location = new google.maps.LatLng(+lat, +lng);
        var current_city = "";
        this.geocoder.geocode({ 'latLng': location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var current_city = results[0].address_components[2].long_name;
                localStorage.setItem("current_city", current_city);
            }
        });
        if (localStorage.getItem('set_current_address') == 'true') {
            let current_address = localStorage.getItem('current_address');
            this.autocomplete.input = current_address;
        }
        if (this.orders) {
            if (this.orders.length > 0) {
                this.showOrdersByHome();
            }
        }
    }
    getOrdersByCurrentLocation() {
        var current_city = localStorage.getItem("current_city");
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        let location = new google.maps.LatLng(+lat, +lng);
        var icon = 'assets/imgs/logo_marker.png';
        let user_id = localStorage.getItem("user_id");
        this.presentLoadingDefault();
        this.orderService.searchOrders(current_city, location, location, user_id, true);
        /*.subscribe(
          data=>{
            console.log(data['results']);
            this.orders = data['results'];

            //Limpio pedidos del mapa para la nueva busqueda
            for(let m=0; m<this.markers.length; m++){
                this.markers[m].setMap(null);
            }
            this.markers.length = 0;

            if(this.marker_source)
                this.marker_source.setMap(null);

            if(this.marker_destination)
                this.marker_destination.setMap(null);

            for(let i = 0 ; i<this.orders.length; i++){

            let coordinates =  this.orders[i].coordinates;

            let idorder = this.orders[i].id;
            let name = this.orders[i].PackageName;
            let source = this.orders[i].source;
            let destination = this.orders[i].destination;
            let cost = this.orders[i].cost;
            let charge = this.orders[i].charge;
            let maxDeliveryDate = this.orders[i].maxDeliveryDate;
            let mommentPickup = this.orders[i].mommentPickup;
            let fname = this.orders[i].fname;
            let id_user_order = this.orders[i].user_id
            let status = this.orders[i].status;
            let username = this.orders[i].username;
            let size = this.orders[i].size;
            let weight = this.orders[i].weight;
            let vehicle = this.orders[i].vehicle;
            let statusbusiness = this.orders[i].statusbusiness;

                //se guardan en LS para cuando el usuario se registra antes de enviar una oferta de delivery
                localStorage.setItem("source_pre_offert", source);
                localStorage.setItem("destination_pre_offert", destination);
                localStorage.setItem("name_pre_offert", name);
                localStorage.setItem("cost_pre_offert", cost);
                localStorage.setItem("charge_pre_offert", charge);
                localStorage.setItem("maxDeliveryDate_pre_offert", maxDeliveryDate);
                localStorage.setItem("fname_pre_offert", fname);
                localStorage.setItem("idUserOrder_pre_offert", id_user_order);


            var point;
            let arr_coordinates = coordinates.split(";");
            let coordinates_source = arr_coordinates[0];
            let arr_coordinates_source = coordinates_source.split(",");

            let lat = arr_coordinates_source[0];
            lat = lat.replace("(","");

            let lng = arr_coordinates_source[1];

            if(lng){
                lng = lng.replace(")","");
            }

            for(let m= 0 ; m<this.lat_used.length; m++){
                if(this.lat_used[m] == lat || this.lng_used[m] == lng)
                {

                    this.SAME_POINT = true;

                    //Sumar la 4ta cifra de la longiotud.
                    let lat_arr = lat.split(".");
                    var left_part = lat_arr[0];
                    var right_part = lat_arr[1];
                    let number = right_part[3];
                    number = parseFloat(number);
                    var number_updated = number + 1;
                    number_updated = ''+number_updated;
                    let length = right_part.length;
                    let right_part_analytics = right_part;
                    right_part = '';
                    for(let c = 0; c<length; c++){
                        if(c == 3){
                            right_part += number_updated;
                        }else{
                            right_part += right_part_analytics[c];
                        }
                    }
                    lat = left_part+"."+right_part;

                    point = {lat: +lat, lng: +lng};

                }


            }
            if(!this.SAME_POINT){
                point = {lat: +lat, lng: +lng};
                this.lat_used.push(lat);
                this.lng_used.push(lng);
            }else{
                this.SAME_POINT = false;
            }


            var marker = new google.maps.Marker({
              position: point,
              map: this.map,
              icon: icon,
              zoom: 11
            });

            this.markers.push(marker);
            this.map.setCenter(point);
            var object = new SearchPage(this.navCtrl, this.navParams, this.zone, this.geolocator, this.orderService, this.toast,this.modalCtrl, this.loadingCtrl);
            marker.addListener('click', function () {

              object.navCtrl.push(GoOrderPage, {id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status, username: username, mommentPickup: mommentPickup, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], statusbusiness: statusbusiness});
            });
        }
            var toast = this.toast.create({
                message: 'Haz clic en el Delivery que desees realizar!',
                duration: 3000,
                position: 'middle'
            });

            var toast_zero = this.toast.create({
                message: 'No tienes ningun Delivery cercano, busca en otra zona!',
                duration: 4000,
                position: 'middle'
            });

            if(this.orders.length > 0){
                toast.present();
                this.loading.dismiss();
            }else{
                toast_zero.present();
                this.loading.dismiss();
            }
          },
          err=>console.log(err)
          );*/
    }
    showOrdersByHome() {
        var icon = 'assets/imgs/logo_marker.png';
        //Limpio pedidos del mapa para la nueva busqueda
        for (let m = 0; m < this.markers.length; m++) {
            this.markers[m].setMap(null);
        }
        this.markers.length = 0;
        if (this.marker_source)
            this.marker_source.setMap(null);
        if (this.marker_destination)
            this.marker_destination.setMap(null);
        for (let i = 0; i < this.orders.length; i++) {
            let coordinates = this.orders[i].coordinates;
            let idorder = this.orders[i].id;
            let name = this.orders[i].PackageName;
            let source = this.orders[i].source;
            let destination = this.orders[i].destination;
            let cost = this.orders[i].cost;
            let charge = this.orders[i].charge;
            let maxDeliveryDate = this.orders[i].maxDeliveryDate;
            let mommentPickup = this.orders[i].mommentPickup;
            let fname = this.orders[i].fname;
            let id_user_order = this.orders[i].user_id;
            let status = this.orders[i].status;
            let username = this.orders[i].username;
            let size = this.orders[i].size;
            let weight = this.orders[i].weight;
            let vehicle = this.orders[i].vehicle;
            let statusbusiness = this.orders[i].statusbusiness;
            //se guardan en LS para cuando el usuario se registra antes de enviar una oferta de delivery
            localStorage.setItem("source_pre_offert", source);
            localStorage.setItem("destination_pre_offert", destination);
            localStorage.setItem("name_pre_offert", name);
            localStorage.setItem("cost_pre_offert", cost);
            localStorage.setItem("charge_pre_offert", charge);
            localStorage.setItem("maxDeliveryDate_pre_offert", maxDeliveryDate);
            localStorage.setItem("fname_pre_offert", fname);
            localStorage.setItem("idUserOrder_pre_offert", id_user_order);
            let arr_coordinates = coordinates.split(";");
            let coordinates_source = arr_coordinates[0];
            let arr_coordinates_source = coordinates_source.split(",");
            let lat = arr_coordinates_source[0];
            //if(lat)
            lat = lat.replace("(", "");
            let lng = arr_coordinates_source[1];
            if (lng) {
                lng = lng.replace(")", "");
            }
            for (let m = 0; m < this.lat_used.length; m++) {
                if (this.lat_used[m] == lat || this.lng_used[m] == lng) {
                    this.SAME_POINT = true;
                    //Sumar la 4ta cifra de la longiotud.
                    let lat_arr = lat.split(".");
                    var left_part = lat_arr[0];
                    var right_part = lat_arr[1];
                    let number = right_part[3];
                    number = parseFloat(number);
                    var number_updated = number + 1;
                    number_updated = '' + number_updated;
                    let length = right_part.length;
                    let right_part_analytics = right_part;
                    right_part = '';
                    for (let c = 0; c < length; c++) {
                        if (c == 3) {
                            right_part += number_updated;
                        }
                        else {
                            right_part += right_part_analytics[c];
                        }
                    }
                    lat = left_part + "." + right_part;
                    var point = { lat: +lat, lng: +lng };
                }
            }
            if (!this.SAME_POINT) {
                point = { lat: +lat, lng: +lng };
                this.lat_used.push(lat);
                this.lng_used.push(lng);
            }
            else {
                this.SAME_POINT = false;
            }
            var marker = new google.maps.Marker({
                position: point,
                map: this.map,
                icon: icon,
                // label: {text: ''+this.MARKER_SAME_POSITION, color: "green", size: 18},
                zoom: 11
            });
            this.markers.push(marker);
            this.map.setCenter(point);
            var object = new SearchPage_1(this.navCtrl, this.navParams, this.zone, this.geolocator, this.orderService, this.toast, this.modalCtrl, this.loadingCtrl);
            marker.addListener('click', function () {
                object.navCtrl.push(go_order_1.GoOrderPage, { id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status, username: username, mommentPickup: mommentPickup, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], statusbusiness: statusbusiness });
            });
        }
        var toast = this.toast.create({
            message: 'Haz clic en el Delivery que desees realizar!',
            duration: 3000,
            position: 'middle'
        });
        var toast_zero = this.toast.create({
            message: 'No tienes ningun Delivery cercano, busca en otra zona!',
            duration: 4000,
            position: 'middle'
        });
    }
};
SearchPage = SearchPage_1 = __decorate([
    core_1.Component({
        selector: 'page-search',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/search/search.html"*/'<!--\n  Generated template for the SearchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-header>\n	    <ion-toolbar color="dark">\n	      <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="updateSearchResults()" placeholder="Inicio de tu Ruta"></ion-searchbar>\n\n	      <ion-list [hidden]="autocompleteItems.length == 0">\n	        <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n	          {{ item.description }}\n	        </ion-item>\n	      </ion-list>\n\n	      <ion-searchbar [(ngModel)]="autocomplete.input2" (ionInput)="updateSearchResults2()" placeholder="Destino de tu Ruta"></ion-searchbar>\n\n	      <ion-list [hidden]="autocompleteItems2.length == 0">\n	        <ion-item *ngFor="let item of autocompleteItems2" tappable (click)="selectSearchResult2(item)">\n	          {{ item.description }}\n	        </ion-item>\n	      </ion-list>\n\n	    </ion-toolbar>\n  </ion-header>\n\n	<div id="map-search">\n	  	\n	</div>\n	\n		<ion-fab color="danger"  style="display:none">\n			<button ion-button color="danger" class="button-ee" round (click)=\'getOrdersBySearch();\'>Buscar Deliveries</button>\n		</ion-fab>\n		\n</ion-content>\n<ion-footer no-shadow class="footer-ee" id="button-search-orders-current-location">\n	<button ion-button full  class="button-ee" id="button-search-orders" style="display: none" (click)=\'getOrdersBySearch();\'>\n		Buscar deliveries\n	</button>\n	<button ion-button full  class="button-ee" id="button-search-current-orders"  (click)=\'getOrdersByCurrentLocation();\'>\n		Buscar deliveries cercanos\n	</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/search/search.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        core_1.NgZone,
        geolocation_service_1.GeolocationService,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.ToastController,
        ionic_angular_1.ModalController,
        ionic_angular_1.LoadingController])
], SearchPage);
exports.SearchPage = SearchPage;
var SearchPage_1;
//# sourceMappingURL=search.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const price_service_1 = __webpack_require__(516);
const pre_order_1 = __webpack_require__(113);
const go_order_1 = __webpack_require__(28);
const orders_1 = __webpack_require__(53);
const storage_1 = __webpack_require__(58);
const ngx_1 = __webpack_require__(26);
const new_order_1 = __webpack_require__(42);
let PricePage = class PricePage {
    constructor(nav, events, navCtrl, navParams, priceService, alertCtrl, loadingCtrl, storage, platform, fcm) {
        this.nav = nav;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.priceService = priceService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.platform = platform;
        this.fcm = fcm;
        this.insuranceCost = 0;
        this.isInsuranced = false;
        this.pre_order = true;
    }
    ionViewWillEnter() {
        this.userId = localStorage.getItem('user_id');
        if (!this.userId) {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(new_order_1.NewOrderPage).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
        this.finalCost = 0;
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.title = this.isClient ? 'Costo  5/5' : 'Costo  6/6';
        this.checkUserType(this.isClient);
        let postalCode, dimensions, costStip, serviceStip, realCost;
        if (!this.isClient) {
            this.storage.get('postal_code').then((val) => {
                postalCode = val;
            });
            this.storage.get('dimensions').then((val) => {
                dimensions = val;
            });
            this.storage.get('cost_stipulated').then((val) => {
                costStip = val;
            });
            this.storage.get('service_stipulated').then((val) => {
                serviceStip = val;
            });
            this.storage.get('real_cost').then((val) => {
                realCost = val;
                this.costStipulated = costStip;
                this.serviceStipulated = serviceStip;
                this.realCost = realCost;
            });
        }
    }
    checkUserType(isClient) {
        this.titleCard = isClient ? 'Indique el Costo del Producto' : '¿Cuanto estás dispuesto a pagar?';
        this.titlePrice = isClient ? 'Precio del Producto' : 'Precio Estimado';
        if (isClient) {
            this.costStipulated = 0;
            this.serviceStipulated = 0;
        }
    }
    costStipulatedOnChange() {
        if (this.costStipulated > 0) {
            this.serviceStipulated = 40;
            let costProduct = parseFloat(this.costStipulated);
            let serviceEE = costProduct * 0.035;
            this.serviceStipulated += serviceEE;
            this.costStipulated = parseFloat(this.costStipulated);
            this.finalCost = this.costStipulated + this.serviceStipulated;
        }
    }
    sendDataNewOrden() {
        var logged = false;
        var namePackage, description, photo, vehicle, dimensions, size, weight, source_address, source_lat, source_lng, destination_address, destination_lat, destination_lng, cost_stipulated, service_stipulated, insurance_cost, date, hour;
        this.storage.get('name').then((val) => {
            namePackage = val;
        });
        this.storage.get('description').then((val) => {
            description = val;
        });
        this.storage.get('photo').then((val) => {
            photo = val;
        });
        this.storage.get('vehicle').then((val) => {
            vehicle = val;
        });
        this.storage.get('dimensions').then((val) => {
            dimensions = val;
        });
        this.storage.get('size').then((val) => {
            size = val;
        });
        this.storage.get('weight').then((val) => {
            weight = val;
        });
        this.storage.get('source_address').then((val) => {
            source_address = val;
        });
        this.storage.get('source_lat').then((val) => {
            source_lat = val;
        });
        this.storage.get('source_lng').then((val) => {
            source_lng = val;
        });
        this.storage.get('destination_address').then((val) => {
            destination_address = val;
        });
        this.storage.get('destination_address').then((val) => {
            destination_address = val;
        });
        this.storage.get('destination_lat').then((val) => {
            destination_lat = val;
        });
        this.storage.get('destination_lng').then((val) => {
            destination_lng = val;
        });
        this.storage.get('cost_stipulated').then((val) => {
            if (this.isClient) {
                cost_stipulated = this.finalCost;
            }
            else {
                cost_stipulated = val;
            }
        });
        this.storage.get('service_stipulated').then((val) => {
            if (this.isClient) {
                service_stipulated = this.serviceStipulated;
            }
            else {
                service_stipulated = val;
            }
        });
        this.storage.get('insurance_cost').then((val) => {
            if (val) {
                insurance_cost = val;
            }
            else {
                insurance_cost = 0;
            }
        });
        this.storage.get('date').then((val) => {
            date = val;
        });
        this.storage.get('hour').then((val) => {
            hour = val;
            let coordenates = "(" + source_lat + ", " + source_lng + ");(" + destination_lat + ", " + destination_lng + ")";
            let user_id = localStorage.getItem("user_id");
            //verifiºos si el usuario esta logeado
            this.events.subscribe('user:logged', (user, time) => {
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
                this.nav.push(pre_order_1.PreOrderPage, { active: true });
                return;
            }
            // Se consulta si desea realmente publicar la Orden
            if (cost_stipulated > 0 && service_stipulated > 0) {
                this.alertCtrl.create({
                    title: '¿Estás seguro de publicar ésta Orden?',
                    message: this.isClient ? 'Una vez publicada, cualquier Delivery podra aceptar y enviar inmediatamente el Pedido' : 'Una vez realizada la publicación, recibiras ofertas de Deliveries',
                    buttons: [
                        {
                            text: 'No, no estoy seguro.',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel Publish Order');
                            }
                        },
                        {
                            text: 'Publicar ya!',
                            handler: () => {
                                if (logged) {
                                    if (cost_stipulated > 0 && service_stipulated > 0) {
                                    }
                                    this.presentLoadingDefault();
                                    if (localStorage.getItem('order_published') !== 'true') {
                                        this.priceService.saveOrder(namePackage, vehicle, dimensions, source_address, destination_address, cost_stipulated, service_stipulated, insurance_cost, coordenates, date, hour, user_id, size, description, photo, this.isClient)
                                            .subscribe(data => {
                                            if (this.platform.is('cordova')) {
                                                data = JSON.parse(data.data);
                                            }
                                            const id_order = data.order_id;
                                            if (data.error) {
                                                this.loading.dismiss();
                                                let alert = this.alertCtrl.create({
                                                    title: 'Error',
                                                    subTitle: data.error,
                                                    buttons: ['OK'],
                                                });
                                                alert.present();
                                            }
                                            else {
                                                this.loading.dismiss();
                                                this.storage.remove('name');
                                                this.storage.remove('description');
                                                this.storage.remove('charge_pre_offert');
                                                this.storage.remove('cost_pre_offert');
                                                this.storage.remove('date');
                                                this.storage.remove('destination_address');
                                                this.storage.remove('destination_lat');
                                                this.storage.remove('destination_lng');
                                                this.storage.remove('destination_pre_offert');
                                                this.storage.remove('dimensions');
                                                this.storage.remove('fname_pre_offert');
                                                this.storage.remove('idUserOrder_pre_offert');
                                                this.storage.remove('id_order_pre_offert');
                                                this.storage.remove('maxDeliveryDate');
                                                this.storage.remove('maxDeliveryDate_pre_offert');
                                                this.storage.remove('mommentPickup');
                                                this.storage.remove('name_pre_offert');
                                                this.storage.remove('postal_code');
                                                this.storage.remove('real_cost');
                                                this.storage.remove('insurance_cost');
                                                this.storage.remove('size');
                                                this.storage.remove('weight');
                                                this.storage.remove('source_address');
                                                this.storage.remove('source_lat');
                                                this.storage.remove('source_lng');
                                                this.storage.remove('source_pre_offert');
                                                this.storage.remove('vehicle');
                                                this.storage.remove('description');
                                                this.storage.remove('name');
                                                this.storage.remove('hour');
                                                this.storage.remove('cost_stipulated');
                                                this.storage.remove('service_stipulated');
                                                this.cleanOrderCreated();
                                                let fname = localStorage.getItem('fname_logged');
                                                let lname = localStorage.getItem('lname_logged');
                                                let currentIndex = this.navCtrl.getActive().index;
                                                this.navCtrl.push(go_order_1.GoOrderPage, { id_order: id_order, source: source_address, destination: destination_address, cost: cost_stipulated,
                                                    charge: service_stipulated, name: namePackage, maxDeliveryDate: date, mommentPickup: hour, status: 'cargada', size: size,
                                                    weigth: weight, vehicle: vehicle, offerts: [], tracking: [], business_users: "", business_delivery: "", declined_offerts: "",
                                                    fname: fname, lname: lname, order_created: true, photo: photo }).then(() => {
                                                    this.navCtrl.remove(currentIndex);
                                                });
                                            }
                                        }, err => {
                                            this.loading.dismiss();
                                            let alert = this.alertCtrl.create({
                                                title: 'Error',
                                                subTitle: 'Algo ha ocurrido, intenta nuevamente.',
                                                buttons: ['OK'],
                                            });
                                            alert.present();
                                        });
                                    }
                                    else {
                                        this.loading.dismiss();
                                        if (this.isClient) {
                                            this.alertCtrl.create({
                                                title: 'Ya haz publicado tu Pedido!',
                                                subTitle: 'En breve vas a ser notificado cuando un Delivery lo tome.',
                                                buttons: ['OK'],
                                            }).present();
                                        }
                                        else {
                                            this.alertCtrl.create({
                                                title: 'Ya haz publicado la Orden!',
                                                subTitle: 'Ahora espera las ofertas y elije la más conveniente.',
                                                buttons: ['OK'],
                                            }).present();
                                        }
                                        localStorage.removeItem('order_published');
                                        this.navCtrl.push(orders_1.OrdersPage);
                                    }
                                }
                            }
                        }
                    ]
                }).present();
            }
            else {
                this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'El costo no es válido',
                    buttons: ['OK'],
                }).present();
            }
        });
    }
    //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Publicando Pedido...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    presentNewPrice() {
        var logged = false;
        let alert = this.alertCtrl.create({
            title: 'Indicar lo que está dispuesto a Pagar',
            subTitle: 'De todas formas, luego al negociar con el Delivery se determina el Precio conveniente para ambos. Puede que sea el mismo.',
            inputs: [
                {
                    name: 'new_cost',
                    placeholder: '',
                    label: 'Indique el monto',
                    type: 'number',
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.costStipulated = parseFloat(data.new_cost);
                        this.storage.set("cost_stipulated", this.costStipulated);
                        if (this.insuranceCost > 0) {
                            this.costStipulated = this.costStipulated + this.insuranceCost;
                        }
                        this.serviceStipulated = parseFloat(data.new_cost) * 0.035;
                        this.storage.set("service_stipulated", this.serviceStipulated);
                        this.realCost = parseFloat(data.new_cost) - this.serviceStipulated;
                        this.storage.set("real_cost", this.realCost);
                    }
                }
            ]
        });
        alert.present();
    }
    presentInsurance() {
        var logged = false;
        let alert = this.alertCtrl.create({
            title: 'Indica el Valor Asegurado de lo que envías',
            subTitle: 'El seguro es OPCIONAL, el maximo valor que te van a Asegurar es hasta $5000',
            inputs: [
                {
                    name: 'cost_product',
                    placeholder: '',
                    label: 'Indique el monto',
                    type: 'number',
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        if (data.cost_product > 5000) {
                            this.showErrorMoreThan5000();
                        }
                        else {
                            this.insuranceCost = data.cost_product * 0.05;
                            this.costStipulated += this.insuranceCost;
                            this.storage.set("insurance_cost", this.insuranceCost);
                            this.storage.set("cost_stipulated", this.costStipulated);
                            this.isInsuranced = true;
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    presentDeleteInsurance() {
        var logged = false;
        let alert = this.alertCtrl.create({
            title: 'Estás a punto de Quitar el Seguro. Deseas hacerlo?',
            subTitle: 'El seguro es OPCIONAL, el maximo valor que te van a Asegurar es hasta $5000',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.costStipulated -= this.insuranceCost;
                        this.storage.remove("insurance_cost");
                        this.storage.set("cost_stipulated", this.costStipulated);
                        this.isInsuranced = false;
                        this.insuranceCost = 0;
                    }
                }
            ]
        });
        alert.present();
    }
    showErrorMoreThan5000() {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: 'El VA que Aseguramos es Hasta $5000',
            buttons: ['OK'],
        }).present();
    }
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, vuelve a cargar la Orden',
            buttons: ['OK'],
        });
        alert.present();
    }
    cleanOrderCreated() {
        localStorage.removeItem('name');
        localStorage.removeItem('description');
        localStorage.removeItem('charge_pre_offert');
        localStorage.removeItem('cost_pre_offert');
        localStorage.removeItem('date');
        localStorage.removeItem('destination_address');
        localStorage.removeItem('destination_lat');
        localStorage.removeItem('destination_lng');
        localStorage.removeItem('destination_pre_offert');
        localStorage.removeItem('dimensions');
        localStorage.removeItem('fname_pre_offert');
        localStorage.removeItem('idUserOrder_pre_offert');
        localStorage.removeItem('id_order_pre_offert');
        localStorage.removeItem('maxDeliveryDate');
        localStorage.removeItem('maxDeliveryDate_pre_offert');
        localStorage.removeItem('mommentPickup');
        localStorage.removeItem('name_pre_offert');
        localStorage.removeItem('postal_code');
        localStorage.removeItem('real_cost');
        localStorage.removeItem('insurance_cost');
        localStorage.removeItem('size');
        localStorage.removeItem('weight');
        localStorage.removeItem('source_address');
        localStorage.removeItem('source_lat');
        localStorage.removeItem('source_lng');
        localStorage.removeItem('source_pre_offert');
        localStorage.removeItem('vehicle');
        localStorage.removeItem('description');
        localStorage.removeItem('name');
        localStorage.removeItem('hour');
        localStorage.removeItem('cost_stipulated');
        localStorage.removeItem('service_stipulated');
    }
};
PricePage = __decorate([
    core_1.Component({
        selector: 'page-price',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/price/price.html"*/'<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n	<ion-card class="background-card">\n		<ion-card-header> \n			<p class="title-card">{{titleCard}}</p>\n		</ion-card-header>\n		<ion-card-content>\n			<ion-list no-line>\n				<ion-card>\n				 	<ion-card-header>\n						<p class="title-inside-card"> {{titlePrice}} </p>\n						<ion-item class="item-price" *ngIf="isClient">\n							<ion-input\n								type="text" \n								name="costStipulated"\n								type="number"\n								(keyup)="costStipulatedOnChange()"\n								[(ngModel)]="costStipulated">\n							</ion-input>	 \n						</ion-item> \n						  <p class="subtitle-card" *ngIf="isClient"> {{finalCost | currency:\'ARS\'}}</p>\n						  <p class="subtitle-card" *ngIf="!isClient"> {{costStipulated | currency:\'ARS\'}}</p>\n					</ion-card-header>\n					<ion-card-content *ngIf="!isClient">\n					    <i class="title-inside-card">El Precio Estimado, contiene ademas el costo de cargos y servicios.</i>\n					</ion-card-content>\n					<div *ngIf="isClient">\n						<i class="title-inside-card">Cargos y Servicios.</i>\n						<p class="title-inside-card">{{ serviceStipulated | currency:\'ARS\' }}</p>\n					</div>\n				</ion-card>\n				<ion-card *ngIf="!isClient">\n					  <ion-card-header>\n							<p class="title-inside-card"> Costo por Seguro</p>\n							<p class="subtitle-card" *ngIf="insuranceCost > 0">{{insuranceCost | currency:\'ARS\'}}</p>\n							<p class="subtitle-red-card" *ngIf="!insuranceCost > 0">Envío No Asegurado</p>\n							<p class="title-inside-card"> Costo S/Cargos y Servicios</p>\n							<p class="subtitle-card">{{realCost | currency:\'ARS\'}}</p>\n							<p class="title-inside-card"> Cargos y Servicios</p>\n							<p class="subtitle-card">{{serviceStipulated | currency:\'ARS\'}}</p>\n					  </ion-card-header>\n					<button ion-button block color="ee" (click)="presentInsurance();" *ngIf="!isInsuranced && !isClient">ASEGURAR ENVIO</button>\n					<button ion-button block outline color="ee" (click)="presentDeleteInsurance();" *ngIf="isInsuranced && !isClient">QUITAR SEGURO</button>\n					<button ion-button block color="ee" (click)="presentNewPrice();" *ngIf="!isClient">CAMBIAR COSTO ENVIO</button>\n					<button ion-button block color="ee" *ngIf="!isClient" (click)="sendDataNewOrden();">PUBLICAR ENVIO</button>\n				</ion-card>\n			</ion-list>\n		</ion-card-content>	\n	</ion-card>\n</ion-content>\n<ion-footer>\n	<button ion-button block color="ee" *ngIf="isClient" (click)="sendDataNewOrden();">PUBLICAR ENVIO</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/price/price.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.Events,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        price_service_1.PriceService,
        ionic_angular_1.AlertController,
        ionic_angular_1.LoadingController,
        storage_1.Storage,
        ionic_angular_1.Platform,
        ngx_1.FCM])
], PricePage);
exports.PricePage = PricePage;
//# sourceMappingURL=price.js.map

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const login_1 = __webpack_require__(32);
const profile_service_1 = __webpack_require__(517);
let ProfilePage = class ProfilePage {
    constructor(navCtrl, navParams, loadingCtrl, profileService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.profileService = profileService;
        this.alertCtrl = alertCtrl;
        this.phone_checked = 0;
        this.title = 'DATOS DE USUARIO';
        if (navParams.get('fname_logged') !== "") {
            this.fname = navParams.get('fname');
            this.lname = navParams.get('lname');
            this.email = navParams.get('email');
            this.phone = navParams.get('phone');
        }
    }
    ionViewWillEnter() {
        this.phone_checked = parseInt(localStorage.getItem("phone_checked"));
        let user_id = localStorage.getItem("user_id");
        this.getOrdersCounters(user_id);
    }
    getOrdersCounters(user) {
        this.profileService.getCounters(user)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.orders_completed = data.orders_completed;
                this.orders_cancelled = data.orders_cancelled;
                this.orders = data.orders;
                this.orders_delivered = data.orders_delivered;
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    presentKillSession() {
        this.alertCtrl.create({
            title: 'Cerrar Sesión',
            message: '¿estás seguro que deseas cerrar sesión?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        this.killSession();
                    }
                }
            ]
        }).present();
    }
    ;
    killSession() {
        const lat = localStorage.getItem('lat');
        const lng = localStorage.getItem('lng');
        const current_city = localStorage.getItem('current_city_ok');
        localStorage.clear();
        localStorage.setItem('lat', lat);
        localStorage.setItem('lng', lng);
        localStorage.setItem('current_city_ok', current_city);
        this.navCtrl.setRoot(login_1.LoginPage);
    }
};
ProfilePage = __decorate([
    core_1.Component({
        selector: 'page-profile',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/profile/profile.html"*/'\n<ion-header>\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="background">\n  <!-- DATA PROFILE -->\n  <ion-card>\n    <ion-card-header>\n      Tus Datos Principales\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list no-line>\n        <ion-item>\n          <ion-avatar item-start>\n            <ion-icon name="person-outline"></ion-icon>\n          </ion-avatar>\n          {{ fname | uppercase }} {{lname | uppercase }}\n        </ion-item>\n        <ion-item>\n          <ion-avatar item-start>\n            <ion-icon name="mail-outline"></ion-icon>\n          </ion-avatar>\n          {{email}}\n        </ion-item>\n        <ion-item>\n          <ion-avatar item-start>\n            <ion-icon name="call-outline"></ion-icon>\n          </ion-avatar>\n          {{phone}}\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>   \n\n  <!-- DATA ORDERS -->\n  <ion-card>\n    <ion-card-header>\n      Acerca de EnvioEntregas\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list no-line>\n        <ion-item>\n          EnvioEntregas Completadas <ion-badge color="ee" item-end>{{orders_completed}}</ion-badge>\n        </ion-item>\n        <ion-item>\n          EnvioEntregas Canceladas <ion-badge color="ee" item-end>{{orders_cancelled}}</ion-badge>\n        </ion-item>\n        <ion-item>\n          Pedidos Solicitados <ion-badge color="ee" item-end>{{orders}}</ion-badge>\n        </ion-item>\n        <ion-item>\n          Pedidos Entregados <ion-badge color="ee" item-end>{{orders_delivered}}</ion-badge>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n    \n  <!-- KILL SESSION BUTTON--> \n  <p (click)="presentKillSession();" style="color:#26a69a"> CERRAR SESIÓN </p>\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/profile/profile.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.LoadingController,
        profile_service_1.ProfileService,
        ionic_angular_1.AlertController])
], ProfilePage);
exports.ProfilePage = ProfilePage;
//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const newCity_service_1 = __webpack_require__(521);
const delivery_scheduler_1 = __webpack_require__(64);
const Constants = __webpack_require__(14);
let NewCityPage = class NewCityPage {
    constructor(navCtrl, navParams, alertCtrl, loadingCtrl, newCityService, viewCtrl, toast, zone, plarform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.newCityService = newCityService;
        this.viewCtrl = viewCtrl;
        this.toast = toast;
        this.zone = zone;
        this.plarform = plarform;
        this.geocoder = new google.maps.Geocoder;
        this.places = [];
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    }
    ionViewWillEnter() {
        this.isClient = this.navParams.get('isClient') === true ? true : false;
        this.title = this.isClient ? 'Nueva Dirección' : 'Nueva Ciudad';
        this.placeholder = this.isClient ? 'Indica la direccion' : 'Indica la ciudad';
        const lat = localStorage.getItem("lat");
        const lng = localStorage.getItem("lng");
        this.userId = localStorage.getItem('user_id');
        this.initMap(lat, lng);
        this.placeExist = false;
    }
    initMap(latitude, longitude) {
        var point = { lat: +latitude, lng: +longitude };
        let divMap = document.getElementById('map-city');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 14,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
        const icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        const marker = new google.maps.Marker({
            position: point,
            map: this.map,
            icon: icon,
            zoom: 11
        });
        this.map.setCenter(point);
        this.toast.create({
            message: 'Indica tus sucursales',
            duration: 3000,
            position: 'middle'
        }).present();
    }
    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        var options = {
            input: this.autocomplete.input,
            types: this.isClient ? ['address'] : ['(cities)'],
            componentRestrictions: { country: 'ar' },
        };
        this.GoogleAutocomplete.getPlacePredictions(options, (predictions, status) => {
            if (predictions) {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    }
    selectSearchResult(item) {
        var icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        if (this.marker_city)
            this.marker_city.setMap(null);
        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                this.marker_city = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                    icon: icon
                });
                this.map.setCenter(results[0].geometry.location);
            }
        });
    }
    saveCity() {
        let user_id = localStorage.getItem('user_id');
        let arrAutocompleteInput = this.autocomplete.input.split(',');
        let city = arrAutocompleteInput[0].trim();
        if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
            this.presentLoading();
            this.newCityService.saveCity(user_id, this.autocomplete.input, city)
                .subscribe(data => {
                if (this.plarform.is('cordova')) {
                    data = JSON.parse(data.data);
                }
                this.loading.dismiss();
                if (data['delivery']) {
                    this.delivery = data['delivery'];
                    localStorage.setItem('isDelivery', 'true');
                    this.toast.create({
                        message: 'Ahora podrás ingresar y actualizar la Agenda en esa ciudad',
                        duration: 4000,
                        position: 'middle'
                    });
                    this.navCtrl.push(delivery_scheduler_1.DeliverySchedulerPage);
                }
                else if (data['error'] == 'DELIVERY_EXIST') {
                    this.showErrorNew('city');
                }
            }, err => this.showError(err));
        }
        else {
            this.alertCtrl.create({
                title: ':( Lo Sentimos!',
                subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
                buttons: ['OK'],
            }).present();
        }
    }
    saveAddress() {
        if (this.userId) {
            // if it is already a user
            let arrAutocompleteInput = this.autocomplete.input.split(',');
            let city = arrAutocompleteInput[1].trim();
            if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
                this.presentLoading();
                this.newCityService.saveAddress(this.userId, this.autocomplete.input)
                    .subscribe(data => {
                    if (this.plarform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    this.loading.dismiss();
                    if (data['success']) {
                        this.toast.create({
                            message: 'Sucursal agregada correctamente',
                            duration: 4000,
                            position: 'middle'
                        }).present();
                        this.viewCtrl.dismiss();
                    }
                    else if (data['error'] === 'already_exist') {
                        this.showErrorNew('address');
                    }
                }, err => this.showError(err));
            }
            else {
                this.alertCtrl.create({
                    title: ':( Lo Sentimos!',
                    subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
                    buttons: ['OK'],
                }).present();
            }
        }
        else {
            // if it is a new user
            let address = this.autocomplete.input;
            let arrSourceAddress = address.split(',');
            let city = arrSourceAddress[1].trim();
            if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
                this.placeExist = this.places.find((item) => item === address);
                if (this.placeExist) {
                    this.showErrorNew('address');
                }
                else {
                    this.places.push(address);
                    this.autocomplete.input = null;
                    if (this.places.length === 1 && !this.placeExist) {
                        this.toast.create({
                            message: 'Agrega todas las sucursales que desees, al terminar selecciona \'Finalizar\'',
                            duration: 4000,
                            position: 'middle'
                        }).present();
                    }
                }
            }
            else {
                this.alertCtrl.create({
                    title: ':( Lo Sentimos!',
                    subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
                    buttons: ['OK'],
                }).present();
            }
        }
    }
    deleteAddress(address) {
        for (let a = 0; a < this.places.length; a++) {
            if (this.places[a] === address) {
                this.places.splice(a, 1);
            }
        }
    }
    saveAndClose() {
        this.alertCtrl.create({
            title: 'Confirmar Sucursales',
            message: 'Si Finalizas y te arrepientes, tendras que volver a cargar nuevamente, finalizaste?',
            buttons: [
                {
                    text: 'No, no he finalizado',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Si, finalicé',
                    handler: () => {
                        this.viewCtrl.dismiss();
                        localStorage.setItem('places', JSON.stringify(this.places));
                    }
                }
            ]
        }).present();
    }
    closeModal() {
        this.viewCtrl.dismiss();
    }
    showErrorNew(type) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: type === 'address' ? 'La dirección que intentas agregar, ya la tienes agendada' : 'La ciudad que intentas agregar, ya la tienes agendada.',
            buttons: ['OK'],
        });
        alert.present();
    }
    showError(err) {
        this.loading ? this.loading.dismiss() : this.loading;
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error en la conexion, intente nuevamente mas tarde',
            buttons: ['OK'],
        });
        alert.present();
    }
    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando...'
        });
        this.loading.present();
    }
};
NewCityPage = __decorate([
    core_1.Component({
        selector: 'page-new-city',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/new-city/new-city.html"*/'<!--\n  Generated template for the SearchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="ee">\n      <ion-title>{{title}}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()">\n                <ion-icon item-right ios="ios-close-outline" md="md-close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content>\n      \n          <ion-toolbar color="dark">\n            <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="updateSearchResults()" placeholder="{{placeholder}}"></ion-searchbar>\n  \n            <ion-list [hidden]="autocompleteItems.length == 0">\n              <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n                {{ item.description }}\n              </ion-item>\n            </ion-list>\n             \n          </ion-toolbar>\n\n          <ion-list *ngIf="places.length > 0">\n            <ion-list-header color="dark">\n              Desliza a la izquierda para Eliminar\n            </ion-list-header>\n            <ion-item-sliding *ngFor="let place of places; let k = index" color="dark">\n                <ion-item color="dark">\n                    <h4><b>{{place}}</b></h4>\n                </ion-item>\n                <ion-item-options ion-end>\n                    <button ion-button color="danger" (click)="deleteAddress(place)">\n                        <ion-icon name="trash"></ion-icon>\n                    </button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </ion-list>\n   \n      <div id="map-city"></div>\n    </ion-content>\n\n  <ion-footer no-shadow class="footer-ee" id="button-search-orders-current-location">\n      <button ion-button full *ngIf="!isClient" class="button-ee" id="button-search-current-orders"  (click)=\'saveCity();\'>\n        Agregar\n      </button>\n      <button ion-button full *ngIf="isClient" class="button-ee" id="button-search-current-orders"  (click)=\'saveAddress();\'>\n        Guardar\n    </button>\n    <button ion-button full *ngIf="places.length > 0" color="ee" id="button-search-current-orders"  (click)=\'saveAndClose();\'>\n      Finalizar\n    </button>\n  </ion-footer>\n  '/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/new-city/new-city.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        ionic_angular_1.LoadingController,
        newCity_service_1.NewCityService,
        ionic_angular_1.ViewController,
        ionic_angular_1.ToastController,
        core_1.NgZone,
        ionic_angular_1.Platform])
], NewCityPage);
exports.NewCityPage = NewCityPage;
//# sourceMappingURL=new-city.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const notifications_service_1 = __webpack_require__(522);
const login_1 = __webpack_require__(32);
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let NotificationsPage = class NotificationsPage {
    constructor(navCtrl, navParams, alertCtrl, notificationService, plarform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.notificationService = notificationService;
        this.plarform = plarform;
        this.notifications = [];
    }
    ionViewWillEnter() {
        this.title = 'Notificaciones';
        let user_id = localStorage.getItem("user_id");
        this.getNotifications(user_id);
    }
    getNotifications(user) {
        this.notificationService.getNotifications(user)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.notifications = data['results'];
                for (let f = 0; f < this.notifications.length; f++) {
                    const status = (this.notifications[f].status === 1) ? true : false;
                    if (this.notifications[f].name == "new_messages") {
                        if (this.notifications[f].type == 'notification') {
                            this.messagesNotif = status;
                        }
                    }
                    else if (this.notifications[f].name == "offerts") {
                        if (this.notifications[f].type == 'notification') {
                            this.offertNotif = status;
                        }
                    }
                    else if (this.notifications[f].name == "new_deliveries") {
                        if (this.notifications[f].type == 'notification') {
                            this.deliveriesNotif = status;
                        }
                    }
                }
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    presentNotificationPrompt() {
        let confirm = this.alertCtrl.create({
            title: 'Confirmar Configuracion',
            message: 'Está seguro de guardar los cambios?',
            buttons: [
                {
                    text: 'No, cancelar.',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Guardar cambios',
                    handler: () => {
                        let user_id = localStorage.getItem("user_id");
                        this.notificationService.configNotifications(this.messagesNotif, this.messagesEmail, this.messagesSMS, this.offertNotif, this.offertEmail, this.offertSMS, this.deliveriesNotif, this.deliveriesEmail, this.deliveriesSMS, user_id)
                            .subscribe(data => {
                            if (this.plarform.is('cordova')) {
                                data = JSON.parse(data.data);
                            }
                            if (data.error) {
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                this.notifications = data['results'];
                                for (let n = 0; n < this.notifications.length; n++) {
                                    localStorage.setItem('new_messages_push', this.notifications[0].status);
                                    localStorage.setItem('new_offert_push', this.notifications[1].status);
                                    localStorage.setItem('new_delivery_push', this.notifications[2].status);
                                }
                                this.navCtrl.setRoot(login_1.LoginPage);
                            }
                        }, err => this.showErrorAlert());
                    }
                }
            ]
        });
        confirm.present();
    }
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Atención!',
            subTitle: 'Los datos concuerdan con un Usuario ya creado',
            buttons: ['OK'],
        });
        alert.present();
    }
};
NotificationsPage = __decorate([
    core_1.Component({
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/notifications/notifications.html"*/'<!--\n  Generated template for the NotificationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n	<ion-card class="background-card">\n		<ion-card-header class="background-card">\n			Configuración de Notificaciones\n		</ion-card-header>\n		\n		<ion-card-content>\n			<h2 class="color-header-body">\n				Configura todas los tipos notificaciones que vas\n				a recibir, una vez que haya EnvioEntregas disponibles. Recuerda \n				que puedes configurarlas cuando lo desees.\n			</h2> \n		</ion-card-content>\n	</ion-card>\n\n	<ion-list-header color="dark">\n		    <p><ion-icon name="notifications-outline"></ion-icon> &nbsp;Notificaciones Push </p>\n	</ion-list-header>\n	\n		<ion-list color="dark">\n\n		  <ion-item color="dark">\n		    <ion-label>Nuevos Mensajes</ion-label>\n			    <ion-toggle [(ngModel)]="messagesNotif"></ion-toggle>\n		  </ion-item>\n		  <ion-item color="dark">\n		    <ion-label>Oferta/Interacciones</ion-label>\n			    <ion-toggle  [(ngModel)]="offertNotif"></ion-toggle>\n		  </ion-item>\n		  <ion-item color="dark">\n		    <ion-label>Posibles Deliveries</ion-label>\n			    <ion-toggle  [(ngModel)]="deliveriesNotif"></ion-toggle>\n		  </ion-item>\n\n		</ion-list>\n\n		<ion-list-header color="dark">\n			<p><ion-icon name="notifications-outline"></ion-icon> &nbsp;Notificaciones por Email </p>\n\n			<ion-list color="dark">\n\n				<ion-item color="dark">\n					<ion-label>Nuevos Mensajes</ion-label>\n						<ion-toggle [(ngModel)]="messagesEmail"></ion-toggle>\n				</ion-item>\n				<ion-item color="dark">\n					<ion-label>Oferta/Interacciones</ion-label>\n						<ion-toggle  [(ngModel)]="offertEmail"></ion-toggle>\n				</ion-item>\n				<ion-item color="dark">\n					<ion-label>Posibles Deliveries</ion-label>\n						<ion-toggle  [(ngModel)]="deliveriesEmail"></ion-toggle>\n				</ion-item>\n	\n			</ion-list>\n		</ion-list-header>\n	\n</ion-content>\n		<ion-footer>\n			<button ion-button full (click)="presentNotificationPrompt();" color="ee">Guardar</button>\n		</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/notifications/notifications.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        notifications_service_1.NotificationService,
        ionic_angular_1.Platform])
], NotificationsPage);
exports.NotificationsPage = NotificationsPage;
//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
let UserCreatedPage = class UserCreatedPage {
    constructor(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.isClient = this.navParams.get('isClient');
    }
    ionViewWillEnter() {
    }
    closeModal() {
        this.viewCtrl.dismiss();
    }
};
UserCreatedPage = __decorate([
    core_1.Component({
        selector: 'page-user-created',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/user-created/user-created.html"*/'<ion-header>\n    <ion-navbar color="dark">\n         <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()">\n                <ion-icon item-right ios="ios-close-outline" md="md-close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n  \n  <ion-content class="background">\n    <img src="assets/imgs/icon.png" class="logo">\n    <br>\n    <h3 class="text-body" *ngIf="!isClient">\n        Ya perteneces a EnvioEntregas, <br>\n        Aprovechá, haz dinero extra. <br>\n        Carga tu Disponibiliad <br>\n        Y lleva Pedidos diarios que mas puedas!\n    </h3>\n    <h3 class="text-body" *ngIf="isClient">\n        Ya perteneces a EnvioEntregas, <br>\n        Publica Pedidos de tu Local. <br>\n        Y un Delivery lo llevara a Destino!\n    </h3>\n  </ion-content>\n '/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/user-created/user-created.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.ViewController,
        ionic_angular_1.NavParams])
], UserCreatedPage);
exports.UserCreatedPage = UserCreatedPage;
//# sourceMappingURL=user-created.js.map

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const destination_1 = __webpack_require__(525);
const storage_1 = __webpack_require__(58);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const places_service_1 = __webpack_require__(192);
const new_order_1 = __webpack_require__(42);
let SourcePage = class SourcePage {
    constructor(navCtrl, placesService, alertCtrl, zone, nav, storage, fcm) {
        this.navCtrl = navCtrl;
        this.placesService = placesService;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.nav = nav;
        this.storage = storage;
        this.fcm = fcm;
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
        this.isClient = false;
        this.isGoogleBarVisible = false;
        this.places = [];
    }
    ionViewWillEnter() {
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.title = this.isClient ? 'Lugar de Retiro: 2/5' : 'Lugar de Retiro 3/6';
        this.user_id = localStorage.getItem('user_id');
        if (!this.user_id) {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(new_order_1.NewOrderPage).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
        this.cleanStorage();
        if (this.isClient) {
            this.isGoogleBarVisible = false;
            this.getClientAddress();
        }
        else {
            this.places = [];
            this.isGoogleBarVisible = true;
            this.dialogCurrentAddress();
        }
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        this.lat = localStorage.getItem("lat");
        this.lng = localStorage.getItem("lng");
        this.initMap(this.lat, this.lng);
    }
    dialogCurrentAddress() {
        this.alertCtrl.create({
            title: '¿Lo van a retirar donde estás en éste momento?',
            message: 'Indica "Si", si quieres indicar que lo pasen a buscar en tu ubicación actual!',
            buttons: [
                {
                    text: 'No, otra dirección.',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Si!',
                    handler: () => {
                        let point = { lat: +this.lat, lng: +this.lng };
                        var icon = {
                            url: "assets/imgs/marker_moderno.png",
                            scaledSize: new google.maps.Size(35, 35),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 0) // anchor
                        };
                        let marker = new google.maps.Marker({
                            position: point,
                            map: this.map,
                            icon: icon
                        });
                        this.markers.push(marker);
                        this.map.setCenter(point);
                        let latlng = new google.maps.LatLng(+this.lat, +this.lng);
                        this.geocoder.geocode({
                            'latLng': latlng
                        }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    let address = results[0].formatted_address;
                                    this.storage.set('source_lat', this.lat);
                                    this.storage.set('source_lng', this.lng);
                                    this.storage.set('address', address);
                                }
                                else {
                                    alert('Quizas estás en un área de poca cobertura de GPS, intenta colocando la dirección manualmente');
                                }
                            }
                            else {
                                alert('Intenta nuevamente, recuerda tener GPS activado.');
                            }
                        });
                    }
                }
            ]
        }).present();
    }
    initMap(latitude, longitude) {
        var point = { lat: +latitude, lng: +longitude };
        let divMap = document.getElementById('map');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
    }
    getClientAddress() {
        this.placesService.getAddress(this.user_id)
            .subscribe(data => {
            if (data['error']) {
                this.showErrorAlert();
            }
            else {
                this.places = data['places'];
            }
        }, err => {
            this.loading.dismiss();
            this.showErrorAlert();
        });
    }
    showAddressOnMap(address) {
        this.geocoder.geocode({ 'address': address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                this.storage.set('source_lat', results[0].geometry.location.lat());
                this.storage.set('source_lng', results[0].geometry.location.lng());
            }
            const icon = {
                url: "assets/imgs/marker_moderno.png",
                scaledSize: new google.maps.Size(35, 35),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            };
            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: this.map,
                icon: icon
            });
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers.push(marker);
            this.map.setCenter(results[0].geometry.location);
        });
    }
    cleanStorage() {
        this.storage.remove('source_address');
        this.storage.remove('source_lat');
        this.storage.remove('source_lng');
    }
    showErrorAlert() {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
            buttons: ['OK'],
        }).present();
    }
    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        // set autocomplete options
        var options = {
            input: this.autocomplete.input,
            types: ['address'],
            componentRestrictions: { country: 'ar' },
        };
        this.GoogleAutocomplete.getPlacePredictions(options, (predictions, status) => {
            if (predictions) {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    }
    selectSearchResult(item) {
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                this.storage.set('source_address', item.description);
                var icon = {
                    url: "assets/imgs/marker_moderno.png",
                    scaledSize: new google.maps.Size(35, 35),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0) // anchor
                };
                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                    icon: icon
                });
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
                this.markers.push(marker);
                this.map.setCenter(results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                this.storage.set('source_lat', results[0].geometry.location.lat());
                this.storage.set('source_lng', results[0].geometry.location.lng());
            }
        });
    }
    sendDataStep3() {
        let source_address = null;
        let source_lat = null;
        let source_lng = null;
        this.storage.get('source_address').then((val) => {
            source_address = val;
        });
        this.storage.get('source_lat').then((val) => {
            source_lat = val;
        });
        this.storage.get('source_lng').then((val) => {
            source_lng = val;
            if (source_address !== null) {
                let arrSourceAddress = source_address.split(',');
                let city = arrSourceAddress[1].trim();
                if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
                    if (source_lat !== null && source_lng !== null) {
                        this.nav.push(destination_1.DestinationPage);
                    }
                    else {
                        this.alertCtrl.create({
                            title: 'Validacion',
                            subTitle: "Debes indicar por donde se retira",
                            buttons: ['OK'],
                        }).present();
                    }
                }
                else {
                    this.alertCtrl.create({
                        title: ':( Lo Sentimos!',
                        subTitle: this.isClient ? 'Debes indicar la Sucursal' : 'Debes indicar por donde se retira',
                        buttons: ['OK'],
                    }).present();
                }
            }
            else {
                this.alertCtrl.create({
                    title: 'Validacion',
                    subTitle: this.isClient ? 'Debes indicar la Sucursal' : 'Debes indicar por donde se retira',
                    buttons: ['OK'],
                }).present();
            }
        });
    }
    onChangePlace(address) {
        this.autocomplete.input = address;
        this.storage.set('source_address', address);
        this.showAddressOnMap(address);
    }
};
SourcePage = __decorate([
    core_1.Component({
        selector: 'page-source',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/source/source.html"*/'<!--\n  Generated template for the SourcePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-toolbar color="dark" *ngIf="isGoogleBarVisible">\n    <ion-searchbar [(ngModel)]="autocomplete.input"  (ionInput)="updateSearchResults()" placeholder="Donde lo deben retirar?"></ion-searchbar>\n      <ion-list [hidden]="autocompleteItems.length == 0">\n        <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n        {{ item.description }}\n        </ion-item>\n      </ion-list>\n  </ion-toolbar>\n  \n  <ion-list-header color="dark" *ngIf="isClient && places.length === 0">\n      <p class="list-header">Antes debes cargar tus Sucursales en tu Perfil</p>\n  </ion-list-header>\n\n  <ion-list *ngIf="places.length > 0" color="darr" radio-group name="vehicle" ngModel #vehicle = "ngModel">\n    <ion-list-header color="dark">\n        <p class="list-header">Selecciona la Sucursal (Toca la que desees)</p>\n    </ion-list-header>\n    \n    <ion-item class="item-group" color="dark" *ngFor="let place of places; let k = index">\n      <ion-label>{{place.address}}</ion-label>\n      <ion-radio  \n        name="{{place.id}}" \n        value="{{place.id}}"\n        color="ee"\n        ngModel \n        #vehicle="ngModel"\n        ngDefaultControl\n        (click)="onChangePlace(place.address)">\n      </ion-radio>\n    </ion-item>\n  </ion-list>\n\n  <div id="map">\n  	\n  </div>\n  \n</ion-content>\n  <ion-footer>\n  \n    <ion-fab>\n      <button ion-fab class="button-ee-fav" (click)=\'sendDataStep3();\'><ion-icon name="arrow-forward"></ion-icon></button>\n    </ion-fab>\n  \n  </ion-footer>\n  \n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/source/source.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        places_service_1.PlacesService,
        ionic_angular_1.AlertController,
        core_1.NgZone,
        ionic_angular_1.NavController,
        storage_1.Storage,
        ngx_1.FCM])
], SourcePage);
exports.SourcePage = SourcePage;
//# sourceMappingURL=source.js.map

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const from_1 = __webpack_require__(21);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(25);
let PlacesService = class PlacesService {
    constructor(http, platform, httpNative) {
        this.http = http;
        this.platform = platform;
        this.httpNative = httpNative;
    }
    deleteDayCalendarDelivery(userid, schedulerid, day) {
        let data = {
            userid: userid,
            schedulerid: schedulerid,
            day: day
        };
        let url = `${Constants.API.URL}users/scheduler/delete`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    deleteAddress(placeId, userId) {
        let data = {
            placeId: placeId,
            userId: userId
        };
        let url = `${Constants.API.URL}client/place/delete`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    getAddress(userid) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'client/places/' + userid, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
};
PlacesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ionic_angular_1.Platform,
        ngx_1.HTTP])
], PlacesService);
exports.PlacesService = PlacesService;
//# sourceMappingURL=places.service.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const order_service_1 = __webpack_require__(37);
const home_1 = __webpack_require__(85);
const token_service_1 = __webpack_require__(38);
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let PaymentPage = class PaymentPage {
    constructor(navCtrl, navParams, alertCtrl, orderService, tokenService, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.orderService = orderService;
        this.tokenService = tokenService;
        this.platform = platform;
        this.link_pay = '';
        this.title = 'Pagar Delivery';
        this.link_pay = this.navParams.get("link_pay");
        //Luego quitarlas - cuando se arrgle la BACK URL de MP con su confirmacion de PAGO
        this.packageName = this.navParams.get("packageName");
        this.cost = this.navParams.get("cost");
        this.idDelivery = this.navParams.get("idDelivery");
        this.idUser = this.navParams.get("idUser");
        this.idOrder = this.navParams.get("idOrder");
        this.idBusiness = this.navParams.get("idBusiness");
    }
    ionViewDidLoad() {
    }
    acceptOrder() {
        this.orderService.acceptOrder(this.packageName, this.cost, this.idDelivery, this.idUser, this.idOrder, this.idBusiness)
            .subscribe(data => {
            if (this.platform.is('cordova')) {
                data = JSON.parse(data.data);
            }
            if (data.accepted == 'false') {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Se ha producido un error, algo ha salido mal.',
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.navCtrl.push(home_1.HomePage);
            }
        }, err => console.log(err));
    }
};
PaymentPage = __decorate([
    core_1.Component({
        selector: 'page-payment',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/payment/payment.html"*/'<!--\n  Generated template for the PaymentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n	<p class="normal_text">ABONAR ANTES DE ACEPTAR PEDIDO</p>\n   		\n    \n    <ion-card>\n        <ion-card-header>\n          ATENCION\n        </ion-card-header>\n        <ion-card-content>\n         <p class="text-large">Ten en cuenta que el Delivery no va a recibir su pago, hasta que el mismo entregue el Pedido en Tiempo y Forma.\n         Si no es así, el Dinero se le reintegra inmediatamente. Las transacciones se realizan a través de Mercado Pago.</p>\n       \n          \n        </ion-card-content>\n      </ion-card>\n  	\n  	<hr>\n\n	 \n</ion-content>\n<ion-footer>\n  <a href="{{link_pay}}" ion-button block  color="ee">\n      PAGAR ENVÍO\n   </a> \n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/payment/payment.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        order_service_1.OrderServiceProvider,
        token_service_1.TokenService,
        ionic_angular_1.Platform])
], PaymentPage);
exports.PaymentPage = PaymentPage;
//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 205;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/info-user/info-user.module": [
		886,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 251;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const geolocation_service_1 = __webpack_require__(86);
const goOrder_service_1 = __webpack_require__(112);
const pre_order_1 = __webpack_require__(113);
const orders_1 = __webpack_require__(53);
const token_service_1 = __webpack_require__(38);
const order_service_1 = __webpack_require__(37);
const payment_1 = __webpack_require__(193);
const message_detail_1 = __webpack_require__(65);
const view_image_1 = __webpack_require__(87);
const ngx_1 = __webpack_require__(26);
let GoOrderPage = GoOrderPage_1 = class GoOrderPage {
    constructor(navCtrl, geolocator, navParams, alertCtrl, goOrderService, modalCtrl, toast, tokenService, loadingCtrl, orderService, platform, fcm) {
        this.navCtrl = navCtrl;
        this.geolocator = geolocator;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.goOrderService = goOrderService;
        this.modalCtrl = modalCtrl;
        this.toast = toast;
        this.tokenService = tokenService;
        this.loadingCtrl = loadingCtrl;
        this.orderService = orderService;
        this.platform = platform;
        this.fcm = fcm;
        this.geocoder = new google.maps.Geocoder;
        this.SEND_OFFERT = false;
        this.markers = [];
        this.title = 'Orden';
        this.size = '';
        this.weight = '';
        this.name = '';
        this.status = '';
        this.username = '';
        this.source = '';
        this.destination = '';
        this.cost = '';
        this.just_cost = '';
        this.charge = '';
        this.maxDeliveryDate = '';
        this.maxDeliveryHour = '';
        this.justDateDelivery = '';
        this.justHourDelivery = '';
        this.fname = '';
        this.search_order = false;
        this.THEN_ORDER_CREATED = false;
        this.NOT_MODAL = false;
        this.PROVIDED_FROM_LOGIN = false;
        this.FROM_DELIVERIES = false;
        this.FROM_ORDERS = false;
        this.ORDER_PUBLISHED = false;
        this.NOT_FROM_DELIVERIES = true;
        this.businesses_quantity = '';
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.offerts = this.navParams.get("offerts") ? this.navParams.get("offerts") : [];
        this.tracking = this.navParams.get("tracking") ? this.navParams.get("tracking") : [];
        this.business_users = this.navParams.get("business_users") ? this.navParams.get("business_users") : [];
        this.business_delivery = this.navParams.get("business_delivery") ? this.navParams.get("business_delivery") : [];
        this.declined_offerts = this.navParams.get("declined_offerts") ? this.navParams.get("declined_offerts") : [];
        if (this.offerts && this.offerts.length > 0) {
            this.title = 'OFERTAS';
        }
        else if (this.tracking && this.tracking.length > 0) {
            this.title = 'SEGUIMIENTO';
            if (this.business_users && this.business_users.length > 0) {
                this.user_fname = this.business_users[0].fname;
                this.user_lname = this.business_users[0].lname;
                this.user_photo = this.business_users[0].photo;
            }
            if (this.business_delivery && this.business_delivery.length) {
                this.delivery_fname = this.business_delivery[0].fname;
                this.delivery_lname = this.business_delivery[0].lname;
                this.delivery_photo = this.business_delivery[0].photo;
            }
        }
        if (this.navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
            this.search_order = true;
            this.THEN_ORDER_CREATED = true;
            this.name = localStorage.getItem("name_pre_offert");
            this.source = localStorage.getItem("source_pre_offert");
            this.destination = localStorage.getItem("destination_pre_offert");
            this.cost = localStorage.getItem("cost_pre_offert");
            this.charge = localStorage.getItem("charge_pre_offert");
            let cost = parseFloat(this.cost);
            let charge = parseFloat(this.charge);
            let just_cost = cost - charge;
            this.just_cost = just_cost.toFixed(2);
            this.title = 'Realiza el Delivery';
            this.maxDeliveryDate = localStorage.getItem("maxDeliveryDate_pre_offert");
            this.mommentPickup = localStorage.getItem('mommentPickup_pre_offert');
            this.description = localStorage.getItem('description_pre_offert');
            this.status = localStorage.getItem('status_pre_offert');
            this.fname = localStorage.getItem("fname_pre_offert").toUpperCase();
            this.lname = localStorage.getItem("lname_pre_offert").toUpperCase();
            this.id_order = localStorage.getItem('id_order_pre_offert');
        }
        else if (this.navParams.get("id_order") && !this.navParams.get('getOrder')) {
            this.offerts = this.navParams.get('offerts');
            this.tracking = this.navParams.get('tracking');
            this.statusbusiness = this.navParams.get('statusbusiness');
            this.search_order = true;
            localStorage.setItem("id_order_pre_offert", this.navParams.get('id_order'));
            this.id_order = this.navParams.get('id_order');
            localStorage.setItem("source_pre_offert", this.navParams.get('source'));
            localStorage.setItem("destination_pre_offert", this.navParams.get('destination'));
            localStorage.setItem("name_pre_offert", this.navParams.get('name'));
            localStorage.setItem("cost_pre_offert", this.navParams.get('cost'));
            localStorage.setItem("charge_pre_offert", this.navParams.get('charge'));
            localStorage.setItem("maxDeliveryDate_pre_offert", this.navParams.get('maxDeliveryDate'));
            localStorage.setItem("mommentPickup_pre_offert", this.navParams.get('mommentPickup'));
            localStorage.setItem("fname_pre_offert", this.navParams.get('fname'));
            localStorage.setItem("lname_pre_offert", this.navParams.get('lname'));
            localStorage.setItem("idUserOrder_pre_offert", this.navParams.get('id_user'));
            localStorage.setItem("status_pre_offert", this.navParams.get('status'));
            localStorage.setItem("size_pre_offert", this.navParams.get('size'));
            localStorage.setItem("weight_pre_offert", this.navParams.get('weight'));
            localStorage.setItem("vehicle_pre_offert", this.navParams.get('vehicle'));
            localStorage.setItem("description_pre_offert", this.navParams.get('description'));
            this.orderFromClient = this.navParams.get('isClient') === 1 ? true : false;
            this.name = this.navParams.get('name');
            this.source = this.navParams.get('source');
            this.destination = this.navParams.get('destination');
            this.cost = this.navParams.get('cost');
            this.charge = this.navParams.get('charge');
            this.maxDeliveryDate = this.navParams.get('maxDeliveryDate');
            this.mommentPickup = this.navParams.get('mommentPickup');
            this.fname = this.navParams.get('fname');
            this.lname = this.navParams.get('lname');
            this.id_user_order = this.navParams.get("id_user");
            let cost = parseFloat(this.cost);
            let charge = parseFloat(this.charge);
            let just_cost = cost - charge;
            this.just_cost = just_cost.toFixed(2);
            this.NOT_MODAL = true;
            this.status = this.navParams.get('status');
            this.status === 'cargada' ? this.title = 'PEDIDO CARGADO' : this.title = 'REALIZAR DELIVERY';
            this.username = this.navParams.get('username');
            this.size = this.navParams.get('size');
            this.weight = this.navParams.get('weight');
            this.vehicle = this.navParams.get('vehicle');
            this.toast.create({
                message: 'Desliza hacia arriba para ver mas detalles del Envío',
                duration: 2500,
                position: 'middle'
            }).present();
            this.order_created = this.navParams.get('order_created');
        }
        else if (this.navParams.get('source_address')) {
            this.THEN_ORDER_CREATED = true;
            this.source = this.navParams.get('source_address');
            this.destination = this.navParams.get('destination_address');
            this.cost = this.navParams.get('cost_stipulated');
            this.charge = this.navParams.get('service_stipulated');
            let cost = parseFloat(this.cost);
            let charge = parseFloat(this.charge);
            let just_cost = cost - charge;
            this.just_cost = just_cost.toFixed(2);
            this.title = 'Orden Publicada';
            this.name = this.navParams.get('name');
            this.status = this.navParams.get('status');
            this.from_list_orders = null;
            this.maxDeliveryDate = this.navParams.get("date");
            this.photoOrder = this.navParams.get('photo');
            this.maxDeliveryHour = 'En la ' + this.navParams.get('hour');
            this.ORDER_PUBLISHED = true;
            this.size = this.navParams.get('size');
            this.weight = this.navParams.get('weight');
            this.vehicle = this.navParams.get('vehicle');
            localStorage.setItem("order_published", 'true');
        }
        else if (this.navParams.get('from')) {
            if (this.navParams.get('from') == 'deliveries') {
                this.offerts = this.navParams.get('offerts');
                this.tracking = this.navParams.get('tracking');
                this.orderid = this.navParams.get('orderid');
                this.businessid = this.navParams.get('businessid');
                this.statusbusiness = this.navParams.get('statusbusiness');
                this.search_order = false;
                this.THEN_ORDER_CREATED = false;
                this.FROM_DELIVERIES = true;
                this.FROM_ORDERS = false;
                this.source = localStorage.getItem('source');
                this.destination = localStorage.getItem('destination');
                this.cost = localStorage.getItem('cost');
                this.charge = localStorage.getItem('charge');
                this.just_cost = localStorage.getItem('just_cost');
                this.maxDeliveryDate = localStorage.getItem('finishDate');
                this.maxDeliveryHour = "En la " + localStorage.getItem('maxDeliveryHour');
                this.name = localStorage.getItem('package_name');
                this.status = localStorage.getItem('status');
                this.fname = localStorage.getItem('fname').toUpperCase();
                this.size = localStorage.getItem('size');
                this.weight = localStorage.getItem('weight');
                this.vehicle = localStorage.getItem('vehicle');
                this.from_list_orders = localStorage.getItem('from_list_orders');
                this.NOT_FROM_DELIVERIES = false;
            }
            else if (this.navParams.get('from') == 'orders') {
                this.offerts = this.navParams.get('offerts');
                this.tracking = this.navParams.get('tracking');
                this.orderid = this.navParams.get('orderid');
                this.businessid = this.navParams.get('businessid');
                this.statusbusiness = this.navParams.get('statusbusiness');
                this.THEN_ORDER_CREATED = false;
                this.FROM_ORDERS = true;
                this.FROM_DELIVERIES = false;
                this.source = localStorage.getItem('source');
                this.destination = localStorage.getItem('destination');
                this.cost = localStorage.getItem('cost');
                this.charge = localStorage.getItem('charge');
                this.just_cost = localStorage.getItem('just_cost');
                this.maxDeliveryDate = localStorage.getItem('finishDate');
                this.size = localStorage.getItem('size');
                this.weight = localStorage.getItem('weight');
                this.vehicle = localStorage.getItem('vehicle');
                this.fname = localStorage.getItem('fname_delivery').toUpperCase();
                this.maxDeliveryHour = "En la " + localStorage.getItem('maxDeliveryHour');
                this.name = localStorage.getItem('package_name');
                this.status = localStorage.getItem('status');
                this.from_list_orders = localStorage.getItem('from_list_orders');
                this.NOT_FROM_DELIVERIES = false;
            }
        }
        else if (this.navParams.get('order_id') && this.navParams.get('getOrder') == true) {
            let orderId = this.navParams.get('order_id');
            this.getDataOrder(orderId);
        }
    }
    presentAcceptOrder(packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        let alert = this.alertCtrl.create({
            title: 'Aceptar Orden',
            subTitle: 'Te llegaran dos Códigos: Código de Envío al cual deberas dar al Delivery cuando pase a retirar el Pedido. Y Código de Entrega, se lo vas a indicar al Destinatario para que lo valide y complete el proceso al recibir el Pedido.',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('se arrepintio');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.orderService.acceptOrderPayment(packageName, cost, idDelivery, idUser, idOrder, idBusiness)
                            .subscribe(data => {
                            if (data.error) {
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                // this.tokenService.sendAcceptPush(idDelivery, idUser, startCode, finishCode).subscribe(console.log, console.log) 
                                this.navCtrl.push(payment_1.PaymentPage, { link_pay: data['link_pay'], packageName: packageName, cost: cost,
                                    idDelivery: idDelivery, idUser: idUser, idOrder: idOrder, idBusiness: idBusiness });
                            }
                        }, err => {
                            this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                                buttons: ['OK'],
                            }).present();
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    presentDeclineOffert(delivery_id, user_id, order_id, business_id) {
        let alert = this.alertCtrl.create({
            title: 'Rechazar Oferta',
            subTitle: 'Debes indicar el motivo, para que el Delivery sepa si hacer una contra Oferta o Descartar el Pedido.',
            inputs: [
                {
                    type: 'radio',
                    label: 'No puedo pagar ese Dinero.',
                    value: 'cost',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Vehículo no apto.',
                    value: 'vehicle',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Costo Alto y Vehículo no apto.',
                    value: 'cost_vehicle',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Ya acepté otra Oferta.',
                    value: 'nothing',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Cancelo mi Pedido.',
                    value: 'cancel',
                    name: 'reason'
                }
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: data => {
                    }
                },
                {
                    text: "Rechazar Oferta",
                    handler: data => {
                        this.presentLoadingDeclineOffert();
                        if (localStorage.getItem("logged") == 'true') {
                            var toast = this.toast.create({
                                message: 'Ha ocurrido un error, inténtalo nuevamente.',
                                duration: 3000,
                                position: 'middle'
                            });
                            let status = 'oferta rechazada';
                            var reason = data;
                            this.goOrderService.sendDeclineOffert(delivery_id, user_id, order_id, business_id, reason)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                this.loading.dismiss();
                                this.offert_business = data['offert_business'];
                                this.tokenService.sendDeclineOffertPush(delivery_id).subscribe(console.log, console.log);
                                this.navCtrl.push(orders_1.OrdersPage);
                            }, err => {
                                this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                                    buttons: ['OK'],
                                }).present();
                            });
                        }
                        else {
                            this.navCtrl.pop();
                            localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                            this.navCtrl.push(pre_order_1.PreOrderPage, { send_offert: true });
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    goMessages(business_id, action) {
        this.navCtrl.push(message_detail_1.MessageDetailPage, { business_id: business_id, action: action });
    }
    //===========LOADING CONTROLLER==============
    presentLoadingCodeStart() {
        this.loading = this.loadingCtrl.create({
            content: 'Validando Código de Envío...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    //===========LOADING CONTROLLER==============
    presentLoadingCodeFinish() {
        this.loading = this.loadingCtrl.create({
            content: 'Validando Código de Entrega...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    //===========LOADING CONTROLLER==============
    presentLoadingRating() {
        this.loading = this.loadingCtrl.create({
            content: 'Enviando Calificación...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    //===========LOADING CONTROLLER==============
    presentLoadingOffert() {
        this.loading = this.loadingCtrl.create({
            content: 'Enviando Oferta...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    //===========LOADING CONTROLLER==============
    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    //===========LOADING CONTROLLER==============
    presentLoadingDeclineOffert() {
        this.loading = this.loadingCtrl.create({
            content: 'Rechazando Oferta...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    ionViewWillEnter() {
        this.user_id = localStorage.getItem('user_id');
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            let currentIndex = this.navCtrl.getActive().index;
                            this.navCtrl.push(GoOrderPage_1, { order_id: params.orderId, getOrder: true }).then(() => {
                                this.navCtrl.remove(currentIndex);
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        if (localStorage.getItem('logged') !== 'true' && localStorage.getItem('current_tab') !== '0') {
            this.navCtrl.push(orders_1.OrdersPage);
        }
        //obtenemos ubicacion del usuario
        var latlng = this.geolocator.getCurrentLocation();
        this.lat = localStorage.getItem("lat");
        this.lng = localStorage.getItem("lng");
        if (!this.THEN_ORDER_CREATED && !this.NOT_MODAL && this.NOT_FROM_DELIVERIES) {
            let source = localStorage.getItem("source");
            let destination = localStorage.getItem("destination");
            let name = localStorage.getItem("name");
            let cost = localStorage.getItem("cost");
            let just_cost = localStorage.getItem("just_cost");
            let charge = localStorage.getItem("charge");
            this.name = name;
            this.source = source;
            this.destination = destination;
            this.cost = cost;
            this.just_cost = just_cost;
            this.charge = charge;
        }
        if (this.FROM_DELIVERIES) {
            //document.getElementById('go-back-go-order').style.display = 'none';
            if (this.status == 'confirmado') {
            }
            else if (this.status == 'en camino') {
            }
        }
        else if (this.FROM_ORDERS) {
            this.typeSHOW_MAP = 'from_orders';
        }
        else {
            this.typeSHOW_MAP = 'from_search';
        }
        if (!this.navParams.get('getOrder')) {
            this.initMap(this.lat, this.lng);
        }
    }
    initMap(latitude, longitude, secondaryMap = false) {
        let point = { lat: +latitude, lng: +longitude };
        document.getElementById('map-order').value = null;
        this.divMap = document.getElementById('map-order');
        new google.maps.Map(this.divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, latitude, longitude);
    }
    getDataOrder(orderId) {
        this.goOrderService.getOrderInfo(orderId)
            .subscribe((data) => {
            let orderInfo = data['results'];
            orderInfo = orderInfo[0];
            this.lat = localStorage.getItem("lat");
            this.lng = localStorage.getItem("lng");
            this.id_order = orderInfo.order_id;
            this.name = orderInfo.name;
            this.source = orderInfo.source;
            this.destination = orderInfo.destination;
            this.description = orderInfo.description;
            this.status = orderInfo.status_order;
            this.cost = orderInfo.cost;
            this.maxDeliveryDate = orderInfo.maxDeliveryDate;
            this.mommentPickup = orderInfo.mommentPickup;
            this.vehicle = orderInfo.vehicle;
            this.photoOrder = orderInfo.orderPhoto;
            this.fname = orderInfo.fname;
            this.lname = orderInfo.lname;
            this.search_order = true;
            this.order_created = null;
            this.showSecondaryMap = true;
            this.id_user_order = orderInfo.userOrderId;
            this.orderFromClient = orderInfo.is_client === 1 ? true : false;
            this.initMap(this.lat, this.lng, true);
        }, (err) => console.log(err));
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay, lat, lng, secondaryMap = false) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var position = new google.maps.LatLng(+lat, +lng);
        var mapOptions = {
            zoom: 15,
            center: position
        };
        this.map = new google.maps.Map(document.getElementById('map-order'), mapOptions);
        directionsDisplay.setMap(this.map);
        var start = this.source;
        var end = this.destination;
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });
        this.getAddressCurrentLocation(lat, lng);
    }
    getAddressCurrentLocation(lat, lng) {
        let geocoder = new google.maps.Geocoder();
        let location = new google.maps.LatLng(+lat, +lng);
        var current_city = "";
        this.geocoder.geocode({ 'latLng': location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var current_address = results[0].formatted_address;
                localStorage.setItem("current_address", current_address);
            }
        });
    }
    goBack() {
        this.navCtrl.pop();
    }
    presentOrderCodePrompt() {
        let alert = this.alertCtrl.create({
            title: 'Ingresa el Código de Envío',
            subTitle: 'El mismo te permitirá dar inicio al Proceso de EnvioEntregas',
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Código de 6 dígitos',
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancelo Ingresar Código');
                    }
                },
                {
                    text: 'Enviar',
                    handler: data => {
                        this.presentLoadingCodeStart();
                        let user_id = localStorage.getItem('user_id');
                        let order_id = localStorage.getItem('id_order');
                        this.goOrderService.verifyStartCodeOrder(data.code, user_id, order_id)
                            .subscribe(data => {
                            if (data.error) {
                                this.loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                this.loading.dismiss();
                                let order_info = data['order'];
                                this.businesses = data['businesses'];
                                let user_id = data.user_id;
                                this.tokenService.sendChangeStatusPush(user_id, 'EN PROCESO', order_info.order_id).subscribe(console.log, console.log);
                                this.navCtrl.push(orders_1.OrdersPage, { showTab: 'deliveries' });
                            }
                        }, err => {
                            this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                                buttons: ['OK'],
                            }).present();
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    presentFinalOrderCodePrompt() {
        let alert = this.alertCtrl.create({
            title: 'Ingresa el Código',
            subTitle: 'El mismo te permitirá dar como finalizada la EnvioEntrega',
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Código de 6 dígitos',
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancelo Ingresar Código');
                    }
                },
                {
                    text: 'Enviar',
                    handler: data => {
                        this.presentLoadingCodeFinish();
                        let user_id = localStorage.getItem('user_id');
                        let order_id = localStorage.getItem('id_order');
                        this.goOrderService.verifyFinalCodeOrder(data.code, user_id, order_id)
                            .subscribe(data => {
                            if (data.error) {
                                this.loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                this.loading.dismiss();
                                let order_info = data['order'];
                                this.businesses = data['businesses'];
                                let user_id = data.user_id;
                                this.tokenService.sendChangeStatusPush(user_id, 'COMPLETADO', order_info.order_id).subscribe(console.log, console.log);
                                this.navCtrl.push(orders_1.OrdersPage, { showTab: 'deliveries' });
                            }
                        }, err => console.log(err) //toast.present()
                        );
                    }
                }
            ]
        });
        alert.present();
    }
    presentDeliveryConfirm(re_offert = null) {
        var logged = false;
        let alert = this.alertCtrl.create({
            title: 'Oferta para realizar Delivery',
            subTitle: this.fname + ' te confirmará la Oferta que le hagas para comenzar el Delivery. \n (Puede cambiar la Fecha de delivery y Costo si lo desea)',
            inputs: [
                {
                    name: 'maxDeliveryDate',
                    placeholder: '',
                    label: 'Fecha de Delivery',
                    type: 'date',
                    value: this.maxDeliveryDate,
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
                    handler: data => {
                        console.log('Cancelo Oferta');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        if (data.maxDeliveryDate !== "" && data.cost !== "") {
                            this.presentPickAMommentConfirm(data.maxDeliveryDate, data.cost, re_offert);
                        }
                        else {
                            this.alertValidator();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    //for orders provides from Clients/Restaurantes
    presentDeliveryClientConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Llevar Pedido',
            subTitle: 'Estás aceptando todas las condiciones del Pedido. ' + this.fname + ' ' + this.lname + ' va a ser notificado.',
            buttons: [
                {
                    text: 'Me arrepentí',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.presentLoading();
                        // orderId, userId (creo la orden), deliveryId
                        this.goOrderService.acceptClientOrder(this.id_order, this.id_user_order, this.user_id)
                            .subscribe(data => {
                            if (this.platform.is('cordova')) {
                                data = JSON.parse(data.data);
                            }
                            this.loading.dismiss();
                            if (data['order'] && data['business']) {
                                this.order_info = data['order'];
                                this.businesses = data['business'];
                                let package_detail = data['package'];
                                let fname_delivery = localStorage.getItem('fname_logged');
                                let lname_delivery = localStorage.getItem('lname_logged');
                                //send order accepted notification to the User
                                this.tokenService.sendOrderAccepted(this.id_user_order, this.id_order, fname_delivery, lname_delivery, package_detail.name).subscribe(console.log, console.log);
                                this.navCtrl.setRoot(orders_1.OrdersPage, { showTab: 'deliveries' });
                            }
                            else {
                                this.errorDB();
                            }
                        }, err => {
                            this.loading.dismiss();
                            this.errorDB();
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    alertValidator() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Debes completar los datos obligatorios',
            buttons: ['OK'],
        });
        alert.present();
    }
    presentPickAMommentConfirm(maxDeliveryDate, cost, re_offert = null) {
        var logged = false;
        let prompt = this.alertCtrl.create({
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
                    handler: data => {
                    }
                },
                {
                    text: "Aceptar",
                    handler: data => {
                        let mommentPickup = data;
                        if (mommentPickup) {
                            this.presentPickAMommentFinalConfirm(maxDeliveryDate, mommentPickup, cost, re_offert);
                        }
                        else {
                            this.alertValidator();
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    presentPickAMommentFinalConfirm(maxDeliveryDate, mommentPickup, cost, re_offert = null) {
        var logged = false;
        let prompt = this.alertCtrl.create({
            title: 'Por último indica en que lo vas a llevar!',
            message: 'Selecciona el vehículo',
            inputs: [
                {
                    type: 'radio',
                    label: 'Caminando',
                    value: 'caminando',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Bicicleta',
                    value: 'bicicleta',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Auto',
                    value: 'auto',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Colectivo',
                    value: 'colectivo',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Furgon',
                    value: 'furgon',
                    name: 'vehicle'
                }
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: data => {
                    }
                },
                {
                    text: "Enviar Oferta",
                    handler: data => {
                        if (data) {
                            this.presentLoadingOffert();
                            if (localStorage.getItem("logged") == 'true') {
                                logged = true;
                                localStorage.setItem("vehicle", vehicle);
                            }
                            //por si regresa a la app, chequea LS
                            if (localStorage.getItem("logged") == 'true') {
                                logged = true;
                                var toast = this.toast.create({
                                    message: 'YA HAZ REALIZADO UNA OFERTA!',
                                    duration: 3000,
                                    position: 'middle'
                                });
                                let status = 'en negociacion';
                                let delivery_id = localStorage.getItem("user_id");
                                let order_id = localStorage.getItem("id_order_pre_offert");
                                if (!order_id) {
                                    order_id = localStorage.getItem('id_order');
                                }
                                let user_id_order = this.id_user_order;
                                if (!user_id_order) {
                                    user_id_order = localStorage.getItem("idUserOrder_pre_offert");
                                }
                                let message = '';
                                //enviar ofert a usuario (save businesses)
                                var vehicle = data;
                                this.goOrderService.sendOffert(maxDeliveryDate, mommentPickup, cost, delivery_id, user_id_order, order_id, status, vehicle, re_offert)
                                    .subscribe(data => {
                                    if (this.platform.is('cordova')) {
                                        data = JSON.parse(data.data);
                                    }
                                    this.loading.dismiss();
                                    if (data.error) {
                                        let alert = this.alertCtrl.create({
                                            title: 'Error',
                                            subTitle: data.error,
                                            buttons: ['OK'],
                                        });
                                        alert.present();
                                    }
                                    else {
                                        this.order_info = data['order'];
                                        this.businesses = data['businesses'];
                                        if (localStorage.getItem('new_offert_push').toString() === '1') {
                                            this.tokenService.sendOffertPush(user_id_order).subscribe(console.log, console.log);
                                        }
                                        this.navCtrl.setRoot(orders_1.OrdersPage, { showTab: 'deliveries' });
                                    }
                                }, err => {
                                    this.loading.dismiss();
                                    toast.present();
                                });
                            }
                            else {
                                this.loading.dismiss();
                                let currentIndex = this.navCtrl.getActive().index;
                                localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                                this.navCtrl.push(pre_order_1.PreOrderPage, { send_offert: true }).then(() => {
                                    this.navCtrl.remove(currentIndex);
                                });
                            }
                        }
                        else {
                            this.alertValidator();
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    //enviar calificacion
    presentRatingPrompt() {
        var logged = false;
        let prompt = this.alertCtrl.create({
            title: 'Califica Al Usuario',
            message: 'Es importante para que la comunidad sepa como se maneja',
            inputs: [
                {
                    type: 'radio',
                    label: 'Muy Malo',
                    value: '1',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Poco Confiable',
                    value: '2',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Normal',
                    value: '3',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Muy Bueno!',
                    value: '4',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Excelente!',
                    value: '5',
                    name: 'rating'
                }
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: data => {
                    }
                },
                {
                    text: "Enviar Calificación",
                    handler: data => {
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                        }
                        //por si regresa a la app, chequea LS
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                            var toast = this.toast.create({
                                message: 'Ha ocurrido un error, intentalo de nuevo',
                                duration: 3000,
                                position: 'middle'
                            });
                            let user_id = localStorage.getItem("idUserOrder_pre_offert"); //el Usuario de la ORDEN
                            let report_by = localStorage.getItem("user_id"); //el Usuario logeado (Delivery)
                            let order_id = localStorage.getItem("id_order"); //la orden en si
                            var rating = data;
                            var to = 'user';
                            this.presentLoadingRating();
                            this.goOrderService.sendRating(rating, user_id, report_by, order_id, to)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                if (data.empty) {
                                    this.loading.dismiss();
                                    let alert = this.alertCtrl.create({
                                        title: 'Error',
                                        subTitle: 'Ya has calificado al Usuario en ésta Orden',
                                        buttons: ['OK'],
                                    });
                                    alert.present();
                                }
                                else {
                                    this.loading.dismiss();
                                    let fname = localStorage.getItem('fname');
                                    let lname = localStorage.getItem('lname');
                                    this.tokenService.sendRatingPush(user_id, fname, lname, rating).subscribe(console.log, console.log);
                                    this.navCtrl.push(orders_1.OrdersPage, { showTab: 'deliveries' });
                                }
                            }, err => toast.present());
                        }
                        else {
                            this.navCtrl.pop();
                            localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                            //enviar push
                            this.navCtrl.push(pre_order_1.PreOrderPage, { send_offert: true });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    //enviar calificacion
    presentRatingDeliveryPrompt() {
        var logged = false;
        let prompt = this.alertCtrl.create({
            title: 'Califica Al Delivery',
            message: 'Es importante para que la comunidad sepa como trabaja',
            inputs: [
                {
                    type: 'radio',
                    label: 'Muy Malo',
                    value: '1',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Poco Confiable',
                    value: '2',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Normal',
                    value: '3',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Muy Bueno!',
                    value: '4',
                    name: 'rating'
                },
                {
                    type: 'radio',
                    label: 'Excelente!',
                    value: '5',
                    name: 'rating'
                }
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: data => {
                    }
                },
                {
                    text: "Enviar Calificación",
                    handler: data => {
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                        }
                        //por si regresa a la app, chequea LS
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                            var toast = this.toast.create({
                                message: 'Ha ocurrido un error, intentalo de nuevo',
                                duration: 3000,
                                position: 'middle'
                            });
                            let user_id = localStorage.getItem("idDeliveryOrder_pre_offert");
                            let report_by = localStorage.getItem("user_id");
                            let order_id = localStorage.getItem("id_order");
                            let message = '';
                            //enviar ofert a usuario (save businesses)
                            var rating = data;
                            var to = 'delivery';
                            this.presentLoadingRating();
                            this.goOrderService.sendRating(rating, user_id, report_by, order_id, to)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                if (data.empty) {
                                    this.loading.dismiss();
                                    let alert = this.alertCtrl.create({
                                        title: 'Error',
                                        subTitle: 'Ya has calificado al Delivery en ésta Orden',
                                        buttons: ['OK'],
                                    });
                                    alert.present();
                                }
                                else {
                                    this.loading.dismiss();
                                    let fname = localStorage.getItem('fname');
                                    let lname = localStorage.getItem('lname');
                                    this.tokenService.sendRatingPush(user_id, fname, lname, rating).subscribe(console.log, console.log);
                                    this.navCtrl.push(orders_1.OrdersPage);
                                }
                            }, err => toast.present());
                        }
                        else {
                            this.navCtrl.pop();
                            localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                            this.navCtrl.push(pre_order_1.PreOrderPage, { send_offert: true });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    //enviar ubicacion
    presentLocalization(delivery) {
        let alert = this.alertCtrl.create({
            title: 'Enviar ubicación actual',
            message: 'Indica al Usuario por donde vas',
            buttons: [
                {
                    text: 'Aún no he salido',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Enviar Ubicación!',
                    handler: () => {
                        let current_address = localStorage.getItem('current_address');
                        let delivery_id = localStorage.getItem("user_id"); //Quien Va a Cancelar el Pedido
                        let order_id = localStorage.getItem('id_order'); //De que orden Trata
                        let user_id = localStorage.getItem('idUserOrder_pre_offert'); //De que orden Trata
                        this.goOrderService.sendCurrentLocation(delivery_id, order_id, current_address, user_id)
                            .subscribe(data => {
                            if (data.error) {
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                this.tokenService.sendLocationPush(user_id, current_address).subscribe(console.log, console.log);
                                let alert = this.alertCtrl.create({
                                    title: 'GENIAL!',
                                    subTitle: 'Acabas de Notificar tu Ubicación actual.',
                                    buttons: ['OK'],
                                });
                                alert.present();
                                this.navCtrl.push(orders_1.OrdersPage);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    //cancelar pedido
    presentCancelMessagePrompt(dateDelivery) {
        let alert = this.alertCtrl.create({
            title: 'Cancelar Pedido',
            message: 'Realmente deseas cancelar?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'No, me arrepentí',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si, quiero cancelar',
                    handler: () => {
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1;
                        var yyyy = today.getFullYear();
                        var ddS;
                        var mmS;
                        if (dd < 10) {
                            ddS = '0' + dd;
                        }
                        else {
                            ddS = dd;
                        }
                        if (mm < 10) {
                            mmS = '0' + mm;
                        }
                        else {
                            mmS = mm;
                        }
                        var todayS = yyyy + '-' + mmS + '-' + ddS;
                        if (todayS > dateDelivery) {
                            let alert = this.alertCtrl.create({
                                title: 'NO PUEDE CANCELAR ÉSTA ORDEN',
                                subTitle: 'Los terminos y condiciones de EnvioEntergas indican que el mismo día de la fecha de retiro del pedido, o días posteriores a ello. No puede cancelar el Pedido.',
                                buttons: ['OK'],
                            });
                            alert.present();
                        }
                        else {
                            this.presentReasonCancel();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    //Se elije la razon de porque se cancela
    presentReasonCancel() {
        var logged = false;
        let prompt = this.alertCtrl.create({
            title: 'Razon de Cancelación',
            message: 'Selecciona en porque motivo cancelas',
            inputs: [
                {
                    type: 'radio',
                    label: 'No va a haber nadie en la dirección de Retiro y/o Entrega',
                    value: 'No va a haber nadie en la dirección de Retiro y/o Entrega',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Me arrepentí de enviar el Pedido',
                    value: 'Me arrepentí de enviar el Pedido',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Lo voy a solicitar nuevamente mas adelante',
                    value: 'Lo voy a solicitar nuevamente mas adelante',
                    name: 'reason'
                },
                {
                    type: 'radio',
                    label: 'Motivos personales',
                    value: 'Motivos personales',
                    name: 'reason'
                }
            ],
            buttons: [
                {
                    text: "Volver",
                    handler: data => {
                    }
                },
                {
                    text: "Cancelar Pedido",
                    handler: data => {
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                            var toast = this.toast.create({
                                message: 'Ha ocurrido un error, intenta nuevamente',
                                duration: 3000,
                                position: 'middle'
                            });
                            let user_id = localStorage.getItem("user_id"); //Quien Va a Cancelar el Pedido
                            let order_id = localStorage.getItem('id_order'); //De que orden Trata
                            let user_id_order = this.id_user_order;
                            if (!user_id_order) {
                                user_id_order = localStorage.getItem("idUserOrder_pre_offert");
                            }
                            this.orderService.cancelOrder(user_id, order_id)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                if (data.error) {
                                    let alert = this.alertCtrl.create({
                                        title: 'Error',
                                        subTitle: data.error,
                                        buttons: ['OK'],
                                    });
                                    alert.present();
                                }
                                else {
                                    this.deliveriesToNotifyCancel = data['deliveries'];
                                    for (let d = 0; d < this.deliveriesToNotifyCancel.length; d++) {
                                        this.tokenService.sendCancelPush(this.deliveriesToNotifyCancel[d]).subscribe(console.log, console.log);
                                    }
                                    this.navCtrl.setRoot(orders_1.OrdersPage);
                                }
                            }, err => toast.present());
                        }
                        else {
                            this.navCtrl.pop();
                            localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
                            this.navCtrl.push(pre_order_1.PreOrderPage, { send_offert: true });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    showmore(orderid) {
        document.getElementById('first-' + orderid).style.display = "none";
        document.getElementById('second-' + orderid).style.display = "block";
    }
    showless(orderid) {
        document.getElementById('first-' + orderid).style.display = "block";
        document.getElementById('second-' + orderid).style.display = "none";
    }
    errorDB() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'ha ocurrido un error de conexión y datos.',
            buttons: ['OK'],
        });
        alert.present();
    }
    viewPhoto(photoName) {
        let imageModal = this.modalCtrl.create(view_image_1.ViewImagePage, { img: photoName });
        imageModal.present();
    }
    close() {
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(orders_1.OrdersPage).then(() => {
            this.navCtrl.remove(currentIndex);
        });
    }
};
GoOrderPage = GoOrderPage_1 = __decorate([
    core_1.Component({
        selector: 'page-go-order',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/go-order/go-order.html"*/'<ion-header>\n\n  <ion-navbar color="ee" hideBackButton>\n    <ion-buttons left>\n      <button class="cross-btn" (click)="close()">\n        <h2 class="cross-header">X</h2>\n      </button>\n    </ion-buttons>\n  	<ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n\n  	<div id="map-order">\n    </div>\n   \n    <ion-list-header class="background-item" text-wrap *ngIf="offerts.length > 0">\n      DESLIZA A LA IZQUIERDA PARA RESPONDER.\n    </ion-list-header>\n\n    <ion-list  class="background-item" >\n      <ion-item-sliding #slidingItem *ngFor="let offert of offerts" >\n        <ion-item text-wrap class="background-item">\n          <ion-avatar item-start *ngIf="offert.photo">\n            <img src="https://envioentregas.com/storage/app/public/users/{{offert.photo}}">\n          </ion-avatar>\n          <ion-avatar item-start *ngIf="!offert.photo"> \n            <img src="assets/imgs/user_default.png">\n          </ion-avatar>\n        \n          <h2 class="name-text">{{offert.fname | uppercase}} {{offert.lname | uppercase}}</h2>\n          <div>\n             <ion-icon *ngIf="offert.avg_point >= 1" color="ee" name="star"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point > 0 && offert.avg_point < 1" color="ee" name="star-half"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point < 1"  color="ee" name="star-outline"></ion-icon>\n\n             <ion-icon *ngIf="offert.avg_point >= 2" color="ee" name="star"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point > 1 && offert.avg_point < 2" color="ee" name="star-half"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point <= 1" color="ee" name="star-outline"></ion-icon>\n\n             <ion-icon *ngIf="offert.avg_point >= 3" color="ee" name="star"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point > 2 && offert.avg_point < 3" color="ee" name="star-half"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point <= 2" color="ee" name="star-outline"></ion-icon>\n\n             <ion-icon *ngIf="offert.avg_point >= 4" color="ee" name="star"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point > 3 && offert.avg_point < 4" color="ee" name="star-half"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point <= 3" color="ee" name="star-outline"></ion-icon>\n\n             <ion-icon *ngIf="offert.avg_point == 5" color="ee" name="star"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point > 4 && offert.avg_point < 5" color="ee" name="star-half"></ion-icon>\n             <ion-icon *ngIf="offert.avg_point <= 4" color="ee" name="star-outline"></ion-icon>\n\n           </div>\n          \n          <p class="subtitle-card"><b>{{offert.date_proposal.split(\'-\')[2]}}-{{offert.date_proposal.split(\'-\')[1]}}</b>\n          <p class="subtitle-card"><b>Por la {{offert.momment_proposal}}</b></p>\n          <p class="subtitle-card"><b>{{offert.vehicle | uppercase}}</b></p>\n          <button ion-button clear item-end color="light">COBRA $ {{offert.cost_proposal | currency:\'ARS\'}} </button>\n\n        </ion-item>\n\n          <ion-item-options side="right" >\n              \n              <button ion-button color="ee" (click)="presentAcceptOrder(offert.name, offert.cost_proposal, offert.report_by, offert.user_id, offert.order_id, offert.id)">\n                Aceptar\n              </button>\n              <button ion-button color="danger" (click)="presentDeclineOffert(offert.report_by, offert.user_id, offert.order_id, offert.id)">\n                Rechazar\n              </button>\n              <button ion-button color="green"(click)="goMessages(offert.business_id, \'order\')">\n                Mensajes\n              </button>\n          \n          </ion-item-options>\n\n      </ion-item-sliding>\n      \n    </ion-list>\n    \n    <p  *ngIf="business_delivery.length > 0" class="title-item"> DELIVERY </p>\n    <ion-list class="background-item" no-line *ngIf="business_delivery.length > 0">\n      <ion-item class="background-item">\n          <ion-avatar item-start>\n            <img src="https://envioentregas.com/storage/app/public/users/{{delivery_photo}}" *ngIf="delivery_photo">\n            <img src="assets/imgs/user_default.png" *ngIf="!delivery_photo">\n          </ion-avatar>\n          <label class="username-text" item-end>{{delivery_fname | uppercase}} {{delivery_lname | uppercase}}</label>\n      </ion-item>\n    </ion-list>\n\n\n    <ion-list class="background-item" *ngIf="tracking.length > 0">\n        <ion-item class="background-item" text-wrap *ngFor="let register of tracking">\n          <p class="subtitle-card" text-left><i> {{register.created_at}}</i></p>\n          <button ion-button color="yellow" clear *ngIf="register.status !== \'oferta rechazada\'" item-end><b>{{register.status | uppercase}}</b></button>\n          <button ion-button color="yellow" (click)="presentDeliveryConfirm(\'1\');" *ngIf="register.status == \'oferta rechazada\' && register.re_offert == \'0\' && FROM_DELIVERIES" light item-end><b>{{register.status | uppercase}}</b></button>\n          <button ion-button color="yellow" (click)="presentDeliveryConfirm(\'1\');" *ngIf="register.status == \'oferta rechazada\' && register.re_offert == \'1\' && FROM_DELIVERIES" light item-end><b>{{register.status | uppercase}}</b></button>\n          <button ion-button color="yellow" disabled *ngIf="register.status == \'oferta rechazada\' && register.re_offert == \'0\' && !FROM_DELIVERIES" light item-end><b>{{register.status | uppercase}}</b></button>\n          <button ion-button color="yellow" disabled *ngIf="register.status == \'oferta rechazada\' && register.re_offert == \'1\' && !FROM_DELIVERIES" light item-end><b>{{register.status | uppercase}}</b></button>\n        </ion-item>\n    </ion-list>\n    <!-- NEW ORDER CARD-->\n    <ion-card *ngIf="id_order" class="background-card">\n      <ion-card-content>\n        <!--ORDER NAME-->\n        <p class="title-card">\n            {{name | uppercase}}\n        </p>\n        <!--DETAILS  -->\n          <p class="detail-text" *ngIf="description">\n            <i>Detalle: {{description}}</i>\n          </p>\n          <p class="subtitle-delivery-card" color="ee">\n            Por {{fname | uppercase}} {{lname | uppercase}}\n          </p>\n        <!--STATUS-->\n        <div class="status-container">\n          <ion-icon name="options"></ion-icon> <label class="status-text">{{status | uppercase}}</label>\n        </div>\n        <!--FROM TO-->\n        <div class="row">\n          <div class="col source-text">\n            {{source.split(\',\')[0] | uppercase}}\n          </div>\n          <div class="col">\n              <ion-icon class="icon-address" name="arrow-round-forward"></ion-icon>\n          </div>\n          <div class="col destination-text">\n            {{destination.split(\',\')[0] | uppercase}}\n          </div>\n        </div>\n        <!-- DAY-->\n        <ion-item class="background-card">\n          <p class="subtitle-card">\n            DIA\n          </p>  \n          <ion-badge color="light" item-end> {{maxDeliveryDate | date}}</ion-badge>\n        </ion-item>\n        <!--HOUR-->\n        <ion-item class="background-card">\n          <p class="subtitle-card">\n            HORA\n          </p>  \n            <ion-badge color="light" item-end> POR LA {{mommentPickup | uppercase}}</ion-badge>\n        </ion-item>\n        <!--TRANSPORT-->\n        <ion-item class="background-card">\n          <p class="subtitle-card">\n            TRANSPORTE\n          </p>  \n          <ion-badge color="light" item-end> {{vehicle | uppercase}} </ion-badge>\n        </ion-item>\n        <!--COST-->\n        <ion-item class="background-card">\n            <ion-badge color="ee" item-end> {{cost | currency:\'ARS\'}}</ion-badge>\n        </ion-item>\n      </ion-card-content>\n    </ion-card>\n\n</ion-content>\n\n  <ion-footer no-shadow>\n    <button ion-button full (click)=\'presentDeliveryConfirm();\' *ngIf="(status == \'cargada\' || status == \'en negociacion\') && (from_list_orders !== \'orders\' && from_list_orders !== \'deliveries\' && search_order == true) && !order_created && !orderFromClient" color="green" id="btn-make-offert">\n        REALIZAR UNA OFERTA\n    </button>\n    <button ion-button full (click)=\'presentDeliveryClientConfirm();\' *ngIf="(status == \'cargada\' || status == \'en negociacion\') && (from_list_orders !== \'orders\' && from_list_orders !== \'deliveries\' && search_order == true) && !order_created && orderFromClient" color="green" id="btn-make-offert">\n      LLEVAR PEDIDO\n    </button>\n    \n    <button ion-button full (click)=\'presentLocalization(username);\' *ngIf="(statusbusiness == \'en proceso\' || statusbusiness == \'en camino\') && from_list_orders == \'deliveries\';" color="dark">ENVIAR UBICACION ACTUAL</button>\n    <button ion-button full *ngIf="(statusbusiness == \'aceptada\' && from_list_orders == \'deliveries\'); else actionsBlock" #actionsBlock (click)="presentOrderCodePrompt();"   class="footer-ee">INGRESAR CODIGO</button>\n    <button ion-button full *ngIf="(statusbusiness == \'en proceso\' && from_list_orders == \'deliveries\'); else actionsBlock" #actionsBlock (click)="presentFinalOrderCodePrompt();"   class="footer-ee">FINALIZAR ENVIO</button>\n       \n    <button ion-button full (click)="presentRatingPrompt();"  *ngIf="statusbusiness == \'completada\' && FROM_DELIVERIES == true" class="footer-ee">CALIFICAR A {{fname}}</button>\n    <button ion-button full (click)="presentRatingDeliveryPrompt();"  *ngIf="statusbusiness == \'completada\' && FROM_ORDERS == true" class="footer-ee">CALIFICAR A {{fname}}</button>\n\n\n    <button ion-button full (click)="presentCancelMessagePrompt(maxDeliveryDate);"  *ngIf="(statusbusiness == \'cargada\' || statusbusiness == \'aceptada\' || statusbusiness == \'en negociacion\')  && (from_list_orders == \'orders\');" color="danger">CANCELAR PEDIDO</button>\n\n  </ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/go-order/go-order.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        geolocation_service_1.GeolocationService,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        goOrder_service_1.GoOrderService,
        ionic_angular_1.ModalController,
        ionic_angular_1.ToastController,
        token_service_1.TokenService,
        ionic_angular_1.LoadingController,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.Platform,
        ngx_1.FCM])
], GoOrderPage);
exports.GoOrderPage = GoOrderPage;
var GoOrderPage_1;
//# sourceMappingURL=go-order.js.map

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const price_1 = __webpack_require__(186);
const pre_profile_1 = __webpack_require__(63);
const verify_code_1 = __webpack_require__(115);
const go_order_1 = __webpack_require__(28);
const orders_1 = __webpack_require__(53);
const messages_1 = __webpack_require__(117);
const signin_1 = __webpack_require__(62);
const ngx_1 = __webpack_require__(88);
const login_service_1 = __webpack_require__(529);
const order_service_1 = __webpack_require__(37);
const profile_1 = __webpack_require__(187);
const delivery_scheduler_1 = __webpack_require__(64);
const ngx_2 = __webpack_require__(116);
const home_1 = __webpack_require__(85);
const token_service_1 = __webpack_require__(38);
const notifications_1 = __webpack_require__(189);
const places_1 = __webpack_require__(530);
const user_created_1 = __webpack_require__(190);
let LoginPage = LoginPage_1 = class LoginPage {
    constructor(events, navCtrl, navParams, alertCtrl, facebook, loginService, orderService, loadingCtrl, camera, actionSheetCtrl, tokenService, toastCtrl, platform, modalCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.facebook = facebook;
        this.loginService = loginService;
        this.orderService = orderService;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.tokenService = tokenService;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.logged = false;
        this.array_user = [];
        this.notifications = [];
        this.login = LoginPage_1;
        this.loginThenOrder = false;
        this.loginPreOffert = false;
        this.loginHomePreOffert = false;
        this.loginHomePreAcceptOrder = false;
        this.loginPreListOrders = false;
        this.loginPreListMessages = false;
        this.hasChangeProfilePhoto = false;
        this.userData = null;
        this.isClient = false;
        this.loginThenOrder = this.navParams.get('pre_order');
        this.loginPreOffert = this.navParams.get('send_offert');
        this.loginHomePreOffert = this.navParams.get('home_send_offert');
        this.loginHomePreAcceptOrder = this.navParams.get('home_send_offert');
        this.loginPreListOrders = this.navParams.get('list_orders');
        this.loginPreListMessages = this.navParams.get('list_messages');
        this.generalNotificationHome = this.navParams.get('sendGeneralNotification');
        this.SigninPage = signin_1.SigninPage;
        this.pushPage = notifications_1.NotificationsPage;
        this.externalAction = this.navParams.get('action');
    }
    ionViewWillEnter() {
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.user_id = localStorage.getItem('user_id');
        this.checkLogin();
        if (this.externalAction) {
            switch (this.externalAction) {
                case 'rating':
                    this.getRating();
                    break;
                case 'newuser':
                    this.modalCtrl.create(user_created_1.UserCreatedPage, { isClient: this.isClient }).present();
                    break;
                default:
                    break;
            }
        }
    }
    goPage(page) {
        switch (page) {
            case 'scheduler':
                this.navCtrl.push(delivery_scheduler_1.DeliverySchedulerPage);
                break;
            case 'places':
                this.navCtrl.push(places_1.PlacesPage);
                break;
            default:
                break;
        }
    }
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Ingresando a EnvioEntergas...'
        });
        this.loading.present();
    }
    loadingFb() {
        this.loading = this.loadingCtrl.create({
            content: 'Esperando respuesta de Facebook'
        });
        this.loading.present();
    }
    presentLoadingPhoto() {
        this.loading = this.loadingCtrl.create({
            content: 'Actualizando foto...'
        });
        this.loading.present();
    }
    checkLogin() {
        if (localStorage.getItem('logged') == 'true') {
            this.title = `${localStorage.getItem('fname_logged')} ${localStorage.getItem('lname_logged')}`.toLocaleUpperCase();
            this.rating = localStorage.getItem('rating');
            this.photo_fb = localStorage.getItem('photo_fb');
            this.photo = localStorage.getItem('photo');
            this.photo === 'null' ? this.photo = null : this.photo;
            this.logged = true;
        }
        else {
            this.loginService.observableLogged.subscribe(active => {
                this.logged = active;
            });
        }
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
    }
    loginWithFB() {
        this.facebook.login(['email', 'public_profile']).then((response) => {
            this.fbUserId = response.authResponse.userID;
            this.loadingFb();
            this.facebook.api('me?fields=name,email', ['email', 'public_profile']).then(profile => {
                this.loading.dismiss();
                let username = profile['name'].toString();
                let splitted = username.split(" ");
                let fname = splitted[0];
                let lname = splitted[1];
                this.userData = {
                    email: profile['email'],
                    first_name: fname,
                    last_name: lname,
                    picture: `https://graph.facebook.com/${this.fbUserId}/picture?type=large`,
                    username: profile['name']
                };
                this.presentLoadingDefault();
                this.orderService.checkOrSaveUserFb(this.userData.username, this.userData.email, this.userData.picture, this.userData.first_name, this.userData.last_name)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    this.loading.dismiss();
                    this.events.publish('user:logged', data, Date.now());
                    localStorage.setItem("logged", 'true');
                    localStorage.setItem("user_id", data['user'].id);
                    localStorage.setItem("email", data['user'].email);
                    localStorage.setItem("photo_fb", data['user'].photo);
                    localStorage.setItem("fname_logged", data['user'].fname);
                    localStorage.setItem("lname_logged", data['user'].lname);
                    localStorage.setItem("verified", data['user'].verified);
                    this.navCtrl.push(pre_profile_1.PreProfilePage);
                }, err => this.showErrorAlertFB(err));
            });
        });
    }
    sendDataLogin(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = parameters.value.email;
            let password = parameters.value.password;
            let email_validated = true;
            let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!regExp.test(email)) {
                email_validated = false;
            }
            else {
                email_validated = true;
            }
            if (email == "" || password == "") {
                this.alertCtrl.create({
                    title: 'Validacion',
                    subTitle: "Debe indicar email y contraseña",
                    buttons: ['OK'],
                }).present();
            }
            else if (!email_validated) {
                this.alertCtrl.create({
                    title: 'Validacion',
                    subTitle: "Debe indicar un email válido",
                    buttons: ['OK'],
                }).present();
            }
            else {
                this.presentLoadingDefault();
                this.loginService.login(email, password)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        this.dataResponse = JSON.parse(data.data);
                    }
                    else {
                        this.dataResponse = data;
                    }
                    this.loading.dismiss();
                    this.array_user = this.dataResponse['user'];
                    this.array_error = this.dataResponse['error'];
                    if (this.array_error == 'ERROR_LOGIN_VERIFIED') {
                        this.loginService.logged(false);
                        this.showErrorAlertNotVerified(this.array_user[0].fname, this.array_user[0].lname, this.array_user[0].email, this.array_user[0].phone);
                    }
                    else if (this.array_error == 'ERROR_LOGIN') {
                        this.loginService.logged(false);
                        this.showErrorAlert('ERROR_LOGIN');
                    }
                    else {
                        this.array_user = this.dataResponse['user'];
                        this.rating = this.dataResponse['rating'];
                        this.isDelivery = this.dataResponse['delivery'];
                        this.notifications = this.dataResponse['notifications'];
                        this.events.publish('user:logged', this.dataResponse, Date.now());
                        localStorage.setItem("logged", 'true');
                        localStorage.setItem("user_id", this.array_user[0].id);
                        localStorage.setItem("fname_logged", this.array_user[0].fname);
                        localStorage.setItem("lname_logged", this.array_user[0].lname);
                        localStorage.setItem("username", this.array_user[0].username);
                        localStorage.setItem("phone", this.array_user[0].phone);
                        localStorage.setItem("email", this.array_user[0].email);
                        localStorage.setItem("photo", this.array_user[0].photo);
                        localStorage.setItem("phone_checked", this.array_user[0].phone_checked);
                        localStorage.setItem("verified", this.array_user[0].verified);
                        localStorage.setItem("token_device", this.array_user[0].token_device);
                        localStorage.setItem("rating", this.rating);
                        localStorage.setItem('isClient', '' + this.array_user[0].is_client);
                        localStorage.setItem('isDelivery', '' + this.isDelivery);
                        for (let n = 0; n < this.notifications.length; n++) {
                            localStorage.setItem('new_messages_push', this.notifications[0].status);
                            localStorage.setItem('new_offert_push', this.notifications[1].status);
                            localStorage.setItem('new_delivery_push', this.notifications[2].status);
                        }
                        if (this.loginThenOrder) {
                            this.navCtrl.push(price_1.PricePage);
                        }
                        else if (this.loginPreOffert) {
                            this.navCtrl.push(go_order_1.GoOrderPage, { send_offert: this.loginPreOffert, offerts: [], tracking: [], business_delivery: [], business_users: [], declined_offerts: "" });
                        }
                        else if (this.loginHomePreOffert) {
                            this.navCtrl.push(home_1.HomePage, { list_orders: true });
                        }
                        else if (this.loginHomePreAcceptOrder) {
                            this.navCtrl.push(home_1.HomePage, { list_orders: true });
                        }
                        else if (this.loginPreListOrders) {
                            this.navCtrl.push(orders_1.OrdersPage, { from_login: true });
                        }
                        else if (this.loginPreListMessages) {
                            this.navCtrl.push(messages_1.MessagesPage, { from_login: true });
                        }
                        else if (this.generalNotificationHome) {
                            const user_id = this.array_user[0].id;
                            //const current_city = localStorage.getItem('current_city_ok');
                            const current_city = 'Córdoba';
                            if (this.generalNotificationHome) {
                                let messageLoading;
                                let messageToast;
                                if (this.generalNotificationHome == 'delivery') {
                                    messageLoading = 'Notificando Usuarios de tu zona...';
                                    messageToast = 'Has notificado a los Usuarios de tu ciudad que quieres llevar Envios!';
                                }
                                else {
                                    messageLoading = 'Notificando a Usuarios Delivery de tu zona...';
                                    messageToast = 'Has notificado a Delivery Usuarios de tu ciudad!';
                                }
                                const loadingNotifier = this.loadingCtrl.create({
                                    content: messageLoading
                                });
                                this.orderService.getUsersByCurrentLocation(user_id, current_city).subscribe((data) => {
                                    this.usersByCurrentLocation = data['users'];
                                    let usersArrayParsed = [];
                                    for (let u = 0; u < this.usersByCurrentLocation.length; u++) {
                                        let user = this.usersByCurrentLocation[u];
                                        usersArrayParsed.push(user.user_id);
                                    }
                                    let fname = localStorage.getItem('fname_logged');
                                    let lname = localStorage.getItem('lname_logged');
                                    this.tokenService.sendNotifierPush(usersArrayParsed, this.generalNotificationHome, fname, lname).subscribe(response => {
                                        loadingNotifier.present();
                                    }, err => {
                                        loadingNotifier.dismiss();
                                        this.alertCtrl.create({
                                            title: 'Error',
                                            subTitle: 'Ha ocurrido un error al notificar. Compruebe su conexión',
                                            buttons: ['OK'],
                                        }).present();
                                    }, () => {
                                        loadingNotifier.dismiss();
                                        this.toastCtrl.create({
                                            message: messageToast,
                                            duration: 3500
                                        }).present();
                                        let currentIndex = this.navCtrl.getActive().index;
                                        this.navCtrl.push(home_1.HomePage).then(() => {
                                            localStorage.removeItem('orders_loaded');
                                            this.navCtrl.remove(currentIndex);
                                        });
                                    });
                                });
                            }
                        }
                        else {
                            this.checkLogin();
                        }
                    }
                }, err => {
                    this.loading.dismiss();
                    this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                        buttons: ['OK'],
                    }).present();
                });
            }
        });
    }
    showErrorAlertNotVerified(fname, lname, email, phone) {
        let confirm = this.alertCtrl.create({
            title: 'Eres ' + fname + ' ? Los datos son correctos!',
            message: 'Debes validar tu cuenta, deseas recibir un código de validación para ello?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => { }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.loginService.generatePhoneCodeAtLogin(phone, email)
                            .subscribe(data => {
                            if (this.platform.is('cordova')) {
                                data = JSON.parse(data.data);
                            }
                            if (data.error) {
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                localStorage.setItem("user_id", data.id_user);
                                this.navCtrl.push(verify_code_1.VerifyCodePage, { signin: true });
                            }
                        }, err => this.showErrorAlert('ERROR_CODE_VERIFIED'));
                    }
                }
            ]
        });
        confirm.present();
    }
    showErrorAlert(type = null) {
        if (type == 'ERROR_LOGIN') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if ('ERROR_CODE_VERIFIED') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. intenta nuevamente generando uno nuevo como lo hizo recién.',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. intenta nuevamente generando uno nuevo como lo hizo recién.',
                buttons: ['OK'],
            });
            alert.present();
        }
    }
    showErrorAlertFB(type) {
        this.loading ? this.loading.dismiss() : this.loading;
        if (type == 'ERROR_LOGIN') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error SERVICIO',
                subTitle: JSON.stringify(type),
                buttons: ['OK'],
            });
            alert.present();
        }
    }
    toProfilePage() {
        let fname = localStorage.getItem('fname_logged');
        let lname = localStorage.getItem('lname_logged');
        let email = localStorage.getItem('email');
        let phone = localStorage.getItem('phone');
        this.navCtrl.push(profile_1.ProfilePage, { fname: fname, lname: lname, email: email, phone: phone });
    }
    takePhoto() {
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.hasChangeProfilePhoto = true;
        }, (err) => {
            // Handle error
            this.hasChangeProfilePhoto = false;
        });
    }
    getPhoto() {
        var options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetwidth: 1000,
            targetHeight: 1000,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.hasChangeProfilePhoto = true;
        }, (err) => {
            this.hasChangeProfilePhoto = false;
        });
    }
    presentChangeProfilePhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Quieres cambiar la Foto de Perfil?',
            buttons: [
                {
                    text: 'Tomar una Foto',
                    handler: () => {
                        this.takePhoto();
                    }
                },
                {
                    text: 'Elegir una Foto',
                    handler: () => {
                        this.getPhoto();
                    }
                },
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: () => {
                        console.log("cancelo change profile photo");
                    }
                }
            ]
        });
        actionSheet.present();
    }
    saveChangeProfilePhoto() {
        if (this.base64Image == "" || this.base64Image == null) {
            let alert = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "No ha subido ninguna nueva Foto",
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let user_id = localStorage.getItem("user_id");
            this.presentLoadingPhoto();
            this.loginService.saveChangeProfilePhoto(this.base64Image, user_id)
                .subscribe(data => {
                if (this.platform.is('cordova')) {
                    data = JSON.parse(data.data);
                }
                if (data.photo !== '') {
                    this.loading.dismiss();
                    this.photo = data.photo;
                    localStorage.setItem("photo", data.photo);
                    this.hasChangeProfilePhoto = false;
                }
                else {
                    this.loading.dismiss();
                    this.showErrorAlert();
                }
            }, err => {
                this.loading.dismiss();
                this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                    buttons: ['OK'],
                }).present();
            });
        }
    }
    isDeliveryRegistered() {
        return this.isDelivery || localStorage.getItem('isDelivery') == 'true';
    }
    getRating() {
        this.loginService.getUserRating(this.user_id)
            .subscribe(data => {
            if (data['rating']) {
                this.rating = data['rating'];
                localStorage.setItem("rating_now", this.rating);
            }
        });
    }
};
LoginPage = LoginPage_1 = __decorate([
    core_1.Component({
        selector: 'page-login',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/login/login.html"*/'<!--  NOT LOGGED -->\n<ion-content class="background" *ngIf="!logged">\n	<form #frmSignup="ngForm" class="login-form">\n		<ion-card>\n		  <ion-card-header>\n		    Ingresar a EnvioEntregas\n		  </ion-card-header>\n\n		  <ion-card-content>\n		    <ion-list no-line>\n			    <ion-item>\n			    	<ion-input type="text" name="email" placeholder="Ingresa tu email" ngModel #email = "ngModel"></ion-input>\n			    </ion-item>\n			    <ion-item>\n			    	<ion-input type="password" name="password" placeholder="Contraseña" ngModel #password = "ngModel"></ion-input>\n			    </ion-item>\n				</ion-list>\n		    <a href="https://envioentregas.com/password/reset">Olvidaste tu cuenta? <b>Obten ayuda para ingresar</b></a>\n				<br><br>\n		    <button ion-button block outline color="light" (click)=\'sendDataLogin(frmSignup);\'>\n		    	Ingresar\n		    </button>\n		  	<button ion-button block color="facebook" (click)=\'loginWithFB()\'>\n		  		<ion-icon name="logo-facebook"></ion-icon> &nbsp; Ingresar con Facebook\n		  	</button>\n\n		  </ion-card-content>\n			<button class="bottom" ion-button clear full color="light" [navPush]="SigninPage">\n				No tienes cuenta? Registrate\n			</button>\n		</ion-card>\n	</form>\n</ion-content>\n<!--  USER PROFILE CARD -->\n<ion-content class="background" *ngIf="logged">\n	<ion-card>\n		<ion-card-header *ngIf="photo || photo_fb">\n		  <ion-thumbnail>\n				<div *ngIf="photo && !photo_fb">\n					<img src="https://envioentregas.com/storage/app/public/users/{{photo}}" *ngIf="!hasChangeProfilePhoto">\n					<img  [src]="base64Image" *ngIf="hasChangeProfilePhoto">	\n				</div>\n				<div *ngIf="photo_fb">\n					<img src="{{photo_fb}}">\n				</div>\n			</ion-thumbnail>\n		</ion-card-header>		\n		<ion-card-content>\n			<button ion-button block outline color="light" (click)=\'presentChangeProfilePhoto()\' *ngIf="!hasChangeProfilePhoto">\n				ELEGIR FOTO DE PERFIL\n			</button>\n			<button ion-button block color="ee" *ngIf="hasChangeProfilePhoto" (click)=\'saveChangeProfilePhoto()\'>\n				GUARDAR FOTO DE PERFIL\n			</button>\n			<p *ngIf="!isClient">Haz un sueldo extra</p>\n		    <button ion-button block  color="light" *ngIf="!isClient && !isDeliveryRegistered()" (click)="goPage(\'scheduler\');">\n		    	SER DELIVERY\n			</button>\n			<button ion-button block color="ee" *ngIf="isClient" (click)="goPage(\'places\');">\n		    	MIS SUCURSALES\n		  </button>\n			<button ion-button block  color="light" *ngIf="isDeliveryRegistered()" (click)="goPage(\'scheduler\');">\n				VER MI DISPONIBILIDAD DELIVERY\n			</button>\n		</ion-card-content>\n	</ion-card>	  \n			\n	<ion-card>\n		<ion-card-header>\n			<button ion-button block outline color="light" (click)=\'toProfilePage();\'>\n				IR A MI PERFIL\n			</button>\n		</ion-card-header>	\n		<ion-card-content>\n			<ion-list no-line>\n				<ion-item (click)=\'toProfilePage();\'>\n					<ion-avatar item-start>\n						<ion-icon name="list-box"></ion-icon>\n					</ion-avatar>\n					Recuerda tu Info\n				</ion-item>\n				<ion-item [navPush]="pushPage">\n					<ion-avatar item-start>\n						<ion-icon name="notifications-outline"></ion-icon>\n					</ion-avatar>\n					Notificaciones\n				</ion-item>\n				<ion-item>\n					<ion-avatar item-start>\n						<ion-icon name="star"></ion-icon>\n					</ion-avatar>\n\n					<span *ngIf="rating > 0">Mi Reputación</span> \n					<span *ngIf="!rating || rating === \'null\'">No ha sido calificado</span>\n					<ion-icon *ngIf="rating >= 1" class="ee-icon" name="star"></ion-icon>\n					<ion-icon *ngIf="rating > 0 && rating < 1" class="ee-icon" name="star-half"></ion-icon>\n\n					<ion-icon *ngIf="rating >= 2" class="ee-icon" name="star"></ion-icon>\n					<ion-icon *ngIf="rating > 1 && rating < 2" class="ee-icon" name="star-half"></ion-icon>\n					<ion-icon *ngIf="rating <= 1 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					<ion-icon *ngIf="rating >= 3" class="ee-icon" name="star"></ion-icon>\n					<ion-icon *ngIf="rating > 2 && rating < 3" class="ee-icon" name="star-half"></ion-icon>\n					<ion-icon *ngIf="rating <= 2 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					<ion-icon *ngIf="rating >= 4" class="ee-icon" name="star"></ion-icon>\n					<ion-icon *ngIf="rating > 3 && rating < 4" class="ee-icon" name="star-half"></ion-icon>\n					<ion-icon *ngIf="rating <= 3 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					<ion-icon *ngIf="rating == 5" class="ee-icon" name="star"></ion-icon>\n					<ion-icon *ngIf="rating > 4 && rating < 5" class="ee-icon" name="star-half"></ion-icon>\n					<ion-icon *ngIf="rating <= 4 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n				</ion-item>\n			</ion-list>\n		</ion-card-content>\n	</ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        ngx_1.Facebook,
        login_service_1.LoginService,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.LoadingController,
        ngx_2.Camera,
        ionic_angular_1.ActionSheetController,
        token_service_1.TokenService,
        ionic_angular_1.ToastController,
        ionic_angular_1.Platform,
        ionic_angular_1.ModalController])
], LoginPage);
exports.LoginPage = LoginPage;
var LoginPage_1;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const from_1 = __webpack_require__(21);
const ionic_angular_1 = __webpack_require__(5);
let OrderServiceProvider = class OrderServiceProvider {
    constructor(http, httpNative, platform, alertController) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
        this.alertController = alertController;
    }
    getOrder(id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/showOrder/' + id, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    getAllOrders(user) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/' + user, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    getAllDeliveryOrders(user) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/delivery/' + user, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    // Usado para Messages 
    getNegotiationOrders(user) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/OnMessages/' + user, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    // Usado para Messages
    getDeliveryOrders(user) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'orders/delivery/OnMessages/' + user, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    getMessagesOfferts(orderId, action, userId) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'offerts/' + orderId + '/' + action + '/' + userId, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    getDeliveryMessagesOfferts(orderId, action, userId) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'offerts/' + orderId + '/' + action + '/' + userId, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    searchOrders(city, latlng_source, latlng_destination, userLogged, currentLocation) {
        let queryPparams = city + '/' + latlng_source + '/' + latlng_destination + '/' + userLogged + '/' + currentLocation;
        let url = `${Constants.API.URL}orders/showByLocations/${queryPparams}`;
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(url, { headers: headers, method: "GET" })
            .map((res) => { return res.json(); });
    }
    getStipulatedPrice(postalCode, dimensions) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'price/' + postalCode + "/" + dimensions, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    checkOrSaveUserFb(username, email, photo, fname, lname) {
        let data = {
            username: username,
            email: email,
            photo: photo,
            fname: fname,
            lname: lname
        };
        let url = `${Constants.API.URL}signup/fb`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    getBusinessesOfferts(idOrder, idUser) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'offertsBusiness/' + idOrder + "/" + idUser, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    getBusinessesTracking(businessid) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'offertsBusinessTracking/' + businessid, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    acceptOrderPayment(packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'business/acceptOffertPayment/' + packageName + '/' + cost + '/' + idDelivery + "/" + idUser + "/" + idOrder + "/" + idBusiness, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    acceptOrder(packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        let data = {
            packageName: packageName,
            cost: cost,
            delivery_id: idDelivery,
            user_id: idUser,
            order_id: idOrder,
            business_id: idBusiness
        };
        let url = `${Constants.API.URL}business/acceptOffert`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    cancelOrder(idUser, idOrder, idDelivery = null, idBusiness = null, currentId = null) {
        let data = {
            user_id: idUser,
            order_id: idOrder,
            delivery_id: idDelivery,
            business_id: idBusiness,
            current_id: currentId,
        };
        let url = `${Constants.API.URL}business/cancelOrder`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    getUsersByCurrentLocation(user, currentCity) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'users/byCurrentLocation/' + user + '/' + currentCity, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    sendGeneralOrderNotification(user, currentCity) {
    }
};
OrderServiceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform,
        ionic_angular_1.AlertController])
], OrderServiceProvider);
exports.OrderServiceProvider = OrderServiceProvider;
//# sourceMappingURL=order-service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
const rxjs_1 = __webpack_require__(52);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let TokenService = class TokenService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    send(token) {
        let data = {
            token: token,
            os: 'android',
        };
        return this.http.post(Constants.API.URL + '/devices', data, this.options())
            .map((r) => r.text()) //recibimos la respuesta despues de ejecutarse la peticion ajax, y procesarla.
            .catch((err) => {
            console.log("Ha ocurrido un Error: ");
            console.log(err.text());
            return rxjs_1.Observable.throw(err.text());
        });
    }
    //v1.0
    saveToken(token, user_id, os) {
        let data = {
            token: token,
            os: os,
            user_id: user_id
        };
        const url = `${Constants.API.URL}/push/newtoken`;
        if (this.platform.is('cordova')) {
            this.httpNative.setDataSerializer('json');
            const nativeRequest = this.httpNative.post(url, data, this.options());
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    sendOffertPush(user_id) {
        let data = {
            user_id: user_id
        };
        let url = `${Constants.API.URL}/newoffert`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    sendDeclineOffertPush(delivery_id) {
        let data = {
            user_id: delivery_id
        };
        const url = `${Constants.API.URL}/declineoffert`;
        if (this.platform.is('cordova')) {
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, this.options());
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    //v1.0
    sendChangeStatusPush(user_id, status, order_id) {
        let data = {
            user_id: user_id,
            status: status,
            orderId: order_id
        };
        const url = `${Constants.API.URL}/push/changestatus`;
        if (this.platform.is('cordova')) {
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, this.options());
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    //v1.0
    sendRatingPush(user_id, fname, lname, rating) {
        let data = {
            user_id: user_id,
            fname: fname,
            lname: lname,
            rating: rating
        };
        let url = `${Constants.API.URL}/push/rating`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    //v1.0
    sendLocationPush(user_id, current_address) {
        let data = {
            user_id: user_id,
            address: current_address
        };
        let url = `${Constants.API.URL}/push/currentlocation`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    sendAcceptPush(delivery_id, user_id, startCode, finishCode) {
        let data = {
            delivery_id: delivery_id,
            user_id: user_id,
            startCode: startCode,
            finishCode: finishCode
        };
        let url = `${Constants.API.URL}/acceptoffert`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    //v1.0
    sendMessagePush(user_id, fname, lname, message, business_id) {
        let data = {
            user_id: user_id,
            fname: fname,
            lname: lname,
            message: message,
            business_id: business_id
        };
        let url = `${Constants.API.URL}push/newmessage`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    sendCancelPush(delivery_id) {
        let data = {
            user_id: delivery_id
        };
        let url = `${Constants.API.URL}/cancelOrder`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    sendNotifierPush(users, type, fname, lname) {
        let data = {
            users_id: users,
            fname: fname,
            lname: lname
        };
        let route;
        if (type === 'delivery') {
            route = 'notifierDelivery';
        }
        else {
            route = 'notifierUsers';
        }
        let url = `${Constants.API.URL}/${route}`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    //v1.0
    sendOrderAccepted(user_id, order_id, fname, lname, order) {
        let data = {
            user_id: user_id,
            orderId: order_id,
            fname: fname,
            lname: lname,
            order: order
        };
        let url = `${Constants.API.URL}/push/orderaccepted`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            return this.http.post(url, data, this.options())
                .map((r) => r.text())
                .catch((err) => { return rxjs_1.Observable.throw(err.text()); });
        }
    }
    options() {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    }
};
TokenService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const transport_1 = __webpack_require__(524);
const ngx_1 = __webpack_require__(116);
const storage_1 = __webpack_require__(58);
const ngx_2 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const source_1 = __webpack_require__(191);
const login_1 = __webpack_require__(32);
let NewOrderPage = class NewOrderPage {
    constructor(navCtrl, navParams, camera, alertCtrl, nav, actionSheetCtrl, loadingCtrl, storage, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.nav = nav;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.fcm = fcm;
        this.transportPage = transport_1.TransportPage;
        this.hasChangeProfilePhoto = false;
        this.isClient = false;
    }
    ionViewWillEnter() {
        this.userId = localStorage.getItem('user_id');
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.title = this.isClient ? 'Nuevo Pedido: 1/5' : 'NUEVO PEDIDO: 1/6';
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        if (localStorage.getItem('deliveryAble')) {
            const notifierDeliveryValue = localStorage.getItem('deliveryAble');
            if (notifierDeliveryValue !== undefined && notifierDeliveryValue !== null) {
                this.alertCtrl.create({
                    title: 'DELIVERY DISPONIBLE!',
                    subTitle: `Si quieres enviar algo o tienes un Pedido ya cargado listo para llevar, se atento ante la propuesta de ${notifierDeliveryValue}`,
                    buttons: ['OK'],
                }).present();
                localStorage.removeItem('deliveryAble');
            }
        }
        localStorage.removeItem("name");
        localStorage.removeItem("description");
        localStorage.removeItem('order_published');
        localStorage.removeItem('from_list_orders');
    }
    takePhoto() {
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
        });
    }
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Publicando Pedido...'
        });
        this.loading.present();
    }
    getPhoto() {
        var options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetwidth: 1000,
            targetHeight: 1000,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
        });
    }
    showAlert(res) {
        let alert = this.alertCtrl.create({
            title: 'Informacion',
            subTitle: res,
            buttons: ['OK'],
        });
        alert.present();
    }
    sendDataStep1(req) {
        var name = req.value.name;
        var description = req.value.description;
        if (name == "" || name == null) {
            let alert = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debe indicar que necesita enviar",
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            this.storage.set('name', name);
            this.storage.set('description', description);
            if (this.base64Image !== null && this.base64Image !== "") {
                this.storage.set('photo', this.base64Image);
            }
            if (this.isClient) {
                this.storage.set('vehicle', 'bicicleta');
                this.storage.set('dimensions', '10x10x10,500');
                this.storage.set('size', 'S');
                this.nav.push(source_1.SourcePage);
            }
            else {
                this.nav.push(transport_1.TransportPage);
            }
        }
    }
    presentUploadOrderPhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Deseas cargar una Foto de lo que vas a Enviar?',
            buttons: [
                {
                    text: 'Tomar una Foto',
                    handler: () => {
                        this.takePhoto();
                    }
                },
                {
                    text: 'Elegir una Foto',
                    handler: () => {
                        this.getPhoto();
                    }
                },
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: () => {
                        console.log("cancelo change profile photo");
                    }
                }
            ]
        });
        actionSheet.present();
    }
    navLogin() {
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(login_1.LoginPage).then(() => {
            this.navCtrl.remove(currentIndex);
        });
    }
};
NewOrderPage = __decorate([
    core_1.Component({
        selector: 'page-new-order',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/new-order/new-order.html"*/'<!--\n  Generated template for the NewOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n	\n	<form #f="ngForm">\n		<ion-card>\n		  	<ion-card-header>\n				¿Que quieres enviar?\n			</ion-card-header>	\n			<ion-card-content>\n		    	<ion-list no-line>\n					<p class="text-ee">Carga una foto (Opcional)</p>\n						<ion-card>\n						    <div class="card-title" align="center">\n						     	<ion-thumbnail>\n						     	<img [src]="base64Image" *ngIf="base64Image">\n						     	</ion-thumbnail>\n								<button ion-button block color="ee" id="btn-take-photo" (click)="presentUploadOrderPhoto()">		\n									CARGAR FOTO	\n								</button>\n							</div>\n					  	</ion-card>\n						<ion-item>\n							<ion-input text-capitalize maxlength="22"  placeholder="Indique que va a enviar" type="text"  name="name" ngModel #name #uppercase = "ngModel" ></ion-input>\n						</ion-item>\n						<p text-center class="text-ee">(Opcional)</p>\n						<ion-item>\n							<ion-input text-capitalize  maxlength="100" placeholder="Detalles... max 100 caracteres." type="text" name="description" ngModel #description = "ngModel"></ion-input>\n						</ion-item>\n				</ion-list>\n			</ion-card-content>\n		</ion-card>			\n	</form>\n</ion-content>\n<ion-footer *ngIf="userId">\n	<ion-fab>\n		<button ion-fab class="button-ee-fav" (click)=\'sendDataStep1(f);\'><ion-icon name="arrow-forward"></ion-icon></button>\n	</ion-fab> \n</ion-footer>\n<ion-footer *ngIf="!userId">\n	<i><p class="text-ee">Debes Ingresar para cargar un Pedido</p></i>\n	<button ion-button block outline color="light" (click)="navLogin();">\n		Ingresar\n	</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/new-order/new-order.html"*/,
        providers: [[ngx_1.Camera]]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ngx_1.Camera,
        ionic_angular_1.AlertController,
        ionic_angular_1.NavController,
        ionic_angular_1.ActionSheetController,
        ionic_angular_1.LoadingController,
        storage_1.Storage,
        ngx_2.FCM])
], NewOrderPage);
exports.NewOrderPage = NewOrderPage;
//# sourceMappingURL=new-order.js.map

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const home_1 = __webpack_require__(85);
const orders_1 = __webpack_require__(53);
const new_order_1 = __webpack_require__(42);
const login_1 = __webpack_require__(32);
const messages_1 = __webpack_require__(117);
let TabsPage = class TabsPage {
    constructor() {
        this.tab1Root = home_1.HomePage;
        this.tab2Root = orders_1.OrdersPage;
        this.tab3Root = new_order_1.NewOrderPage;
        this.tab4Root = messages_1.MessagesPage;
        this.tab5Root = login_1.LoginPage;
    }
    selectTab(id) {
        localStorage.setItem('current_tab', id);
        this.color = '#26a69a';
    }
};
TabsPage = __decorate([
    core_1.Component({template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/tabs/tabs.html"*/'<ion-tabs color="dark">\n  \n  <ion-tab [root]="tab1Root" (ionSelect)="selectTab(\'0\')" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab2Root" (ionSelect)="selectTab(\'1\')" tabIcon="list"></ion-tab>\n  <ion-tab [root]="tab3Root" (ionSelect)="selectTab(\'2\')" tabIcon="add-circle"></ion-tab>\n  <ion-tab [root]="tab4Root" (ionSelect)="selectTab(\'3\')" tabIcon="chatbubbles"></ion-tab>\n  <ion-tab [root]="tab5Root" (ionSelect)="selectTab(\'4\')" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);
exports.TabsPage = TabsPage;
//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(25);
const from_1 = __webpack_require__(21);
let PriceService = class PriceService {
    constructor(http, platform, httpNative) {
        this.http = http;
        this.platform = platform;
        this.httpNative = httpNative;
    }
    saveOrder(namePackage, vehicle, dimensions, source_address, destination_address, cost_stipulated, service_stipulated, insurance, coordenates, date, hour, user_id, size, description, photo, isClient) {
        let data = {
            package: namePackage,
            description: description,
            vehicle: vehicle,
            dimensions: dimensions,
            size: size,
            source: source_address,
            destination: destination_address,
            cost_stipulated: cost_stipulated,
            service_stipulated: service_stipulated,
            insurance: insurance,
            coordenates: coordenates,
            date: date,
            hour: hour,
            user_id: user_id,
            photo: photo,
            isClient: isClient
        };
        let url = `${Constants.API.URL}orders/new`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
PriceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ionic_angular_1.Platform,
        ngx_1.HTTP])
], PriceService);
exports.PriceService = PriceService;
//# sourceMappingURL=price.service.js.map

/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
let ProfileService = class ProfileService {
    constructor(http) {
        this.http = http;
    }
    getCounters(user) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'counters/' + user, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
};
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const from_1 = __webpack_require__(21);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(25);
let DeliverySchedulerService = class DeliverySchedulerService {
    constructor(http, platform, httpNative) {
        this.http = http;
        this.platform = platform;
        this.httpNative = httpNative;
    }
    deleteDayCalendarDelivery(userid, schedulerid, day) {
        let data = {
            userid: userid,
            schedulerid: schedulerid,
            day: day
        };
        let url = `${Constants.API.URL}users/scheduler/delete`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    deleteDelivery(userid, deliveryid) {
        let data = {
            userid: userid,
            deliveryid: deliveryid
        };
        let url = `${Constants.API.URL}delivery/delete`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    getSchedulerDelivery(userid) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'delivery/scheduler/' + userid, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
};
DeliverySchedulerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ionic_angular_1.Platform,
        ngx_1.HTTP])
], DeliverySchedulerService);
exports.DeliverySchedulerService = DeliverySchedulerService;
//# sourceMappingURL=deliveryScheduler.service.js.map

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const delivery_days_service_1 = __webpack_require__(520);
const moment = __webpack_require__(2);
let DeliveryDaysPage = class DeliveryDaysPage {
    constructor(navParams, alertCtrl, loadingCtrl, deliveryDayService, viewCtrl, platform) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.deliveryDayService = deliveryDayService;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.title = 'mi agenda';
        this.delivery_id = this.navParams.get('deliveryid');
    }
    ionViewWillEnter() {
        this.getDays(this.delivery_id);
    }
    getDays(delivery) {
        this.loadingDays();
        this.deliveryDayService.getSchedulerDays(delivery)
            .subscribe(data => {
            this.loading.dismiss();
            if (data.error) {
                this.showErrorAlert();
            }
            else {
                this.days = data['days'];
                console.log(this.days);
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    loadingDays() {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo días...'
        });
        this.loading.present();
    }
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
            buttons: ['OK'],
        });
        alert.present();
    }
    closeModal() {
        this.viewCtrl.dismiss();
    }
    presentHoursDay(day) {
        let alert = this.alertCtrl.create({
            title: 'Horarios Disponibles',
            subTitle: 'Modifica si te es necesario',
            inputs: [
                {
                    name: 'hour_start',
                    type: 'time',
                    value: day.hour_start !== '' ? day.hour_start : moment().format('hh:mm a')
                },
                {
                    name: 'hour_finish',
                    type: 'time',
                    value: day.hour_finish !== '' ? day.hour_finish : moment().format('hh:mm a')
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Guardar',
                    handler: data => {
                        this.presentLoadingHoursChanged();
                        let user_id = localStorage.getItem('user_id');
                        if (data.hour_start == "" || data.hour_finish == "") {
                            let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Ambas horas deben ser completadas',
                                buttons: ['OK'],
                            });
                            alert.present();
                        }
                        else {
                            this.deliveryDayService.saveCalendarDay(day.id, data.hour_start, data.hour_finish)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                this.loading.dismiss();
                                if (data.error) {
                                    let alert = this.alertCtrl.create({
                                        title: 'Error',
                                        subTitle: data.error,
                                        buttons: ['OK'],
                                    });
                                    alert.present();
                                }
                                else {
                                    this.ionViewWillEnter();
                                }
                            }, err => {
                                this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                                    buttons: ['OK'],
                                }).present();
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    hoursDayDelete(id) {
        this.deliveryDayService.deleteDayCalendar(id)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.getDays(this.delivery_id);
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    presentLoadingHoursChanged() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando...'
        });
        this.loading.present();
    }
};
DeliveryDaysPage = __decorate([
    core_1.Component({
        selector: 'page-delivery-days',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/delivery-days/delivery-days.html"*/'<ion-header>\n\n    <ion-navbar color="dark">\n         <ion-title>{{ title | uppercase}}</ion-title>\n         <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()">\n                <ion-icon item-right ios="ios-close-outline" md="md-close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n  \n  <ion-content class="background">\n    \n    <ion-list>\n        <ion-item-sliding *ngFor="let day of days; let k = index" color="dark"> \n            \n            <ion-item color="dark" (click)="presentHoursDay(day)">\n                <h2><b>{{day.day | uppercase}}</b></h2>\n                <p ion-text color="light" *ngIf="day.status == \'1\'">Desde: <b>{{day.hour_start}}</b> Hasta: <b>{{day.hour_finish}}</b></p>\n                <p ion-text color="danger" *ngIf="day.status == \'0\'"><b>NO AGENDADO</b></p>    \n            </ion-item>\n            <ion-item-options color="dark" *ngIf="day.status == \'1\'" (ionSwipe)="hoursDayDelete(day.id)">\n                <button ion-button expandable color="danger"(click)="hoursDayDelete(day.id)">Desactivar</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n\n  </ion-content>\n '/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/delivery-days/delivery-days.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        ionic_angular_1.LoadingController,
        delivery_days_service_1.DeliveryDaysService,
        ionic_angular_1.ViewController,
        ionic_angular_1.Platform])
], DeliveryDaysPage);
exports.DeliveryDaysPage = DeliveryDaysPage;
//# sourceMappingURL=delivery-days.js.map

/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let DeliveryDaysService = class DeliveryDaysService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    saveCalendarDay(calendar_id, hour_start, hour_finish) {
        let data = {
            calendarid: calendar_id,
            hourstart: hour_start,
            hourfinish: hour_finish
        };
        let url = `${Constants.API.URL}delivery/day/calendar`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    getSchedulerDays(delivery) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'delivery/days/' + delivery, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    deleteDayCalendar(id) {
        let data = {
            calendarid: id,
        };
        let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(Constants.API.URL + 'delivery/day/delete', data, options)
            .map((res) => { return res.json(); });
    }
};
DeliveryDaysService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], DeliveryDaysService);
exports.DeliveryDaysService = DeliveryDaysService;
//# sourceMappingURL=delivery-days.service.js.map

/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let NewCityService = class NewCityService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    saveCity(userid, city, shortCity) {
        shortCity = shortCity.toLowerCase();
        let data = {
            userid: userid,
            city: city,
            shortCity: shortCity
        };
        let url = `${Constants.API.URL}delivery/new`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    saveAddress(userId, address) {
        const data = {
            userId: userId,
            address: address
        };
        let url = `${Constants.API.URL}client/place/new`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
NewCityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], NewCityService);
exports.NewCityService = NewCityService;
//# sourceMappingURL=newCity.service.js.map

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(25);
const from_1 = __webpack_require__(21);
let NotificationService = class NotificationService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    getNotifications(user_id) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'notifications/' + user_id, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    configNotifications(messageNotif, messageEmail, messageSMS, offertNotif, offertEmail, offertSMS, deliveriesNotif, deliveriesEmail, deliveriesSMS, user_id) {
        let data = {
            messageNotif: messageNotif,
            messageEmail: messageEmail,
            messageSMS: messageSMS,
            offertNotif: offertNotif,
            offertEmail: offertEmail,
            offertSMS: offertSMS,
            deliveriesNotif: deliveriesNotif,
            deliveriesEmail: deliveriesEmail,
            deliveriesSMS: deliveriesSMS,
            user_id: user_id
        };
        let url = `${Constants.API.URL}notifications/config`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
NotificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notifications.service.js.map

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let PreProfileService = class PreProfileService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    saveChangeProfilePhoto(photo, id_user) {
        let data = {
            photo: photo,
            id_user: id_user
        };
        let url = `${Constants.API.URL}user/edit/photo`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
PreProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], PreProfileService);
exports.PreProfileService = PreProfileService;
//# sourceMappingURL=preProfile.service.js.map

/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const source_1 = __webpack_require__(191);
const storage_1 = __webpack_require__(58);
const ngx_1 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const new_order_1 = __webpack_require__(42);
let TransportPage = class TransportPage {
    constructor(navCtrl, navParams, nav, alertCtrl, storage, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.fcm = fcm;
        this.sourcePage = source_1.SourcePage;
        this.title = "TRANSPORTE 2/6";
    }
    ionViewWillEnter() {
        this.userId = localStorage.getItem('user_id');
        if (!this.userId) {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(new_order_1.NewOrderPage).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
    sendDataStep2(req) {
        var vehicle = req.value.vehicle;
        var weight = req.value.weight;
        if (vehicle == "" || vehicle == null) {
            let alert = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debes Seleccionar un Vehiculo",
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (weight == null || weight == "") {
            let alert = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debes Indicar el Peso del paquete",
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            if (vehicle == 'caminando') {
                this.storage.set('dimensions', '15x15x15,' + weight);
                this.storage.set('size', 'XS');
            }
            if (vehicle == 'bicicleta') {
                this.storage.set('dimensions', '20x20x20,' + weight);
                this.storage.set('size', 'S');
            }
            if (vehicle == 'auto') {
                this.storage.set('dimensions', '30x30x30,' + weight);
                this.storage.set('size', 'M');
            }
            if (vehicle == 'colectivo') {
                localStorage.setItem("dimensions", '20x20x20,' + weight);
                this.storage.set('dimensions', '20x20x20,' + weight);
                this.storage.set('size', 'L');
            }
            if (vehicle == 'furgon') {
                this.storage.set('dimensions', '40x40x40,' + weight);
                this.storage.set('size', 'XL');
            }
            this.storage.set('vehicle', vehicle);
            this.nav.push(source_1.SourcePage);
        }
    }
};
TransportPage = __decorate([
    core_1.Component({
        selector: 'page-transport',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/transport/transport.html"*/'<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n	<p class="normal_text">¿Cuál sería el Transporte adecuado?</p>\n	<form #f2="ngForm">\n		<ion-card>\n		  	<ion-card-header>\n				<ion-input  type="number" maxlength="10" placeholder="Indicar peso en gramos" name="weight" ngModel #weight #uppercase = "ngModel" ></ion-input>\n    		</ion-card-header>	\n	  \n	  		<ion-card-content>\n		    		<p class="text-ee">SELECCIONE EL TRANSPORTE</p>\n				  <ion-list radio-group name="vehicle" ngModel #vehicle = "ngModel">\n				  	<ion-item class="item-group">\n				  		<ion-label class="text-ee">CAMINANDO <br><p ><i class="subtext-ee">Celular, llaves, lentes etc.</i></p></ion-label>\n				  		<ion-radio  name="caminando" value="caminando" color="ee" ngModel #vehicle = "ngModel" ngDefaultControl></ion-radio>\n				  	</ion-item>\n\n				  	<ion-item>\n				  		<ion-label class="text-ee">BICICLETA <br><p ><i class="subtext-ee">Notebook, libro, ropa etc.</i></p></ion-label>\n				  		<ion-radio  name="bicicleta" value="bicicleta" color="ee" ngModel #vehicle = "ngModel" ngDefaultControl></ion-radio>	\n				  	</ion-item>\n\n				  	<ion-item>\n				  		<ion-label class="text-ee">AUTO <p ><i class="subtext-ee">Cuadro, guitarra, mascota etc.</i></p></ion-label>\n				  		<ion-radio name="auto"   value="auto" color="ee" ngModel #vehicle = "ngModel" ngDefaultControl></ion-radio>\n						</ion-item>\n \n				  	<ion-item>\n				  		<ion-label class="text-ee">COLECTIVO <br><p ><i class="subtext-ee">Mochila, libro, herramientas etc.</i></p></ion-label>\n				  		<ion-radio name="colectivo" value="colectivo" color="ee"  ngModel #vehicle = "ngModel" ngDefaultControl></ion-radio>\n				  	</ion-item>\n\n				  	<ion-item>\n				  		<ion-label class="text-ee">CAMIONETA / FURGON <p><i class="subtext-ee">Mueble, bicicleta etc.</i></p></ion-label>\n				  		<ion-radio name="furgon" value="furgon" color="ee"  ngModel #vehicle = "ngModel" ngDefaultControl></ion-radio>\n				  	</ion-item>\n	\n				</ion-list>\n	\n			</ion-card-content>	\n		\n		</ion-card>	\n	\n	</form> \n\n</ion-content>\n\n<ion-footer>\n	\n	<ion-fab>\n		<button ion-fab class="button-ee-fav" (click)=\'sendDataStep2(f2);\'><ion-icon name="arrow-forward"></ion-icon></button>\n	</ion-fab>\n	\n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/transport/transport.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.NavController,
        ionic_angular_1.AlertController,
        storage_1.Storage,
        ngx_1.FCM])
], TransportPage);
exports.TransportPage = TransportPage;
//# sourceMappingURL=transport.js.map

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const geolocation_service_1 = __webpack_require__(86);
const calendar_1 = __webpack_require__(526);
const storage_1 = __webpack_require__(58);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const new_order_1 = __webpack_require__(42);
let DestinationPage = class DestinationPage {
    constructor(navCtrl, navParams, geolocator, alertCtrl, zone, nav, storage, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocator = geolocator;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.nav = nav;
        this.storage = storage;
        this.fcm = fcm;
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
        this.isClient = false;
    }
    ionViewWillEnter() {
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.userId = localStorage.getItem('user_id');
        if (!this.userId) {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(new_order_1.NewOrderPage).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
        this.title = this.isClient ? 'Lugar de Entrega 3/5' : 'Lugar de Entrega 4/6';
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        //obtenemos ubicacion del usuario
        var latlng = this.geolocator.getCurrentLocation();
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        let alertAreSure = this.alertCtrl.create({
            title: '¿Lo van a enviar donde estás en éste momento?',
            message: 'Indica "Si", si quieres indicar que lleven al pedido a tu ubicación actual!',
            buttons: [
                {
                    text: 'No, otra dirección.',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Si!',
                    handler: () => {
                        let point = { lat: +lat, lng: +lng };
                        var icon = {
                            url: "assets/imgs/marker_moderno.png",
                            scaledSize: new google.maps.Size(35, 35),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 0) // anchor
                        };
                        let marker = new google.maps.Marker({
                            position: point,
                            map: this.map,
                            icon: icon
                        });
                        this.markers.push(marker);
                        this.map.setCenter(point);
                        let latlng = new google.maps.LatLng(+lat, +lng);
                        this.geocoder.geocode({
                            'latLng': latlng
                        }, function (results, status) {
                            if (status ==
                                google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    let address = results[0].formatted_address;
                                    this.storage.set('destination_lat', lat);
                                    this.storage.set('destination_lng', lng);
                                    this.storage.set('destination_address', address);
                                }
                                else {
                                    alert('Quizas estás en un área de poca cobertura de GPS, intenta colocando la dirección manualmente');
                                }
                            }
                            else {
                                alert('Intenta nuevamente, recuerda tener GPS activado.');
                            }
                        });
                    }
                }
            ]
        });
        alertAreSure.present();
        this.initMap(lat, lng);
    }
    initMap(latitude, longitude) {
        var point = { lat: -31.4137274, lng: -64.1655693 };
        let divMap = document.getElementById('map-dest');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
    }
    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        // set autocomplete options
        var options = {
            input: this.autocomplete.input,
            types: ['address'],
            componentRestrictions: { country: 'ar' },
        };
        this.GoogleAutocomplete.getPlacePredictions(options, (predictions, status) => {
            if (predictions) {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    }
    selectSearchResult(item) {
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                this.storage.set("destination_address", item.description);
                var postalCode = '';
                for (var i = 0; i < results[0].address_components.length; i++) {
                    let element = results[0].address_components[i].types[0];
                    if (element == 'postal_code') {
                        postalCode = results[0].address_components[i].long_name;
                    }
                    else {
                        postalCode = '5000';
                    }
                }
                this.storage.set('postal_code', postalCode);
                var icon = {
                    url: "assets/imgs/marker_moderno.png",
                    scaledSize: new google.maps.Size(35, 35),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0) // anchor
                };
                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                    icon: icon
                });
                this.markers.push(marker);
                this.map.setCenter(results[0].geometry.location);
            }
        });
        this.geocoder.geocode({ 'address': item.description }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                this.storage.set("destination_lat", results[0].geometry.location.lat());
                this.storage.set("destination_lng", results[0].geometry.location.lng());
            }
        });
    }
    sendDataStep4() {
        var destination_address, destination_lat, destination_lng, source_address;
        this.storage.get('destination_address').then((val) => {
            destination_address = val;
        });
        this.storage.get('destination_lng').then((val) => {
            destination_lng = val;
        });
        this.storage.get('destination_lng').then((val) => {
            destination_lng = val;
        });
        this.storage.get('source_address').then((val) => {
            source_address = val;
            let arrSourceAddress = destination_address.split(',');
            let city = arrSourceAddress[1].trim();
            if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(city) > -1) {
                if (destination_address !== null && destination_lat !== null && destination_lng !== null) {
                    if (source_address == destination_address) {
                        this.alertCtrl.create({
                            title: 'Validacion',
                            subTitle: "Las direcciones de Origen y Destino no pueden ser iguales",
                            buttons: ['OK'],
                        }).present();
                    }
                    else {
                        this.nav.push(calendar_1.CalendarPage);
                    }
                }
                else {
                    this.alertCtrl.create({
                        title: 'Validacion',
                        subTitle: "Debes indicar donde se envia",
                        buttons: ['OK'],
                    }).present();
                }
            }
            else {
                this.alertCtrl.create({
                    title: ':( Lo Sentimos!',
                    subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
                    buttons: ['OK'],
                }).present();
            }
        });
    }
};
DestinationPage = __decorate([
    core_1.Component({
        selector: 'page-destination',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/destination/destination.html"*/'<!--\n  Generated template for the DestinationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-header>\n	    <ion-toolbar color="dark">\n	      <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="updateSearchResults()" placeholder="Donde lo deben entregar?"></ion-searchbar>\n\n	      <ion-list [hidden]="autocompleteItems.length == 0">\n	        <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n	          {{ item.description }}\n	        </ion-item>\n	      </ion-list>\n\n	    </ion-toolbar>\n  	</ion-header>\n\n	  <div id="map-dest">\n	  	\n	  </div>\n</ion-content>\n<ion-footer>\n	\n	<ion-fab>\n	  	<button ion-fab class="button-ee-fav" (click)=\'sendDataStep4();\'><ion-icon name="arrow-forward"></ion-icon></button>\n	</ion-fab>\n\n</ion-footer>\n\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/destination/destination.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        geolocation_service_1.GeolocationService,
        ionic_angular_1.AlertController,
        core_1.NgZone,
        ionic_angular_1.NavController,
        storage_1.Storage,
        ngx_1.FCM])
], DestinationPage);
exports.DestinationPage = DestinationPage;
//# sourceMappingURL=destination.js.map

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const calendar_service_1 = __webpack_require__(527);
const price_1 = __webpack_require__(186);
const storage_1 = __webpack_require__(58);
const ngx_1 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const new_order_1 = __webpack_require__(42);
let CalendarPage = class CalendarPage {
    constructor(navCtrl, navParams, alertCtrl, nav, calendarService, loadingCtrl, actionSheetCtrl, storage, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.nav = nav;
        this.calendarService = calendarService;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.storage = storage;
        this.fcm = fcm;
        this.realCost = '';
        this.isClient = false;
    }
    ionViewWillEnter() {
        this.isClient = localStorage.getItem('isClient') === '1' ? true : false;
        this.title = this.isClient ? 'Indique Fecha 4/5' : 'Indique Fecha 5/6';
        this.user_id = localStorage.getItem('user_id');
        if (!this.user_id) {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(new_order_1.NewOrderPage).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        localStorage.removeItem('hour');
        localStorage.removeItem('cost_stipulated');
        localStorage.removeItem('service_stipulated');
    }
    onChange($event) {
        this.storage.set("maxDeliveryDate", $event);
    }
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: this.isClient ? 'Ultimo paso...' : 'Calculando costo estimativo...'
        });
        this.loading.present();
    }
    sendDataStep5() {
        var hour, maxDeliveryDate, postalCode, dimensions;
        this.storage.get('mommentPickup').then((val) => {
            hour = val;
        });
        this.storage.get('maxDeliveryDate').then((val) => {
            maxDeliveryDate = val;
            if (hour == "" || hour == null || maxDeliveryDate == "" || maxDeliveryDate == null) {
                this.alertCtrl.create({
                    title: 'Validacion',
                    subTitle: "Debe indicar Dia y Momento del Dia",
                    buttons: ['OK'],
                }).present();
            }
            else {
                this.presentLoadingDefault();
                this.storage.set("date", maxDeliveryDate);
                switch (hour) {
                    case "morning":
                        this.storage.set("hour", 'mañana');
                        break;
                    case "afternoon":
                        this.storage.set("hour", 'tarde');
                        break;
                    default:
                        this.storage.set("hour", 'noche');
                        break;
                }
                this.storage.get('postal_code').then((val) => {
                    postalCode = val;
                });
                this.storage.get('dimensions').then((val) => {
                    dimensions = val;
                    this.calendarService.getStipulatedPrice(postalCode, dimensions)
                        .subscribe(data => {
                        if (data.error) {
                            this.loading.dismiss();
                            this.showErrorAlert();
                        }
                        else {
                            let cost_string = data.price_stipulated;
                            cost_string = cost_string.toFixed(2);
                            let service_string = data.service_stipulated;
                            service_string = service_string.toFixed(2);
                            this.storage.set("cost_stipulated", cost_string);
                            this.storage.set("service_stipulated", service_string);
                            let real_cost = parseFloat(data.price_stipulated) - parseFloat(data.service_stipulated);
                            this.realCost = real_cost.toFixed(2);
                            this.storage.set("real_cost", this.realCost);
                            this.loading.dismiss();
                            this.nav.push(price_1.PricePage);
                        }
                    }, err => {
                        this.loading.dismiss();
                        this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                            buttons: ['OK'],
                        }).present();
                    });
                });
            }
        });
    }
    presentMommentPickup() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'En que momento podrás?',
            buttons: [
                {
                    text: 'En la mañana',
                    role: 'morning',
                    handler: () => {
                        this.storage.set("mommentPickup", "morning");
                        document.getElementById('pickup_momment').innerHTML = 'EN LA MAÑANA';
                    }
                },
                {
                    text: 'En la tarde',
                    handler: () => {
                        this.storage.set("mommentPickup", "afternoon");
                        document.getElementById('pickup_momment').innerHTML = 'EN LA TARDE';
                    }
                },
                {
                    text: 'En la noche',
                    handler: () => {
                        this.storage.set("mommentPickup", "night");
                        document.getElementById('pickup_momment').innerHTML = 'EN LA NOCHE';
                    }
                },
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: () => {
                        console.log("cancelo pick momment");
                    }
                }
            ]
        });
        actionSheet.present();
    }
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, vuelve a cargar la Orden',
            buttons: ['OK'],
        });
        alert.present();
    }
};
CalendarPage = __decorate([
    core_1.Component({
        selector: 'page-calendar',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/calendar/calendar.html"*/'<!--\n  Generated template for the CalendarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{ title }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n \n\n<ion-content class="background">\n	<form #f5="ngForm">\n		<ion-card>\n		  	<ion-card-header>\n				¿Que día necesita que lo retiren? \n    		</ion-card-header>	\n			<ion-card-content>\n			\n				<ion-calendar (onChange)="onChange($event)"\n			              [format]="\'YYYY-MM-DD\'">\n				</ion-calendar>\n\n				<ion-item (click)=\'presentMommentPickup();\'>\n					<button ion-button color="ee">Seleccione el período del Día</button>\n					<br>\n					<b><p id="pickup_momment"></p></b>\n				</ion-item>\n			</ion-card-content>	\n		</ion-card>	\n	</form>\n</ion-content>\n<ion-footer>\n	<ion-fab>\n		<button ion-fab class="button-ee-fav" (click)=\'sendDataStep5();\'><ion-icon name="arrow-forward"></ion-icon></button>\n	</ion-fab> \n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/calendar/calendar.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        ionic_angular_1.NavController,
        calendar_service_1.CalendarService,
        ionic_angular_1.LoadingController,
        ionic_angular_1.ActionSheetController,
        storage_1.Storage,
        ngx_1.FCM])
], CalendarPage);
exports.CalendarPage = CalendarPage;
//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
let CalendarService = class CalendarService {
    constructor(http) {
        this.http = http;
    }
    getStipulatedPrice(postalCode, dimensions) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'price/' + postalCode + "/" + dimensions, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
};
CalendarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let MessageDetailService = class MessageDetailService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    getMessages(businessId, action = null) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'messages/' + businessId, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    newMessage(user_id, message, to, businessId) {
        let data = {
            user_id: user_id,
            message: message,
            to: to,
            business_id: businessId,
        };
        let url = `${Constants.API.URL}offertBusiness/newMessage`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let nativeRequest = this.httpNative.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
MessageDetailService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], MessageDetailService);
exports.MessageDetailService = MessageDetailService;
//# sourceMappingURL=messageDetail.service.js.map

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const rxjs_1 = __webpack_require__(52);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const from_1 = __webpack_require__(21);
const ionic_angular_1 = __webpack_require__(5);
let LoginService = class LoginService {
    constructor(http, httpStandar, platform) {
        this.http = http;
        this.httpStandar = httpStandar;
        this.platform = platform;
        this.userLogged = false;
        this.observableLogged = new rxjs_1.BehaviorSubject(this.userLogged);
    }
    logged(active) {
        this.observableLogged.next(active);
    }
    checkOrSaveUserFb(username, email, photo, fname, lname) {
        let data = {
            username: username,
            email: email,
            photo: photo,
            fname: fname,
            lname: lname
        };
        let url = `${Constants.API.URL}signup/fb`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.http.setDataSerializer('json');
            let nativeRequest = this.http.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.httpStandar.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    generatePhoneCodeAtLogin(phone, email) {
        let data = {
            phone: phone,
            email: email
        };
        let url = `${Constants.API.URL}phone/code/atLogin`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.http.setDataSerializer('json');
            let nativeRequest = this.http.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.httpStandar.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    login(email, password) {
        let data = {
            email: email,
            password: password
        };
        let url = `${Constants.API.URL}signup`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.http.setDataSerializer('json');
            let nativeRequest = this.http.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.httpStandar.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    saveChangeProfilePhoto(photo, id_user) {
        let data = {
            photo: photo,
            id_user: id_user
        };
        let url = `${Constants.API.URL}user/edit/photo`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.http.setDataSerializer('json');
            let nativeRequest = this.http.post(url, data, headers);
            return from_1.from(nativeRequest);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.httpStandar.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
    getUserRating(idUser) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.httpStandar.get(`${Constants.API.URL}rating/${idUser}`, { headers: headers, method: "GET" }).map((res) => { return res.json(); });
    }
};
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ngx_1.HTTP, http_1.Http, ionic_angular_1.Platform])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const order_service_1 = __webpack_require__(37);
const go_order_1 = __webpack_require__(28);
const login_1 = __webpack_require__(32);
const view_image_1 = __webpack_require__(87);
const ngx_1 = __webpack_require__(88);
const signin_1 = __webpack_require__(62);
const pre_profile_1 = __webpack_require__(63);
const new_order_1 = __webpack_require__(42);
const message_detail_1 = __webpack_require__(65);
const goOrder_service_1 = __webpack_require__(112);
const token_service_1 = __webpack_require__(38);
const home_1 = __webpack_require__(85);
const ngx_2 = __webpack_require__(26);
let OrdersPage = OrdersPage_1 = class OrdersPage {
    constructor(events, navCtrl, navParams, orderService, alertCtrl, toastCtrl, loadingCtrl, modalCtrl, facebook, platform, fcm, goOrderService, tokenService) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.facebook = facebook;
        this.platform = platform;
        this.fcm = fcm;
        this.goOrderService = goOrderService;
        this.tokenService = tokenService;
        this.orders = [];
        this.startPhotos = [];
        this.startPhotos_DELIVERY = [];
        this.businesses_quantity = [];
        this.delivery_orders = [];
        this.USER_LOGGED = false;
        this.FROM_LOGIN = false;
        this.logged = false;
        this.title = 'MIS PEDIDOS';
        this.url_img_orders = 'https://envioentregas.com/img/orders/';
        this.userData = null;
        this.idorder = this.navParams.get('id_order');
        this.actions = 'send';
        this.pushPage = login_1.LoginPage;
        this.SigninPage = signin_1.SigninPage;
        this.newOrderPage = new_order_1.NewOrderPage;
        this.newDeliveryNotifyPage = home_1.HomePage;
        if (navParams.get("showTab") == 'deliveries') {
            this.actions = 'delivery';
        }
    }
    ionViewWillEnter() {
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        if (localStorage.getItem("logged") == 'true') {
            let user_id = localStorage.getItem("user_id");
            this.rating = localStorage.getItem("rating");
            this.logged = true;
            this.getOrdersByUser(user_id);
            this.getDeliveryOrdersByUser(user_id);
            if (this.idorder > 0) {
                this.goOrder(this.idorder, null, null);
            }
        }
        else {
            this.logged = false;
        }
    }
    loginWithFB() {
        this.facebook.login(['email', 'public_profile']).then((response) => {
            this.facebook.api('me?fields=id,name,email,first_name, last_name, picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {
                    email: profile['email'],
                    first_name: profile['first_name'],
                    last_name: profile['last_name'],
                    picture: profile['picture_large']['data']['url'],
                    username: profile['name']
                };
                this.orderService.checkOrSaveUserFb(this.userData.username, this.userData.email, this.userData.picture, this.userData.first_name, this.userData.last_name)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    this.events.publish('user:logged', data, Date.now());
                    localStorage.setItem("logged", 'true');
                    localStorage.setItem("user_id", data['user'].id);
                    localStorage.setItem("email", data['user'].email);
                    localStorage.setItem("photo_fb", data['user'].photo);
                    localStorage.setItem("fname_logged", data['user'].fname);
                    localStorage.setItem("lname_logged", data['user'].lname);
                    localStorage.setItem("verified", data['user'].verified);
                    this.navCtrl.push(pre_profile_1.PreProfilePage);
                }, err => this.showErrorAlertFB(err));
            });
        });
    }
    showErrorAlertFB(type) {
        if (type == 'ERROR_LOGIN') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error SERVICIO',
                subTitle: JSON.stringify(type),
                buttons: ['OK'],
            });
            alert.present();
        }
    }
    //===========LOADING CONTROLLER==============
    presentLoadingOfferts() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando Ofertas...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    //===========LOADING CONTROLLER==============
    presentLoadingTracking() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando Seguimiento...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    viewPhoto(order) {
        let imageModal = this.modalCtrl.create(view_image_1.ViewImagePage, { img: order.startPhoto, name: order.name, description: order.description });
        imageModal.present();
    }
    getOrdersByUser(user) {
        this.orderService.getAllOrders(user)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.orders = data['results'];
                this.startPhotos = [];
                for (let f = 0; f < this.orders.length; f++) {
                    if (this.orders[f].startPhoto !== "" && this.orders[f].startPhoto !== null) {
                        let photoBLOB = this.orders[f].startPhoto;
                        let photoIMG = photoBLOB;
                        let photoURI = this.orders[f].startPhoto_url;
                        if (photoURI !== '') {
                            this.startPhotos.push(photoURI);
                        }
                        else {
                            this.startPhotos.push(photoIMG);
                        }
                    }
                    else {
                        this.startPhotos.push(null);
                    }
                }
                this.businesses_quantity = data['businesses_quantity'];
            }
        }, err => this.showError());
    }
    getDeliveryOrdersByUser(user) {
        this.orderService.getAllDeliveryOrders(user)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.delivery_orders = data['results'];
                this.startPhotos_DELIVERY = [];
                for (let f = 0; f < this.delivery_orders.length; f++) {
                    if (this.delivery_orders[f].startPhoto !== "" && this.delivery_orders[f].startPhoto !== null && this.delivery_orders[f].startPhoto !== 'null') {
                        let photoBLOB = this.delivery_orders[f].startPhoto;
                        let photoIMG = photoBLOB;
                        this.startPhotos_DELIVERY.push(photoIMG);
                    }
                    else {
                        let photoURI = this.delivery_orders[f].startPhoto_url;
                        if (photoURI !== '') {
                            this.startPhotos_DELIVERY.push(photoURI);
                        }
                        else {
                            this.startPhotos_DELIVERY.push(null);
                        }
                    }
                }
            }
        }, err => this.showError());
    }
    goOrder(id, from, get, businessid = null, businessStatus = null) {
        this.orderService.getOrder(id)
            .subscribe(data => {
            if (data.error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                let business = data[1].business;
                let order = data[0].order;
                let idOrder = order.id;
                let startDate = order.startDate;
                let finishDate = order.finishDate;
                let package_id = order.package_id;
                let package_name = order.name;
                let transport_id = order.transport_id;
                let user_id = order.user_id;
                let cost = order.cost;
                let calificationRequest = order.calificationRequest;
                let calificationResponse = order.calificationResponse;
                let source = order.source;
                let destination = order.destination;
                let status = order.status;
                let charge = order.charge;
                let startCode = order.startCode;
                let startPhoto = order.startPhoto;
                let finishPhoto = order.finishPhoto;
                let create_at = order.created_at;
                let updated_at = order.updated_at;
                let coordinates = order.coordinates;
                let deliberate_cost = order.deliberate_cost;
                let maxDeliveryDate = order.maxDeliveryDate;
                let maxDeliveryHour = order.mommentPickup;
                let fname = order.fname;
                let size = order.size;
                let weight = order.weight;
                let vehicle = order.vehicle;
                let delivery_fname = business.fname_delivery;
                let delivery_id = business.delivery_id;
                localStorage.setItem("id_order", idOrder);
                localStorage.setItem("source", source);
                localStorage.setItem("destination", destination);
                localStorage.setItem("coordinates", coordinates);
                localStorage.setItem("finishDate", finishDate);
                localStorage.setItem("package_name", package_name);
                localStorage.setItem("status", status);
                localStorage.setItem("maxDeliveryHour", maxDeliveryHour);
                localStorage.setItem('fname', fname);
                localStorage.setItem('size', size);
                localStorage.setItem('weight', weight);
                localStorage.setItem('vehicle', vehicle);
                localStorage.setItem('fname_delivery', delivery_fname);
                localStorage.setItem('idUserOrder_pre_offert', user_id);
                localStorage.setItem('idDeliveryOrder_pre_offert', delivery_id);
                if (from == 'deliveries') {
                    localStorage.setItem("from_list_orders", from);
                }
                else if (from == 'orders') {
                    localStorage.setItem("from_list_orders", from);
                }
                cost = parseFloat(cost).toFixed(2);
                charge = parseFloat(charge).toFixed(2);
                let just_cost = cost - charge;
                just_cost = Math.round(just_cost * 100) / 100;
                localStorage.setItem("cost", cost);
                localStorage.setItem("just_cost", "" + just_cost);
                localStorage.setItem("charge", charge);
                //El from indica (no siempre obligatorio) de donde proviene el llamado a la orden
                //En el caso de ir a al Orden desde LLEVAR (Pedidos) se debe aclarar, para cambiar
                //funcionalidades en el detalle orden, como cambiar estado, cancelar, enviar ubicacion
                if (get == 'offerts') {
                    this.goOfferts(from);
                }
                else if (get == 'tracking') {
                    this.goTracking(businessid, from, businessStatus);
                }
            }
        }, err => this.showError());
    }
    goOfferts(from) {
        this.presentLoadingOfferts();
        let idOrder = localStorage.getItem("id_order");
        let idUser = localStorage.getItem("user_id");
        //Obtener Business Order y Offerts
        this.orderService.getBusinessesOfferts(idOrder, idUser)
            .subscribe(data => {
            if (data.error) {
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.loading.dismiss();
                this.businesses = data['businesses'];
                this.declined_offerts = data['declined_offert'];
                this.orderid = data["orderid"];
                this.businessid = data["businessid"];
                this.statusbusiness = data["status_business"];
                let currentIndex = this.navCtrl.getActive().index;
                this.navCtrl.push(go_order_1.GoOrderPage, { from: from, offerts: this.businesses, business_users: [],
                    business_delivery: [], tracking: [], declined_offerts: this.declined_offerts, orderid: this.orderid,
                    businessid: this.businessid, statusbusiness: this.statusbusiness }).then(() => {
                    this.navCtrl.remove(currentIndex);
                });
            }
        }, err => this.showError());
    }
    goTracking(business_id, from, businessStatus = null) {
        this.presentLoadingTracking();
        let idOrder = localStorage.getItem("id_order");
        let idUser = localStorage.getItem("user_id");
        //Obtener Business Order y Offerts
        this.orderService.getBusinessesTracking(business_id)
            .subscribe(data => {
            if (data.error) {
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: data.error,
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.loading.dismiss();
                this.tracking = data['tracking'];
                this.business_users = data['business_users'];
                this.business_delivery = data['business_delivery'];
                this.statusbusiness = data["status_business"];
                let currentIndex = this.navCtrl.getActive().index;
                this.navCtrl.push(go_order_1.GoOrderPage, { from: from, tracking: this.tracking, business_users: this.business_users,
                    business_delivery: this.business_delivery, offerts: [], orderid: '',
                    declined_offerts: "", businessid: '', statusbusiness: this.statusbusiness }).then(() => {
                    this.navCtrl.remove(currentIndex);
                });
            }
        }, err => this.showError());
    }
    goMessages(business_id, action) {
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(message_detail_1.MessageDetailPage, { business_id: business_id, action: action }).then(() => {
        });
    }
    goLogin() {
        //Indicar de donde ingreso al Login para luego retornr a orders.
        this.navCtrl.push(login_1.LoginPage, { list_orders: true });
    }
    showmore(orderid) {
        document.getElementById('first-' + orderid).style.display = "none";
        document.getElementById('second-' + orderid).style.display = "block";
    }
    showless(orderid) {
        document.getElementById('first-' + orderid).style.display = "block";
        document.getElementById('second-' + orderid).style.display = "none";
    }
    presentOrderCodePrompt(order_id) {
        let alert = this.alertCtrl.create({
            title: 'Ingresa el Código de Envío',
            subTitle: 'El mismo te permitirá dar inicio al Proceso de EnvioEntregas',
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Código de 6 dígitos',
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancelo Ingresar Código');
                    }
                },
                {
                    text: 'Enviar',
                    handler: data => {
                        this.presentLoadingCodeStart();
                        let user_id = localStorage.getItem('user_id');
                        this.goOrderService.verifyStartCodeOrder(data.code, user_id, order_id)
                            .subscribe(data => {
                            if (data.error) {
                                this.loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                this.loading.dismiss();
                                let order_info = data['order'];
                                this.businesses = data['businesses'];
                                let user_id = data.user_id;
                                this.tokenService.sendChangeStatusPush(user_id, 'EN PROCESO', order_info.order_id).subscribe(console.log, console.log);
                                let currentIndex = this.navCtrl.getActive().index;
                                this.navCtrl.push(OrdersPage_1, { showTab: 'deliveries' }).then(() => {
                                    this.navCtrl.remove(currentIndex);
                                });
                            }
                        }, err => {
                            this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                                buttons: ['OK'],
                            }).present();
                        });
                    }
                }
            ]
        });
        alert.present();
    }
    presentFinalOrderCodePrompt(order_id) {
        let alert = this.alertCtrl.create({
            title: 'Ingresa el Código',
            subTitle: 'El mismo te permitirá dar como finalizada la EnvioEntrega',
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Código de 6 dígitos',
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancelo Ingresar Código');
                    }
                },
                {
                    text: 'Enviar',
                    handler: data => {
                        this.presentLoadingCodeFinish();
                        let user_id = localStorage.getItem('user_id');
                        this.goOrderService.verifyFinalCodeOrder(data.code, user_id, order_id)
                            .subscribe(data => {
                            if (data.error) {
                                this.loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                this.loading.dismiss();
                                let order_info = data['order'];
                                this.businesses = data['businesses'];
                                let user_id = data.user_id;
                                this.tokenService.sendChangeStatusPush(user_id, 'COMPLETADO', order_info.order_id).subscribe(console.log, console.log);
                                let currentIndex = this.navCtrl.getActive().index;
                                this.navCtrl.push(OrdersPage_1, { showTab: 'deliveries' }).then(() => {
                                    this.navCtrl.remove(currentIndex);
                                });
                            }
                        }, err => console.log(err) //toast.present()
                        );
                    }
                }
            ]
        });
        alert.present();
    }
    copy(val) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        const toast = this.toastCtrl.create({
            message: 'Copiado!',
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
    showError() {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, compruebe su conexión.',
            buttons: ['OK'],
        }).present();
    }
    presentLoadingCodeStart() {
        this.loading = this.loadingCtrl.create({
            content: 'Validando Código de Envío...'
        });
        this.loading.present();
    }
    presentLoadingCodeFinish() {
        this.loading = this.loadingCtrl.create({
            content: 'Validando Código de Entrega...'
        });
        this.loading.present();
    }
};
OrdersPage = OrdersPage_1 = __decorate([
    core_1.Component({
        selector: 'page-orders',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/orders/orders.html"*/'\n<ion-header>\n\n  <ion-navbar color="ee" hideBackButton>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="ee" *ngIf="logged"  [(ngModel)]="actions">\n    <ion-segment color="light">\n      <ion-segment-button value="send">\n        SOLICITADOS\n      </ion-segment-button>\n      <ion-segment-button value="delivery">\n        SOY DELIVERY\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content class="background">\n	<div padding  *ngIf="!logged" >\n		<ion-avatar item-start>\n			<div align="center">\n				<img src="assets/imgs/user_default.png" height="200px">\n			</div>\n		</ion-avatar>\n	\n\n		<button ion-button block color="ee" (tap)="goLogin();">INGRESAR</button>\n\n    <button ion-button block color="facebook" (tap)=\'loginWithFB()\'>\n      <ion-icon name="logo-facebook"></ion-icon> &nbsp; Ingresar con Facebook\n    </button>\n    <ion-footer>\n\n        <button class="bottom" ion-button clear full color="light" [navPush]="SigninPage">\n  				    No tienes cuenta? Registrate\n  			</button>\n\n    </ion-footer>\n	</div>\n\n    <div [ngSwitch]="actions"  *ngIf="logged">\n\n        <ion-list *ngSwitchCase="\'send\'">\n\n              <ion-card  class="background-card" *ngIf="orders.length == 0">\n                \n                <img src="assets/imgs/empty_orders.jpg"/>\n                <button ion-button color="dark" [navPush]="newOrderPage">¿Quieres Enviar algo?</button>\n              \n              </ion-card>\n\n\n            <ion-card class="background-card" *ngFor="let order of orders; let k = index">\n              <ion-card-content>\n                <!--ORDER NAME-->\n                <p class="title-card">\n                  <ion-icon color="ee" *ngIf="order.startPhoto" (tap)="viewPhoto(order)" ios="ios-camera-outline" md="md-camera"></ion-icon>\n                  {{order.name | uppercase}}\n                </p>\n                <!--DETAILS  -->\n                <p class="detail-text" *ngIf="order.description">\n                  <i>Detalle: {{order.description}}</i>\n                </p>\n                <!--CODES-->\n                <div *ngIf="order.status_order == \'aceptada\'">\n                  <p class="text-code"> CODIGO ENVIO (toca para copiar)</p>\n                  <p class="detail-title-card">\n                    <ion-badge color="light" class="order-code" (click)="copy(order.startCode)" item-middle>{{order.startCode | uppercase}} </ion-badge>\n                  </p>\n                </div>\n                <div *ngIf="order.status_order == \'en proceso\'">\n                  <p class="text-code"> CODIGO FINAL (toca para copiar)</p>\n                  <p class="detail-title-card" *ngIf="">\n                    <ion-badge color="light" class="order-code" (click)="copy(order.finishCode)" item-middle>{{order.finishCode | uppercase}}</ion-badge>\n                  </p>\n                </div>\n                <!--STATUS-->\n                <div class="status-container">\n                    <ion-icon name="options"></ion-icon> <label class="status-text">{{order.status_order | uppercase}}</label>\n                </div>\n                <!--FROM TO-->\n                <div class="row">\n                  <div class="col source-text">\n                    {{order.source.split(\',\')[0] | uppercase}}\n                  </div>\n                  <div class="col">\n                      <ion-icon class="icon-address" name="arrow-round-forward"></ion-icon>\n                  </div>\n                  <div class="col destination-text">\n                    {{order.destination.split(\',\')[0] | uppercase}}\n                  </div>\n                </div>\n                \n                <!-- DAY-->\n                <ion-item class="background-card">\n                  <p class="subtitle-card">\n                    DIA\n                  </p>  \n                  <ion-badge color="light" item-end> {{order.maxDeliveryDate | date}}</ion-badge>\n                </ion-item>\n                <!--HOUR-->\n                <ion-item class="background-card">\n                  <p class="subtitle-card">\n                    HORA\n                  </p>  \n                    <ion-badge color="light" item-end> POR LA {{order.mommentPickup | uppercase}}</ion-badge>\n                </ion-item>\n                <!--TRANSPORT-->\n                <ion-item class="background-card">\n                  <p class="subtitle-card">\n                    TRANSPORTE\n                  </p>  \n                  <ion-badge color="light" item-end> {{order.vehicle | uppercase}} </ion-badge>\n                </ion-item>\n                <!--BUTTON ACTIONS-->\n                <ion-item class="background-card"  *ngIf="order.status_order == \'en negociacion\'">\n                  <button ion-button outline icon-start color="ee"  (tap)="goOrder(order.order_id, \'orders\', \'offerts\')">\n                    <ion-icon name="list"></ion-icon>\n                    OFERTAS\n                  </button>\n                </ion-item>\n  \n                <ion-item class="background-card"  *ngIf="order.status_order != \'cargada\'">\n                  <button item-end ion-button outline icon-start color="ee"  (tap)="goOrder(order.order_id, \'orders\', \'tracking\', order.business_id)">\n                    <ion-icon name="locate"></ion-icon>\n                    SEGUIMIENTO\n                  </button>\n                </ion-item>\n                <!--COST-->\n                <ion-item class="background-card">\n                    <ion-badge color="ee" item-end> {{order.cost | currency:\'ARS\'}}</ion-badge>\n                </ion-item>\n              </ion-card-content>\n            </ion-card>\n       </ion-list> \n\n\n       <ion-list *ngSwitchCase="\'delivery\'">\n\n              <ion-card class="background-card" *ngIf="delivery_orders.length == 0">\n                \n                <img src="assets/imgs/empty_orders.jpg"/>\n                <button ion-button color="dark" [navPush]="newDeliveryNotifyPage">¿Quieres Llevar algo?</button>\n              \n              </ion-card>\n\n            <ion-card class="background-card" *ngFor="let order of delivery_orders; let k = index">\n              <ion-card-content>\n                <!--ORDER NAME-->\n                <p class="title-card">\n                    <ion-icon color="ee" *ngIf="order.startPhoto" (tap)="viewPhoto(order)" ios="ios-camera-outline" md="md-camera"></ion-icon>\n                      {{order.name | uppercase}}\n                </p>\n                  <!--DETAILS  -->\n                  <p class="detail-text" *ngIf="order.description">\n                    <i>Detalle: {{order.description}}</i>\n                  </p>\n                  <p class="subtitle-delivery-card" color="ee">\n                    Por {{order.fname | uppercase}} {{order.lname | uppercase}}\n                  </p>\n                  <!--RATING DELIVERY-->\n                  <div col="col center">\n                    <ion-icon *ngIf="order.avg_point >= 1" color="ee" name="star"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point > 0 && order.avg_point < 1" color="ee" name="star-half"></ion-icon>\n                    <ion-icon *ngIf="!order.avg_point" color="ee" name="star-outline"></ion-icon>\n\n                    <ion-icon *ngIf="order.avg_point >= 2" color="ee" name="star"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point > 1 && order.avg_point < 2" color="ee" name="star-half"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point <= 1" color="ee" name="star-outline"></ion-icon>\n\n                    <ion-icon *ngIf="order.avg_point >= 3" color="ee" name="star"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point > 2 && order.avg_point < 3" color="ee" name="star-half"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point <= 2" color="ee" name="star-outline"></ion-icon>\n\n                    <ion-icon *ngIf="order.avg_point >= 4" color="ee" name="star"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point > 3 && order.avg_point < 4" color="ee" name="star-half"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point <= 3" color="ee" name="star-outline"></ion-icon>\n\n                    <ion-icon *ngIf="order.avg_point == 5" color="ee" name="star"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point > 4 && order.avg_point < 5" color="ee" name="star-half"></ion-icon>\n                    <ion-icon *ngIf="order.avg_point <= 4" color="ee" name="star-outline"></ion-icon>\n\n                  </div>\n                <!--STATUS-->\n                <div class="status-container">\n                  <ion-icon name="options"></ion-icon> <label class="status-text">{{order.status_order | uppercase}}</label>\n                </div>\n                <!--FROM TO-->\n                <div class="row">\n                  <div class="col source-text">\n                    {{order.source.split(\',\')[0] | uppercase}}\n                  </div>\n                  <div class="col">\n                      <ion-icon class="icon-address" name="arrow-round-forward"></ion-icon>\n                  </div>\n                  <div class="col destination-text">\n                    {{order.destination.split(\',\')[0] | uppercase}}\n                  </div>\n                </div>\n                \n                <!-- DAY-->\n                <ion-item class="background-card">\n                  <p class="subtitle-card">\n                    DIA\n                  </p>  \n                  <ion-badge color="light" item-end> {{order.maxDeliveryDate | date}}</ion-badge>\n                </ion-item>\n                <!--HOUR-->\n                <ion-item class="background-card">\n                  <p class="subtitle-card">\n                    HORA\n                  </p>  \n                    <ion-badge color="light" item-end> POR LA {{order.mommentPickup | uppercase}}</ion-badge>\n                </ion-item>\n                <!--TRANSPORT-->\n                <ion-item class="background-card">\n                  <p class="subtitle-card">\n                    TRANSPORTE\n                  </p>  \n                  <ion-badge color="light" item-end> {{order.vehicle | uppercase}} </ion-badge>\n                </ion-item>\n                <!--ACTION BUTTONS-->\n                <ion-item class="background-card" *ngIf="order.status == \'aceptada\'" >\n                  <button item-end ion-button outline icon-start color="ee" (tap)="presentOrderCodePrompt(order.order_id)">\n                    INGRESAR CODIGO ENVIO\n                  </button>\n                </ion-item>\n                <ion-item class="background-card">\n                  <button item-end ion-button outline icon-start color="ee" (tap)="goMessages(order.business_id, \'delivery\')">\n                    <ion-icon name="list"></ion-icon>\n                    MENSAJES\n                  </button>\n                </ion-item>\n                <ion-item class="background-card" *ngIf="order.status == \'en proceso\'">\n                  <button item-end ion-button outline icon-start color="ee" (tap)="presentFinalOrderCodePrompt(order.order_id)">\n                    <ion-icon name="list"></ion-icon>\n                    INGRESAR CODIGO ENTREGA\n                  </button>\n                </ion-item>\n                <ion-item class="background-card">\n                  <button item-end ion-button outline icon-start color="ee" (tap)="goOrder(order.order_id, \'deliveries\', \'tracking\', order.business_id, order.status)">\n                    <ion-icon name="locate"></ion-icon>\n                    SEGUIMIENTO\n                  </button>\n                </ion-item>\n                <!--COST-->\n                <ion-item class="background-card">\n                    <ion-badge color="ee" item-end> {{order.cost | currency:\'ARS\'}}</ion-badge>\n                </ion-item>\n              </ion-card-content>                \n            </ion-card>\n        </ion-list>\n\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/orders/orders.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.AlertController,
        ionic_angular_1.ToastController,
        ionic_angular_1.LoadingController,
        ionic_angular_1.ModalController,
        ngx_1.Facebook,
        ionic_angular_1.Platform,
        ngx_2.FCM,
        goOrder_service_1.GoOrderService,
        token_service_1.TokenService])
], OrdersPage);
exports.OrdersPage = OrdersPage;
var OrdersPage_1;
//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const places_service_1 = __webpack_require__(192);
const ionic_angular_2 = __webpack_require__(5);
const new_city_1 = __webpack_require__(188);
let PlacesPage = class PlacesPage {
    constructor(alertCtrl, loadingCtrl, modalCtrl, placesService) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.placesService = placesService;
    }
    ionViewWillEnter() {
        this.title = 'SUCURSALES';
        this.user_id = localStorage.getItem('user_id');
        this.getAddress();
    }
    getAddress() {
        this.loadingAddress();
        this.placesService.getAddress(this.user_id)
            .subscribe(data => {
            this.loading.dismiss();
            if (data['error']) {
                this.showErrorAlert();
            }
            else {
                this.places = data['places'];
            }
        }, err => {
            this.loading.dismiss();
            this.showErrorAlert();
        });
    }
    deleteAddress(id) {
        this.loadingDelete();
        this.placesService.deleteAddress(id, this.user_id)
            .subscribe(data => {
            this.loading.dismiss();
            if (data['error']) {
                this.showErrorAlert();
            }
            else {
                this.getAddress();
            }
        }, err => {
            this.loading.dismiss();
            this.showErrorAlert();
        });
    }
    showErrorAlert() {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
            buttons: ['OK'],
        }).present();
    }
    addNew() {
        const modal = this.modalCtrl.create(new_city_1.NewCityPage, { isClient: true, user_id: this.user_id });
        modal.onWillDismiss(() => {
            this.getAddress();
        });
        modal.present();
    }
    loadingDelete() {
        this.loading = this.loadingCtrl.create({
            content: 'Eliminando'
        });
        this.loading.present();
    }
    loadingAddress() {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo sucursales...'
        });
        this.loading.present();
    }
};
PlacesPage = __decorate([
    core_1.Component({
        selector: 'page-places',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/places/places.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="ee">\n\n  	 <ion-title>{{title | uppercase}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="background">\n\n	<ion-card class="background-card">\n\n		<ion-card-header class="background-card">\n\n			¿ Como funciona ?\n\n		</ion-card-header>\n\n		<ion-card-content>\n\n			<h2 class="color-header-body">\n\n				Cuando cargues Pedidos, podras seleccionar a cual de ellas\n\n					debera pasar el Delivery a retirar el Pedido.\n\n			</h2> \n\n		</ion-card-content>\n\n	</ion-card>\n\n	<ion-list color="dark">\n\n		<ion-list-header color="dark">\n\n			Desliza a la izquierda para Eliminar\n\n		</ion-list-header>\n\n		<ion-item-sliding *ngFor="let place of places; let k = index"> \n\n			<ion-item item-start color="dark"> \n\n				<h4><b>{{place.address | uppercase}}</b></h4>\n\n			</ion-item>\n\n			<ion-item-options ion-end>\n\n				<button ion-button expandable color="danger" (click)="deleteAddress(place.id)">\n\n					<ion-icon name="trash"></ion-icon>\n\n				</button>\n\n			</ion-item-options>\n\n		</ion-item-sliding>\n\n	</ion-list>\n\n</ion-content>\n\n<ion-footer>\n\n	<button class="bottom" ion-button full color="ee" (click)="addNew();">\n\n		AGREGAR SUCURSAL\n\n	</button>\n\n</ion-footer>'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/places/places.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.AlertController,
        ionic_angular_1.LoadingController,
        ionic_angular_2.ModalController,
        places_service_1.PlacesService])
], PlacesPage);
exports.PlacesPage = PlacesPage;
//# sourceMappingURL=places.js.map

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const verify_code_1 = __webpack_require__(115);
const phone_service_1 = __webpack_require__(114);
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let PhoneNumberPage = class PhoneNumberPage {
    constructor(navCtrl, navParams, alertCtrl, phoneService, toast, loadingCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.phoneService = phoneService;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.title = 'INDIQUE SU CELULAR';
        this.SEND_OFFERT = false;
        if (navParams.get("send_offert")) {
            this.SEND_OFFERT = true;
        }
    }
    ionViewDidLoad() {
    }
    verifyPhoneNumber(parameter) {
        let phone = parameter.value.phone;
        let email = localStorage.getItem("email");
        let fname = localStorage.getItem("fname_logged");
        let lname = localStorage.getItem("lname_logged");
        let password = localStorage.getItem("password");
        if (phone == "") {
            let alert = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Debes indicar tu Celular',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (phone.length !== 10) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El número de celular en ARG es de 10 dígitos (incluído el código de área sin el 0 y el número sin el 15)',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            localStorage.setItem("phone", phone);
            var toastOK = this.toast.create({
                message: 'Vuelve atrás y modifica los datos. Un usuario con esos datos ya existe en la plataforma.',
                duration: 4000,
                position: 'middle'
            });
            this.loadingPhoneCode();
            this.phoneService.generatePhoneCode(phone, email, fname, lname, password)
                .subscribe(data => {
                if (this.platform.is('cordova')) {
                    data = JSON.parse(data.data);
                }
                this.loading.dismiss();
                if (data.error_phone) {
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Se ha producido un error creando el Usuario, intente con otros datos o mas tarde',
                        buttons: ['OK'],
                    });
                    alert.present();
                }
                else {
                    localStorage.setItem("user_id", data.id_user);
                    this.navCtrl.push(verify_code_1.VerifyCodePage, { send_offert: this.SEND_OFFERT });
                }
            }, err => {
                console.log(err);
                this.loading.dismiss();
                toastOK.present();
            });
        }
    }
    loadingPhoneCode() {
        this.loading = this.loadingCtrl.create({
            content: 'Generando Codigo de validacion...'
        });
        this.loading.present();
    }
};
PhoneNumberPage = __decorate([
    core_1.Component({
        selector: 'page-phone-number',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/phone-number/phone-number.html"*/'<!--\n  Generated template for the PhoneNumberPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n	<form #fPhoneNumber="ngForm">\n		<ion-card>\n			<ion-card-header>\n				<p class="normal_text">¿Cual es su Número de Celular ?</p>	\n				<ion-input  type="number" maxlength="10" placeholder="Ej. 3516548741 (10 dig.)" name="phone" ngModel #phone = "ngModel" ></ion-input>\n			</ion-card-header>\n			<ion-card-content>\n					<button ion-button block outline color="light" (click)="verifyPhoneNumber(fPhoneNumber);">Verificar</button>			\n			</ion-card-content>\n		\n		</ion-card>\n	</form>	\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/phone-number/phone-number.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        phone_service_1.PhoneServiceProvider,
        ionic_angular_1.ToastController,
        ionic_angular_1.LoadingController,
        ionic_angular_1.Platform])
], PhoneNumberPage);
exports.PhoneNumberPage = PhoneNumberPage;
//# sourceMappingURL=phone-number.js.map

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ngx_1 = __webpack_require__(25);
const ionic_angular_1 = __webpack_require__(5);
const from_1 = __webpack_require__(21);
let DeliveryService = class DeliveryService {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    checkUserForDelivery(email) {
        let data = {
            email: email
        };
        let url = `${Constants.API.URL}users/check`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
DeliveryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], DeliveryService);
exports.DeliveryService = DeliveryService;
//# sourceMappingURL=delivery.service.js.map

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(25);
const from_1 = __webpack_require__(21);
let DeliveryStep1Service = class DeliveryStep1Service {
    constructor(http, httpNative, platform) {
        this.http = http;
        this.httpNative = httpNative;
        this.platform = platform;
    }
    saveCalendarDelivery(userid, days_agenda) {
        let data = {
            userid: userid,
            days_agenda: days_agenda
        };
        let url = `${Constants.API.URL}delivery/scheduler`;
        if (this.platform.is('cordova')) {
            let headers = { 'Accept': 'application/json;charset=UTF-8' };
            this.httpNative.setDataSerializer('json');
            let apiCall = this.httpNative.post(url, data, headers);
            return from_1.from(apiCall);
        }
        else {
            let headers = new http_1.Headers({ 'Authorization': 'Bearer ' + window.localStorage.getItem('token') });
            let options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(url, data, options)
                .map((res) => { return res.json(); });
        }
    }
};
DeliveryStep1Service = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        ngx_1.HTTP,
        ionic_angular_1.Platform])
], DeliveryStep1Service);
exports.DeliveryStep1Service = DeliveryStep1Service;
//# sourceMappingURL=deliveryStep1Service.service.js.map

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = __webpack_require__(535);
const app_module_1 = __webpack_require__(539);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __webpack_require__(540);
const http_2 = __webpack_require__(17);
const ion2_calendar_1 = __webpack_require__(541);
const storage_1 = __webpack_require__(58);
const forms_1 = __webpack_require__(30);
const ngx_1 = __webpack_require__(423);
const core_1 = __webpack_require__(0);
const platform_browser_1 = __webpack_require__(55);
const ionic_angular_1 = __webpack_require__(5);
const app_component_1 = __webpack_require__(875);
const home_1 = __webpack_require__(85);
const tabs_1 = __webpack_require__(515);
const pre_login_1 = __webpack_require__(876);
const login_1 = __webpack_require__(32);
const pre_profile_1 = __webpack_require__(63);
const profile_1 = __webpack_require__(187);
const orders_1 = __webpack_require__(53);
const new_order_1 = __webpack_require__(42);
const transport_1 = __webpack_require__(524);
const source_1 = __webpack_require__(191);
const destination_1 = __webpack_require__(525);
const calendar_1 = __webpack_require__(526);
const price_1 = __webpack_require__(186);
const pre_order_1 = __webpack_require__(113);
const phone_number_1 = __webpack_require__(531);
const verify_code_1 = __webpack_require__(115);
const go_order_1 = __webpack_require__(28);
const search_1 = __webpack_require__(184);
const order_tracking_1 = __webpack_require__(877);
const payment_1 = __webpack_require__(193);
const signin_1 = __webpack_require__(62);
const messages_1 = __webpack_require__(117);
const message_detail_1 = __webpack_require__(65);
const landing_1 = __webpack_require__(878);
const notifications_1 = __webpack_require__(189);
const view_image_1 = __webpack_require__(87);
const delivery_1 = __webpack_require__(879);
const delivery_setp_1_1 = __webpack_require__(880);
const delivery_scheduler_1 = __webpack_require__(64);
const delivery_days_1 = __webpack_require__(519);
const new_city_1 = __webpack_require__(188);
const user_created_1 = __webpack_require__(190);
const places_1 = __webpack_require__(530);
const order_service_1 = __webpack_require__(37);
const geolocation_service_1 = __webpack_require__(86);
const login_service_1 = __webpack_require__(881);
const phone_service_1 = __webpack_require__(114);
const token_service_1 = __webpack_require__(38);
const handle_notification_service_1 = __webpack_require__(882);
const ngx_2 = __webpack_require__(25);
const ngx_3 = __webpack_require__(513);
const ngx_4 = __webpack_require__(514);
const ngx_5 = __webpack_require__(194);
const ngx_6 = __webpack_require__(26);
const ngx_7 = __webpack_require__(185);
const ngx_8 = __webpack_require__(88);
const ngx_9 = __webpack_require__(883);
const ngx_10 = __webpack_require__(884);
const ngx_11 = __webpack_require__(116);
const network_service_1 = __webpack_require__(885);
const delivery_service_1 = __webpack_require__(532);
const goOrder_service_1 = __webpack_require__(112);
const login_service_2 = __webpack_require__(529);
const messageDetail_service_1 = __webpack_require__(528);
const deliveryStep1Service_service_1 = __webpack_require__(533);
const deliveryScheduler_service_1 = __webpack_require__(518);
const delivery_days_service_1 = __webpack_require__(520);
const calendar_service_1 = __webpack_require__(527);
const notifications_service_1 = __webpack_require__(522);
const preProfile_service_1 = __webpack_require__(523);
const price_service_1 = __webpack_require__(516);
const profile_service_1 = __webpack_require__(517);
const newCity_service_1 = __webpack_require__(521);
const places_service_1 = __webpack_require__(192);
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            home_1.HomePage,
            tabs_1.TabsPage,
            pre_login_1.PreLoginPage,
            login_1.LoginPage,
            pre_profile_1.PreProfilePage,
            profile_1.ProfilePage,
            orders_1.OrdersPage,
            new_order_1.NewOrderPage,
            transport_1.TransportPage,
            source_1.SourcePage,
            destination_1.DestinationPage,
            calendar_1.CalendarPage,
            price_1.PricePage,
            pre_order_1.PreOrderPage,
            phone_number_1.PhoneNumberPage,
            verify_code_1.VerifyCodePage,
            go_order_1.GoOrderPage,
            search_1.SearchPage,
            order_tracking_1.OrderTrackingPage,
            payment_1.PaymentPage,
            signin_1.SigninPage,
            messages_1.MessagesPage,
            message_detail_1.MessageDetailPage,
            landing_1.LandingPage,
            notifications_1.NotificationsPage,
            view_image_1.ViewImagePage,
            delivery_1.DeliveryPage,
            delivery_setp_1_1.DeliveryStep1Page,
            delivery_scheduler_1.DeliverySchedulerPage,
            delivery_days_1.DeliveryDaysPage,
            new_city_1.NewCityPage,
            user_created_1.UserCreatedPage,
            places_1.PlacesPage
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpClientModule,
            http_2.HttpModule,
            ion2_calendar_1.CalendarModule,
            forms_1.FormsModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, { scrollAssist: false, autoFocusAssist: false }, {
                links: [
                    { loadChildren: '../pages/info-user/info-user.module#InfoUserPageModule', name: 'InfoUserPage', segment: 'info-user', priority: 'low', defaultHistory: [] }
                ]
            }),
            storage_1.IonicStorageModule.forRoot()
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            home_1.HomePage,
            tabs_1.TabsPage,
            pre_login_1.PreLoginPage,
            login_1.LoginPage,
            pre_profile_1.PreProfilePage,
            profile_1.ProfilePage,
            orders_1.OrdersPage,
            new_order_1.NewOrderPage,
            transport_1.TransportPage,
            source_1.SourcePage,
            destination_1.DestinationPage,
            calendar_1.CalendarPage,
            price_1.PricePage,
            pre_order_1.PreOrderPage,
            phone_number_1.PhoneNumberPage,
            verify_code_1.VerifyCodePage,
            go_order_1.GoOrderPage,
            search_1.SearchPage,
            order_tracking_1.OrderTrackingPage,
            payment_1.PaymentPage,
            signin_1.SigninPage,
            messages_1.MessagesPage,
            message_detail_1.MessageDetailPage,
            landing_1.LandingPage,
            notifications_1.NotificationsPage,
            view_image_1.ViewImagePage,
            delivery_1.DeliveryPage,
            delivery_setp_1_1.DeliveryStep1Page,
            delivery_scheduler_1.DeliverySchedulerPage,
            delivery_days_1.DeliveryDaysPage,
            new_city_1.NewCityPage,
            user_created_1.UserCreatedPage,
            places_1.PlacesPage
        ],
        providers: [
            ngx_3.StatusBar,
            ngx_4.SplashScreen,
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
            order_service_1.OrderServiceProvider,
            ngx_7.Geolocation,
            geolocation_service_1.GeolocationService,
            login_service_1.LoginServiceProvider,
            phone_service_1.PhoneServiceProvider,
            token_service_1.TokenService,
            handle_notification_service_1.HandleNotificationService,
            calendar_service_1.CalendarService,
            delivery_service_1.DeliveryService,
            deliveryScheduler_service_1.DeliverySchedulerService,
            newCity_service_1.NewCityService,
            delivery_days_service_1.DeliveryDaysService,
            deliveryStep1Service_service_1.DeliveryStep1Service,
            goOrder_service_1.GoOrderService,
            login_service_2.LoginService,
            messageDetail_service_1.MessageDetailService,
            notifications_service_1.NotificationService,
            preProfile_service_1.PreProfileService,
            price_service_1.PriceService,
            profile_service_1.ProfileService,
            places_service_1.PlacesService,
            ngx_8.Facebook,
            ngx_9.File,
            ngx_11.Camera,
            ngx_10.ImagePicker,
            ngx_5.Network,
            network_service_1.NetworkServiceProvider,
            ngx_6.FCM,
            ngx_2.HTTP,
            ngx_1.Deeplinks
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 291,
	"./af.js": 291,
	"./ar": 292,
	"./ar-dz": 293,
	"./ar-dz.js": 293,
	"./ar-kw": 294,
	"./ar-kw.js": 294,
	"./ar-ly": 295,
	"./ar-ly.js": 295,
	"./ar-ma": 296,
	"./ar-ma.js": 296,
	"./ar-sa": 297,
	"./ar-sa.js": 297,
	"./ar-tn": 298,
	"./ar-tn.js": 298,
	"./ar.js": 292,
	"./az": 299,
	"./az.js": 299,
	"./be": 300,
	"./be.js": 300,
	"./bg": 301,
	"./bg.js": 301,
	"./bm": 302,
	"./bm.js": 302,
	"./bn": 303,
	"./bn.js": 303,
	"./bo": 304,
	"./bo.js": 304,
	"./br": 305,
	"./br.js": 305,
	"./bs": 306,
	"./bs.js": 306,
	"./ca": 307,
	"./ca.js": 307,
	"./cs": 308,
	"./cs.js": 308,
	"./cv": 309,
	"./cv.js": 309,
	"./cy": 310,
	"./cy.js": 310,
	"./da": 311,
	"./da.js": 311,
	"./de": 312,
	"./de-at": 313,
	"./de-at.js": 313,
	"./de-ch": 314,
	"./de-ch.js": 314,
	"./de.js": 312,
	"./dv": 315,
	"./dv.js": 315,
	"./el": 316,
	"./el.js": 316,
	"./en-SG": 317,
	"./en-SG.js": 317,
	"./en-au": 318,
	"./en-au.js": 318,
	"./en-ca": 319,
	"./en-ca.js": 319,
	"./en-gb": 320,
	"./en-gb.js": 320,
	"./en-ie": 321,
	"./en-ie.js": 321,
	"./en-il": 322,
	"./en-il.js": 322,
	"./en-nz": 323,
	"./en-nz.js": 323,
	"./eo": 324,
	"./eo.js": 324,
	"./es": 325,
	"./es-do": 326,
	"./es-do.js": 326,
	"./es-us": 327,
	"./es-us.js": 327,
	"./es.js": 325,
	"./et": 328,
	"./et.js": 328,
	"./eu": 329,
	"./eu.js": 329,
	"./fa": 330,
	"./fa.js": 330,
	"./fi": 331,
	"./fi.js": 331,
	"./fo": 332,
	"./fo.js": 332,
	"./fr": 333,
	"./fr-ca": 334,
	"./fr-ca.js": 334,
	"./fr-ch": 335,
	"./fr-ch.js": 335,
	"./fr.js": 333,
	"./fy": 336,
	"./fy.js": 336,
	"./ga": 337,
	"./ga.js": 337,
	"./gd": 338,
	"./gd.js": 338,
	"./gl": 339,
	"./gl.js": 339,
	"./gom-latn": 340,
	"./gom-latn.js": 340,
	"./gu": 341,
	"./gu.js": 341,
	"./he": 342,
	"./he.js": 342,
	"./hi": 343,
	"./hi.js": 343,
	"./hr": 344,
	"./hr.js": 344,
	"./hu": 345,
	"./hu.js": 345,
	"./hy-am": 346,
	"./hy-am.js": 346,
	"./id": 347,
	"./id.js": 347,
	"./is": 348,
	"./is.js": 348,
	"./it": 349,
	"./it-ch": 350,
	"./it-ch.js": 350,
	"./it.js": 349,
	"./ja": 351,
	"./ja.js": 351,
	"./jv": 352,
	"./jv.js": 352,
	"./ka": 353,
	"./ka.js": 353,
	"./kk": 354,
	"./kk.js": 354,
	"./km": 355,
	"./km.js": 355,
	"./kn": 356,
	"./kn.js": 356,
	"./ko": 357,
	"./ko.js": 357,
	"./ku": 358,
	"./ku.js": 358,
	"./ky": 359,
	"./ky.js": 359,
	"./lb": 360,
	"./lb.js": 360,
	"./lo": 361,
	"./lo.js": 361,
	"./lt": 362,
	"./lt.js": 362,
	"./lv": 363,
	"./lv.js": 363,
	"./me": 364,
	"./me.js": 364,
	"./mi": 365,
	"./mi.js": 365,
	"./mk": 366,
	"./mk.js": 366,
	"./ml": 367,
	"./ml.js": 367,
	"./mn": 368,
	"./mn.js": 368,
	"./mr": 369,
	"./mr.js": 369,
	"./ms": 370,
	"./ms-my": 371,
	"./ms-my.js": 371,
	"./ms.js": 370,
	"./mt": 372,
	"./mt.js": 372,
	"./my": 373,
	"./my.js": 373,
	"./nb": 374,
	"./nb.js": 374,
	"./ne": 375,
	"./ne.js": 375,
	"./nl": 376,
	"./nl-be": 377,
	"./nl-be.js": 377,
	"./nl.js": 376,
	"./nn": 378,
	"./nn.js": 378,
	"./pa-in": 379,
	"./pa-in.js": 379,
	"./pl": 380,
	"./pl.js": 380,
	"./pt": 381,
	"./pt-br": 382,
	"./pt-br.js": 382,
	"./pt.js": 381,
	"./ro": 383,
	"./ro.js": 383,
	"./ru": 384,
	"./ru.js": 384,
	"./sd": 385,
	"./sd.js": 385,
	"./se": 386,
	"./se.js": 386,
	"./si": 387,
	"./si.js": 387,
	"./sk": 388,
	"./sk.js": 388,
	"./sl": 389,
	"./sl.js": 389,
	"./sq": 390,
	"./sq.js": 390,
	"./sr": 391,
	"./sr-cyrl": 392,
	"./sr-cyrl.js": 392,
	"./sr.js": 391,
	"./ss": 393,
	"./ss.js": 393,
	"./sv": 394,
	"./sv.js": 394,
	"./sw": 395,
	"./sw.js": 395,
	"./ta": 396,
	"./ta.js": 396,
	"./te": 397,
	"./te.js": 397,
	"./tet": 398,
	"./tet.js": 398,
	"./tg": 399,
	"./tg.js": 399,
	"./th": 400,
	"./th.js": 400,
	"./tl-ph": 401,
	"./tl-ph.js": 401,
	"./tlh": 402,
	"./tlh.js": 402,
	"./tr": 403,
	"./tr.js": 403,
	"./tzl": 404,
	"./tzl.js": 404,
	"./tzm": 405,
	"./tzm-latn": 406,
	"./tzm-latn.js": 406,
	"./tzm.js": 405,
	"./ug-cn": 407,
	"./ug-cn.js": 407,
	"./uk": 408,
	"./uk.js": 408,
	"./ur": 409,
	"./ur.js": 409,
	"./uz": 410,
	"./uz-latn": 411,
	"./uz-latn.js": 411,
	"./uz.js": 410,
	"./vi": 412,
	"./vi.js": 412,
	"./x-pseudo": 413,
	"./x-pseudo.js": 413,
	"./yo": 414,
	"./yo.js": 414,
	"./zh-cn": 415,
	"./zh-cn.js": 415,
	"./zh-hk": 416,
	"./zh-hk.js": 416,
	"./zh-tw": 417,
	"./zh-tw.js": 417
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 579;

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const phone_service_1 = __webpack_require__(114);
const verify_code_1 = __webpack_require__(115);
const token_service_1 = __webpack_require__(38);
const ngx_1 = __webpack_require__(88);
const order_service_1 = __webpack_require__(37);
const pre_profile_1 = __webpack_require__(63);
const ngx_2 = __webpack_require__(26);
let SigninPage = class SigninPage {
    constructor(events, navCtrl, navParams, alertCtrl, phoneService, tokenService, facebook, orderService, loadingCtrl, fcm, platform, modalCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.phoneService = phoneService;
        this.tokenService = tokenService;
        this.facebook = facebook;
        this.orderService = orderService;
        this.loadingCtrl = loadingCtrl;
        this.fcm = fcm;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.title = 'Nueva Cuenta';
        this.userData = null;
        this.isClient = false;
    }
    ionViewDidLoad() {
        this.places = [];
        if (this.navParams.get('email')) {
            this.email = this.navParams.get('email');
        }
    }
    //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Registrando...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============  
    signin(parameters) {
        let email = parameters.value.email;
        let password = parameters.value.password;
        let passwordOK = parameters.value.passwordOK;
        let fname = parameters.value.fname;
        let lname = parameters.value.lname;
        let phone = parameters.value.phone;
        const placesLocalStorage = localStorage.getItem('places');
        placesLocalStorage ? this.places = JSON.parse(placesLocalStorage) : this.places;
        //==========Email validate=============
        let email_validated = true;
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regExp.test(email)) {
            email_validated = false;
        }
        else {
            email_validated = true;
        }
        //==========End Email validate==========
        //==========password validate=============
        let password_validated = true;
        let regExp2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!regExp2.test(password)) {
            password_validated = false;
        }
        else {
            password_validated = true;
        }
        //==========End Email validate==========
        if (email == "" || password == "" || fname == "" || lname == "" || passwordOK == "") {
            let alert = this.alertCtrl.create({
                title: 'Atento!',
                subTitle: 'Los datos son obligatorios',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (password !== passwordOK) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Las contraseñas son diferentes',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (!email_validated) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Debes indicar un email válido',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (!password_validated) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'La contraseña debe contener números y letras con al menos 6 caracteres',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if (phone.length !== 10) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El número de celular en ARG es de 10 dígitos (incluído el código de área sin el 0 y el número sin el 15)',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            localStorage.setItem("email", email);
            localStorage.setItem("fname", fname);
            localStorage.setItem("lname", lname);
            localStorage.setItem("password", password);
            localStorage.setItem("phone", phone);
            this.presentLoadingDefault();
            this.phoneService.generatePhoneCode(phone, email, fname, lname, password, this.isClient, this.places)
                .subscribe(data => {
                if (this.platform.is('cordova')) {
                    data = JSON.parse(data.data);
                }
                this.loading.dismiss();
                if (data.error) {
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: data.error,
                        buttons: ['OK'],
                    });
                    alert.present();
                }
                else {
                    if (this.isClient) {
                        this.alertCtrl.create({
                            title: 'Bien!',
                            subTitle: 'No olvides de cargar la direccion de tus Sucursales en tu Perfil.',
                            buttons: ['OK'],
                        }).present();
                    }
                    localStorage.setItem("user_id", data.id_user);
                    this.navCtrl.push(verify_code_1.VerifyCodePage, { signin: true });
                }
            }, () => this.showErrorAlert());
        }
    }
    loginWithFB() {
        this.facebook.login(['email', 'public_profile']).then((response) => {
            this.facebook.api('me?fields=id,name,email,first_name, last_name, picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {
                    email: profile['email'],
                    first_name: profile['first_name'],
                    last_name: profile['last_name'],
                    picture: profile['picture_large']['data']['url'],
                    username: profile['name']
                };
                this.orderService.checkOrSaveUserFb(this.userData.username, this.userData.email, this.userData.picture, this.userData.first_name, this.userData.last_name)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    this.events.publish('user:logged', data, Date.now());
                    localStorage.setItem("logged", 'true');
                    localStorage.setItem("user_id", data['user'].id);
                    localStorage.setItem("email", data['user'].email);
                    localStorage.setItem("photo_fb", data['user'].photo);
                    localStorage.setItem("fname_logged", data['user'].fname);
                    localStorage.setItem("lname_logged", data['user'].lname);
                    localStorage.setItem("verified", data['user'].verified);
                    this.fcm.getAPNSToken().then(tokenKey => {
                        this.tokenService.saveToken(tokenKey, data['id'], 'ios').subscribe(console.log, console.log);
                    });
                    this.fcm.getToken().then(token => {
                        this.tokenService.saveToken(token, data['user'].id, 'android').subscribe(console.log, console.log);
                    }, (error) => {
                        console.log('error retrieving token: ' + error);
                    });
                    this.navCtrl.push(pre_profile_1.PreProfilePage);
                }, err => this.showErrorAlertFB(err));
            });
        });
    }
    showErrorAlert() {
        (this.loading) ? this.loading.dismiss() : this.loading;
        let alert = this.alertCtrl.create({
            title: 'Atención!',
            subTitle: 'Los datos concuerdan con un Usuario ya creado',
            buttons: ['OK'],
        });
        alert.present();
    }
    showErrorAlertFB(type) {
        if (type == 'ERROR_LOGIN') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error SERVICIO',
                subTitle: JSON.stringify(type),
                buttons: ['OK'],
            });
            alert.present();
        }
    }
};
SigninPage = __decorate([
    core_1.Component({
        selector: 'page-signin',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/signin/signin.html"*/'<!--\n  Generated template for the SigninPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content class="background">\n	<ion-list-header>\n			<ion-label>¿ Listo para EnvioEntregas ?</ion-label>\n	</ion-list-header>\n	<form #fSignin="ngForm">\n		<ion-list lines="full" class="ion-no-margin ion-no-padding">\n			<ion-item>\n				<ion-input  type="email" placeholder="Ingrese un email" name="email" [ngModel]="email" autocomplete="off"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input text-capitalize placeholder="su Nombre"  type="text" name="fname" ngModel #fname = "ngModel" ></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input text-capitalize  placeholder="su Apellido" type="text" name="lname" ngModel #lname = "ngModel" ></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input type="password" placeholder="Contraseña por numeros y letras" name="password" ngModel #password = "ngModel"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input type="password" placeholder="Confirmar contraseña" name="passwordOK" ngModel #passwordOK = "ngModel"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input type="number" placeholder="Ej. 3516548741 (10 dig.)" name="phone" ngModel #phone= "ngModel" ></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-label  class="form-text" color="light">Sos Restaurante / Comercio?</ion-label>\n				<ion-checkbox color="ee" slot="end"  name="isClient" [(ngModel)]="isClient"></ion-checkbox>\n			</ion-item>\n		</ion-list>\n	</form>\n\n	<ion-list-header text-wrap>\n		<span class="form-text">Indica si sos Restaurante o Comercio para poder cargar Pedidos que necesiten ser enviados a su Cliente.</span>\n	</ion-list-header>\n\n	\n		<button ion-button block color="light" (click)="signin(fSignin);">Aceptar</button>\n		<button ion-button block color="facebook" (click)=\'loginWithFB()\'>\n				<ion-icon name="logo-facebook"></ion-icon> &nbsp; Ingresar con Facebook\n		</button>\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/signin/signin.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        phone_service_1.PhoneServiceProvider,
        token_service_1.TokenService,
        ngx_1.Facebook,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.LoadingController,
        ngx_2.FCM,
        ionic_angular_1.Platform,
        ionic_angular_1.ModalController])
], SigninPage);
exports.SigninPage = SigninPage;
//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const profile_1 = __webpack_require__(187);
const delivery_scheduler_1 = __webpack_require__(64);
const notifications_1 = __webpack_require__(189);
const ngx_1 = __webpack_require__(116);
const preProfile_service_1 = __webpack_require__(523);
const user_created_1 = __webpack_require__(190);
const ngx_2 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
let PreProfilePage = PreProfilePage_1 = class PreProfilePage {
    constructor(navCtrl, navParams, modalCtrl, nav, camera, actionSheetCtrl, alertCtrl, preProfileService, loadingCtrl, plarform, fcm) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.nav = nav;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.preProfileService = preProfileService;
        this.loadingCtrl = loadingCtrl;
        this.plarform = plarform;
        this.fcm = fcm;
        this.title = '';
        this.hasChangeProfilePhoto = false;
        this.array_user = [];
        this.pushPage = notifications_1.NotificationsPage;
        if (this.navParams.get('action') == 'newuser') {
            this.modalCtrl.create(user_created_1.UserCreatedPage).present();
        }
    }
    ionViewWillEnter() {
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    switch (params.page) {
                        case 'goOrder':
                            this.navCtrl.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        let fname = localStorage.getItem('fname_logged');
        let lname = localStorage.getItem('lname_logged');
        this.rating = localStorage.getItem('rating');
        this.photo_fb = localStorage.getItem('photo_fb');
        this.photo = localStorage.getItem('photo');
        //Logica para mostrar Boton Correcto de Delivery  
        let isDeliveryStr = localStorage.getItem('isDelivery');
        (isDeliveryStr == 'true') ? this.isDelivery = true : this.isDelivery = false;
        if (fname !== null && lname !== null) {
            let title = fname.toUpperCase() + " " + lname.toUpperCase();
            this.title = title;
        }
    }
    //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Actualizando Foto...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    toAnotherPage(page) {
        let currentIndex = this.navCtrl.getActive().index;
        if (page == 'profile') {
            let fname = localStorage.getItem('fname_logged');
            let lname = localStorage.getItem('lname_logged');
            let email = localStorage.getItem('email');
            let phone = localStorage.getItem('phone');
            this.nav.push(profile_1.ProfilePage, { fname: fname, lname: lname, email: email, phone: phone }).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
        else {
            this.nav.push(notifications_1.NotificationsPage).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
    }
    takePhoto() {
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.hasChangeProfilePhoto = true;
        }, (err) => {
            // Handle error
            this.hasChangeProfilePhoto = false;
        });
    }
    getPhoto() {
        var options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetwidth: 1000,
            targetHeight: 1000,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.hasChangeProfilePhoto = true;
        }, (err) => {
            this.hasChangeProfilePhoto = false;
        });
    }
    presentChangeProfilePhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Quieres cambiar la Foto de Perfil?',
            buttons: [
                {
                    text: 'Tomar una Foto',
                    handler: () => {
                        this.takePhoto();
                    }
                },
                {
                    text: 'Elegir una Foto',
                    handler: () => {
                        this.getPhoto();
                    }
                },
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: () => {
                        console.log("cancelo change profile photo");
                    }
                }
            ]
        });
        actionSheet.present();
    }
    saveChangeProfilePhoto() {
        if (this.base64Image == "" || this.base64Image == null) {
            let alert = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "No ha subido ninguna nueva Foto",
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let user_id = localStorage.getItem("user_id");
            this.presentLoadingDefault();
            this.preProfileService.saveChangeProfilePhoto(this.base64Image, user_id)
                .subscribe(data => {
                if (this.plarform.is('cordova')) {
                    data = JSON.parse(data.data);
                }
                //usuario existente pero no verificado
                if (data.photo !== '') {
                    this.loading.dismiss();
                    this.photo = data.photo;
                    localStorage.setItem("photo", data.photo);
                    this.hasChangeProfilePhoto = false;
                    this.navCtrl.push(PreProfilePage_1);
                }
                else {
                    this.loading.dismiss();
                    this.showErrorAlert();
                }
            }, err => this.showErrorAlert(err));
        }
    }
    goDeliveryStep() {
        let userid = localStorage.getItem('user_id');
        this.navCtrl.push(delivery_scheduler_1.DeliverySchedulerPage, { user_id: userid });
    }
    showErrorAlert(err = null) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, vuelve a cargar la Foto.' + err,
            buttons: ['OK'],
        });
        alert.present();
    }
};
PreProfilePage = PreProfilePage_1 = __decorate([
    core_1.Component({
        selector: 'page-pre-profile',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/pre-profile/pre-profile.html"*/'<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content class="background">\n	<ion-card>\n		<ion-card-header>\n		  	<ion-thumbnail>\n				<div align="center" *ngIf="!photo && !photo_fb">\n					<img src="">	\n				</div>\n				\n				<div align="center" *ngIf="photo && !photo_fb">\n					<img src="https://envioentregas.com/storage/app/public/users/{{photo}}" *ngIf="!hasChangeProfilePhoto">\n					<img [src]="base64Image" *ngIf="hasChangeProfilePhoto">	\n				</div>\n\n				<div align="center" *ngIf="photo_fb">\n					<img src="{{photo_fb}}">\n				</div>\n			\n			</ion-thumbnail>\n		    \n		</ion-card-header>\n		<ion-card-content >\n			<button ion-button block outline color="light" (click)=\'presentChangeProfilePhoto()\' *ngIf="!hasChangeProfilePhoto">\n				ELEGIR FOTO DE PERFIL\n			</button>\n			<button ion-button block color="ee" *ngIf="hasChangeProfilePhoto" (click)=\'saveChangeProfilePhoto()\'>\n				GUARDAR FOTO DE PERFIL\n			</button>\n			<a >Has un sueldo extra</a>\n		    <button ion-button block  color="light" *ngIf="!isDelivery" (click)="goDeliveryStep();">\n		    	SER DELIVERY\n		    </button>\n		    <button ion-button block  color="light" *ngIf="isDelivery" (click)="goDeliveryStep();">\n		    	VER MI DISPONIBILIDAD DELIVERY\n		    </button>\n		</ion-card-content>\n	</ion-card>	  \n			\n	<ion-card>\n		<ion-card-header>\n			<button ion-button block outline color="light" (click)="toAnotherPage(\'profile\');">\n				IR A MI PERFIL\n			</button>\n		</ion-card-header>	\n		<ion-card-content>\n			<ion-list no-line>\n			    	<ion-item (tap)="toAnotherPage(\'profile\');">\n						\n						<ion-avatar item-start>\n					      <ion-icon name="list-box"></ion-icon>\n					    </ion-avatar>\n					    \n					    Recuerda tu Info\n					    <p>Puedes verificar tu Información Personal</p>    	\n			    	</ion-item>\n			    	<ion-item (tap)="toAnotherPage(\'notification\');">\n				    \n					    <ion-avatar item-start>\n					      <ion-icon name="notifications-outline"></ion-icon>\n					    </ion-avatar>\n					    \n					    Notificaciones\n					    <p>Elije sobre que quiere que te Notifiquemos</p>\n		  			\n		  			</ion-item>\n\n		  			<ion-item>\n				   \n					    <ion-avatar item-start>\n					      <ion-icon name="star"></ion-icon>\n					    </ion-avatar>\n					   \n					    Mi Reputación\n					    <!-- rating -->	\n					      <ion-icon *ngIf="rating >= 1" class="ee-icon" name="star"></ion-icon>\n					      <ion-icon *ngIf="rating > 0 && rating < 1" class="ee-icon" name="star-half"></ion-icon>\n					      <ion-icon *ngIf="!rating" class="ee-icon" name="star-half"></ion-icon>\n\n					      <ion-icon *ngIf="rating >= 2" class="ee-icon" name="star"></ion-icon>\n					      <ion-icon *ngIf="rating > 1 && rating < 2" class="ee-icon" name="star-half"></ion-icon>\n					      <ion-icon *ngIf="rating <= 1 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					      <ion-icon *ngIf="rating >= 3" class="ee-icon" name="star"></ion-icon>\n					      <ion-icon *ngIf="rating > 2 && rating < 3" class="ee-icon" name="star-half"></ion-icon>\n					      <ion-icon *ngIf="rating <= 2 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					      <ion-icon *ngIf="rating >= 4" class="ee-icon" name="star"></ion-icon>\n					      <ion-icon *ngIf="rating > 3 && rating < 4" class="ee-icon" name="star-half"></ion-icon>\n					      <ion-icon *ngIf="rating <= 3 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					      <ion-icon *ngIf="rating == 5" class="ee-icon" name="star"></ion-icon>\n					      <ion-icon *ngIf="rating > 4 && rating < 5" class="ee-icon" name="star-half"></ion-icon>\n					      <ion-icon *ngIf="rating <= 4 && rating > 0" class="ee-icon" name="star-outline"></ion-icon>\n\n					      <p  *ngIf="rating == null">NO HA SIDO CALIFICADO</p>\n  					\n  					</ion-item>\n\n\n			</ion-list>\n		</ion-card-content>\n	</ion-card>\n	\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/pre-profile/pre-profile.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.ModalController,
        ionic_angular_1.NavController,
        ngx_1.Camera,
        ionic_angular_1.ActionSheetController,
        ionic_angular_1.AlertController,
        preProfile_service_1.PreProfileService,
        ionic_angular_1.LoadingController,
        ionic_angular_1.Platform,
        ngx_2.FCM])
], PreProfilePage);
exports.PreProfilePage = PreProfilePage;
var PreProfilePage_1;
//# sourceMappingURL=pre-profile.js.map

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const deliveryScheduler_service_1 = __webpack_require__(518);
const ionic_angular_2 = __webpack_require__(5);
const delivery_days_1 = __webpack_require__(519);
const new_city_1 = __webpack_require__(188);
let DeliverySchedulerPage = class DeliverySchedulerPage {
    constructor(navParams, alertCtrl, loadingCtrl, deliverySchedulerService, toastCtrl, modalCtrl, navCtrl, platform) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.deliverySchedulerService = deliverySchedulerService;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.empty_scheduler = false;
    }
    ionViewWillEnter() {
        this.title = 'Disponibilidad';
        if (this.navParams.get('scheduler')) {
            this.schedulers = this.navParams.get('scheduler');
        }
        else {
            let user_id = localStorage.getItem('user_id');
            this.getScheduler(user_id);
        }
    }
    show(schedulerid, days) {
        this.days = days;
        document.getElementById('second-' + schedulerid).style.display = 'block';
    }
    hidden(schedulerid) {
        document.getElementById('second-' + schedulerid).style.display = 'none';
    }
    presentEditHours(schedulerid, day, startHour, finishHour) {
        const prompt = this.alertCtrl.create({
            title: 'Disponibilidad del ' + day,
            message: "Indica la hora desde y hasta si deseas editarlas",
            inputs: [
                {
                    name: 'startHour',
                    placeholder: 'hh:mm',
                    type: 'time',
                    value: startHour
                },
                {
                    name: 'finishHour',
                    placeholder: 'hh:mm',
                    type: 'time',
                    value: finishHour
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        let startHour = data.startHour;
                        let finishHour = data.finishHour;
                        if (startHour == "" || finishHour == "") {
                        }
                        else {
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    presentDeliveryDelete(city, deliveryid) {
        this.alertCtrl.create({
            title: 'Eliminar Ciudad',
            message: 'Está a punto de eliminar ' + city + '. Estás seguro?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Si',
                    handler: () => {
                        this.loadingDelete();
                        let user_id = localStorage.getItem('user_id');
                        this.deliverySchedulerService.deleteDelivery(user_id, deliveryid)
                            .subscribe(data => {
                            if (this.platform.is('cordova')) {
                                data = JSON.parse(data.data);
                            }
                            this.loading.dismiss();
                            if (data['error']) {
                                this.showErrorAlert();
                            }
                            else {
                                this.toastCtrl.create({
                                    message: 'Disponibilidad eliminada correctamente',
                                    duration: 3000
                                }).present();
                                this.getScheduler(user_id);
                            }
                        }, err => {
                            this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                                buttons: ['OK'],
                            }).present();
                        });
                    }
                }
            ]
        }).present();
    }
    getScheduler(userid) {
        this.loadingGetScheduler();
        this.deliverySchedulerService.getSchedulerDelivery(userid)
            .subscribe(data => {
            this.loading.dismiss();
            if (data.error) {
                this.showErrorAlert();
            }
            else {
                this.schedulers = data['schedulers'];
                if (this.schedulers.length === 0) {
                    this.empty_scheduler = true;
                }
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
            buttons: ['OK'],
        });
        alert.present();
    }
    showSchedulerDays(delivery) {
        const modal = this.modalCtrl.create(delivery_days_1.DeliveryDaysPage, { deliveryid: delivery });
        modal.present();
    }
    addNew() {
        const modal = this.modalCtrl.create(new_city_1.NewCityPage);
        modal.present();
    }
    loadingDelete() {
        this.loading = this.loadingCtrl.create({
            content: 'Eliminando'
        });
        this.loading.present();
    }
    loadingGetScheduler() {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo Disponibilidad...'
        });
        this.loading.present();
    }
};
DeliverySchedulerPage = __decorate([
    core_1.Component({
        selector: 'page-delivery-scheduler',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/delivery-scheduler/delivery-scheduler.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="ee">\n\n  	 <ion-title>{{title | uppercase}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="background">\n\n		<ion-card class="background-card">\n\n\n\n		<ion-card-header class="background-card">\n\n			¿ Como indicar la Disponibilidad ?\n\n		</ion-card-header>\n\n		\n\n		<ion-card-content>\n\n			<h2 class="color-header-body">\n\n				Agrega y configura las ciudades en la que estás disponible.\n\n				Asigna los días y el horario en cada una de ellas.\n\n			</h2> \n\n		</ion-card-content>\n\n		\n\n		</ion-card>\n\n		<ion-card class="background-card position-card" *ngIf="empty_scheduler">\n\n			<ion-card-header class="background-card center">\n\n				SIN CIUDADES AGREGADAS\n\n			</ion-card-header>\n\n			<ion-card-content class="center">\n\n			</ion-card-content>\n\n		</ion-card>\n\n	<ion-list color="dark">\n\n		<ion-item-sliding *ngFor="let scheduler of schedulers; let k = index"> \n\n			<ion-item item-start color="dark" (click)="showSchedulerDays(scheduler.id)" detail-push> \n\n				<h2><b>{{scheduler.city | uppercase}}</b></h2>\n\n				<p class="text-date" text-left><i>{{scheduler.updated_at}}</i></p>\n\n			</ion-item>\n\n			<ion-item-options color="dark" (ionSwipe)="presentDeliveryDelete(scheduler.city, scheduler.id)">\n\n					<button ion-button expandable (click)="presentDeliveryDelete(scheduler.city, scheduler.id)" color="danger">Eliminar</button>\n\n			</ion-item-options>\n\n		</ion-item-sliding>\n\n	</ion-list>\n\n</ion-content>\n\n<ion-footer>\n\n	<button class="bottom" ion-button full color="ee" (click)="addNew();">\n\n		AGREGAR CIUDAD\n\n	</button>\n\n</ion-footer>'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/delivery-scheduler/delivery-scheduler.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        ionic_angular_1.LoadingController,
        deliveryScheduler_service_1.DeliverySchedulerService,
        ionic_angular_1.ToastController,
        ionic_angular_2.ModalController,
        ionic_angular_1.NavController,
        ionic_angular_1.Platform])
], DeliverySchedulerPage);
exports.DeliverySchedulerPage = DeliverySchedulerPage;
//# sourceMappingURL=delivery-scheduler.js.map

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const messageDetail_service_1 = __webpack_require__(528);
const pre_order_1 = __webpack_require__(113);
const messages_1 = __webpack_require__(117);
const token_service_1 = __webpack_require__(38);
let MessageDetailPage = class MessageDetailPage {
    constructor(navCtrl, navParams, messageDetailService, alertCtrl, tokenService, loadingCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messageDetailService = messageDetailService;
        this.alertCtrl = alertCtrl;
        this.tokenService = tokenService;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.title = 'MENSAJES';
        this.messages = [];
        this.delivery_messages = [];
        this.USER_LOGGED = false;
        this.FROM_LOGIN = false;
        this.empty_messages = false;
        if (this.navParams.get('notifierDelivery')) {
            alert('Chatea con ' + this.navParams.get('notifierDelivery') + ' si precisa enviar algo');
        }
        if (navParams.get('business_id')) {
            this.idbusiness = navParams.get('business_id');
            this.action = navParams.get('action');
            this.status_order = navParams.get('status');
        }
    }
    ionViewWillEnter() {
        if (localStorage.getItem('logged') !== 'true') {
            this.navCtrl.push(messages_1.MessagesPage);
        }
        else {
            this.iduser = localStorage.getItem('user_id');
            this.getMessages(this.idbusiness);
        }
    }
    //===========LOADING CONTROLLER==============
    presentLoadingMessage() {
        this.loading = this.loadingCtrl.create({
            content: 'Enviando..'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    getMessages(idBusiness, action = null) {
        this.messageDetailService.getMessages(idBusiness)
            .subscribe(data => {
            if (data.messages == null) {
                this.empty_messages = true;
            }
            else {
                this.messages = data['messages'];
                this.empty_messages = false;
            }
        }, err => {
            this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                buttons: ['OK'],
            }).present();
        });
    }
    newMessages(businessId, from) {
        this.presentLoadingMessage();
        //por si regresa a la app, chequea LS
        if (localStorage.getItem("logged") == 'true') {
            let userId = localStorage.getItem('user_id');
            //enviar mensaje a usuario (save businesses)
            var to;
            if (this.message == null || this.message == '') {
                this.alertCtrl.create({
                    title: 'Atencion!',
                    subTitle: 'Debes escribir un mensaje',
                    buttons: ['OK'],
                }).present();
            }
            else {
                if (from == 'deliveries') {
                    to = 'user';
                }
                else {
                    to = 'delivery';
                }
                this.messageDetailService.newMessage(userId, this.message, to, businessId)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    this.loading.dismiss();
                    if (data.error) {
                        let alert = this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'No se ha podido Enviar el Mensaje, intente mas tarde',
                            buttons: ['OK'],
                        });
                        alert.present();
                    }
                    else {
                        //send new message notification
                        this.delivery_messages = data['results'];
                        this.getMessages(businessId);
                        this.tokenService.sendMessagePush(this.delivery_messages['id'], this.delivery_messages['fname'], this.delivery_messages['lname'], this.message, this.delivery_messages['business_id']).subscribe(console.log, console.log);
                        this.message = '';
                    }
                }, err => {
                    this.loading.dismiss();
                    this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                        buttons: ['OK'],
                    }).present();
                });
            }
        }
        else {
            this.navCtrl.pop();
            localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
            this.navCtrl.push(pre_order_1.PreOrderPage, { send_offert: true });
        }
    }
};
MessageDetailPage = __decorate([
    core_1.Component({
        selector: 'page-message-detail',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/message-detail/message-detail.html"*/'<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n\n  <div *ngIf="empty_messages && status_order !== \'cargada\'">\n    <p>\n      <i>\n      Comunicate con el Delivery de tu Pedido..  \n      </i>\n    </p>  \n  </div>\n\n  <div *ngIf="status_order == \'cargada\'">\n    <p>\n      <i>\n      Aún no se interesaron en tu Pedido..\n      </i>\n    </p>  \n  </div>\n  \n\n<div class="chatBubble" *ngFor="let message of messages;">\n\n  <!-- report_by in -->\n  <div class="chat-bubble left" *ngIf="iduser != message.report_by">\n    <span class="messenger" *ngIf="iduser != message.report_by">\n      <u>{{message.fname}} {{message.lname}}</u>\n    </span>\n    <br/>\n    <div class="message" *ngIf="iduser != message.report_by">{{message.messages}}</div>\n    <div class="message-detail" *ngIf="iduser != message.report_by">\n        <span *ngIf="iduser != message.report_by" class="date-message">{{message.date_message}}</span>\n    </div>\n  </div>\n  <!-- report_by out -->\n  <div class="chat-bubble right" *ngIf="iduser == message.report_by">\n    <span class="messenger" *ngIf="iduser == message.report_by">\n      <u>{{message.fname | uppercase}} {{message.lname | uppercase}} </u>\n    </span>\n    <br/>\n    <div class="message" *ngIf="iduser == message.report_by">{{message.messages}}</div>\n    <div class="message-detail" *ngIf="iduser == message.report_by">\n        <span *ngIf="iduser == message.report_by" class="date-message">{{message.date_message}}</span>\n    </div>\n  </div>\n\n  <hr>\n</div>\n\n</ion-content>\n<ion-footer id="btn-new-message" *ngIf="status_order !== \'cargada\'">\n  <ion-item>\n\n    <ion-textarea \n      [(ngModel)]="message"\n      class="textarea-message"\n      placeholder="Escribe algo..."\n      maxlength="90"\n      ngModel>\n    </ion-textarea>\n\n    <span item-right class="max-char">max 90</span>\n    <ion-icon *ngIf="action === \'delivery\'"\n      class="icon-ee"\n      name="send"\n      (click)="newMessages(idbusiness, \'deliveries\');" \n      item-right>\n    </ion-icon>\n\n    <ion-icon *ngIf="action === \'order\'"\n      class="icon-ee"\n      name="send"\n      (click)="newMessages(idbusiness, \'orders\');" \n      item-right>\n    </ion-icon>\n  \n  </ion-item> \n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/message-detail/message-detail.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        messageDetail_service_1.MessageDetailService,
        ionic_angular_1.AlertController,
        token_service_1.TokenService,
        ionic_angular_1.LoadingController,
        ionic_angular_1.Platform])
], MessageDetailPage);
exports.MessageDetailPage = MessageDetailPage;
//# sourceMappingURL=message-detail.js.map

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const search_1 = __webpack_require__(184);
const ngx_1 = __webpack_require__(185);
const new_order_1 = __webpack_require__(42);
const orders_1 = __webpack_require__(53);
const order_service_1 = __webpack_require__(37);
const go_order_1 = __webpack_require__(28);
const geolocation_service_1 = __webpack_require__(86);
const goOrder_service_1 = __webpack_require__(112);
const token_service_1 = __webpack_require__(38);
const login_1 = __webpack_require__(32);
const view_image_1 = __webpack_require__(87);
const Constants = __webpack_require__(14);
let HomePage = class HomePage {
    constructor(navCtrl, geolocation, navParams, zone, toastCtrl, orderService, loadingCtrl, alertController, geolocator, modalCtrl, goOrderService, tokenService, platform) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.zone = zone;
        this.toastCtrl = toastCtrl;
        this.orderService = orderService;
        this.loadingCtrl = loadingCtrl;
        this.alertController = alertController;
        this.geolocator = geolocator;
        this.modalCtrl = modalCtrl;
        this.goOrderService = goOrderService;
        this.tokenService = tokenService;
        this.platform = platform;
        this.title = 'BUSCA UN DELIVERY';
        this.geocoder = new google.maps.Geocoder;
        this.markers = [];
        this.latitudes = [];
        this.longitudes = [];
        this.coordinatesRepeated = false;
        this.orders = [];
        this.quantity_orders = 0;
        this.executed_times = 0;
        this.FLAG_ERROR_GEOLOCATION = false;
        this.listOrders = false;
        this.pushPage = new_order_1.NewOrderPage;
        if (this.navParams.get('list_orders')) {
            let from_login = true;
            this.showOrders(true, from_login);
        }
    }
    ionViewWillEnter() {
        this.user_id = localStorage.getItem('user_id');
        const notifierUserValue = localStorage.getItem('userAble');
        if (notifierUserValue !== undefined && notifierUserValue !== null) {
            this.alertController.create({
                title: 'ALGUIEN NECESITA AYUDA!',
                subTitle: `${notifierUserValue} necesita que le lleven su Pedido, lista las ordenes y busca la que creo él`,
                buttons: ['OK'],
            }).present();
            localStorage.removeItem('userAble');
        }
        if (Constants.DEBUG) {
            localStorage.setItem("lat", '' + Constants.DEBUG.LAT);
            localStorage.setItem("lng", '' + Constants.DEBUG.LNG);
            this.lat = Constants.DEBUG.LAT;
            this.lng = Constants.DEBUG.LNG;
            this.initMap();
        }
        else {
            this.geolocation.getCurrentPosition().then((resp) => {
                let lat = resp.coords.latitude;
                let lng = resp.coords.longitude;
                var latlng = [];
                latlng.push(lat, lng);
                localStorage.setItem("lat", '' + lat);
                localStorage.setItem("lng", '' + lng);
                this.initMap();
            })
                .catch((error) => {
                let toast = this.toastCtrl.create({
                    message: 'No se ha podido encontrar la ubicación actual',
                    duration: 2500
                });
                toast.present();
            });
        }
    }
    initMap() {
        if (!Constants.DEBUG) {
            this.lat = localStorage.getItem('lat');
            this.lng = localStorage.getItem('lng');
        }
        this.getAddressCurrentLocation(this.lat, this.lng);
        var point = { lat: +this.lat, lng: +this.lng };
        let divMap = document.getElementById('map-home');
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 13,
            disableDefaultUI: true,
            draggable: true,
            visible: true,
            zoomControl: true,
            gestureHandling: 'greedy',
            panControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
        });
        var icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        let marker = new google.maps.Marker({
            position: point,
            map: this.map,
            icon: icon
        });
        this.map.setCenter(point);
        this.getOrdersByCurrentLocation();
    }
    showOrders(show, from_login = false) {
        if (from_login) {
            this.getOrdersByCurrentLocation();
        }
        else {
            if (show) {
                this.listOrders = true;
                document.getElementById('map-home').style.display = 'none';
            }
            else {
                this.listOrders = false;
                document.getElementById('map-home').style.display = 'block';
                this.initMap();
            }
        }
    }
    showmore(orderid) {
        document.getElementById('first-' + orderid).style.display = "none";
        document.getElementById('second-' + orderid).style.display = "block";
    }
    showless(orderid) {
        document.getElementById('first-' + orderid).style.display = "block";
        document.getElementById('second-' + orderid).style.display = "none";
    }
    presentDeliveryConfirm(order) {
        this.user_order_id = order.user_id;
        this.order_id = order.id;
        let alert = this.alertController.create({
            title: 'Oferta para realizar Delivery',
            subTitle: 'Puedes proponer otra FECHA y COSTO. Luego, ' + order.fname.toUpperCase() + ' respondera a tu oferta',
            inputs: [
                {
                    name: 'maxDeliveryDate',
                    placeholder: '',
                    type: 'date',
                    value: order.maxDeliveryDate,
                },
                {
                    name: 'cost',
                    placeholder: 'Ingrese el Costo que le parezca..',
                    type: 'number',
                    value: order.cost,
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.presentPickAMommentConfirm(data);
                    }
                }
            ]
        });
        alert.present();
    }
    //for orders provides from Clients/Restaurantes
    presentDeliveryClientConfirm(order) {
        if (this.user_id) {
            let alert = this.alertController.create({
                title: 'Llevar Pedido',
                subTitle: 'Estás aceptando todas las condiciones del Pedido. ' + order.fname + ' ' + order.lname + ' va a ser notificado.',
                buttons: [
                    {
                        text: 'Me arrepentí',
                        role: 'cancel',
                        handler: () => { }
                    },
                    {
                        text: 'Aceptar',
                        handler: data => {
                            this.presentLoading();
                            // orderId, userId (creo la orden), deliveryId
                            this.goOrderService.acceptClientOrder(order.id, order.user_id, this.user_id)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                this.loading.dismiss();
                                if (data['order'] && data['business']) {
                                    this.order_info = data['order'];
                                    this.businesses = data['business'];
                                    let package_detail = data['package'];
                                    let fname_delivery = localStorage.getItem('fname_logged');
                                    let lname_delivery = localStorage.getItem('lname_logged');
                                    // send order accepted notification to the User
                                    this.tokenService.sendOrderAccepted(order.user_id, order.PackageName, fname_delivery, lname_delivery, package_detail.name).subscribe(console.log, console.log);
                                    this.navCtrl.setRoot(orders_1.OrdersPage, { showTab: 'deliveries' });
                                }
                                else {
                                    this.showError();
                                }
                            }, err => {
                                this.loading.dismiss();
                                this.showError();
                            });
                        }
                    }
                ]
            });
            alert.present();
        }
        else {
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(login_1.LoginPage, { home_accept_order: true }).then(() => {
                this.navCtrl.remove(currentIndex);
            });
        }
    }
    presentPickAMommentConfirm(input, re_offert = null) {
        var logged = false;
        let prompt = this.alertController.create({
            title: 'Indica en que momento puedes Retirar el Pedido!',
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
                    handler: data => {
                    }
                },
                {
                    text: "Aceptar",
                    handler: data => {
                        let mommentPickup = data;
                        this.presentPickAMommentFinalConfirm(input.maxDeliveryDate, mommentPickup, input.cost, re_offert);
                    }
                }
            ]
        });
        prompt.present();
    }
    viewPhoto(photoName) {
        let imageModal = this.modalCtrl.create(view_image_1.ViewImagePage, { img: photoName });
        imageModal.present();
    }
    presentPickAMommentFinalConfirm(maxDeliveryDate, mommentPickup, cost, re_offert = null) {
        var logged = false;
        let prompt = this.alertController.create({
            title: 'Ya terminamos.. ',
            message: '¿Que vehículo tienes?',
            inputs: [
                {
                    type: 'radio',
                    label: 'A pie',
                    value: 'caminando',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Bicicleta',
                    value: 'bicicleta',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Auto',
                    value: 'auto',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Voy en Colectivo',
                    value: 'colectivo',
                    name: 'vehicle'
                },
                {
                    type: 'radio',
                    label: 'Furgon/Camioneta',
                    value: 'furgon',
                    name: 'vehicle'
                }
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: data => {
                    }
                },
                {
                    text: "Enviar Oferta",
                    handler: data => {
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                            localStorage.setItem("vehicle", vehicle);
                        }
                        //por si regresa a la app, chequea LS
                        if (localStorage.getItem("logged") == 'true') {
                            logged = true;
                            let status = 'en negociacion';
                            let delivery_id = localStorage.getItem("user_id");
                            var vehicle = data;
                            this.loading = this.loadingCtrl.create({
                                content: 'Enviando Oferta...'
                            });
                            this.loading.present();
                            this.goOrderService.sendOffert(maxDeliveryDate, mommentPickup, cost, delivery_id, this.user_order_id, this.order_id, status, vehicle)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                this.loading.dismiss();
                                if (data.error) {
                                    let alert = this.alertController.create({
                                        title: 'Error',
                                        subTitle: data.error,
                                        buttons: ['OK'],
                                    });
                                    alert.present();
                                }
                                else {
                                    this.order_info = data['order'];
                                    this.businesses = data['businesses'];
                                    if (localStorage.getItem('new_offert_push').toString() === '1') {
                                        this.tokenService.sendOffertPush(this.user_order_id).subscribe(console.log, console.log);
                                    }
                                    let currentIndex = this.navCtrl.getActive().index;
                                    this.navCtrl.push(orders_1.OrdersPage, { showTab: 'deliveries' }).then(() => {
                                        localStorage.removeItem('orders_loaded');
                                        this.navCtrl.remove(currentIndex);
                                    });
                                }
                            }, err => this.errorSendOffert());
                        }
                        else {
                            let currentIndex = this.navCtrl.getActive().index;
                            this.navCtrl.push(login_1.LoginPage, { home_send_offert: true }).then(() => {
                                this.navCtrl.remove(currentIndex);
                            });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
    errorSendOffert() {
        (this.loading) ? this.loading.dismiss() : this.loading;
        this.toastCtrl.create({
            message: 'Ha Ocurrido un Error en la Conexion. Intente nuevamente!',
            duration: 3000,
            position: 'middle'
        }).present();
    }
    getOrdersByCurrentLocation() {
        let location = new google.maps.LatLng(+this.lat, +this.lng);
        let user_id = localStorage.getItem("user_id");
        let current_city = Constants.DEBUG ? Constants.DEBUG.CURRENT_CITY_OK : localStorage.getItem('current_city_ok');
        var icon = {
            url: "assets/icon/order.svg",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(current_city) > -1) {
            this.orderService.searchOrders(current_city, location, location, user_id, true)
                .subscribe(data => {
                (this.loading) ? this.loading.dismiss() : this.loading;
                this.orders = data['results'];
                this.orders_offerted = data['orders_offerted'];
                this.quantity_orders = this.orders.length;
                for (let m = 0; m < this.markers.length; m++) {
                    this.markers[m].setMap(null);
                }
                this.markers.length = 0;
                for (let i = 0; i < this.orders.length; i++) {
                    let coordinates = this.orders[i].coordinates;
                    let idorder = this.orders[i].id;
                    let name = this.orders[i].PackageName;
                    let source = this.orders[i].source;
                    let destination = this.orders[i].destination;
                    let cost = this.orders[i].cost;
                    let charge = this.orders[i].charge;
                    let maxDeliveryDate = this.orders[i].maxDeliveryDate;
                    let mommentPickup = this.orders[i].mommentPickup;
                    let fname = this.orders[i].fname;
                    let lname = this.orders[i].lname;
                    let id_user_order = this.orders[i].user_id;
                    let status = this.orders[i].status;
                    let username = this.orders[i].username;
                    let size = this.orders[i].size;
                    let weight = this.orders[i].weight;
                    let vehicle = this.orders[i].vehicle;
                    let statusbusiness = this.orders[i].statusbusiness;
                    let description = this.orders[i].description;
                    let isClient = this.orders[i].is_client;
                    let arr_coordinates = coordinates.split(";");
                    let coordinates_source = arr_coordinates[0];
                    let arr_coordinates_source = coordinates_source.split(",");
                    let lat = arr_coordinates_source[0];
                    if (lat)
                        lat = lat.replace("(", "");
                    let lng = arr_coordinates_source[1];
                    if (lng)
                        lng = lng.replace(")", "");
                    this.coordinatesRepeated = this.checkCoordinatesRepeat(lat, lng);
                    var point = { lat: +lat, lng: +lng };
                    var marker = new google.maps.Marker({
                        position: point,
                        map: this.map,
                        icon: icon,
                        zoom: 11
                    });
                    this.markers.push(marker);
                    this.map.setCenter(point);
                    var object = new search_1.SearchPage(this.navCtrl, this.navParams, this.zone, this.geolocator, this.orderService, this.toastCtrl, this.modalCtrl, this.loadingCtrl);
                    marker.addListener('click', function () {
                        object.navCtrl.push(go_order_1.GoOrderPage, { id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, mommentPickup: mommentPickup, fname: fname, lname: lname, id_user: id_user_order, status: status, username: username, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], business_declined: "", statusbusiness: statusbusiness, description: description, isClient: isClient });
                    });
                }
                if (!this.coordinatesRepeated) {
                    if (this.quantity_orders == 0) {
                        this.toastOrdersNotify(true);
                    }
                    else {
                        this.toastOrdersNotify(false);
                    }
                }
                localStorage.setItem('orders_loaded', 'yes');
                if (this.navParams.get('list_orders')) {
                    this.showOrders(true);
                }
            }, err => this.showError());
        }
        else {
            this.excludedPlaceAlert();
        }
    }
    getIfHasAnOffert(orderid) {
        let offerted = false;
        for (let i = 0; i < this.orders_offerted.length; i++) {
            if (this.orders_offerted[i].order_id == orderid) {
                offerted = true;
                i = this.orders_offerted.length;
            }
        }
        return offerted;
    }
    checkCoordinatesRepeat(lat, lng) {
        if (this.latitudes.includes(lat) && this.longitudes.includes(lng)) {
            this.latitudes.push(lat);
            this.longitudes.push(lng);
            return true;
        }
        this.latitudes.push(lat);
        this.longitudes.push(lng);
        return false;
    }
    showError() {
        localStorage.setItem('orders_loaded', 'no');
        (this.loading) ? this.loading.dismiss() : this.loading;
        this.alertController.create({
            title: 'Error',
            subTitle: 'Ha ocurrido un error, compruebe su conexión.',
            buttons: ['OK'],
        }).present();
    }
    getAddressCurrentLocation(lat, lng) {
        let location = new google.maps.LatLng(+lat, +lng);
        this.geocoder.geocode({ 'latLng': location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let current_city = results[0].address_components.filter(ac => ~ac.types.indexOf('locality'))[0].long_name;
                localStorage.setItem("current_city_ok", current_city);
            }
        });
    }
    toastOrdersNotify(nothing) {
        if (nothing) {
            this.toastCtrl.create({
                message: 'No tienes ninguna EnvioEntrega Cercana para llevar.',
                duration: 2500,
                position: 'middle',
                showCloseButton: true,
                closeButtonText: 'OK'
            }).present();
        }
        else {
            this.toastCtrl.create({
                message: 'Elije alguna EnvioEntrega para llevar y haz dinero.',
                duration: 2500,
                position: 'middle'
            }).present();
        }
    }
    alertAction(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type == 'delivery') {
                const alert = yield this.alertController.create({
                    message: 'Notificar a la gente que estoy Disponible para ser Delivery ahora mismo.',
                    buttons: [
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                            }
                        }, {
                            text: 'Aceptar',
                            handler: () => {
                                let messageLoading;
                                let messageToast;
                                if (type === 'delivery') {
                                    messageLoading = 'Notificando Usuarios de tu zona...';
                                    messageToast = 'Has notificado a los Usuarios de tu ciudad que quieres llevar Envios!';
                                }
                                else {
                                    messageLoading = 'Notificando a Usuarios Delivery de tu zona...';
                                    messageToast = 'Has notificado a Delivery Usuarios de tu ciudad!';
                                }
                                const loadingNotifier = this.loadingCtrl.create({
                                    content: messageLoading
                                });
                                const user_id = localStorage.getItem('user_id');
                                // .normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                                // TODO: Uncomment the bellow line when getting prod release.
                                //const current_city = localStorage.getItem('current_city_ok');
                                const current_city = 'Cordoba';
                                if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(current_city) > -1) {
                                    if (user_id) {
                                        loadingNotifier.present();
                                        this.orderService.getUsersByCurrentLocation(user_id, current_city).subscribe((data) => {
                                            this.usersByCurrentLocation = data['users'];
                                            let usersArrayParsed = [];
                                            for (let u = 0; u < this.usersByCurrentLocation.length; u++) {
                                                let user = this.usersByCurrentLocation[u];
                                                usersArrayParsed.push(user.user_id);
                                            }
                                            let fname = localStorage.getItem('fname_logged');
                                            let lname = localStorage.getItem('lname_logged');
                                            this.tokenService.sendNotifierPush(usersArrayParsed, type, fname, lname).subscribe(response => {
                                                loadingNotifier.present();
                                            }, err => {
                                                loadingNotifier.dismiss();
                                                this.alertController.create({
                                                    title: 'Error',
                                                    subTitle: 'Ha ocurrido un error al notificar. Compruebe su conexión',
                                                    buttons: ['OK'],
                                                }).present();
                                            }, () => {
                                                loadingNotifier.dismiss();
                                                this.toastCtrl.create({
                                                    message: messageToast,
                                                    duration: 3500
                                                }).present();
                                            });
                                        });
                                    }
                                    else {
                                        let currentIndex = this.navCtrl.getActive().index;
                                        this.navCtrl.push(login_1.LoginPage, { sendGeneralNotification: 'delivery' }).then(() => {
                                            this.navCtrl.remove(currentIndex);
                                        });
                                    }
                                }
                                else {
                                    this.excludedPlaceAlert();
                                }
                            }
                        }
                    ]
                });
                yield alert.present();
            }
            else {
                const alert = yield this.alertController.create({
                    message: 'Necesitas que alguien te <strong>lleve un Paquete</strong> ?',
                    buttons: [
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                            }
                        }, {
                            text: 'Aceptar',
                            handler: () => {
                                let messageLoading;
                                let messageToast;
                                if (type === 'delivery') {
                                    messageLoading = 'Notificando Usuarios de tu zona...';
                                    messageToast = 'Has notificado a los Usuarios de tu ciudad que quieres llevar Envios!';
                                }
                                else {
                                    messageLoading = 'Notificando a Usuarios Delivery de tu zona...';
                                    messageToast = 'Has notificado a Delivery Usuarios de tu ciudad!';
                                }
                                const loadingNotifier = this.loadingCtrl.create({
                                    content: messageLoading
                                });
                                const user_id = localStorage.getItem('user_id');
                                // const current_city = localStorage.getItem('current_city_ok').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                                const current_city = 'Cordoba';
                                if (Constants.EXCLUDE_PLACES.length === 0 || Constants.EXCLUDE_PLACES.indexOf(current_city) > -1) {
                                    if (user_id) {
                                        loadingNotifier.present();
                                        this.orderService.getUsersByCurrentLocation(user_id, current_city).subscribe((data) => {
                                            this.usersByCurrentLocation = data['users'];
                                            let usersArrayParsed = [];
                                            for (let u = 0; u < this.usersByCurrentLocation.length; u++) {
                                                let user = this.usersByCurrentLocation[u];
                                                usersArrayParsed.push(user.user_id);
                                            }
                                            let fname = localStorage.getItem('fname_logged');
                                            let lname = localStorage.getItem('lname_logged');
                                            this.tokenService.sendNotifierPush(usersArrayParsed, type, fname, lname).subscribe(response => {
                                                loadingNotifier.present();
                                            }, err => {
                                                loadingNotifier.dismiss();
                                                this.alertController.create({
                                                    title: 'Error',
                                                    subTitle: 'Ha ocurrido un error al notificar. Compruebe su conexión',
                                                    buttons: ['OK'],
                                                }).present();
                                            }, () => {
                                                loadingNotifier.dismiss();
                                                this.toastCtrl.create({
                                                    message: messageToast,
                                                    duration: 3500
                                                }).present();
                                            });
                                        });
                                    }
                                    else {
                                        let currentIndex = this.navCtrl.getActive().index;
                                        this.navCtrl.push(login_1.LoginPage, { sendGeneralNotification: 'user' }).then(() => {
                                            this.navCtrl.remove(currentIndex);
                                        });
                                    }
                                }
                                else {
                                    this.excludedPlaceAlert();
                                }
                            }
                        }
                    ]
                });
                yield alert.present();
            }
        });
    }
    excludedPlaceAlert() {
        this.alertController.create({
            title: ':( Lo Sentimos!',
            subTitle: 'Por el momento EnvioEntregas no esta disponible para tu ciudad',
            buttons: ['OK'],
        }).present();
    }
    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
    }
};
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/home/home.html"*/'<ion-content class="background">\n  <div id="map-home" class="full"></div>\n  \n  <ion-list *ngIf="listOrders">\n    <ion-card class="background-card" *ngFor="let order of orders; let k = index">\n      <ion-card-content>\n        <!--ORDER NAME-->\n        <p class="title-card">\n          <ion-icon color="ee" *ngIf="order.startPhoto" (tap)="viewPhoto(order.startPhoto)" ios="ios-camera-outline" md="md-camera"></ion-icon>\n          {{order.PackageName | uppercase}}\n        </p>\n        <!--DETAILS  -->\n        <p class="detail-text" *ngIf="order.description">\n          <i>Detalle: {{order.description}}</i>\n        </p>\n        \n        <!--FROM TO-->\n        <div class="row">\n          <div class="col source-text">\n            {{order.source.split(\',\')[0] | uppercase}}\n          </div>\n          <div class="col">\n              <ion-icon class="icon-address" name="arrow-round-forward"></ion-icon>\n          </div>\n          <div class="col destination-text">\n            {{order.destination.split(\',\')[0] | uppercase}}\n          </div>\n        </div>\n\n        <!-- DAY-->\n        <ion-item class="background-card">\n          <p class="subtitle-card">\n            DIA\n          </p>  \n          <ion-badge color="light" item-end> {{order.maxDeliveryDate | date}}</ion-badge>\n        </ion-item>\n        <!--HOUR-->\n        <ion-item class="background-card">\n          <p class="subtitle-card">\n            HORA\n          </p>  \n            <ion-badge color="light" item-end> POR LA {{order.mommentPickup | uppercase}}</ion-badge>\n        </ion-item>\n        <!--TRANSPORT-->\n        <ion-item class="background-card">\n          <p class="subtitle-card">\n            TRANSPORTE\n          </p>  \n          <ion-badge color="light" item-end> {{order.vehicle | uppercase}} </ion-badge>\n        </ion-item>\n        <ion-item class="background-card">\n          <button item-end ion-button outline icon-start color="ee" *ngIf="order.is_client == 1"  (tap)="presentDeliveryClientConfirm(order)">\n            <ion-icon name="locate"></ion-icon>\n            LLEVAR PEDIDO\n          </button>\n          <button item-end ion-button outline icon-start color="ee" *ngIf="order.is_client !== 1"  (tap)="presentDeliveryConfirm(order)">\n            <ion-icon name="locate"></ion-icon>\n            HACER OFERTA\n          </button>\n        </ion-item>\n      </ion-card-content>\n    </ion-card>\n  </ion-list> \n\n</ion-content>\n\n<ion-footer>\n  <ion-fab class="ion-fab-left" *ngIf="!listOrders">\n    <button ion-fab class="button-home">\n      <ion-icon name="more"></ion-icon>\n    </button>\n    <ion-fab-list side="top">\n      <button ion-fab class="button-home" *ngIf="orders.length > 0" (click)="showOrders(true)">\n        <ion-icon name="list"></ion-icon>\n      </button>\n        <button ion-fab class="button-home" (tap)="alertAction(\'delivery\')">\n          <ion-icon name="bicycle"></ion-icon>\n        </button>\n        <button ion-fab class="button-home" (tap)="alertAction(\'order\')">\n          <ion-icon name="cube"></ion-icon>\n        </button>\n    </ion-fab-list>\n  </ion-fab>\n\n  <ion-fab class="ion-fab-left" *ngIf="listOrders">\n    <button ion-fab class="button-home" (tap)="showOrders(false)">\n      <ion-icon name="pin"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-fab class="ion-fab-right"> \n    <button ion-fab class="button-home" (tap)="showOrders(false)">\n      <ion-icon name="refresh"></ion-icon>\n    </button>\n  </ion-fab>\n  \n</ion-footer>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ngx_1.Geolocation,
        ionic_angular_1.NavParams,
        core_1.NgZone,
        ionic_angular_1.ToastController,
        order_service_1.OrderServiceProvider,
        ionic_angular_1.LoadingController,
        ionic_angular_1.AlertController,
        geolocation_service_1.GeolocationService,
        ionic_angular_1.ModalController,
        goOrder_service_1.GoOrderService,
        token_service_1.TokenService,
        ionic_angular_1.Platform])
], HomePage);
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ngx_1 = __webpack_require__(185);
const ionic_angular_1 = __webpack_require__(5);
let GeolocationService = class GeolocationService {
    constructor(geolocation, alertCtrl, toastCtrl) {
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    getCurrentLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            let lat = resp.coords.latitude;
            let lng = resp.coords.longitude;
            var latlng = [];
            latlng.push(lat, lng);
            localStorage.setItem("lat", '' + lat);
            localStorage.setItem("lng", '' + lng);
        }).catch((error) => {
            let toast = this.toastCtrl.create({
                message: 'No se ha podido encontrar la ubicación actual',
                duration: 2500
            });
            toast.present();
        });
    }
};
GeolocationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ngx_1.Geolocation, ionic_angular_1.AlertController, ionic_angular_1.ToastController])
], GeolocationService);
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=geolocation.service.js.map

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
let ViewImagePage = class ViewImagePage {
    constructor(navParams) {
        this.navParams = navParams;
        this.orderImageURL = false;
    }
    ionViewDidLoad() {
        this.title = 'Producto a Enviar';
        this.orderImage = `https://envioentregas.com/storage/app/public/orders/${this.navParams.get('img')}`;
        this.orderName = this.navParams.get('name');
        this.orderDescription = this.navParams.get('description');
    }
};
ViewImagePage = __decorate([
    core_1.Component({
        selector: 'page-view-image',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/view-image/view-image.html"*/'<!--\n  Generated template for the ViewImagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n  <ion-card>\n    <img [src]="orderImage" />\n    <ion-card-header>\n      <ion-card-title>{{orderName | uppercase}}</ion-card-title>\n    </ion-card-header>\n    <ion-card-content *ngIf="orderDescription">\n      {{orderDescription}}\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/view-image/view-image.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavParams])
], ViewImagePage);
exports.ViewImagePage = ViewImagePage;
//# sourceMappingURL=view-image.js.map

/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(513);
const ngx_2 = __webpack_require__(514);
const tabs_1 = __webpack_require__(515);
const ngx_3 = __webpack_require__(194);
const ngx_4 = __webpack_require__(423);
const ngx_5 = __webpack_require__(26);
const go_order_1 = __webpack_require__(28);
const message_detail_1 = __webpack_require__(65);
const login_1 = __webpack_require__(32);
const orders_1 = __webpack_require__(53);
let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen, events, network, alertCtrl, deeplinks, fcm) {
        this.events = events;
        this.network = network;
        this.alertCtrl = alertCtrl;
        this.deeplinks = deeplinks;
        this.fcm = fcm;
        this.rootPage = tabs_1.TabsPage;
        platform.ready().then(() => {
            // Offline event
            this.events.subscribe('network:offline', () => {
                alert('network:offline ==> ' + this.network.type);
            }, err => {
                this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                    buttons: ['OK'],
                }).present();
            });
            // Online event
            this.events.subscribe('network:online', () => {
                alert('network:online ==> ' + this.network.type);
            }, err => {
                this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                    buttons: ['OK'],
                }).present();
            });
            statusBar.styleDefault();
            splashScreen.hide();
            if (typeof FCMPlugin != 'undefined') {
                this.fcm.onNotification().subscribe((data) => {
                    if (data.wasTapped) {
                        let params = JSON.parse(data.params);
                        switch (params.page) {
                            case 'orders':
                                this.nav.push(orders_1.OrdersPage);
                                break;
                            case 'goOrder':
                                this.nav.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                                break;
                            case 'messages':
                                this.nav.push(message_detail_1.MessageDetailPage, { business_id: params.business_id }).then(() => {
                                    let current = this.nav.getActiveChildNav();
                                    this.nav.remove(current);
                                });
                                break;
                            case 'login':
                                this.nav.push(login_1.LoginPage, { action: 'rating' }).then(() => {
                                    let current = this.nav.getActiveChildNav();
                                    this.nav.remove(current);
                                });
                                break;
                            case 'currentLocation':
                                this.alertCtrl.create({
                                    title: 'Ubicacion Actual',
                                    subTitle: `El delivery ha enviado su ubicación: ${params.address}`,
                                    buttons: ['OK'],
                                }).present();
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
            this.deeplinks.route({}).subscribe((match) => {
                console.log(JSON.stringify(match));
            }, (noMatch) => {
                console.log(noMatch);
            });
            // resume app from background
            platform.resume.subscribe(() => {
                this.fcm.onNotification().subscribe((data) => {
                    if (data.wasTapped) {
                        switch (data.page) {
                            case 'orders':
                                this.nav.push(orders_1.OrdersPage);
                                break;
                            case 'goOrder':
                                this.nav.push(go_order_1.GoOrderPage, { order_id: data.orderId, getOrder: true });
                                break;
                            case 'messages':
                                this.nav.push(message_detail_1.MessageDetailPage, { business_id: data.business_id }).then(() => {
                                    let current = this.nav.getActiveChildNav();
                                    this.nav.remove(current);
                                });
                                break;
                            case 'login':
                                this.nav.push(login_1.LoginPage, { action: 'rating' }).then(() => {
                                    let current = this.nav.getActiveChildNav();
                                    this.nav.remove(current);
                                });
                                break;
                            case 'currentLocation':
                                this.alertCtrl.create({
                                    title: 'Ubicacion Actual',
                                    subTitle: `El delivery ha enviado su ubicación: ${data.address}`,
                                    buttons: ['OK'],
                                }).present();
                                break;
                            default:
                                break;
                        }
                    }
                });
            });
            // pause app from background
            platform.pause.subscribe(() => {
                this.fcm.onNotification().subscribe((data) => {
                    if (data.wasTapped) {
                        switch (data.page) {
                            case 'orders':
                                this.nav.push(orders_1.OrdersPage);
                                break;
                            case 'goOrder':
                                this.nav.push(go_order_1.GoOrderPage, { order_id: data.order_id, getOrder: true });
                                break;
                            case 'messages':
                                this.nav.push(message_detail_1.MessageDetailPage, { business_id: data.business_id }).then(() => {
                                    let current = this.nav.getActiveChildNav();
                                    this.nav.remove(current);
                                });
                                break;
                            case 'login':
                                this.nav.push(login_1.LoginPage, { action: 'rating' }).then(() => {
                                    let current = this.nav.getActiveChildNav();
                                    this.nav.remove(current);
                                });
                                break;
                            case 'currentLocation':
                                this.alertCtrl.create({
                                    title: 'Ubicacion Actual',
                                    subTitle: `El delivery ha enviado su ubicación: ${data.address}`,
                                    buttons: ['OK'],
                                }).present();
                                break;
                            default:
                                break;
                        }
                    }
                });
            });
        });
    } // End Constructor
};
__decorate([
    core_1.ViewChild(ionic_angular_1.Nav),
    __metadata("design:type", ionic_angular_1.Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    core_1.Component({template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform,
        ngx_1.StatusBar,
        ngx_2.SplashScreen,
        ionic_angular_1.Events,
        ngx_3.Network,
        ionic_angular_1.AlertController,
        ngx_4.Deeplinks,
        ngx_5.FCM])
], MyApp);
exports.MyApp = MyApp;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const login_1 = __webpack_require__(32);
const pre_profile_1 = __webpack_require__(63);
const signin_1 = __webpack_require__(62);
/**
 * Generated class for the PreLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let PreLoginPage = class PreLoginPage {
    constructor(events, navCtrl, navParams, nav, alertCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loginPage = login_1.LoginPage;
        this.title = 'BIENVENIDO';
        this.SigninPage = signin_1.SigninPage;
    }
    ionViewWillEnter() {
        this.checkLogin();
    }
    checkLogin() {
        //verificamos si el usuario esta logeado
        //por si regresa a la app, chequea LS
        if (localStorage.getItem("logged") == 'true') {
            this.nav.push(pre_profile_1.PreProfilePage);
        }
    }
    toLoginPage() {
        if (localStorage.getItem("logged") == 'true') {
            this.nav.push(pre_profile_1.PreProfilePage);
        }
        else {
            this.nav.push(login_1.LoginPage);
        }
    }
};
PreLoginPage = __decorate([
    core_1.Component({
        selector: 'page-pre-login',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/pre-login/pre-login.html"*/'<!--\n  Generated template for the PreLoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-avatar item-start>\n	<div align="center">\n		<img src="assets/imgs/user_default.png" height="200px">\n	</div>\n</ion-avatar>	\n	<br>\n	<ion-list-header>\n		<p>Ingresa o Registrate para unirte</p>\n	</ion-list-header>		\n	\n	<ion-list>\n		<ion-item (click)="toLoginPage();">\n		    <ion-avatar item-start>\n		      <ion-icon name="walk"></ion-icon>\n		    </ion-avatar>\n		    <h2>Ingresar</h2>\n		    <p>Puedes hacerlo por Mail o Facebook</p>\n  		</ion-item>\n  		\n  		<ion-item (click)="toDeliveryPage();">\n		    <ion-avatar item-start>\n		      <ion-icon name="walk"></ion-icon>\n		    </ion-avatar>\n		    <h2>Ser Delivery</h2>\n		    <p>¿ Quieres tener un sueldo extra ?</p>\n  		</ion-item>\n\n		<ion-item [navPush]="SigninPage">\n		    <ion-avatar item-start>\n		      <ion-icon name="person-add"></ion-icon>\n		    </ion-avatar>\n		    <h2>Registrarme</h2>\n		    <p>Con tu Email o Facebook</p>\n  		</ion-item>\n	</ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/pre-login/pre-login.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Events, ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.NavController, ionic_angular_1.AlertController])
], PreLoginPage);
exports.PreLoginPage = PreLoginPage;
//# sourceMappingURL=pre-login.js.map

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const order_service_1 = __webpack_require__(37);
const payment_1 = __webpack_require__(193);
const orders_1 = __webpack_require__(53);
const token_service_1 = __webpack_require__(38);
/**
 * Generated class for the OrderTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let OrderTrackingPage = class OrderTrackingPage {
    constructor(navCtrl, navParams, alertCtrl, orderService, tokenService, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.orderService = orderService;
        this.tokenService = tokenService;
        this.platform = platform;
        this.title = 'Ofertas';
        this.label_date = '';
        this.order_info = this.navParams.get("order_info");
        this.businesses = this.navParams.get("businesses");
    }
    ionViewDidLoad() {
        console.log(this.order_info);
        console.log(this.businesses);
    }
    //Aceptar Orden desde Seguimiento desde el Usuario que ve sus Ordenes
    presentAcceptOrder(packageName, cost, idDelivery, idUser, idOrder, idBusiness) {
        let alert = this.alertCtrl.create({
            title: 'Aceptar Orden',
            subTitle: 'Te llegaran dos Codigos: Codigo de Envio al cual deberas darselo al Delivery cuando pase a retirar el Pedido. Y Codigo de Entrega, se lo indicaras al Destinatario para que se lo de al Delivery cuando éste entrege el Pedido.',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('se arrepintio');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        console.log('confirmo orden: ' + idDelivery + " " + idUser + " " + idOrder + " " + idBusiness);
                        this.orderService.acceptOrderPayment(packageName, cost, idDelivery, idUser, idOrder, idBusiness)
                            .subscribe(data => {
                            if (data.error) {
                                let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: data.error,
                                    buttons: ['OK'],
                                });
                                alert.present();
                            }
                            else {
                                // this.tokenService.sendAcceptPush(idDelivery).subscribe(console.log, console.log) 
                                this.navCtrl.push(payment_1.PaymentPage, { link_pay: data['link_pay'], packageName: packageName, cost: cost,
                                    idDelivery: idDelivery, idUser: idUser, idOrder: idOrder, idBusiness: idBusiness });
                                //this.showLinkPayment(data['link_pay']);
                                //this.navCtrl.setRoot(OrderTrackingPage); 
                            }
                        }, err => console.log(err));
                    }
                }
            ]
        });
        alert.present();
    }
    //Cancelar Orden desde Seguimiento desde el Usuario que ve sus Ordenes
    presentCancelOrder(orderId, deliveryId, userId, date, businessId) {
        let alert = this.alertCtrl.create({
            title: 'Cancelar Orden',
            subTitle: 'Una vez realizada la cancelación se notificará al Delivery',
            buttons: [
                {
                    text: 'Volver',
                    role: 'cancel',
                    handler: data => {
                        console.log('se arrepintio');
                    }
                },
                {
                    text: 'Cancelar Envío',
                    handler: data => {
                        //Comparamos si la fecha de retiro NO es HOY
                        let q = new Date();
                        let m = q.getMonth() + 1;
                        let d = q.getDay();
                        let y = q.getFullYear();
                        let date = new Date(y, m, d);
                        let dateDelivery = new Date(date);
                        if (date > dateDelivery) {
                            //cancela pedido
                            let currentId = localStorage.getItem("user_id");
                            this.orderService.cancelOrder(deliveryId, userId, orderId, businessId, currentId)
                                .subscribe(data => {
                                if (this.platform.is('cordova')) {
                                    data = JSON.parse(data.data);
                                }
                                if (data.error) {
                                    let alert = this.alertCtrl.create({
                                        title: 'Error',
                                        subTitle: 'Intentalo mas tarde',
                                        buttons: ['OK'],
                                    });
                                    alert.present();
                                }
                                else {
                                    this.navCtrl.push(orders_1.OrdersPage); //se cancelo el pedido, retornamos a Ordes
                                }
                            }, err => console.log(err));
                        }
                        else {
                            //no se puede cancelar el pedido
                            let alert = this.alertCtrl.create({
                                title: 'No vas a poder Cancelar',
                                subTitle: 'Debido a las Políticas y Condiciones de EnvioEntregas que usted ha aceptado, el Delivery transcurre HOY por lo tanto no es posible cancelarlo',
                                buttons: ['OK'],
                            });
                            alert.present();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    showLinkPayment(link) {
        let alert = this.alertCtrl.create({
            title: 'Pagar Delivery',
            subTitle: 'Pagar: ' + link,
            buttons: ['OK'],
        });
        alert.present();
    }
};
OrderTrackingPage = __decorate([
    core_1.Component({
        selector: 'page-order-tracking',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/order-tracking/order-tracking.html"*/'<!--\n  Generated template for the OrderTrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="ee">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-list-header>\n	    <p> Ofertas Propuestas - {{businesses[0].name}} </p>\n\n	    <p class="text-status">Desliza hacia la izq. para operar</p>\n	</ion-list-header>\n	<ion-list>\n		<ion-item-sliding #slidingItem *ngFor="let business of businesses">\n			<!-- Aca se cargaria de Orders -->\n		  <ion-item >\n\n		    <ion-avatar  item-end>\n		    	<img src="assets/imgs/profiles/{{business.photo}}">\n		    </ion-avatar>\n		    <!-- {{username <- user_id}} -->\n		    <p class="" item-end><ion-icon name="person"></ion-icon> {{business.username}} <br><h3 class="text-status">{{business.status | uppercase}}</h3></p>\n		    \n		    <!-- {{source, destination}} -->\n		    <p class="normal_text"><b class="text">Desde </b> {{business.source}} </p>	\n		    <p class="normal_text"><b class="text">Hasta </b> {{business.destination}} </p>\n\n		    <!-- {{vehiculo}} -->\n		    <p class="normal_text"> <b class="text">Vehículo </b><b>{{business.vehicle | uppercase}}</b> </p>\n		     <!-- {{weight}} -->\n		    <p class="normal_text"> <b class="text">Peso </b><b>{{business.weight}} g.</b> </p>\n		    <!-- {{finishDate}} -->\n		    \n		    <!-- {{finishDate}} -->\n		    <h2><p><ion-icon name="alarm"></ion-icon> <b class="text">{{business.date_proposal.split(\'-\')[2]}}/{{business.date_proposal.split(\'-\')[1]}}  </b></p></h2>\n		    <!--En que momento -->\n		    <p><ion-icon name="time"></ion-icon> <b class="text">{{business.momment_proposal}}  </b></p>\n		    <!-- {{cost}} -->\n 		    <p class="normal_text"><b>$</b>{{business.cost_proposal}}</p>\n		    \n		</ion-item>\n\n		  	<ion-item-options *ngIf="business.status_order == \'en negociacion\'; else actionsBlock" #actionsBlock>\n	      		<button ion-button color="green" (click)="presentAcceptOrder(business.name, business.cost_proposal, business.delivery_id, business.user_id, business.order_id, business.id)">Aceptar</button>\n	      		<button ion-button color="danger"(click)="presentCancelOrder(business.order_id, business.delivery_id, business.user_id, business.date_proposal, business.id)">Cancelar</button>\n	      		<button ion-button color="secondary"(click)="viewMessages()">Mensajes</button>\n	   		</ion-item-options>\n\n   		</ion-item-sliding>	\n	</ion-list>\n	<!-- Aca se cargarian las operaciones en Businesses-->\n  	<ion-list style="display:none">\n  		<ion-item *ngFor="let business of businesses">\n			<h2><b>{{business.username}}</b></h2>\n			<p class="normal_text">Día y Hora Delivery</p>\n		    <p class=""><b>{{business.date_proposal}}</b></p>\n		    <!-- {{Costo propuesto || Costo a pagar }} debe ser segun quien reporte  -->\n		    <p class="normal_text">Costo propuesto: <b>$ {{business.cost_proposal}}</b></p>\n		    \n		    <p class="" item-end>\n		    	<i>Actualizado día:</i><br>\n		    	<i>{{business.created_at}}</i>\n				<br>\n		    	{{business.status}}\n			</p>\n		</ion-item>\n  	</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/order-tracking/order-tracking.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        order_service_1.OrderServiceProvider,
        token_service_1.TokenService,
        ionic_angular_1.Platform])
], OrderTrackingPage);
exports.OrderTrackingPage = OrderTrackingPage;
//# sourceMappingURL=order-tracking.js.map

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const new_order_1 = __webpack_require__(42);
const search_1 = __webpack_require__(184);
let LandingPage = class LandingPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.title = '';
        this.pushPageOrder = new_order_1.NewOrderPage;
        this.pushPageSearch = search_1.SearchPage;
    }
    ionViewDidLoad() {
        this.title = '¿ Que elijes hacer ?';
    }
};
LandingPage = __decorate([
    core_1.Component({
        selector: 'page-landing',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/landing/landing.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="card-background-page">\n\n  <ion-card>\n    <img src="../assets/imgs/order.jpg"/>\n    <div class="card-title">¿ Necesitas Enviar un Paquete?</div>\n    <div align="right" class="card-subtitle"><button ion-button color="danger" [navPush]="pushPageOrder" class="button-ee" round>Cargar Pedido</button></div>\n  </ion-card>\n\n  <ion-card>\n    <img src="../assets/imgs/delivery2.jpg"/>\n    <div class="card-title">¿ Deseas llevar un Pedido y hacer dinero extra ?</div>\n    <div align="right" class="card-subtitle"><button ion-button color="danger" [navPush]="pushPageSearch" class="button-ee" round>Busca Pedidos</button></div>\n  </ion-card>\n\n  <button ion-button full class="button-ee" (click)=\'sendDataLogin(frmSignup);\'>CONSULTANOS</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/landing/landing.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams])
], LandingPage);
exports.LandingPage = LandingPage;
//# sourceMappingURL=landing.js.map

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const delivery_service_1 = __webpack_require__(532);
const signin_1 = __webpack_require__(62);
const delivery_scheduler_1 = __webpack_require__(64);
/**
 * Generated class for the ViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let DeliveryPage = class DeliveryPage {
    constructor(navCtrl, alertCtrl, loadingCtrl, deliveryService, platform) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.deliveryService = deliveryService;
        this.platform = platform;
    }
    ionViewDidLoad() {
        this.title = 'Ser Delivery';
    }
    //===========LOADING CONTROLLER==============
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Corroborando Usuario...'
        });
        this.loading.present();
    }
    //==========LOADING CONTROLLER=============
    checkUser(data) {
        let email = data.value.email;
        //==========Email validate=============
        let email_validated = true;
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regExp.test(email)) {
            email_validated = false;
        }
        else {
            email_validated = true;
        }
        //==========End Email validate=========
        if (email !== "") {
            if (!email_validated) {
                let alert = this.alertCtrl.create({
                    title: 'Validacion',
                    subTitle: "Debe indicar un email válido",
                    buttons: ['OK'],
                });
                alert.present();
            }
            else {
                this.presentLoadingDefault();
                this.deliveryService.checkUserForDelivery(email)
                    .subscribe(data => {
                    if (this.platform.is('cordova')) {
                        data = JSON.parse(data.data);
                    }
                    //usuario existente pero no verificado
                    if (data.error) {
                        this.loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Validacion',
                            subTitle: "El email no pertenece a ninguna cuenta. Deseas crearte una?",
                            buttons: [
                                {
                                    text: 'Si',
                                    handler: () => {
                                        this.navCtrl.push(signin_1.SigninPage);
                                    }
                                }, {
                                    text: 'Cancelar',
                                    handler: () => {
                                    }
                                }
                            ]
                        });
                        alert.present();
                    }
                    else if (data.error == 'ERROR_LOGIN') {
                        this.loading.dismiss();
                        this.showErrorAlert('ERROR_LOGIN');
                    }
                    else {
                        this.user_id = data['user'].id;
                        this.navCtrl.push(delivery_scheduler_1.DeliverySchedulerPage, { user_id: this.user_id });
                        this.loading.dismiss();
                    }
                }, err => {
                    this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                        buttons: ['OK'],
                    }).present();
                });
            }
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Validacion',
                subTitle: "Debe indicar email",
                buttons: ['OK'],
            });
            alert.present();
        }
    }
    showErrorAlert(type) {
        if (type == 'ERROR_LOGIN') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'El Usuario y/o Contraseña, son incorrectos',
                buttons: ['OK'],
            });
            alert.present();
        }
        else if ('ERROR_CODE_VERIFIED') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error. intenta nuevamente generando uno nuevo como lo hizo recién.',
                buttons: ['OK'],
            });
            alert.present();
        }
    }
};
DeliveryPage = __decorate([
    core_1.Component({
        selector: 'page-delivery',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/delivery/delivery.html"*/'<ion-content class="background">\n\n	<form #frmPreDelivery="ngForm" >\n\n		<ion-card>\n\n		  <ion-card-header>\n\n		    Se un Delivery constante\n\n		  </ion-card-header>\n\n\n\n		  <ion-card-content>\n\n		    <ion-list no-line>\n\n			    <ion-item>\n\n			    	<ion-input type="text" name="email" placeholder="indica el email de tu usuario" ngModel #email = "ngModel"></ion-input>\n\n			    </ion-item>\n\n			</ion-list>\n\n		    <a>Olvidaste tu cuenta? <b>Obten ayuda para ingresar</b></a>\n\n\n\n		    <button ion-button block outline color="light" (click)=\'checkUser(frmPreDelivery);\'>\n\n		    	Aceptar\n\n		    </button>\n\n\n\n		  	<p>o</p>\n\n\n\n		  	<button ion-button block color="facebook" (click)=\'loginWithFB()\'>\n\n		  		<ion-icon name="logo-facebook"></ion-icon> &nbsp; Continuar con Facebook\n\n		  	</button>\n\n\n\n		  </ion-card-content>\n\n			<button class="bottom" ion-button clear full color="light" [navPush]="SigninPage">\n\n				No tienes cuenta? Registrate\n\n			</button>\n\n		</ion-card>\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/delivery/delivery.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.AlertController,
        ionic_angular_1.LoadingController,
        delivery_service_1.DeliveryService,
        ionic_angular_1.Platform])
], DeliveryPage);
exports.DeliveryPage = DeliveryPage;
//# sourceMappingURL=delivery.js.map

/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const delivery_scheduler_1 = __webpack_require__(64);
const deliveryStep1Service_service_1 = __webpack_require__(533);
let DeliveryStep1Page = class DeliveryStep1Page {
    constructor(navCtrl, navParams, alertCtrl, deliveryStep1Service, zone, toastCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.deliveryStep1Service = deliveryStep1Service;
        this.zone = zone;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        //vars google autocomplete
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '', input2: '' };
        this.autocompleteItems = [];
        this.geocoder = new google.maps.Geocoder;
        if (this.navParams.get('user_id')) {
            this.user = this.navParams.get('user_id');
        }
    }
    ionViewWillEnter() {
        this.presentToast();
        this.title = 'Disponibilidad';
        this.days = [
            { day: 'lunes', startHour: '', finishHour: '', status: '' },
            { day: 'martes', startHour: '', finishHour: '', status: '' },
            { day: 'miercoles', startHour: '', finishHour: '', status: '' },
            { day: 'jueves', startHour: '', finishHour: '', status: '' },
            { day: 'viernes', startHour: '', finishHour: '', status: '' },
            { day: 'sabado', startHour: '', finishHour: '', status: '' },
            { day: 'domingo', startHour: '', finishHour: '', status: '' }
        ];
    }
    //functions autocomplete & update & select results Google
    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        // set autocomplete options
        var options = {
            input: this.autocomplete.input,
            types: ['cities'],
            componentRestrictions: { country: 'ar' },
        };
        this.GoogleAutocomplete.getPlacePredictions(options, (predictions, status) => {
            if (predictions) {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    }
    selectSearchResult(item) {
        var icon = {
            url: "assets/imgs/marker_moderno.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        this.autocompleteItems = [];
        this.autocomplete.input = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (status === 'OK' && results[0]) {
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                localStorage.setItem("city_calendar", results[0].geometry.location);
            }
        });
    }
    saveDeliveryCalendar() {
        var days_agenda = [];
        var flag_validate = false;
        if (this.days[0]['startHour'] !== "" && this.days[0]['finishHour'] !== "") {
            this.monCalendar = { day: 'lunes', startHour: this.days[0]['startHour'], finishHour: this.days[0]['finishHour'], status: '1' };
            if (this.days[0]['startHour'] < this.days[0]['finishHour']) {
                days_agenda.push(this.monCalendar);
                flag_validate = true;
                console.log(this.monCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[0]['day']);
                flag_validate = false;
            }
        }
        if (this.days[1]['startHour'] !== "" && this.days[1]['finishHour'] !== "") {
            this.tueCalendar = { day: 'martes', startHour: this.days[1]['startHour'], finishHour: this.days[1]['finishHour'], status: '1' };
            if (this.days[1]['startHour'] < this.days[1]['finishHour']) {
                days_agenda.push(this.tueCalendar);
                flag_validate = true;
                console.log(this.tueCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[1]['day']);
                flag_validate = false;
            }
        }
        if (this.days[2]['startHour'] !== "" && this.days[2]['finishHour'] !== "") {
            this.wedCalendar = { day: 'miercoles', startHour: this.days[2]['startHour'], finishHour: this.days[2]['finishHour'], status: '1' };
            if (this.days[2]['startHour'] < this.days[2]['finishHour']) {
                days_agenda.push(this.wedCalendar);
                flag_validate = true;
                console.log(this.wedCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[2]['day']);
                flag_validate = false;
            }
        }
        if (this.days[3]['startHour'] !== "" && this.days[3]['finishHour'] !== "") {
            this.thuCalendar = { day: 'jueves', startHour: this.days[3]['startHour'], finishHour: this.days[3]['finishHour'], status: '1' };
            if (this.days[3]['startHour'] < this.days[3]['finishHour']) {
                days_agenda.push(this.thuCalendar);
                flag_validate = true;
                console.log(this.thuCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[3]['day']);
                flag_validate = false;
            }
        }
        if (this.days[4]['startHour'] !== "" && this.days[4]['finishHour'] !== "") {
            this.friCalendar = { day: 'viernes', startHour: this.days[4]['startHour'], finishHour: this.days[4]['finishHour'], status: '1' };
            if (this.days[4]['startHour'] < this.days[4]['finishHour']) {
                days_agenda.push(this.friCalendar);
                flag_validate = true;
                console.log(this.friCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[4]['day']);
                flag_validate = false;
            }
        }
        if (this.days[5]['startHour'] !== "" && this.days[5]['finishHour'] !== "") {
            this.satCalendar = { day: 'sabado', startHour: this.days[5]['startHour'], finishHour: this.days[5]['finishHour'], status: '1' };
            if (this.days[5]['startHour'] < this.days[5]['finishHour']) {
                days_agenda.push(this.satCalendar);
                flag_validate = true;
                console.log(this.satCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[5]['day']);
                flag_validate = false;
            }
        }
        if (this.days[6]['startHour'] !== "" && this.days[6]['finishHour'] !== "") {
            this.sunCalendar = { day: 'domingo', startHour: this.days[6]['startHour'], finishHour: this.days[6]['finishHour'], status: '1' };
            if (this.days[6]['startHour'] < this.days[6]['finishHour']) {
                days_agenda.push(this.sunCalendar);
                flag_validate = true;
                console.log(this.sunCalendar);
            }
            else {
                this.showAlertErrorTime(this.days[6]['day']);
                flag_validate = false;
            }
        }
        let city = 'cordoba'; //localStorage.getItem('city_calendar');
        if (city !== '' && flag_validate) {
            this.deliveryStep1Service.saveCalendarDelivery(this.user, days_agenda)
                .subscribe(data => {
                if (this.platform.is('cordova')) {
                    data = JSON.parse(data.data);
                }
                if (data.error == 'EXIST') {
                    this.showErrorAlert(data.error);
                }
                else {
                    let scheduler = data['scheduler'];
                    let userid = data['user_id'];
                    this.navCtrl.push(delivery_scheduler_1.DeliverySchedulerPage, { user_id: userid, scheduler: scheduler });
                }
            }, err => {
                this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                    buttons: ['OK'],
                }).present();
            });
        }
        else {
            this.showErrorAlertCity();
        }
    }
    showErrorAlert(error = null) {
        if (error == 'EXIST') {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ya registro su Disponibilidad. Vaya a \'Mi Perfil\' para editarla si lo desea.',
                buttons: ['OK'],
            });
            alert.present();
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
                buttons: ['OK'],
            });
            alert.present();
        }
    }
    showErrorAlertCity() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Debes indicar la ciudad en la que estarás Disponible.',
            buttons: ['OK'],
        });
        alert.present();
    }
    showAlertErrorTime(day) {
        let alert = this.alertCtrl.create({
            title: 'Error en día ' + day.toUpperCase(),
            subTitle: 'La fecha hasta debe ser MAYOR con respecto a la fecha DESDE.',
            buttons: ['OK'],
        });
        alert.present();
    }
    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Indica Disponibilidad Desde y Hasta, solo de los días que puedas.',
            duration: 4500,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
};
DeliveryStep1Page = __decorate([
    core_1.Component({
        selector: 'page-delivery-step-1',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/delivery-step-1/delivery-step-1.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="ee">\n\n  	 <button start (click)="goBack();" id="go-back-go-order" style="display:none" class="button-back">\n\n		<ion-icon name="arrow-back" class="icon-back" > Volver</ion-icon>\n\n  	 </button>\n\n  	<ion-title>{{title | uppercase}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="background">\n\n		  <ion-list-header>\n\n		    Indica tu disponibilidad semanal.\n\n		  </ion-list-header>\n\n\n\n		  \n\n	      	<hr>\n\n	      	<hr>\n\n			<ion-item-group *ngFor="let day of days" color="dark">\n\n					\n\n			  <ion-item-divider color="ee">\n\n			   Día {{day.day | uppercase}}\n\n			  </ion-item-divider>\n\n			  	<ion-item>\n\n				  	<ion-label>Desde la Hora: </ion-label>\n\n					<ion-datetime displayFormat="HH:mm" [(ngModel)]="day.startHour"></ion-datetime>\n\n				</ion-item>\n\n			  \n\n				<ion-item>\n\n				   <ion-label>Hasta la Hora:  </ion-label>\n\n				   <ion-datetime displayFormat="HH:mm" [(ngModel)]="day.finishHour"></ion-datetime>  	\n\n				</ion-item>\n\n\n\n			</ion-item-group>\n\n\n\n\n\n		  	\n\n			<!--\n\n				<ion-footer>\n\n				<button class="bottom" ion-button full color="light" (click)="saveDeliveryCalendar(frmDeliveryCalendar);">\n\n					GUARDAR \n\n				</button>\n\n				<button class="bottom" ion-button full color="ee" (click)="saveDeliveryCalendar(frmDeliveryCalendar);">\n\n					GUARDAR Y CARGAR OTRA CIUDAD\n\n				</button>\n\n				</ion-footer>\n\n\n\n			-->\n\n</ion-content>\n\n<ion-footer>\n\n	<button ion-button block color="dark" (click)="saveDeliveryCalendar();">GUARDAR</button>\n\n</ion-footer>'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/delivery-step-1/delivery-step-1.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController,
        deliveryStep1Service_service_1.DeliveryStep1Service,
        core_1.NgZone,
        ionic_angular_1.ToastController,
        ionic_angular_1.Platform])
], DeliveryStep1Page);
exports.DeliveryStep1Page = DeliveryStep1Page;
//# sourceMappingURL=delivery-setp-1.js.map

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const http_1 = __webpack_require__(17);
__webpack_require__(22);
const Constants = __webpack_require__(14);
/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let LoginServiceProvider = class LoginServiceProvider {
    constructor(http) {
        this.http = http;
        this.api = 'https://envioentregas.com/api/';
        console.log('Hello LoginServiceProvider Provider');
    }
    login(parameters) {
        let email = parameters.email;
        let arr_email = email.split('@');
        let user_email = arr_email[0];
        let domain_email = arr_email[1];
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'signup/' + user_email + '/' + domain_email, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
    loginWithFacebook(userEmail, userName, userUid) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.get(Constants.API.URL + 'login/fb/' + userEmail + '/' + userName + '/' + userUid, {
            headers: headers,
            method: "GET"
        }).map((res) => { return res.json(); });
    }
};
LoginServiceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginServiceProvider);
exports.LoginServiceProvider = LoginServiceProvider;
//# sourceMappingURL=login-service.js.map

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ngx_1 = __webpack_require__(26);
const ionic_angular_1 = __webpack_require__(5);
const core_1 = __webpack_require__(0);
const go_order_1 = __webpack_require__(28);
const message_detail_1 = __webpack_require__(65);
let HandleNotificationService = class HandleNotificationService {
    constructor(fcm, app) {
        this.fcm = fcm;
        this.app = app;
    }
    catchTapNotification() {
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    console.log('params: ', params);
                    switch (params.page) {
                        case 'goOrder':
                            this.nav.push(go_order_1.GoOrderPage, { order_id: params.orderId, getOrder: true });
                            break;
                        case 'messages':
                            this.nav.push(message_detail_1.MessageDetailPage, { business_id: params.business_id });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
};
__decorate([
    core_1.ViewChild(ionic_angular_1.Nav),
    __metadata("design:type", ionic_angular_1.Nav)
], HandleNotificationService.prototype, "nav", void 0);
HandleNotificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ngx_1.FCM,
        ionic_angular_1.App])
], HandleNotificationService);
exports.HandleNotificationService = HandleNotificationService;
//# sourceMappingURL=handle-notification.service.js.map

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const ngx_1 = __webpack_require__(194);
/*
  Generated class for the NetworkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ConnectionStatusEnum;
(function (ConnectionStatusEnum) {
    ConnectionStatusEnum[ConnectionStatusEnum["Online"] = 0] = "Online";
    ConnectionStatusEnum[ConnectionStatusEnum["Offline"] = 1] = "Offline";
})(ConnectionStatusEnum = exports.ConnectionStatusEnum || (exports.ConnectionStatusEnum = {}));
let NetworkServiceProvider = class NetworkServiceProvider {
    constructor(alertCtrl, network, eventCtrl) {
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.eventCtrl = eventCtrl;
        this.online = navigator.onLine;
        console.log('Hello NetworkProvider Provider');
        this.previousStatus = ConnectionStatusEnum.Online;
    }
    initializeNetworkEvents() {
        this.network.onDisconnect().subscribe(() => {
            console.log("check network");
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                console.log("Network disconnected");
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            console.log("check network");
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                console.log("Network connected");
                this.eventCtrl.publish('network:online');
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        });
    }
};
NetworkServiceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.AlertController,
        ngx_1.Network,
        ionic_angular_1.Events])
], NetworkServiceProvider);
exports.NetworkServiceProvider = NetworkServiceProvider;
//# sourceMappingURL=network-service.js.map

/***/ })

},[534]);
//# sourceMappingURL=main.js.map