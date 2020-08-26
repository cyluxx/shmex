import {Duration} from '../store/model';
import Fraction from 'fraction.js/fraction';

export function addDuration(fraction: Fraction, duration: Duration): Fraction {
  return toFraction(duration).add(fraction);
}

export function asDurationValue(n: number){
  return n as 1 | 2 | 4 | 8 | 16 | 32;
}

export function fitsInMeasure(fraction: Fraction): boolean {
  return fraction.valueOf() <= 1;
}

export function getFractionalPart(fraction: Fraction): Fraction {
  return fraction.mod(1);
}

export function toFraction(duration: Duration): Fraction {
  return new Fraction(1, duration.value);
}

