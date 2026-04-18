import { Component, Input, Output, EventEmitter, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { SongServices } from '../../../services/song/song-services';

@Component({
  selector: 'app-request-sheet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-sheet.html',
  styleUrls: ['./request-sheet.css']
})
export class RequestSheet implements OnInit {

  @Input() initialSearchTerm: string = '';
  

  @Output() closed = new EventEmitter<void>();

  isSubmittingRequest = false;
  requestSuccessMessage = '';
  pointsAwarded = '';
  isClosing = signal(false);
  isClosed = signal(false);
  requestForm = new FormGroup({
    songName: new FormControl('', Validators.required),
    artistName: new FormControl('')
  });

  private songServices = inject(SongServices);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    if (this.initialSearchTerm) {
      this.requestForm.patchValue({ songName: this.initialSearchTerm });
    }

  }

  closeSheet(): void {
    this.isClosing.set(true);
    setTimeout(() => {
  
      this.isClosed.set(true);
    }, 500);
      setTimeout(() => {
  
         this.closed.emit();
    }, 600);
    
  }

  submitSongRequest(): void {
    if (this.requestForm.invalid) return;

    this.isSubmittingRequest = true;
    const { songName, artistName } = this.requestForm.value;

    this.songServices.requestSong(songName!, artistName || '').subscribe({
      next: (res) => {
        this.isSubmittingRequest = false;
        this.requestSuccessMessage = `${res.message}`;
        this.pointsAwarded = `+ ${res.pointsAwarded} pontos!`;
        this.cdr.markForCheck();
       
        setTimeout(() => {
          this.closeSheet();
        }, 3000);
      },
      error: (err) => {
        console.error('Erro ao pedir música', err);
        this.isSubmittingRequest = false;
      }
    });
  }
}