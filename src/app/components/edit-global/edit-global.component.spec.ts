import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGlobalComponent } from './edit-global.component';

describe('EditGlobalComponent', () => {
  let component: EditGlobalComponent;
  let fixture: ComponentFixture<EditGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
