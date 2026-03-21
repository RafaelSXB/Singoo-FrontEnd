import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SongServices } from '../../services/song/song-services';
import { SongListDto } from '../../services/song/song-models';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class Catalog implements OnInit {
  searchControl = new FormControl('');
  songs: SongListDto[] = [];
  isLoading: boolean = false;

  constructor(private songServices: SongServices, private router: Router, private cdr: ChangeDetectorRef) {
  
  }


  ngOnInit(): void {

      this.loadSongs('');
  
    this.searchControl.valueChanges.pipe(
      debounceTime(500), 
      distinctUntilChanged() 
    ).subscribe(term => {
      this.loadSongs(term || '');
    });
  }

  loadSongs(searchTerm: string): void {
    this.isLoading = true;
    this.songServices.getSongs(searchTerm).subscribe({
      next: (response) => {
        console.log('Músicas carregadas:', response);
      this.isLoading = false;
        this.songs = response.content;
        console.log('Músicas filtradas:', this.isLoading);
            this.cdr.markForCheck(); 
  
      },
      error: (err) => {
        console.error('Erro ao buscar músicas', err);
        this.isLoading = false;
      }
    });

  }


  goToStage(songId: string): void {
    console.log('Navegar para O Palco (US04) com a música:', songId);
   
  }
}