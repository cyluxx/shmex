import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {parseShmexlText} from '../../store/actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  codeMirrorContent = '1/4 c4, 1/4 d4, 1/4 e4, 1/4 f4,\n1/4 g4, 1/4, 1/4 g4, 1/4,\n1/4 a4, 1/4 a4, 1/4 a4, 1/4 a4,\n1/2 g4,';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(parseShmexlText({shmexlText: this.codeMirrorContent}));
  }

  onChange(): void {
    this.store.dispatch(parseShmexlText({shmexlText: this.codeMirrorContent}));
  }
}
