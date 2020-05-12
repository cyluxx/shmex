import CodeMirror from "codemirror";
import 'codemirror/addon/mode/simple';

CodeMirror.defineSimpleMode("shmexl", {
  start: [{ regex: / ?/, token: "atom", next: "duration" }],
  duration: [
    { regex: /[1-9][0-9]*\/(1(?!6)|2|4|8|16|32)/, token: "atom", next: "tone" }
  ],
  tone: [
    { regex: /[a-g][#b]?[0-8]/, token: "keyword" },
    { regex: /,/, token: "operator", next: "duration" }
  ]
});
