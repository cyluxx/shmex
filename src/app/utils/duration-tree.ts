/**
 * The duration tree is used for calculation of ties and dots.
 */

export interface DurationVertex {
  value: 1 | 2 | 4 | 8 | 16 | 32;
  leftChild?: DurationVertex;
  rightChild?: DurationVertex;
}

/**
 * returns a tree with note durations for the given measure (currently only 4/4)
 * see: https://music.stackexchange.com/a/23049/71319
 */
export function constructDurationTree(): DurationVertex {
  return constructDurationTreeRecursive(1);
}

function constructDurationTreeRecursive(value: 1 | 2 | 4 | 8 | 16 | 32): DurationVertex {
  if (value === 32) {
    return {
      value
    };
  }
  return {
    value,
    leftChild: constructDurationTreeRecursive(doubleDurationValue(value)),
    rightChild: constructDurationTreeRecursive(doubleDurationValue(value)),
  };
}

function doubleDurationValue(value: 1 | 2 | 4 | 8 | 16 | 32): 1 | 2 | 4 | 8 | 16 | 32 {
  if (value === 32) {
    return 32;
  }
  return value * 2 as 1 | 2 | 4 | 8 | 16 | 32;
}
