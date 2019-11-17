import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as firebase from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public loading = false;

  public appData: any = {};
  public Editor = ClassicEditor;

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
    this.getSettings();
  }


  getSettings() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('settings' + '/' + 'data')
      .once('value', (snapshot) => {
        self.appData = snapshot.val();
        self.loading = false;
      });
  }


  saveData(node, data) {
    var updates = {};
    var self = this;
    self.loading = true;
    updates['/settings' + '/' + 'data' + '/' + node] = data;
    firebase.database().ref().update(updates).then(() => {
      self.loading = false;
    });
  }

}
