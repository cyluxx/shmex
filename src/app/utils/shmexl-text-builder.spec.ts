import { groupTiedElements } from './shmexl-text-builder';
import { RhythmElementToken } from '../store/model';
import Fraction from 'fraction.js';

const someRhythmElementToken: RhythmElementToken = {
  toneTokens: ['a4'],
  durationToken: new Fraction(1, 4),
};

describe('groupTiedElements', () => {
  it('returns empty array, when empty array', () => {
    expect(groupTiedElements([])).toEqual([]);
  });

  it('does not group elements, when no tied elements', () => {
    expect(groupTiedElements([{ ...someRhythmElementToken }, { ...someRhythmElementToken }])).toEqual([
      [{ ...someRhythmElementToken }],
      [{ ...someRhythmElementToken }],
    ]);
  });

  it('does group two elements, when two tied elements', () => {
    expect(
      groupTiedElements([
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ])
    ).toEqual([
      [
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ],
    ]);
  });

  it('does group tree elements, when tree tied elements', () => {
    expect(
      groupTiedElements([
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ])
    ).toEqual([
      [
        { ...someRhythmElementToken, tieStart: true },
        { ...someRhythmElementToken, tieStop: true, tieStart: true },
        { ...someRhythmElementToken, tieStop: true },
      ],
    ]);
  });
});
