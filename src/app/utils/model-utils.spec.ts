import {isRest} from './model-utils';

describe('isRest', () => {
  it('returns true, when tones empty', () => {
    expect(isRest({duration: {numerator: 1, denominator: 4}, tones: []})).toBe(true);
  });

  it('returns false, when tones not empty', () => {
    expect(isRest({duration: {numerator: 1, denominator: 4}, tones: [{key: 'a', octave: 4}]})).toBe(false);
  });
});
