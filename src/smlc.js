import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

const chord = {
  regex: /[A-G][#b]?(((m|aug|dim)?M?|\*)(6|7|b?9|11|13)?|M?(6|7|9|11|13)?(sus2|sus4)|5|7b5)?(add(9|11|13))?(\/[A-G][#b]?)?/,
  token: 'keyword',
  next: 'separator',
};

CodeMirror.defineSimpleMode('smlc', {
  start: [{ regex: /[1-9][0-9]*\/(1(?!6)|2|4|8|16|32)/, token: 'atom', next: 'chord' }, chord],
  chord: [chord],
  separator: [{ regex: /,/, token: 'operator', next: 'start' }],
});
