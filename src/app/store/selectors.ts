import { createSelector } from '@ngrx/store';
import { AppState } from './model';
import { build as buildXml } from '../utils/music-xml-builder';

const _selectAppState = (state): AppState => state.app;

export const selectAppState = createSelector(_selectAppState, (state) => state);

export const selectCover = createSelector(_selectAppState, (state) => state.cover);

export const selectCreator1 = createSelector(selectCover, (cover) => cover.creator1);

export const selectCreator2 = createSelector(selectCover, (cover) => cover.creator2);

export const selectCurrentToolbarState = createSelector(_selectAppState, (state) => state.toolbar.state);

export const selectCurrentTrack = createSelector(_selectAppState, (state) => state.track);

export const selectEditor = createSelector(_selectAppState, (state) => state.editor);

export const selectMusicXml = createSelector(selectCurrentTrack, selectCover, (track, cover) => buildXml(track, cover));

export const selectShmexl = createSelector(selectEditor, (editor) => editor.shmexlText);

export const selectTitle = createSelector(selectCover, (cover) => cover.title);
