import Fraction from 'fraction.js/fraction';
import { AudioPlayerState, ToolbarState } from './enum';
import { v4 as uuidv4 } from 'uuid';

const initialTrackId: string = uuidv4();

export const initialAppState: AppState = {
  audioPlayer: AudioPlayerState.STOP,
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
    cover: {
      title: 'Title',
      creator1: 'Composer',
      creator2: 'Lyricist',
    },
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
  toolbar: ToolbarState.EDIT_SHEETS,
};

export interface AppState {
  audioPlayer: AudioPlayerState;
  currentTrackId: string;
  editor: Editor;
  score: Score;
  toolbar: ToolbarState;
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
  cover: Cover;
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

export interface Track {
  id: string;
  name: string;
  measures: Measure[];
}
