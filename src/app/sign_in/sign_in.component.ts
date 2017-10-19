import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../models/Account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign_in.component.html',
  styleUrls: ['./sign_in.component.css']
})

export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  user: Account;

  errorMessages = {
    email: {
      required: 'Email is required'
    },
    password: {
      required: 'Password is required'
    }
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.user = new Account();
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.user.email, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required])]
    });
  }
  navigateToRegister() {
    this.router.navigate(['/app-register']);
  }
  onSubmit() {
  }
}
