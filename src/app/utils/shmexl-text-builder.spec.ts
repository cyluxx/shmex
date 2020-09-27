import {
  build,
  groupTiedElements,
  reduceMeasures,
  sumTiedDurations,
  toRhythmElementToken,
  toString,
} from './shmexl-text-builder';
import { RhythmElement, RhythmElementToken, Tone } from '../store/model';
import Fraction from 'fraction.js';

const someRhythmElement: RhythmElement = {
  duration: {
    value: 1,
    tieStart: false,
    tieStop: false,
  },
  tones: [],
};

const someRhythmElementToken: RhythmElementToken = {
  toneTokens: ['a4'],
  durationToken: new Fraction(1, 4),
};

const someTone: Tone = {
  key: 'a',
  octave: 4,
};

describe('build', () => {
  it('returns empty string, when empty track', () => {
    expect(build({ measures: [] })).toEqual('');
  });

  it('builds correct shmexl string', () => {
    expect(
      build({
        measures: [
          {
            rhythmElements: [
              { ...someRhythmElement, duration: { ...someRhythmElement.duration, value: 2 } },
              {
                ...someRhythmElement,
                duration: { ...someRhythmElement.duration, value: 2, tieStart: true },
                tones: [someTone],
              },
            ],
          },
          {
            rhythmElements: [
              {
                ...someRhythmElement,
                duration: { ...someRhythmElement.duration, value: 2, tieStop: true },
                tones: [someTone],
              },
              { ...someRhythmElement, duration: { ...someRhythmElement.duration, value: 4 } },
              { ...someRhythmElement, duration: { ...someRhythmElement.duration, value: 4 }, tones: [someTone] },
            ],
          },
        ],
      })
    ).toEqual('1/2, 1/1 a4, 1/4, 1/4 a4, ');
  });
});

describe('groupTiedElements', () => {
  it('returns empty array, when empty array', () => {
    expect(groupTiedElements([])).toEqual([]);
  });

  it('does not group elements, when no tied elements', () => {
    expect(groupTiedElements([{ ...someRhythmElementToken }, { ...someRhythmElementToken }])).toEqual([
      [{ ...someRhythmElementToken }],
      [{ ...someRhythmElementToken }],
    ]);
  });

  it('does group two elements, when two tied elements', () => {
    expect(
      groupTiedElements([
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ])
    ).toEqual([
      [
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ],
    ]);
  });

  it('does group tree elements, when tree tied elements', () => {
    expect(
      groupTiedElements([
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ])
    ).toEqual([
      [
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ],
    ]);
  });
});

describe('reduceMeasures', () => {
  it('returns empty array, when empty array', () => {
    expect(reduceMeasures([])).toEqual({ rhythmElements: [] });
  });

  it('reduces to one measure, when one measure', () => {
    expect(
      reduceMeasures([
        {
          rhythmElements: [someRhythmElement],
        },
      ])
    ).toEqual({ rhythmElements: [someRhythmElement] });
  });

  it('reduces to one measure, when two measures', () => {
    expect(
      reduceMeasures([
        {
          rhythmElements: [someRhythmElement],
        },
        {
          rhythmElements: [someRhythmElement],
        },
      ])
    ).toEqual({ rhythmElements: [someRhythmElement, someRhythmElement] });
  });
});

describe('sumTiedDurations', () => {
  it('returns empty array, when empty array', () => {
    expect(sumTiedDurations([])).toEqual([]);
  });

  it('sums array with one element', () => {
    expect(sumTiedDurations([[someRhythmElementToken]])).toEqual([someRhythmElementToken]);
  });

  it('sums array with two elements', () => {
    expect(
      sumTiedDurations([
        [
          {
            ...someRhythmElementToken,
            durationToken: new Fraction(1, 4),
          },
          {
            ...someRhythmElementToken,
            durationToken: new Fraction(1, 4),
          },
        ],
      ])
    ).toEqual([{ ...someRhythmElementToken, durationToken: new Fraction(1, 2) }]);
  });

  it('sums two arrays', () => {
    expect(
      sumTiedDurations([
        [
          {
            ...someRhythmElementToken,
            durationToken: new Fraction(1, 4),
          },
        ],
        [
          {
            ...someRhythmElementToken,
            durationToken: new Fraction(1, 4),
          },
        ],
      ])
    ).toEqual([
      {
        ...someRhythmElementToken,
        durationToken: new Fraction(1, 4),
      },
      {
        ...someRhythmElementToken,
        durationToken: new Fraction(1, 4),
      },
    ]);
  });
});

describe('toRhythmElementToken', () => {
  it('converts a rhythmElement without accidental', () => {
    expect(
      toRhythmElementToken({
        duration: {
          value: 4,
          tieStop: false,
          tieStart: false,
        },
        tones: [
          {
            key: 'a',
            octave: 4,
          },
        ],
      })
    ).toEqual({
      durationToken: new Fraction(1, 4),
      toneTokens: ['a4'],
      tieStart: false,
      tieStop: false,
    });
  });

  it('converts a rhythmElement with accidental', () => {
    expect(
      toRhythmElementToken({
        duration: {
          value: 4,
          tieStop: false,
          tieStart: false,
        },
        tones: [
          {
            key: 'c',
            accidental: '#',
            octave: 5,
          },
        ],
      })
    ).toEqual({
      durationToken: new Fraction(1, 4),
      toneTokens: ['c#5'],
      tieStart: false,
      tieStop: false,
    });
  });
});

describe('toString', () => {
  it('converts a rhythmElement with three tone tokens', () => {
    expect(
      toString({
        durationToken: new Fraction(1, 8),
        toneTokens: ['a4', 'c#5', 'e5'],
      })
    ).toEqual('1/8 a4 c#5 e5, ');
  });
});
