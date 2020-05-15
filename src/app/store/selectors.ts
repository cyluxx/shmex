import {createSelector} from "@ngrx/store";
import {AppState} from "./state";

const selectAppState = state => state.app;

export const selectCurrentTrack = createSelector(
  selectAppState,
  (state: AppState) => state.track
);
