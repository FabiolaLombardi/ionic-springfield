import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { NativeStorage } from "@ionic-native/native-storage";
import { HttpRequestProvider } from "../../providers//http-request";

import {ItemPage } from '../item/item';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private requestProvider: HttpRequestProvider, private storage: NativeStorage) {
    this.user = this.navParams.get('session');
    console.log(JSON.stringify(this.navParams.data))

  }
  
  results = [];
  num: number = 7;
  show =[];
 
  ionViewDidLoad(){
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

  doInfinite(infiniteScroll){
    console.log("Begin async operation");

    this.requestProvider.getCharacters(this.num).subscribe(data =>{
     // console.log(data);
      this.results=data;
      for(let i = 0; i < this.results.length; i++){
        this.show.push(this.results[i]);
      }
      console.log(this.show);
      console.log("Async operation has ended");
      infiniteScroll.complete();
      
    });
    
  }
  
  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

  view2(i){

    //console.log(i);
    this.navCtrl.push('ItemPage', {session: this.user, info:i});

  }


  }

