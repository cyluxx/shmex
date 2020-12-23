import { createSelector } from '@ngrx/store';
import { AppState } from './model';
import { build as buildXml } from '../utils/music-xml-builder';
import { getAllGroupTracks } from '../utils/model-utils';

const _selectAppState = (state): AppState => state.app;

export const selectAppState = createSelector(_selectAppState, (state) => state);
export const selectAudioPlayerState = createSelector(_selectAppState, (state) => state.audioPlayer);
export const selectCurrentToolbarState = createSelector(_selectAppState, (state) => state.toolbar);
export const selectCurrentTrackId = createSelector(_selectAppState, (state) => state.currentTrackId);
export const selectEditor = createSelector(_selectAppState, (state) => state.editor);
export const selectScore = createSelector(_selectAppState, (state) => state.score);

export const selectShmexlTexts = createSelector(selectEditor, (editor) => editor.shmexlTexts);

export const selectCover = createSelector(selectScore, (state) => state.cover);
export const selectGroups = createSelector(selectScore, (score) => score.groups);

export const selectCreator1 = createSelector(selectCover, (cover) => cover.creator1);
export const selectCreator2 = createSelector(selectCover, (cover) => cover.creator2);
export const selectTitle = createSelector(selectCover, (cover) => cover.title);

export const selectAllTracks = createSelector(selectGroups, getAllGroupTracks);

export const selectMusicXml = createSelector(selectScore, (score) => buildXml(score));

export const selectCurrentEditorText = createSelector(
  selectCurrentTrackId,
  selectShmexlTexts,
  (currentTrackId, texts) => texts.find((text) => text.id === currentTrackId).value
);
