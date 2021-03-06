import { createAction, props } from '@ngrx/store';
import { Track } from './model';
import { AudioPlayerState, ToolbarState } from './enum';

export const addNewGroup = createAction('[Track Manager] add new group');
export const addNewTrack = createAction('[Track Manager] add new track');
export const deleteEmptyGroups = createAction('[Track Manager] delete empty groups');
export const deleteTrack = createAction('[Track Manager] delete track', props<{ id: string }>());
export const editCreator1 = createAction('[Edit cover] edit creator 1', props<{ creator1: string }>());
export const editCreator2 = createAction('[Edit cover] edit creator 2', props<{ creator2: string }>());
export const editTitle = createAction('[Edit cover] edit title', props<{ title: string }>());
export const moveTrack = createAction(
  'Track manager move track',
  props<{ tracks: Track[]; groupIndex: number; previousIndex: number; currentIndex: number }>()
);
export const parseShmexlText = createAction('[Edit] parse shmexl text', props<{ editorText: string }>());
export const prettifyShmexlText = createAction('[Edit] prettify shmexl text');
export const renameTrack = createAction('[Track Manager] rename track', props<{ id: string; newName: string }>());
export const setAudioPlayerState = createAction(
  '[Audio Player] set audio player state',
  props<{ audioPlayerState: AudioPlayerState }>()
);
export const setCurrentTrack = createAction('[Track Tabs] set current track', props<{ id: string }>());
export const setToolbarState = createAction('[Toolbar] set toolbar state', props<{ toolbarState: ToolbarState }>());
export const transferTrack = createAction(
  '[Track Manager] reorder tracks',
  props<{ previousGroupIndex: number; currentGroupIndex: number; previousIndex: number; currentIndex: number }>()
);
