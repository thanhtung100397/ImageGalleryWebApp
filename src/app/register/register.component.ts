import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MzToastService} from 'ng2-materialize';
import {UserService} from '../services/user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {
  public previousRoute = '/app-home';
  registerForm: FormGroup;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  userInfo: User;

  errorMessages = {
    firstName: {
      required: 'First name is required'
    },
    lastName: {
      required: 'Last name is required'
    },
    email: {
      required: 'Email is required',
      email: 'Email is invalid',
      emailExist: 'Email already exists'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must have at least 6 characters'
    },
    confirmPassword: {
      required: 'Confirm your password',
      contentMismatch: 'Password mismatch'
    }
  };

  registerSuccessMessage = 'Register successfully';
  unexpectedErrorMessage = 'An unexpected error occurred, please try again';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private toast: MzToastService) {
    this.userInfo = new User();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [this.userInfo.firstName, Validators.compose([Validators.required])],
      lastName: [this.userInfo.lastName, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });

    this.registerForm.get('confirmPassword').disable();
  }

  navigateToSignIn() {
    this.router.navigate(['/app-sign-in']);
  }

  navigateToHome() {
    this.router.navigate(['/app-home']);
  }

  onInputPassword() {
    if (this.registerForm.get('password').valid) {
      this.registerForm.get('confirmPassword').enable();
    } else {
      this.registerForm.get('confirmPassword').disable();
    }
  }

  assignUser() {
    this.user = Object.assign({}, this.registerForm.value);
    this.userInfo.firstName = this.user.firstName.trim();
    this.userInfo.lastName = this.user.lastName.trim();
  }

  onSubmit() {
    const passwordAbsControl = this.registerForm.get('password');
    const confirmPasswordAbsControl = this.registerForm.get('confirmPassword');
    if (passwordAbsControl.value !== confirmPasswordAbsControl.value) {
      confirmPasswordAbsControl.setErrors({contentMismatch: true});
    } else {
      this.assignUser();
      this.userService.registerUser(this.user.email,
        this.user.password,
        this.userInfo,
        onSuccess => {
          this.toast.show(this.registerSuccessMessage,
            1000,
            'toastColor',
            complete => this.navigateToHome());
        },
        onFailed => {
          switch (onFailed.code) {
            case this.userService.EMAIL_EXIST: {
              const emailAbsControl = this.registerForm.get('email');
              emailAbsControl.setErrors({emailExist: true});
            }
            break;

            default: {
              this.toast.show(this.unexpectedErrorMessage,
                1000,
                'toastColor',
                complete => this.navigateToSignIn());
            }
          }
        });
    }
  }
}
