import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFirebaseComponent } from './registro-firebase.component';

describe('RegistroFirebaseComponent', () => {
  let component: RegistroFirebaseComponent;
  let fixture: ComponentFixture<RegistroFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFirebaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
