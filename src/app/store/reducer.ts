import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initialAppState, RhythmElementToken } from './model';
import {
  addNewGroup,
  addNewTrack,
  deleteEmptyGroups,
  deleteTrack,
  editCreator1,
  editCreator2,
  editTitle,
  moveTrack,
  parseShmexlText,
  renameTrack,
  setAudioPlayerState,
  setCurrentTrack,
  setToolbarState,
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
import { AudioPlayerState } from './enum';
import { v4 as uuidv4 } from 'uuid';
import { moveItem } from '../utils/array-utils';

const _reducer = createReducer(
  initialAppState,

  on(
    addNewGroup,
    (state): AppState => ({
      ...state,
      score: { ...state.score, groups: [...state.score.groups, { tracks: [] }] },
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(
    addNewTrack,
    (state): AppState => {
      const id = uuidv4();
      return {
        ...state,
        score: {
          ...state.score,
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
        audioPlayer: AudioPlayerState.STOP,
      };
    }
  ),

  on(
    deleteEmptyGroups,
    (state): AppState => ({
      ...state,
      score: { ...state.score, groups: state.score.groups.filter((group) => group.tracks.length > 0) },
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(
    deleteTrack,
    (state, { id }): AppState => ({
      ...state,
      score: {
        ...state.score,
        groups: state.score.groups.map((group) => ({ tracks: group.tracks.filter((track) => track.id !== id) })),
      },
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(
    editCreator1,
    (state, { creator1 }): AppState => ({
      ...state,
      score: { ...state.score, cover: { ...state.score.cover, creator1 } },
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(
    editCreator2,
    (state, { creator2 }): AppState => ({
      ...state,
      score: { ...state.score, cover: { ...state.score.cover, creator2 } },
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(
    editTitle,
    (state, { title }): AppState => ({
      ...state,
      score: { ...state.score, cover: { ...state.score.cover, title } },
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(
    moveTrack,
    (state, { tracks, groupIndex, previousIndex, currentIndex }): AppState => ({
      ...state,
      score: {
        ...state.score,
        groups: state.score.groups.map((group, index) => {
          if (index === groupIndex) {
            return { ...group, tracks: moveItem(tracks, previousIndex, currentIndex) };
          }
          return group;
        }),
      },
      audioPlayer: AudioPlayerState.STOP,
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

      return {
        ...state,
        editor: { shmexlTexts },
        score: { ...state.score, groups },
        audioPlayer: AudioPlayerState.STOP,
      };
    }
  ),

  on(
    renameTrack,
    (state, { id, newName }): AppState => ({
      ...state,
      score: {
        ...state.score,
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
      audioPlayer: AudioPlayerState.STOP,
    })
  ),

  on(setAudioPlayerState, (state, { audioPlayerState }): AppState => ({ ...state, audioPlayer: audioPlayerState })),

  on(setCurrentTrack, (state, { id }): AppState => ({ ...state, currentTrackId: id })),

  on(setToolbarState, (state, { toolbarState }): AppState => ({ ...state, toolbar: toolbarState })),

  on(
    transferTrack,
    (state, { previousGroupIndex, currentGroupIndex, previousIndex, currentIndex }): AppState => {
      const toInsert = state.score.groups[previousGroupIndex].tracks[previousIndex];
      return {
        ...state,
        score: {
          ...state.score,
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
        audioPlayer: AudioPlayerState.STOP,
      };
    }
  )
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
