import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {editTitle} from '../../store/actions';
import {Observable} from 'rxjs';
import {selectTitle} from '../../store/selectors';

@Component({
  selector: 'app-edit-cover',
  templateUrl: './edit-cover.component.html',
  styleUrls: ['./edit-cover.component.css']
})
export class EditCoverComponent implements OnInit {

  title$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.title$ = this.store.select(selectTitle);
  }

  onTitleChange(title: string) {
    this.store.dispatch(editTitle({title}));
  }
}
