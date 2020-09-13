import {createAction, props} from '@ngrx/store';

export const editCover = createAction('[Toolbar] edit cover');
export const editSheets = createAction('[Toolbar] edit sheets');
export const editTitle = createAction('[Edit cover] edit title', props<{ title: string }>());
export const parseShmexlText = createAction('[Edit] parse shmexl text', props<{ shmexlText: string }>());
