import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { User } from '../../user';


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
    user: User;
    character: any;
    favorites=[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
      ) {
        this.character = this.navParams.get('info');
        this.user = this.navParams.get('session');
        this.favorites=this.user.favorites;
       
      }

      ionViewDidLoad() {
          this.favorites=this.user.favorites;
          console.log(JSON.stringify(this.favorites));
      }

      delete(i){
          let position = this.favorites.lastIndexOf(i);
          //console.log(position);
          this.favorites.splice(position, 1);
          //console.log(this.fav);
    }

        itemPress(i){
            let item= i;
            let alert = this.alertCtrl.create({
                title: item.quote,
                subTitle: item.character,
                buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel',
                    },
                    
                        {
                            text: 'Delete',
                            handler: data=>{
                                this.delete(item);
                            }
                        }
                    ]
            });
              alert.present();
            }
        }




