import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-row-details',
  templateUrl: './view-row-details.component.html',
  styleUrls: ['./view-row-details.component.css']
})
export class ViewRowDetailsComponent implements OnInit {

  rowData = [];
  constructor(private dialogRef: MatDialogRef<ViewRowDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.rowData = Object.values(this.data);


  }

  onClose() {
    this.dialogRef.close();
  }

}
