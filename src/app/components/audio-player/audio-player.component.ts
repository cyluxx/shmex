import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioPlayerState } from '../../store/enum';
import { Store } from '@ngrx/store';
import { selectAudioPlayerState } from '../../store/selectors';
import { setAudioPlayerState } from '../../store/actions';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnInit {
  audioPlayerState$: Observable<AudioPlayerState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.audioPlayerState$ = this.store.select(selectAudioPlayerState);
  }

  get playState() {
    return AudioPlayerState.PLAY;
  }

  onPlay() {
    this.store.dispatch(setAudioPlayerState({ audioPlayerState: AudioPlayerState.PLAY }));
  }

  onPause() {
    this.store.dispatch(setAudioPlayerState({ audioPlayerState: AudioPlayerState.PAUSE }));
  }

  onStop() {
    this.store.dispatch(setAudioPlayerState({ audioPlayerState: AudioPlayerState.STOP }));
  }
}
