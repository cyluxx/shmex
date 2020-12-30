import { isRest, isRestMeasure } from './model-utils';
import { RhythmElement, Tone } from '../store/model';

describe('isRest', () => {
  it('returns true, when tones empty', () => {
    expect(isRest({ duration: { value: 4, tieStart: false, tieStop: false }, tones: [] })).toBe(true);
  });

  it('returns false, when tones not empty', () => {
    expect(isRest({ duration: { value: 4, tieStart: false, tieStop: false }, tones: [{ key: 'a', octave: 4 }] })).toBe(
      false
    );
  });
});

describe('isRestMeasure', () => {
  it('returns false, when rhythmElements []', () => {
    expect(isRestMeasure({ rhythmElements: [] })).toBe(false);
  });

  it('returns false, when rhythmElements contain more than one rhythmElement', () => {
    const someRhythmElement: RhythmElement = {
      duration: { value: 2, tieStop: false, tieStart: false },
      tones: [],
    };
    expect(
      isRestMeasure({
        rhythmElements: [someRhythmElement, someRhythmElement],
      })
    ).toBe(false);
  });

  it('returns false, when rhythmElements contain one whole tone', () => {
    expect(
      isRestMeasure({
        rhythmElements: [
          {
            duration: { value: 1, tieStart: false, tieStop: false },
            tones: [
              {
                octave: 4,
                key: 'a',
              },
            ],
          },
        ],
      })
    ).toBe(false);
  });

  it('returns true, when rhythmElements contain one whole rest', () => {
    expect(
      isRestMeasure({ rhythmElements: [{ duration: { value: 1, tieStart: false, tieStop: false }, tones: [] }] })
    ).toBe(true);
  });
});
