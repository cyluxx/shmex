import { Component, OnInit } from '@angular/core';
import { selectCurrentTrackId, selectAllTracks } from '../../store/selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Track } from '../../store/model';
import { setCurrentTrack } from '../../store/actions';

@Component({
  selector: 'app-track-tabs',
  templateUrl: './track-chips.component.html',
  styleUrls: ['./track-chips.component.css'],
})
export class TrackChipsComponent implements OnInit {
  tracks$: Observable<Track[]>;
  currentTrackId$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tracks$ = this.store.select(selectAllTracks);
    this.currentTrackId$ = this.store.select(selectCurrentTrackId);
  }

  onSelectTrack(id: string) {
    this.store.dispatch(setCurrentTrack({ id }));
  }
}
