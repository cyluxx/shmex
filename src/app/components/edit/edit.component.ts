import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { parseShmexlText } from '../../store/actions';
import { Observable } from 'rxjs';
import { selectShmexl } from '../../store/selectors';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  shmexlText$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.shmexlText$ = this.store.select(selectShmexl);
  }

  onChange(shmexlText: string): void {
    this.store.dispatch(parseShmexlText({ shmexlText }));
  }
}
