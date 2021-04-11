import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController, ToastController, NavController, Platform  } from 'ionic-angular';
import { PlacesService } from './services/places.service';
import { ModalController } from 'ionic-angular';
import { NewCityPage } from '../new-city/new-city';
declare var google:any;

@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})

export class PlacesPage {

	places: any[];
	loading: any;
  title: string;
  user_id;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private placesService: PlacesService
  ) {}

  ionViewWillEnter() {
    this.title = 'SUCURSALES'
    this.user_id = localStorage.getItem('user_id');
    this.getAddress();
    
  }

  getAddress(){
  	this.loadingAddress();
    
    this.placesService.getAddress(this.user_id)
  	.subscribe(
      data=>{
        this.loading.dismiss();
        if(data['error']){
           this.showErrorAlert();
        }else{
           this.places = data['places'];
        }

      },
      err => {
        this.loading.dismiss();
        this.showErrorAlert();
      }
    );	
  }

  deleteAddress(id) {
  	this.loadingDelete();
    
    this.placesService.deleteAddress(id, this.user_id)
  	.subscribe(
      data=>{
        this.loading.dismiss();
        if (data['error']) {
           this.showErrorAlert();
        }else {
           this.getAddress();
        }
      },
      err => {
        this.loading.dismiss();
        this.showErrorAlert();
      }
    );	
  }

  private showErrorAlert(){
    this.alertCtrl.create({
      title : 'Error',
      subTitle: 'Ha ocurrido un error en la conexión. Inténtalo nuevamente.',
      buttons: ['OK'],
    }).present();
  }	

  addNew(){
    const modal = this.modalCtrl.create(NewCityPage, {isClient: true, user_id: this.user_id});
    modal.onWillDismiss(() => {
      this.getAddress();
    });
    modal.present();
  }

  private loadingDelete() {
    this.loading = this.loadingCtrl.create({
      content: 'Eliminando'
    });
    this.loading.present();
  }
    
  private loadingAddress() {
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo sucursales...'
    });
    this.loading.present();
  }
}