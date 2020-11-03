import {
  divideRhythmElementTokenByNumerator,
  divideRhythmElementTokensByMeasure,
  toDuration,
  toDurationToken,
  toMeasures,
  toRhythmElements,
  toTones,
  updateShmexlTexts,
  updateTracks,
} from './reducer-utils';
import { Measure, RhythmElementToken, ShmexlText, Track } from '../store/model';
import Fraction from 'fraction.js';

const someMeasure: Measure = {
  rhythmElements: [
    {
      duration: { value: 1, tieStop: false, tieStart: false },
      tones: [{ key: 'a', octave: 4 }],
    },
  ],
};

const someTrack: Track = {
  id: 'some id',
  name: 'some name',
  measures: [],
};

describe('divideRhythmElementTokensByMeasure', () => {
  it('returns no measure, when no rhythm elements', () => {
    expect(divideRhythmElementTokensByMeasure([])).toEqual([]);
  });

  it('returns one measure, when rhythm elements fit into measure', () => {
    const rhythmElementTokens: RhythmElementToken[] = [
      { durationToken: new Fraction(1, 8), toneTokens: [] },
      { durationToken: new Fraction(1, 2), toneTokens: [] },
      { durationToken: new Fraction(1, 4), toneTokens: [] },
      { durationToken: new Fraction(1, 8), toneTokens: [] },
    ];
    expect(divideRhythmElementTokensByMeasure(rhythmElementTokens)).toEqual([rhythmElementTokens]);
  });

  it('returns two measures, when rhythm elements fit into two measures', () => {
    expect(
      divideRhythmElementTokensByMeasure([
        { durationToken: new Fraction(1, 1), toneTokens: [] },
        { durationToken: new Fraction(1, 2), toneTokens: [] },
      ])
    ).toEqual([
      [{ durationToken: new Fraction(1, 1), toneTokens: [] }],
      [{ durationToken: new Fraction(1, 2), toneTokens: [] }],
    ]);
  });

  it('returns two measures with tied rhythm elements, when rhythm elements do not fit into first measure', () => {
    expect(
      divideRhythmElementTokensByMeasure([
        { durationToken: new Fraction(1, 8), toneTokens: [] },
        { durationToken: new Fraction(11, 8), toneTokens: [] },
      ])
    ).toEqual([
      [
        { durationToken: new Fraction(1, 8), toneTokens: [] },
        { durationToken: new Fraction(7, 8), toneTokens: [], tieStart: true },
      ],
      [{ durationToken: new Fraction(1, 2), toneTokens: [], tieStop: true }],
    ]);
  });

  it('returns two measures with tied rhythm elements, when rhythm elements has a duration of 2/1', () => {
    expect(divideRhythmElementTokensByMeasure([{ durationToken: new Fraction(2, 1), toneTokens: [] }])).toEqual([
      [{ durationToken: new Fraction(1, 1), toneTokens: [], tieStart: true }],
      [{ durationToken: new Fraction(1, 1), toneTokens: [], tieStop: true }],
    ]);
  });

  it('returns three measures with tied rhythm elements, when rhythm elements has a duration fitting in tree measures', () => {
    expect(
      divideRhythmElementTokensByMeasure([
        { durationToken: new Fraction(3, 4), toneTokens: [] },
        { durationToken: new Fraction(9, 4), toneTokens: [] },
      ])
    ).toEqual([
      [
        { durationToken: new Fraction(3, 4), toneTokens: [] },
        { durationToken: new Fraction(1, 4), toneTokens: [], tieStart: true },
      ],
      [{ durationToken: new Fraction(1, 1), toneTokens: [], tieStop: true, tieStart: true }],
      [{ durationToken: new Fraction(1, 1), toneTokens: [], tieStop: true }],
    ]);
  });
});

describe('divideRhythmElementTokenByNumerator', () => {
  it('returns 1/1, when duration of rhythm element token is 1/1 at position 0', () => {
    expect(
      divideRhythmElementTokenByNumerator(
        {
          durationToken: new Fraction(1, 1),
          toneTokens: [],
        },
        new Fraction(0)
      )
    ).toEqual([{ durationToken: new Fraction(1, 1), toneTokens: [] }]);
  });

  it('returns 1/4, when duration of rhythm element token is 1/4 4 at position !== 0', () => {
    expect(
      divideRhythmElementTokenByNumerator(
        {
          durationToken: new Fraction(1, 4),
          toneTokens: [],
        },
        new Fraction(1, 4)
      )
    ).toEqual([{ durationToken: new Fraction(1, 4), toneTokens: [] }]);
  });

  it('returns 1/4_1/16, when duration of rhythm element token is 5/16 at position 0', () => {
    expect(
      divideRhythmElementTokenByNumerator(
        {
          durationToken: new Fraction(5, 16),
          toneTokens: [],
        },
        new Fraction(0)
      )
    ).toEqual([
      { durationToken: new Fraction(1, 4), toneTokens: [], tieStart: true },
      { durationToken: new Fraction(1, 16), toneTokens: [], tieStop: true },
    ]);
  });

  it('returns 1/16_1/4, when duration of rhythm element token is 5/16 at position !== 0', () => {
    expect(
      divideRhythmElementTokenByNumerator(
        {
          durationToken: new Fraction(5, 16),
          toneTokens: [],
        },
        new Fraction(1, 2)
      )
    ).toEqual([
      { durationToken: new Fraction(1, 16), toneTokens: [], tieStart: true },
      { durationToken: new Fraction(1, 4), toneTokens: [], tieStop: true },
    ]);
  });

  it('returns 1/2_1/4_1/16, when duration of rhythm element token is 13/16 at position 0', () => {
    expect(
      divideRhythmElementTokenByNumerator(
        {
          durationToken: new Fraction(13, 16),
          toneTokens: [],
        },
        new Fraction(0)
      )
    ).toEqual([
      { durationToken: new Fraction(1, 2), toneTokens: [], tieStart: true },
      { durationToken: new Fraction(1, 4), toneTokens: [], tieStart: true, tieStop: true },
      { durationToken: new Fraction(1, 16), toneTokens: [], tieStop: true },
    ]);
  });
});

describe('updateShmexlTexts', () => {
  it('returns [], when shmexlTexts []', () => {
    expect(updateShmexlTexts('foo', 'foo', [])).toEqual([]);
  });

  it('updates only the shmexlText with the corresponding track id', () => {
    const shmexlTexts: ShmexlText[] = [
      {
        id: 'someId',
        value: '1/4 a4,',
      },
      {
        id: 'currentId',
        value: '1/4 a4,',
      },
    ];
    expect(updateShmexlTexts('currentId', '1/4 c#5,', shmexlTexts)).toEqual([
      {
        id: 'someId',
        value: '1/4 a4,',
      },
      {
        id: 'currentId',
        value: '1/4 c#5,',
      },
    ]);
  });
});

describe('updateTracks', () => {
  it('returns [], when tracks []', () => {
    expect(updateTracks('foo', [{ rhythmElements: [] }], [])).toEqual([]);
  });

  it('updates only the track with the corresponding track id, when all tracks have same measure length', () => {
    const tracks: Track[] = [
      { ...someTrack, measures: [someMeasure] },
      { ...someTrack, id: 'currentId' },
    ];
    expect(updateTracks('currentId', [someMeasure], tracks)).toEqual([
      { ...someTrack, measures: [someMeasure] },
      { ...someTrack, id: 'currentId', measures: [someMeasure] },
    ]);
  });

  it('updates all tracks with rest measures to the same smallest possible measure length', () => {
    const someRestMeasure: Measure = {
      rhythmElements: [
        {
          duration: {
            value: 1,
            tieStart: false,
            tieStop: false,
          },
          tones: [],
        },
      ],
    };
    const tracks: Track[] = [someTrack, { ...someTrack, id: 'currentId' }, { ...someTrack, measures: [someMeasure] }];
    expect(updateTracks('currentId', [someMeasure, someMeasure], tracks)).toEqual([
      { ...someTrack, measures: [someRestMeasure, someRestMeasure] },
      { ...someTrack, id: 'currentId', measures: [someMeasure, someMeasure] },
      { ...someTrack, measures: [someMeasure, someRestMeasure] },
    ]);
  });
});

describe('toDurationToken', () => {
  it('converts 4/4 to 1/1', () => {
    expect(toDurationToken('4/4').n).toBe(1);
    expect(toDurationToken('4/4').d).toBe(1);
  });

  it('converts 2/4 to 1/2', () => {
    expect(toDurationToken('2/4').n).toBe(1);
    expect(toDurationToken('2/4').d).toBe(2);
  });

  it('converts 3/4 to 3/4', () => {
    expect(toDurationToken('3/4').n).toBe(3);
    expect(toDurationToken('3/4').d).toBe(4);
  });
});

describe('toDuration', () => {
  it('returns a correct corresponding duration', () => {
    expect(toDuration(new Fraction(1, 4), true, false)).toEqual({
      value: 4,
      tieStart: true,
      tieStop: false,
    });
  });

  it('returns a duration with false tie start and stop, if provided tie start and stop undefined', () => {
    expect(toDuration(new Fraction(1, 8), undefined, undefined)).toEqual({
      value: 8,
      tieStart: false,
      tieStop: false,
    });
  });
});

describe('toMeasures', () => {
  it('returns correct measures', () => {
    const result = toMeasures([
      [
        {
          durationToken: new Fraction(1, 1),
          toneTokens: ['f#4'],
        },
      ],
      [
        {
          durationToken: new Fraction(1, 2),
          toneTokens: ['d5'],
          tieStart: true,
        },
        {
          durationToken: new Fraction(1, 2),
          toneTokens: ['d5'],
          tieStop: true,
        },
      ],
    ]);
    expect(result.length).toBe(2);
    expect(result[0].rhythmElements.length).toBe(1);
    expect(result[0].rhythmElements[0].duration.value).toBe(1);
    expect(result[0].rhythmElements[0].tones.length).toBe(1);
    expect(result[0].rhythmElements[0].tones[0].key).toBe('f');
    expect(result[0].rhythmElements[0].tones[0].accidental).toBe('#');
    expect(result[0].rhythmElements[0].tones[0].octave).toBe(4);
    expect(result[1].rhythmElements.length).toBe(2);
    expect(result[1].rhythmElements[0].duration.tieStart).toBeTrue();
    expect(result[1].rhythmElements[1].duration.tieStop).toBeTrue();
  });
});

describe('toRhythmElements', () => {
  it('returns correct rhythm elements', () => {
    expect(
      toRhythmElements([
        {
          durationToken: new Fraction(1, 4),
          toneTokens: ['a4'],
          tieStart: true,
        },
        {
          durationToken: new Fraction(1, 8),
          toneTokens: ['a4'],
          tieStop: true,
        },
      ])
    ).toEqual([
      {
        duration: {
          value: 4,
          tieStart: true,
          tieStop: false,
        },
        tones: [
          {
            key: 'a',
            octave: 4,
          },
        ],
      },
      {
        duration: {
          value: 8,
          tieStart: false,
          tieStop: true,
        },
        tones: [
          {
            key: 'a',
            octave: 4,
          },
        ],
      },
    ]);
  });
});

describe('toTones', () => {
  it('converts no tones to empty array', () => {
    expect(toTones([])).toEqual([]);
  });

  it('converts tone without accidental', () => {
    expect(toTones(['a4'])).toEqual([
      {
        key: 'a',
        octave: 4,
      },
    ]);
  });

  it('converts tone with accidental', () => {
    expect(toTones(['c#4'])).toEqual([
      {
        key: 'c',
        accidental: '#',
        octave: 4,
      },
    ]);
    expect(toTones(['bb4'])).toEqual([
      {
        key: 'b',
        accidental: 'b',
        octave: 4,
      },
    ]);
  });

  it('converts multiple tones', () => {
    expect(toTones(['a4', 'c#5', 'e5'])).toEqual([
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
    ]);
  });
});
