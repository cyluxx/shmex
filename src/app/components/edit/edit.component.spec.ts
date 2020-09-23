import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../store/model';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let store: MockStore<{ app: AppState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [provideMockStore({ initialState: { app: initialAppState } })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
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
