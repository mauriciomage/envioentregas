import { FCM } from "@ionic-native/fcm/ngx";
import { App, Nav } from "ionic-angular";
import { Injectable, ViewChild } from "@angular/core";
import { GoOrderPage } from "../pages/go-order/go-order";
import { MessageDetailPage } from "../pages/message-detail/message-detail";


declare var FCMPlugin;
@Injectable()

export class HandleNotificationService{
    @ViewChild(Nav) nav: Nav;	
	constructor(
        private fcm: FCM,
        private app: App
    ){}

    catchTapNotification(): any {
        if (typeof FCMPlugin != 'undefined') {
            this.fcm.onNotification().subscribe((data) => {
                if (data.wasTapped) {
                    let params = JSON.parse(data.params);
                    console.log('params: ', params);
                    switch(params.page) {
                        case 'goOrder':
                            this.nav.push(GoOrderPage, {order_id: params.orderId, getOrder: true});
                            break;
                        case 'messages':
                            this.nav.push(MessageDetailPage, {business_id: params.business_id});
                          break;  
                        default:
                        break;
                    }
                }
            });
          }
    }
}