import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { parse } from "angular-html-parser";

@Component({
  selector: 'app-extra-details',
  templateUrl: './extra-details.component.html',
  styleUrls: ['./extra-details.component.css']
})
export class ExtraDetailsComponent implements OnInit {
  JsonData = [];
  constructor(public dialogRef: MatDialogRef<ExtraDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onSave(){
    this.dialogRef.close({type: true, data: this.JsonData});
  }

  onCancel(){
    this.dialogRef.close({type: false, data: false});

  }

}
