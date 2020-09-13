import {Action, createReducer, on} from '@ngrx/store';
import {AppState, initialAppState, RhythmElementToken} from './model';
import {editCover, editSheets, parseShmexlText} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import {divideRhythmElementTokensByMeasure, toDurationToken, toMeasures} from '../utils/reducer-utils';
import Fraction from 'fraction.js/fraction';
import {ToolbarState} from './enum';

const _reducer = createReducer(
  initialAppState,

  on(editCover, state => ({...state, toolbar: {state: ToolbarState.EDIT_COVER}})),

  on(editSheets, state => ({...state, toolbar: {state: ToolbarState.EDIT_SHEETS}})),

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
