import {createSelector} from "@ngrx/store";
import {AppState, Track} from "./state";
import {isRest, toVexRest, toVexTones} from "./utils";

const selectAppState = state => state.app;

export const selectCurrentTrack = createSelector(
  selectAppState,
  (state: AppState) => state.track
);

export const selectCurrentTrackNotes = createSelector(
  selectCurrentTrack,
  (track: Track) => {
    return track.rhythmElements.map(rhythmElement => {
      if (isRest(rhythmElement)) {
        return toVexRest(rhythmElement);
      }
      return toVexTones(rhythmElement);
    });
  }
)
