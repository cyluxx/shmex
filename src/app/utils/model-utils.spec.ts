import {isRest, removeDuplicateTones} from './model-utils';
import {Tone} from '../store/model';

describe('isRest', () => {
  it('returns true, when tones empty', () => {
    expect(isRest({duration: {numerator: 1, denominator: 4}, tones: []})).toBe(true);
  });

  it('returns false, when tones not empty', () => {
    expect(isRest({duration: {numerator: 1, denominator: 4}, tones: [{key: 'a', octave: 4}]})).toBe(false);
  });
});

describe('removeDuplicateTones', () => {
  it('removes duplicate tones', () => {
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
    expect(removeDuplicateTones(tones)).toEqual(
      [{
        key: 'a',
        octave: 4,
      }]
    );
  });
});
