import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CalendarModule } from "ion2-calendar";
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { PreLoginPage  } from '../pages/pre-login/pre-login';
import { LoginPage  } from '../pages/login/login';
import { PreProfilePage  } from '../pages/pre-profile/pre-profile';
import { ProfilePage  } from '../pages/profile/profile';
import { OrdersPage  } from '../pages/orders/orders';
import { NewOrderPage  } from '../pages/new-order/new-order';
import { TransportPage  } from '../pages/transport/transport';
import { SourcePage  } from '../pages/source/source';
import { DestinationPage  } from '../pages/destination/destination';
import { CalendarPage  } from '../pages/calendar/calendar';
import { PricePage  } from '../pages/price/price';
import { PreOrderPage  } from '../pages/pre-order/pre-order';
import { PhoneNumberPage  } from '../pages/phone-number/phone-number';
import { VerifyCodePage  } from '../pages/verify-code/verify-code';
import { GoOrderPage } from '../pages/go-order/go-order';
import { SearchPage } from '../pages/search/search';
import { OrderTrackingPage } from '../pages/order-tracking/order-tracking';
import { PaymentPage } from '../pages/payment/payment';
import { SigninPage } from '../pages/signin/signin';
import { MessagesPage } from '../pages/messages/messages';
import { MessageDetailPage } from '../pages/message-detail/message-detail';
import { LandingPage } from '../pages/landing/landing';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ViewImagePage } from '../pages/view-image/view-image';
import { DeliveryPage } from '../pages/delivery/delivery';
import { DeliveryStep1Page } from '../pages/delivery-step-1/delivery-setp-1';
import { DeliverySchedulerPage } from '../pages/delivery-scheduler/delivery-scheduler';
import { DeliveryDaysPage } from '../pages/delivery-days/delivery-days';
import { NewCityPage } from '../pages/new-city/new-city';
import { UserCreatedPage } from '../pages/user-created/user-created';
import { PlacesPage } from '../pages/places/places';



import { OrderServiceProvider } from '../providers/order-service/order-service';
import { GeolocationService } from '../services/geolocation.service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { PhoneServiceProvider } from '../providers/phone-service/phone-service';
import { TokenService } from '../services/token.service'
import { HandleNotificationService } from '../services/handle-notification.service';


import { HTTP } from '@ionic-native/http/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx';


import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { DeliveryService } from '../pages/delivery/services/delivery.service';
import { GoOrderService } from '../pages/go-order/services/goOrder.service';
import { LoginService } from '../pages/login/services/login.service';
import { MessageDetailService } from '../pages/message-detail/services/messageDetail.service';
import { DeliveryStep1Service } from '../pages/delivery-step-1/services/deliveryStep1Service.service';
import { DeliverySchedulerService } from '../pages/delivery-scheduler/services/deliveryScheduler.service';
import { DeliveryDaysService } from '../pages/delivery-days/services/delivery-days.service';
import { CalendarService } from '../pages/calendar/services/calendar.service';
import { NotificationService } from '../pages/notifications/services/notifications.service';
import { PreProfileService } from '../pages/pre-profile/services/preProfile.service';
import { PriceService } from '../pages/price/services/price.service';
import { ProfileService } from '../pages/profile/services/profile.service';
import { NewCityService } from '../pages/new-city/services/newCity.service';
import { PlacesService } from '../pages/places/services/places.service';


@NgModule({
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
    SigninPage,
    MessagesPage,
    MessageDetailPage,
    LandingPage,
    NotificationsPage,
    ViewImagePage,
    DeliveryPage,
    DeliveryStep1Page,
    DeliverySchedulerPage,
    DeliveryDaysPage,
    NewCityPage,
    UserCreatedPage,
    PlacesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    CalendarModule,
    FormsModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot()
    
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
    SigninPage,
    MessagesPage,
    MessageDetailPage,
    LandingPage,
    NotificationsPage,
    ViewImagePage,
    DeliveryPage,
    DeliveryStep1Page,
    DeliverySchedulerPage,
    DeliveryDaysPage,
    NewCityPage,
    UserCreatedPage,
    PlacesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderServiceProvider,
    Geolocation,
    GeolocationService,
    LoginServiceProvider,
    PhoneServiceProvider,
    TokenService,
    HandleNotificationService,
    CalendarService,
    DeliveryService,
    DeliverySchedulerService,
    NewCityService,
    DeliveryDaysService,
    DeliveryStep1Service,
    GoOrderService,
    LoginService,        
    MessageDetailService,
    NotificationService,
    PreProfileService,
    PriceService,
    ProfileService,
    PlacesService,
    Facebook,
    File,
    Camera,
    ImagePicker,
    Network,
    NetworkServiceProvider,
    FCM,
    HTTP,
    Deeplinks
  ]
})
export class AppModule {}
