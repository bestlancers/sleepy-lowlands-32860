import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAuthCheckComponent } from './start-auth-check.component';

describe('StartAuthCheckComponent', () => {
  let component: StartAuthCheckComponent;
  let fixture: ComponentFixture<StartAuthCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAuthCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAuthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
