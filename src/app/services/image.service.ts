import {AngularFireDatabase, SnapshotAction} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../models/Comment';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class ImageService {
  constructor(private database: AngularFireDatabase) {
  }

  createImageReference(path: string, imageID: string): Observable<any> {
    return this.database.object(path + '/' + imageID).valueChanges();
  }

  favoriteImage(path: string, imageID: string, userID: string) {
    return this.database.object(path + '/' + imageID + '/favoriteUsers/' + userID).set(Date.now());
  }

  postComment(path: string, imageID: string, comment: Comment) {
    comment.postedDate = Date.now();
    return this.database.object(path + '/' + imageID + '/comments/' + comment.postedDate).set(comment);
  }

  deleteComment(path: string, imageID: string, comment: Comment) {
    return this.database.list(path + '/' + imageID + '/comments').remove(comment.postedDate + '');
  }

  unFavoriteImage(path: string, imageID: string, userID: string) {
    return this.database.list(path + '/' + imageID + '/favoriteUsers').remove(userID);
  }

  deleteImage(path: string, imageID: string) {
    return this.database.list(path).remove(imageID);
  }

  updateView(path: string, imageID: string, currentView: number) {
    return this.database.object(path + '/' + imageID + '/view').set(+currentView + 1);
  }

  createFavoriteUsersReference(path: string, imageID: string): Observable<SnapshotAction> {
    return this.database.list(path + '/' + imageID + '/favoriteUsers').stateChanges();
  }

  createCommentsReference(path: string, imageID: string): Observable<any> {
    return this.database.list(path + '/' + imageID + '/comments').stateChanges();
  }

  test(path: string, imageID: string) {
    return this.database.list(path + '/' + imageID + '/comemnts', ref => ref.orderByKey().limitToLast(50)).stateChanges()
      .subscribe((o: SnapshotAction) => {
        console.log(o.payload.val());
      });
  }

  searchByName(path: string, name: string) {
    return this.database.list(path).query.orderByKey()
      .on('value', (u) => {
        u.forEach((a: DataSnapshot) => {
          console.log(a.val());
          return true;
        });
      });

  }

  createViewReference(path: string, imageID: string): Observable<any> {
    return this.database.object(path + '/' + imageID + '/view').valueChanges();
  }
}
