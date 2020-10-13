import { createSelector } from '@ngrx/store';
import { AppState } from './model';
import { build as buildXml } from '../utils/music-xml-builder';

const _selectAppState = (state): AppState => state.app;

export const selectAppState = createSelector(_selectAppState, (state) => state);
export const selectCover = createSelector(_selectAppState, (state) => state.cover);
export const selectCurrentToolbarState = createSelector(_selectAppState, (state) => state.toolbar.state);
export const selectCurrentTrackId = createSelector(_selectAppState, (state) => state.currentTrackId);
export const selectEditor = createSelector(_selectAppState, (state) => state.editor);
export const selectScore = createSelector(_selectAppState, (state) => state.score);

export const selectCreator1 = createSelector(selectCover, (cover) => cover.creator1);
export const selectCreator2 = createSelector(selectCover, (cover) => cover.creator2);
export const selectTitle = createSelector(selectCover, (cover) => cover.title);

export const selectShmexlTexts = createSelector(selectEditor, (editor) => editor.shmexlTexts);

export const selectTracks = createSelector(selectScore, (score) => score.tracks);

export const selectMusicXml = createSelector(selectCover, selectTracks, (cover, tracks) => buildXml(cover, tracks));

export const selectCurrentEditorText = createSelector(
  selectCurrentTrackId,
  selectShmexlTexts,
  (currentTrackId, texts) => texts.find((text) => text.id === currentTrackId).value
);
