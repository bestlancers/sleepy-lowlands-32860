import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExtraDetailsComponent } from './../extra-details/extra-details.component';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-app-track-num',
  templateUrl: './app-track-num.component.html',
  styleUrls: ['./app-track-num.component.css']
})
export class AppTrackNumComponent implements OnInit {

  loadCounter = 0;
  ocpiStr = "";
  bcpiStr = "";
  OCPI = [];
  BCPI = [];
  Anul = [];
  appTrackForm = new FormGroup({
    ocpi: new FormControl(null, Validators.required),
    ocpiStr: new FormControl(null, Validators.required),
    bcpi: new FormControl(null, Validators.required),
    bcpiStr: new FormControl(null, Validators.required),
    anul: new FormControl(null, Validators.required),
    numar: new FormControl(null, Validators.required),
  })
  constructor(public dialogRef: MatDialogRef<AppTrackNumComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.getOcpiValue();
    this.getAnul();
  }



  getOcpiValue() {
    this.loadCounter += 1;
    this.http.get(environment.baseUrl+'ocpilist').subscribe(
      (res: any) => {
        this.OCPI = res.data;
        this.loadCounter -= 1;
      },
      err => {
        console.error(err);
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.getOcpiValue();
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )         }
        this.loadCounter -= 1;
      }
    )
  }
  onOCPIchange(event) {
   this.ocpiStr = event.source.triggerValue
   this.appTrackForm.get('ocpiStr').setValue(this.ocpiStr)
   this.getBCPIvalue(event.value);
  }

  onBCPIchange(event) {
   this.bcpiStr = event.source.triggerValue
   this.appTrackForm.get('bcpiStr').setValue(this.bcpiStr)
  }

  getAnul() {
    for (let index = 2021; index >= 2006; index--) {
      this.Anul.push(index);
    }
  }
  getBCPIvalue(ocpi) {
    this.http.get(environment.baseUrl+'bcpilist?oid=' + ocpi).subscribe(
      (res: any) => {
        this.BCPI = res.data;
      },
      err => {
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.getBCPIvalue(ocpi);
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )         }
      }
    )
  }
  onNoClick() {
    this.dialogRef.close({ isCancel: true, data: null });
  }

  onOkClick() {
    this.dialogRef.close({ isCancel: false, data: "data" });
  }
  getExtraDetails() {
   console.log("aaaa",this.appTrackForm.value);
    const keys = Object.keys(this.appTrackForm.value);
    const values = Object.values(this.appTrackForm.value);
    const fieldsData = [];
    keys.forEach((o,i) => {
      fieldsData.push({[o]: values[i]});
    })
    if (this.appTrackForm.valid) {
      const formdata = this.appTrackForm.value;
      this.http.get(environment.baseUrl + 'webview?b=' + formdata.bcpi + '&y=' + formdata.anul + '&a=' + formdata.numar).subscribe(
        (res: any) => {
          console.log(res.data);
          this.dialog.open(ExtraDetailsComponent, {
            width: '40vw',
            maxHeight: '100vh',
            data: res.htmlEntity
          }).afterClosed().subscribe(result => {
            if (result.type) {
              this.dialogRef.close({ isCancel: false, data: [res.data, ...fieldsData] });
            }
          });
        },
        err => {
          if(err.status === 401) {
            this.authService.renewToken.subscribe(
              (res: any) => {
                this.getExtraDetails();
              },
              err => {
                // this.authService.logout();
                console.log(err);
              }
            )           }
        }
      )
    }
  }

}
