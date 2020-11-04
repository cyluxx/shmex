import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initialAppState, RhythmElementToken } from './model';
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
  setCurrentTrack,
} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import {
  appendExtraRestMeasures,
  divideRhythmElementTokensByMeasure,
  removeExtraRestMeasures,
  toDurationToken,
  toMeasures,
  updateShmexlTexts,
  updateTracks,
} from '../utils/reducer-utils';
import Fraction from 'fraction.js/fraction';
import { ToolbarState } from './enum';
import { v4 as uuidv4 } from 'uuid';

const _reducer = createReducer(
  initialAppState,

  on(
    addNewTrack,
    (state): AppState => {
      const id = uuidv4();
      return {
        ...state,
        score: { tracks: appendExtraRestMeasures([...state.score.tracks, { name: 'New Track', id, measures: [] }]) },
        editor: { shmexlTexts: [...state.editor.shmexlTexts, { id, value: '' }] },
      };
    }
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

      const shmexlTexts = updateShmexlTexts(state.currentTrackId, editorText, state.editor.shmexlTexts);
      const measures = toMeasures(divideRhythmElementTokensByMeasure(rhythmElementTokens));
      const tracks = appendExtraRestMeasures(updateTracks(state.currentTrackId, measures, state.score.tracks));
      const normalizedTracks = appendExtraRestMeasures(removeExtraRestMeasures(tracks));

      return { ...state, editor: { shmexlTexts }, score: { tracks: normalizedTracks } };
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

  on(reorderTracks, (state, { tracks }): AppState => ({ ...state, score: { tracks } })),

  on(setCurrentTrack, (state, { id }): AppState => ({ ...state, currentTrackId: id }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
