import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-row-dialog',
  templateUrl: './delete-row-dialog.component.html',
  styleUrls: ['./delete-row-dialog.component.css']
})
export class DeleteRowDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteRowDialogComponent> ) { }

  ngOnInit(): void {
  }

  onOk(){
    this.dialogRef.close(true)
  }
  onCancel(){
    this.dialogRef.close(false)
  }

}
