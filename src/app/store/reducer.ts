import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initialAppState, RhythmElementToken } from './model';
import {
  addNewGroup,
  addNewTrack,
  deleteEmptyGroups,
  deleteTrack,
  editCover,
  editCreator1,
  editCreator2,
  editSheets,
  editTitle,
  goToTrackManager,
  moveTrack,
  parseShmexlText,
  renameTrack,
  setAudioPlayerState,
  setCurrentTrack,
  transferTrack,
} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import {
  appendExtraRestMeasures,
  divideRhythmElementTokensByMeasure,
  removeExtraRestMeasures,
  toDurationToken,
  toMeasures,
  updateCurrentShmexlText,
  updateCurrentTrack,
} from '../utils/reducer-utils';
import Fraction from 'fraction.js/fraction';
import { ToolbarState } from './enum';
import { v4 as uuidv4 } from 'uuid';
import { moveItem } from '../utils/array-utils';

const _reducer = createReducer(
  initialAppState,

  on(addNewGroup, (state): AppState => ({ ...state, score: { groups: [...state.score.groups, { tracks: [] }] } })),

  on(
    addNewTrack,
    (state): AppState => {
      const id = uuidv4();
      return {
        ...state,
        score: {
          groups: appendExtraRestMeasures(
            state.score.groups.map((group, index) => {
              if (index === state.score.groups.length - 1) {
                return {
                  ...group,
                  tracks: group.tracks.concat({
                    name: 'New Track',
                    id,
                    measures: [],
                  }),
                };
              }
              return group;
            })
          ),
        },
        editor: { shmexlTexts: [...state.editor.shmexlTexts, { id, value: '' }] },
      };
    }
  ),

  on(
    deleteEmptyGroups,
    (state): AppState => ({
      ...state,
      score: { groups: state.score.groups.filter((group) => group.tracks.length > 0) },
    })
  ),

  on(
    deleteTrack,
    (state, { id }): AppState => ({
      ...state,
      score: {
        groups: state.score.groups.map((group) => ({ tracks: group.tracks.filter((track) => track.id !== id) })),
      },
    })
  ),

  on(editCover, (state): AppState => ({ ...state, toolbar: { state: ToolbarState.EDIT_COVER } })),

  on(editCreator1, (state, { creator1 }): AppState => ({ ...state, cover: { ...state.cover, creator1 } })),

  on(editCreator2, (state, { creator2 }): AppState => ({ ...state, cover: { ...state.cover, creator2 } })),

  on(editSheets, (state): AppState => ({ ...state, toolbar: { state: ToolbarState.EDIT_SHEETS } })),

  on(editTitle, (state, { title }): AppState => ({ ...state, cover: { ...state.cover, title } })),

  on(goToTrackManager, (state): AppState => ({ ...state, toolbar: { state: ToolbarState.TRACK_MANAGER } })),

  on(
    moveTrack,
    (state, { tracks, groupIndex, previousIndex, currentIndex }): AppState => ({
      ...state,
      score: {
        groups: state.score.groups.map((group, index) => {
          if (index === groupIndex) {
            return { ...group, tracks: moveItem(tracks, previousIndex, currentIndex) };
          }
          return group;
        }),
      },
    })
  ),

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

      const shmexlTexts = updateCurrentShmexlText(state.currentTrackId, editorText, state.editor.shmexlTexts);
      const measures = toMeasures(divideRhythmElementTokensByMeasure(rhythmElementTokens));
      const groups = appendExtraRestMeasures(
        removeExtraRestMeasures(updateCurrentTrack(state.currentTrackId, measures, state.score.groups))
      );

      return { ...state, editor: { shmexlTexts }, score: { groups } };
    }
  ),

  on(
    renameTrack,
    (state, { id, newName }): AppState => ({
      ...state,
      score: {
        groups: state.score.groups.map((group) => ({
          tracks: group.tracks.map((track) =>
            track.id === id
              ? {
                  ...track,
                  name: newName,
                }
              : track
          ),
        })),
      },
    })
  ),

  on(
    setAudioPlayerState,
    (state, { audioPlayerState }): AppState => ({ ...state, audioPlayer: { state: audioPlayerState } })
  ),

  on(setCurrentTrack, (state, { id }): AppState => ({ ...state, currentTrackId: id })),

  on(
    transferTrack,
    (state, { previousGroupIndex, currentGroupIndex, previousIndex, currentIndex }): AppState => {
      const toInsert = state.score.groups[previousGroupIndex].tracks[previousIndex];
      return {
        ...state,
        score: {
          groups: state.score.groups.map((group, i) => {
            if (i === previousGroupIndex) {
              return { ...group, tracks: group.tracks.filter((_, j) => j !== previousIndex) };
            }
            if (i === currentGroupIndex) {
              return {
                ...group,
                tracks: group.tracks.slice(0, currentIndex).concat(toInsert, group.tracks.slice(currentIndex)),
              };
            }
            return group;
          }),
        },
      };
    }
  )
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
