import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionProvider {
  
  constructor(private storage: NativeStorage) {
    console.log('Hello SessionProvider Provider');
  }
  
  login(user: string) {
    return new Promise((res, rej) => {
      this.storage.getItem(user).then(
        data => res(data)),
        err => rej({error: err})
    })
  }
  
  register(username: string, password: string, name: string) {
    return new Promise((res, rej) => {
      this.storage.setItem(username, {
        username: username,
        password: password,
        name: name
      }).then(
        () => res('User registered stored!'),
        err => rej(err))
    })
  }
  
}
