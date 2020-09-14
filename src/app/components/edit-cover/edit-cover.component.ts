import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {editCreator1, editCreator2, editSubtitle, editTitle} from '../../store/actions';
import {Observable} from 'rxjs';
import {selectCreator1, selectCreator2, selectSubtitle, selectTitle} from '../../store/selectors';

@Component({
  selector: 'app-edit-cover',
  templateUrl: './edit-cover.component.html',
  styleUrls: ['./edit-cover.component.css']
})
export class EditCoverComponent implements OnInit {

  title$: Observable<string>;
  subtitle$: Observable<string>;
  creator1$: Observable<string>;
  creator2$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.title$ = this.store.select(selectTitle);
    this.subtitle$ = this.store.select(selectSubtitle);
    this.creator1$ = this.store.select(selectCreator1);
    this.creator2$ = this.store.select(selectCreator2);
  }

  onTitleChange(title: string) {
    this.store.dispatch(editTitle({title}));
  }

  onSubtitleChange(subtitle: string) {
    this.store.dispatch(editSubtitle({subtitle}));
  }

  onCreator1Change(creator1: string) {
    this.store.dispatch(editCreator1({creator1}));
  }

  onCreator2Change(creator2: string) {
    this.store.dispatch(editCreator2({creator2}));
  }
}
