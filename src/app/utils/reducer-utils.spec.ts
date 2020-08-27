import {divideDurationTokenByNumerator, fillMeasures, toDurationToken, toTones} from './reducer-utils';
import {RhythmElement} from '../store/model';
import Fraction from 'fraction.js';

describe('divideDurationTokenByNumerator', () => {
  it('returns [1/1], when duration token is 1/1 at position 0', () => {
    expect(divideDurationTokenByNumerator(new Fraction(1, 1), 0))
      .toEqual([new Fraction(1, 1)]);
  });

  it('returns [1/4], when duration token is 1/4 4 at position 3', () => {
    expect(divideDurationTokenByNumerator(new Fraction(1, 4), 3))
      .toEqual([new Fraction(1, 4)]);
  });

  it('returns [1/4, 1/16], when duration token is 5/16 at position 0', () => {
    expect(divideDurationTokenByNumerator(new Fraction(5, 16), 0))
      .toEqual([
          new Fraction(1, 4),
          new Fraction(1, 16)
        ]
      );
  });

  it('returns [1/16, 1/4], when duration token is 5/16 at position 2', () => {
    expect(divideDurationTokenByNumerator(new Fraction(5, 16), 2))
      .toEqual([
          new Fraction(1, 16),
          new Fraction(1, 4)
        ]
      );
  });
});

describe('fillMeasures', () => {
  it('returns empty measures, when no rhythm elements', () => {
    expect(fillMeasures([])).toEqual([]);
  });

  it('returns one measure, when rhythmElements contain one whole rest', () => {
    const rhythmElements: RhythmElement[] = [{
      duration: {
        value: 1
      },
      tones: []
    }];
    expect(fillMeasures(rhythmElements)).toEqual([{rhythmElements}]);
  });

  it('returns one measure, when rhythmElements contain two 32nd rests', () => {
    const rhythmElements: RhythmElement[] = [
      {
        duration: {
          value: 32
        },
        tones: []
      },
      {
        duration: {
          value: 32
        },
        tones: []
      }
    ];
    expect(fillMeasures(rhythmElements)).toEqual([{rhythmElements}]);
  });

  it('returns two measures, when rhythmElements contain one whole rest and one 32nd rest', () => {
    const rhythmElements: RhythmElement[] = [
      {
        duration: {
          value: 1
        },
        tones: []
      },
      {
        duration: {
          value: 32
        },
        tones: []
      }
    ];
    expect(fillMeasures(rhythmElements)).toEqual([
      {
        rhythmElements: [{
          duration: {
            value: 1
          },
          tones: []
        }]
      },
      {
        rhythmElements: [{
          duration: {
            value: 32
          },
          tones: []
        }]
      }
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
