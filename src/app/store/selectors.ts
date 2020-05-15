import {createSelector} from "@ngrx/store";
import {AppState, Duration, Track} from "./state";
import * as vexflow from 'vexflow';

const selectAppState = state => state.app;

export const selectCurrentTrack = createSelector(
  selectAppState,
  (state: AppState) => state.track
);

export const selectCurrentTrackNotes = createSelector(
  selectCurrentTrack,
  (track: Track) => {
    return track.rhythmElements.map(rhythmElement => {
      const duration: string = convertToVexFlowDuration(rhythmElement.duration);
      if (rhythmElement.tones.length === 0) {
        return new vexflow.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: duration + "r"});
      }
      const keys: string[] = [];
      rhythmElement.tones.forEach(tone => {
        keys.push(tone.key + '/' + tone.octave);
      });
      return new vexflow.Flow.StaveNote({clef: "treble", keys, duration});
    });
  }
)

const convertToVexFlowDuration = (duration: Duration): string => {
  switch (duration.denominator) {
    case 1:
      return "w";
    case 2:
      return "h";
    case 4:
      return "q";
  }
  return "" + duration.denominator;
};
