import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {

  username = localStorage.getItem('userName');
  constructor(private router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
  }
  logout(){
    this.configService.setConfig({ isLoader: false });
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
