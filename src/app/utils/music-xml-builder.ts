import {Duration, Tone} from "../store/state";

export function buildAlter(accidental: '#' | 'b'): string {
  switch (accidental) {
    case '#':
      return '<alter>1</alter>';
    case "b":
      return '<alter>-1</alter>';
  }
  return '';
}

export function buildDuration(duration: Duration): string {
  return `<duration></duration>`;
}

// TODO for now hardcoded
export function buildMeasureAttributes(): string {
  return '<attributes><divisions>1</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>';
}

export function buildNotes(duration: Duration, tones: Tone[]): string {
  return tones
    .map(tone => `<note>${buildPitch(tone)}${buildDuration(duration)}${buildNoteType(duration)}</note>`)
    .join();
}

export function buildNoteType(duration: Duration): string {
  switch (duration.denominator) {
    case 1:
      return '<type>whole</type>';

  }
}

// TODO for now hardcoded
export function buildPart(measures: string): string {
  return '<part id="P1">' + measures + '</part>';
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
