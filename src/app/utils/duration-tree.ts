/**
 * The duration tree is used for calculation of ties and dots.
 */

export interface DurationVertex {
  noteValue: 1 | 2 | 4 | 8 | 16 | 32;
  position: number;
  leftChild?: DurationVertex;
  rightChild?: DurationVertex;
}

/**
 * returns a tree with note durations for the given measure (currently only 4/4)
 * see: https://music.stackexchange.com/a/23049/71319
 */
export function constructDurationTree(): DurationVertex {
  return constructDurationTreeRecursive(1, 0);
}

function constructDurationTreeRecursive(noteValue: 1 | 2 | 4 | 8 | 16 | 32, position: number): DurationVertex {
  if (noteValue === 32) {
    return {
      noteValue,
      position
    };
  }
  const doubledNoteValue = doubleNoteValue(noteValue);
  return {
    noteValue,
    position,
    leftChild: constructDurationTreeRecursive(doubledNoteValue, position),
    rightChild: constructDurationTreeRecursive(doubledNoteValue, position + positionValueOf(doubledNoteValue)),
  };
}

function positionValueOf(noteValue: 1 | 2 | 4 | 8 | 16 | 32): number {
  switch (noteValue) {
    case 1: return 32;
    case 2: return 16;
    case 4: return 8;
    case 8: return 4;
    case 16: return 2;
    case 32: return 1;
  }
}

function doubleNoteValue(noteValue: 1 | 2 | 4 | 8 | 16 | 32): 1 | 2 | 4 | 8 | 16 | 32 {
  if (noteValue === 32) {
    return 32;
  }
  return noteValue * 2 as 1 | 2 | 4 | 8 | 16 | 32;
}
