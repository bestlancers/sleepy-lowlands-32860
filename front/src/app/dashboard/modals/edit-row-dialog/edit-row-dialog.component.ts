import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AppTrackNumComponent } from '../app-track-num/app-track-num.component';

@Component({
  selector: 'app-edit-row-dialog',
  templateUrl: './edit-row-dialog.component.html',
  styleUrls: ['./edit-row-dialog.component.css']
})
export class EditRowDialogComponent implements OnInit {

  driveAccessToken = localStorage.getItem('driveAccessToken');
  regForm = new FormGroup({
    NumarLucrare: new FormControl(null, Validators.required),
    DepusOCPI: new FormControl(null, Validators.required),
    Beneficiar: new FormControl(null, Validators.required),
    Proprietar: new FormControl(null, Validators.required),
    Observatii: new FormControl(null, Validators.required),
    UAT: new FormControl(null, Validators.required),
    Adresa: new FormControl(null, Validators.required),
    CFTarla: new FormControl(null, Validators.required),
    Identificator: new FormControl(null, Validators.required),
    ContactServicii: new FormControl(null, Validators.required),
    PretTotalLucrare: new FormControl(null, Validators.required),
    Avans: new FormControl(null, Validators.required),
    Diferenta: new FormControl(null, Validators.required),
    OCPI: new FormControl(null, Validators.required),
    BCPI: new FormControl(null, Validators.required),
    Anul: new FormControl(null, Validators.required),
    NumarCerereOCPI: new FormControl(null, Validators.required),
    DataInregistrare: new FormControl(null, Validators.required),
    TermenSolutionare: new FormControl(null, Validators.required),
    TipulLucrarii: new FormControl(null, Validators.required),
    StareCurenta: new FormControl(null, Validators.required),
    Lucrare: new FormControl(null, Validators.required),
  })
  constructor(private authService: AuthService,private dialogRef: MatDialogRef<EditRowDialogComponent>, private http: HttpClient, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    console.log(this.data.data);
    const formKeys = Object.keys(this.regForm.controls);
    const formdata = Object.values(this.data.data);

    formKeys.map((o, i) => {
      this.regForm.get(o).setValue(formdata[i]);
    })
  }

  saveForm() {
    console.log(this.regForm.value);
    const payload = {
      sheetId: localStorage.getItem('sheetId'),
      workSheetName: 'Sheet1',
      values: [Object.values(this.regForm.value)],
      ocpi: this.regForm.get('OCPI').value,
      bcpi: this.regForm.get('BCPI').value,
      numar: this.regForm.get('NumarCerereOCPI').value,
      year: this.regForm.get('Anul').value
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
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.saveForm();
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )         }
      }
    )
  }

  onClose() {
    this.dialogRef.close({isCancel: true});
  }

}
