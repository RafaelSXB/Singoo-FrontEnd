import { Injectable } from '@angular/core';
import { DB_SONGS_DETAILS_KEY, DB_SONGS_LIST_KEY, initializeMockDatabase } from './song.mock';
import { delay, Observable, of, throwError } from 'rxjs';
import { PaginatedResponse, SongDetailsDto, SongListDto } from './song-models';

@Injectable({
  providedIn: 'root',
})
export class SongServices {

  constructor() {
    initializeMockDatabase();
  }

  getSongs(search: string = '', page: number = 0, size: number = 20): Observable<PaginatedResponse<SongListDto>> {

    const allSongs: SongListDto[] = JSON.parse(localStorage.getItem(DB_SONGS_LIST_KEY) || '[]');
    let filteredSongs = allSongs;


    if (search) {
      const termo = search.toLowerCase();
      filteredSongs = filteredSongs.filter(song => 
        song.title.toLowerCase().includes(termo) || 
        song.artist.toLowerCase().includes(termo)
      );
    }

   
    const startIndex = page * size;
    const paginatedContent = filteredSongs.slice(startIndex, startIndex + size);
    const totalPages = Math.ceil(filteredSongs.length / size);

    const response: PaginatedResponse<SongListDto> = {
      content: paginatedContent,
      totalElements: filteredSongs.length,
      totalPages: totalPages === 0 ? 1 : totalPages
    };


    return of(response).pipe(delay(600));
  }

  
  getSongById(songId: string): Observable<SongDetailsDto> {

    const allDetails: SongDetailsDto[] = JSON.parse(localStorage.getItem(DB_SONGS_DETAILS_KEY) || '[]');
    const songInfo = allDetails.find(s => s.id === songId);

    if (!songInfo) {
     
      return throwError(() => new Error('Detalhes da música não encontrados.'));
    }

    return of(songInfo).pipe(delay(600));
  }

    requestSong(songName: string, artistName: string): Observable<any> {
    const payload = { songName, artistName };
    console.log(`[BACKEND MOCK POST] /api/v1/requests`, payload);
    
    const mockResponse = {
      message: "Pedido recebido com sucesso!",
      pointsAwarded: 10
    };

    return of(mockResponse).pipe(delay(500));
  }
}
