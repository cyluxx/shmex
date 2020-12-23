import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { Store } from '@ngrx/store';
import { selectAudioPlayerState, selectMusicXml } from '../../store/selectors';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import format from 'xml-formatter';
import AudioPlayer from 'osmd-audio-player';
import { AudioPlayerState } from '../../store/enum';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css'],
})
export class RenderComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('container', { static: false }) container: ElementRef;

  musicXml$: Observable<string>;
  musicXmlSubscription: Subscription;

  audioPlayerState$: Observable<AudioPlayerState>;
  audioPlayerSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.musicXml$ = this.store.select(selectMusicXml);
    this.audioPlayerState$ = this.store.select(selectAudioPlayerState);
  }

  ngAfterViewInit(): void {
    const osmd = new OpenSheetMusicDisplay(this.container.nativeElement);
    const audioPlayer = new AudioPlayer();

    this.musicXmlSubscription = this.musicXml$
      .pipe(
        switchMap((next) => {
          // console.log(format(next));
          return osmd.load(next);
        })
      )
      .subscribe(async () => {
        osmd.render();
        await audioPlayer.loadScore(osmd);
      });

    this.audioPlayerSubscription = this.audioPlayerState$.subscribe(async (next) => {
      if (next === AudioPlayerState.PLAY) {
        await audioPlayer.play();
      } else if (next === AudioPlayerState.PAUSE) {
        await audioPlayer.pause();
      } else {
        await audioPlayer.stop();
      }
    });
  }

  ngOnDestroy() {
    this.musicXmlSubscription.unsubscribe();
    this.audioPlayerSubscription.unsubscribe();
  }
}
