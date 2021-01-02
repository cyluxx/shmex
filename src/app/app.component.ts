import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentToolbarState } from './store/selectors';
import { ToolbarState } from './store/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  EDIT_CHORDS = ToolbarState.EDIT_CHORDS;
  EDIT_COVER = ToolbarState.EDIT_COVER;
  EDIT_GLOBAL = ToolbarState.EDIT_GLOBAL;
  EDIT_SHEETS = ToolbarState.EDIT_SHEETS;
  TRACK_MANAGER = ToolbarState.TRACK_MANAGER;

  toolbarState$: Observable<ToolbarState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.toolbarState$ = this.store.select(selectCurrentToolbarState);
  }
}
