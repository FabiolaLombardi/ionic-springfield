import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('session');
  }

}