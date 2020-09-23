import { createSelector } from '@ngrx/store';
import { AppState } from './model';
import { build as buildXml } from '../utils/music-xml-builder';
import { build as buildShmexl } from '../utils/shmexl-text-builder';

const selectAppState = (state): AppState => state.app;

export const selectCover = createSelector(selectAppState, (state) => state.cover);

export const selectCreator1 = createSelector(selectCover, (cover) => cover.creator1);

export const selectCreator2 = createSelector(selectCover, (cover) => cover.creator2);

export const selectCurrentToolbarState = createSelector(selectAppState, (state) => state.toolbar.state);

export const selectCurrentTrack = createSelector(selectAppState, (state) => state.track);

export const selectMusicXml = createSelector(selectCurrentTrack, selectCover, (track, cover) => buildXml(track, cover));

export const selectShmexlText = createSelector(selectCurrentTrack, (track) => buildShmexl(track));

export const selectTitle = createSelector(selectCover, (cover) => cover.title);
