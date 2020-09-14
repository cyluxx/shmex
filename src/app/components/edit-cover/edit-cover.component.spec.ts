import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoverComponent } from './edit-cover.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppState} from '../../store/model';

describe('EditCoverComponent', () => {
  let component: EditCoverComponent;
  let fixture: ComponentFixture<EditCoverComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCoverComponent ],
      providers: [provideMockStore({initialState: initialAppState})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EditCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
