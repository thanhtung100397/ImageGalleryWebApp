import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MzToastService} from 'ng2-materialize';
import {Image} from '../models/Image';
import {UploadImageService} from '../services/upload_image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload_image.component.html',
  styleUrls: ['./upload_image.component.css'],
  providers: [UploadImageService]
})

export class UploadImageComponent implements OnInit {
  public previousRoute = '/app-home';
  uploadImageForm: FormGroup;
  image = new Image();

  errorMessages = {
    title: {
      required: 'Title is required'
    },
    imageUrl: {
      required: 'Image url is required'
    }
  };

  unexpectedErrorMessage = 'An unexpected error occurred, please try again';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private uploadImageService: UploadImageService,
              private toast: MzToastService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.uploadImageForm = this.formBuilder.group({
      title: [this.image.title, Validators.compose([Validators.required])],
      description: [this.image.description],
      imageUrl: [this.image.imageUrl, Validators.compose([Validators.required])]
    });
  }

  navigateToHome() {
    this.router.navigate(['/app-home']);
  }

  assignImage() {
    this.image = Object.assign({}, this.uploadImageForm.value);
  }

  onSubmit() {
    this.assignImage();
    this.uploadImageService.uploadImage('social', this.image,
      s => {
        this.navigateToHome();
      },
      e => {
        this.toast.show(this.unexpectedErrorMessage,
          1000,
          'toastColor');
      });
  }
}
