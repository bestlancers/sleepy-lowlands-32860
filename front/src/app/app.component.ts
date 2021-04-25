import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'queryparams';
  name:string;
  constructor(){
    // this.name;
  }
  valueChange(value){
    this.name=value;
    console.log(this.name);
  }
  ck(){
  console.log("name+"+this.name);
  }
  
}
