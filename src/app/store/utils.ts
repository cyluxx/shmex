import * as vexflow from 'vexflow';
import {Duration, RhythmElement} from "./state";

export function isRest(rhythmElement: RhythmElement): boolean {
  return rhythmElement.tones.length === 0;
}

export function toVexDuration(duration: Duration): string {
  switch (duration.denominator) {
    case 1:
      return "w";
    case 2:
      return "h";
    case 4:
      return "q";
  }
  return "" + duration.denominator;
}

export function toVexRest(rhythmElement: RhythmElement) {
  const duration: string = toVexDuration(rhythmElement.duration);
  return new vexflow.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: duration + "r"});
}

export function toVexTones(rhythmElement: RhythmElement) {
  const keys: string[] = [];
  rhythmElement.tones.forEach(tone => {
    keys.push(tone.key + '/' + tone.octave);
  });
  const duration: string = toVexDuration(rhythmElement.duration);
  return new vexflow.Flow.StaveNote({clef: "treble", keys, duration});
}
