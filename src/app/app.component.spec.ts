import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppState} from './store/model';

describe('AppComponent', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [provideMockStore({initialState: {app: initialAppState}})],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    expect(app).toBeTruthy();
  });
});
