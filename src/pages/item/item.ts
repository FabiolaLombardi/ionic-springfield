import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { User } from '../../user';
import { Store } from '../../store';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

    user: User;
    character: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private storage: Store,
        public actionSheetCtrl: ActionSheetController
      ) {
        this.character = this.navParams.get('info');
        this.user = this.navParams.get('session');
      }

      ionViewDidLoad() {}

      openMenu() {
        const actionSheet = this.actionSheetCtrl.create({
          title: 'Add to Favorites',
          buttons: [
            {
                cssClass: 'alert',
                text: 'Favorite',
                handler: () => {
                 // console.log(JSON.stringify(this.character));
                  this.storage.setNewValue(this.user.username, this.navParams.get('info'));

                  this.storage.get(this.user.username)
                    .then((updatedUser) => {
                      //console.log(JSON.stringify(updatedUser));
                      this.user = updatedUser;
                    })
                    .catch((err) => {
                      console.log('Imposible actualizar usuario. Error: ' + JSON.stringify(err));
                    })

                  console.log(JSON.stringify(this.navParams.data))
                  this.navCtrl.setRoot(HomePage, {session: this.user})
                  this.showMesaje('Agregado a Favoritos');
                  //this.navCtrl.pop();
                }
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
        });
        actionSheet.present();
      }
      showMesaje(text) {
        let alert = this.alertCtrl.create({
          subTitle: text,
          buttons: ['OK']
        });
        alert.present();
      }
}