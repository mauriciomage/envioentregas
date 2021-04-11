import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { PreProfilePage } from '../pre-profile/pre-profile';

@Component({
  selector: 'page-user-created',
  templateUrl: 'user-created.html',
})

export class UserCreatedPage {

  isClient : boolean;
  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {
    this.isClient = this.navParams.get('isClient');
  }

  ionViewWillEnter() {

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}