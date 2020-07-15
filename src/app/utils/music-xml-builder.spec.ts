import {buildAlter, buildDurationAndType, build} from './music-xml-builder';

describe('build', () => {
  it('builds empty xml', () => {
    expect(build({rhythmElements: []})).toBe('<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
      '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">' +
      '<score-partwise version="3.1">' +
      '<part-list>' +
      '<score-part id="P1">' +
      '<part-name>Music</part-name>' +
      '</score-part>' +
      '</part-list>' +
      '<part id="P1">' +
      '<measure number="1">' +
      '<attributes>' +
      '<divisions>1</divisions>' +
      '<key>' +
      '<fifths>0</fifths>' +
      '</key>' +
      '<time>' +
      '<beats>4</beats>' +
      '<beat-type>4</beat-type>' +
      '</time>' +
      '<clef>' +
      '<sign>G</sign>' +
      '<line>2</line>' +
      '</clef>' +
      '</attributes>' +
      '<barline location="right"><bar-style>light-heavy</bar-style></barline>' +
      '</measure>' +
      '</part>' +
      '</score-partwise>');
  });
});

describe('buildAlter', () => {
  it('builds 1, when #', () => {
    expect(buildAlter('#')).toBe('<alter>1</alter>');
  });

  it('builds -1, when b', () => {
    expect(buildAlter('b')).toBe('<alter>-1</alter>');
  });
});

describe('buildDurationAndType', () => {
  it('builds all correct variants, if duration numerator is 1', () => {
    expect(buildDurationAndType({numerator: 1, denominator: 1})).toBe('<duration>32</duration><type>whole</type>');
    expect(buildDurationAndType({numerator: 1, denominator: 2})).toBe('<duration>16</duration><type>half</type>');
    expect(buildDurationAndType({numerator: 1, denominator: 4})).toBe('<duration>8</duration><type>quarter</type>');
    expect(buildDurationAndType({numerator: 1, denominator: 8})).toBe('<duration>4</duration><type>eighth</type>');
    expect(buildDurationAndType({numerator: 1, denominator: 16})).toBe('<duration>2</duration><type>16th</type>');
    expect(buildDurationAndType({numerator: 1, denominator: 32})).toBe('<duration>1</duration><type>32nd</type>');
  });
});


