import {Duration, RhythmElement, Tone, Track} from '../store/model';
import {isRest, removeDuplicateTones} from './model-utils';
import {addDurations, getFractionalPart, toFraction} from './duration-calculator';

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

export function buildMeasure(measureRhythmElements: RhythmElement[], index: number, allRhythmElements: RhythmElement[][]): string {
  const measureNumber = index + 1;
  let result = '<measure number="' + measureNumber + '">';
  if (measureNumber === 1) {
    result += buildMeasureAttributes();
  }
  result += measureRhythmElements.map(rhythmElement => {
    if (isRest(rhythmElement)) {
      return buildRest(rhythmElement.duration);
    }
    return buildNotes(rhythmElement.duration, rhythmElement.tones);
  }).join('');
  if (index === allRhythmElements.length - 1) {
    result += buildEndingRests(measureRhythmElements);
    result += '<barline location="right"><bar-style>light-heavy</bar-style></barline>';
  }
  result += '</measure>';
  return result;
}

export function buildMeasures(rhythmElements: RhythmElement[]): string {
  const measuredRhythmElements: RhythmElement[][] = [[]];
  let durationSum: Duration = {numerator: 0, denominator: 1};
  rhythmElements.forEach(rhythmElement => {
    if (toFraction(durationSum).valueOf() < 1) {
      measuredRhythmElements[measuredRhythmElements.length - 1].push(rhythmElement);
      durationSum = addDurations(durationSum, rhythmElement.duration);
    } else {
      measuredRhythmElements.push([rhythmElement]);
      durationSum = rhythmElement.duration;
    }
  });
  return measuredRhythmElements.map(buildMeasure).join('');
}

export function buildNotes(duration: Duration, tones: Tone[]): string {
  return removeDuplicateTones(tones).map((tone, index) => {
    return '<note>'
      // add chord tag, only when more then one tone
      + (index > 0 ? '<chord/>' : '')
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

export function buildStep(key: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'): string {
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
