import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongServices } from '../../services/song/song-services';
import { SongDetailsDto } from '../../services/song/song-models';
import { YouTubePlayer } from '@angular/youtube-player';
import { SpeechRecognitionService, ValidatedWord } from '../../services/speech/speech-recognition';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule, YouTubePlayer],
  templateUrl: './stage.html',
  styleUrls: ['./stage.css']
})
export class Stage implements OnInit, OnDestroy {
  @ViewChild(YouTubePlayer) player!: YouTubePlayer;

  songId: string | null = null;
  songDetails: SongDetailsDto | null = null;
  isLoading = true;
  isVoskLoading = true; 
  playerState: number = 1;

  currentLyricIndex: number = -1;
  syncInterval: any;
  currentTimeMs: number = 0;
  isPlaying: boolean = false;
  nameSong: string = '';
  playerOrigin = window.location.origin;
  validatedWordsForActiveBlock: ValidatedWord[] = [];
  lyricMusic: string[] = [];
  
  private speechSubscription!: Subscription;
  private modelSubscription!: Subscription;
  private speechRecognitionService = inject(SpeechRecognitionService);

  constructor(
    private route: ActivatedRoute,
    private songService: SongServices,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    this.speechSubscription = this.speechRecognitionService.validatedWords$.subscribe((words) => {
      this.validatedWordsForActiveBlock = words;
      this.cdr.markForCheck();
    });

    this.modelSubscription = this.speechRecognitionService.isModelLoading$.subscribe((loading) => {
      this.isVoskLoading = loading;
      this.cdr.markForCheck();
    });

    this.songId = this.route.snapshot.paramMap.get('id');
    this.nameSong = this.route.snapshot.paramMap.get('nameSong') || '';

    if (this.songId) {
      this.songService.getSongById(this.songId).subscribe({
        next: (data) => {
          this.songDetails = data;
          this.isLoading = false;
          this.cdr.markForCheck();
          data.lyrics.forEach(lyric => {
            lyric.englishPhrase.split(' ').forEach(word => {
              const cleanedWord = this.cleanLyrics(word);
              if (cleanedWord.length > 0) {
                this.lyricMusic.push(cleanedWord);
              }
            });
          });
        },
        error: (err) => {
          console.error('Erro ao carregar música', err);
          this.isLoading = false;
        }
      });
    }
  }

  onPlayerStateChange(event: any): void {
    this.isPlaying = (event.data === 1);
    this.playerState = event.data as number;

    if (event.data === 1) { 
      this.startLyricsSync();
    } else { 
      this.stopLyricsSync();
    }
  }

    cleanLyrics(lyricLine: string): string {
  return lyricLine
    .toLowerCase() 
    .replace(/[^a-z\s']/g, '') 
    .trim();
}

  startLyricsSync(): void {
    this.syncInterval = setInterval(() => {
      if (this.player && this.songDetails && this.songDetails.lyrics) {
        this.currentTimeMs = this.player.getCurrentTime() * 1000;

        const newIndex = this.songDetails.lyrics.findIndex(
          lyric => this.currentTimeMs >= lyric.startTimeMs && this.currentTimeMs <= lyric.endTimeMs
        );

        if (newIndex !== this.currentLyricIndex) {
          this.currentLyricIndex = newIndex;

          if (newIndex !== -1) {
            this.speechRecognitionService.setPhrase(this.songDetails.lyrics[newIndex].englishPhrase);
          } else {
            this.speechRecognitionService.setPhrase('');
          }
          this.cdr.markForCheck();
        }
      }
    }, 600);
  }

  stopLyricsSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }

  togglePlayPause(): void {
    if (!this.player) return;
    
    if (this.isVoskLoading) {
      return; 
    }

    if (this.isPlaying) {
      this.player.pauseVideo();
      this.speechRecognitionService.stopMic();
    } else {
      this.speechRecognitionService.startMic(this.lyricMusic);
      this.player.playVideo();
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.stopLyricsSync();
    if (this.player) {
      this.player.pauseVideo();
    }
    this.speechRecognitionService.stopMic();
    
    if (this.speechSubscription) {
      this.speechSubscription.unsubscribe();
    }
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }
}