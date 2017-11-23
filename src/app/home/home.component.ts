import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase, ChildEvent, ListenEvent} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AngularFireDatabase, AngularFireAuth]
})

export class HomeComponent {
  public previousRoute = '/';
  socialImages;

  events: ChildEvent[] = ['child_added'];

  constructor(private router: Router,
              private database: AngularFireDatabase,
              private auth: AngularFireAuth) {
    this.socialImages = this.database.list('social').valueChanges(this.events);
  }

  navigateToSignIn() {
    this.router.navigate(['/app-sign-in']);
  }

  navigateToUploadImage() {
    this.auth.authState.subscribe((user) => {
      if (user == null) {
        this.navigateToSignIn();
      } else {
        this.router.navigate(['/app-upload-image']);
      }
    });
  }
}
