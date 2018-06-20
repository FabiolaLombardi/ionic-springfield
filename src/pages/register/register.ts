import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  registerSucess: boolean = false;
  user = { name: '', username: '', email: '', password: '', confirm_password: '' };
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: NativeStorage
  ) {}
  
  ionViewDidLoad() {
    this.storage.keys()
    .then(keys => console.log(keys));
  }
  
  isAvailable(): Promise<boolean> {
    return this.storage.keys()
    .then(keys => 
      keys.some(k => (this.user.username === k))
    );
  }
  
  register() {
    if (this.user.password != this.user.confirm_password) {
      this.showMessage("Error", "La confirmación de la contraseña no coincide");
    } else {
      this.isAvailable()
      .then(exists => {
        console.log(exists);
        if (exists) {
          this.showMessage('Error', 'El nombre de usuario ingresado no se encuentra disponible');
        } else {
          this.storage.setItem(this.user.username, this.user)
          .then(
            () => {
              this.registerSucess = true;
              this.showMessage('Success', 'Usuario registrado satisfactoriamente.');
            }, 
            (err) => this.showMessage('Error', 'Error al registrar usuario. ' + err)
          );
        }
      });
    }
  }

  showMessage(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
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
