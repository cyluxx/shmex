import { createAction, props } from '@ngrx/store';

export const editCover = createAction('[Toolbar] edit cover');
export const editCreator1 = createAction('[Edit cover] edit creator 1', props<{ creator1: string }>());
export const editCreator2 = createAction('[Edit cover] edit creator 2', props<{ creator2: string }>());
export const editSheets = createAction('[Toolbar] edit sheets');
export const editTitle = createAction('[Edit cover] edit title', props<{ title: string }>());
export const parseShmexlText = createAction('[Edit] parse shmexl text', props<{ shmexlText: string }>());
