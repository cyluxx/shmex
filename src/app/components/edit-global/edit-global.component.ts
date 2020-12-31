import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { parseShmexglText } from '../../store/actions';

@Component({
  selector: 'app-edit-global',
  templateUrl: './edit-global.component.html',
  styleUrls: ['./edit-global.component.css'],
})
export class EditGlobalComponent implements OnInit {
  shmexglText$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onChange(shmexglText: string): void {
    this.store.dispatch(parseShmexglText({ editorText: shmexglText }));
  }

  onPrettify(): void {}
}
