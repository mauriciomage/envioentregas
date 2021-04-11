webpackJsonp([0],{

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const ionic_angular_1 = __webpack_require__(5);
const info_user_1 = __webpack_require__(887);
let InfoUserPageModule = class InfoUserPageModule {
};
InfoUserPageModule = __decorate([
    core_1.NgModule({
        declarations: [
            info_user_1.InfoUserPage,
        ],
        imports: [
            ionic_angular_1.IonicPageModule.forChild(info_user_1.InfoUserPage),
        ],
    })
], InfoUserPageModule);
exports.InfoUserPageModule = InfoUserPageModule;
//# sourceMappingURL=info-user.module.js.map

/***/ }),

/***/ 887:
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
let InfoUserPage = class InfoUserPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad InfoUserPage');
    }
};
InfoUserPage = __decorate([
    core_1.Component({
        selector: 'page-info-user',template:/*ion-inline-start:"/Users/mmage/projects/eeappOK/src/pages/info-user/info-user.html"*/'<!--\n  Generated template for the InfoUserPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>InfoUser</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mmage/projects/eeappOK/src/pages/info-user/info-user.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams])
], InfoUserPage);
exports.InfoUserPage = InfoUserPage;
//# sourceMappingURL=info-user.js.map

/***/ })

});
//# sourceMappingURL=0.js.map