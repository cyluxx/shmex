import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

const tempo = { regex: /t[1-9][0-9]{1,2}/, token: 'variable' };
const timeSignature = { regex: /4\/4|6\/8/, token: 'atom' };
const rehearsalMark = { regex: /(@(?!")([a-zA-Z0-9]*)|@"[a-zA-Z0-9 ]*")/, token: 'comment' };
const repetition = {
  common: {
    regex: /(%|fine|d\.s\. al fine|d\.s\. al coda|d\.c\. al fine|d\.c\. al coda|O)/,
    token: 'keyword',
  },
  repeatSignBackward: {
    regex: /:\|/,
    token: 'keyword',
  },
  repeatSignForward: {
    regex: /\|:/,
    token: 'keyword',
  },
  firstEnding: {
    regex: /\[/,
    token: 'keyword',
  },
  secondEnding: {
    regex: /]/,
    token: 'keyword',
  },
};

CodeMirror.defineSimpleMode('shmexgl', {
  start: [
    tempo,
    timeSignature,
    rehearsalMark,
    repetition.common,
    repetition.firstEnding,
    repetition.secondEnding,
    repetition.repeatSignBackward,
    repetition.repeatSignForward,
  ],
});
