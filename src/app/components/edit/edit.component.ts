import {Component, OnInit} from '@angular/core';
import 'codemirror/addon/runmode/runmode'
import * as CodeMirror from "codemirror";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  codeMirrorContent = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(): void {
    CodeMirror.runMode(this.codeMirrorContent, 'shmexl', (token, style) => {
      console.log(`Token: ${token}; Style: ${style}`);
    });
  }
}
