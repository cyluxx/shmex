import {createSelector} from '@ngrx/store';
import {AppState, Track} from './model';
import {build} from '../utils/music-xml-builder';

const selectAppState = state => state.app;

export const selectCurrentTrack = createSelector(
  selectAppState,
  (state: AppState) => state.track
);

export const selectMusicXml = createSelector(
  selectCurrentTrack,
  (track: Track) => {
    return build(track);
  }
);
