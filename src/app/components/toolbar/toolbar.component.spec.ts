import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ExportService } from '../../service/export.service';
import { ToolbarState } from '../../store/enum';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../store/reducer';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockExportService: any;

  beforeEach(
    waitForAsync(() => {
      mockExportService = jasmine.createSpyObj(['exportMusicXml']);
      TestBed.configureTestingModule({
        declarations: [ToolbarComponent],
        providers: [{ provide: ExportService, useValue: mockExportService }],
        imports: [StoreModule.forRoot({ app: reducer })],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
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

  it('should set the toolbar state to TRACK_MANAGER, onTrackManager', (done) => {
    component.onTrackManager();

    component.appState$.subscribe((next) => {
      expect(next.toolbar.state).toBe(ToolbarState.TRACK_MANAGER);
      done();
    });
  });

  it('should set the toolbar state to EDIT_SHEETS, on onEditSheets', (done) => {
    component.onEditSheets();

    component.appState$.subscribe((next) => {
      expect(next.toolbar.state).toBe(ToolbarState.EDIT_SHEETS);
      done();
    });
  });

  it('should set the toolbar state to EDIT_COVER, on onEditCover', (done) => {
    component.onEditCover();

    component.appState$.subscribe((next) => {
      expect(next.toolbar.state).toBe(ToolbarState.EDIT_COVER);
      done();
    });
  });
});
