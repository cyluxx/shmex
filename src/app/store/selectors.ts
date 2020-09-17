import {createSelector} from '@ngrx/store';
import {AppState} from './model';
import {build} from '../utils/music-xml-builder';

const selectAppState = (state): AppState => state.app;

export const selectCover = createSelector(
  selectAppState,
  state => state.cover
);

export const selectCreator1 = createSelector(
  selectCover,
  cover => cover.creator1
);

export const selectCreator2 = createSelector(
  selectCover,
  cover => cover.creator2
);

export const selectCurrentToolbarState = createSelector(
  selectAppState,
  state => state.toolbar.state
);

export const selectCurrentTrack = createSelector(
  selectAppState,
  state => state.track
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
