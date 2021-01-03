import CodeMirror from 'codemirror';

const chord = {
  regex: /[A-G][#b]?(dim7?|aug|j9|13|7#5|7b9#5|7b5#9|7sus4|sus2|5|m?(6?9?|7(b5)?|j7|11|add9)?)?(\/[A-G][#b]?)?/,
  token: 'keyword',
  next: 'separator',
};

CodeMirror.defineSimpleMode('smlc', {
  start: [{ regex: /[1-9][0-9]*\/(1(?!6)|2|4|8|16|32)/, token: 'atom', next: 'chord' }, chord],
  chord: [chord],
  separator: [{ regex: /,/, token: 'operator', next: 'start' }],
});
