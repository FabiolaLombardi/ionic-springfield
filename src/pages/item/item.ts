import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

    user={};
    character: {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private storage: NativeStorage,
        public actionSheetCtrl: ActionSheetController
      ) {
        this.character = this.navParams.get('info');
        console.log(JSON.stringify(this.user));
        console.log(JSON.stringify(this.character));
      }

      ionViewDidLoad() {
        //console.log(this.all);
      }

      openMenu() {
        const actionSheet = this.actionSheetCtrl.create({
          title: 'Add to Favorites',
          buttons: [
            {
                text: 'Favorite',
                handler: () => {
                  let user = this.navParams.get('session');
                  let character = this.navParams.get('info');
                  user.favorites.push({image: character.image});
                  this.save(user.username, user);
                  /*this.favoriteCharacters = user.favorite;
                  let i of favorite*/
                }
              },{
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
      
      save(username, user) {
        this.storage.setItem(username, user).then(
          () => console.log('Favorito agregado'),
          (err) => console.log('No se pudo guardar. Error: ' + err)
        )
      }
}