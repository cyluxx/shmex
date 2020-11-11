export const moveItem = <T>(array: T[], previousIndex: number, currentIndex: number): T[] => {
  if (currentIndex === previousIndex || currentIndex >= array.length) return array;

  const toMove = array[previousIndex];
  const movedForward = previousIndex < currentIndex;

  return array.reduce((accumulator, next, index) => {
    if (index === previousIndex) return accumulator;
    if (index === currentIndex) return accumulator.concat(movedForward ? [next, toMove] : [toMove, next]);

    return accumulator.concat(next);
  }, []);
};
