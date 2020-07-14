import {Duration, RhythmElement, Tone, Track} from '../store/state';

export function buildAlter(accidental: '#' | 'b'): string {
  if (!accidental) {
    return '';
  }
  return accidental === '#' ? '<alter>1</alter>' : '<alter>-1</alter>';
}

export function buildDurationAndType(duration: Duration): string {
  switch (duration.denominator) {
    case 1:
      return '<duration>4</duration><type>whole</type>';
    case 2:
      return '<duration>2</duration><type>half</type>';
    case 4:
      return '<duration>1</duration><type>quarter</type>';
    case 8:
      return '<duration>0.5</duration><type>eighth</type>';
    case 16:
      return '<duration>0.25</duration><type>16th</type>';
    case 32:
      return '<duration>0.125</duration><type>32nd</type>';
  }
}

// TODO for now hardcoded
export function buildMeasureAttributes(): string {
  return '<attributes><divisions>1</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>';
}

export function buildMeasures(rhythmElements: RhythmElement[]): string {
  return '<measure number="1">'
    + rhythmElements.map(rhythmElement => {
      return buildNotes(rhythmElement.duration, rhythmElement.tones);
    }).join('')
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
    + buildMeasureAttributes()
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
