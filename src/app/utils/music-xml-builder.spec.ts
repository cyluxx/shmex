import {
  buildAlter,
  buildDurationAndType,
  build,
  buildEndingRests,
  buildStep,
  buildPitch,
  buildOctave,
  buildNotes
} from './music-xml-builder';
import {Duration, RhythmElement, Tone} from '../store/model';

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
      '<divisions>8</divisions>' +
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
      '<barline location="right">' +
      '<bar-style>light-heavy</bar-style>' +
      '</barline>' +
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

  it('returns empty, when undefined accidental', () => {
    expect(buildAlter(undefined)).toBe('');
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

describe('buildEndingRests', () => {
  it('builds no rests, if rhythmElements are empty', () => {
    const rhythmElements: RhythmElement[] = [];
    expect(buildEndingRests(rhythmElements)).toBe('');
  });

  it('builds no rests, if rhythmElements fit into 4/4 time signature', () => {
    const rhythmElements: RhythmElement[] = [{duration: {numerator: 1, denominator: 1}, tones: []}];
    expect(buildEndingRests(rhythmElements)).toBe('');
  });

  it('builds a 32nd, if rhythmElements exceed by a half, a quarter, an eighth, a 16th and a 32nd', () => {
    const rhythmElements: RhythmElement[] = [
      {duration: {numerator: 1, denominator: 2}, tones: []},
      {duration: {numerator: 1, denominator: 4}, tones: []},
      {duration: {numerator: 1, denominator: 8}, tones: []},
      {duration: {numerator: 1, denominator: 16}, tones: []},
      {duration: {numerator: 1, denominator: 32}, tones: []},
    ];
    expect(buildEndingRests(rhythmElements)).toBe(
      '<note><rest /><duration>1</duration><type>32nd</type></note>'
    );
  });

  it('builds a 16th, and a half rest, if rhythmElements exceed by a quarter, an eighth and a 16th', () => {
    const rhythmElements: RhythmElement[] = [
      {duration: {numerator: 1, denominator: 4}, tones: []},
      {duration: {numerator: 1, denominator: 8}, tones: []},
      {duration: {numerator: 1, denominator: 16}, tones: []},
    ];
    expect(buildEndingRests(rhythmElements)).toBe(
      '<note><rest /><duration>2</duration><type>16th</type></note>' +
      '<note><rest /><duration>16</duration><type>half</type></note>'
    );
  });

  it('builds a 32nd, a 16th, an 8th, a quarter and a half rest, if rhythmElements exceed by a 32nd', () => {
    const rhythmElements: RhythmElement[] = [{duration: {numerator: 1, denominator: 32}, tones: []}];
    expect(buildEndingRests(rhythmElements)).toBe(
      '<note><rest /><duration>1</duration><type>32nd</type></note>' +
      '<note><rest /><duration>2</duration><type>16th</type></note>' +
      '<note><rest /><duration>4</duration><type>eighth</type></note>' +
      '<note><rest /><duration>8</duration><type>quarter</type></note>' +
      '<note><rest /><duration>16</duration><type>half</type></note>'
    );
  });
});

describe('buildNotes', () => {
  it('builds single note correctly', () => {
    const duration: Duration = {
      numerator: 1,
      denominator: 1,
    };
    const tones: Tone[] = [
      {
        key: 'a',
        octave: 4,
      }
    ];
    expect(buildNotes(duration, tones)).toBe('<note>' +
      '<pitch><step>A</step><octave>4</octave></pitch>' +
      '<duration>32</duration><type>whole</type>' +
      '</note>'
    );
  });

  it('builds multiple notes correctly', () => {
    const duration: Duration = {
      numerator: 1,
      denominator: 1,
    };
    const tones: Tone[] = [
      {
        key: 'a',
        octave: 4,
      },
      {
        key: 'c',
        accidental: '#',
        octave: 5,
      },
      {
        key: 'e',
        octave: 5,
      },
    ];
    expect(buildNotes(duration, tones)).toBe('<note>' +
      '<pitch><step>A</step><octave>4</octave></pitch>' +
      '<duration>32</duration><type>whole</type>' +
      '</note>' +
      '<note>' +
      '<chord/>' +
      '<pitch><step>C</step><alter>1</alter><octave>5</octave></pitch>' +
      '<duration>32</duration><type>whole</type>' +
      '</note>' +
      '<note>' +
      '<chord/>' +
      '<pitch><step>E</step><octave>5</octave></pitch>' +
      '<duration>32</duration><type>whole</type>' +
      '</note>'
    );
  });

  it('returns an empty string, when no notes', () => {
    const duration: Duration = {
      numerator: 1,
      denominator: 1,
    };
    const tones: Tone[] = [];
    expect(buildNotes(duration, tones)).toBe('');
  });

  it('does not build duplicate notes', () => {
    const duration: Duration = {
      numerator: 1,
      denominator: 1,
    };
    const tones: Tone[] = [
      {
        key: 'a',
        octave: 4,
      },
      {
        key: 'a',
        octave: 4,
      }
    ];
    expect(buildNotes(duration, tones)).toBe('<note>' +
      '<pitch><step>A</step><octave>4</octave></pitch>' +
      '<duration>32</duration><type>whole</type>' +
      '</note>'
    );
  });
});

describe('buildOctave', () => {
  it('builds octave correctly', () => {
    expect(buildOctave(4)).toBe('<octave>4</octave>');
  });
});

describe('buildPitch', () => {
  it('builds correct pitch, when tone has no accidental', () => {
    const tone: Tone = {
      octave: 0,
      key: 'a'
    };
    expect(buildPitch(tone)).toBe('<pitch><step>A</step><octave>0</octave></pitch>');
  });

  it('builds correct pitch, when tone has accidental', () => {
    const tone: Tone = {
      octave: 8,
      accidental: '#',
      key: 'g'
    };
    expect(buildPitch(tone)).toBe('<pitch><step>G</step><alter>1</alter><octave>8</octave></pitch>');
  });
});


describe('buildStep', () => {
  it('builds all steps correctly', () => {
    expect(buildStep('a')).toBe('<step>A</step>');
    expect(buildStep('b')).toBe('<step>B</step>');
    expect(buildStep('c')).toBe('<step>C</step>');
    expect(buildStep('d')).toBe('<step>D</step>');
    expect(buildStep('e')).toBe('<step>E</step>');
    expect(buildStep('f')).toBe('<step>F</step>');
    expect(buildStep('g')).toBe('<step>G</step>');
  });
});
