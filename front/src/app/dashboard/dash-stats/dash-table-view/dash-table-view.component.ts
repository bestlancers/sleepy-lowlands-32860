import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewRowDetailsComponent } from '../../modals/view-row-details/view-row-details.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { DeleteRowDialogComponent } from '../../modals/delete-row-dialog/delete-row-dialog.component';
import { EditRowDialogComponent } from '../../modals/edit-row-dialog/edit-row-dialog.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dash-table-view',
  templateUrl: './dash-table-view.component.html',
  styleUrls: ['./dash-table-view.component.css']
})
export class DashTableViewComponent implements OnInit, OnChanges {
  driveAccessToken = localStorage.getItem('driveAccessToken');
  sheetId = localStorage.getItem('sheetId')

  displayedColumns: string[] = ['NumarLucrare', 'Proprietar', 'UAT', 'Adresa', 'OCPI', 'BCPI', 'Anul', 'NumarCerereOCPI', 'TipulLucrarii', 'StareCurenta', 'Action'];
  @Input() USER_DATA = [];
  statsTabledata = [];
  dataSource = new MatTableDataSource<any>(this.statsTabledata);
  constructor(private dialog: MatDialog, private http: HttpClient, private snackbar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.statsTabledata = [];
    this.USER_DATA.forEach((element, i) => {
      var arrayToString = JSON.stringify(Object.assign({}, element));  // convert array to string
      var stringToJsonObject = JSON.parse(arrayToString);
      this.statsTabledata.push(stringToJsonObject);
    });
    this.dataSource = new MatTableDataSource<any>(this.statsTabledata);
  }

  ViewData(elem) {
    this.dialog.open(ViewRowDetailsComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      data: elem
    })
  }
  EditRow(data, index) {
    this.dialog.open(EditRowDialogComponent, {
      data: { data },
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh'
    }).afterClosed().subscribe(result => {
      if (!result.isCancel && result.isUpdated) {
        this.snackbar.open('Row updated', 'Ok', {
          duration: 2000
        });
      } else if (!result.isCancel && !result.isUpdated) {
        this.snackbar.open('something went wrong', 'Ok', {
          duration: 2000
        });
      }
    })
  }

  DeleteRow(index) {
    console.log(this.USER_DATA[index]);
    const deleteData = this.USER_DATA[index];
    this.dialog.open(DeleteRowDialogComponent, {
      width: '40vw'
    }).afterClosed().subscribe(result => {
      if (result) {
        const options = {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.driveAccessToken}`),
          body: {
            sheetId: this.sheetId,
            workSheetName: "sheet1",
            ocpi: deleteData[13],
            bcpi: deleteData[14],
            numar: deleteData[16],
            year: deleteData[15]
          }
        }
        this.http.request('DELETE', environment.baseUrl + 'work/sheets/rows', options).subscribe(
          (res: any) => {
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
              )             }
          }
        )
      }
    })

  }
}
