import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initialAppState, RhythmElementToken, ShmexlText, Track } from './model';
import {
  addNewTrack,
  editCover,
  editCreator1,
  editCreator2,
  editSheets,
  editTitle,
  goToTrackManager,
  parseShmexlText,
  renameTrack,
  reorderTracks,
} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import { divideRhythmElementTokensByMeasure, toDurationToken, toMeasures } from '../utils/reducer-utils';
import Fraction from 'fraction.js/fraction';
import { ToolbarState } from './enum';
import { v4 as uuidv4 } from 'uuid';

const _reducer = createReducer(
  initialAppState,

  on(
    addNewTrack,
    (state): AppState => ({
      ...state,
      score: { tracks: [...state.score.tracks, { name: 'New Track', id: uuidv4(), measures: [] }] },
    })
  ),

  on(editCover, (state): AppState => ({ ...state, toolbar: { state: ToolbarState.EDIT_COVER } })),

  on(editCreator1, (state, { creator1 }): AppState => ({ ...state, cover: { ...state.cover, creator1 } })),

  on(editCreator2, (state, { creator2 }): AppState => ({ ...state, cover: { ...state.cover, creator2 } })),

  on(editSheets, (state): AppState => ({ ...state, toolbar: { state: ToolbarState.EDIT_SHEETS } })),

  on(editTitle, (state, { title }): AppState => ({ ...state, cover: { ...state.cover, title } })),

  on(goToTrackManager, (state): AppState => ({ ...state, toolbar: { state: ToolbarState.TRACK_MANAGER } })),

  on(
    parseShmexlText,
    (state, { editorText }): AppState => {
      const rhythmElementTokens: RhythmElementToken[] = [];
      let durationToken: Fraction;
      let toneTokens: string[] = [];

      CodeMirror.runMode(editorText, 'shmexl', (token, style) => {
        switch (style) {
          case 'atom':
            durationToken = toDurationToken(token);
            break;
          case 'keyword':
            toneTokens = toneTokens.concat([token]);
            break;
          case 'operator':
            rhythmElementTokens.push({ durationToken, toneTokens });
            toneTokens = [];
            break;
        }
      });

      const shmexlTexts: ShmexlText[] = state.editor.shmexlTexts.map((shmexlText) =>
        shmexlText.id === state.currentTrackId ? { id: shmexlText.id, value: editorText } : shmexlText
      );

      const measures = toMeasures(divideRhythmElementTokensByMeasure(rhythmElementTokens));
      const tracks: Track[] = state.score.tracks.map((track) =>
        track.id === state.currentTrackId ? { id: track.id, name: track.name, measures } : track
      );

      return { ...state, editor: { shmexlTexts }, score: { tracks } };
    }
  ),

  on(
    renameTrack,
    (state, { id, newName }): AppState => ({
      ...state,
      score: {
        tracks: state.score.tracks.map((track) => (track.id === id ? { ...track, name: newName } : track)),
      },
    })
  ),

  on(reorderTracks, (state, { tracks }): AppState => ({ ...state, score: { tracks } }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
