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
  SUS_4 = 'sus4',
  SUS_2 = 'sus2',
  POWER = '5',
}

export enum ChordExtension {
  MAJOR_SEVENTH = 'M7',
  DOMINANT_SEVENTH = '7',
  FLAT_FIVE_SEVENTH = '7b5',
  MAJOR_NINTH = 'M9',
  DOMINANT_NINTH = '9',
  DOMINANT_MINOR_NINTH = '7b9',
  FLAT_FIVE_NINTH = '7b59',
  FLAT_FIVE_MINOR_NINTH = '7b5b9',
  MINOR_NINTH = 'b9',
  ELEVENTH = '11',
  MAJOR_ELEVENTH = 'M11',
  FLAT_FIVE_ELEVENTH = '7b511',
  MAJOR_THIRTEENTH = 'M13',
  THIRTEENTH = '13',
  FLAT_FIVE_THIRTEENTH = '7b513',
  SIXTH = '6',
  SIXTH_NINTH = '69',
}

export enum ToolbarState {
  EDIT_CHORDS,
  EDIT_COVER,
  EDIT_GLOBAL,
  EDIT_SHEETS,
  TRACK_MANAGER,
}
