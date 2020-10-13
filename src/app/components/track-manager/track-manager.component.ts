import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Track } from '../../store/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTracks } from '../../store/selectors';

@Component({
  selector: 'app-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.css'],
})
export class TrackManagerComponent implements OnInit {
  tracks$: Observable<Track[]>;
  tracks: Track[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tracks$ = this.store.select(selectTracks);
    this.tracks$.subscribe((tracks) => (this.tracks = tracks));
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
  }
}
