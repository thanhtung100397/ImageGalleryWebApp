import {Component, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import {ImageService} from '../services/image.service';
import {Image} from '../models/Image';
import {SnapshotAction} from 'angularfire2/database';
import {MzBaseModal} from 'ng2-materialize';
import {Router} from '@angular/router';
import {Comment} from '../models/Comment';
import {User} from '../models/User';

@Component({
  selector: 'app-image-detail-modal',
  templateUrl: './image_detail_modal.component.html',
  styleUrls: ['./image_detail_modal.component.css'],
  providers: [UserService, ImageService]
})

export class ImageDetailModalComponent extends MzBaseModal {
  modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '100%',
    endingTop: '10%'
  };

  modalData = {
    avatarUrl: '',
    owner: '',
    ownerEmail: '',
    imageUrl: '',
    isFavorite: false,
    favoriteUsers: 0,
    commentCount: 0,
    comments: [],
    description: '',
  };

  @Input('path') path: string;
  imageModel: Image;

  @Input('image')
  set image(image: Image) {
    this.imageModel = image;
    this.imageRef = this.imageService.createImageReference(this.path, this.imageModel.id);
    this.currentUserRef = this.userService.createCurrentUserReference();
    this.imageOwner = this.userService.createUserReference(image.ownerID);

    this.imageService.updateView(this.path, image.id, image.view);

    this.imageService.createFavoriteUsersReference(this.path, this.imageModel.id)
      .subscribe((action: SnapshotAction) => {
          if (action.type === 'child_added') {
            this.modalData.favoriteUsers += 1;
          } else if (action.type === 'child_removed') {
            this.modalData.favoriteUsers -= 1;
          }
          this.modalData.isFavorite = action.key === this.userService.getCurrentUserID();
        }
      );

    // this.imageService.test(this.path, this.imageModel.id);
    // this.imageService.searchByName(this.path, 'abc');

    this.imageService.createCommentsReference(this.path, this.imageModel.id)
      .subscribe((action: SnapshotAction) => {
          const comment: Comment = action.payload.val();
          if (action.type === 'child_added') {
            this.modalData.commentCount += 1;
            this.userService.fetchUserInfo(comment.ownerID).valueChanges()
              .subscribe((user: User) => {
                const commentItem = {
                  avatarUrl: user.avatarUrl,
                  name: user.firstName + ' ' + user.lastName,
                  postedDate: comment.postedDate,
                  content: comment.content
                };
                this.modalData.comments.splice(0, 0, commentItem);
              });
          } else if (action.type === 'child_removed') {
            this.modalData.commentCount -= 1;
            this.modalData.comments.splice(this.modalData.comments.findIndex(item => item.postedDate === comment.postedDate), 1);
          }
        }
      );
  }

  imageRef;
  imageOwner;
  currentUserRef;

  comment: Comment;

  constructor(private userService: UserService,
              private imageService: ImageService,
              private router: Router) {
    super();
    this.comment = new Comment();
    this.comment.ownerID = this.userService.getCurrentUserID();
  }

  favoriteImage() {
    const userID = this.userService.getCurrentUserID();
    if (userID == null) {
      this.navigateToSignIn();
      return;
    }
    this.imageService.favoriteImage(this.path, this.imageModel.id, userID)
      .then(success => {
        this.modalData.isFavorite = true;
      });
  }

  unFavoriteImage() {
    this.imageService.unFavoriteImage(this.path, this.imageModel.id, this.userService.getCurrentUserID())
      .then(success => {
        this.modalData.isFavorite = false;
      });
  }

  submitComment() {
    const userID = this.userService.getCurrentUserID();
    if (userID == null) {
      this.navigateToSignIn();
      this.modalComponent.close();
      return;
    }
    if (this.comment.content === '') {
      return;
    }

    this.imageService.postComment(this.path, this.imageModel.id, this.comment)
      .then(success => {
        this.comment.content = '';
      });
  }

  navigateToSignIn() {
    this.router.navigate(['/app-sign-in']);
  }
}
