import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as vexflow from 'vexflow'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements AfterViewInit {

  @ViewChild('vexflowCanvas', {static: false}) vexflowCanvas: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    var VF = vexflow.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    var renderer = new VF.Renderer(this.vexflowCanvas.nativeElement, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  }
}
