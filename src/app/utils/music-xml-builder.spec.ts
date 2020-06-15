import {finalize} from "./music-xml-builder";

describe('finalize', () => {

  it('wraps body correctly', () => {
    expect(finalize('body')).toBe('<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
      + '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">'
      + '<score-partwise version="3.1">'
      + 'body'
      + '</score-partwise>');
  });
});
