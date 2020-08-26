import {constructDurationTree, DurationVertex} from './duration-tree';

describe('constructDurationTree', () => {
  it('constructs correct 4/4 tree', () => {
    const thirtySecond: DurationVertex = {value: 32};
    const sixteenth: DurationVertex = {value: 16, leftChild: thirtySecond, rightChild: thirtySecond};
    const eighth: DurationVertex = {value: 8, leftChild: sixteenth, rightChild: sixteenth};
    const quarter: DurationVertex = {value: 4, leftChild: eighth, rightChild: eighth};
    const half: DurationVertex = {value: 2, leftChild: quarter, rightChild: quarter};
    const whole: DurationVertex = {value: 1, leftChild: half, rightChild: half};

    expect(constructDurationTree()).toEqual(whole);
  });
});
