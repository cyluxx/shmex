import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrackManagerComponent } from './track-manager.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../store/model';
import { ExportService } from '../../service/export.service';

describe('TrackManagerComponent', () => {
  let component: TrackManagerComponent;
  let fixture: ComponentFixture<TrackManagerComponent>;
  let store: MockStore<{ app: AppState }>;
  let mockExportService: any;

  beforeEach(
    waitForAsync(() => {
      mockExportService = jasmine.createSpyObj(['exportMusicXml']);
      TestBed.configureTestingModule({
        declarations: [TrackManagerComponent],
        providers: [
          provideMockStore({ initialState: { app: initialAppState } }),
          { provide: ExportService, useValue: mockExportService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackManagerComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
