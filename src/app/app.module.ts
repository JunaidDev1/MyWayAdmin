import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AllRidesComponent } from './all-rides/all-rides.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { NgxLoadingModule } from 'ngx-loading';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests.component';
import { SearchPipe } from './search.pipe';

var firebaseConfig = {
  apiKey: "AIzaSyBceS69RhmluvE-9MLGnR0gqvPv9eGQ1fk",
  authDomain: "myway-app-1570618686991.firebaseapp.com",
  databaseURL: "https://myway-app-1570618686991.firebaseio.com",
  projectId: "myway-app-1570618686991",
  storageBucket: "myway-app-1570618686991.appspot.com",
  messagingSenderId: "928221949773",
  appId: "1:928221949773:web:79d138c3dc423ee795d104",
  measurementId: "G-6PXM3N45XX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'all-rides', component: AllRidesComponent },
  { path: 'ride-detail', component: RideDetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'withdrawal-requests', component: WithdrawalRequestsComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserDetailComponent,
    AllRidesComponent,
    RideDetailComponent,
    SettingsComponent,
    WithdrawalRequestsComponent,
    SearchPipe
  ],
  imports: [
    FormsModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
