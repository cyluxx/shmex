import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

CodeMirror.defineSimpleMode('shmexgl', {
  start: [{ regex: /^t[1-9][0-9]{1,2}$/, token: 'atom' }],
});
