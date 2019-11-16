import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public uid: any;
  public loading = false;
  public status: any;
  public expiryDate: any;
  public licenseExpiryDate: any;
  public passportExpired = false;
  public licenseExpired = false;
  public user: any = {};

  constructor(
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.getUserData();
  }


  getUserData() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('users' + '/' + self.uid)
      .once('value', (snapshot) => {
        self.user = snapshot.val();
        if (!self.user.profileUrl) {
          self.user.profileUrl = "";
        }
        self.loading = false;
        self.checkPassportExpiry();
        self.checkLicenseExpiry();
      });
  }


  checkPassportExpiry() {
    var currentDate = new Date();
    var td = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
    if (this.user.passportExpiry == td) {
      this.passportExpired = true;
    }
  }


  checkLicenseExpiry() {
    var currentDate = new Date();
    var td = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
    if (this.user.vehicle.licenseExpiry == td) {
      this.licenseExpired = true;
    }
  }


  updateRiderStatus(status, expired?) {
    var self = this;
    var updates = {};
    updates['users/' + self.user.uid + '/status'] = status;
    if (expired) {
      updates['users/' + self.user.uid + '/passportExpiry'] = expired;
    }
    firebase.database().ref().update(updates).then(() => {
      if (expired) {
        alert("User has been asked in the app about his passport expiry and re-uploading!");
        self.passportExpired = false;
      }
      if (self.expiryDate) {
        self.updateExpiry();
      }
      self.user.status = status;
    })
  }


  updateExpiry() {
    var self = this;
    var updates = {};
    updates['users/' + self.user.uid + '/passportExpiry'] = self.expiryDate;
    firebase.database().ref().update(updates).then(() => {
      self.expiryDate = "";
    })
  }


  updateDriverStatus(status, expired?) {
    var self = this;
    var updates = {};
    updates['users/' + self.user.uid + '/vehicle/driverVerified'] = status;
    if (expired) {
      updates['users/' + self.user.uid + '/vehicle/licenseExpiry'] = expired;
    }
    firebase.database().ref().update(updates).then(() => {
      if (expired) {
        alert("User has been asked in the app about his license expiry and re-uploading!");
        self.licenseExpired = false;
      }
      if (self.licenseExpiryDate) {
        self.updateLicenseExpiry();
      }
      self.user.vehicle.driverVerified = status;
    })
  }


  updateLicenseExpiry() {
    var self = this;
    var updates = {};
    updates['users/' + self.user.uid + '/vehicle/licenseExpiry'] = self.licenseExpiryDate;
    firebase.database().ref().update(updates).then(() => {
      self.licenseExpiryDate = "";
    })
  }


  getActive(status) {
    this.status = status;
  }


}
