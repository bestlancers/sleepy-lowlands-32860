import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppTrackNumComponent } from '../modals/app-track-num/app-track-num.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {
  validationMessage:string = 'This is a required field';
  DepusOCPI = [{id:2,name:'DA'},{id:1,name:'NU'}];
  isTrackDetailVisible : boolean = true;
  driveAccessToken = localStorage.getItem('driveAccessToken');
  regForm = new FormGroup({
    NumarLucrare: new FormControl(null),
    DepusOCPI: new FormControl(null),
    Beneficiar: new FormControl(null, Validators.required),
    Proprietar: new FormControl(null, Validators.required),
    Observatii: new FormControl(null),
    UAT: new FormControl(null, Validators.required),
    Adresa: new FormControl(null, Validators.required),
    CFTarla: new FormControl(null, Validators.required),
    Identificator: new FormControl(null, Validators.required),
    ContactServicii: new FormControl(null),
    PretTotalLucrare: new FormControl(null),
    Avans: new FormControl(null),
    Diferenta: new FormControl(null),
    OCPI: new FormControl(null, Validators.required),
    BCPI: new FormControl(null, Validators.required),
    Anul: new FormControl(null, Validators.required),
    NumarCerereOCPI: new FormControl(null, Validators.required),
    DataInregistrare: new FormControl(null, Validators.required),
    TermenSolutionare: new FormControl(null, Validators.required),
    TipulLucrarii: new FormControl(null),
    StareCurenta: new FormControl(null, Validators.required),
    Lucrare: new FormControl(null),
    QueryParamBCPI: new FormControl(""),
    CombinedkeyOBNY: new FormControl(""),
    Inspector: new FormControl(""),
    Asregistrator: new FormControl(""),
    Registrator: new FormControl(""),
    ReferatDeCompletare: new FormControl(""),
    CalendarEventID: new FormControl(""),
    QueryParamOCPI: new FormControl(null),

  })
  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
  }
  openTrackModal() {
    this.dialog.open(AppTrackNumComponent, {
      width: '40vw',
    }).afterClosed().subscribe(
      (res: any) => {
        if (!res.isCancel) {
          const fieldsData = [];
          const keys = Object.keys(res.data[0]);
          const values = Object.values(res.data[0]);
          keys.forEach((element, i) => {
            const a = { [element]: values[i] }
            fieldsData.push(a);
          });
          res.data.splice(0, 1);
          res.data.map(o => {
            const a = Object.assign({}, o);
            fieldsData.push(a);
          });
          
          fieldsData.map(o => {
            const key = Object.keys(o);
            const value = Object.values(o);
           let val_1 = (document.getElementById("QueryParamOCPI") as HTMLTextAreaElement).value;
           let val_2 = (document.getElementById("QueryParamBCPI") as HTMLTextAreaElement).value;
           let val_3 = (document.getElementById("Anul") as HTMLTextAreaElement).value;
           let val_4 = (document.getElementById("NumarCerereOCPI") as HTMLTextAreaElement).value;
 
           var CombinedValue = val_1 + val_2 + val_3 + val_4;
           this.regForm.get('CombinedkeyOBNY').setValue(CombinedValue)
           
            switch (key[0]) {
              case 'Număr cerere:':
                this.regForm.get('NumarCerereOCPI').setValue(value[0])
                break;
              case 'Data înregistrare:':
                this.regForm.get('DataInregistrare').setValue(value[0])
                break;
              case 'Termen soluționare:':
                this.regForm.get('TermenSolutionare').setValue(value[0])
                break;
              case 'Obiectul cererii:':
                //this.regForm.get('Observatii').setValue(value[0])
                this.regForm.get('TipulLucrarii').setValue(value[0])
                break;
              case 'Stare curentă:':
                this.regForm.get('StareCurenta').setValue(value[0])
                break;
              case 'ocpiStr':
                this.regForm.get('OCPI').setValue(value[0])
                break;
              case 'ocpi':
                this.regForm.get('QueryParamOCPI').setValue(value[0])
                break;
              case 'bcpiStr':
                this.regForm.get('BCPI').setValue(value[0])
                break;
              case 'bcpi':
                this.regForm.get('QueryParamBCPI').setValue(value[0])
                break;
              
              case 'anul':
                this.regForm.get('Anul').setValue(value[0])
                 break;
              default:
                break;
            }
          })
          
        }
      },
      err => {
        console.error(err);
      }
    )
  }

  saveForm() {
    if (this.regForm.valid) {
      const payload = {
        sheetId: localStorage.getItem('sheetId'),
        workSheetName: 'Sheet1',
        values: [Object.values(this.regForm.value)],
      }
      console.log('payload',payload);
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.driveAccessToken}`)
      }
      this.http.post(environment.baseUrl + 'work/sheets/rows', payload, header).subscribe(
        (res: any) => {
          this.router.navigate(['/dashboard/registru']);
        },
        err => {
          console.error(err);
        }
      )
    }else{
      this.regForm.markAllAsTouched()
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/registru']);
  }
  onDepusOCPIchange(event) {
    if(event.source.triggerValue == 'NU'){
    this.isTrackDetailVisible = false;
    }else
    {
      this.isTrackDetailVisible = true;
    }
   }

}
