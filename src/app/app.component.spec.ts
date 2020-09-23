import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from './store/model';
import { ToolbarState } from './store/enum';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<{ app: AppState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState: { app: initialAppState } })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should show the edit component, when the toolbar state is EDIT_SHEETS', () => {
    store.setState({
      app: { ...initialAppState, toolbar: { ...initialAppState.toolbar, state: ToolbarState.EDIT_SHEETS } },
    });

    component.toolbarState$.subscribe((next) => expect(next).toBe(ToolbarState.EDIT_SHEETS));
  });

  it('should show the edit cover component, when the toolbar state is EDIT_COVER', () => {
    store.setState({
      app: { ...initialAppState, toolbar: { ...initialAppState.toolbar, state: ToolbarState.EDIT_COVER } },
    });

    component.toolbarState$.subscribe((next) => expect(next).toBe(ToolbarState.EDIT_COVER));
  });
});
