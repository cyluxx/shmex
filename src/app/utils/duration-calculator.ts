import {Duration} from '../store/model';
import Fraction from 'fraction.js/fraction';

export function addDurations(x: Duration, y: Duration): Duration {
  return toDuration(toFraction(x).add(toFraction(y)));
}

export function asDurationValue(n: number){
  return n as 1 | 2 | 4 | 8 | 16 | 32;
}

export function fitsInMeasure(duration: Duration): boolean {
  return toFraction(duration).valueOf() <= 1;
}

export function getFractionalPart(duration: Duration): Fraction {
  return toFraction(duration).mod(1);
}

export function toDuration(fraction: Fraction): Duration {
  return {value: fraction.d as 1 | 2 | 4 | 8 | 16 | 32};
}

export function toFraction(duration: Duration): Fraction {
  return new Fraction(1, duration.value);
}

