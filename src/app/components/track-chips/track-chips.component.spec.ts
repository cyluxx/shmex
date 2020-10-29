import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrackChipsComponent } from './track-chips.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../store/model';
import { ExportService } from '../../service/export.service';

describe('TrackTabsComponent', () => {
  let component: TrackChipsComponent;
  let fixture: ComponentFixture<TrackChipsComponent>;
  let store: MockStore<{ app: AppState }>;
  let mockExportService: any;

  beforeEach(
    waitForAsync(() => {
      mockExportService = jasmine.createSpyObj(['exportMusicXml']);
      TestBed.configureTestingModule({
        declarations: [TrackChipsComponent],
        providers: [
          provideMockStore({ initialState: { app: initialAppState } }),
          { provide: ExportService, useValue: mockExportService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackChipsComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
