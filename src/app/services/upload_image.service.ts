import {Injectable} from '@angular/core';
import {Image} from '../models/Image';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UploadImageService {
  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDatabase: AngularFireDatabase) {
  }

  uploadImage(path: string, image: Image, success, error) {
    image.id = this.firebaseDatabase.createPushId();
    image.ownerID = this.firebaseAuth.auth.currentUser.uid;
    image.uploadDate = Date.now();
    image.favoriteUsers = [];
    image.view = 0;
    image.comment = 0;

    this.firebaseDatabase.object(path + '/' + image.id)
      .set(image)
      .catch(error)
      .then(success);
  }
}
