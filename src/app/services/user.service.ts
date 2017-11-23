import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../models/User';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  UNEXPECTED_ERROR = -1;
  EMAIL_EXIST = 1;

  constructor(private firebaseAuth: AngularFireAuth,
              private database: AngularFireDatabase) {
  }

  registerUser(email: string,
               password: string,
               user: User,
               onSuccess: any,
               onFailed: any) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(success => {
        user.email = email;
        user.avatarUrl = '';
        this.saveUser(user, onSuccess, onFailed);
      })
      .catch(failed => onFailed.code = this.EMAIL_EXIST);
  }

  fetchUserInfo(userID: string): AngularFireObject<User> | null {
    if (userID == null) {
      return null;
    }
    return this.database.object('users/' + userID);
  }

  getCurrentUserID() {
    const currentUser = this.firebaseAuth.auth.currentUser;
    if (currentUser != null) {
      return currentUser.uid;
    }
    return null;
  }

  fetchCurrentUserInfo(): AngularFireObject<User> | null {
    return this.fetchUserInfo(this.getCurrentUserID());
  }

  private saveUser(user: User, onSuccess: any, onFailed: any) {
    this.database.object('users/' + this.firebaseAuth.auth.currentUser.uid)
      .set(user)
      .then(onSuccess)
      .catch(failed => onFailed.code = this.UNEXPECTED_ERROR);
  }
}
