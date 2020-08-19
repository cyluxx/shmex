export const initialAppState: AppState = {
  track: {
    measures: []
  }
};

export interface AppState {
  track: Track;
}

export interface Track {
  measures: Measure[];
}

export interface Measure {
  rhythmElements: RhythmElement[];
}

export interface RhythmElement {
  duration: Duration;
  tones: Tone[];
}

export interface Duration {
  value: 1 | 2 | 4 | 8 | 16 | 32;
}

export interface Tone {
  key: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
  accidental?: '#' | 'b';
  octave: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
