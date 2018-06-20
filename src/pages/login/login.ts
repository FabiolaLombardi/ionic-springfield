import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  private username: string;
  private password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    private storage: NativeStorage
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    this.showLoading();
    this.storage.getItem(this.username).then((user) => {
      if (this.password === user.password) {
        this.navCtrl.setRoot(HomePage, {session: user});
        this.showMessage('Success', 'Sesión iniciada');
      } else {
        this.showMessage('Error', 'Contraseña inválida');
      }
    }, (err) => {
      this.showMessage('Error', 'Usuario no existe');
      console.log('Error: ' + JSON.stringify(err));
    });
  }

  showMessage(title, text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadCtrl.create({
      content: 'Espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}