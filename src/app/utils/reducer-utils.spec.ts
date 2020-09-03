import {divideRhythmElementTokenByNumerator, divideRhythmElementTokensByMeasure, toDurationToken, toTones} from './reducer-utils';
import {RhythmElementToken} from '../store/model';
import Fraction from 'fraction.js';

describe('divideRhythmElementTokensByMeasure', () => {
  it('returns no measure, when no rhythm elements', () => {
    expect(divideRhythmElementTokensByMeasure([])).toEqual([]);
  });

  it('returns one measure, when rhythm elements fit into measure', () => {
    const rhythmElementTokens: RhythmElementToken[] = [
      {durationToken: new Fraction(1, 8), toneTokens: []},
      {durationToken: new Fraction(1, 2), toneTokens: []},
      {durationToken: new Fraction(1, 4), toneTokens: []},
      {durationToken: new Fraction(1, 8), toneTokens: []}
    ];
    expect(divideRhythmElementTokensByMeasure(rhythmElementTokens)).toEqual([rhythmElementTokens]);
  });

  it('returns two measures, when rhythm elements fit into two measures', () => {
    expect(divideRhythmElementTokensByMeasure([
      {durationToken: new Fraction(1, 1), toneTokens: []},
      {durationToken: new Fraction(1, 2), toneTokens: []}
    ])).toEqual([
      [
        {durationToken: new Fraction(1, 1), toneTokens: []}
      ],
      [
        {durationToken: new Fraction(1, 2), toneTokens: []}
      ]
    ]);
  });

  it('returns two measures with tied rhythm elements, when rhythm elements do not fit into first measure', () => {
    expect(divideRhythmElementTokensByMeasure([
      {durationToken: new Fraction(1, 8), toneTokens: []},
      {durationToken: new Fraction(11, 8), toneTokens: []}
    ])).toEqual([
      [
        {durationToken: new Fraction(1, 8), toneTokens: []},
        {durationToken: new Fraction(7, 8), toneTokens: [], tieStart: true}
      ],
      [
        {durationToken: new Fraction(1, 2), toneTokens: [], tieStop: true}
      ]
    ]);
  });

  it('returns two measures with tied rhythm elements, when rhythm elements has a duration of 2/1', () => {
    expect(divideRhythmElementTokensByMeasure([
      {durationToken: new Fraction(2, 1), toneTokens: []}
    ])).toEqual([
      [
        {durationToken: new Fraction(1, 1), toneTokens: [], tieStart: true}
      ],
      [
        {durationToken: new Fraction(1, 1), toneTokens: [], tieStop: true}
      ]
    ]);
  });
});

describe('divideRhythmElementTokenByNumerator', () => {
  it('returns 1/1, when duration of rhythm element token is 1/1 at position 0', () => {
    expect(divideRhythmElementTokenByNumerator({
      durationToken: new Fraction(1, 1),
      toneTokens: [],
    }, new Fraction(0)))
      .toEqual([{durationToken: new Fraction(1, 1), toneTokens: []}]);
  });

  it('returns 1/4, when duration of rhythm element token is 1/4 4 at position 1/4', () => {
    expect(divideRhythmElementTokenByNumerator({
      durationToken: new Fraction(1, 4),
      toneTokens: [],
    }, new Fraction(1, 4)))
      .toEqual([{durationToken: new Fraction(1, 4), toneTokens: []}]);
  });

  it('returns 1/4_1/16, when duration of rhythm element token is 5/16 at position 0', () => {
    expect(divideRhythmElementTokenByNumerator({
      durationToken: new Fraction(5, 16),
      toneTokens: [],
    }, new Fraction(0)))
      .toEqual([
          {durationToken: new Fraction(1, 4), toneTokens: [], tieStart: true},
          {durationToken: new Fraction(1, 16), toneTokens: [], tieStop: true},
        ]
      );
  });

  it('returns 1/16_1/4, when duration of rhythm element token is 5/16 at position 1/2', () => {
    expect(divideRhythmElementTokenByNumerator({
      durationToken: new Fraction(5, 16),
      toneTokens: [],
    }, new Fraction(1, 2)))
      .toEqual([
          {durationToken: new Fraction(1, 16), toneTokens: [], tieStart: true},
          {durationToken: new Fraction(1, 4), toneTokens: [], tieStop: true},
        ]
      );
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

describe('toTones', () => {
  it('converts no tones to empty array', () => {
    expect(toTones([])).toEqual([]);
  });

  it('converts tone without accidental', () => {
    expect(toTones(['a4'])).toEqual([{
      key: 'a',
      octave: 4
    }]);
  });

  it('converts tone with accidental', () => {
    expect(toTones(['c#4'])).toEqual([{
      key: 'c',
      accidental: '#',
      octave: 4
    }]);
    expect(toTones(['bb4'])).toEqual([{
      key: 'b',
      accidental: 'b',
      octave: 4
    }]);
  });

  it('converts multiple tones', () => {
    expect(toTones(['a4', 'c#5', 'e5'])).toEqual([
      {
        key: 'a',
        octave: 4
      },
      {
        key: 'c',
        accidental: '#',
        octave: 5
      },
      {
        key: 'e',
        octave: 5
      }
    ]);
  });
});
