export enum AudioPlayerState {
  PAUSE,
  PLAY,
  STOP,
}

export enum ChordType {
  MAJOR = '',
  MINOR = 'm',
  AUGMENTED = 'aug',
  DIMINISHED = 'dim',
  HALF_DIMINISHED = '*',
  SUS_4 = 'sus4',
  SUS_2 = 'sus2',
  POWER = '5',
}

export enum ChordExtension {
  SIXTH = '6',
  DOMINANT_SEVENTH = '7',
  DOMINANT_NINTH = '9',
  ELEVENTH = '11',
  THIRTEENTH = '13',
  MAJOR_SEVENTH = 'M7',
  MAJOR_NINTH = 'M9',
  MINOR_NINTH = 'b9',
  MAJOR_ELEVENTH = 'M11',
  MAJOR_THIRTEENTH = 'M13',
  FLAT_FIVE_SEVENTH = '7b5',
  DOMINANT_MINOR_NINTH = '7b9',
}

export enum ToolbarState {
  EDIT_CHORDS,
  EDIT_COVER,
  EDIT_GLOBAL,
  EDIT_SHEETS,
  TRACK_MANAGER,
}
