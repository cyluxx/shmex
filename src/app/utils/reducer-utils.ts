import {Duration, Measure, RhythmElement, RhythmElementToken, Tone} from '../store/model';
import {addDuration, asDurationValue, decomposeAsc, decomposeDesc, fitsInMeasure, toFraction} from './duration-calculator';
import Fraction from 'fraction.js/fraction';

/**
 * Divides a duration token, if there is a measure bar in between
 */
export function divideDurationTokenAtBar(durationToken: Fraction, position: number): Fraction[] {
  return [];
}

/**
 * Divides a duration token by the rules of a given duration tree (currently only 4/4)
 */
export function divideDurationTokenByTree(durationToken: Fraction, position: number): Fraction[] {
  return [];
}

/**
 * Divides an overlong duration token by its numerator. Depending on the position, the returned array is sorted asc or desc.
 */
export function divideDurationTokenByNumerator(durationToken: Fraction, position: number): Fraction[] {
  if (position === 0) {
    return decomposeDesc(durationToken);
  }
  return decomposeAsc(durationToken);
}

/**
 * Divides an arbitrary long array of rhythm elements into measures (currently only 4/4)
 */
export function fillMeasures(rhythmElements: RhythmElement[]): Measure[] {
  const measuredRhythmElements: RhythmElement[][] = [];
  let durationSum: Fraction = new Fraction(1, 1);
  rhythmElements.forEach(rhythmElement => {
    durationSum = addDuration(durationSum, rhythmElement.duration);
    if (fitsInMeasure(durationSum)) {
      measuredRhythmElements[measuredRhythmElements.length - 1].push(rhythmElement);
    } else {
      measuredRhythmElements.push([rhythmElement]);
      durationSum = toFraction(rhythmElement.duration);
    }
  });
  return measuredRhythmElements.map((elements) => ({rhythmElements: elements}));
}

export function toDurationToken(durationTokenString: string): Fraction {
  const splitDurationToken = durationTokenString.split('/');
  return new Fraction(+splitDurationToken[0], +splitDurationToken[1]);
}

/**
 * Converts a durationToken into an array, containing at least one duration, or multiple tied durations.
 */
export function toDurations(durationToken: Fraction, measurePosition: number): Duration[] {
  // TODO hardcoded
  return [{
    value: asDurationValue(durationToken.d)
  }];
}

export function toRhythmElements(rhythmElementTokens: RhythmElementToken[]): RhythmElement[] {
  return rhythmElementTokens.flatMap(rhythmElementToken => (
    toDurations(rhythmElementToken.durationToken, 0).map(duration => ({
      duration,
      tones: toTones(rhythmElementToken.toneTokens)
    }))
  ));
}

export function toTones(toneTokens: string[]): Tone[] {
  return toneTokens.map(token => {
    const splitToneToken = token.split('');
    if (splitToneToken.length === 2) {
      return {
        key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
        octave: +splitToneToken[1] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
      };
    } else {
      return {
        key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
        accidental: splitToneToken[1] as '#' | 'b',
        octave: +splitToneToken[2] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
      };
    }
  });
}
