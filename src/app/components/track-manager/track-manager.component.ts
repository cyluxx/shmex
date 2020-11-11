import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Group, Track } from '../../store/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGroups } from '../../store/selectors';
import { addNewGroup, addNewTrack, moveTrack, renameTrack, transferTrack } from '../../store/actions';

@Component({
  selector: 'app-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.css'],
})
export class TrackManagerComponent implements OnInit {
  groups$: Observable<Group[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(selectGroups);
  }

  onAddNewGroup() {
    this.store.dispatch(addNewGroup());
  }

  onAddNewTrack() {
    this.store.dispatch(addNewTrack());
  }

  onDrop(event: CdkDragDrop<Track[]>) {
    if (event.previousContainer === event.container) {
      this.store.dispatch(
        moveTrack({
          tracks: event.container.data,
          groupIndex: this.parseGroupIndex(event.container.id),
          previousIndex: event.previousIndex,
          currentIndex: event.currentIndex,
        })
      );
    } else {
      this.store.dispatch(
        transferTrack({
          previousGroupIndex: this.parseGroupIndex(event.previousContainer.id),
          currentGroupIndex: this.parseGroupIndex(event.container.id),
          previousIndex: event.previousIndex,
          currentIndex: event.currentIndex,
        })
      );
    }
  }

  onRenameTrack(id: string, event: any) {
    this.store.dispatch(renameTrack({ id, newName: event.target.value }));
  }

  parseGroupIndex(id: string): number {
    return parseInt(id.charAt(id.length - 1), 10);
  }
}
