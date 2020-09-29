import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editCover, editSheets } from '../../store/actions';
import { ExportService } from '../../service/export.service';
import { selectAppState } from '../../store/selectors';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../store/model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  onExportXml = new Subject();
  appState$: Observable<AppState>;

  constructor(private exportService: ExportService, private store: Store) {}

  ngOnInit() {
    this.appState$ = this.store.select(selectAppState);

    this.onExportXml.pipe(switchMap(() => this.appState$)).subscribe((appState) => {
      this.exportService.exportMusicXml(appState);
    });
  }

  onEditCover() {
    this.store.dispatch(editCover());
  }

  onEditSheets() {
    this.store.dispatch(editSheets());
  }

  ngOnDestroy() {
    this.onExportXml.unsubscribe();
  }
}
