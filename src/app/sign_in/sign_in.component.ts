import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {MzToastService} from 'ng2-materialize';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign_in.component.html',
  styleUrls: ['./sign_in.component.css']
})

export class SignInComponent implements OnInit {
  public previousRoute = '/app-home';
  signInForm: FormGroup;
  user = {
    email: '',
    password: ''
  };

  errorMessages = {
    email: {
      required: 'Email is required',
      wrongEmailOrPassword: 'Wrong email or password'
    },
    password: {
      required: 'Password is required'
    }
  };

  signInSuccessMessage = 'Sign in successfully';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private angularFireAuth: AngularFireAuth,
              private toast: MzToastService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signInForm = this.formBuilder.group({
      email: [this.user.email, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required])]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/app-register']);
  }

  navigateToHome() {
    this.router.navigate(['/app-home']);
  }

  assignUser() {
    this.user = Object.assign({}, this.signInForm.value);
  }

  onSubmit() {
    this.assignUser();
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(success => {
        window.location.reload();
        this.toast.show(this.signInSuccessMessage,
          1000,
          'toastColor',
          complete => this.navigateToHome());
      })
      .catch(failed => {
        const abstractEmailControl = this.signInForm.get('email');
        abstractEmailControl.setErrors({wrongEmailOrPassword: true});
      });
  }
}
