import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements AfterViewInit, OnInit {

  @ViewChild('container', {static: false}) container: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    const osmd = new OpenSheetMusicDisplay(this.container.nativeElement);
    await osmd.load(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-partwise PUBLIC
    "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
    "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>whole</type>
      </note>
    </measure>
  </part>
</score-partwise>
    `);
    osmd.render();
  }
}
