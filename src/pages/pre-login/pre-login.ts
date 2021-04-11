import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { LoginPage  } from '../login/login';
import { PreProfilePage  } from '../pre-profile/pre-profile';
import { SigninPage } from '../signin/signin';
/**
 * Generated class for the PreLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pre-login',
  templateUrl: 'pre-login.html',
})
export class PreLoginPage {
	loginPage = LoginPage;

	title : string = 'BIENVENIDO';
  SigninPage: any;
  constructor( public events: Events , public navCtrl: NavController, public navParams: NavParams, public nav:NavController, public alertCtrl:AlertController) {
     this.SigninPage = SigninPage;
  }

  ionViewWillEnter() {
    
    this.checkLogin();
  }

  public checkLogin(){

        //verificamos si el usuario esta logeado
        //por si regresa a la app, chequea LS
       if(localStorage.getItem("logged") == 'true'){
         this.nav.push(PreProfilePage);
       }
  }
    public toLoginPage(){
     if(localStorage.getItem("logged") == 'true'){
         this.nav.push(PreProfilePage);
     }else{
       this.nav.push(LoginPage);
     }
  	
    }



}
