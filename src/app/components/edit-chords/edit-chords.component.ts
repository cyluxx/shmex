import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { parseSmlc } from '../../store/actions';

@Component({
  selector: 'app-edit-chords',
  templateUrl: './edit-chords.component.html',
  styleUrls: ['./edit-chords.component.css'],
})
export class EditChordsComponent implements OnInit {
  smlcText$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onChange(smlc: string) {
    this.store.dispatch(parseSmlc({ smlc }));
  }
}
