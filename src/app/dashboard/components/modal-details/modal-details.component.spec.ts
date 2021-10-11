import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';

import { ModalDetailsComponent } from './modal-details.component';



describe('ModalDetailsComponent', () => {
  let component: ModalDetailsComponent;
  let fixture: ComponentFixture<ModalDetailsComponent>;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsComponent ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
