import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {MzToastService} from 'ng2-materialize';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {User} from 'firebase';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation_bar.component.html',
  styleUrls: ['./navigation_bar.component.css'],
  providers: [UserService]
})

export class NavigationBarComponent {
  user = null;
  userInfo: Observable<any>;
  signOutSuccessfullyMessage = 'Sign out successfully';
  signOutFailedMessage = 'Sign out failed, please try again';

  @Input()
  previousRoute = '';

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private userService: UserService,
              private toast: MzToastService) {

    this.angularFireAuth.authState.subscribe((user: User) => {
      this.user = user;
      if (this.user == null) {
        this.userInfo = null;
      } else {
        this.userInfo = this.userService.fetchCurrentUserInfo().valueChanges();
      }
    });
  }

  navigateToPreviousComponent() {
    if (this.previousRoute !== '/') {
      this.router.navigate([this.previousRoute]);
    }
  }

  signOut() {
    this.angularFireAuth.auth.signOut()
      .then(success => {
        this.toast.show(this.signOutSuccessfullyMessage,
          1000,
          'toastColor');
      })
      .catch(error => {
        this.toast.show(this.signOutFailedMessage,
          1000,
          'toastColor');
      });
  }

  navigateToSignIn() {
    this.router.navigate(['/app-sign-in']);
  }

  navigateToHome() {
    this.router.navigate(['/app-home']);
  }
}
