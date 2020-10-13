import { createAction, props } from '@ngrx/store';

export const addNewTrack = createAction('[Track Manager] add new track');
export const editCover = createAction('[Toolbar] edit cover');
export const editCreator1 = createAction('[Edit cover] edit creator 1', props<{ creator1: string }>());
export const editCreator2 = createAction('[Edit cover] edit creator 2', props<{ creator2: string }>());
export const editSheets = createAction('[Toolbar] edit sheets');
export const editTitle = createAction('[Edit cover] edit title', props<{ title: string }>());
export const goToTrackManager = createAction('[Toolbar] go to track manager');
export const parseShmexlText = createAction('[Edit] parse shmexl text', props<{ editorText: string }>());
