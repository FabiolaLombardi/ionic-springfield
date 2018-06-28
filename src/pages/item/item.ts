import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { User } from '../../user';
import { Store } from '../../store';

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
                text: 'Favorite',
                handler: () => {
                  console.log(JSON.stringify(this.character));
                  this.storage.setNewValue(this.user.username, this.navParams.get('info'));

                  this.storage.get(this.user.username)
                    .then((updatedUser) => {
                      console.log(JSON.stringify(updatedUser));
                      this.user = updatedUser;
                    })
                    .catch((err) => {
                      console.log('Imposible actualizar usuario. Error: ' + JSON.stringify(err));
                    })

                  this.navParams.data = { session: this.user };
                  this.navCtrl.pop();
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
}