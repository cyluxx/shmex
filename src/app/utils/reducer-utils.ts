import {Duration, Measure, RhythmElement} from '../store/model';
import {addDurations, toFraction} from './duration-calculator';

/**
 * Divides an arbitrary long array of rhythm elements into measures (currently only 4/4)
 */
export function fillMeasures(rhythmElements: RhythmElement[]): Measure[] {
  const measuredRhythmElements: RhythmElement[][] = [];
  let durationSum: Duration = {numerator: 1, denominator: 1};
  rhythmElements.forEach(rhythmElement => {
    durationSum = addDurations(durationSum, rhythmElement.duration);
    if (toFraction(durationSum).valueOf() > 1) {
      measuredRhythmElements.push([rhythmElement]);
      durationSum = rhythmElement.duration;
    } else {
      measuredRhythmElements[measuredRhythmElements.length - 1].push(rhythmElement);
    }
  });
  return measuredRhythmElements.map((elements) => ({rhythmElements: elements}));
}
