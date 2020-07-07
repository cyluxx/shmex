import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RenderComponent} from './render.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialAppState} from "../../store/state";

describe('RenderComponent', () => {
  let component: RenderComponent;
  let fixture: ComponentFixture<RenderComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RenderComponent],
      providers: [provideMockStore({initialState: {app: initialAppState}})],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
