import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      this.router.navigate(['/home']);
    }
  }

  onLogin(email, password) {
    if (email == "admin@myway.com" && password == "admin112233") {
      localStorage.setItem('userLoggedIn', 'true');
      this.router.navigate(['/home']);
    }
    else {
      alert("Invalid Email or Password!");
    }
  }

}
