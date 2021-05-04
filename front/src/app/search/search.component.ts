import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { GetparamsService } from '../getparams.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userId='';
  user:any;

  id:string;

  title:string;

  name:string;
  constructor(private activatedRoute: ActivatedRoute, private eService:GetparamsService) { 
    this.activatedRoute.queryParams.subscribe(data =>{
      console.log(data);
      
    });
  }

  valueChange(value){
    this.name=value;
    console.log(this.name);
  }

  valueChange1(val){
    this.id=val;
    console.log(this.id);
  }

  valueChange2(a){
    this.title=a;
    console.log(this.title);
  }


  getContact(name,id,title){
    console.log("id is ",name);
    console.log("the inner id is ",id);
    console.log("the passed title is ",title);
    this.eService.getbyId(name,id,title).subscribe(data =>{
      console.log(data);
      if(!Object.keys(data).length==true){
        console.log("ayiooo pocheeeeyyyy");
        
      }
      else{
        this.user=data;
      }
      
    },
    error => {
      console.log("Hello there is a sort of error",error);
      // this.errors = error
    }
   
    );
  }


  ngOnInit(): void {
  }

}
