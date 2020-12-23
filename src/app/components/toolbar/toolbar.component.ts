import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editCover, editSheets, goToTrackManager } from '../../store/actions';
import { ExportService } from '../../service/export.service';
import { selectScore } from '../../store/selectors';
import { Observable, Subject } from 'rxjs';
import { Score } from '../../store/model';
import { withLatestFrom } from 'rxjs/operators';

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

  onEditCover() {
    this.store.dispatch(editCover());
  }

  onEditSheets() {
    this.store.dispatch(editSheets());
  }

  onTrackManager() {
    this.store.dispatch(goToTrackManager());
  }

  ngOnDestroy() {
    this.onExportXml.unsubscribe();
  }
}
