import { Component, ViewChild } from '@angular/core';
import { Platform, Events, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../pages/go-order/go-order';
import { MessageDetailPage } from '../pages/message-detail/message-detail';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';

declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  constructor(
  
    platform: Platform, 
    statusBar: StatusBar,
    splashScreen: SplashScreen, 
    private events: Events,
    private network: Network,
    private alertCtrl: AlertController,
    private deeplinks: Deeplinks,
    private fcm: FCM
  ) {

    platform.ready().then(() => {


            // Offline event
              this.events.subscribe('network:offline', () => {
                  alert('network:offline ==> '+this.network.type);    
              }, 
              err => {
                this.alertCtrl.create({
                  title : 'Error',
                  subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                  buttons: ['OK'],
                }).present();  
              });

              // Online event
              this.events.subscribe('network:online', () => {
                  alert('network:online ==> '+this.network.type);        
              }, 
              err => {
                this.alertCtrl.create({
                  title : 'Error',
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
              switch(params.page) {
                  case 'orders':
                    this.nav.push(OrdersPage);
                    break;
                  case 'goOrder':
                    this.nav.push(GoOrderPage, {order_id: params.orderId, getOrder: true});
                    break;
                  case 'messages':
                      this.nav.push(MessageDetailPage, {business_id: params.business_id}).then(() => {
                        let current = this.nav.getActiveChildNav();
                        this.nav.remove(current);
                      });
                    break;
                  case 'login':
                    this.nav.push(LoginPage, {action: 'rating'}).then(() => {
                      let current = this.nav.getActiveChildNav();
                      this.nav.remove(current);
                    });
                    break;
                  case 'currentLocation':
                    this.alertCtrl.create({
                      title : 'Ubicacion Actual',
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

      this.deeplinks.route({
      }).subscribe( (match) => {
        console.log(JSON.stringify(match))
      }, (noMatch) => {
        console.log(noMatch);
      });

      // resume app from background
      platform.resume.subscribe(() => {
        this.fcm.onNotification().subscribe((data) => {
          if (data.wasTapped) {
            switch(data.page) {
              case 'orders':
                  this.nav.push(OrdersPage);
                  break;
              case 'goOrder':
                  this.nav.push(GoOrderPage, {order_id: data.orderId, getOrder: true});
                  break;
              case 'messages':
                  this.nav.push(MessageDetailPage, {business_id: data.business_id}).then(() => {
                    let current = this.nav.getActiveChildNav();
                    this.nav.remove(current);
                  });
                break;
              case 'login':
                this.nav.push(LoginPage, {action: 'rating'}).then(() => {
                  let current = this.nav.getActiveChildNav();
                  this.nav.remove(current);
                });
                break;
              case 'currentLocation':
                this.alertCtrl.create({
                  title : 'Ubicacion Actual',
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
            switch(data.page) {
              case 'orders':
                  this.nav.push(OrdersPage);
                  break;
              case 'goOrder':
                  this.nav.push(GoOrderPage, {order_id: data.order_id, getOrder: true});
                  break;
              case 'messages':
                  this.nav.push(MessageDetailPage, {business_id: data.business_id}).then(() => {
                    let current = this.nav.getActiveChildNav();
                    this.nav.remove(current);
                  });
                break;
              case 'login':
                this.nav.push(LoginPage, {action: 'rating'}).then(() => {
                  let current = this.nav.getActiveChildNav();
                  this.nav.remove(current);
                });
                break;
              case 'currentLocation':
                this.alertCtrl.create({
                  title : 'Ubicacion Actual',
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
}
