import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderComponent } from './render.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../store/model';

describe('RenderComponent', () => {
  let component: RenderComponent;
  let fixture: ComponentFixture<RenderComponent>;
  let store: MockStore<{ app: AppState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderComponent],
      providers: [provideMockStore({ initialState: { app: initialAppState } })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
