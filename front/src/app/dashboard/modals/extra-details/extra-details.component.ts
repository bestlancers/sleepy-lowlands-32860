import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { parse } from "angular-html-parser";

@Component({
  selector: 'app-extra-details',
  templateUrl: './extra-details.component.html',
  styleUrls: ['./extra-details.component.css']
})
export class ExtraDetailsComponent implements OnInit {
  JsonData = [];
  driveAccessToken = localStorage.getItem('driveAccessToken');
  constructor(public dialogRef: MatDialogRef<ExtraDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSave(){
    if(this.data.rowData)
    {
      const payload = {
        sheetId: localStorage.getItem('sheetId'),
        workSheetName: 'Sheet1',
        values: [this.data.rowData],
        lucrare:this.data.rowData[0],
      }
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.driveAccessToken}`)
      }
      this.http.put(environment.baseUrl + 'work/sheets/rows', payload, header).subscribe(
        (res: any) => {
          this.dialogRef.close({isCancel: false, isUpdated: true});
        },
        err => {
          this.dialogRef.close({isCancel: false, isUpdated: false});
          console.error(err);
        }
      )
    }
    else{
      this.dialogRef.close({type: true, data: this.JsonData});
    }
  }

  onCancel(){
    this.dialogRef.close({type: false, data: false});

  }

}
