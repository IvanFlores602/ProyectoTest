import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isRegistroRoute(): boolean {
    return this.router.url === '/registro';
  }
  ngOnInit(): void {
  }

}
