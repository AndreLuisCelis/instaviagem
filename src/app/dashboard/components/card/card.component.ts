import { ModalDetailsComponent } from './../modal-details/modal-details.component';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';


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
  ngAfterViewInit() {

  }

  openModalDetails(): void {
   let dialogRef = this.dialog.open(ModalDetailsComponent, {
      data: this.data
    });
    let sub = new Subscription()
     sub.add(dialogRef.afterClosed().subscribe(result => {
    }));

  }

}
