import { groupTiedElements, reduceMeasures, sumTiedDurations } from './shmexl-text-builder';
import { RhythmElement, RhythmElementToken } from '../store/model';
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
