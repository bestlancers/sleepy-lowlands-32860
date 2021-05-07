import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRowDialogComponent } from './../modals/delete-row-dialog/delete-row-dialog.component';
import { EditRowDialogComponent } from './../modals/edit-row-dialog/edit-row-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewRowDetailsComponent } from './../modals/view-row-details/view-row-details.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AppTrackNumComponent } from '../modals/app-track-num/app-track-num.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadCounter = 0;
  driveAccessToken = localStorage.getItem('driveAccessToken');
  sheetId = localStorage.getItem('sheetId')
  USER_DATA = [];
  constructor(private http: HttpClient, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getSheetData();
  }

  getSheetData(){
    this.loadCounter += 1;
    this.USER_DATA = [];
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.driveAccessToken}`)
    }
    const payload = {
      sheetId: this.sheetId,
      workSheetName: 'Sheet1'
    }
    this.http.post(environment.baseUrl+'work/sheets/rowslist', payload, header).subscribe(
      (res: any) => {
        console.log(res.data.values);
        if (res.data.values) {
          res.data.values.forEach((element, i) => {
            var arrayToString = JSON.stringify(Object.assign({}, element));  // convert array to string
            var stringToJsonObject = JSON.parse(arrayToString);
            this.USER_DATA.push(stringToJsonObject);
          });
          //this.USER_DATA.splice(0,1);
          
        }
        this.loadCounter -= 1;
      },
      err => {
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.getSheetData();
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )
        }

        this.loadCounter -= 1;
      }
    )
  }

  EditRow(data, index){
    this.dialog.open(EditRowDialogComponent, {
      data: {data},
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh'
    }).afterClosed().subscribe(result => {
      if (!result.isCancel && result.isUpdated) {
        this.getSheetData();
        this.snackbar.open('Row updated', 'Ok', {
          duration: 2000
        });
      } else if(!result.isCancel && !result.isUpdated) {
        this.snackbar.open('something went wrong', 'Ok', {
          duration: 2000
        });
      }
    })
  }

  DeleteRow(index){
    console.log(this.USER_DATA[index]);
    const deleteData = this.USER_DATA[index];
    this.dialog.open(DeleteRowDialogComponent, {
      width: '40vw'
    }).afterClosed().subscribe(result =>{
      if (result) {
        const options = {
          headers: new HttpHeaders()
            .set('Authorization',  `Bearer ${this.driveAccessToken}`),
          body: {
            sheetId: this.sheetId,
            workSheetName: "sheet1",
            ocpi: deleteData[13],
            bcpi: deleteData[14],
            numar: deleteData[16],
            year: deleteData[15]
          }
        }
        this.http.request('DELETE', environment.baseUrl+'work/sheets/rows', options).subscribe(
          (res: any) => {
              this.getSheetData();
              this.snackbar.open('Row deleted', 'Ok', {
                duration: 2000
              })
          },
          err => {
            if(err.status === 401) {
              this.authService.renewToken.subscribe(
                (res: any) => {
                  this.DeleteRow(index);
                },
                err => {
                  // this.authService.logout();
                  console.log(err);
                }
              )
            }
          }
        )
      }
    })

  }
  UpdateDepusOCPI(elem)
  {
    this.dialog.open(AppTrackNumComponent, {
      width: '40vw',
      data : { rowData:elem }
    }).afterClosed().subscribe(
      (result: any) => {
        if (!result.isCancel && result.isUpdated) {
          this.getSheetData();
          this.snackbar.open('Row updated', 'Ok', {
            duration: 2000
          });
        }
        else if (!result.isCancel && !result.isUpdated) {
          this.snackbar.open('something went wrong', 'Ok', {
            duration: 2000
          });
        }
      },
      err => {
        console.error(err);
      }
    )
  }
  ViewData(elem){
    this.dialog.open(ViewRowDetailsComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      data: elem
    })
  }

  SyncData(){
    this.loadCounter += 1;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.driveAccessToken}`)
    }
    const payload = {
      sheetId: this.sheetId,
      workSheetName: 'sheet1',
      name: 'sheet'
    }
    this.http.put(environment.baseUrl+'sync', payload, header).subscribe(
      (res: any) => {
          this.loadCounter -= 1;
          this.snackbar.open('Synced Succefully', 'Ok', {
            duration: 2000
          });
      },
      err => {
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.SyncData();
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )        }
        this.loadCounter -= 1;
      }
    )
  }

}
