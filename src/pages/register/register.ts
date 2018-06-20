import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerSucess = false;
  user = { name: '', username: '', email: '', password: '', confirm_password: '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: NativeStorage
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.storage.keys().then(keys => console.log(keys));
  }

  isAvailable(): Promise<boolean> {
    return this.storage.keys().then(keys => 
      keys.some(k => (this.user.username === k)) //returna true si encuentra un elemento que cumpla el callback, false si ninguno
    );
  }

  register() {
    if (this.user.password != this.user.confirm_password) {
      this.showMessage("Error", "La confirmación de la contraseña no coincide");
    } else {
      this.isAvailable().then(exists => {
        console.log(exists);
        if (exists) {
          this.showMessage('Error', 'El nombre de usuario ingresado no se encuentra disponible');
        } else {
          
          let userToStore = {
            name: this.user.name,
            username: this.user.username,
            email: this.user.email,
            password: this.user.password
          };

          this.storage.setItem(this.user.username, userToStore)
            .then(() => {
              this.registerSucess = true;
              this.showMessage('Success', 'Usuario registrado satisfactoriamente.');
            }, (err) => this.showMessage('Error', 'Error al registrar usuario. ' + err))
        }
      }); // end of Promise
    }
  }

  showMessage(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.registerSucess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
