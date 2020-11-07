import { createAction, props } from '@ngrx/store';
import { Group } from './model';

export const addNewTrack = createAction('[Track Manager] add new track');
export const editCover = createAction('[Toolbar] edit cover');
export const editCreator1 = createAction('[Edit cover] edit creator 1', props<{ creator1: string }>());
export const editCreator2 = createAction('[Edit cover] edit creator 2', props<{ creator2: string }>());
export const editSheets = createAction('[Toolbar] edit sheets');
export const editTitle = createAction('[Edit cover] edit title', props<{ title: string }>());
export const goToTrackManager = createAction('[Toolbar] go to track manager');
export const parseShmexlText = createAction('[Edit] parse shmexl text', props<{ editorText: string }>());
export const renameTrack = createAction('[Track Manager] rename track', props<{ id: string; newName: string }>());
export const reorderTracks = createAction('[Track Manager] reorder tracks', props<{ groups: Group[] }>());
export const setCurrentTrack = createAction('[Track Tabs] set current track', props<{ id: string }>());
