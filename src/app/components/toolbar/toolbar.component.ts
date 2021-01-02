import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExportService } from '../../service/export.service';
import { selectScore } from '../../store/selectors';
import { Observable, Subject } from 'rxjs';
import { Score } from '../../store/model';
import { withLatestFrom } from 'rxjs/operators';
import { setToolbarState } from '../../store/actions';
import { ToolbarState } from '../../store/enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  onExportXml = new Subject();
  score$: Observable<Score>;

  constructor(private exportService: ExportService, private store: Store) {}

  ngOnInit() {
    this.score$ = this.store.select(selectScore);

    this.onExportXml.pipe(withLatestFrom(this.score$)).subscribe(([_, score]) => {
      this.exportService.exportMusicXml(score);
    });
  }

  onEditChords() {
    this.store.dispatch(setToolbarState({ toolbarState: ToolbarState.EDIT_CHORDS }));
  }

  onEditCover() {
    this.store.dispatch(setToolbarState({ toolbarState: ToolbarState.EDIT_COVER }));
  }

  onEditGlobal() {
    this.store.dispatch(setToolbarState({ toolbarState: ToolbarState.EDIT_GLOBAL }));
  }

  onEditSheets() {
    this.store.dispatch(setToolbarState({ toolbarState: ToolbarState.EDIT_SHEETS }));
  }

  onTrackManager() {
    this.store.dispatch(setToolbarState({ toolbarState: ToolbarState.TRACK_MANAGER }));
  }

  ngOnDestroy() {
    this.onExportXml.unsubscribe();
  }
}
