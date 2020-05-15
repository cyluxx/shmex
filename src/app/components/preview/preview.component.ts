import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as vexflow from 'vexflow'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Track} from "../../store/state";
import {selectCurrentTrack} from "../../store/selectors";

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

  private currentTrack$: Observable<Track>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.currentTrack$ = this.store.select(selectCurrentTrack);
  }

  ngAfterViewInit() {
    this.renderer = new this.VF.Renderer(this.vexflowCanvas.nativeElement, this.VF.Renderer.Backends.SVG);
    this.context = this.renderer.getContext();

    // Configure the rendering context.
    this.renderer.resize(1000, 1000);
    this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new this.VF.Stave(10, 40, 400);

    // Add a clef and time signature.

    // Connect it to the rendering context and draw!
    stave.setContext(this.context).draw();

    this.currentTrack$.subscribe(() => {
      stave.addClef("treble").addTimeSignature("4/4");
      stave.setContext(this.context).draw();
    });
  }
}
