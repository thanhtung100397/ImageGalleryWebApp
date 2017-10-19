import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterializeModule} from 'ng2-materialize';

import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation_bar/navigation_bar.component';
import {SignInComponent} from './sign_in/sign_in.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'app-home', component: HomeComponent},
  {path: 'app-sign-in', component: SignInComponent},
  {path: 'app-register', component: RegisterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
