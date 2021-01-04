/**
 * This file is used to test important sml regex. These tests have to be kept up to date manually by copying them from this file into
 * the corresponding js file.
 */
describe('smlc', () => {
  it('validates chords correctly with chord regex', () => {
    const regex = /^[A-G][#b]?(((m|aug|dim)?M?|\*)(6|7|b?9|11|13)?|M?(6|7|9|11|13)?(sus2|sus4)|5|7b5)?(add(9|11|13))?(\/[A-G][#b]?)?$/;

    expect('Ab').toMatch(regex);
    expect('Abm').toMatch(regex);
    expect('Abaug').toMatch(regex);
    expect('Abdim').toMatch(regex);
    expect('Absus4').toMatch(regex);
    expect('Absus2').toMatch(regex);
    expect('Ab5').toMatch(regex);
    expect('Ab6').toMatch(regex);
    expect('Ab6add9').toMatch(regex);
    expect('Ab7').toMatch(regex);
    expect('AbM7').toMatch(regex);
    expect('AbmM7').toMatch(regex);
    expect('Abm7').toMatch(regex);
    expect('AbaugM7').toMatch(regex);
    expect('Abaug7').toMatch(regex);
    expect('Ab*').toMatch(regex);
    expect('Abdim7').toMatch(regex);
    expect('Ab7b5').toMatch(regex);
    expect('AbM9').toMatch(regex);
    expect('Ab9').toMatch(regex);
    expect('AbmM9').toMatch(regex);
    expect('Abm9').toMatch(regex);
    expect('AbaugM9').toMatch(regex);
    expect('Abaug9').toMatch(regex);
    expect('Ab*9').toMatch(regex);
    expect('Ab*b9').toMatch(regex);
    expect('Abdim9').toMatch(regex);
    expect('Abdimb9').toMatch(regex);
    expect('Ab11').toMatch(regex);
    expect('AbM11').toMatch(regex);
    expect('AbmM11').toMatch(regex);
    expect('Abm11').toMatch(regex);
    expect('AbaugM11').toMatch(regex);
    expect('Abaug11').toMatch(regex);
    expect('Ab*11').toMatch(regex);
    expect('Abdim11').toMatch(regex);
    expect('AbM13').toMatch(regex);
    expect('Ab13').toMatch(regex);
    expect('AbmM13').toMatch(regex);
    expect('Abm13').toMatch(regex);
    expect('AbaugM13').toMatch(regex);
    expect('Abaug13').toMatch(regex);
    expect('Ab*13').toMatch(regex);
    expect('Abadd9').toMatch(regex);
    expect('Abadd11').toMatch(regex);
    expect('Abadd13').toMatch(regex);
    expect('Ab7add13').toMatch(regex);
    expect('Ab9sus4').toMatch(regex);
    expect('D/F#').toMatch(regex);
    expect('AmM7/G').toMatch(regex);

    expect('').not.toMatch(regex);
    expect('Abmsus4').not.toMatch(regex);
  });
});
