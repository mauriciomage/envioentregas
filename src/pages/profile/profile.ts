import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	title : string;
	phone_checked: number = 0;
  
  public fname: string;
  lname: string;
  email: string;
  phone: string;
  loading: any;  
  orders_completed: string;
  orders_cancelled: string;
  orders: string;
  orders_delivered: string;

  constructor(
    
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public alertCtrl: AlertController

  ) {
      this.title ='DATOS DE USUARIO';
    if(navParams.get('fname_logged') !== ""){
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

  getOrdersCounters(user){
       this.profileService.getCounters(user)
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

              this.orders_completed = data.orders_completed;
              this.orders_cancelled = data.orders_cancelled;
              this.orders = data.orders;
              this.orders_delivered = data.orders_delivered;

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
    };



  private killSession(){
    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');
    const current_city = localStorage.getItem('current_city_ok');

    localStorage.clear();
    localStorage.setItem('lat',lat);
    localStorage.setItem('lng',lng);
    localStorage.setItem('current_city_ok',current_city);

    this.navCtrl.setRoot(LoginPage);
  }
}
