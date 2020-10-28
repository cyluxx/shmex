import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Track } from '../../store/model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectTracks } from '../../store/selectors';
import { addNewTrack, renameTrack, reorderTracks } from '../../store/actions';

@Component({
  selector: 'app-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.css'],
})
export class TrackManagerComponent implements OnInit, OnDestroy {
  tracks$: Observable<Track[]>;
  tracks: Track[];
  tracksSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tracks$ = this.store.select(selectTracks);
    this.tracksSubscription = this.tracks$.subscribe((tracks) => (this.tracks = tracks));
  }

  onAddNewTrack() {
    this.store.dispatch(addNewTrack());
  }

  onDrop(event: CdkDragDrop<string[]>) {
    const tracks = [...this.tracks];
    moveItemInArray(tracks, event.previousIndex, event.currentIndex);
    this.store.dispatch(reorderTracks({ tracks }));
  }

  onRenameTrack(id: string, event: any) {
    this.store.dispatch(renameTrack({ id, newName: event.target.value }));
  }

  ngOnDestroy() {
    this.tracksSubscription.unsubscribe();
  }
}
