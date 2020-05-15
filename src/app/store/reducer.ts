import {Action, createReducer, on} from "@ngrx/store";
import {AppState, initialAppState, RhythmElement} from "./state";
import {parseShmexlText} from "./actions";
import 'codemirror/addon/runmode/runmode'
import * as CodeMirror from "codemirror";

const _reducer = createReducer(
  initialAppState,

  on(parseShmexlText, (state, {shmexlText}) => {
    const rhythmElements: RhythmElement[] = [{duration: null, tones: []}];
    CodeMirror.runMode(shmexlText, 'shmexl', (token, style) => {
      switch (style) {
        case 'atom':
          const splitDurationToken = token.split('/');
          rhythmElements[rhythmElements.length - 1].duration = {
            numerator: +splitDurationToken[0],
            denominator: +splitDurationToken[1] as 1 | 2 | 4 | 8 | 16 | 32
          }
          break;
        case 'keyword':
          const splitToneToken = token.split('');
          if (splitToneToken.length === 2) {
            rhythmElements[rhythmElements.length - 1].tones.push({
              key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
              octave: +splitToneToken[1] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
            });
          } else {
            rhythmElements[rhythmElements.length - 1].tones.push({
              key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
              accidental: splitToneToken[1] as '#' | 'b',
              octave: +splitToneToken[2] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
            });
          }
          break;
        case 'operator':
          rhythmElements.push({duration: null, tones: []});
          break;
      }
    });
    if (rhythmElements.length > 0) {
      rhythmElements.pop();
    }
    return {...state, track: {...state.track, rhythmElements}};
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
