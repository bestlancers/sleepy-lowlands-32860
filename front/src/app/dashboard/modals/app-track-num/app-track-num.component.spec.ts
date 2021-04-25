import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTrackNumComponent } from './app-track-num.component';

describe('AppTrackNumComponent', () => {
  let component: AppTrackNumComponent;
  let fixture: ComponentFixture<AppTrackNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTrackNumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTrackNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
