import { TestBed } from '@angular/core/testing';

import { ExportService } from './export.service';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);
  });

  describe('formatFilename', () => {
    it('formats to untitled.xml, when empty string', () => {
      expect(service.formatFilename('')).toEqual('untitled.xml');
    });

    it('formats to untitled.xml, when string contains only whitespaces', () => {
      expect(service.formatFilename('   ')).toEqual('untitled.xml');
    });

    it('formats to lowercase', () => {
      expect(service.formatFilename('WithUppErCaSe')).toEqual('withuppercase.xml');
    });

    it('trims start and end whitespaces', () => {
      expect(service.formatFilename('  title   ')).toEqual('title.xml');
    });

    it('replaces middle whitespaces with hyphens', () => {
      expect(service.formatFilename(' a string with whitespaces ')).toEqual('a-string-with-whitespaces.xml');
    });
  });
});
