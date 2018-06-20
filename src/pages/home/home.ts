import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('session');
  }

  ionViewDidLoad() {
    console.log('Welcome');
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

}
