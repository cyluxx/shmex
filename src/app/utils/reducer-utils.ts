import { Duration, Group, Measure, RhythmElement, RhythmElementToken, ShmexlText, Tone, Track } from '../store/model';
import { asDurationValue, decomposeAsc, decomposeDesc, sumFractions } from './duration-calculator';
import Fraction from 'fraction.js/fraction';
import { isRestMeasure } from './model-utils';

/**
 * appends extra rest measures to tracks until all tracks have the same measure length
 */
export function appendExtraRestMeasures(groups: Group[]): Group[] {
  let maxLength = 0;
  groups.forEach((group) =>
    group.tracks.forEach((track) => {
      if (track.measures.length > maxLength) {
        maxLength = track.measures.length;
      }
    })
  );
  return groups.map((group) => ({
    tracks: group.tracks.map((track) => {
      const extraMeasures = [...Array(maxLength - track.measures.length)].map<Measure>(() => ({
        rhythmElements: [
          {
            tones: [],
            duration: {
              value: 1,
              tieStart: false,
              tieStop: false,
            },
          },
        ],
      }));
      return { ...track, measures: track.measures.concat(extraMeasures) };
    }),
  }));
}

/**
 * Divides rhythm element tokens into measures. Ties two tokens, whenever there is a measure bar in between.
 */
export function divideRhythmElementTokensByMeasure(rhythmElementTokens: RhythmElementToken[]): RhythmElementToken[][] {
  if (rhythmElementTokens.length === 0) {
    return [];
  }
  const measuredRhythmElementTokens: RhythmElementToken[][] = [[]];
  let durationSum: Fraction = new Fraction(0);
  rhythmElementTokens.forEach((rhythmElementToken) => {
    const diff = new Fraction(1).sub(durationSum);
    if (diff < rhythmElementToken.durationToken) {
      // add rhythm element with difference and tie to current measure and begin next measure with leftover
      measuredRhythmElementTokens[measuredRhythmElementTokens.length - 1].push({
        ...rhythmElementToken,
        durationToken: diff,
        tieStart: true,
      });
      while (rhythmElementToken.durationToken.sub(diff) > new Fraction(1)) {
        measuredRhythmElementTokens.push([
          {
            ...rhythmElementToken,
            durationToken: new Fraction(1),
            tieStop: true,
            tieStart: true,
          },
        ]);
        rhythmElementToken.durationToken = rhythmElementToken.durationToken.sub(1);
      }
      measuredRhythmElementTokens.push([
        {
          ...rhythmElementToken,
          durationToken: rhythmElementToken.durationToken.sub(diff),
          tieStop: true,
        },
      ]);
      durationSum = rhythmElementToken.durationToken.sub(diff);
    } else if (diff > rhythmElementToken.durationToken) {
      // add to current measure
      measuredRhythmElementTokens[measuredRhythmElementTokens.length - 1].push(rhythmElementToken);
      durationSum = durationSum.add(rhythmElementToken.durationToken);
    } else {
      // diff === rhythmElementToken.durationToken
      // add to current measure and begin next measure
      measuredRhythmElementTokens[measuredRhythmElementTokens.length - 1].push(rhythmElementToken);
      measuredRhythmElementTokens.push([]);
      durationSum = new Fraction(0);
    }
  });
  if (measuredRhythmElementTokens[measuredRhythmElementTokens.length - 1].length === 0) {
    measuredRhythmElementTokens.pop();
  }
  return measuredRhythmElementTokens;
}

/**
 * Divides an overlong duration token by its numerator and returns tied rhythm elements.
 * Depending on the position, the returned array is sorted asc or desc.
 */
export function divideRhythmElementTokenByNumerator(
  rhythmElementToken: RhythmElementToken,
  position: Fraction
): RhythmElementToken[] {
  let durationTokens: Fraction[];
  if (position.valueOf() === 0) {
    durationTokens = decomposeDesc(rhythmElementToken.durationToken);
  } else {
    durationTokens = decomposeAsc(rhythmElementToken.durationToken);
  }
  return durationTokens.map((durationToken, index, tokens) => {
    if (tokens.length === 1) {
      return {
        ...rhythmElementToken,
        durationToken,
      };
    }
    if (index === 0) {
      return {
        ...rhythmElementToken,
        durationToken,
        tieStart: true,
      };
    }
    if (index === tokens.length - 1) {
      return {
        ...rhythmElementToken,
        durationToken,
        tieStop: true,
      };
    }
    return {
      ...rhythmElementToken,
      durationToken,
      tieStart: true,
      tieStop: true,
    };
  });
}

export function getCurrentTrack(currentTrackId: string, groups: Group[]): Track {
  for (const group of groups) {
    for (const track of group.tracks) {
      if (track.id === currentTrackId) {
        return track;
      }
    }
  }
}

/**
 * removes all appending extra rest measures from all tracks
 */
export function removeExtraRestMeasures(groups: Group[]): Group[] {
  return groups.map((group) => ({
    tracks: group.tracks.map((track) => {
      let lastNonRestMeasureIndex = 0;
      track.measures.forEach((measure, index) => {
        if (!isRestMeasure(measure)) {
          lastNonRestMeasureIndex = index;
        }
      });
      return {
        ...track,
        measures: track.measures.slice(0, lastNonRestMeasureIndex + 1),
      };
    }),
  }));
}

/**
 * Updates the current shmexlText with the editor text. The other shmexl texts remain unmodified.
 */
export function updateCurrentShmexlText(
  currentTrackId: string,
  editorText: string,
  shmexlTexts: ShmexlText[]
): ShmexlText[] {
  return shmexlTexts.map((shmexlText) =>
    shmexlText.id === currentTrackId ? { id: shmexlText.id, value: editorText } : shmexlText
  );
}

/**
 * Updates the current track with the current measures. The other measures remain unmodified.
 */
export function updateCurrentTrack(currentTrackId: string, measures: Measure[], groups: Group[]): Group[] {
  return groups.map((group) => ({
    tracks: group.tracks.map((track) =>
      track.id === currentTrackId
        ? {
            id: track.id,
            name: track.name,
            measures,
          }
        : track
    ),
  }));
}

export function toDurationToken(durationTokenString: string): Fraction {
  const splitDurationToken = durationTokenString.split('/');
  return new Fraction(+splitDurationToken[0], +splitDurationToken[1]);
}

/**
 * Converts a durationToken into a duration.
 */
export function toDuration(
  durationToken: Fraction,
  tieStart: boolean | undefined,
  tieStop: boolean | undefined
): Duration {
  return {
    value: asDurationValue(durationToken.d),
    tieStart: tieStart || false,
    tieStop: tieStop || false,
  };
}

export function toMeasures(measuredRhythmElementTokens: RhythmElementToken[][]): Measure[] {
  return measuredRhythmElementTokens.map((rhythmElementTokens) => ({
    rhythmElements: toRhythmElements(
      rhythmElementTokens.flatMap((rhythmElementToken, index, rets) =>
        divideRhythmElementTokenByNumerator(
          rhythmElementToken,
          sumFractions(rets.slice(0, index).map((value) => value.durationToken))
        )
      )
    ),
  }));
}

export function toRhythmElements(rhythmElementTokens: RhythmElementToken[]): RhythmElement[] {
  return rhythmElementTokens.map((rhythmElementToken) => ({
    tones: toTones(rhythmElementToken.toneTokens),
    duration: toDuration(rhythmElementToken.durationToken, rhythmElementToken.tieStart, rhythmElementToken.tieStop),
  }));
}

/**
 * Converts tone tokens to Tone[], removing duplicates and sorting from low to high
 */
export function toTones(toneTokens: string[]): Tone[] {
  const tones: Tone[] = [];
  toneTokens.forEach((token) => {
    const splitToneToken = token.split('');
    let candidateTone: Tone;
    if (splitToneToken.length === 2) {
      candidateTone = {
        key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
        octave: +splitToneToken[1] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      };
    } else {
      candidateTone = {
        key: splitToneToken[0] as 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g',
        accidental: splitToneToken[1] as '#' | 'b',
        octave: +splitToneToken[2] as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      };
    }
    if (
      !tones.find(
        (thisTone) =>
          thisTone.key === candidateTone.key &&
          thisTone.octave === candidateTone.octave &&
          thisTone.accidental === candidateTone.accidental
      )
    ) {
      tones.push(candidateTone);
    }
  });
  return sortTones(tones);
}

function sortTones(tones: Tone[]) {
  return tones.sort((a, b) => {
    if (a.octave !== b.octave) {
      return a.octave - b.octave;
    }

    const keyOrder = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    const keyIndexA = keyOrder.indexOf(a.key);
    const keyIndexB = keyOrder.indexOf(b.key);
    if (keyIndexA !== keyIndexB) {
      return keyIndexA - keyIndexB;
    }

    const accidentalOrder = ['b', undefined, '#'];
    return accidentalOrder.indexOf(a.accidental) - accidentalOrder.indexOf(b.accidental);
  });
}
