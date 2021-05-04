import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRowDetailsComponent } from './view-row-details.component';

describe('ViewRowDetailsComponent', () => {
  let component: ViewRowDetailsComponent;
  let fixture: ComponentFixture<ViewRowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRowDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
