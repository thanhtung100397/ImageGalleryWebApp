import {Component} from '@angular/core';
import 'rxjs/add/operator/pairwise';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previousRoute = '';

  constructor(private router: Router) {
    this.router.navigate(['/app-home']);
  }

  onComponentAdded(event: any) {
    this.previousRoute = event.previousRoute;
  }
}
