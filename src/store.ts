import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Store {

  constructor(private nativeStorage: NativeStorage) {}

  get(key): Promise<User> {
    return this.nativeStorage.getItem(key)
      .then(
        (data) => data, 
        (error) => {
          console.log('Cannot get said user... Error:' + JSON.stringify(error));
        }
      );
  }
  
  set(key, value: User): Promise<boolean> {
    return new Promise((res, rej) => {
      return this.nativeStorage.setItem(key, value).then(
        () => res(true),
        () => rej(false)
      );
    })
  }
  
  // quite hardcoded to add favorites
  setNewValue(key, values)  {
    this.get(key)
      .then((user) => {
        user.favorites.push(values);
        this.set(user.username, user);
      })
      .catch((err) => {
        console.log('Error:' + err);
      })
  }
  
  isAvailable(userKey): Promise<boolean> {
    return this.nativeStorage.keys()
    .then(keys =>
      keys.some(k => (userKey === k))
    );
  }
  
}