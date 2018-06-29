import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpRequestProvider } from "../../providers//http-request";
import { Store } from '../../store';
import { User } from '../../user';
//import {ItemPage } from '../item/item';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: User;
  num = 7;
  results = [];
  show = [];
  fav =[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Store,
    private requestProvider: HttpRequestProvider
  ) 
    {
    this.user = this.navParams.get('session')
    }
  
  ionViewDidLoad() {
    this.requestProvider.getCharacters(this.num).subscribe(data =>{
      //console.log(data);
      this.results=data;
      //console.log(this.results);
      for(let i = 0; i < this.results.length; i++){
        this.show.push(this.results[i]);
      }
     // console.log(this.show);
    });
  }


  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    this.requestProvider.getCharacters(this.num)
      .subscribe(data => {
        // console.log(data);
        this.results = data;
        for(let i = 0; i < this.results.length; i++) {
          this.show.push(this.results[i]);
        }
      //console.log(this.show);
      console.log("Async operation has ended");
      infiniteScroll.complete();
    });
  }

  viewItem(i) {
    //console.log(i);

    this.navCtrl.push('ItemPage', { session: this.user, info: i });
  }

  viewFavorites(){
    //console.log(JSON.stringify({session:this.user}));
    this.navCtrl.push('FavoritesPage', { session: this.user });
  }

  logout() {
    this.navParams.data = '';
    this.navCtrl.setRoot(LoginPage);
  }

}

