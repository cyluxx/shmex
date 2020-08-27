import {fillMeasures, shorten, toTones} from './reducer-utils';
import {RhythmElement} from '../store/model';

describe('fillMeasures', () => {
  it('returns empty measures, when no rhythm elements', () => {
    expect(fillMeasures([])).toEqual([]);
  });

  it('returns one measure, when rhythmElements contain one whole rest', () => {
    const rhythmElements: RhythmElement[] = [{
      duration: {
        value: 1
      },
      tones: []
    }];
    expect(fillMeasures(rhythmElements)).toEqual([{rhythmElements}]);
  });

  it('returns one measure, when rhythmElements contain two 32nd rests', () => {
    const rhythmElements: RhythmElement[] = [
      {
        duration: {
          value: 32
        },
        tones: []
      },
      {
        duration: {
          value: 32
        },
        tones: []
      }
    ];
    expect(fillMeasures(rhythmElements)).toEqual([{rhythmElements}]);
  });

  it('returns two measures, when rhythmElements contain one whole rest and one 32nd rest', () => {
    const rhythmElements: RhythmElement[] = [
      {
        duration: {
          value: 1
        },
        tones: []
      },
      {
        duration: {
          value: 32
        },
        tones: []
      }
    ];
    expect(fillMeasures(rhythmElements)).toEqual([
      {
        rhythmElements: [{
          duration: {
            value: 1
          },
          tones: []
        }]
      },
      {
        rhythmElements: [{
          duration: {
            value: 32
          },
          tones: []
        }]
      }
    ]);
  });
});

describe('shorten', () => {
  it('shortens 4/4 to 1/1', () => {
    expect(shorten('4/4')).toEqual('1/1');
  });

  it('shortens 2/4 to 1/2', () => {
    expect(shorten('2/4')).toEqual('1/2');
  });

  it('shortens 3/4 to 3/4', () => {
    expect(shorten('3/4')).toEqual('3/4');
  });
});

describe('toTones', () => {
  it('converts no tones to empty array', () => {
    expect(toTones([])).toEqual([]);
  });

  it('converts tone without accidental', () => {
    expect(toTones(['a4'])).toEqual([{
      key: 'a',
      octave: 4
    }]);
  });

  it('converts tone with accidental', () => {
    expect(toTones(['c#4'])).toEqual([{
      key: 'c',
      accidental: '#',
      octave: 4
    }]);
    expect(toTones(['bb4'])).toEqual([{
      key: 'b',
      accidental: 'b',
      octave: 4
    }]);
  });

  it('converts multiple tones', () => {
    expect(toTones(['a4', 'c#5', 'e5'])).toEqual([
      {
        key: 'a',
        octave: 4
      },
      {
        key: 'c',
        accidental: '#',
        octave: 5
      },
      {
        key: 'e',
        octave: 5
      }
    ]);
  });
});
