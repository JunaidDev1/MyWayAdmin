import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AllRidesComponent } from './all-rides/all-rides.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxLoadingModule } from 'ngx-loading';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'use-detail', component: UserDetailComponent },
  { path: 'all-rides', component: AllRidesComponent },
  { path: 'ride-detail', component: RideDetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
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
    ProfileComponent,
    WithdrawalRequestsComponent
  ],
  imports: [
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
