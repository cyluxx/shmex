import {Action, createReducer, on} from '@ngrx/store';
import {AppState, Duration, initialAppState, RhythmElement, Tone} from './model';
import {parseShmexlText} from './actions';
import 'codemirror/addon/runmode/runmode';
import * as CodeMirror from 'codemirror';
import {fillMeasures} from '../utils/reducer-utils';

const _reducer = createReducer(
  initialAppState,

  on(parseShmexlText, (state, {shmexlText}) => {
    const rhythmElements: RhythmElement[] = [];
    let nextDuration: Duration;
    let nextTones: Tone[] = [];

    CodeMirror.runMode(shmexlText, 'shmexl', (token, style) => {
      switch (style) {
        case 'atom':
          const splitDurationToken = token.split('/');
          nextDuration = {
            numerator: +splitDurationToken[0],
            denominator: +splitDurationToken[1] as 1 | 2 | 4 | 8 | 16 | 32
          };
          break;
        case 'keyword':
          const splitToneToken = token.split('');
          if (splitToneToken.length === 2) {
            nextTones.push({
              key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
              octave: +splitToneToken[1] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
            });
          } else {
            nextTones.push({
              key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
              accidental: splitToneToken[1] as '#' | 'b',
              octave: +splitToneToken[2] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
            });
          }
          break;
        case 'operator':
          rhythmElements.push({duration: nextDuration, tones: nextTones});
          nextTones = [];
          break;
      }
    });

    const measures = fillMeasures(rhythmElements);
    return {...state, track: {...state.track, measures}};
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
