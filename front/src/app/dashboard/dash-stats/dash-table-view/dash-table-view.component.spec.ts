import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTableViewComponent } from './dash-table-view.component';

describe('DashTableViewComponent', () => {
  let component: DashTableViewComponent;
  let fixture: ComponentFixture<DashTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
