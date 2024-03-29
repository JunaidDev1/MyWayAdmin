import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router
  ) {
    if (localStorage.getItem('userLoggedIn') == 'false') {
      router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('userLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

}
