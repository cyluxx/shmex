import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialAppState} from "../../store/state";

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [provideMockStore({initialState: initialAppState})],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
