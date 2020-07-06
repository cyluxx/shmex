import {Duration, RhythmElement, Tone, Track} from "../store/state";

export function buildAlter(accidental: '#' | 'b'): string {
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
      return '<duration>1/2</duration><type>whole</type>';
    case 16:
      return '<duration>1/4</duration><type>whole</type>';
    case 32:
      return '<duration>1/8</duration><type>whole</type>';
  }
}

// TODO for now hardcoded
export function buildMeasureAttributes(): string {
  return '<attributes><divisions>1</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>';
}

export function buildMeasures(rhythmElements: RhythmElement[]): string {
  return rhythmElements.map(rhythmElement => {
    buildNotes(rhythmElement.duration, rhythmElement.tones)
  }).join();
}

export function buildNotes(duration: Duration, tones: Tone[]): string {
  return tones
    .map(tone => `<note>${buildPitch(tone)}${buildDurationAndType(duration)}</note>`)
    .join();
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
  return `<pitch><step>${tone.key.toUpperCase()}</step>${buildAlter(tone.accidental)}<octave>${tone.octave}</octave></pitch>`;
}

/**
 * Wraps body into meta information, and thus finalizes xml string
 */
export function finalize(body: string): string {
  return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
    + '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">'
    + '<score-partwise version="3.1">'
    + body
    + '</score-partwise>';
}
