import {Action, createReducer, on} from "@ngrx/store";
import {AppState, initialAppState} from "./state";
import {parseShmexlText} from "./actions";
import 'codemirror/addon/runmode/runmode'
import * as CodeMirror from "codemirror";

const _reducer = createReducer(
  initialAppState,

  on(parseShmexlText, (state, {shmexlText}) => {
    CodeMirror.runMode(this.codeMirrorContent, 'shmexl', (token, style) => {

    });
    return state;
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
