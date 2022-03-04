import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { DetailsCharacterComponent } from './details-character.component';

describe('DetailsCharacterComponent', () => {
  let component: DetailsCharacterComponent;
  let fixture: ComponentFixture<DetailsCharacterComponent>;

  const fakeActivatedRoute = { snapshot: { data: {} } } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsCharacterComponent],
      imports: [HttpClientModule],
      providers: [Router, { provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
