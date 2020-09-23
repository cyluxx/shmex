import { RhythmElementToken, Track } from '../store/model';
import Fraction from 'fraction.js';

export function build(track: Track): string {
  // reduce all track measures to one big measure
  return (
    track.measures
      .reduce((accumulator, currentMeasure) => ({
        rhythmElements: accumulator.rhythmElements.concat(currentMeasure.rhythmElements),
      }))
      // convert to rhythm element tokens
      .rhythmElements.map(
        (rhythmElement): RhythmElementToken => ({
          durationToken: new Fraction(1, rhythmElement.duration.value),
          toneTokens: rhythmElement.tones.map((tone) => tone.key + tone.accidental ?? '' + tone.octave + ' '),
          tieStart: rhythmElement.duration.tieStart,
          tieStop: rhythmElement.duration.tieStop,
        })
      )
      // reduce all tied rhythm elements
      .reduce<RhythmElementToken[][]>((accumulator, currentValue) => {
        if (currentValue.tieStop) {
          accumulator[accumulator.length - 1].concat([currentValue]);
          return accumulator;
        }
        return accumulator.concat([[currentValue]]);
      }, [])
      // sum tied durations
      .flatMap((rhythmElementTokens) =>
        rhythmElementTokens.reduce((accumulator, currentRhythmElement) => ({
          ...accumulator,
          durationToken: accumulator.durationToken.add(currentRhythmElement.durationToken),
        }))
      )
      .map(
        (rhythmElementToken) =>
          rhythmElementToken.durationToken.n +
          '/' +
          rhythmElementToken.durationToken.d +
          ' ' +
          rhythmElementToken.toneTokens +
          ','
      )
      .join('')
  );
}
