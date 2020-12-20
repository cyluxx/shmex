import Fraction from 'fraction.js/fraction';
import { AudioPlayerState, ToolbarState } from './enum';
import { v4 as uuidv4 } from 'uuid';

const initialTrackId: string = uuidv4();

export const initialAppState: AppState = {
  audioPlayer: {
    state: AudioPlayerState.STOP,
  },
  cover: {
    title: 'Title',
    creator1: 'Composer',
    creator2: 'Lyricist',
  },
  currentTrackId: initialTrackId,
  editor: {
    shmexlTexts: [
      {
        id: initialTrackId,
        value: '',
      },
    ],
  },
  score: {
    groups: [
      {
        tracks: [
          {
            id: initialTrackId,
            name: 'Piano',
            measures: [],
          },
        ],
      },
    ],
  },
  toolbar: {
    state: ToolbarState.EDIT_SHEETS,
  },
};

export interface AppState {
  audioPlayer: AudioPlayer;
  cover: Cover;
  currentTrackId: string;
  editor: Editor;
  score: Score;
  toolbar: Toolbar;
}

export interface AudioPlayer {
  state: AudioPlayerState;
}

export interface Cover {
  title: string;
  creator1: string;
  creator2: string;
}

export interface Duration {
  value: 1 | 2 | 4 | 8 | 16 | 32;
  tieStart: boolean;
  tieStop: boolean;
}

export interface Editor {
  shmexlTexts: ShmexlText[];
}

export interface Group {
  tracks: Track[];
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

export interface Score {
  groups: Group[];
}

export interface ShmexlText {
  id: string;
  value: string;
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
  id: string;
  name: string;
  measures: Measure[];
}
