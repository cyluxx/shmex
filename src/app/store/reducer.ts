import {Action, createReducer, on} from '@ngrx/store';
import {AppState, initialAppState, RhythmElementToken} from './model';
import {parseShmexlText} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import {fillMeasures, toRhythmElements} from '../utils/reducer-utils';

const _reducer = createReducer(
  initialAppState,

  on(parseShmexlText, (state, {shmexlText}) => {
    const rhythmElementTokens: RhythmElementToken[] = [];
    let durationToken: string;
    let toneTokens: string[] = [];

    CodeMirror.runMode(shmexlText, 'shmexl', (token, style) => {
      switch (style) {
        case 'atom':
          durationToken = token;
          break;
        case 'keyword':
          toneTokens = toneTokens.concat([token]);
          break;
        case 'operator':
          rhythmElementTokens.push({durationToken, toneTokens});
          toneTokens = [];
          break;
      }
    });

    const measures = fillMeasures(toRhythmElements(rhythmElementTokens));
    return {...state, track: {...state.track, measures}};
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
