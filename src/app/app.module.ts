import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterializeModule} from 'ng2-materialize';

import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation_bar/navigation_bar.component';
import {SignInComponent} from './sign_in/sign_in.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';

import {AngularFireModule} from 'angularfire2';
import {ImageCardComponent} from './image_card/image_card.component';
import {UploadImageComponent} from './upload_image/upload_image.component';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {ImageDetailModalComponent} from './image_detail_modal/image_detail_modal.component';

const appRoutes: Routes = [
  {path: 'app-home', component: HomeComponent},
  {path: 'app-sign-in', component: SignInComponent},
  {path: 'app-register', component: RegisterComponent},
  {path: 'app-upload-image', component: UploadImageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    SignInComponent,
    RegisterComponent,
    ImageCardComponent,
    UploadImageComponent,
    ImageDetailModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'Image-Gallery'),
    FormsModule
  ],
  providers: [AngularFireAuth, AngularFireDatabase],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageDetailModalComponent
  ]
})
export class AppModule {
}
