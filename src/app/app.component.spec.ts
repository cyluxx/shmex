import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from './store/model';
import { ToolbarState } from './store/enum';

describe('AppComponent', () => {
  let store: MockStore<AppState>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState: { app: initialAppState } })],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show the edit component, when the toolbar state is EDIT_SHEETS', () => {
    store = TestBed.inject(MockStore);

    store.setState({ ...initialAppState, toolbar: { ...initialAppState.toolbar, state: ToolbarState.EDIT_SHEETS } });

    component.toolbarState$.subscribe((next) => expect(next).toBe(ToolbarState.EDIT_SHEETS));
  });
});
