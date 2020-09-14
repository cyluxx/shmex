import {createSelector} from '@ngrx/store';
import {AppState} from './model';
import {build} from '../utils/music-xml-builder';

const selectAppState = state => state.app;

export const selectCover = createSelector(
  selectAppState,
  (state: AppState) => state.cover
);

export const selectCurrentToolbarState = createSelector(
  selectAppState,
  (state: AppState) => state.toolbar.state
);

export const selectCurrentTrack = createSelector(
  selectAppState,
  (state: AppState) => state.track
);

export const selectMusicXml = createSelector(
  selectCurrentTrack,
  selectCover,
  (track, cover) => {
    return build(track, cover);
  }
);

export const selectTitle = createSelector(
  selectCover,
  cover => cover.title
);
