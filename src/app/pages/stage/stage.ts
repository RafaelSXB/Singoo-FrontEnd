import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongServices } from '../../services/song/song-services';
import { SongDetailsDto } from '../../services/song/song-models';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule, YouTubePlayer],
  templateUrl: './stage.html',
  styleUrls: ['./stage.css']
})
export class Stage implements OnInit {
  @ViewChild(YouTubePlayer) player!: YouTubePlayer;

  songId: string | null = null;
  songDetails: SongDetailsDto | null = null;
  isLoading = true;

  currentLyricIndex: number = -1;
  syncInterval: any;
  currentTimeMs: number = 0;
  isPlaying: boolean = false;
  nameSong: string = '';
  playerOrigin = window.location.origin;

  constructor(
    private route: ActivatedRoute,
    private songService: SongServices,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

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

    if (event.data === 1) { 
      this.startLyricsSync();
    } else {
      this.stopLyricsSync();
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
          this.cdr.markForCheck();
        }
      }
    }, 100);
  }

  stopLyricsSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }

  // O nosso controlador limpo
  togglePlayPause(): void {
    if (!this.player) return;
    if (this.isPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.stopLyricsSync();
  }
}