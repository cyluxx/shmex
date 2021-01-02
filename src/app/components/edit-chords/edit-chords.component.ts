import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-chords',
  templateUrl: './edit-chords.component.html',
  styleUrls: ['./edit-chords.component.css'],
})
export class EditChordsComponent implements OnInit {
  smlcText$: Observable<string>;

  constructor() {}

  ngOnInit(): void {}

  onChange(smlcText: string) {}
}
