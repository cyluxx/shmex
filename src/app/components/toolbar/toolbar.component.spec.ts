import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../store/model';
import { ExportService } from '../../service/export.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: MockStore<{ app: AppState }>;
  let mockExportService: any;

  beforeEach(
    waitForAsync(() => {
      mockExportService = jasmine.createSpyObj(['exportMusicXml']);
      TestBed.configureTestingModule({
        declarations: [ToolbarComponent],
        providers: [
          provideMockStore({ initialState: { app: initialAppState } }),
          { provide: ExportService, useValue: mockExportService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('calls exportMusicXML, when export button is pressed', fakeAsync(() => {
    const toolbar: HTMLElement = fixture.nativeElement;
    const exportMusicXmlButton: HTMLButtonElement = toolbar.querySelector('#export-music-xml-button');
    exportMusicXmlButton.click();

    tick();
    expect(mockExportService.exportMusicXml).toHaveBeenCalledTimes(1);
  }));
});
