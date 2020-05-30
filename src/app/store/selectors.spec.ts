import {selectCurrentTrackNotes} from "./selectors";

describe('SelectCurrentTrackNotes', () => {
  it('when I have no rhythm elements, then I should get no stave notes', () => {
    expect(selectCurrentTrackNotes.projector({
      rhythmElements: []
    })).toEqual([]);
  });
});
