import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { User } from '../../user';
import { Store } from '../../store';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
    user: User;
    character: any;
    favorites=[];
    hash={}
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private storage: Store,
        public actionSheetCtrl: ActionSheetController,
      ) {
        this.character = this.navParams.get('info');
        this.user = this.navParams.get('session');
        //this.favorites=this.user.favorites;
       
      }
      ionViewDidEnter(){
        this.storage.get(this.user.username)
        .then((user) => {
          // console.log(JSON.stringify(user))
          this.favorites = user.favorites;
        }).catch(()=> {
          console.log('ionviewdidenter error');
        })
      }

      ionViewDidLoad() {
         // this.favorites=this.user.favorites;
         // console.log(JSON.stringify(this.favorites));
      }

     
      delete(i){
          let position = this.favorites.lastIndexOf(i);
          //console.log(position);
          this.favorites.splice(position, 1);
          this.storage.change(this.user.username, this.favorites)
      }
        
        
      

      

        itemPress(i){
            let item= i;
            let alert = this.alertCtrl.create({
                title: item.quote,
                subTitle: item.character,
                cssClass: 'alert',
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





