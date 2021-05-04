import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.css']
})
export class ParaComponent implements OnInit {

  constructor(private router: Router) { }


  // tslint:disable-next-line:typedef
  getalert(){
    alert('Please confirm to leave this page');
    this.router.navigate(['/register']);
  }
  ngOnInit(): void {
  }

}
