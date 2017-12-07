import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Image} from '../models/Image';
import {ImageService} from '../services/image.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {SnapshotAction} from 'angularfire2/database';
import {ImageWrapper} from '../models/ImageWrapper';
import {MzToastService} from 'ng2-materialize';

@Component({
  selector: 'app-image-card',
  templateUrl: './image_card.component.html',
  styleUrls: ['./image_card.component.css'],
  providers: [ImageService, UserService]
})

export class ImageCardComponent {
  cardData = {
    owner: '',
    ownerEmail: '',
    ownerAvatarUrl: '',
    favoriteUsers: 0,
    comments: 0,
    isFavorite: false,
    view: 0,
  };

  isAdmin = false;
  isOwner = false;

  @Output() onPressed = new EventEmitter<ImageWrapper>();

  imageRef;
  imageModel: Image;
  @Input('path') path: string;

  @Input('image')
  set image(image: Image) {
    this.imageModel = image;
    this.imageRef = this.imageService.createImageReference(this.path, this.imageModel.id);

    this.isAdmin = this.userService.getCurrentUserID() === 'DsoiwZxmi8bb1jhgsNVuStmVNR13';
    this.isOwner = this.userService.getCurrentUserID() === image.ownerID;

    this.imageService.createFavoriteUsersReference(this.path, this.imageModel.id)
      .subscribe((action: SnapshotAction) => {
          if (action.type === 'child_added') {
            this.cardData.favoriteUsers += 1;
          } else if (action.type === 'child_removed') {
            this.cardData.favoriteUsers -= 1;
          }
          this.cardData.isFavorite = action.key === this.userService.getCurrentUserID();
        }
      );

    this.imageService.createViewReference(this.path, image.id)
      .subscribe((value: number) => {
        this.imageModel.view = value;
        this.cardData.view = value;
      });

    this.imageService.createCommentsReference(this.path, this.imageModel.id)
      .subscribe((action: SnapshotAction) => {
          if (action.type === 'child_added') {
            this.cardData.comments += 1;
          } else if (action.type === 'child_removed') {
            this.cardData.comments -= 1;
          }
        }
      );

    this.imageOwner = this.userService.createUserReference(image.ownerID);
  }

  imageOwner;

  constructor(private router: Router,
              private imageService: ImageService,
              private userService: UserService,
              private toastService: MzToastService) {
  }

  navigateToSignIn() {
    this.router.navigate(['/app-sign-in']);
  }

  favoriteImage() {
    const userID = this.userService.getCurrentUserID();
    if (userID == null) {
      this.navigateToSignIn();
      return;
    }
    this.imageService.favoriteImage(this.path, this.imageModel.id, userID)
      .then(success => {
        this.cardData.isFavorite = true;
      });
  }

  unFavoriteImage() {
    this.imageService.unFavoriteImage(this.path, this.imageModel.id, this.userService.getCurrentUserID())
      .then(success => {
        this.cardData.isFavorite = false;
      });
  }

  onCardClicked() {
    const data = new ImageWrapper(this.imageModel, this.path);
    this.onPressed.emit(data);
  }

  deleteImage() {
    this.imageService.deleteImage(this.path, this.imageModel.id)
      .then(success => {
        this.toastService.show('Delete success',
          1000,
          'toastColor');
      })
      .catch(error => {
        this.toastService.show('Delete failed',
          1000,
          'toastColor');
      });
  }
}
