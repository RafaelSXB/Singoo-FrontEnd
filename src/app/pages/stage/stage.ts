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
  playerState: number = 1;

  currentLyricIndex: number = -1;
  syncInterval: any;
  currentTimeMs: number = 0;
  isPlaying: boolean = false;
  nameSong: string = '';
  playerOrigin = window.location.origin;
  validatedWordsForActiveBlock: ValidatedWord[] = [];
  private speechSubscription!: Subscription;
userWantsToPlay: boolean = false; 

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

    // 1. LIGAR O MICROFONE LOGO (Independente de a música já ter carregado ou não)
    this.speechSubscription = this.speechRecognitionService.validatedWords$.subscribe((words) => {
      this.validatedWordsForActiveBlock = words;
    this.validatedWordsForActiveBlock.forEach(word => console.log(word.text, ' ', word.status));
      this.cdr.markForCheck();
    });

    // 2. CARREGAR A MÚSICA
    this.songId = this.route.snapshot.paramMap.get('id');
    this.nameSong = this.route.snapshot.paramMap.get('nameSong') || '';

    if (this.songId) {
      this.songService.getSongById(this.songId).subscribe({
        next: (data) => {
          this.songDetails = data;
          this.isLoading = false;
          this.cdr.markForCheck();
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

    if (event.data === 1) { // A TOCAR
      this.startLyricsSync();
    } 
    else if (event.data === 2) { // PAUSADO
      this.stopLyricsSync();
      

      if (this.userWantsToPlay) {
        setTimeout(() => {
          this.player.playVideo(); // Forçamos o play por cima das regras do Android!
        }, 100);
      }
    }
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
            this.speechRecognitionService.startListeningForPhrase(
              this.songDetails.lyrics[newIndex].englishPhrase
            );
          } else {
            this.speechRecognitionService.stopListening();
            this.validatedWordsForActiveBlock = [];
          }
          this.cdr.markForCheck();
        }
      }
    }, 500);
  }

  stopLyricsSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }

 togglePlayPause(): void {
    if (!this.player) return;
    if (this.isPlaying) {
      this.userWantsToPlay = false; // Utilizador quer mesmo pausar
      this.player.pauseVideo();
      this.speechRecognitionService.stopListening(); // Desliga o mic para poupar bateria
    } else {
      this.userWantsToPlay = true; // Utilizador quer tocar a música!
      
      // Acorda o microfone invisível ANTES de dar o Play, para o Android não se assustar
      this.speechRecognitionService.startListeningForPhrase('');
      this.player.playVideo();
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.stopLyricsSync();
    this.speechRecognitionService.stopListening();
    if (this.speechSubscription) {
      this.speechSubscription.unsubscribe();
    }
  }
}