import { NativeStorage } from '@ionic-native/native-storage';

export class Storage {
    constructor(public nativeStorage: NativeStorage) {}

    get(key) {
        this.nativeStorage.getItem(key).then(
            (data) => data,
            (error) => error
        );
    }
}