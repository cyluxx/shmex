import { Measure, RhythmElement, RhythmElementToken, Track } from '../store/model';
import Fraction from 'fraction.js';

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
  return measures.reduce((accumulator, currentMeasure) => ({
    rhythmElements: accumulator.rhythmElements.concat(currentMeasure.rhythmElements),
  }));
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
    toneTokens: rhythmElement.tones.map((tone) => tone.key + tone.accidental ?? '' + tone.octave + ' '),
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
    ' ' +
    rhythmElementToken.toneTokens +
    ','
  );
}
