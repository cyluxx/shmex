import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerComponent } from './audio-player.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../store/reducer';
import { AudioPlayerState } from '../../store/enum';

describe('AudioPlayerComponent', () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioPlayerComponent],
      imports: [StoreModule.forRoot({ app: reducer })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should set audio player state to Play, on play', (done) => {
    component.onPlay();

    component.audioPlayerState$.subscribe((next) => {
      expect(next).toBe(AudioPlayerState.PLAY);
      done();
    });
  });

  it('should set audio player state to Pause, on pause', (done) => {
    component.onPause();

    component.audioPlayerState$.subscribe((next) => {
      expect(next).toBe(AudioPlayerState.PAUSE);
      done();
    });
  });

  it('should set audio player state to Stop, on stop', (done) => {
    component.onStop();

    component.audioPlayerState$.subscribe((next) => {
      expect(next).toBe(AudioPlayerState.STOP);
      done();
    });
  });
});
