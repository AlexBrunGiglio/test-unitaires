import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';

import { HomePublicComponent } from './home.component';

describe('HomePublicComponent', () => {
  let component: HomePublicComponent;
  let fixture: ComponentFixture<HomePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePublicComponent],
      imports: [HttpClientModule, OverlayModule, MatSnackBarModule,],
      providers: [Router, DialogService, {
        provide: MatSnackBarRef,
        useValue: {}
      }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
