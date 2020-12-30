import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { parseShmexlText, prettifyShmexlText } from '../../store/actions';
import { Observable } from 'rxjs';
import { selectCurrentEditorText } from '../../store/selectors';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  shmexlText$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.shmexlText$ = this.store.select(selectCurrentEditorText);
  }

  onChange(shmexlText: string): void {
    this.store.dispatch(parseShmexlText({ editorText: shmexlText }));
  }

  onPrettify(): void {
    this.store.dispatch(prettifyShmexlText());
  }
}
