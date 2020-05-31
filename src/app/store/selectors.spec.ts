import {selectCurrentTrackNotes} from "./selectors";

describe('SelectCurrentTrackNotes', () => {
  it('when I have no rhythm elements, then I should get no stave notes', () => {
    expect(selectCurrentTrackNotes.projector({
      rhythmElements: []
    })).toEqual([]);
  });

  it('when the combined length of all rhythmElements is an integer, then I should get stave notes', () => {
    const projected = selectCurrentTrackNotes.projector({
      rhythmElements: [
        {
          duration: {
            numerator: 1,
            denominator: 4
          },
          tones: [
            {
              key: 'a',
              octave: 4
            }
          ]
        },
        {
          duration: {
            numerator: 1,
            denominator: 4
          },
          tones: [
            {
              key: 'a',
              octave: 4
            }
          ]
        },
        {
          duration: {
            numerator: 1,
            denominator: 4
          },
          tones: [
            {
              key: 'a',
              octave: 4
            }
          ]
        },
        {
          duration: {
            numerator: 1,
            denominator: 4
          },
          tones: [
            {
              key: 'a',
              octave: 4
            }
          ]
        },
      ]
    })
    expect(projected.length).toBe(4);
    expect(projected[0].duration).toBe('q');
    expect(projected[1].duration).toBe('q');
    expect(projected[2].duration).toBe('q');
    expect(projected[3].duration).toBe('q');
  });

  it('when the combined length of all rhythmElements is not an integer, then I should append rests', () => {

    const projected = selectCurrentTrackNotes.projector({
      rhythmElements: [
        {
          duration: {
            numerator: 1,
            denominator: 4
          },
          tones: [
            {
              key: 'a',
              octave: 4
            }
          ]
        },
      ]
    })
    expect(projected.length).toEqual(3);
    expect(projected[0].duration).toBe('q');
    expect(projected[0].noteType).toBe('n');
    expect(projected[1].duration).toBe('q');
    expect(projected[1].noteType).toBe('r');
    expect(projected[2].duration).toBe('h');
    expect(projected[2].noteType).toBe('r');
  });
});
