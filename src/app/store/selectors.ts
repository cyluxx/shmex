import {createSelector} from "@ngrx/store";
import {AppState, Track} from "./state";
import {getEndingRests, isRest, toVexRest, toVexTones} from "./utils";
import {buildPart, buildPartList, finalize} from "../utils/music-xml-builder";

const selectAppState = state => state.app;

export const selectCurrentTrack = createSelector(
  selectAppState,
  (state: AppState) => state.track
);

export const selectCurrentTrackNotes = createSelector(
  selectCurrentTrack,
  (track: Track) => {
    const staveNotes = track.rhythmElements.map(rhythmElement => {
      if (isRest(rhythmElement)) {
        return toVexRest(rhythmElement);
      }
      return toVexTones(rhythmElement);
    });
    const endingRests = getEndingRests(track).map(rhythmElement => {
      return toVexRest(rhythmElement);
    });
    return staveNotes.concat(endingRests);
  }
);

export const selectMusicXml = createSelector(
  selectCurrentTrack,
  (track: Track) => {
    return finalize(buildPartList() + buildPart(track));
  }
);
