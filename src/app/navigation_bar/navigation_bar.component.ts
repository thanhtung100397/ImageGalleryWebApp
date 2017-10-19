import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation_bar.component.html',
  styleUrls: ['./navigation_bar.component.css']
})

export class NavigationBarComponent {
  constructor(private router: Router) {
  }
  onSignInButtonClicked() {
    this.router.navigate(['/app-sign-in']);
  }
  navigateToHome() {
    this.router.navigate(['/app-home']);
  }
}
