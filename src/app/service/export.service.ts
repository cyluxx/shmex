import { Injectable } from '@angular/core';
import { Score } from '../store/model';
import { saveAs } from 'file-saver';
import format from 'xml-formatter';
import { buildMusicXml } from '../utils/music-xml-builder';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  public exportMusicXml(score: Score) {
    const blob = new Blob([format(buildMusicXml(score))], { type: 'text/xml;charset=utf-8' });
    saveAs(blob, this.formatFilename(score.cover.title));
  }

  public formatFilename(fileName: string): string {
    return (fileName.toLowerCase().trim().replace(/\s+/g, '-') || 'untitled') + '.xml';
  }
}
