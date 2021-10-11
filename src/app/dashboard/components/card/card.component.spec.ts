import { AppModule } from './../../../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { CardComponent } from './card.component';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;


  beforeEach(async () => {
     await TestBed.configureTestingModule({
      declarations: [ CardComponent],
      imports: [
        MatDialogModule,
        MatCardModule,
        AppModule
      ],
      providers: [
        { provide: MatDialogRef ,useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call openDialog', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const app = fixture.componentInstance;
    app.openModalDetails();
    expect (app.dialog.openDialogs).toBeTruthy();
  })
});
