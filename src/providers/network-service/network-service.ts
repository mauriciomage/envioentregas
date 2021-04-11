import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';
/*
  Generated class for the NetworkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export enum ConnectionStatusEnum {
    Online,
    Offline
}

@Injectable()
export class NetworkServiceProvider {

  previousStatus;
  online: Boolean;

  constructor(public alertCtrl: AlertController, 
              public network: Network,
              public eventCtrl: Events) {

  	 this.online = navigator.onLine;
    console.log('Hello NetworkProvider Provider');

    this.previousStatus = ConnectionStatusEnum.Online;
    
  }

  public initializeNetworkEvents(): void {
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

}
