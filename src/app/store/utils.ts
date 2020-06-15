import * as vexflow from 'vexflow';
import {Duration, RhythmElement, Track} from "./state";
import Fraction from "fraction.js/fraction";

export function addDurations(x: Duration, y: Duration): Duration {
  return toDuration(toFraction(x).add(toFraction(y)));
}

/**
 * returns ending rests, if track does not fit into time signature (currently only 4/4)
 */
export function getEndingRests(track: Track): RhythmElement[] {
  let combinedDuration: Duration = {numerator: 0, denominator: 1};
  track.rhythmElements.map(rhythmElement => {
    combinedDuration = addDurations(combinedDuration, rhythmElement.duration);
  });
  const endingRests: RhythmElement[] = [];
  let fractionalPart: Duration = getFractionalPart(combinedDuration);
  while (fractionalPart.numerator / fractionalPart.denominator !== 0) {
    const duration: Duration = {numerator: 1, denominator: fractionalPart.denominator};
    endingRests.push({duration, tones: []});
    combinedDuration = addDurations(combinedDuration, duration);
    fractionalPart = getFractionalPart(combinedDuration);
  }
  return endingRests;
}

export function getFractionalPart(duration: Duration): Duration {
  return toDuration(toFraction(duration).mod(1));
}

export function isRest(rhythmElement: RhythmElement): boolean {
  return rhythmElement.tones.length === 0;
}

export function toDuration(fraction: Fraction): Duration {
  return {numerator: fraction.n, denominator: fraction.d as 1 | 2 | 4 | 8 | 16 | 32};
}

export function toFraction(duration: Duration): Fraction {
  return new Fraction(duration.numerator, duration.denominator);
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
  if (duration === 'w') {
    return new vexflow.Flow.StaveNote({clef: "treble", keys: ["d/4"], duration: duration + "r"});
  }
  return new vexflow.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: duration + "r"});
}

export function toVexTones(rhythmElement: RhythmElement) {
  const keys: string[] = rhythmElement.tones.map(tone => {
    return tone.key + '/' + tone.octave;
  });
  const duration: string = toVexDuration(rhythmElement.duration);
  const staveNote = new vexflow.Flow.StaveNote({clef: "treble", keys, duration});
  rhythmElement.tones.forEach((tone, index) => {
    if (tone.accidental) {
      staveNote.addAccidental(index, new vexflow.Flow.Accidental(tone.accidental));
    }
  })
  return staveNote;
}
