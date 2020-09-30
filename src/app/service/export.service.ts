import { Injectable } from '@angular/core';
import { AppState } from '../store/model';
import { saveAs } from 'file-saver';
import format from 'xml-formatter';
import { build } from '../utils/music-xml-builder';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  public exportMusicXml(appState: AppState) {
    const blob = new Blob([format(build(appState.track, appState.cover))], { type: 'text/xml;charset=utf-8' });
    saveAs(blob, `${this.formatFilename(appState.cover.title) ?? 'untitled'}.xml`);
  }

  public formatFilename(fileName: string): string {
    return fileName.toLowerCase().trim().replace(/\s+/g, '-');
  }
}
