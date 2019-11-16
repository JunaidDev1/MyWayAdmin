import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public loading = false;
  public allUsers: Array<any> = [];
  public newUsers: Array<any> = [];
  public passportExpiredUsers: Array<any> = [];
  public licenseExpiredUsers: Array<any> = [];

  constructor(
    public router: Router, ) {
  }

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('users')
      .once('value', function (snapshot) {
        var users = snapshot.val();
        for (var key in users) {
          var user = users[key];
          user.key = key;
          if (!user.status) {
            self.newUsers.push(user);
          }
          if (user.status == 'unblock' && !self.checkPassportExpiry(user)) {
            if (user.vehicle) {
              if (!self.checkLicenseExpiry(user) && user.vehicle.driverVerified != 'nonVerified') {
                self.allUsers.push(user);
              }
            }
            else {
              self.allUsers.push(user);
            }
          }
          if (self.checkPassportExpiry(user) && user.status != 'notVerified') {
            self.passportExpiredUsers.push(user);
          }
          if (user.vehicle) {
            if (self.checkLicenseExpiry(user)) {
              self.licenseExpiredUsers.push(user);
            }
          }
        }
        self.loading = false;
      })
      .catch((e) => {
        self.loading = false;
        alert(e);
      })
  }


  checkPassportExpiry(user) {
    var currentDate = new Date();
    var td = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
    if (user.passportExpiry == td) {
      return true;
    }
    else {
      return false;
    }
  }



  checkLicenseExpiry(user) {
    var currentDate = new Date();
    var td = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
    if (user.vehicle.licenseExpiry == td) {
      return true;
    }
    else {
      return false;
    }
  }


  updateStatus(user, status) {
    user.status = status;
    var updates = {};
    updates['/users' + '/' + user.uid + "/" + "status"] = status;
    firebase.database().ref().update(updates).then(() => {
    });
  }


}
