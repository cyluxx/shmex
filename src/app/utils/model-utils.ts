import { Group, Measure, RhythmElement, Track } from '../store/model';

export function getAllGroupTracks(groups: Group[]): Track[] {
  return groups.reduce<Track[]>((accumulator, next) => accumulator.concat(next.tracks), []);
}

export function isRest(rhythmElement: RhythmElement): boolean {
  return rhythmElement.tones.length === 0;
}

export function isRestMeasure(measure: Measure): boolean {
  return (
    measure.rhythmElements.length === 1 &&
    measure.rhythmElements[0].duration.value === 1 &&
    isRest(measure.rhythmElements[0])
  );
}
