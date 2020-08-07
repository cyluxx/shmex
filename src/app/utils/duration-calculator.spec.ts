import {shorten} from './duration-calculator';

describe('shorten', () => {
  it('shortens 4/4 to 1/1', () => {
    expect(shorten({numerator: 4, denominator: 4})).toEqual({numerator: 1, denominator: 1});
  });

  it('shortens 2/4 to 1/2', () => {
    expect(shorten({numerator: 2, denominator: 4})).toEqual({numerator: 1, denominator: 2});
  });

  it('shortens 3/4 to 3/4', () => {
    expect(shorten({numerator: 3, denominator: 4})).toEqual({numerator: 3, denominator: 4});
  });
});
