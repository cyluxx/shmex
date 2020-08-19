import {Duration, Measure, RhythmElement} from '../store/model';
import {addDurations, fitsInMeasure} from './duration-calculator';

/**
 * Divides an arbitrary long array of rhythm elements into measures (currently only 4/4)
 */
export function fillMeasures(rhythmElements: RhythmElement[]): Measure[] {
  const measuredRhythmElements: RhythmElement[][] = [];
  let durationSum: Duration = {value: 1};
  rhythmElements.forEach(rhythmElement => {
    durationSum = addDurations(durationSum, rhythmElement.duration);
    if (fitsInMeasure(durationSum)) {
      measuredRhythmElements[measuredRhythmElements.length - 1].push(rhythmElement);
    } else {
      measuredRhythmElements.push([rhythmElement]);
      durationSum = rhythmElement.duration;
    }
  });
  return measuredRhythmElements.map((elements) => ({rhythmElements: elements}));
}
