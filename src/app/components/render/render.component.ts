import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OpenSheetMusicDisplay} from 'opensheetmusicdisplay';
import {Store} from '@ngrx/store';
import {selectMusicXml} from '../../store/selectors';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import format from 'xml-formatter';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements AfterViewInit, OnInit {

  @ViewChild('container', {static: false}) container: ElementRef;

  musicXml$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.musicXml$ = this.store.select(selectMusicXml);
  }

  ngAfterViewInit(): void {
    const osmd = new OpenSheetMusicDisplay(this.container.nativeElement);
    this.musicXml$.pipe(
      switchMap(next => {
        console.log(format(next));
        return osmd.load(next);
      }),
    ).subscribe(() => {
      osmd.render();
    });
  }
}
