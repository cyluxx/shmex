import { Duration } from '../store/model';
import Fraction from 'fraction.js/fraction';

export function addDuration(fraction: Fraction, duration: Duration): Fraction {
  return toFraction(duration).add(fraction);
}

export function asDurationValue(n: number) {
  return n as 1 | 2 | 4 | 8 | 16 | 32;
}

export function decomposeAsc(fraction: Fraction): Fraction[] {
  const candidate = new Fraction(1, fraction.d);
  const sub = fraction.sub(candidate);
  if (sub.valueOf() === 0) {
    return [candidate];
  }
  return [candidate].concat(decomposeAsc(sub));
}

export function decomposeDesc(fraction: Fraction): Fraction[] {
  const candidate = new Fraction(1, fraction.d);
  const sub = fraction.sub(candidate);
  if (sub.valueOf() === 0) {
    return [candidate];
  }
  return decomposeDesc(sub).concat(candidate);
}

export function getFractionalPart(fraction: Fraction): Fraction {
  return fraction.mod(1);
}

export function sumFractions(fractions: Fraction[]): Fraction {
  return fractions.reduce((a, b) => a.add(b), new Fraction(0));
}

export function toFraction(duration: Duration): Fraction {
  return new Fraction(1, duration.value);
}
