import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ImageService {
  constructor(private database: AngularFireDatabase) {
  }

  createImageReference(path: string, imageID: string): Observable<any> {
    return this.database.object(path + '/' + imageID).valueChanges();
  }

  favoriteImage(path: string, imageID: string, userID: string) {
    return this.database.object(path + '/' + imageID + '/favoriteUsers/' + Date.now()).set(userID);
  }

  unFavoriteImage(path: string, imageID: string, userID: string) {
    return this.database.list(path + '/' + imageID + '/favoriteUsers').remove(userID);
  }

  createFavoriteUsersReference(path: string, imageID: string): Observable<string[]> {
    return this.database.list(path + '/' + imageID + '/favoriteUsers').valueChanges();
  }
}
