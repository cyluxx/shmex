import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {editCover, editSheets} from '../../store/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private store: Store) {
  }

  onEditCover() {
    this.store.dispatch(editCover());
  }

  onEditSheets() {
    this.store.dispatch(editSheets());
  }
}
