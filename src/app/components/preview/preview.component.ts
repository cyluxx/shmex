import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as vexflow from 'vexflow';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectCurrentTrackNotes} from "../../store/selectors";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements AfterViewInit, OnInit {

  @ViewChild('vexflowCanvas', {static: false}) vexflowCanvas: ElementRef;

  private VF = vexflow.Flow;
  private renderer;
  private context;
  private formatter;

  private currentTrackNotes$: Observable<any[]>

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.currentTrackNotes$ = this.store.select(selectCurrentTrackNotes);
  }

  ngAfterViewInit() {
    this.renderer = new this.VF.Renderer(this.vexflowCanvas.nativeElement, this.VF.Renderer.Backends.SVG);
    this.context = this.renderer.getContext();
    this.formatter = new this.VF.Formatter();

    // Configure the rendering context.
    this.renderer.resize(1000, 1000);
    this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#aaaaaa");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new this.VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(this.context).draw();

    this.currentTrackNotes$.subscribe(notes => {
      this.context.clear();
      stave.setContext(this.context).draw();

      if (notes.length > 0) {
        const beams = this.VF.Beam.generateBeams(notes);
        this.VF.Formatter.FormatAndDraw(this.context, stave, notes);
        beams.forEach(beam => {
          beam.setContext(this.context).draw()
        });
      }
    });
  }
}
