import {RhythmElement} from "./state";
import {toVexRest, toVexTones} from "./utils";

describe('toVexRest', () => {
  it('should return a rest with correct duration, when rhythm element has no tones', () => {
    const whole: RhythmElement = {duration: {numerator: 1, denominator: 1}, tones: []};
    const half: RhythmElement = {duration: {numerator: 1, denominator: 2}, tones: []};
    const quarter: RhythmElement = {duration: {numerator: 1, denominator: 4}, tones: []};
    const eighth: RhythmElement = {duration: {numerator: 1, denominator: 8}, tones: []};
    const sixteenth: RhythmElement = {duration: {numerator: 1, denominator: 16}, tones: []};
    const thirtySecond: RhythmElement = {duration: {numerator: 1, denominator: 32}, tones: []};

    expect(toVexRest(whole).duration).toBe('w');
    expect(toVexRest(whole).noteType).toBe('r');
    expect(toVexRest(whole).keys[0]).toBe('d/4');

    expect(toVexRest(half).duration).toBe('h');
    expect(toVexRest(half).noteType).toBe('r');
    expect(toVexRest(half).keys[0]).toBe('b/4');

    expect(toVexRest(quarter).duration).toBe('q');
    expect(toVexRest(quarter).noteType).toBe('r');
    expect(toVexRest(quarter).keys[0]).toBe('b/4');

    expect(toVexRest(eighth).duration).toBe('8');
    expect(toVexRest(eighth).noteType).toBe('r');
    expect(toVexRest(eighth).keys[0]).toBe('b/4');

    expect(toVexRest(sixteenth).duration).toBe('16');
    expect(toVexRest(sixteenth).noteType).toBe('r');
    expect(toVexRest(sixteenth).keys[0]).toBe('b/4');

    expect(toVexRest(thirtySecond).duration).toBe('32');
    expect(toVexRest(thirtySecond).noteType).toBe('r');
    expect(toVexRest(thirtySecond).keys[0]).toBe('b/4');
  });
});

describe('toVexTones', () => {
  it('should return correct accidental, when rhythm element has tone with accidental', () => {
    const sharp: RhythmElement = {
      duration: {numerator: 1, denominator: 1}, tones: [{
        key: 'a',
        accidental: '#',
        octave: 4
      }]
    };
    const flat: RhythmElement = {
      duration: {numerator: 1, denominator: 1}, tones: [{
        key: 'a',
        accidental: 'b',
        octave: 4
      }]
    };

    expect(toVexTones(sharp).modifiers[0].type).toBe('#');
    expect(toVexTones(flat).modifiers[0].type).toBe('b');
  });
});

// TODO: test note sorting, test notes w/o accidentals, test duration
