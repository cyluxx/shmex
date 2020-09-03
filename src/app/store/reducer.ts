import {Action, createReducer, on} from '@ngrx/store';
import {AppState, initialAppState, RhythmElementToken} from './model';
import {parseShmexlText} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import {divideRhythmElementTokensByMeasure, toDurationToken, toMeasures} from '../utils/reducer-utils';
import Fraction from 'fraction.js/fraction';

const _reducer = createReducer(
  initialAppState,

  on(parseShmexlText, (state, {shmexlText}) => {
    const rhythmElementTokens: RhythmElementToken[] = [];
    let durationToken: Fraction;
    let toneTokens: string[] = [];

    CodeMirror.runMode(shmexlText, 'shmexl', (token, style) => {
      switch (style) {
        case 'atom':
          durationToken = toDurationToken(token);
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

    const measures = toMeasures(divideRhythmElementTokensByMeasure(rhythmElementTokens));
    return {...state, track: {...state.track, measures}};
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
