import {RhythmElement} from '../store/model';

export function isRest(rhythmElement: RhythmElement): boolean {
  return rhythmElement.tones.length === 0;
}
