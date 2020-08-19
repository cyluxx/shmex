import {fillMeasures} from './reducer-utils';
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

  it('returns one measure, when rhythmElements contain one 32nd rest', () => {
    const rhythmElements: RhythmElement[] = [{
      duration: {
        value: 32
      },
      tones: []
    }];
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
