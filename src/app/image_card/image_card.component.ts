import {Component, Input} from '@angular/core';
import {Image} from '../models/Image';
import {ImageService} from '../services/image.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {Observable} from 'rxjs/Observable';

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
    isFavorite: false
  };

  imageRef: Observable<any>;
  imageModel: Image;
  @Input('path') path: string;

  @Input('image')
  set image(image: Image) {
    this.imageModel = image;
    this.imageRef = this.imageService.createImageReference(this.path, this.imageModel.id);

    this.imageService.createFavoriteUsersReference(this.path, this.imageModel.id)
      .subscribe(
        (favoriteUsers: string[]) => {
          if (favoriteUsers != null) {
            this.cardData.favoriteUsers = favoriteUsers.length;
          } else {
            this.cardData.favoriteUsers = 0;
          }
          this.cardData.isFavorite = favoriteUsers.includes(this.userService.getCurrentUserID());
        }
      );

    this.userService.fetchUserInfo(this.imageModel.ownerID)
      .valueChanges()
      .subscribe(
        (owner: User) => {
          this.cardData.owner = owner.firstName + ' ' + owner.lastName;
          this.cardData.ownerEmail = owner.email;
          this.cardData.ownerAvatarUrl = owner.avatarUrl;
        },
        error => {
          console.log(error);
        });
  }

  constructor(private router: Router,
              private imageService: ImageService,
              private userService: UserService) {
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
}
