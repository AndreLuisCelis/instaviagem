import { ModalDetailsComponent } from './../modal-details/modal-details.component';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input() data:any;


  ngOnInit(): void {
  }

  openModalDetails(): void {
    const dialogRef = this.dialog.open(ModalDetailsComponent, {
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
