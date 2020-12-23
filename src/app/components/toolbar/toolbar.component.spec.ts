import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ExportService } from '../../service/export.service';
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
});
