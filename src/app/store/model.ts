import Fraction from 'fraction.js/fraction';
import {ToolbarState} from './enum';

export const initialAppState: AppState = {
  toolbar: {
    state: ToolbarState.EDIT_SHEETS
  },
  track: {
    measures: []
  }
};

export interface AppState {
  toolbar: Toolbar;
  track: Track;
}

export interface Duration {
  value: 1 | 2 | 4 | 8 | 16 | 32;
  tieStart: boolean;
  tieStop: boolean;
}

export interface Measure {
  rhythmElements: RhythmElement[];
}

export interface RhythmElement {
  duration: Duration;
  tones: Tone[];
}

export interface RhythmElementToken {
  durationToken: Fraction;
  toneTokens: string[];
  tieStart?: boolean;
  tieStop?: boolean;
}

export interface Tone {
  key: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
  accidental?: '#' | 'b';
  octave: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export interface Toolbar {
  state: ToolbarState;
}

export interface Track {
  measures: Measure[];
}
