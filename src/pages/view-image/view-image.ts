import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-view-image',
  templateUrl: 'view-image.html',
})
export class ViewImagePage {
	orderImage: string;
  title:string;
  orderName: string;
  orderDescription: string;
  orderImageURL: Boolean = false;
  constructor(private navParams: NavParams) { }

  ionViewDidLoad() {
    this.title = 'Producto a Enviar';
    this.orderImage =  `https://envioentregas.com/storage/app/public/orders/${this.navParams.get('img')}`;
    this.orderName = this.navParams.get('name');
    this.orderDescription = this.navParams.get('description');
  }
}
