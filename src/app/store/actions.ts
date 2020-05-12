import {createAction, props} from "@ngrx/store";

export const parseShmexlText = createAction('[Edit] parse shmexl text', props<{ shmexlText: string}>());
