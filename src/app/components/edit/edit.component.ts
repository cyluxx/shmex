import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {parseShmexlText} from "../../store/actions";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  codeMirrorContent = '';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.store.dispatch(parseShmexlText({shmexlText: this.codeMirrorContent}));
  }
}
