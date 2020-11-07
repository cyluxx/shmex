import { Group, Measure, RhythmElement, Tone, Track } from '../store/model';

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

export function removeDuplicateTones(tones: Tone[]): Tone[] {
  return tones.filter((tone, index, self) => {
    return (
      self.findIndex((t) => t.octave === tone.octave && t.accidental === tone.accidental && t.key === tone.key) ===
      index
    );
  });
}
