import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetparamsService {
  headers=new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json');
  httpOptions={
    headers: this.headers
  }

  // headers=new HttpHeaders().set('Content-Type','text/html').set('Accept','application/json');
  // httpOptions={

  //   headers: this.headers
  // }



  constructor(private http:HttpClient) { }

  url:string ="https://jsonplaceholder.typicode.com/posts";
  url2:string="http://www.ancpi.ro/aplicatii/urmarireCerereRGI/apptrack.php";
  url3:string="http://www.ancpi.ro/aplicatii/urmarireCerereRGI/data/ocpi.json";
  url4:string="http://www.ancpi.ro/aplicatii/urmarireCerereRGI/data/bcpi.json";
  getbyId(name,ide,tit){
    const httpParams=new HttpParams({
      fromObject:{
        userId:name,
        id:ide,
        title:tit
      }
    });
    return this.http.get(this.url,{params:httpParams});
    
  }


  getvalues(){
    return this.http.get(this.url3);
  }

  getvalues1(){
    return this.http.get(this.url4);
  }


  getbyname(name,year,numar){
    const httpParams=new HttpParams({
      fromObject:{
        b:name,
        y:year,
        a:numar
      }
    });
    return this.http.get(this.url2,{params:httpParams});
    
  }
}
