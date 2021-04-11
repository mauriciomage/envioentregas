var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CalendarModule } from "ion2-calendar";
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PreLoginPage } from '../pages/pre-login/pre-login';
import { LoginPage } from '../pages/login/login';
import { PreProfilePage } from '../pages/pre-profile/pre-profile';
import { ProfilePage } from '../pages/profile/profile';
import { OrdersPage } from '../pages/orders/orders';
import { NewOrderPage } from '../pages/new-order/new-order';
import { TransportPage } from '../pages/transport/transport';
import { SourcePage } from '../pages/source/source';
import { DestinationPage } from '../pages/destination/destination';
import { CalendarPage } from '../pages/calendar/calendar';
import { PricePage } from '../pages/price/price';
import { PreOrderPage } from '../pages/pre-order/pre-order';
import { PhoneNumberPage } from '../pages/phone-number/phone-number';
import { VerifyCodePage } from '../pages/verify-code/verify-code';
import { GoOrderPage } from '../pages/go-order/go-order';
import { SearchPage } from '../pages/search/search';
import { OrderTrackingPage } from '../pages/order-tracking/order-tracking';
import { PaymentPage } from '../pages/payment/payment';
import { SigninPage } from '../pages/signin/signin';
import { Geolocation } from '@ionic-native/geolocation';
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { GeolocationService } from '../services/geolocation.service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { PhoneServiceProvider } from '../providers/phone-service/phone-service';
import { TokenService } from '../services/token.service';
import { Facebook } from '@ionic-native/facebook';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                TabsPage,
                PreLoginPage,
                LoginPage,
                PreProfilePage,
                ProfilePage,
                OrdersPage,
                NewOrderPage,
                TransportPage,
                SourcePage,
                DestinationPage,
                CalendarPage,
                PricePage,
                PreOrderPage,
                PhoneNumberPage,
                VerifyCodePage,
                GoOrderPage,
                SearchPage,
                OrderTrackingPage,
                PaymentPage,
                SigninPage
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                HttpModule,
                CalendarModule,
                IonicModule.forRoot(MyApp),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                TabsPage,
                PreLoginPage,
                LoginPage,
                PreProfilePage,
                ProfilePage,
                OrdersPage,
                NewOrderPage,
                TransportPage,
                SourcePage,
                DestinationPage,
                CalendarPage,
                PricePage,
                PreOrderPage,
                PhoneNumberPage,
                VerifyCodePage,
                GoOrderPage,
                SearchPage,
                OrderTrackingPage,
                PaymentPage,
                SigninPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                OrderServiceProvider,
                Geolocation,
                GeolocationService,
                LoginServiceProvider,
                PhoneServiceProvider,
                TokenService,
                Facebook
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map