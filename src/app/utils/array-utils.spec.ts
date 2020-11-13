import { moveItem } from './array-utils';

describe('moveItem', () => {
  it('does not move item, when current index = previous index', () => {
    expect(moveItem([1, 2, 3, 4, 5], 2, 2)).toEqual([1, 2, 3, 4, 5]);
  });

  it('does not move item, when current index >= array length', () => {
    expect(moveItem([1, 2, 3, 4, 5], 2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('moves item forward', () => {
    expect(moveItem([1, 2, 3, 4, 5], 1, 3)).toEqual([1, 3, 4, 2, 5]);
  });

  it('moves item backwards', () => {
    expect(moveItem([1, 2, 3, 4, 5], 3, 1)).toEqual([1, 4, 2, 3, 5]);
  });
});
