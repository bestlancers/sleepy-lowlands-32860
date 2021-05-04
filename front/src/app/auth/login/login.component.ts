import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from './../../../environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  config: any;
  driveToken: string;
  driveAccessToken: string;
  userEmail = localStorage.getItem('userEmail');
  headerColumns: string[] = ['numar lucare', 'depus ocpi', 'benificiar', 'proprietar', 'observatii', 'Uat', 'adresa', 'cf', 'identificator', 'contract servici', 'pret total lucare', 'avans', 'differenta', 'ocpi', 'bcpi', 'anul', 'numar cerere ocpi', 'data inregistere', 'terman', 'tipul', 'stare curenta', 'lucrare'];
  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.configService.sharedConfig.subscribe(config => this.config = config);
    this.route.queryParams.subscribe((params) => {
      this.driveToken = params['code'];
    });

    // this.driveToken = this.route.snapshot.params.code;
    if (this.driveToken) {
      this.configService.setConfig({ isLoader: true });
      this.getDriveToken();
    }
  }
  drivePermission() {
    this.configService.setConfig({ isLoader: true });
    this.authService.askDrivePermission();
  }
  getSheetId() {
    this.http.get(environment.baseUrl + 'fetch/sheetId/' + this.userEmail).subscribe(
      (res: any) => {
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userEmail', res.data.email);
        localStorage.setItem('sheetId', res.data.sheetId);
        this.gotoHome();
      },
      err => {
        console.error(err);
        if (err.status === 404) {
          this.createSheet();
        }
      }
    )
  }
  getDriveToken() {
    this.http
      .post(environment.baseUrl + 'token', {
        code: this.driveToken,
      })
      .subscribe(
        (res: any) => {
          localStorage.setItem('driveAccessToken', res.data.access_token);
          localStorage.setItem('userEmail', res.data.email);
          localStorage.setItem('userName', res.data.name);
          localStorage.setItem('refreshToken', res.data.refresh_token);
          this.driveAccessToken = res.data.access_token;
          this.userEmail = res.data.email;
          this.getSheetId();
        },
        (err) => {
          console.error(err);
        }
      );
  }
  createSheet() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.driveAccessToken}`)
    }
    this.http.post(environment.baseUrl + 'sheets', { "name": "test" },header).subscribe(
      (res1: any) => {
        const payload = {
          email: this.userEmail,
          sheetId: res1.data.spreadsheetId,
          refreshToken: localStorage.getItem('refreshToken')
        }
        this.http.post(environment.baseUrl + 'post/sheetId', payload).subscribe(
          (resS: any) => {
            localStorage.setItem('sheetId', res1.data.spreadsheetId);
            //this.createHeader();
            this.gotoHome();
          },
          errS => {
            console.error(errS);
          }
        )
      },
      err1 => {
        console.error(err1);
      }
    )
  }
  createHeader() {
    const payload = {
      sheetId: localStorage.getItem('sheetId'),
      workSheetName: 'Sheet1',
      values: [this.headerColumns],
    }
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.driveAccessToken}`)
    }
    this.http.post(environment.baseUrl + 'work/sheets/rows', payload, header).subscribe(
      (res: any) => {
        this.gotoHome();
      },
      err => {
        console.error(err);
      }
    )
  }
  gotoHome() {
    this.router.navigate(['/dashboard']);
  }
  googleAuth(): void {
    this.configService.setConfig({ isLoader: true });
    this.authService.GoogleAuth();
  }
}
