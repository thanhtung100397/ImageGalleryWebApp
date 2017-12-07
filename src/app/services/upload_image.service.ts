import {Injectable} from '@angular/core';
import {Image} from '../models/Image';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import {Upload} from '../models/Upload';
import * as firebase from 'firebase';
import TaskEvent = firebase.storage.TaskEvent;

@Injectable()
export class UploadImageService {
  constructor(private firebaseDatabase: AngularFireDatabase,
              private firebaseApp: FirebaseApp) {
  }

  uploadUserAvatar(userID: string, file: File, success: any, error: any) {
    const storageRef = this.firebaseApp.storage().ref();
    const uploadTask = storageRef.child('users/' + userID + 'avatar')
      .put(file);
    uploadTask.on(TaskEvent.STATE_CHANGED, null, error,
      () => {
        const imageUrl = uploadTask.snapshot.downloadURL;
        success(imageUrl);
      }
    );
  }

  uploadImage(path: string, upload: Upload, success, error) {
    const storageRef = this.firebaseApp.storage().ref();
    const uploadTask = storageRef.child(path + '/' + upload.ownerID + Date.now() + upload.file.name)
      .put(upload.file);
    uploadTask.on(TaskEvent.STATE_CHANGED, null, error,
      () => {
        const image = new Image();
        image.title = upload.title;
        image.ownerID = upload.ownerID;
        image.description = upload.description;
        image.imageUrl = uploadTask.snapshot.downloadURL;
        this.saveImage(path, image, success, error);
      }
    );
  }

  saveImage(path: string, image: Image, success, error) {
    image.id = this.firebaseDatabase.createPushId();
    image.uploadDate = Date.now();
    image.favoriteUsers = [];
    image.view = 0;
    image.comments = [];

    this.firebaseDatabase.object(path + '/' + image.id)
      .set(image)
      .catch(error)
      .then(success);
  }
}
