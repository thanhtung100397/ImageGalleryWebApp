import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MzToastService} from 'ng2-materialize';
import {UploadImageService} from '../services/upload_image.service';
import {Upload} from '../models/Upload';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload_image.component.html',
  styleUrls: ['./upload_image.component.css'],
  providers: [UploadImageService, UserService]
})

export class UploadImageComponent implements OnInit {
  public previousRoute = '/app-home';
  uploadImageForm: FormGroup;
  image = new Upload();

  selectedImageFile: File;

  errorMessages = {
    title: {
      required: 'Title is required'
    },
    image: {
      required: 'Image path is required'
    }
  };

  unexpectedErrorMessage = 'An unexpected error occurred, please try again';

  isImageSelected = false;
  isShowImagePathMessage = false;
  isProcessing = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private uploadImageService: UploadImageService,
              private toast: MzToastService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.uploadImageForm = this.formBuilder.group({
      title: [this.image.title, Validators.compose([Validators.required])],
      description: [this.image.description]
    });
  }

  navigateToHome() {
    this.router.navigate(['/app-home']);
  }

  assignImage() {
    this.image = Object.assign({}, this.uploadImageForm.value);
    this.image.ownerID = this.userService.getCurrentUserID();
    this.image.file = this.selectedImageFile;
  }

  onSubmit() {
    this.assignImage();
    this.isProcessing = true;
    this.uploadImageService.uploadImage('social', this.image,
      s => {
        this.isProcessing = false;
        this.navigateToHome();
      },
      e => {
        this.isProcessing = false;
        this.toast.show(this.unexpectedErrorMessage,
          1000,
          'toastColor');
      });
  }

  onFileChange(files: any) {
    if (files.length > 0) {
      this.selectedImageFile = files[0];
      this.isImageSelected = true;
      this.isShowImagePathMessage = false;
    } else {
      this.selectedImageFile = null;
      this.isImageSelected = false;
      this.isShowImagePathMessage = true;
    }
  }
}
