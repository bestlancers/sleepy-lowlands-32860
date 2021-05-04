import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  result: any;
  constructor(public afAuth: AngularFireAuth, private http: HttpClient, private configService: ConfigService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  GoogleAuth() {
    this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  // tslint:disable-next-line:typedef
  AuthLogin(provider) {
    const afterAuth = this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.displayName);
        localStorage.setItem('uid', result.user.uid);
        this.askDrivePermission();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // tslint:disable-next-line:typedef
  askDrivePermission() {
    this.http.get(environment.baseUrl + 'permission').subscribe(
      (res: any) => {
        window.location = res.data;
      },
      err => {
        console.error(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }
  logout(){
    this.configService.setConfig({ isLoader: false });
    localStorage.clear();
    this.router.navigate(['/']);
  }
  renewToken = new Observable((observer) =>  {
    const payload = {
      sheetId: localStorage.getItem('sheetId'),
      email: localStorage.getItem('userEmail'),
      refreshToken: localStorage.getItem('refreshToken')
    }

    this.http.patch(environment.baseUrl + 'update/token', payload).subscribe(
      (res: any) => {
        observer.next(true);
      },
      err => {
        this.logout();
        observer.error('renew token error');
      }
    )});
}
