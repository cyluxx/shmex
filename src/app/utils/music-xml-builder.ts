import {Duration, RhythmElement, Tone, Track} from '../store/model';
import {isRest} from './model-utils';
import {addDurations, getFractionalPart} from './duration-calculator';

export function buildAlter(accidental: '#' | 'b'): string {
  if (!accidental) {
    return '';
  }
  return accidental === '#' ? '<alter>1</alter>' : '<alter>-1</alter>';
}

// TODO duration for now hardcoded
export function buildDurationAndType(duration: Duration): string {
  switch (duration.denominator) {
    case 1:
      return '<duration>32</duration><type>whole</type>';
    case 2:
      return '<duration>16</duration><type>half</type>';
    case 4:
      return '<duration>8</duration><type>quarter</type>';
    case 8:
      return '<duration>4</duration><type>eighth</type>';
    case 16:
      return '<duration>2</duration><type>16th</type>';
    case 32:
      return '<duration>1</duration><type>32nd</type>';
  }
}

/**
 * returns ending rests, if track does not fit into time signature (currently only 4/4)
 */
export function buildEndingRests(rhythmElements: RhythmElement[]): string {
  let combinedDuration: Duration = {numerator: 0, denominator: 1};
  rhythmElements.map(rhythmElement => {
    combinedDuration = addDurations(combinedDuration, rhythmElement.duration);
  });
  let endingRests = '';
  let fractionalPart: Duration = getFractionalPart(combinedDuration);
  while (fractionalPart.numerator / fractionalPart.denominator !== 0) {
    const duration: Duration = {numerator: 1, denominator: fractionalPart.denominator};
    endingRests += buildRest(duration);
    combinedDuration = addDurations(combinedDuration, duration);
    fractionalPart = getFractionalPart(combinedDuration);
  }
  return endingRests;
}

// TODO for now hardcoded. Divisions important for note durations!
export function buildMeasureAttributes(): string {
  return '<attributes><divisions>8</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>';
}

export function buildMeasures(rhythmElements: RhythmElement[]): string {
  return '<measure number="1">'
    + buildMeasureAttributes()
    + rhythmElements.map(rhythmElement => {
      if (isRest(rhythmElement)) {
        return buildRest(rhythmElement.duration);
      }
      return buildNotes(rhythmElement.duration, rhythmElement.tones);
    }).join('')
    + buildEndingRests(rhythmElements)
    + '<barline location="right"><bar-style>light-heavy</bar-style></barline>'
    + '</measure>';
}

export function buildNotes(duration: Duration, tones: Tone[]): string {
  return tones
    .map(tone => {
      return '<note>'
        + buildPitch(tone)
        + buildDurationAndType(duration)
        + '</note>';
    })
    .join('');
}

export function buildOctave(octave: number): string {
  return '<octave>' + octave + '</octave>';
}

export function buildPart(track: Track): string {
  return '<part id="P1">'
    + buildMeasures(track.rhythmElements)
    + '</part>';
}

// TODO for now hardcoded
export function buildPartList(): string {
  return '<part-list><score-part id="P1"><part-name>Music</part-name></score-part></part-list>';
}

export function buildPitch(tone: Tone): string {
  return '<pitch>'
    + buildStep(tone.key)
    + buildAlter(tone.accidental)
    + buildOctave(tone.octave)
    + '</pitch>';
}

export function buildRest(duration: Duration): string {
  return '<note>'
    + '<rest />'
    + buildDurationAndType(duration)
    + '</note>';
}

export function buildStep(key: string): string {
  return '<step>' + key.toUpperCase() + '</step>';
}

/**
 * Wraps body into meta information, and thus finalizes xml string
 */
export function build(track: Track): string {
  return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
    + '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">'
    + '<score-partwise version="3.1">'
    + buildPartList()
    + buildPart(track)
    + '</score-partwise>';
}
