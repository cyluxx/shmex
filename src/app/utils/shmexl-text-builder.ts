import { Measure, Tone, Track } from '../store/model';
import Fraction from 'fraction.js';
import { addDuration } from './duration-calculator';

/**
 * Converts a track into a shmexl string
 */
export function build(track: Track): string {
  return buildMeasures(track.measures);
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
