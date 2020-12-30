import { buildMeasures, buildShmexlText, buildTones } from './shmexl-text-builder';
import { RhythmElement, Tone } from '../store/model';

const someRhythmElement: RhythmElement = {
  duration: {
    value: 1,
    tieStart: false,
    tieStop: false,
  },
  tones: [],
};

const someTone: Tone = {
  key: 'a',
  octave: 4,
};

describe('build', () => {
  it('returns empty string, when empty track', () => {
    expect(buildShmexlText({ id: 'foo', name: 'foo', measures: [] })).toEqual('');
  });

  it('builds correct shmexl string', () => {
    expect(
      buildShmexlText({
        id: 'foo',
        name: 'foo',
        measures: [
          {
            rhythmElements: [
              { ...someRhythmElement, duration: { ...someRhythmElement.duration, value: 2 } },
              {
                ...someRhythmElement,
                duration: { ...someRhythmElement.duration, value: 2, tieStart: true },
                tones: [someTone],
              },
            ],
          },
          {
            rhythmElements: [
              {
                ...someRhythmElement,
                duration: { ...someRhythmElement.duration, value: 2, tieStop: true },
                tones: [someTone],
              },
              { ...someRhythmElement, duration: { ...someRhythmElement.duration, value: 4 } },
              { ...someRhythmElement, duration: { ...someRhythmElement.duration, value: 4 }, tones: [someTone] },
            ],
          },
        ],
      })
    ).toEqual('1/2, 1/1 a4, \n1/4, 1/4 a4, ');
  });
});

describe('buildMeasures', () => {
  it('returns empty string, when track has no measures', () => {
    expect(buildMeasures([])).toEqual('');
  });

  it('returns 2/1, \n, when 1/1_|_1/1', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: true,
                tieStop: false,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: false,
                tieStop: true,
              },
            },
          ],
        },
      ])
    ).toEqual('2/1, \n');
  });

  it('returns 3/1, \n\n, when 1/1_|_1/1_|_1/1', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: true,
                tieStop: false,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: true,
                tieStop: true,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 1,
                tieStart: false,
                tieStop: true,
              },
            },
          ],
        },
      ])
    ).toEqual('3/1, \n\n');
  });

  it('returns 1/2, 1/1, \n1/2, when 1/2 1/2_|_1/2 1/2', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: false,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: true,
                tieStop: false,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: false,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: false,
                tieStop: false,
              },
            },
          ],
        },
      ])
    ).toEqual('1/2, 1/1, \n1/2, ');
  });

  it('returns 1/1,\n 1/4, 1/2, 3/16, 1/16, when 1/2_1/4_1/4 | 1/4 1/4_1/4 1/8_1/16 1/16', () => {
    expect(
      buildMeasures([
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 2,
                tieStart: true,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: true,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: false,
                tieStop: true,
              },
            },
          ],
        },
        {
          rhythmElements: [
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: false,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: true,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 4,
                tieStart: false,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 8,
                tieStart: true,
                tieStop: false,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 16,
                tieStart: false,
                tieStop: true,
              },
            },
            {
              ...someRhythmElement,
              duration: {
                value: 16,
                tieStart: false,
                tieStop: false,
              },
            },
          ],
        },
      ])
    ).toEqual('1/1, \n1/4, 1/2, 3/16, 1/16, ');
  });
});

describe('buildTones', () => {
  it('builds empty string, when tones []', () => {
    expect(buildTones([])).toEqual('');
  });

  it('builds tone without accidental and with leading space', () => {
    expect(buildTones([{ key: 'a', octave: 4 }])).toEqual(' a4');
  });

  it('builds tone with accidental and with leading space', () => {
    expect(buildTones([{ key: 'a', accidental: 'b', octave: 4 }])).toEqual(' ab4');
  });

  it('builds multiple tones, separated by space and with leading space', () => {
    expect(
      buildTones([
        { key: 'a', accidental: 'b', octave: 4 },
        { key: 'e', octave: 5 },
      ])
    ).toEqual(' ab4 e5');
  });
});
