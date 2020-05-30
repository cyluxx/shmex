import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewComponent} from './preview.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialAppState} from "../../store/state";

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewComponent],
      providers: [provideMockStore({initialState: {app: initialAppState}})],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
