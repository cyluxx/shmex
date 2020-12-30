import { Cover, Duration, Group, Measure, RhythmElement, Score, Tone, Track } from '../store/model';
import { isRest } from './model-utils';
import { addDuration, asDurationValue, getFractionalPart } from './duration-calculator';
import Fraction from 'fraction.js/fraction';

export function buildAlter(accidental: '#' | 'b'): string {
  if (!accidental) {
    return '';
  }
  return accidental === '#' ? '<alter>1</alter>' : '<alter>-1</alter>';
}

export function buildCover(cover: Cover): string {
  return (
    '<movement-title>' +
    cover.title +
    '</movement-title>' +
    '<identification>' +
    '<creator type="composer">' +
    cover.creator1 +
    '</creator>' +
    '<creator type="lyricist">' +
    cover.creator2 +
    '</creator>' +
    '</identification>'
  );
}

export function buildDurationAndType(duration: Duration): string {
  switch (duration.value) {
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
  let combinedDuration: Fraction = new Fraction(1, 1);
  rhythmElements.map((rhythmElement) => {
    combinedDuration = addDuration(combinedDuration, rhythmElement.duration);
  });
  let endingRests = '';
  let fractionalPart: Fraction = getFractionalPart(combinedDuration);
  while (fractionalPart.n / fractionalPart.d !== 0) {
    const duration: Duration = { value: asDurationValue(fractionalPart.d), tieStart: false, tieStop: false };
    endingRests += buildRest(duration);
    combinedDuration = addDuration(combinedDuration, duration);
    fractionalPart = getFractionalPart(combinedDuration);
  }
  return endingRests;
}

// TODO for now hardcoded. Divisions important for note durations!
export function buildMeasureAttributes(): string {
  return '<attributes><divisions>8</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>';
}

export function buildMeasure(
  measureRhythmElements: RhythmElement[],
  index: number,
  allRhythmElements: RhythmElement[][]
): string {
  const measureNumber = index + 1;
  let result = '<measure number="' + measureNumber + '">';
  if (measureNumber === 1) {
    result += buildMeasureAttributes();
  }
  result += measureRhythmElements
    .map((rhythmElement) => {
      if (isRest(rhythmElement)) {
        return buildRest(rhythmElement.duration);
      }
      return buildNotes(rhythmElement.duration, rhythmElement.tones);
    })
    .join('');
  if (index === allRhythmElements.length - 1) {
    result += buildEndingRests(measureRhythmElements);
    result += '<barline location="right"><bar-style>light-heavy</bar-style></barline>';
  }
  result += '</measure>';
  return result;
}

export function buildMeasures(measures: Measure[]): string {
  if (measures.length === 0) {
    return buildMeasure([], 0, [[]]);
  }
  return measures
    .map((measure) => measure.rhythmElements)
    .map(buildMeasure)
    .join('');
}

export function buildNotes(duration: Duration, tones: Tone[]): string {
  return tones
    .map((tone, index) => {
      return (
        '<note>' +
        // add chord tag, only when more then one tone
        (index > 0 ? '<chord/>' : '') +
        buildPitch(tone) +
        buildDurationAndType(duration) +
        buildTie(duration.tieStart, duration.tieStop) +
        '</note>'
      );
    })
    .join('');
}

export function buildOctave(octave: number): string {
  return '<octave>' + octave + '</octave>';
}

export function buildPart(track: Track): string {
  return `<part id="${track.id}">${buildMeasures(track.measures)}</part>`;
}

export function buildPartGroup(group: Group, index: number): string {
  return (
    `<part-group number="${index}" type="start">` +
    '<group-symbol>bracket</group-symbol>' +
    '<group-barline>yes</group-barline>' +
    '</part-group>' +
    buildScoreParts(group.tracks) +
    `<part-group number="${index}" type="stop"/>`
  );
}

export function buildPartList(groups: Group[]): string {
  return (
    '<part-list>' +
    groups
      .map((group, index) => {
        if (group.tracks.length > 1) {
          return buildPartGroup(group, index);
        }
        return buildScoreParts(group.tracks);
      })
      .join('') +
    '</part-list>'
  );
}

export function buildParts(tracks: Track[]): string {
  return tracks.map((track) => buildPart(track)).join('');
}

export function buildPitch(tone: Tone): string {
  return '<pitch>' + buildStep(tone.key) + buildAlter(tone.accidental) + buildOctave(tone.octave) + '</pitch>';
}

export function buildRest(duration: Duration): string {
  return '<note>' + '<rest />' + buildDurationAndType(duration) + '</note>';
}

export function buildScoreParts(tracks: Track[]): string {
  return tracks
    .map((track) => `<score-part id="${track.id}"><part-name>${track.name}</part-name></score-part>`)
    .join('');
}

export function buildStep(key: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'): string {
  return '<step>' + key.toUpperCase() + '</step>';
}

export function buildTie(tieStart: boolean, tieStop: boolean): string {
  if (tieStart && tieStop) {
    return '<tie type="stop"/><tie type="start"/><notations><tied type="stop"/><tied type="start"/></notations>';
  }
  if (tieStart) {
    return '<tie type="start"/><notations><tied type="start"/></notations>';
  }
  if (tieStop) {
    return '<tie type="stop"/><notations><tied type="stop"/></notations>';
  }
  return '';
}

/**
 * Wraps body into meta information, and thus finalizes xml string
 */
export function build(score: Score): string {
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">' +
    '<score-partwise version="3.1">' +
    buildCover(score.cover) +
    buildPartList(score.groups) +
    score.groups.map((group) => buildParts(group.tracks)).join('') +
    '</score-partwise>'
  );
}
