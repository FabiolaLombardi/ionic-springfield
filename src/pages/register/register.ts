import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user';
import { Store } from '../../store';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  success: boolean = false;
  user: User;
  userStore: Storage;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Store
  ) {
    this.user = new User();
    this.user.favorites = [];
  }
  
  ionViewDidLoad() {}

  register() {
    if (this.user.password != this.user.confirm_password) {
      this.showMessage("Error", "La confirmación de la contraseña no coincide");
    } else {
      this.storage.isAvailable(this.user.username)
        .then((exists) => {
          console.log(exists);
          if (exists) {
            this.showMessage('Error', 'El nombre de usuario ingresado no se encuentra disponible');
          } else {
            this.storage.set(this.user.username, this.user)
              .then((done) => {
                if (done) {
                  this.success = done;
                  this.showMessage('Success', 'Usuario registrado satisfactoriamente.')
                }
              })
              .catch((not) => {
                this.showMessage('Error', 'Error al registrar usuario. ')
              })
          }
        })
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
            if (this.success) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
