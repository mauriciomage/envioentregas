import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { MessageDetailService } from './services/messageDetail.service';
import { PreOrderPage } from '../../pages/pre-order/pre-order';
import { MessagesPage } from '../../pages/messages/messages';
import {TokenService} from '../../services/token.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { GoOrderPage } from '../go-order/go-order';

declare var FCMPlugin;
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {
title:string = 'MENSAJES';
pushPage: any;

messages: any[] = [];
delivery_messages: any[] = [];
USER_LOGGED: Boolean = false;
FROM_LOGIN: Boolean = false;
idorder: number;
action: string;
iduser: string;
idbusiness: string;
empty_messages: Boolean = false;
status_order:string;
loading: any;
message: string;


  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public messageDetailService: MessageDetailService,
      public alertCtrl: AlertController,
      public tokenService: TokenService,
      private loadingCtrl: LoadingController,
      private platform: Platform
    ) {

    if(this.navParams.get('notifierDelivery')) {
      alert('Chatea con '+this.navParams.get('notifierDelivery')+ ' si precisa enviar algo');
    }
    if(navParams.get('business_id')){

      this.idbusiness = navParams.get('business_id');
      this.action = navParams.get('action');
      this.status_order = navParams.get('status');
    }

  }

  ionViewWillEnter() {
      if (localStorage.getItem('logged') !== 'true') {
        this.navCtrl.push(MessagesPage);
      } else {
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

    getMessages(idBusiness, action = null){
       this.messageDetailService.getMessages(idBusiness)
       .subscribe(
          data=>{
            if(data.messages == null){
              this.empty_messages = true;
            }else{
              this.messages = data['messages'];
              this.empty_messages = false;
            }
          },
          err => {
            this.alertCtrl.create({
              title : 'Error',
              subTitle: 'Ha ocurrido un error. Compruebe su conexión',
              buttons: ['OK'],
            }).present();  
          },
        );
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
              title : 'Atencion!',
              subTitle: 'Debes escribir un mensaje',
              buttons: ['OK'],
            }).present();
          } else {
            
            if (from == 'deliveries') {
              to = 'user';
            } else {
              to = 'delivery';
            }

            this.messageDetailService.newMessage(userId, this.message, to, businessId)
              .subscribe(
                data => {
                  if (this.platform.is('cordova')) {
                    data = JSON.parse(data.data);
                  }
                  this.loading.dismiss();
                  if(data.error){
                      let alert = this.alertCtrl.create({
                      title : 'Error',
                      subTitle: 'No se ha podido Enviar el Mensaje, intente mas tarde',
                      buttons: ['OK'],
                    });

                    alert.present();
                  }else{
                    //send new message notification
                    this.delivery_messages = data['results'];
                    this.getMessages(businessId);
                    this.tokenService.sendMessagePush(this.delivery_messages['id'], this.delivery_messages['fname'],
                    this.delivery_messages['lname'], this.message, this.delivery_messages['business_id']).subscribe(console.log, console.log)
                    this.message = '';
                  }
                },
                err => {
                  this.loading.dismiss();
                  this.alertCtrl.create({
                    title : 'Error',
                    subTitle: 'Ha ocurrido un error. Compruebe su conexión',
                    buttons: ['OK'],
                  }).present();  
                },
              );
          }
        } else {
          this.navCtrl.pop();
          localStorage.setItem("GO_PROVIDED_FROM_LOGIN", 'true');
          this.navCtrl.push(PreOrderPage, {send_offert: true});
        }
    }
}
