import { Component, OnInit } from '@angular/core';
import { GetparamsService } from '../getparams.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-ser',
  templateUrl: './ser.component.html',
  styleUrls: ['./ser.component.css']
})
export class SerComponent implements OnInit {

  constructor(private eService: GetparamsService,private dom:DomSanitizer) {
   
   }


  name:number;
   user:any;
  dropfilter:any;
   drop:any;
   year:number;
   numar:number;
   fla:boolean=false;

  valueChange(value){
    this.name=value;
    console.log(this.name);
  }


yearChange(s){
  this.year=s;
  console.log(this.year);

}

numarChange(b){
  this.numar=b;
  console.log(this.numar);
}


  getContact(name,year,numar){
    console.log("id is ",name);
   console.log("year is",year);
   console.log("numar is",numar);
    this.eService.getbyname(name,year,numar).subscribe(data =>{
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
      this.user=error.error.text;
      
     
    }
   
    );
  }

drop1:any;
selectedname:any;
selectname:any;

drop3:any;



//   load_home() {
//     document.getElementById("content").innerHTML='<object type="text/html" data="https://www.youtube.com/" ></object>';
// }
// async load_home() {
//   let url = this.user;

//   document.getElementById("content").innerHTML = await (await fetch(url)).text();
// }
flag:boolean=false;

onChangeName($event){
  this.fla=true;
  let drop2:any;
  this.flag=true;
  let val:any;
  var outputArray = [];  
  console.log(this.selectedname);
  this.eService.getvalues1().subscribe((res)=>{
      console.log(res);
      val=res;
      // console.log("-------------------------------------------------------")
      console.log(val)
      for (let p of val) {
        if(p.oid==this.selectedname)
        {
          
          drop2=p;
         console.log(drop2);
         
        //  this.drop3=drop2;
         outputArray.push(drop2);
        }
       
       
      }
     
       console.log(outputArray);
       this.drop3=outputArray;
        console.log("-----------------------------------------");
         console.log(this.drop3);
      
    });
   
    
}


onChangeName1($event){
  console.log(this.selectname);
}





  ngOnInit(): void {

    this.eService.getvalues().subscribe((result)=>{
      console.log(result);
      this.drop=result;
     
    });

   
  }




 
}
