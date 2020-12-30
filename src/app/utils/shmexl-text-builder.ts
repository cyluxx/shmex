import { Measure, RhythmElement, RhythmElementToken, Tone, Track } from '../store/model';
import Fraction from 'fraction.js';
import { addDuration } from './duration-calculator';

/**
 * Converts a track into a shmexl string
 */
export function build(track: Track): string {
  const reducedMeasures = reduceMeasures(track.measures);
  const rets = reducedMeasures.rhythmElements.map((rhythmElement) => toRhythmElementToken(rhythmElement));
  const groupedRets = groupTiedElements(rets);
  const summedUpRets = sumTiedDurations(groupedRets);
  const strings = summedUpRets.map((ret) => toString(ret));
  return strings.join('');
}

/**
 * Groups tied elements into arrays
 */
export function groupTiedElements(rhythmElementTokens: RhythmElementToken[]): RhythmElementToken[][] {
  return rhythmElementTokens.reduce<RhythmElementToken[][]>((accumulator, currentValue) => {
    if (currentValue.tieStop) {
      accumulator[accumulator.length - 1] = accumulator[accumulator.length - 1].concat([currentValue]);
      return accumulator;
    }
    return accumulator.concat([[currentValue]]);
  }, []);
}

/**
 * Reduce an array of measures to one giant measure
 */
export function reduceMeasures(measures: Measure[]): Measure {
  return measures.reduce(
    (accumulator, currentMeasure) => ({
      rhythmElements: accumulator.rhythmElements.concat(currentMeasure.rhythmElements),
    }),
    { rhythmElements: [] }
  );
}

/**
 * Sum all durations of each tied rhythmElement group, and flat array to one dimension
 */
export function sumTiedDurations(groupedRhythmElementTokens: RhythmElementToken[][]): RhythmElementToken[] {
  return groupedRhythmElementTokens.flatMap((rhythmElementTokens) =>
    rhythmElementTokens.reduce((accumulator, currentRhythmElement) => ({
      ...accumulator,
      durationToken: accumulator.durationToken.add(currentRhythmElement.durationToken),
    }))
  );
}

/**
 * Converts a RhythmElement to a RhythmElementToken
 */
export function toRhythmElementToken(rhythmElement: RhythmElement): RhythmElementToken {
  return {
    durationToken: new Fraction(1, rhythmElement.duration.value),
    toneTokens: rhythmElement.tones.map((tone) => tone.key + (tone.accidental ?? '') + tone.octave),
    tieStart: rhythmElement.duration.tieStart,
    tieStop: rhythmElement.duration.tieStop,
  };
}

/**
 * Converts a RhythmElementToken to a String
 */
export function toString(rhythmElementToken: RhythmElementToken): string {
  return (
    rhythmElementToken.durationToken.n +
    '/' +
    rhythmElementToken.durationToken.d +
    (rhythmElementToken.toneTokens.length > 0 ? ' ' : '') +
    rhythmElementToken.toneTokens.join(' ') +
    ', '
  );
}

export function buildMeasures(measures: Measure[]): string {
  let current: Fraction = new Fraction(0);
  let newLines = '';
  return measures
    .map((measure) => {
      let rhythmElementString = '';
      measure.rhythmElements.forEach((rhythmElement, index, rhythmElements) => {
        const { duration } = rhythmElement;
        current = addDuration(current, duration);
        if (!duration.tieStart) {
          rhythmElementString += `${current.n}/${current.d}${buildTones(rhythmElement.tones)}, ${newLines}`;
          newLines = '';
          current = new Fraction(0);
        } else if (index === rhythmElements.length - 1) {
          newLines += '\n';
        }
      });

      if (newLines === '') {
        rhythmElementString += '\n';
      }
      return rhythmElementString;
    })
    .join('');
}

export function buildTones(tones: Tone[]): string {
  if (tones.length === 0) {
    return '';
  }
  return ' ' + tones.map((tone) => tone.key + (tone.accidental ?? '') + tone.octave).join(' ');
}
