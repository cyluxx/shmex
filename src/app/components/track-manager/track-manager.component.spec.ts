import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackManagerComponent } from './track-manager.component';

describe('TrackManagerComponent', () => {
  let component: TrackManagerComponent;
  let fixture: ComponentFixture<TrackManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
