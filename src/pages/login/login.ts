import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Store } from '../../store';
import { HomePage } from '../home/home';
import { User } from '../../user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    private storage: Store
  ) {
    this.userLogin = new User();
  }

  ionViewDidLoad() {}

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    this.showLoading();
    this.storage.get(this.userLogin.username)
      .then((data) => {
        console.log(data)
        if (this.userLogin.password === data.password) {
          this.navCtrl.setRoot(HomePage, {session: data});
        } else {
          this.showError('Combinación de usuario y contraseña inválida');
          this.dismissLoad();
        }
      })
      .catch((error) => {
        this.dismissLoad();
        this.showError('Usuario no existe');
        console.log('Error: ' + error);
      })
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadCtrl.create({
      content: 'Procesando su solicitud...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
  dismissLoad() {
    this.loading.dismiss();
  }

}
