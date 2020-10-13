import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Track } from '../../store/model';

@Component({
  selector: 'app-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.css'],
})
export class TrackManagerComponent implements OnInit {
  tracks: Track[] = [
    {
      name: 'test',
      measures: [],
      id: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
  }
}
