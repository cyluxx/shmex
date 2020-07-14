import {Duration} from '../store/model';
import Fraction from 'fraction.js/fraction';

export function addDurations(x: Duration, y: Duration): Duration {
  return toDuration(toFraction(x).add(toFraction(y)));
}

export function getFractionalPart(duration: Duration): Duration {
  return toDuration(toFraction(duration).mod(1));
}

export function toDuration(fraction: Fraction): Duration {
  return {numerator: fraction.n, denominator: fraction.d as 1 | 2 | 4 | 8 | 16 | 32};
}

export function toFraction(duration: Duration): Fraction {
  return new Fraction(duration.numerator, duration.denominator);
}
