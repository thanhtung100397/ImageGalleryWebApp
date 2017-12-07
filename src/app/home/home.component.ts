import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase, ChildEvent, SnapshotAction} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ImageWrapper} from '../models/ImageWrapper';
import {MzModalService} from 'ng2-materialize';
import {ImageDetailModalComponent} from '../image_detail_modal/image_detail_modal.component';
import {User} from 'firebase';
import {Image} from '../models/Image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AngularFireDatabase, AngularFireAuth]
})

export class HomeComponent {
  public previousRoute = '/';
  socialImages = [];
  meImages = [];

  // events: ChildEvent[] = ['child_added', 'child_removed'];
  currentUserID;

  constructor(private router: Router,
              private database: AngularFireDatabase,
              private auth: AngularFireAuth,
              private modalService: MzModalService) {

    this.auth.authState.subscribe((user: User) => {
      if (user == null) {
        this.currentUserID = null;
      } else {
        this.currentUserID = auth.auth.currentUser.uid;
      }

      this.database.list('social').stateChanges()
        .subscribe((a: SnapshotAction) => {
          const image: Image = a.payload.val();
          if (a.type === 'child_added') {
            this.socialImages.splice(0, 0, image);
            if (this.currentUserID != null) {
              if (image.ownerID === this.currentUserID) {
                this.meImages.splice(0, 0, image);
              }
            }
          } else if (a.type === 'child_removed') {
            this.socialImages.splice(this.socialImages.findIndex(item => item.id === image.id), 1);
            if (this.currentUserID != null) {
              this.meImages.splice(this.meImages.findIndex(item => item.id === image.id), 1);
            }
          }
        });
    });
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

  showImageDetailModal(imageWrapper: ImageWrapper) {
    this.modalService.open(ImageDetailModalComponent, {path: imageWrapper.path, image: imageWrapper.image});
  }
}
