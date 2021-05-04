import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-auth-check',
  templateUrl: './start-auth-check.component.html',
  styleUrls: ['./start-auth-check.component.css']
})
export class StartAuthCheckComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('uid');
    const userEmail = localStorage.getItem('userEmail');

    if (userId && userEmail) {
      this.router.navigate(['dashboard'])
    }else {
      this.router.navigate(['auth'])
    }
  }

}
