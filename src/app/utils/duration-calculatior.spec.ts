import Fraction from 'fraction.js/fraction';
import { decomposeAsc, decomposeDesc } from './duration-calculator';

describe('decomposeAsc', () => {
  it('decomposes 1/1 to [1/1]', () => {
    expect(decomposeAsc(new Fraction(1, 1))).toEqual([new Fraction(1, 1)]);
  });

  it('decomposes 7/8 to [1/8, 1/4, 1/2]', () => {
    expect(decomposeAsc(new Fraction(7, 8))).toEqual([new Fraction(1, 8), new Fraction(1, 4), new Fraction(1, 2)]);
  });

  it('decomposes 5/8 to [1/8, 1/2]', () => {
    expect(decomposeAsc(new Fraction(5, 8))).toEqual([new Fraction(1, 8), new Fraction(1, 2)]);
  });

  it('decomposes 11/4 to [1/4, 1/2, 1/1, 1/1]', () => {
    expect(decomposeAsc(new Fraction(11, 4))).toEqual([
      new Fraction(1, 4),
      new Fraction(1, 2),
      new Fraction(1, 1),
      new Fraction(1, 1),
    ]);
  });
});

describe('decomposeDesc', () => {
  it('decomposes 1/1 to [1/1]', () => {
    expect(decomposeDesc(new Fraction(1, 1))).toEqual([new Fraction(1, 1)]);
  });

  it('decomposes 7/8 to [1/2, 1/4, 1/8]', () => {
    expect(decomposeDesc(new Fraction(7, 8))).toEqual([new Fraction(1, 2), new Fraction(1, 4), new Fraction(1, 8)]);
  });

  it('decomposes 5/8 to [1/2, 1/8]', () => {
    expect(decomposeDesc(new Fraction(5, 8))).toEqual([new Fraction(1, 2), new Fraction(1, 8)]);
  });

  it('decomposes 11/4 to [1/1, 1/1, 1/2, 1/4]', () => {
    expect(decomposeDesc(new Fraction(11, 4))).toEqual([
      new Fraction(1, 1),
      new Fraction(1, 1),
      new Fraction(1, 2),
      new Fraction(1, 4),
    ]);
  });
});
