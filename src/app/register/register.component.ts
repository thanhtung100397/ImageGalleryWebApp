import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Register} from '../models/Register';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register: Register;

  errorMessages = {
    firstName: {
      required: 'First name is required'
    },
    lastName: {
      required: 'Last name is required'
    },
    email: {
      required: 'Email is required',
      email: 'Email is invalid'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must have at least 6 characters'
    },
    confirmPassword: {
      required: 'Confirm your password'
    }
  };

  constructor(private formBuilder: FormBuilder, private  router: Router) {
    this.register = new Register();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [this.register.firstName, Validators.compose([Validators.required])],
      lastName: [this.register.lastName, Validators.compose([Validators.required])],
      email: [this.register.email, Validators.compose([Validators.required, Validators.email])],
      password: [this.register.password, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });

    this.registerForm.get('confirmPassword').disable();
  }

  navigateToSignIn() {
    this.router.navigate(['/app-sign-in']);
  }

  onInputPassword() {
    if (this.registerForm.get('password').valid) {
      this.registerForm.get('confirmPassword').enable();
    } else {
      this.registerForm.get('confirmPassword').disable();
    }
  }

  onSubmit() {
    const passwordAbsControl = this.registerForm.get('password');
    const confirmPasswordAbsControl = this.registerForm.get('confirmPassword');
    if (passwordAbsControl.value.equal(confirmPasswordAbsControl.value)) {

    } else {

    }
  }
}
