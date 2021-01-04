import {
  buildAlter,
  buildDurationAndType,
  buildMusicXml,
  buildEndingRests,
  buildStep,
  buildPitch,
  buildOctave,
  buildNotes,
  buildMeasures,
  buildTie,
  buildPartGroup,
  buildScoreParts,
  buildPartList,
} from './music-xml-builder';
import { Duration, Measure, RhythmElement, Tone, Track } from '../store/model';

const someTrack: Track = {
  id: 'someId',
  name: 'someName',
  measures: [],
};

describe('build', () => {
  it('builds empty xml', () => {
    const xml = buildMusicXml({ cover: { title: '', creator1: '', creator2: '' }, groups: [], chords: [] });
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');
    expect(xml).toContain('<score-partwise version="3.1">');
    expect(xml).toContain('</score-partwise>');
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
    expect(buildDurationAndType({ value: 1, tieStart: false, tieStop: false })).toBe(
      '<duration>32</duration><type>whole</type>'
    );
    expect(buildDurationAndType({ value: 2, tieStart: false, tieStop: false })).toBe(
      '<duration>16</duration><type>half</type>'
    );
    expect(buildDurationAndType({ value: 4, tieStart: false, tieStop: false })).toBe(
      '<duration>8</duration><type>quarter</type>'
    );
    expect(buildDurationAndType({ value: 8, tieStart: false, tieStop: false })).toBe(
      '<duration>4</duration><type>eighth</type>'
    );
    expect(buildDurationAndType({ value: 16, tieStart: false, tieStop: false })).toBe(
      '<duration>2</duration><type>16th</type>'
    );
    expect(buildDurationAndType({ value: 32, tieStart: false, tieStop: false })).toBe(
      '<duration>1</duration><type>32nd</type>'
    );
  });
});

describe('buildEndingRests', () => {
  it('builds no rests, if rhythmElements are empty', () => {
    const rhythmElements: RhythmElement[] = [];
    expect(buildEndingRests(rhythmElements)).toBe('');
  });

  it('builds no rests, if rhythmElements fit into 4/4 time signature', () => {
    const rhythmElements: RhythmElement[] = [{ duration: { value: 1, tieStart: false, tieStop: false }, tones: [] }];
    expect(buildEndingRests(rhythmElements)).toBe('');
  });

  it('builds a 32nd, if rhythmElements exceed by a half, a quarter, an eighth, a 16th and a 32nd', () => {
    const rhythmElements: RhythmElement[] = [
      { duration: { value: 2, tieStart: false, tieStop: false }, tones: [] },
      { duration: { value: 4, tieStart: false, tieStop: false }, tones: [] },
      { duration: { value: 8, tieStart: false, tieStop: false }, tones: [] },
      { duration: { value: 16, tieStart: false, tieStop: false }, tones: [] },
      { duration: { value: 32, tieStart: false, tieStop: false }, tones: [] },
    ];
    expect(buildEndingRests(rhythmElements)).toBe('<note><rest /><duration>1</duration><type>32nd</type></note>');
  });

  it('builds a 16th, and a half rest, if rhythmElements exceed by a quarter, an eighth and a 16th', () => {
    const rhythmElements: RhythmElement[] = [
      { duration: { value: 4, tieStart: false, tieStop: false }, tones: [] },
      { duration: { value: 8, tieStart: false, tieStop: false }, tones: [] },
      { duration: { value: 16, tieStart: false, tieStop: false }, tones: [] },
    ];
    expect(buildEndingRests(rhythmElements)).toBe(
      '<note><rest /><duration>2</duration><type>16th</type></note>' +
        '<note><rest /><duration>16</duration><type>half</type></note>'
    );
  });

  it('builds a 32nd, a 16th, an 8th, a quarter and a half rest, if rhythmElements exceed by a 32nd', () => {
    const rhythmElements: RhythmElement[] = [{ duration: { value: 32, tieStart: false, tieStop: false }, tones: [] }];
    expect(buildEndingRests(rhythmElements)).toBe(
      '<note><rest /><duration>1</duration><type>32nd</type></note>' +
        '<note><rest /><duration>2</duration><type>16th</type></note>' +
        '<note><rest /><duration>4</duration><type>eighth</type></note>' +
        '<note><rest /><duration>8</duration><type>quarter</type></note>' +
        '<note><rest /><duration>16</duration><type>half</type></note>'
    );
  });
});

describe('buildMeasures', () => {
  it('builds one empty measure, when rhythmElements empty', () => {
    const builtMeasures = buildMeasures([]);
    expect(builtMeasures).toContain('<measure number="1">');
    expect(builtMeasures).toContain(
      '<attributes><divisions>8</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>'
    );
    expect(builtMeasures).toContain('<attributes>');
    expect(builtMeasures).toContain('<divisions>');
    expect(builtMeasures).toContain('<key>');
    expect(builtMeasures).toContain('<fifths>');
    expect(builtMeasures).toContain('<time>');
    expect(builtMeasures).toContain('<beats>');
    expect(builtMeasures).toContain('<beat-type>');
  });

  it('builds one measure, when duration sum of rhythmElements equal measure length', () => {
    const measures: Measure[] = [
      {
        rhythmElements: [
          {
            tones: [],
            duration: {
              value: 1,
              tieStart: false,
              tieStop: false,
            },
          },
        ],
      },
    ];
    expect(buildMeasures(measures)).toContain('<measure number="1">');
    expect(buildMeasures(measures)).not.toContain('<measure number="2">');
  });

  it('builds one measure, when duration of rhythmElements is smaller than measure length', () => {
    const measures: Measure[] = [
      {
        rhythmElements: [
          {
            tones: [],
            duration: {
              value: 2,
              tieStart: false,
              tieStop: false,
            },
          },
        ],
      },
    ];
    expect(buildMeasures(measures)).toContain('<measure number="1">');
    expect(buildMeasures(measures)).not.toContain('<measure number="2">');
  });

  it('builds two measures', () => {
    const measures: Measure[] = [
      {
        rhythmElements: [
          {
            tones: [],
            duration: {
              value: 1,
              tieStart: false,
              tieStop: false,
            },
          },
        ],
      },
      {
        rhythmElements: [
          {
            tones: [],
            duration: {
              value: 2,
              tieStart: false,
              tieStop: false,
            },
          },
        ],
      },
    ];
    expect(buildMeasures(measures)).toContain('<measure number="1">');
    expect(buildMeasures(measures)).toContain('<measure number="2">');
  });

  it('builds one measure with tones', () => {
    const measures: Measure[] = [
      {
        rhythmElements: [
          {
            tones: [
              {
                octave: 4,
                accidental: 'b',
                key: 'd',
              },
            ],
            duration: {
              value: 1,
              tieStart: false,
              tieStop: false,
            },
          },
        ],
      },
    ];
    expect(buildMeasures(measures)).toContain('<measure number="1">');
    expect(buildMeasures(measures)).toContain('<note>');
    expect(buildMeasures(measures)).not.toContain('<measure number="2">');
  });
});

describe('buildNotes', () => {
  it('builds single note correctly', () => {
    const duration: Duration = {
      value: 1,
      tieStart: false,
      tieStop: false,
    };
    const tones: Tone[] = [
      {
        key: 'a',
        octave: 4,
      },
    ];
    expect(buildNotes(duration, tones)).toBe(
      '<note>' +
        '<pitch><step>A</step><octave>4</octave></pitch>' +
        '<duration>32</duration><type>whole</type>' +
        '</note>'
    );
  });

  it('builds multiple notes correctly', () => {
    const duration: Duration = {
      value: 1,
      tieStart: false,
      tieStop: false,
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
    expect(buildNotes(duration, tones)).toBe(
      '<note>' +
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
      value: 1,
      tieStart: false,
      tieStop: false,
    };
    const tones: Tone[] = [];
    expect(buildNotes(duration, tones)).toBe('');
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
      key: 'a',
    };
    expect(buildPitch(tone)).toBe('<pitch><step>A</step><octave>0</octave></pitch>');
  });

  it('builds correct pitch, when tone has accidental', () => {
    const tone: Tone = {
      octave: 8,
      accidental: '#',
      key: 'g',
    };
    expect(buildPitch(tone)).toBe('<pitch><step>G</step><alter>1</alter><octave>8</octave></pitch>');
  });
});

describe('buildPartGroup', () => {
  it('builds part group correctly', () => {
    expect(buildPartGroup({ tracks: [] }, 42)).toBe(
      '<part-group number="42" type="start">' +
        '<group-symbol>bracket</group-symbol>' +
        '<group-barline>yes</group-barline>' +
        '</part-group>' +
        '<part-group number="42" type="stop"/>'
    );
  });
});

describe('buildPartList', () => {
  it('does not build part group, when group tracks length 1', () => {
    expect(buildPartList([{ tracks: [someTrack] }])).toContain('score-part');
    expect(buildPartList([{ tracks: [someTrack] }])).not.toContain('part-group');
  });

  it('builds part group, when group tracks length 2', () => {
    expect(buildPartList([{ tracks: [someTrack, someTrack] }])).toContain('part-group');
  });
});

describe('buildScoreParts', () => {
  it('builds score part with id and name', () => {
    expect(
      buildScoreParts([
        {
          ...someTrack,
          id: 'testId',
          name: 'testName',
        },
      ])
    ).toBe('<score-part id="testId"><part-name>testName</part-name></score-part>');
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

describe('buildTie', () => {
  it('builds tie correctly', () => {
    expect(buildTie(false, false)).toBe('');
    expect(buildTie(false, true)).toBe('<tie type="stop"/><notations><tied type="stop"/></notations>');
    expect(buildTie(true, false)).toBe('<tie type="start"/><notations><tied type="start"/></notations>');
    expect(buildTie(true, true)).toBe(
      '<tie type="stop"/><tie type="start"/><notations><tied type="stop"/><tied type="start"/></notations>'
    );
  });
});
