import {
  build,
  groupTiedElements,
  reduceMeasures,
  sumTiedDurations,
  buildMeasures,
  toRhythmElementToken,
  toString,
  buildTones,
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
    expect(build({ id: 'foo', name: 'foo', measures: [] })).toEqual('');
  });

  it('builds correct shmexl string', () => {
    expect(
      build({
        id: 'foo',
        name: 'foo',
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

describe('buildMeasures', () => {
  it('returns empty string, when track has no measures', () => {
    expect(buildMeasures([])).toEqual('');
  });

  it('returns 2/1, \n\n, when 1/1_|_1/1', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: true,
                tieStop: false,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: false,
                tieStop: true,
              },
            },
          ],
        },
      ])
    ).toEqual('2/1, \n\n');
  });

  it('returns 3/1, \n\n\n, when 1/1_|_1/1_|_1/1', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: true,
                tieStop: false,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: true,
                tieStop: true,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: false,
                tieStop: true,
              },
            },
          ],
        },
      ])
    ).toEqual('3/1, \n\n\n');
  });

  it('returns 1/2, 1/1, \n1/2, when 1/2 1/2_|_1/2 1/2', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: false,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: true,
                tieStop: false,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: false,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: false,
                tieStop: false,
              },
            },
          ],
        },
      ])
    ).toEqual('1/2, 1/1, \n1/2, \n');
  });

  it('returns 1/1,\n 1/4, 1/2, 3/16, 1/16,\n when 1/2_1/4_1/4 | 1/4 1/4_1/4 1/8_1/16 1/16', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: true,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: true,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: false,
                tieStop: true,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: false,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: true,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: false,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 8,
                tieStart: true,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 16,
                tieStart: false,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 16,
                tieStart: false,
                tieStop: false,
              },
            },
          ],
        },
      ])
    ).toEqual('1/1, \n1/4, 1/2, 3/16, 1/16, \n');
  });
});

describe('buildTones', () => {
  it('builds empty string, when tones []', () => {
    expect(buildTones([])).toEqual('');
  });

  it('builds tone without accidental and with leading space', () => {
    expect(buildTones([{ key: 'a', octave: 4 }])).toEqual(' a4');
  });

  it('builds tone with accidental and with leading space', () => {
    expect(buildTones([{ key: 'a', accidental: 'b', octave: 4 }])).toEqual(' ab4');
  });

  it('builds multiple tones, separated by space and with leading space', () => {
    expect(
      buildTones([
        { key: 'a', accidental: 'b', octave: 4 },
        { key: 'e', octave: 5 },
      ])
    ).toEqual(' ab4 e5');
  });
});
