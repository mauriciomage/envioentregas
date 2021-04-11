import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { NotificationService } from './services/notifications.service';
import { PreProfilePage } from '../pre-profile/pre-profile';
import { LoginPage } from '../login/login';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  title: string;
  notifications: any[] = [];
  messagesNotif:Boolean;
  offertNotif:Boolean;
  deliveriesNotif:Boolean;

  messagesEmail:Boolean;
  offertEmail:Boolean;
  deliveriesEmail:Boolean;

  messagesSMS:Boolean;
  offertSMS:Boolean;
  deliveriesSMS:Boolean;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public alertCtrl: AlertController,
    public notificationService: NotificationService,
    private plarform: Platform
  	) {
  }

  ionViewWillEnter() {
  	this.title = 'Notificaciones'

  	let user_id = localStorage.getItem("user_id");
	  this.getNotifications(user_id);

  }


  	getNotifications(user){
  		this.notificationService.getNotifications(user)
       .subscribe(
          data=>{
            if(data.error){
               let alert = this.alertCtrl.create({
                title : 'Error',
                subTitle: data.error,
                buttons: ['OK'],
              });

              alert.present(); 
            }else{
              this.notifications = data['results'];

              for(let f= 0 ; f<this.notifications.length; f++){
                const status = (this.notifications[f].status === 1) ? true : false 
                if(this.notifications[f].name == "new_messages"){
                	if (this.notifications[f].type == 'notification'){
                    this.messagesNotif = status;
                    }
                }
                else if(this.notifications[f].name == "offerts"){
                  	if (this.notifications[f].type == 'notification'){
                  		this.offertNotif = status;
                  	}
                }
                else if(this.notifications[f].name == "new_deliveries"){
                	if (this.notifications[f].type == 'notification') {
                		this.deliveriesNotif = status;
                  }
                }
              }
            }
          },  
          err => {
            this.alertCtrl.create({
              title : 'Error',
              subTitle: 'Ha ocurrido un error. Compruebe su conexión',
              buttons: ['OK'],
            }).present();  
          }
        );
  	}


    presentNotificationPrompt(){
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
              .subscribe(
                data=>{
                  if (this.plarform.is('cordova')) {
                    data = JSON.parse(data.data);
                  }
                  if(data.error){
                     let alert = this.alertCtrl.create({
                      title : 'Error',
                      subTitle: data.error,
                      buttons: ['OK'],
                    });

                    alert.present(); 
                  }else{
                    this.notifications = data['results'];
                    for (let n=0; n<this.notifications.length; n++) {
                      localStorage.setItem('new_messages_push', this.notifications[0].status);
                      localStorage.setItem('new_offert_push', this.notifications[1].status);
                      localStorage.setItem('new_delivery_push', this.notifications[2].status);
                    }
                    this.navCtrl.setRoot(LoginPage);
                  }
                },
                err=>this.showErrorAlert()
              );
          }
        }
      ]
    });
    confirm.present();  
    }

    public showErrorAlert(){
      let alert = this.alertCtrl.create({
          title : 'Atención!',
          subTitle: 'Los datos concuerdan con un Usuario ya creado',
          buttons: ['OK'],
        });
  
        alert.present();
    }
}	
