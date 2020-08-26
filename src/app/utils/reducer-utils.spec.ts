import {fillMeasures, shorten} from './reducer-utils';
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
