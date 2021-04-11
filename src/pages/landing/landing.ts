import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewOrderPage } from '../../pages/new-order/new-order';
import { SearchPage } from '../../pages/search/search';


@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
	title:string = '';
	pushPageOrder : any;
	pushPageSearch : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.pushPageOrder = NewOrderPage;
  	this.pushPageSearch = SearchPage;
  }


  ionViewDidLoad() {
  	this.title = '¿ Que elijes hacer ?'  
  }

}
