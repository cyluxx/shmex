import {Duration, Measure, RhythmElement, RhythmElementToken, Tone} from '../store/model';
import {addDuration, asDurationValue, fitsInMeasure, toFraction} from './duration-calculator';
import Fraction from 'fraction.js/fraction';

/**
 * Divides an arbitrary long array of rhythm elements into measures (currently only 4/4)
 */
export function fillMeasures(rhythmElements: RhythmElement[]): Measure[] {
  const measuredRhythmElements: RhythmElement[][] = [];
  let durationSum: Fraction = new Fraction(1, 1);
  rhythmElements.forEach(rhythmElement => {
    durationSum = addDuration(durationSum, rhythmElement.duration);
    console.log(durationSum);
    if (fitsInMeasure(durationSum)) {
      measuredRhythmElements[measuredRhythmElements.length - 1].push(rhythmElement);
    } else {
      measuredRhythmElements.push([rhythmElement]);
      durationSum = toFraction(rhythmElement.duration);
    }
  });
  return measuredRhythmElements.map((elements) => ({rhythmElements: elements}));
}

export function shorten(durationToken: string): string {
  const splitDurationToken = durationToken.split('/');
  const fraction = new Fraction(+splitDurationToken[0], +splitDurationToken[1]);
  return fraction.n + '/' + fraction.d;
}

/**
 * Converts a durationToken into an array, containing at least one duration, or multiple tied durations.
 */
export function toDurations(durationToken: string): Duration[] {
  const shortenedDurationToken = shorten(durationToken);
  const splitDurationToken = shortenedDurationToken.split('/');
  // TODO hardcoded
  return [{
    value: asDurationValue(+splitDurationToken[1])
  }];
}

export function toRhythmElements(rhythmElementTokens: RhythmElementToken[]): RhythmElement[] {
  return rhythmElementTokens.flatMap(rhythmElementToken => (
    toDurations(rhythmElementToken.durationToken).map(duration => ({
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
