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
  public user: any = {};

  constructor(public route: ActivatedRoute) {
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
      });
  }


}
